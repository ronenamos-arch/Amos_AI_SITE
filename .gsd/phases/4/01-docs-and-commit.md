---
phase: 4
plan: 1
wave: 4
depends_on: [2.1, 2.2, 3.1, 3.2]
files_modified:
  - CLAUDE.md
autonomous: true
user_setup: []

must_haves:
  truths:
    - "CLAUDE.md reflects all new webhook events, new DB fields, and grace period logic"
    - "All changes committed in one atomic commit"
    - "TypeScript is clean before commit"
  artifacts:
    - "Git commit on main with all sprint changes"
  key_links:
    - "CLAUDE.md is the source of truth for future AI sessions on this project"
---

# Plan 4.1: Documentation + Final Commit

<objective>
Update CLAUDE.md with the new payment flow details and commit everything.

Purpose: Future AI sessions must know about new DB fields, new webhook events, and the grace period logic — otherwise they'll get it wrong again.
Output: Updated CLAUDE.md + clean git commit.
</objective>

<context>
Load for context:
- CLAUDE.md (full file)
</context>

<tasks>

<task type="auto">
  <name>Update CLAUDE.md with payment hardening details</name>
  <files>CLAUDE.md</files>
  <action>
    Read CLAUDE.md in full first.

    1. In the "## Completed" section, find the payment flow bugfix entry and REPLACE it with:
    - [x] Payment flow hardened — grace period on cancel, renewal tracking, admin alerts, expiry cron

    2. Add a new section "## Payment Flow Architecture" after the "## Email Architecture Note" section:

    ## Payment Flow Architecture

    ### subscription_status values
    - `free` — no access
    - `monthly` — active subscriber
    - `lifetime` — permanent access
    - `cancelled` — cancelled but within paid period (grace period — still has access until subscription_end_date)
    - `payment_failed` — renewal payment failed (no access)

    ### profiles table fields (payment-related)
    - `subscription_status TEXT` — see above
    - `subscription_end_date TIMESTAMP WITH TIME ZONE` — when current paid period ends (monthly/cancelled only)
    - `paypal_subscription_id TEXT` — PayPal subscription ID for reference

    ### Webhook events handled
    - `PAYMENT.CAPTURE.COMPLETED` → status=lifetime
    - `BILLING.SUBSCRIPTION.ACTIVATED` → status=monthly + store paypal_subscription_id
    - `BILLING.SUBSCRIPTION.CANCELLED` / `SUSPENDED` → status=cancelled + subscription_end_date (grace period) + admin email
    - `PAYMENT.SALE.COMPLETED` → extends subscription_end_date +30 days
    - `BILLING.SUBSCRIPTION.PAYMENT.FAILED` → status=payment_failed + admin email
    - `BILLING.SUBSCRIPTION.EXPIRED` → status=free

    ### Access gate logic (app/blog/[slug]/page.tsx)
    ```
    hasAccess = !post.premium
      || status === 'monthly'
      || status === 'lifetime'
      || (status === 'cancelled' && subscription_end_date > now)
    ```

    ### Expiry cron
    Daily at 07:00 UTC — piggybacks on send-scheduled-newsletters cron.
    Downgrades all cancelled users past subscription_end_date to free.

    ### Admin notifications
    sendAdminNotification() in lib/mailer.ts → ronenamos@gmail.com
    Triggered on: cancellation, payment failure.

    AVOID: Changing anything outside of these two sections.
  </action>
  <verify>
    Read CLAUDE.md.
    Confirm:
    1. "Payment Flow Architecture" section exists with all 5 status values documented
    2. All 7 webhook events listed
    3. Access gate logic shown
  </verify>
  <done>CLAUDE.md has complete payment flow documentation.</done>
</task>

<task type="auto">
  <name>Final TypeScript check and commit all sprint changes</name>
  <files>(git)</files>
  <action>
    1. Run TypeScript check first:
    export PATH="/c/Program Files/nodejs:$PATH" && npx tsc --noEmit
    STOP if any errors — do not commit broken TypeScript.

    2. Stage these files:
    - supabase/migrations/20260327000000_subscription_fields.sql
    - lib/emails/admin-notification.ts
    - lib/mailer.ts
    - app/api/webhooks/paypal/route.ts
    - app/blog/[slug]/page.tsx
    - app/api/cron/send-scheduled-newsletters/route.ts
    - CLAUDE.md

    3. Commit with message:
    feat: production-grade subscription payment flow

    - Grace period on cancellation: status='cancelled' + end date stored,
      access kept until subscription_end_date passes
    - New webhook events: PAYMENT.SALE.COMPLETED (extends end date),
      BILLING.SUBSCRIPTION.PAYMENT.FAILED (admin alert),
      BILLING.SUBSCRIPTION.EXPIRED (downgrades to free)
    - Admin email notifications on cancel and payment failure
    - Daily cron cleanup: expired cancelled users downgraded to free
    - New DB columns: subscription_end_date, paypal_subscription_id
    - Access gate updated: cancelled users keep access within paid period

    Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>

    4. git push origin main
  </action>
  <verify>
    git log --oneline -3 — confirm new commit is at HEAD.
    git status — clean working tree.
    TypeScript was 0 errors before commit (confirmed above).
  </verify>
  <done>
    All changes committed and pushed. Vercel deploys automatically.
    Verify Vercel deploy completes at vercel.com/dashboard.
  </done>
</task>

</tasks>

<verification>
After all tasks:
- [ ] CLAUDE.md has "Payment Flow Architecture" section
- [ ] TypeScript: 0 errors
- [ ] Git commit with all 7 changed files
- [ ] Pushed to main — Vercel deploying
</verification>

<success_criteria>
- [ ] git log shows feat: production-grade subscription payment flow commit
- [ ] Vercel deploy succeeds
</success_criteria>
