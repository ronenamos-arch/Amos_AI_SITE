// Cron endpoint: processes pending scheduled newsletters
// Called by Vercel Cron every 15 minutes (see vercel.json)
// Protected by Authorization: Bearer <CRON_SECRET>
//
// IMPORTANT: Imports from lib/newsletter-service.ts (no "use server") — NOT from lib/actions/newsletter.ts
// Route handlers cannot import "use server" modules (CLAUDE.md rule).

export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendNewsletterCore } from "@/lib/newsletter-service";

export async function GET(request: NextRequest) {
    // Verify this is a legitimate Vercel cron call
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const adminSupabase = createAdminClient();
    const now = new Date().toISOString();

    // Atomically claim pending newsletters that are due — prevents double-send
    // if cron fires concurrently (e.g. during a Vercel retry).
    const { data: claimed, error: claimError } = await adminSupabase
        .from("scheduled_newsletters")
        .update({ status: "sending" })
        .eq("status", "pending")
        .lte("scheduled_for", now)
        .select("id, subject, body_html, sources");

    if (claimError) {
        console.error("Cron: failed to claim scheduled newsletters:", claimError);
        return NextResponse.json({ error: claimError.message }, { status: 500 });
    }

    if (!claimed || claimed.length === 0) {
        return NextResponse.json({ processed: 0 });
    }

    const results = await Promise.all(
        claimed.map(async (row) => {
            try {
                const result = await sendNewsletterCore(
                    row.subject,
                    row.body_html,
                    row.sources ?? undefined
                );

                if (result.success) {
                    await adminSupabase
                        .from("scheduled_newsletters")
                        .update({
                            status: "sent",
                            sent_at: new Date().toISOString(),
                            recipient_count: result.sent,
                            failed_count: result.failed,
                        })
                        .eq("id", row.id);
                    return { id: row.id, status: "sent", sent: result.sent };
                } else {
                    await adminSupabase
                        .from("scheduled_newsletters")
                        .update({ status: "failed", error_message: result.error })
                        .eq("id", row.id);
                    return { id: row.id, status: "failed", error: result.error };
                }
            } catch (err: unknown) {
                const message = err instanceof Error ? err.message : "Unknown error";
                await adminSupabase
                    .from("scheduled_newsletters")
                    .update({ status: "failed", error_message: message })
                    .eq("id", row.id);
                return { id: row.id, status: "failed", error: message };
            }
        })
    );

    return NextResponse.json({ processed: results.length, results });
}
