"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { resend, EMAIL_FROM } from "@/lib/resend";
import { buildNewsletterEmail } from "@/lib/emails/newsletter";

// Auth for all actions is enforced by middleware (/admin/* requires ronenamos@gmail.com)

export async function subscribeToNewsletter(email: string, source: string = "footer") {
    const adminSupabase = createAdminClient();

    const { error } = await adminSupabase
        .from("newsletter_subscribers")
        .upsert(
            { email: email.toLowerCase().trim(), source, status: "active", subscribed_at: new Date().toISOString() },
            { onConflict: "email" }
        );

    if (error) {
        console.error("Newsletter subscribe error:", error);
        return { success: false, error: error.message };
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

export async function sendNewsletter(subject: string, bodyHtml: string, sources?: string[]) {
    const adminSupabase = createAdminClient();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://amos-ai-site.vercel.app";

    // Fetch active subscribers (optionally filtered by source)
    let query = adminSupabase
        .from("newsletter_subscribers")
        .select("email")
        .eq("status", "active");

    if (sources && sources.length > 0) {
        query = query.in("source", sources);
    }

    const { data: subscribers, error: fetchError } = await query;

    if (fetchError || !subscribers?.length) {
        return { success: false, error: fetchError?.message || "No active subscribers" };
    }

    // Send in batches of 50 (Resend batch limit)
    const batchSize = 50;
    let sent = 0;
    let failed = 0;

    for (let i = 0; i < subscribers.length; i += batchSize) {
        const batch = subscribers.slice(i, i + batchSize);

        const emails = batch.map((sub) => {
            const unsubscribeUrl = `${siteUrl}/api/newsletter/unsubscribe?email=${Buffer.from(sub.email).toString("base64")}`;
            return {
                from: EMAIL_FROM,
                to: sub.email,
                subject,
                html: buildNewsletterEmail({ bodyHtml, siteUrl, unsubscribeUrl }),
            };
        });

        try {
            const { data, error } = await resend.batch.send(emails);
            if (error) {
                console.error("Resend batch error:", error);
                failed += batch.length;
            } else {
                sent += batch.length;
            }
        } catch (err) {
            console.error("Batch send failed:", err);
            failed += batch.length;
        }
    }

    // Log the send to history
    await adminSupabase.from("newsletter_sends").insert({
        subject,
        recipient_count: sent,
        failed_count: failed,
        sources: sources && sources.length > 0 ? sources : null,
    });

    return { success: true, sent, failed, total: subscribers.length };
}

export async function sendTestNewsletter(subject: string, bodyHtml: string) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://amos-ai-site.vercel.app";

    try {
        const { error } = await resend.emails.send({
            from: EMAIL_FROM,
            to: "ronenamos@gmail.com",
            subject: `[TEST] ${subject}`,
            html: buildNewsletterEmail({ bodyHtml, siteUrl, unsubscribeUrl: "#" }),
        });

        if (error) throw error;
        return { success: true };
    } catch (err: any) {
        return { success: false, error: err.message };
    }
}
