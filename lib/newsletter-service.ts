// Core newsletter service — no "use server" directive
// Safe to import from route handlers and cron endpoints.
// lib/actions/newsletter.ts re-exports these as server actions for client-side use.

import { createAdminClient } from "@/lib/supabase/admin";
import { getResend, EMAIL_FROM } from "@/lib/resend";
import { buildNewsletterEmail } from "@/lib/emails/newsletter";

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

// Upload any base64 data URI images in the HTML to Supabase Storage
// and replace their src with public URLs. Email clients (Gmail, Outlook)
// strip data: URIs — images must be hosted externally to render.
async function hoistBase64Images(html: string): Promise<string> {
    const adminSupabase = createAdminClient();
    const matches = [...html.matchAll(/<img[^>]+src="(data:image\/([^;]+);base64,([^"]+))"[^>]*>/gi)];
    if (matches.length === 0) return html;

    const replacements = await Promise.all(
        matches.map(async ([, dataUri, rawType, base64Data]) => {
            try {
                const mimeType = rawType === "jpeg" ? "jpg" : rawType;
                const buffer = Buffer.from(base64Data, "base64");
                const fileName = `newsletter/${Date.now()}-${Math.random().toString(36).slice(2)}.${mimeType}`;
                const { error } = await adminSupabase.storage
                    .from("blog-media")
                    .upload(fileName, buffer, { contentType: `image/${rawType}`, upsert: false });
                if (error) throw error;
                const { data: { publicUrl } } = adminSupabase.storage.from("blog-media").getPublicUrl(fileName);
                return { dataUri, publicUrl };
            } catch (err) {
                console.error("Failed to upload base64 image:", err);
                return null;
            }
        })
    );

    let result = html;
    for (const r of replacements) {
        if (r) result = result.replace(r.dataUri, r.publicUrl);
    }
    return result;
}

// ---------------------------------------------------------------------------
// Core send logic — importable from cron routes and server actions
// ---------------------------------------------------------------------------

export async function sendNewsletterCore(subject: string, bodyHtml: string, sources?: string[]) {
    const adminSupabase = createAdminClient();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ronenamoscpa.co.il";

    bodyHtml = await hoistBase64Images(bodyHtml);

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
            const { error } = await getResend().batch.send(emails);
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

    await adminSupabase.from("newsletter_sends").insert({
        subject,
        recipient_count: sent,
        failed_count: failed,
        sources: sources && sources.length > 0 ? sources : null,
    });

    return { success: true, sent, failed, total: subscribers.length };
}

export async function sendTestNewsletterCore(subject: string, bodyHtml: string) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ronenamoscpa.co.il";

    bodyHtml = await hoistBase64Images(bodyHtml);

    try {
        const { error } = await getResend().emails.send({
            from: EMAIL_FROM,
            to: "ronenamos@gmail.com",
            subject: `[TEST] ${subject}`,
            html: buildNewsletterEmail({ bodyHtml, siteUrl, unsubscribeUrl: "#" }),
        });

        if (error) throw error;
        return { success: true };
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        return { success: false, error: message };
    }
}

// ---------------------------------------------------------------------------
// Scheduling
// ---------------------------------------------------------------------------

export async function scheduleNewsletterCore(
    subject: string,
    bodyHtml: string,
    scheduledFor: string,   // ISO string
    sources?: string[]
) {
    const adminSupabase = createAdminClient();

    const { data, error } = await adminSupabase
        .from("scheduled_newsletters")
        .insert({
            subject,
            body_html: bodyHtml,
            scheduled_for: scheduledFor,
            sources: sources && sources.length > 0 ? sources : null,
        })
        .select("id")
        .single();

    if (error) {
        console.error("Schedule newsletter error:", error);
        return { success: false, error: error.message };
    }

    return { success: true, id: data.id };
}

export async function getScheduledNewslettersCore() {
    const adminSupabase = createAdminClient();

    const { data, error } = await adminSupabase
        .from("scheduled_newsletters")
        .select("id, subject, scheduled_for, status, sources, created_at, sent_at, recipient_count, failed_count, error_message")
        .order("scheduled_for", { ascending: false })
        .limit(50);

    if (error) {
        console.error("Get scheduled newsletters error:", error);
        return [];
    }

    return data || [];
}

export async function cancelScheduledNewsletterCore(id: string) {
    const adminSupabase = createAdminClient();

    const { error } = await adminSupabase
        .from("scheduled_newsletters")
        .update({ status: "cancelled" })
        .eq("id", id)
        .eq("status", "pending");

    if (error) {
        console.error("Cancel scheduled newsletter error:", error);
        return { success: false, error: error.message };
    }

    return { success: true };
}

// ---------------------------------------------------------------------------
// Resend bulk backfill — syncs all active Supabase subscribers to Resend audience
// ---------------------------------------------------------------------------

export async function bulkSyncToResendCore() {
    const audienceId = process.env.RESEND_AUDIENCE_ID;
    if (!audienceId) return { success: false, error: "RESEND_AUDIENCE_ID not configured" };

    const adminSupabase = createAdminClient();
    const { data: subscribers, error } = await adminSupabase
        .from("newsletter_subscribers")
        .select("email, status")
        .order("subscribed_at", { ascending: true });

    if (error || !subscribers) {
        return { success: false, error: error?.message || "Failed to fetch subscribers" };
    }

    const resend = getResend();
    let synced = 0;
    let failed = 0;

    for (const sub of subscribers) {
        try {
            await resend.contacts.create({
                audienceId,
                email: sub.email,
                unsubscribed: sub.status === "unsubscribed",
            });
            synced++;
        } catch (err) {
            console.error(`Failed to sync ${sub.email}:`, err);
            failed++;
        }
    }

    return { success: true, synced, failed, total: subscribers.length };
}
