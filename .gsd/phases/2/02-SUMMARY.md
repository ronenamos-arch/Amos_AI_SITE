---
phase: 2
plan: 2
status: done
commit: 38e70ca
---

# Summary — Plan 2.2: Webhook New Events + Grace Period

## Changes Made

### File modified: `app/api/webhooks/paypal/route.ts`

**TASK 1 — handleSubscriptionCancelled (grace period fix)**
- Status changed from `"free"` to `"cancelled"` — user keeps access during paid period
- `subscription_end_date` extracted via 3-step fallback chain:
  1. `resource.billing_info?.next_billing_time` (most accurate — date already paid until)
  2. `resource.billing_info?.last_payment?.time` + 30 days
  3. `Date.now() + 30 days` (last resort)
- `paypal_subscription_id: resource.id` added to upsert
- `sendAdminNotification` called after upsert (non-blocking `.catch(() => {})`)

**TASK 2 — handleSubscriptionActivated**
- Added `paypal_subscription_id: subscriptionId` to existing upsert

**TASK 2 — handleSubscriptionRenewal (new)**
- Triggered by `PAYMENT.SALE.COMPLETED`
- Extends `subscription_end_date` by 30 days from now
- Re-sets `subscription_status` to `"monthly"` (re-activates if was `payment_failed`)
- Inserts payment record (non-blocking try/catch)

**TASK 2 — handlePaymentFailed (new)**
- Triggered by `BILLING.SUBSCRIPTION.PAYMENT.FAILED`
- Sets `subscription_status` to `"payment_failed"`
- Calls `sendAdminNotification` (non-blocking)

**TASK 2 — handleSubscriptionExpired (new)**
- Triggered by `BILLING.SUBSCRIPTION.EXPIRED`
- Sets `subscription_status` to `"free"`, clears `subscription_end_date`

**POST handler dispatch — 7 event types now handled:**
1. `PAYMENT.CAPTURE.COMPLETED` → handlePaymentCompleted
2. `BILLING.SUBSCRIPTION.ACTIVATED` → handleSubscriptionActivated
3. `BILLING.SUBSCRIPTION.CANCELLED` → handleSubscriptionCancelled
4. `BILLING.SUBSCRIPTION.SUSPENDED` → handleSubscriptionCancelled (same handler)
5. `PAYMENT.SALE.COMPLETED` → handleSubscriptionRenewal
6. `BILLING.SUBSCRIPTION.PAYMENT.FAILED` → handlePaymentFailed
7. `BILLING.SUBSCRIPTION.EXPIRED` → handleSubscriptionExpired

### Import updated
`sendAdminNotification` imported from `@/lib/mailer` (added by parallel agent 2.1).

## TypeScript
`npx tsc --noEmit` → 0 errors

## User Action Required
Subscribe these new events in PayPal Developer Dashboard → My Apps → your app → Webhooks → Edit:
- `PAYMENT.SALE.COMPLETED`
- `BILLING.SUBSCRIPTION.PAYMENT.FAILED`
- `BILLING.SUBSCRIPTION.EXPIRED`
