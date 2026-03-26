"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { sendWelcomeEmail } from "@/lib/mailer";
import { syncToResendAudience } from "@/lib/resend";
import {
    sendNewsletterCore,
    sendTestNewsletterCore,
    scheduleNewsletterCore,
    getScheduledNewslettersCore,
    cancelScheduledNewsletterCore,
    bulkSyncToResendCore,
} from "@/lib/newsletter-service";

// Auth for all actions is enforced by middleware (/admin/* requires ronenamos@gmail.com)

export async function subscribeToNewsletter(email: string, source: string = "footer") {
    const adminSupabase = createAdminClient();
    const normalizedEmail = email.toLowerCase().trim();

    // Check if this is a new subscriber (to avoid sending duplicate welcome emails)
    const { data: existing } = await adminSupabase
        .from("newsletter_subscribers")
        .select("email")
        .eq("email", normalizedEmail)
        .maybeSingle();

    const isNew = !existing;

    const { error } = await adminSupabase
        .from("newsletter_subscribers")
        .upsert(
            { email: normalizedEmail, source, status: "active", subscribed_at: new Date().toISOString() },
            { onConflict: "email" }
        );

    if (error) {
        console.error("Newsletter subscribe error:", error);
        return { success: false, error: error.message };
    }

    // Sync to Resend audience (non-blocking — failure must not break subscription)
    try {
        await syncToResendAudience(normalizedEmail, false);
    } catch (err) {
        console.error("Resend audience sync failed (subscribe):", err);
    }

    // Send welcome email only to brand-new subscribers
    if (isNew) {
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ronenamoscpa.co.il";
        const unsubscribeUrl = `${siteUrl}/api/newsletter/unsubscribe?email=${Buffer.from(normalizedEmail).toString("base64")}`;
        await sendWelcomeEmail({ to: normalizedEmail, type: "newsletter", unsubscribeUrl }).catch((err) =>
            console.error("Welcome email failed (newsletter):", err)
        );
    }

    return { success: true };
}

export async function unsubscribeFromNewsletter(email: string) {
    const adminSupabase = createAdminClient();

    const { error } = await adminSupabase
        .from("newsletter_subscribers")
        .update({ status: "unsubscribed", unsubscribed_at: new Date().toISOString() })
        .eq("email", email.toLowerCase().trim());

    if (error) {
        console.error("Newsletter unsubscribe error:", error);
        return { success: false, error: error.message };
    }

    // Sync unsubscribe to Resend audience (non-blocking)
    try {
        await syncToResendAudience(email.toLowerCase().trim(), true);
    } catch (err) {
        console.error("Resend audience sync failed (unsubscribe):", err);
    }

    return { success: true };
}

export async function getSubscribers() {
    const adminSupabase = createAdminClient();

    const { data, error } = await adminSupabase
        .from("newsletter_subscribers")
        .select("email, source, subscribed_at")
        .eq("status", "active")
        .order("subscribed_at", { ascending: false });

    if (error) {
        console.error("Get subscribers error:", error);
        return [];
    }

    return data || [];
}

export async function getSubscriberCount(sources?: string[]) {
    const adminSupabase = createAdminClient();

    let query = adminSupabase
        .from("newsletter_subscribers")
        .select("*", { count: "exact", head: true })
        .eq("status", "active");

    if (sources && sources.length > 0) {
        query = query.in("source", sources);
    }

    const { count, error } = await query;

    if (error) {
        console.error("Subscriber count error:", error);
        return 0;
    }

    return count || 0;
}

export async function getSubscriberSources(): Promise<{ source: string; count: number }[]> {
    const adminSupabase = createAdminClient();

    const { data, error } = await adminSupabase
        .from("newsletter_subscribers")
        .select("source")
        .eq("status", "active");

    if (error || !data) return [];

    const counts: Record<string, number> = {};
    for (const row of data) {
        const src = row.source || "unknown";
        counts[src] = (counts[src] || 0) + 1;
    }

    return Object.entries(counts).map(([source, count]) => ({ source, count }));
}

export async function getNewsletterHistory() {
    const adminSupabase = createAdminClient();

    const { data, error } = await adminSupabase
        .from("newsletter_sends")
        .select("id, subject, sent_at, recipient_count, failed_count, sources")
        .order("sent_at", { ascending: false })
        .limit(50);

    if (error) {
        console.error("Newsletter history error:", error);
        return [];
    }

    return data || [];
}

// ---------------------------------------------------------------------------
// Send (delegates to service layer — safe for server actions)
// ---------------------------------------------------------------------------

export async function sendNewsletter(subject: string, bodyHtml: string, sources?: string[]) {
    return sendNewsletterCore(subject, bodyHtml, sources);
}

export async function sendTestNewsletter(subject: string, bodyHtml: string) {
    return sendTestNewsletterCore(subject, bodyHtml);
}

export async function sendBlogPostNotification(post: {
    title: string;
    description: string;
    slug: string;
    imageUrl?: string;
}) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ronenamoscpa.co.il";
    const postUrl = `${siteUrl}/blog/${encodeURIComponent(post.slug)}`;

    const bodyHtml = `
        ${post.imageUrl ? `<img src="${post.imageUrl}" alt="${post.title}" style="max-width:100%;border-radius:8px;margin-bottom:16px;">` : ""}
        <h2 style="font-size:24px;font-weight:bold;color:#2dd4bf;margin:0 0 12px;">${post.title}</h2>
        ${post.description ? `<p style="font-size:16px;color:#d1d5db;margin:0 0 24px;">${post.description}</p>` : ""}
        <div style="text-align:center;margin-top:8px;">
            <a href="${postUrl}" style="display:inline-block;padding:14px 32px;background-color:#2dd4bf;color:#0a0e17;font-weight:bold;font-size:16px;text-decoration:none;border-radius:9999px;">
                קרא את המאמר המלא
            </a>
        </div>
    `;

    return sendNewsletterCore(`מאמר חדש: ${post.title}`, bodyHtml);
}

export async function sendBlogPostNotificationTest(post: {
    title: string;
    description: string;
    slug: string;
    imageUrl?: string;
}) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ronenamoscpa.co.il";
    const postUrl = `${siteUrl}/blog/${encodeURIComponent(post.slug)}`;

    const bodyHtml = `
        ${post.imageUrl ? `<img src="${post.imageUrl}" alt="${post.title}" style="max-width:100%;border-radius:8px;margin-bottom:16px;">` : ""}
        <h2 style="font-size:24px;font-weight:bold;color:#2dd4bf;margin:0 0 12px;">${post.title}</h2>
        ${post.description ? `<p style="font-size:16px;color:#d1d5db;margin:0 0 24px;">${post.description}</p>` : ""}
        <div style="text-align:center;margin-top:8px;">
            <a href="${postUrl}" style="display:inline-block;padding:14px 32px;background-color:#2dd4bf;color:#0a0e17;font-weight:bold;font-size:16px;text-decoration:none;border-radius:9999px;">
                קרא את המאמר המלא
            </a>
        </div>
    `;

    return sendTestNewsletterCore(`מאמר חדש: ${post.title}`, bodyHtml);
}

// ---------------------------------------------------------------------------
// Scheduling
// ---------------------------------------------------------------------------

export async function scheduleNewsletter(
    subject: string,
    bodyHtml: string,
    scheduledFor: string,
    sources?: string[]
) {
    return scheduleNewsletterCore(subject, bodyHtml, scheduledFor, sources);
}

export async function getScheduledNewsletters() {
    return getScheduledNewslettersCore();
}

export async function cancelScheduledNewsletter(id: string) {
    return cancelScheduledNewsletterCore(id);
}

// ---------------------------------------------------------------------------
// Resend bulk sync
// ---------------------------------------------------------------------------

export async function bulkSyncToResend() {
    return bulkSyncToResendCore();
}
