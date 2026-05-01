---
phase: 3
plan: 2
wave: 3
depends_on: [1.1, 2.2]
files_modified:
  - app/api/cron/send-scheduled-newsletters/route.ts
autonomous: true
user_setup: []

must_haves:
  truths:
    - "Once per day, all cancelled users past their subscription_end_date are downgraded to 'free'"
    - "Cleanup piggybacks on existing daily cron (Vercel Hobby = 1 cron/day)"
    - "Cleanup runs before newsletter send so it doesn't block it"
  artifacts:
    - "app/api/cron/send-scheduled-newsletters/route.ts includes expiry cleanup logic"
  key_links:
    - "Cron endpoint uses CRON_SECRET for authentication — must not break existing auth"
    - "Uses createAdminClient() for the DB query — service role bypasses RLS"
---

# Plan 3.2: Daily Cron — Subscription Expiry Cleanup

<objective>
Piggyback subscription expiry cleanup onto the existing daily cron job so cancelled users are downgraded to 'free' after their paid period ends.

Purpose: Prevents cancelled users from retaining access forever. Vercel Hobby has 1 cron/day limit so we reuse the existing endpoint.
Output: Existing cron route updated with a cleanup step that runs first.
</objective>

<context>
Load for context:
- app/api/cron/send-scheduled-newsletters/route.ts (full current file)
- lib/newsletter-service.ts (to understand what the cron currently calls)
</context>

<tasks>

<task type="auto">
  <name>Add expiry cleanup step to existing daily cron</name>
  <files>app/api/cron/send-scheduled-newsletters/route.ts</files>
  <action>
    Read the full cron route file first.

    Add an expiry cleanup function INSIDE the route file (not a separate module — it's small):

    async function cleanupExpiredSubscriptions(): Promise<{ cleaned: number }> {
      const adminSupabase = createAdminClient();
      const now = new Date().toISOString();

      const { data: expired, error } = await adminSupabase
        .from("profiles")
        .select("id, email")
        .eq("subscription_status", "cancelled")
        .lt("subscription_end_date", now);

      if (error) {
        console.error("Expiry cleanup query failed:", error.message);
        return { cleaned: 0 };
      }

      if (!expired || expired.length === 0) {
        return { cleaned: 0 };
      }

      const ids = expired.map(p => p.id);
      const { error: updateError } = await adminSupabase
        .from("profiles")
        .update({ subscription_status: "free", updated_at: now })
        .in("id", ids);

      if (updateError) {
        console.error("Expiry cleanup update failed:", updateError.message);
        return { cleaned: 0 };
      }

      console.log(`Expiry cleanup: downgraded ${ids.length} users to free`);
      return { cleaned: ids.length };
    }

    Call this at the START of the GET handler, BEFORE the newsletter logic:
    const { cleaned } = await cleanupExpiredSubscriptions();

    Include cleaned count in the response JSON.

    Import createAdminClient at the top if not already imported.

    AVOID: Blocking the newsletter send if cleanup fails — errors are caught and logged.
    AVOID: Adding "use server" — this is a route handler.
    AVOID: Creating a new cron schedule — must reuse existing endpoint.
  </action>
  <verify>
    Read the updated cron route file.
    Confirm:
    1. cleanupExpiredSubscriptions() function defined
    2. Called at start of GET handler
    3. createAdminClient imported
    4. Response includes cleaned count

    Run TypeScript check:
    export PATH="/c/Program Files/nodejs:$PATH" && cd "c:\Users\Ronen\Documents\Projects\Personal\Antigravity\blog andwebsite\site" && npx tsc --noEmit 2>&1
    Expected: 0 errors
  </verify>
  <done>
    Cron route calls cleanupExpiredSubscriptions() on every daily run.
    TypeScript clean.
    To manually test: GET /api/cron/send-scheduled-newsletters with header Authorization: Bearer {CRON_SECRET} — check response for "cleaned" field and Vercel function logs for "Expiry cleanup:" line.
  </done>
</task>

</tasks>

<verification>
After all tasks:
- [ ] cleanupExpiredSubscriptions() present in cron route
- [ ] Called before newsletter logic
- [ ] TypeScript: 0 errors
</verification>

<success_criteria>
- [ ] Cancelled users past end date will be downgraded to free within 24h of expiry
- [ ] Existing newsletter scheduling unaffected
- [ ] TypeScript clean
</success_criteria>
