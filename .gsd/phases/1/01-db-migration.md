---
phase: 1
plan: 1
wave: 1
depends_on: []
files_modified:
  - supabase/migrations/20260327000000_subscription_fields.sql
autonomous: true
user_setup:
  - service: supabase
    why: "Migration must be applied to production DB"
    dashboard_config:
      - task: "Run migration in Supabase SQL Editor after file is created"
        location: "Supabase Dashboard → SQL Editor → paste and run the migration SQL"

must_haves:
  truths:
    - "profiles table has subscription_end_date column"
    - "profiles table has paypal_subscription_id column"
  artifacts:
    - "supabase/migrations/20260327000000_subscription_fields.sql exists"
  key_links:
    - "Migration is idempotent (uses ADD COLUMN IF NOT EXISTS)"
---

# Plan 1.1: DB Migration — Subscription Fields

<objective>
Add two new columns to the profiles table required for grace-period and subscription tracking.

Purpose: Nothing else in this sprint can work without these columns. subscription_end_date enables grace period access. paypal_subscription_id enables looking up the subscription in PayPal if needed.
Output: One SQL migration file ready to apply.
</objective>

<context>
Load for context:
- supabase/migrations/20240217000000_init_blog_gating.sql (existing schema)
</context>

<tasks>

<task type="auto">
  <name>Create migration file with new profile columns</name>
  <files>supabase/migrations/20260327000000_subscription_fields.sql</files>
  <action>
    Create migration with:

    1. ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS subscription_end_date TIMESTAMP WITH TIME ZONE;
    2. ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS paypal_subscription_id TEXT;

    Both nullable — existing rows get NULL (correct default; lifetime users don't have an end date).
    Use IF NOT EXISTS on each ADD COLUMN for idempotency.
    Add a comment block at the top explaining what each field is for.

    AVOID: NOT NULL constraints — existing rows would fail.
    AVOID: DEFAULT values that imply free access for current paying users.
  </action>
  <verify>
    Read the file back and confirm:
    - Both ADD COLUMN IF NOT EXISTS statements present
    - No NOT NULL constraints
    - File is valid SQL (no syntax issues)
  </verify>
  <done>
    File exists at supabase/migrations/20260327000000_subscription_fields.sql.
    Contains both ALTER TABLE statements with IF NOT EXISTS.
  </done>
</task>

<task type="checkpoint:human-action">
  <name>Apply migration to Supabase production DB</name>
  <files>(none — manual step)</files>
  <action>
    Go to Supabase Dashboard → SQL Editor.
    Paste and run the contents of supabase/migrations/20260327000000_subscription_fields.sql.
  </action>
  <verify>
    Run this SQL in Supabase SQL Editor to confirm columns exist:
    SELECT column_name, data_type, is_nullable
    FROM information_schema.columns
    WHERE table_name = 'profiles'
    AND column_name IN ('subscription_end_date', 'paypal_subscription_id');
    Expected: 2 rows returned.
  </verify>
  <done>
    Query returns 2 rows: subscription_end_date (timestamp with time zone, YES nullable) and paypal_subscription_id (text, YES nullable).
  </done>
</task>

</tasks>

<verification>
After all tasks:
- [ ] supabase/migrations/20260327000000_subscription_fields.sql exists and is valid SQL
- [ ] Supabase profiles table has both new columns (confirmed via SQL Editor)
</verification>

<success_criteria>
- [ ] Both columns exist in production profiles table
- [ ] Existing user rows unaffected (no nullability errors)
</success_criteria>
