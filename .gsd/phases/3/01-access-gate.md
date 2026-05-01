---
phase: 3
plan: 1
wave: 3
depends_on: [1.1, 2.2]
files_modified:
  - app/blog/[slug]/page.tsx
  - lib/blog-supabase.ts
autonomous: true
user_setup: []

must_haves:
  truths:
    - "Users with status='cancelled' retain premium access until subscription_end_date"
    - "Users with status='payment_failed' lose access immediately"
    - "Users with status='free' have no premium access"
    - "Users with status='lifetime' always have access"
  artifacts:
    - "hasAccess logic updated in app/blog/[slug]/page.tsx"
  key_links:
    - "subscription_end_date must be fetched from profiles table alongside subscription_status"
---

# Plan 3.1: Access Gate — Grace Period Support

<objective>
Update the premium content access check to honour the grace period for cancelled subscriptions.

Purpose: Without this, fixing the DB and webhook means nothing — users still lose access on cancel.
Output: Updated hasAccess logic that checks end date for cancelled users.
</objective>

<context>
Load for context:
- app/blog/[slug]/page.tsx (full file — find hasAccess logic)
- lib/blog-supabase.ts (find getDBPostBySlug and profile fetch pattern)
</context>

<tasks>

<task type="auto">
  <name>Update profile fetch to include subscription_end_date</name>
  <files>app/blog/[slug]/page.tsx</files>
  <action>
    Read app/blog/[slug]/page.tsx in full first.

    Find where subscription_status is fetched from the profiles table (likely a supabase .select() call).
    Update the select to also fetch subscription_end_date:
    .select("subscription_status, subscription_end_date")

    Then update the hasAccess calculation:

    CURRENT (likely):
    const hasAccess = !post.premium || subscriptionStatus === 'monthly' || subscriptionStatus === 'lifetime';

    NEW:
    const now = new Date();
    const endDate = subscriptionEndDate ? new Date(subscriptionEndDate) : null;
    const hasAccess = !post.premium
      || subscriptionStatus === 'monthly'
      || subscriptionStatus === 'lifetime'
      || (subscriptionStatus === 'cancelled' && endDate !== null && endDate > now);

    Note: payment_failed and free have no access — they are excluded by the above logic (only the listed statuses grant access).

    AVOID: Granting access to payment_failed users — they lost the payment.
    AVOID: Granting access to cancelled users AFTER end date — check endDate > now strictly.
    AVOID: Breaking the existing force-dynamic directive — it must stay.
  </action>
  <verify>
    Read app/blog/[slug]/page.tsx.
    Confirm:
    1. .select() includes subscription_end_date
    2. hasAccess logic matches the new pattern with date check
    3. export const dynamic = 'force-dynamic' still present

    Run TypeScript check:
    export PATH="/c/Program Files/nodejs:$PATH" && cd "c:\Users\Ronen\Documents\Projects\Personal\Antigravity\blog andwebsite\site" && npx tsc --noEmit 2>&1
    Expected: 0 errors
  </verify>
  <done>
    hasAccess grants access to: monthly, lifetime, cancelled-within-end-date.
    Denies access to: free, payment_failed, cancelled-past-end-date.
    TypeScript clean.
  </done>
</task>

</tasks>

<verification>
After all tasks:
- [ ] subscription_end_date fetched from profiles in blog page
- [ ] hasAccess updated with 4-state logic
- [ ] force-dynamic still present
- [ ] TypeScript: 0 errors
</verification>

<success_criteria>
- [ ] Cancelled user with future end date: hasAccess = true
- [ ] Cancelled user with past end date: hasAccess = false
- [ ] payment_failed user: hasAccess = false
- [ ] TypeScript clean
</success_criteria>
