import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendPurchaseConfirmationEmail } from "@/lib/actions/email";

const PAYPAL_API_BASE = process.env.NEXT_PUBLIC_PAYPAL_SANDBOX === "true"
    ? "https://api-m.sandbox.paypal.com"
    : "https://api-m.paypal.com";

async function getPayPalAccessToken(): Promise<string> {
    const isSandbox = process.env.NEXT_PUBLIC_PAYPAL_SANDBOX === "true";
    const clientId = isSandbox
        ? process.env.NEXT_PUBLIC_PAYPAL_SANDBOX_CLIENT_ID
        : process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const secret = isSandbox
        ? process.env.PAYPAL_SANDBOX_SECRET_KEY
        : process.env.PAYPAL_SECRET_KEY;

    const res = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
        method: "POST",
        headers: {
            Authorization: `Basic ${Buffer.from(`${clientId}:${secret}`).toString("base64")}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
    });

    const data = await res.json();
    return data.access_token;
}

async function verifyWebhookSignature(req: NextRequest, body: string): Promise<boolean> {
    const webhookId = process.env.PAYPAL_WEBHOOK_ID;
    if (!webhookId) {
        console.error("PAYPAL_WEBHOOK_ID not set — cannot verify webhook");
        return false;
    }

    const accessToken = await getPayPalAccessToken();

    const verifyRes = await fetch(`${PAYPAL_API_BASE}/v1/notifications/verify-webhook-signature`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            auth_algo: req.headers.get("paypal-auth-algo"),
            cert_url: req.headers.get("paypal-cert-url"),
            transmission_id: req.headers.get("paypal-transmission-id"),
            transmission_sig: req.headers.get("paypal-transmission-sig"),
            transmission_time: req.headers.get("paypal-transmission-time"),
            webhook_id: webhookId,
            webhook_event: JSON.parse(body),
        }),
    });

    const result = await verifyRes.json();
    return result.verification_status === "SUCCESS";
}

export async function POST(req: NextRequest) {
    const body = await req.text();

    // 1. Verify the webhook signature
    const isValid = await verifyWebhookSignature(req, body);
    if (!isValid) {
        console.error("PayPal webhook signature verification failed");
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = JSON.parse(body);
    const eventType = event.event_type;

    console.log(`PayPal webhook received: ${eventType}`);

    // 2. Handle relevant events
    if (eventType === "PAYMENT.CAPTURE.COMPLETED") {
        await handlePaymentCompleted(event);
    } else if (eventType === "BILLING.SUBSCRIPTION.ACTIVATED") {
        await handleSubscriptionActivated(event);
    } else if (eventType === "BILLING.SUBSCRIPTION.CANCELLED" || eventType === "BILLING.SUBSCRIPTION.SUSPENDED") {
        await handleSubscriptionCancelled(event);
    }

    return NextResponse.json({ received: true });
}

async function handlePaymentCompleted(event: any) {
    const resource = event.resource;
    const orderId = resource.id;
    const amount = parseFloat(resource.amount?.value || "0");
    const payerEmail = resource.payer?.email_address;

    const adminSupabase = createAdminClient();

    // Check if we already processed this payment (idempotency)
    const { data: existing } = await adminSupabase
        .from("payment_records")
        .select("id")
        .eq("paypal_order_id", orderId)
        .maybeSingle();

    if (existing) {
        console.log(`Payment ${orderId} already recorded, skipping`);
        return;
    }

    // Find user by email
    const { data: { users } } = await adminSupabase.auth.admin.listUsers();
    const user = users?.find((u) => u.email === payerEmail);

    if (!user) {
        console.error(`Webhook: No user found for email ${payerEmail}, order ${orderId}`);
        return;
    }

    // Record payment
    await adminSupabase.from("payment_records").insert({
        user_id: user.id,
        amount,
        paypal_order_id: orderId,
        status: "COMPLETED",
    });

    // Activate lifetime subscription (one-time payment)
    await adminSupabase.from("profiles").upsert({
        id: user.id,
        subscription_status: "lifetime",
        updated_at: new Date().toISOString(),
    });

    // Send confirmation email
    if (payerEmail) {
        await sendPurchaseConfirmationEmail({
            to: payerEmail,
            planName: "Lifetime PRO — תשלום חד-פעמי",
            amount,
            orderId,
        }).catch((err) => console.error("Webhook email error:", err));
    }
}

async function handleSubscriptionActivated(event: any) {
    const resource = event.resource;
    const subscriptionId = resource.id;
    const subscriberEmail = resource.subscriber?.email_address;

    const adminSupabase = createAdminClient();

    // Check if already processed
    const { data: existing } = await adminSupabase
        .from("payment_records")
        .select("id")
        .eq("paypal_order_id", subscriptionId)
        .maybeSingle();

    if (existing) {
        console.log(`Subscription ${subscriptionId} already recorded, skipping`);
        return;
    }

    // Find user by email
    const { data: { users } } = await adminSupabase.auth.admin.listUsers();
    const user = users?.find((u) => u.email === subscriberEmail);

    if (!user) {
        console.error(`Webhook: No user found for email ${subscriberEmail}, subscription ${subscriptionId}`);
        return;
    }

    // Record payment
    await adminSupabase.from("payment_records").insert({
        user_id: user.id,
        amount: 10,
        paypal_order_id: subscriptionId,
        status: "COMPLETED",
    });

    // Activate monthly subscription
    await adminSupabase.from("profiles").upsert({
        id: user.id,
        subscription_status: "monthly",
        updated_at: new Date().toISOString(),
    });

    if (subscriberEmail) {
        await sendPurchaseConfirmationEmail({
            to: subscriberEmail,
            planName: "Monthly Flexible — ₪10/חודש",
            amount: 10,
            orderId: subscriptionId,
        }).catch((err) => console.error("Webhook email error:", err));
    }
}

async function handleSubscriptionCancelled(event: any) {
    const resource = event.resource;
    const subscriberEmail = resource.subscriber?.email_address;

    const adminSupabase = createAdminClient();

    // Find user by email
    const { data: { users } } = await adminSupabase.auth.admin.listUsers();
    const user = users?.find((u) => u.email === subscriberEmail);

    if (!user) {
        console.error(`Webhook: No user found for cancelled subscription, email ${subscriberEmail}`);
        return;
    }

    // Downgrade to free
    await adminSupabase.from("profiles").upsert({
        id: user.id,
        subscription_status: "free",
        updated_at: new Date().toISOString(),
    });

    console.log(`Subscription cancelled for user ${user.id}`);
}
