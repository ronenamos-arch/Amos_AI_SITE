/**
 * The single source of truth for "where does a subscribe button go".
 *
 * We link to PayPal's hosted subscription page rather than rendering the
 * embedded SDK button. Two reasons: the site's own CTA styling survives (the
 * embedded button is an unstyleable iframe), and activation no longer depends
 * on a client-side onApprove callback firing — the PayPal webhook at
 * /api/webhooks/paypal is the only thing that grants access, so a customer who
 * closes the tab immediately after paying still gets their subscription.
 *
 * The advertised price and this plan ID must change together. A mismatch means
 * charging a different amount than the page promises.
 */
export const SUBSCRIPTION_PRICE = "₪100";
export const SUBSCRIPTION_PERIOD = "לחודש";

const LIVE_MONTHLY_PLAN_ID = "P-9U378293SK117301BNJ4OFDY";

export function isPayPalSandbox(): boolean {
    return process.env.NEXT_PUBLIC_PAYPAL_SANDBOX === "true";
}

export function getMonthlyPlanId(): string | undefined {
    return isPayPalSandbox()
        ? process.env.NEXT_PUBLIC_PAYPAL_SANDBOX_MONTHLY_PLAN_ID
        : LIVE_MONTHLY_PLAN_ID;
}

export function getSubscribeUrl(): string {
    const isSandbox = isPayPalSandbox();
    const planId = getMonthlyPlanId();

    const base = isSandbox
        ? "https://www.sandbox.paypal.com"
        : "https://www.paypal.com";

    return `${base}/webapps/billing/plans/subscribe?plan_id=${planId}`;
}
