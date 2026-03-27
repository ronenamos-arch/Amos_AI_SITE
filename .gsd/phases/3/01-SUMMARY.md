---
phase: 3
plan: 1
status: done
completed: 2026-03-27
---

# Summary: Plan 3.1 — Access Gate Grace Period

## What changed

**File:** `app/blog/[slug]/page.tsx`

### Profile fetch (lines ~115-124)
- Added `subscription_end_date` to the Supabase `.select()` call alongside `subscription_status`
- Stored the result in `subscriptionEndDate: string | null`

### hasAccess logic (lines ~127-132)
- Replaced the two-state check (`monthly` | `lifetime`) with a four-state check:
  - `monthly` → access granted
  - `lifetime` → access granted
  - `cancelled` + `subscription_end_date > now` → access granted (grace period)
  - All other statuses (`free`, `payment_failed`, `cancelled` past end date) → denied

## Verification

- `export const dynamic = 'force-dynamic'` confirmed present (line 8)
- TypeScript: 0 errors (`npx tsc --noEmit`)

## Checklist

- [x] subscription_end_date fetched from profiles in blog page
- [x] hasAccess updated with 4-state logic
- [x] force-dynamic still present
- [x] TypeScript: 0 errors
- [x] Cancelled user with future end date: hasAccess = true
- [x] Cancelled user with past end date: hasAccess = false
- [x] payment_failed user: hasAccess = false
