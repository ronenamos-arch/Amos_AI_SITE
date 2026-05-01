---
phase: 2
plan: 2
wave: 2
depends_on: [1.1, 2.1]
files_modified:
  - app/api/webhooks/paypal/route.ts
autonomous: true
user_setup:
  - service: paypal
    why: "New webhook events must be subscribed in PayPal Dashboard"
    dashboard_config:
      - task: "Add new webhook event subscriptions"
        location: "PayPal Developer Dashboard → My Apps → your app → Webhooks → Edit"
        events_to_add:
          - PAYMENT.SALE.COMPLETED
          - BILLING.SUBSCRIPTION.PAYMENT.FAILED
          - BILLING.SUBSCRIPTION.EXPIRED

must_haves:
  truths:
    - "BILLING.SUBSCRIPTION.CANCELLED sets status='cancelled' + subscription_end_date (not 'free')"
    - "PAYMENT.SALE.COMPLETED extends subscription_end_date by 30 days and records payment"
    - "BILLING.SUBSCRIPTION.PAYMENT.FAILED sends admin notification email"
    - "BILLING.SUBSCRIPTION.EXPIRED sets status='free'"
    - "paypal_subscription_id stored on ACTIVATED and CANCELLED events"
  artifacts:
    - "app/api/webhooks/paypal/route.ts handles 6 event types total"
  key_links:
    - "All profile upserts use adminSupabase (service role) — bypasses RLS"
    - "sendAdminNotification imported from lib/mailer (no 'use server')"
---

# Plan 2.2: Webhook New Events + Grace Period

<objective>
Extend the PayPal webhook handler with 3 new event types and fix the cancellation to use grace period instead of immediate downgrade.

Purpose: This is the core of the payment hardening. Cancellation must not be instant. Renewals must extend access. Failures must alert admin.
Output: Updated webhook handler covering all 6 relevant PayPal events.
</objective>

<context>
Load for context:
- app/api/webhooks/paypal/route.ts (full current file — read before editing)
- lib/mailer.ts (to confirm sendAdminNotification signature)
</context>

<tasks>

<task type="auto">
  <name>Fix handleSubscriptionCancelled — grace period instead of immediate free</name>
  <files>app/api/webhooks/paypal/route.ts</files>
  <action>
    Modify handleSubscriptionCancelled():

    1. Change subscription_status from "free" to "cancelled"
    2. Extract subscription_end_date from PayPal payload:
       - Try: resource.billing_info?.next_billing_time (ISO string — the date they already paid until)
       - Fallback: resource.billing_info?.last_payment?.time → add 30 days
       - Last fallback: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    3. Add paypal_subscription_id: resource.id to the upsert
    4. After successful upsert, call sendAdminNotification({
         eventType: "Subscription Cancelled",
         userEmail: subscriberEmail,
         details: `Subscription ID: ${resource.id}\nEnd date: ${endDate}`
       })
    5. Import sendAdminNotification at top of file from "@/lib/mailer"

    Full upsert object:
    {
      id: profile.id,
      subscription_status: "cancelled",
      subscription_end_date: endDate,
      paypal_subscription_id: resource.id,
      updated_at: new Date().toISOString()
    }

    AVOID: Setting status="free" — user paid for the period, they keep access.
    AVOID: Throwing on admin email failure — wrap in .catch() (non-blocking).
  </action>
  <verify>
    Read the updated handleSubscriptionCancelled function.
    Confirm: status="cancelled", subscription_end_date extracted from payload with fallback chain, admin email called.
  </verify>
  <done>
    handleSubscriptionCancelled sets status="cancelled" + subscription_end_date. Admin notified.
  </done>
</task>

<task type="auto">
  <name>Add handleSubscriptionRenewal, handlePaymentFailed, handleSubscriptionExpired</name>
  <files>app/api/webhooks/paypal/route.ts</files>
  <action>
    Also store paypal_subscription_id in handleSubscriptionActivated (add to existing upsert).

    Add 3 new handler functions:

    --- handleSubscriptionRenewal(event) ---
    Triggered by: PAYMENT.SALE.COMPLETED
    PayPal payload: resource.billing_agreement_id = subscription ID, resource.amount.total = amount
    Logic:
    1. subscriberEmail = resource.payer?.email_address
    2. Find profile by email (same pattern as other handlers)
    3. Extend subscription_end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    4. Set subscription_status = "monthly" (re-activate if was payment_failed)
    5. Insert into payment_records (non-blocking try/catch for duplicates)
    6. Upsert profiles with new end date + status

    --- handlePaymentFailed(event) ---
    Triggered by: BILLING.SUBSCRIPTION.PAYMENT.FAILED
    PayPal payload: resource.subscriber.email_address, resource.id
    Logic:
    1. Find profile by email (same pattern)
    2. Upsert profiles: subscription_status = "payment_failed"
    3. Send admin notification (blocking — await):
       sendAdminNotification({
         eventType: "Payment Failed",
         userEmail: subscriberEmail,
         details: `Subscription ID: ${resource.id}\nUser may lose access soon.`
       })
    4. Return true even if admin email fails (catch it)

    --- handleSubscriptionExpired(event) ---
    Triggered by: BILLING.SUBSCRIPTION.EXPIRED
    Logic:
    1. Find profile by email
    2. Upsert profiles: subscription_status = "free", subscription_end_date = null
    3. Return true

    Wire up in POST handler — add to the if/else chain:
    } else if (eventType === "PAYMENT.SALE.COMPLETED") {
        handled = await handleSubscriptionRenewal(event);
    } else if (eventType === "BILLING.SUBSCRIPTION.PAYMENT.FAILED") {
        handled = await handlePaymentFailed(event);
    } else if (eventType === "BILLING.SUBSCRIPTION.EXPIRED") {
        handled = await handleSubscriptionExpired(event);
    }

    AVOID: Forgetting to add all 3 to the POST handler dispatch.
    AVOID: Throwing on email errors — non-blocking.
  </action>
  <verify>
    Read app/api/webhooks/paypal/route.ts in full.
    Count event types handled in POST function — should be 6:
    PAYMENT.CAPTURE.COMPLETED, BILLING.SUBSCRIPTION.ACTIVATED,
    BILLING.SUBSCRIPTION.CANCELLED, BILLING.SUBSCRIPTION.SUSPENDED,
    PAYMENT.SALE.COMPLETED, BILLING.SUBSCRIPTION.PAYMENT.FAILED,
    BILLING.SUBSCRIPTION.EXPIRED

    Run TypeScript check:
    export PATH="/c/Program Files/nodejs:$PATH" && cd "c:\Users\Ronen\Documents\Projects\Personal\Antigravity\blog andwebsite\site" && npx tsc --noEmit 2>&1
    Expected: 0 errors
  </verify>
  <done>
    7 event types dispatched in POST. 3 new handlers implemented. TypeScript clean.
  </done>
</task>

</tasks>

<verification>
After all tasks:
- [ ] handleSubscriptionCancelled: status="cancelled" + subscription_end_date stored
- [ ] handleSubscriptionRenewal: extends end date 30 days + re-sets monthly status
- [ ] handlePaymentFailed: sets payment_failed status + admin email sent
- [ ] handleSubscriptionExpired: sets status="free"
- [ ] All 7 event types dispatched in POST handler
- [ ] TypeScript: 0 errors
</verification>

<success_criteria>
- [ ] npx tsc --noEmit → 0 errors
- [ ] Cancelled users get grace period, not instant downgrade
- [ ] Admin gets email on cancel and payment failure
</success_criteria>
