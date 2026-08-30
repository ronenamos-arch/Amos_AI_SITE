/**
 * POST /api/bundle/capture-order
 *
 * Captures a PayPal order after the buyer approves payment.
 * Updates the bundle_purchases record to "paid" and sends the thank-you email.
 */

import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { sendBundlePurchaseEmail } from "@/lib/mailer";
import { sendAdminNotification } from "@/lib/mailer";

function getPayPalBase(): string {
    return process.env.NEXT_PUBLIC_PAYPAL_SANDBOX === "true"
        ? "https://api-m.sandbox.paypal.com"
        : "https://api-m.paypal.com";
}

async function getPayPalAccessToken(): Promise<string> {
    const isSandbox = process.env.NEXT_PUBLIC_PAYPAL_SANDBOX === "true";
    const clientId = isSandbox 
        ? process.env.NEXT_PUBLIC_PAYPAL_SANDBOX_CLIENT_ID! 
        : process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!;
    const secret = isSandbox 
        ? process.env.PAYPAL_SANDBOX_SECRET_KEY! 
        : process.env.PAYPAL_SECRET_KEY!;

    const res = await fetch(`${getPayPalBase()}/v1/oauth2/token`, {
        method: "POST",
        headers: {
            Authorization: `Basic ${Buffer.from(`${clientId}:${secret}`).toString("base64")}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
    });

    const data = await res.json();
    if (!res.ok) throw new Error(`PayPal auth failed: ${JSON.stringify(data)}`);
    return data.access_token;
}

export async function POST(req: NextRequest) {
    try {
        const { paypalOrderId, purchaseId } = await req.json();

        if (!paypalOrderId || !purchaseId) {
            return NextResponse.json(
                { error: "Missing paypalOrderId or purchaseId" },
                { status: 400 }
            );
        }

        // Capture the PayPal order
        const accessToken = await getPayPalAccessToken();
        const captureRes = await fetch(
            `${getPayPalBase()}/v2/checkout/orders/${paypalOrderId}/capture`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        const captureData = await captureRes.json();
        if (!captureRes.ok || captureData.status !== "COMPLETED") {
            console.error("PayPal capture failed:", captureData);
            return NextResponse.json(
                { error: "Payment capture failed" },
                { status: 500 }
            );
        }

        // Update purchase record
        const supabase = createAdminClient();
        const { data: purchase, error: updateErr } = await supabase
            .from("bundle_purchases")
            .update({
                status: "paid",
                paid_at: new Date().toISOString(),
                paypal_order_id: paypalOrderId,
            })
            .eq("id", purchaseId)
            .select("access_token, email, name")
            .single();

        if (updateErr || !purchase) {
            console.error("Failed to update purchase record:", updateErr);
            return NextResponse.json(
                { error: "Payment succeeded but record update failed" },
                { status: 500 }
            );
        }

        // Send thank-you email (fire-and-forget)
        sendBundlePurchaseEmail({
            to: purchase.email,
            name: purchase.name,
            accessToken: purchase.access_token,
        }).catch((err) => console.error("Bundle email failed:", err));

        // Mark email as sent
        supabase
            .from("bundle_purchases")
            .update({ email_sent: true })
            .eq("id", purchaseId)
            .then(() => {});

        // Notify admin (fire-and-forget)
        sendAdminNotification({
            eventType: "Bundle Purchase",
            userEmail: purchase.email,
            details: `${purchase.name} רכש את חבילת Claude לכספים. סכום: ₪150`,
        }).catch(() => {});

        return NextResponse.json({
            success: true,
            accessToken: purchase.access_token,
        });
    } catch (err) {
        console.error("capture-order error:", err);
        return NextResponse.json({ error: "שגיאת שרת" }, { status: 500 });
    }
}
