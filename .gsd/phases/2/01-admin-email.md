---
phase: 2
plan: 1
wave: 2
depends_on: [1.1]
files_modified:
  - lib/emails/admin-notification.ts
  - lib/mailer.ts
autonomous: true
user_setup: []

must_haves:
  truths:
    - "Admin at ronenamos@gmail.com receives email on subscription cancellation"
    - "Admin at ronenamos@gmail.com receives email on payment failure"
    - "sendAdminNotification() is exported from lib/mailer.ts with no 'use server' directive"
  artifacts:
    - "lib/emails/admin-notification.ts exists with HTML template"
    - "lib/mailer.ts exports sendAdminNotification()"
  key_links:
    - "lib/mailer.ts has no 'use server' — safe to import from route handlers"
---

# Plan 2.1: Admin Notification Email

<objective>
Add admin notification email infrastructure so the site owner is alerted when subscriptions cancel or payments fail.

Purpose: Currently admin is blind to cancellations and payment failures. This adds visibility.
Output: New email template + new mailer function, no "use server" (safe for webhook routes).
</objective>

<context>
Load for context:
- lib/mailer.ts (existing email functions — follow exact same pattern)
- lib/emails/purchase-confirmation.ts (existing template — follow same HTML structure)
- lib/emails/welcome.ts (second example of template pattern)
</context>

<tasks>

<task type="auto">
  <name>Create admin-notification HTML email template</name>
  <files>lib/emails/admin-notification.ts</files>
  <action>
    Create a TypeScript file exporting one function:
    export function adminNotificationEmail(params: { eventType: string; userEmail: string; details: string }): string

    Returns HTML string. Style: minimal, clear, monospace details block.
    Content structure:
    - Subject-style heading: "🔔 {eventType}" (e.g. "🔔 Subscription Cancelled")
    - User email in bold
    - Details block (pre-formatted): the raw details string (subscription ID, amount, date etc.)
    - Footer: "ronenamoscpa.co.il admin alert"

    Follow the exact same HTML pattern as lib/emails/purchase-confirmation.ts.
    RTL not required — this is admin-only, Hebrew not needed.
    AVOID: importing React or JSX — pure string template like existing files.
  </action>
  <verify>
    Read the file. Confirm:
    - No JSX, no React import
    - Function signature matches: (params: { eventType, userEmail, details }) => string
    - Returns a valid HTML string with all three content sections
  </verify>
  <done>
    lib/emails/admin-notification.ts exports adminNotificationEmail() returning HTML string.
  </done>
</task>

<task type="auto">
  <name>Add sendAdminNotification() to lib/mailer.ts</name>
  <files>lib/mailer.ts</files>
  <action>
    Add to lib/mailer.ts (do NOT add "use server" — it must not have it):

    Import adminNotificationEmail from ./emails/admin-notification.

    Export async function sendAdminNotification(params: { eventType: string; userEmail: string; details: string }): Promise<void>

    Implementation:
    - Use getResend() (existing lazy factory — never top-level resend instance)
    - Send to: "ronenamos@gmail.com"
    - From: use RESEND_FROM_EMAIL env var (same as other emails)
    - Subject: `[Admin Alert] ${params.eventType}`
    - html: adminNotificationEmail(params)
    - Wrap in try/catch — log errors but never throw (non-blocking)

    AVOID: Adding "use server" directive — this file is imported by route handlers.
    AVOID: Creating a top-level Resend singleton.
    AVOID: Changing any existing function signatures.
  </action>
  <verify>
    Read lib/mailer.ts. Confirm:
    - No "use server" at top of file
    - sendAdminNotification exported
    - Uses getResend() not top-level resend
    - try/catch wraps the send call
    Run: export PATH="/c/Program Files/nodejs:$PATH" && cd "c:\Users\Ronen\Documents\Projects\Personal\Antigravity\blog andwebsite\site" && npx tsc --noEmit 2>&1
    Expected: zero errors
  </verify>
  <done>
    lib/mailer.ts exports sendAdminNotification(). TypeScript compiles clean.
  </done>
</task>

</tasks>

<verification>
After all tasks:
- [ ] lib/emails/admin-notification.ts exists and exports adminNotificationEmail()
- [ ] lib/mailer.ts exports sendAdminNotification() with no "use server"
- [ ] TypeScript: npx tsc --noEmit → 0 errors
</verification>

<success_criteria>
- [ ] sendAdminNotification() callable from webhook route handler without "use server" conflict
- [ ] TypeScript clean
</success_criteria>
