---
plan: 2.1
status: done
commit: e5f33b5
---

# Summary: Plan 2.1 — Admin Notification Email

## What was done

### Task 1: lib/emails/admin-notification.ts (new file)
Exports `adminNotificationEmail(params: { eventType, userEmail, details }): string`.
Pure HTML string template — no JSX, no React imports.
Structure: header with bell emoji + eventType, user email block, monospace `<pre>` details block, footer with site name.
Follows the exact same dark-theme table layout as `purchase-confirmation.ts`.

### Task 2: lib/mailer.ts (modified)
- Added import of `adminNotificationEmail` from `./emails/admin-notification`
- Exported `sendAdminNotification(params: { eventType, userEmail, details }): Promise<void>`
- Uses `getResend()` lazy factory (never a top-level singleton)
- Sends to `ronenamos@gmail.com`, subject `[Admin Alert] ${eventType}`
- Wrapped in try/catch — errors are logged, never thrown (non-blocking)
- No `"use server"` directive — safe to import from route handlers

## Verification

- TypeScript: `npx tsc --noEmit` — 0 errors
- No "use server" in lib/mailer.ts
- `sendAdminNotification` exported and callable from webhook routes

## Must-Haves Met

- [x] Admin at ronenamos@gmail.com will receive email on subscription cancellation (ready to wire)
- [x] Admin at ronenamos@gmail.com will receive email on payment failure (ready to wire)
- [x] sendAdminNotification() exported from lib/mailer.ts with no "use server"
- [x] lib/emails/admin-notification.ts exists with HTML template
