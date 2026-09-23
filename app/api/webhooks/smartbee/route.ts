import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { sendCoursePurchaseEmail, sendBundlePurchaseEmail, sendAdminNotification, sendPurchaseEmail } from "@/lib/mailer";

export const runtime = "nodejs";

/**
 * SmartBee's webhook URL is fixed in their dashboard — there is no way to add a
 * query-string secret or a custom header on their side, so a shared-secret check
 * can't be enforced today. If SMARTBEE_WEBHOOK_SECRET is ever set (e.g. SmartBee
 * later adds signing, or a proxy in front of this route injects it), it's still
 * checked here — but its absence never blocks a call, since real traffic can't
 * supply it. Until SmartBee can guarantee authenticity, the mitigations below
 * (idempotency + admin visibility) are the defense in depth available from our side.
 */
function isAuthorized(req: NextRequest): boolean {
    const expected = process.env.SMARTBEE_WEBHOOK_SECRET;
    if (!expected) return true;
    const provided = req.headers.get("x-smartbee-secret") || req.nextUrl.searchParams.get("secret");
    return provided === expected;
}

function getClientIp(req: NextRequest): string {
    const forwarded = req.headers.get("x-forwarded-for");
    if (forwarded) return forwarded.split(",")[0].trim();
    return req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: NextRequest) {
    try {
        if (!isAuthorized(req)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const clientIp = getClientIp(req);

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
                // Idempotency: only a purchase still "pending" can be completed by this
                // webhook. Without a verifiable signature from SmartBee, this is the one
                // guard available against a replayed or forged call re-triggering the
                // paid-access email for an order that's already done (or was never really
                // paid, if the id was created by someone probing /api/course/create-order).
                if (courseOrder.status !== "pending") {
                    await sendAdminNotification({
                        eventType: "⚠️ SmartBee webhook: ניסיון כפול/חשוד על הזמנת קורס",
                        userEmail: courseOrder.email,
                        details: `purchaseId: ${purchaseId}\nסטטוס נוכחי: ${courseOrder.status} (צפוי: pending)\nIP: ${clientIp}\nPayload: ${JSON.stringify(body)}`,
                    }).catch(() => {});
                    return NextResponse.json({ success: true, alreadyProcessed: true });
                }

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
                    .eq("status", "pending")
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
                        details: `רכישה הושלמה בהצלחה!\nשם: ${courseOrder.name}\nאימייל: ${courseOrder.email}\nסכום: ₪599\nחשבונית: ${documentUrl || "הופקה ב-SmartBee"}\nIP: ${clientIp}`
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
                // Idempotency guard — see rationale on the course_purchases branch above.
                if (bundleOrder.status !== "pending") {
                    await sendAdminNotification({
                        eventType: "⚠️ SmartBee webhook: ניסיון כפול/חשוד על הזמנת בנדל",
                        userEmail: bundleOrder.email,
                        details: `purchaseId: ${purchaseId}\nסטטוס נוכחי: ${bundleOrder.status} (צפוי: pending)\nIP: ${clientIp}\nPayload: ${JSON.stringify(body)}`,
                    }).catch(() => {});
                    return NextResponse.json({ success: true, alreadyProcessed: true });
                }

                const { data: updatedBundle, error: bundleUpdateError } = await supabase
                    .from("bundle_purchases")
                    .update({
                        status: "paid",
                        invoice_url: documentUrl || null,
                        updated_at: new Date().toISOString(),
                    })
                    .eq("id", purchaseId)
                    .eq("status", "pending")
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
                        details: `רכישה הושלמה בהצלחה!\nשם: ${bundleOrder.name}\nאימייל: ${bundleOrder.email}\nסכום: ₪150\nחשבונית: ${documentUrl || "הופקה ב-SmartBee"}\nIP: ${clientIp}`
                    });
                }

                return NextResponse.json({ success: true, processed: "bundle_purchases" });
            }
        }

        // 3. Subscription or General Payment Handling (e.g. Monthly Pro Subscription ₪100)
        const normalizedEmail = payerEmail?.toLowerCase().trim();
        if (normalizedEmail) {
            const transactionId = (purchaseId ? String(purchaseId) : null)
                || (invoiceNumber ? `Smartbee-${invoiceNumber}` : `Smartbee-${Date.now().toString().slice(-6)}`);

            // Idempotency: check if this payment was already processed
            const { data: existingPayment } = await supabase
                .from("payment_records")
                .select("id")
                .eq("paypal_order_id", transactionId)
                .maybeSingle();

            if (existingPayment) {
                console.log(`[SmartBee Webhook] Transaction ${transactionId} already recorded, skipping.`);
                return NextResponse.json({ success: true, alreadyProcessed: true });
            }

            // A. Find or create user in Supabase auth
            const { data: usersData } = await supabase.auth.admin.listUsers();
            let user = usersData?.users.find((u) => u.email?.toLowerCase() === normalizedEmail);
            let userId: string;

            if (user) {
                userId = user.id;
            } else {
                const tempPassword = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                const { data: newUser, error: createErr } = await supabase.auth.admin.createUser({
                    email: normalizedEmail,
                    password: tempPassword,
                    email_confirm: true,
                    user_metadata: {
                        full_name: payerName,
                    },
                });

                if (createErr || !newUser?.user) {
                    console.error("[SmartBee Webhook] Error creating auth user:", createErr);
                    throw createErr || new Error("Failed to create user");
                }

                userId = newUser.user.id;
            }

            // B. Upsert Profile with active monthly subscription
            const now = new Date();
            const endDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();

            const { error: profileErr } = await supabase.from("profiles").upsert({
                id: userId,
                email: normalizedEmail,
                subscription_status: "monthly",
                subscription_end_date: endDate,
                is_premium: true,
                updated_at: now.toISOString(),
            });

            if (profileErr) {
                console.error("[SmartBee Webhook] Error updating profile:", profileErr);
            }

            // C. Insert Payment Record
            const paidAmount = amount ? Number(amount) : 100;
            const { error: paymentErr } = await supabase.from("payment_records").insert({
                user_id: userId,
                amount: paidAmount,
                currency: "ILS",
                paypal_order_id: transactionId,
                status: "COMPLETED",
                created_at: now.toISOString(),
            });

            if (paymentErr) {
                console.warn("[SmartBee Webhook] Payment record insert warning:", paymentErr.message);
            }

            // D. Upsert newsletter subscriber & sync to Resend Audience
            try {
                await supabase.from("newsletter_subscribers").upsert(
                    {
                        email: normalizedEmail,
                        name: payerName !== "לקוח יקר" ? payerName : null,
                        source: "smartbee-subscription",
                        status: "active",
                        subscribed_at: now.toISOString(),
                    },
                    { onConflict: "email" }
                );
            } catch {
                // non-fatal
            }

            const audienceId = process.env.RESEND_AUDIENCE_ID;
            if (audienceId) {
                try {
                    const { getResend } = await import("@/lib/resend");
                    await getResend().contacts.create({
                        audienceId,
                        email: normalizedEmail,
                        firstName: payerName.split(" ")[0] || undefined,
                        lastName: payerName.split(" ").slice(1).join(" ") || undefined,
                        unsubscribed: false,
                    });
                } catch (resendErr) {
                    console.warn("[SmartBee Webhook] Resend audience sync warning:", resendErr);
                }
            }

            // E. Generate 1-click magic login link
            const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ronenamoscpa.co.il";
            let loginUrl: string | null = null;
            try {
                const { data: linkData, error: linkErr } = await supabase.auth.admin.generateLink({
                    type: "magiclink",
                    email: normalizedEmail,
                });

                if (!linkErr && linkData?.properties?.hashed_token) {
                    loginUrl = `${siteUrl}/auth/confirm?token_hash=${linkData.properties.hashed_token}&type=magiclink&next=%2Fdashboard`;
                }
            } catch (linkEx) {
                console.warn("[SmartBee Webhook] Error generating login link:", linkEx);
            }

            // F. Send Welcome Purchase Email to Customer
            await sendPurchaseEmail({
                to: normalizedEmail,
                planName: "מנוי חודשי גמיש",
                amount: paidAmount,
                orderId: transactionId,
                loginUrl,
            }).catch((emailErr) => {
                console.error("[SmartBee Webhook] Customer welcome email failed:", emailErr);
            });

            // G. Send Admin Notification to Ronen
            await sendAdminNotification({
                eventType: "רכישת מנוי חודשי חדשה (SmartBee)",
                userEmail: normalizedEmail,
                details: `מנוי חודשי הופעל בהצלחה!\nשם: ${payerName}\nאימייל: ${normalizedEmail}\nסכום: ₪${paidAmount}\nמזהה: ${transactionId}\nחשבונית: ${documentUrl || invoiceNumber || "הופקה ב-SmartBee"}\nתוקף מנוי: ${endDate}\nIP: ${clientIp}`,
            }).catch((adminErr) => {
                console.error("[SmartBee Webhook] Admin notification email failed:", adminErr);
            });

            return NextResponse.json({ success: true, processed: "monthly_subscription" });
        }

        console.warn("[SmartBee Webhook] Unrecognized event without customer email:", body);
        return NextResponse.json({ success: true, logged: false, reason: "no_email" });
    } catch (err: any) {
        console.error("[SmartBee Webhook Error]:", err);
        return NextResponse.json(
            { error: err.message || "Webhook handling failed" },
            { status: 500 }
        );
    }
}
