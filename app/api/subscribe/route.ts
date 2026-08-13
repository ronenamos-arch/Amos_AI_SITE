import { NextResponse } from "next/server";
import { getMonthlyPlanId, getSubscribeUrl, isPayPalSandbox } from "@/lib/paypal-subscribe";

/**
 * Creates the PayPal subscription server-side so we can set a return_url.
 *
 * PayPal's hosted subscribe page (getSubscribeUrl) has no way to bring the
 * buyer back to the site — subscription *plans* have no return-URL setting in
 * the dashboard (unlike one-off payment buttons). Creating the subscription
 * via the API lets us pass application_context.return_url, so after approving
 * the payment the buyer lands on /thanks instead of staying on PayPal.
 *
 * Access is still granted exclusively by the webhook at /api/webhooks/paypal;
 * this route only improves where the browser ends up. If anything here fails
 * we fall back to the hosted subscribe page rather than showing an error —
 * a worse landing page must never block a sale.
 */

export const dynamic = "force-dynamic";

const PAYPAL_API_BASE = () =>
    isPayPalSandbox()
        ? "https://api-m.sandbox.paypal.com"
        : "https://api-m.paypal.com";

async function getPayPalAccessToken(): Promise<string | null> {
    const sandbox = isPayPalSandbox();
    const clientId = sandbox
        ? process.env.NEXT_PUBLIC_PAYPAL_SANDBOX_CLIENT_ID
        : process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const secret = sandbox
        ? process.env.PAYPAL_SANDBOX_SECRET_KEY
        : process.env.PAYPAL_SECRET_KEY;
    if (!clientId || !secret) return null;

    const res = await fetch(`${PAYPAL_API_BASE()}/v1/oauth2/token`, {
        method: "POST",
        headers: {
            Authorization: `Basic ${Buffer.from(`${clientId}:${secret}`).toString("base64")}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
        cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.access_token ?? null;
}

export async function GET() {
    const fallback = NextResponse.redirect(getSubscribeUrl(), 302);

    try {
        const planId = getMonthlyPlanId();
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
        if (!planId || !siteUrl) {
            console.error("subscribe: missing plan ID or NEXT_PUBLIC_SITE_URL — falling back to hosted page");
            return fallback;
        }

        const accessToken = await getPayPalAccessToken();
        if (!accessToken) {
            console.error("subscribe: could not get PayPal access token — falling back to hosted page");
            return fallback;
        }

        const res = await fetch(`${PAYPAL_API_BASE()}/v1/billing/subscriptions`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                plan_id: planId,
                application_context: {
                    brand_name: "רונן עמוס — AI בכספים",
                    locale: "he-IL",
                    user_action: "SUBSCRIBE_NOW",
                    return_url: `${siteUrl}/thanks`,
                    cancel_url: `${siteUrl}/`,
                },
            }),
            cache: "no-store",
        });

        if (!res.ok) {
            console.error("subscribe: create subscription failed", res.status, await res.text());
            return fallback;
        }

        const data = await res.json();
        const approveUrl = (data.links as { rel: string; href: string }[] | undefined)?.find(
            (l) => l.rel === "approve"
        )?.href;

        if (!approveUrl) {
            console.error("subscribe: no approve link in PayPal response", data);
            return fallback;
        }

        return NextResponse.redirect(approveUrl, 302);
    } catch (err) {
        console.error("subscribe: unexpected error — falling back to hosted page", err);
        return fallback;
    }
}
