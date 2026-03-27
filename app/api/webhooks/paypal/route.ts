import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendPurchaseEmail as sendPurchaseConfirmationEmail, sendAdminNotification } from "@/lib/mailer";

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
    let handled = true;
    if (eventType === "PAYMENT.CAPTURE.COMPLETED") {
        handled = await handlePaymentCompleted(event);
    } else if (eventType === "BILLING.SUBSCRIPTION.ACTIVATED") {
        handled = await handleSubscriptionActivated(event);
    } else if (eventType === "BILLING.SUBSCRIPTION.CANCELLED" || eventType === "BILLING.SUBSCRIPTION.SUSPENDED") {
        handled = await handleSubscriptionCancelled(event);
    } else if (eventType === "PAYMENT.SALE.COMPLETED") {
        handled = await handleSubscriptionRenewal(event);
    } else if (eventType === "BILLING.SUBSCRIPTION.PAYMENT.FAILED") {
        handled = await handlePaymentFailed(event);
    } else if (eventType === "BILLING.SUBSCRIPTION.EXPIRED") {
        handled = await handleSubscriptionExpired(event);
    }

    if (!handled) {
        return NextResponse.json({ warning: "user not found or already processed" }, { status: 200 });
    }

    return NextResponse.json({ received: true });
}

async function handlePaymentCompleted(event: any): Promise<boolean> {
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
        return true;
    }

    // Find user by email via profiles table
    const { data: profile, error: userLookupError } = await adminSupabase
        .from("profiles")
        .select("id")
        .eq("email", payerEmail)
        .maybeSingle();

    if (userLookupError || !profile) {
        console.error(`Webhook: No user found for email ${payerEmail}, order ${orderId}`);
        return false;
    }

    // Record payment (non-blocking — duplicate is safe to ignore)
    try {
        await adminSupabase.from("payment_records").insert({
            user_id: profile.id,
            amount,
            paypal_order_id: orderId,
            status: "COMPLETED",
        });
    } catch (e) {
        console.error("payment_records insert failed (likely duplicate):", e);
    }

    // Activate lifetime subscription (one-time payment)
    const { error: profileError } = await adminSupabase.from("profiles").upsert({
        id: profile.id,
        subscription_status: "lifetime",
        updated_at: new Date().toISOString(),
    });
    if (profileError) {
        console.error("Profile upsert failed (lifetime):", profileError.message);
        return false;
    }

    // Send confirmation email
    if (payerEmail) {
        await sendPurchaseConfirmationEmail({
            to: payerEmail,
            planName: "Lifetime PRO — תשלום חד-פעמי",
            amount,
            orderId,
        }).catch((err) => console.error("Webhook email error:", err));
    }

    return true;
}

async function handleSubscriptionActivated(event: any): Promise<boolean> {
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
        return true;
    }

    // Find user by email via profiles table
    const { data: profile, error: userLookupError } = await adminSupabase
        .from("profiles")
        .select("id")
        .eq("email", subscriberEmail)
        .maybeSingle();

    if (userLookupError || !profile) {
        console.error(`Webhook: No user found for email ${subscriberEmail}, subscription ${subscriptionId}`);
        return false;
    }

    // Record payment (non-blocking — duplicate is safe to ignore)
    try {
        await adminSupabase.from("payment_records").insert({
            user_id: profile.id,
            amount: 10,
            paypal_order_id: subscriptionId,
            status: "COMPLETED",
        });
    } catch (e) {
        console.error("payment_records insert failed (likely duplicate):", e);
    }

    // Activate monthly subscription
    const { error: profileError } = await adminSupabase.from("profiles").upsert({
        id: profile.id,
        subscription_status: "monthly",
        paypal_subscription_id: subscriptionId,
        updated_at: new Date().toISOString(),
    });
    if (profileError) {
        console.error("Profile upsert failed (monthly):", profileError.message);
        return false;
    }

    if (subscriberEmail) {
        await sendPurchaseConfirmationEmail({
            to: subscriberEmail,
            planName: "Monthly Flexible — ₪10/חודש",
            amount: 10,
            orderId: subscriptionId,
        }).catch((err) => console.error("Webhook email error:", err));
    }

    return true;
}

async function handleSubscriptionCancelled(event: any): Promise<boolean> {
    const resource = event.resource;
    const subscriberEmail = resource.subscriber?.email_address;

    const adminSupabase = createAdminClient();

    // Find user by email via profiles table
    const { data: profile, error: userLookupError } = await adminSupabase
        .from("profiles")
        .select("id")
        .eq("email", subscriberEmail)
        .maybeSingle();

    if (userLookupError || !profile) {
        console.error(`Webhook: No user found for cancelled subscription, email ${subscriberEmail}`);
        return false;
    }

    // Determine grace period end date with fallback chain
    let endDate: string;
    if (resource.billing_info?.next_billing_time) {
        // Already paid until this date — use it as end of access
        endDate = resource.billing_info.next_billing_time;
    } else if (resource.billing_info?.last_payment?.time) {
        // Add 30 days from last payment date
        endDate = new Date(
            new Date(resource.billing_info.last_payment.time).getTime() + 30 * 24 * 60 * 60 * 1000
        ).toISOString();
    } else {
        // Last resort: 30 days from now
        endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    }

    // Set cancelled status with grace period (not "free" — user keeps access until endDate)
    const { error: profileError } = await adminSupabase.from("profiles").upsert({
        id: profile.id,
        subscription_status: "cancelled",
        subscription_end_date: endDate,
        paypal_subscription_id: resource.id,
        updated_at: new Date().toISOString(),
    });
    if (profileError) {
        console.error("Profile upsert failed (cancellation):", profileError.message);
        return false;
    }

    console.log(`Subscription cancelled for user ${profile.id}, access until ${endDate}`);

    sendAdminNotification({
        eventType: "Subscription Cancelled",
        userEmail: subscriberEmail,
        details: `Subscription ID: ${resource.id}\nEnd date: ${endDate}`,
    }).catch(() => {});

    return true;
}

async function handleSubscriptionRenewal(event: any): Promise<boolean> {
    const resource = event.resource;
    const subscriberEmail = resource.payer?.email_address;
    const subscriptionId = resource.billing_agreement_id;
    const amount = parseFloat(resource.amount?.total || "0");

    const adminSupabase = createAdminClient();

    // Find user by email via profiles table
    const { data: profile, error: userLookupError } = await adminSupabase
        .from("profiles")
        .select("id")
        .eq("email", subscriberEmail)
        .maybeSingle();

    if (userLookupError || !profile) {
        console.error(`Webhook: No user found for renewal, email ${subscriberEmail}, subscription ${subscriptionId}`);
        return false;
    }

    // Extend end date by 30 days
    const newEndDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    const now = new Date().toISOString();

    // Record payment (non-blocking — duplicate is safe to ignore)
    try {
        await adminSupabase.from("payment_records").insert({
            user_id: profile.id,
            amount,
            paypal_order_id: subscriptionId,
            status: "COMPLETED",
        });
    } catch (e) {
        console.error("payment_records insert failed (likely duplicate):", e);
    }

    // Re-activate if payment_failed, extend end date
    const { error: profileError } = await adminSupabase.from("profiles").upsert({
        id: profile.id,
        subscription_status: "monthly",
        subscription_end_date: newEndDate,
        updated_at: now,
    });
    if (profileError) {
        console.error("Profile upsert failed (renewal):", profileError.message);
        return false;
    }

    console.log(`Subscription renewed for user ${profile.id}, extended until ${newEndDate}`);
    return true;
}

async function handlePaymentFailed(event: any): Promise<boolean> {
    const resource = event.resource;
    const subscriberEmail = resource.subscriber?.email_address;
    const subscriptionId = resource.id;

    const adminSupabase = createAdminClient();

    // Find user by email via profiles table
    const { data: profile, error: userLookupError } = await adminSupabase
        .from("profiles")
        .select("id")
        .eq("email", subscriberEmail)
        .maybeSingle();

    if (userLookupError || !profile) {
        console.error(`Webhook: No user found for payment failure, email ${subscriberEmail}, subscription ${subscriptionId}`);
        return false;
    }

    // Set payment_failed status
    const { error: profileError } = await adminSupabase.from("profiles").upsert({
        id: profile.id,
        subscription_status: "payment_failed",
        updated_at: new Date().toISOString(),
    });
    if (profileError) {
        console.error("Profile upsert failed (payment_failed):", profileError.message);
        return false;
    }

    console.log(`Payment failed for user ${profile.id}, subscription ${subscriptionId}`);

    sendAdminNotification({
        eventType: "Payment Failed",
        userEmail: subscriberEmail,
        details: `Subscription ID: ${subscriptionId}\nUser may lose access soon.`,
    }).catch(() => {});

    return true;
}

async function handleSubscriptionExpired(event: any): Promise<boolean> {
    const resource = event.resource;
    const subscriberEmail = resource.subscriber?.email_address;

    const adminSupabase = createAdminClient();

    // Find user by email via profiles table
    const { data: profile, error: userLookupError } = await adminSupabase
        .from("profiles")
        .select("id")
        .eq("email", subscriberEmail)
        .maybeSingle();

    if (userLookupError || !profile) {
        console.error(`Webhook: No user found for expired subscription, email ${subscriberEmail}`);
        return false;
    }

    // Downgrade to free — subscription has fully expired
    const { error: profileError } = await adminSupabase.from("profiles").upsert({
        id: profile.id,
        subscription_status: "free",
        subscription_end_date: null,
        updated_at: new Date().toISOString(),
    });
    if (profileError) {
        console.error("Profile upsert failed (expired):", profileError.message);
        return false;
    }

    console.log(`Subscription expired for user ${profile.id}, downgraded to free`);
    return true;
}
