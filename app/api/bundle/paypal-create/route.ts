/**
 * POST /api/bundle/paypal-create
 *
 * Creates a PayPal order for the bundle purchase.
 * Called by the PayPal SDK createOrder callback on the client.
 */

import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { bundleConfig } from "@/lib/bundle-data";

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
        const { purchaseId } = await req.json();
        if (!purchaseId) {
            return NextResponse.json({ error: "Missing purchaseId" }, { status: 400 });
        }

        // Verify purchase record exists and is pending
        const supabase = createAdminClient();
        const { data: purchase, error: fetchErr } = await supabase
            .from("bundle_purchases")
            .select("id, email, name, status")
            .eq("id", purchaseId)
            .single();

        if (fetchErr || !purchase) {
            return NextResponse.json({ error: "Purchase record not found" }, { status: 404 });
        }

        if (purchase.status === "paid") {
            return NextResponse.json({ error: "Already paid" }, { status: 400 });
        }

        // Create PayPal order
        const accessToken = await getPayPalAccessToken();
        const paypalRes = await fetch(`${getPayPalBase()}/v2/checkout/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                intent: "CAPTURE",
                purchase_units: [
                    {
                        reference_id: purchaseId,
                        custom_id: purchaseId,
                        description: bundleConfig.name,
                        amount: {
                            currency_code: bundleConfig.currency,
                            value: String(bundleConfig.price),
                        },
                    },
                ],
                payment_source: {
                    paypal: {
                        experience_context: {
                            brand_name: "AI Finance — רונן עמוס",
                            locale: "he-IL",
                            user_action: "PAY_NOW",
                            return_url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.ronenamoscpa.co.il"}/claude-bundle/thanks`,
                            cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.ronenamoscpa.co.il"}/claude-bundle`,
                        },
                    },
                },
            }),
        });

        const paypalData = await paypalRes.json();
        if (!paypalRes.ok) {
            console.error("PayPal create order error:", paypalData);
            return NextResponse.json(
                { error: "Failed to create PayPal order" },
                { status: 500 }
            );
        }

        return NextResponse.json({ paypalOrderId: paypalData.id });
    } catch (err) {
        console.error("paypal-create error:", err);
        return NextResponse.json({ error: "שגיאת שרת" }, { status: 500 });
    }
}
