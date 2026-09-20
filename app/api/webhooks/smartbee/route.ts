import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { sendCoursePurchaseEmail, sendBundlePurchaseEmail, sendAdminNotification } from "@/lib/mailer";

export const runtime = "nodejs";

/**
 * SmartBee has no documented HMAC signature on its webhook, so authenticity is
 * enforced with a shared secret configured on both sides: set SMARTBEE_WEBHOOK_SECRET
 * here and register the webhook URL in SmartBee as
 * https://.../api/webhooks/smartbee?secret=<same value>. Without this, anyone could
 * POST a known purchaseId (e.g. one they created via /api/course/create-order) and
 * grant themselves a paid access token for free.
 */
function isAuthorized(req: NextRequest): boolean {
    const expected = process.env.SMARTBEE_WEBHOOK_SECRET;
    if (!expected) {
        console.error("SMARTBEE_WEBHOOK_SECRET not set — rejecting webhook call");
        return false;
    }
    const provided = req.headers.get("x-smartbee-secret") || req.nextUrl.searchParams.get("secret");
    return provided === expected;
}

export async function POST(req: NextRequest) {
    try {
        if (!isAuthorized(req)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        let body: any = {};
        const contentType = req.headers.get("content-type") || "";

        if (contentType.includes("application/json")) {
            body = await req.json();
        } else if (contentType.includes("application/x-www-form-urlencoded")) {
            const formData = await req.formData();
            formData.forEach((value, key) => {
                body[key] = value;
            });
        } else {
            const text = await req.text();
            try {
                body = JSON.parse(text);
            } catch {
                const params = new URLSearchParams(text);
                params.forEach((value, key) => {
                    body[key] = value;
                });
            }
        }

        console.log("[SmartBee Webhook] Received event:", JSON.stringify(body));

        const purchaseId = body.purchaseId || body.clientReference || body.custom || body.orderId;
        const payerEmail = body.email || body.clientEmail || body.customerEmail;
        const payerName = body.fullName || body.clientName || body.customerName || "לקוח יקר";
        const documentUrl = body.documentUrl || body.invoiceUrl || body.docUrl;
        const invoiceNumber = body.invoiceNumber || body.docNumber;
        const amount = body.amount || body.totalAmount;

        const supabase = createAdminClient();

        // 1. Check if this is a Course Purchase
        if (purchaseId) {
            const { data: courseOrder } = await supabase
                .from("course_purchases")
                .select("*")
                .eq("id", purchaseId)
                .maybeSingle();

            if (courseOrder) {
                const { data: updatedOrder, error: updateError } = await supabase
                    .from("course_purchases")
                    .update({
                        status: "completed",
                        payment_provider: "smartbee",
                        invoice_number: invoiceNumber || null,
                        invoice_url: documentUrl || null,
                        updated_at: new Date().toISOString(),
                    })
                    .eq("id", purchaseId)
                    .select("access_token")
                    .single();

                if (!updateError && updatedOrder?.access_token) {
                    // Send to the buyer's own email on record, never the caller-supplied
                    // payerEmail — otherwise anyone posting this webhook with someone
                    // else's purchaseId could redirect the paid access token to themselves.
                    await sendCoursePurchaseEmail({
                        to: courseOrder.email,
                        name: courseOrder.name || payerName || "לקוח יקר",
                        accessToken: updatedOrder.access_token,
                    });

                    await sendAdminNotification({
                        eventType: "רכישת קורס AI Finance Master חדשה (SmartBee)",
                        userEmail: courseOrder.email,
                        details: `רכישה הושלמה בהצלחה!\nשם: ${courseOrder.name}\nאימייל: ${courseOrder.email}\nסכום: ₪599\nחשבונית: ${documentUrl || "הופקה ב-SmartBee"}`
                    });
                }

                return NextResponse.json({ success: true, processed: "course_purchases" });
            }

            // 2. Check if this is a Bundle Purchase
            const { data: bundleOrder } = await supabase
                .from("bundle_purchases")
                .select("*")
                .eq("id", purchaseId)
                .maybeSingle();

            if (bundleOrder) {
                const { data: updatedBundle, error: bundleUpdateError } = await supabase
                    .from("bundle_purchases")
                    .update({
                        status: "paid",
                        invoice_url: documentUrl || null,
                        updated_at: new Date().toISOString(),
                    })
                    .eq("id", purchaseId)
                    .select("access_token")
                    .single();

                if (!bundleUpdateError && updatedBundle?.access_token) {
                    // Same rationale as above: send to the buyer's own email on record.
                    await sendBundlePurchaseEmail({
                        to: bundleOrder.email,
                        name: bundleOrder.name || payerName || "לקוח יקר",
                        accessToken: updatedBundle.access_token,
                    });

                    await sendAdminNotification({
                        eventType: "רכישת בנדל Claude חדשה (SmartBee)",
                        userEmail: bundleOrder.email,
                        details: `רכישה הושלמה בהצלחה!\nשם: ${bundleOrder.name}\nאימייל: ${bundleOrder.email}\nסכום: ₪150\nחשבונית: ${documentUrl || "הופקה ב-SmartBee"}`
                    });
                }

                return NextResponse.json({ success: true, processed: "bundle_purchases" });
            }
        }

        // 3. Fallback: Log payment record if table exists
        try {
            await supabase
                .from("payment_records")
                .insert({
                    provider: "smartbee",
                    payer_email: payerEmail || "unknown",
                    payer_name: payerName,
                    amount: amount ? Number(amount) : null,
                    invoice_number: invoiceNumber || null,
                    invoice_url: documentUrl || null,
                    raw_payload: body,
                    created_at: new Date().toISOString(),
                })
                .select()
                .maybeSingle();
        } catch {
            // non-fatal
        }

        return NextResponse.json({ success: true, logged: true });
    } catch (err: any) {
        console.error("[SmartBee Webhook Error]:", err);
        return NextResponse.json(
            { error: err.message || "Webhook handling failed" },
            { status: 500 }
        );
    }
}
