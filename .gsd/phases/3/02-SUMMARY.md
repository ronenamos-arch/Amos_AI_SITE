---
phase: 3
plan: 2
status: done
commit: c2a5efc
---

# Summary: Plan 3.2 — Daily Cron Subscription Expiry Cleanup

## What was done

Added `cleanupExpiredSubscriptions()` to the existing daily cron route at `app/api/cron/send-scheduled-newsletters/route.ts`.

## Function behavior

- Queries `profiles` where `subscription_status = 'cancelled'` AND `subscription_end_date < now`
- Bulk-updates matching rows to `subscription_status = 'free'`
- Returns `{ cleaned: number }` — errors are caught and logged, never block the newsletter logic
- Uses `createAdminClient()` (service role) to bypass RLS

## Integration point

Called at the **start** of the `GET` handler, before the newsletter claim/send logic:

```ts
const { cleaned } = await cleanupExpiredSubscriptions();
```

`cleaned` is included in all response JSON paths (`{ cleaned, processed: 0 }` and `{ cleaned, processed: N, results }`).

## Verification

- TypeScript check: 0 errors
- Existing CRON_SECRET auth check unchanged
- Existing newsletter send logic unchanged

## Testing

To verify manually:
```
GET /api/cron/send-scheduled-newsletters
Authorization: Bearer <CRON_SECRET>
```
Response will include `"cleaned": N`. Check Vercel function logs for `Expiry cleanup: downgraded N users to free`.
