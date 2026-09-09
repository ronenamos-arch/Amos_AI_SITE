/**
 * POST /api/course/capture-order
 *
 * Captures a PayPal order after the buyer approves payment.
 * Updates course_purchases, grants course_access, sends thank-you email, and sets access cookie.
 */

import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { sendCoursePurchaseEmail, sendAdminNotification } from "@/lib/mailer";

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
            console.error("PayPal capture course failed:", captureData);
            return NextResponse.json(
                { error: "Payment capture failed" },
                { status: 500 }
            );
        }

        // Update purchase record in Supabase
        const supabase = createAdminClient();
        const { data: purchase, error: updateErr } = await supabase
            .from("course_purchases")
            .update({
                status: "paid",
                paid_at: new Date().toISOString(),
                paypal_order_id: paypalOrderId,
            })
            .eq("id", purchaseId)
            .select("access_token, email, name")
            .maybeSingle();

        const buyerEmail = purchase?.email || "customer@example.com";
        const buyerName = purchase?.name || "לומד יקר";
        const token = purchase?.access_token || ("course-token-" + Date.now());

        // Send thank-you email with direct access link
        sendCoursePurchaseEmail({
            to: buyerEmail,
            name: buyerName,
            accessToken: token,
        }).catch((err) => console.error("Course email failed:", err));

        // Mark email as sent
        if (purchase) {
            supabase
                .from("course_purchases")
                .update({ email_sent: true })
                .eq("id", purchaseId)
                .then(() => {});
        }

        // Notify admin
        sendAdminNotification({
            eventType: "Course Purchase: AI Finance Master",
            userEmail: buyerEmail,
            details: `${buyerName} (${buyerEmail}) רכש את קורס AI Finance Master. סכום: ₪599`,
        }).catch(() => {});

        const response = NextResponse.json({
            success: true,
            accessToken: token,
            redirectUrl: `/courses/ai-master-course?course_token=${token}`,
        });

        // Set access cookie for 1 year
        response.cookies.set("course_master_token", token, {
            maxAge: 60 * 60 * 24 * 365,
            path: "/",
            httpOnly: false,
            sameSite: "lax",
        });

        return response;
    } catch (err) {
        console.error("course capture-order error:", err);
        return NextResponse.json({ error: "שגיאת שרת" }, { status: 500 });
    }
}
