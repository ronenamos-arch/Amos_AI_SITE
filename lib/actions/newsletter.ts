"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { resend, EMAIL_FROM } from "@/lib/resend";
import { buildNewsletterEmail } from "@/lib/emails/newsletter";

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

export async function getSubscriberCount() {
    const adminSupabase = createAdminClient();

    const { count, error } = await adminSupabase
        .from("newsletter_subscribers")
        .select("*", { count: "exact", head: true })
        .eq("status", "active");

    if (error) {
        console.error("Subscriber count error:", error);
        return 0;
    }

    return count || 0;
}

export async function sendNewsletter(subject: string, bodyHtml: string) {
    // Auth check — admin only
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || user.email !== "ronenamos@gmail.com") {
        return { success: false, error: "Unauthorized" };
    }

    const adminSupabase = createAdminClient();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://amos-ai-site.vercel.app";

    // Fetch active subscribers
    const { data: subscribers, error: fetchError } = await adminSupabase
        .from("newsletter_subscribers")
        .select("email")
        .eq("status", "active");

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

    return { success: true, sent, failed, total: subscribers.length };
}
