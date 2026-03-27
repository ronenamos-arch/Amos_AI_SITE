# AI Finance — Ronen Amos CPA Site

## Project Info

- **Repo:** https://github.com/ronenamos-arch/Amos_AI_SITE
- **Live URL:** https://www.ronenamoscpa.co.il
- **Hosting:** Vercel (auto-deploys from `main` branch)
- **Database:** Supabase (PostgreSQL + Auth)
- **Payments:** PayPal (production + sandbox)
- **Email:** Resend (transactional emails)
- **Email domain:** amosbudget.com (verified in Resend — `RESEND_FROM_EMAIL=AI Finance <noreply@amosbudget.com>`)

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Supabase (auth + DB)
- PayPal (`@paypal/react-paypal-js`)
- Resend (email sending)
- Google Generative AI (Gemini chatbot)
- Framer Motion (animations)

## Key Directories

- `app/` — Next.js App Router pages and API routes
- `app/api/webhooks/paypal/` — PayPal webhook with signature verification
- `components/` — React components (payments, UI, blog, admin, forms, providers)
- `lib/` — Server actions, Supabase clients, Resend client, email templates
- `lib/actions/` — Server actions (subscription, email)
- `lib/emails/` — HTML email templates
- `content/posts/` — Blog post markdown files
- `supabase/migrations/` — Database migration SQL files

## Environment Variables

Required in `.env.local` and Vercel:
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` / `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_PAYPAL_CLIENT_ID` / `PAYPAL_SECRET_KEY` / `NEXT_PUBLIC_PAYPAL_MONTHLY_PLAN_ID`
- `PAYPAL_WEBHOOK_ID`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL` (optional — defaults to `onboarding@resend.dev` until domain verified)
- `RESEND_AUDIENCE_ID` — Resend Contacts audience ID; new subscribers auto-sync to this audience; no-op if unset
- `CRON_SECRET` — random secret used to authenticate Vercel Cron calls to `/api/cron/send-scheduled-newsletters`
- `GOOGLE_AI_API_KEY`
- `NEXT_PUBLIC_SITE_URL`

## Blog System

- **Two content sources** (merged on blog listing page):
  - File-based: `content/posts/*.md` — frontmatter + markdown, parsed via `lib/blog.ts`
  - DB-based: Supabase `articles` table — HTML content from Quill rich-text editor
- **Slug format:** DB slugs are decoded Hebrew strings (e.g. `בניית-מודל-...`), NOT URL-encoded
  - Always use `decodeURIComponent(slug)` before querying — see `app/blog/[slug]/page.tsx`
- **Admin panel:** `app/admin/blog/` — list, create (`/new`), edit (`/edit/[slug]`)
  - Edit uses `app/admin/blog/edit/[slug]/EditArticleClient.tsx` with React Quill editor
  - Image uploads go to `/api/admin/upload` → stored in Supabase Storage
- **Key files:**
  - `lib/blog.ts` — markdown parsing, `getAllPosts()`, `getPostBySlug()`, `linkify()`
  - `lib/blog-supabase.ts` — `getDBPosts()`, `getDBPostBySlug()`
  - `lib/actions/articles.ts` — `updateArticle()` server action
- **Premium content:** `is_premium` field on articles; checked against `profiles.subscription_status`

## Build Rules — CRITICAL

Vercel does **not** inject `NEXT_PUBLIC_*` env vars into the SSG pre-render worker.
Any code that touches Supabase at module or render level will throw `supabaseUrl is required` during build.

**Rule:** Any `app/` file that calls Supabase (directly or transitively) MUST have:
```ts
export const dynamic = 'force-dynamic'
```

**Files currently using this directive:**
- `app/layout.tsx` — root layout renders `<UserMenu>` → `createClient()` runs at render
- `app/sitemap.ts` — calls `getDBPosts()` which hits Supabase

If you add a new special file (`opengraph-image`, `robots.ts`, etc.) that queries Supabase, add `force-dynamic` to it.

**Rule:** Never create module-level Supabase or Resend singletons.
- Supabase: call `createClient()` / `createAdminClient()` inside the function body
- Resend: use `getResend()` from `lib/resend.ts` — never import a top-level `resend` instance

**Rule:** Next.js 16 middleware file is `proxy.ts` (not `middleware.ts`), export named `proxy`.

**Rule:** Core newsletter sending logic lives in `lib/newsletter-service.ts` (no `"use server"`). Route handlers and cron endpoints MUST import from there — never from `lib/actions/newsletter.ts` (which has `"use server"` and will silently fail in route handlers).

## Debugging Vercel Builds

When a build fails with bare "Error", get the actual log via the Vercel API:

```bash
# 1. Get latest deployment UID
curl -s "https://api.vercel.com/v6/deployments?teamId=team_xBXPCsrJ3odGUI51p3lRKarB&projectId=prj_LgGONkBo1W4Z1xIKaqEAm0siARY4&limit=1" \
  -H "Authorization: Bearer $VERCEL_TOKEN"

# 2. Fetch build events (use full dpl_... UID from step 1)
curl -s "https://api.vercel.com/v2/deployments/{dpl_uid}/events?teamId=team_xBXPCsrJ3odGUI51p3lRKarB" \
  -H "Authorization: Bearer $VERCEL_TOKEN"
```

`VERCEL_TOKEN` is in `.env.local`. Team ID: `team_xBXPCsrJ3odGUI51p3lRKarB`. Project ID: `prj_LgGONkBo1W4Z1xIKaqEAm0siARY4`.

## Email Architecture Note

All Resend calls live in `lib/mailer.ts` (no `"use server"` directive).
Route handlers (`app/api/webhooks/paypal/`, `app/auth/callback/`) import directly from `lib/mailer.ts`.
`lib/actions/email.ts` re-exports from `lib/mailer.ts` as `"use server"` for client-callable actions.
Never import `lib/actions/email.ts` from a route handler — it will silently fail due to the `"use server"` boundary.

## Newsletter Architecture Note

Core newsletter logic lives in `lib/newsletter-service.ts` (no `"use server"`).
`lib/actions/newsletter.ts` re-exports as `"use server"` wrappers for the admin UI client.
`app/api/cron/send-scheduled-newsletters/route.ts` imports directly from `lib/newsletter-service.ts`.
Never import `lib/actions/newsletter.ts` from a route handler — same `"use server"` silent-fail issue.

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

## Vercel Cron — Hobby Plan Limitation

Hobby plan only allows **1 cron job, once per day**.
Current schedule: `0 7 * * *` → fires at 07:00 UTC (10:00 Israel time) daily.
Scheduled newsletters are picked up at that time each day.
To get more frequent checks (e.g. every 15 min), upgrade to Vercel Pro.
Resend Audience ID: `4c3b4ceb-c5dc-4eba-9d29-62fb8b26956a` (audience name: "General").

## Completed

- [x] Purchase confirmation email via Resend (sent after PayPal payment)
- [x] PayPal webhook endpoint with signature verification
- [x] Webhook handles: payment completed, subscription activated, subscription cancelled
- [x] Thanks page updated to reflect email is sent
- [x] Vercel env vars updated (RESEND_API_KEY, PAYPAL_WEBHOOK_ID)
- [x] amosbudget.com domain verified in Resend — `RESEND_FROM_EMAIL=AI Finance <noreply@amosbudget.com>` set in Vercel
- [x] Blog post text overflow fixed (break-words, prose-pre:overflow-x-auto)
- [x] Admin edit page fixed (slug decodeURIComponent)
- [x] URL linkify for bare URLs in blog content (lib/blog.ts `linkify()`)
- [x] Mobile h1 responsiveness (text-3xl on mobile)
- [x] Welcome email on newsletter signup (`lib/mailer.ts` → `subscribeToNewsletter`)
- [x] Welcome email on account registration (`app/auth/callback/route.ts`, fires for users created < 10 min ago)
- [x] Contacts CSV export — admin-only `GET /api/admin/export-contacts` (newsletter + users + contacts, UTF-8 BOM for Excel Hebrew)
- [x] CSV download button on admin newsletter page
- [x] Vercel build fixed — `force-dynamic` on `app/layout.tsx` and `app/sitemap.ts` (SSG/Supabase crash)
- [x] Resend refactored to lazy `getResend()` factory — no more module-level singleton
- [x] Next.js 16 middleware: `proxy.ts` with `export function proxy()` convention
- [x] Payment flow hardened — grace period on cancel, renewal tracking, admin alerts, expiry cron

## Still TODO

- [ ] Test purchase confirmation email end-to-end (make a test PayPal payment)
- [ ] Subscription cancellation UI (user-facing)
- [ ] Invoice/receipt generation
- [ ] Payment history page in dashboard

## Privacy & Compliance — Completed

- [x] Google Consent Mode v2 — default denied init (`app/layout.tsx`) before GA4 loads; updates to granted/denied on user choice
- [x] Cookie consent banner (`components/ui/CookieConsent.tsx`) — Hebrew RTL, localStorage persistence, links to `/legal#cookies`
- [x] Cookie policy added to `/legal` page (section 6) — lists GA4 cookies, retention, Google as third party, user rights
- [x] תיקון 13א לחוק הגנת הפרטיות compliance — user rights (access, correction, deletion, consent withdrawal) documented at `/legal#cookies`
- [x] Privacy contact email: `finance@amosbudget.com`

## SEO & Search Console — Completed

- [x] Homepage explicit `metadata` export (`app/page.tsx`) — specific title, description, canonical, keywords, OG
- [x] Canonical URLs on all pages (about, services, contact, blog)
- [x] Per-page keyword sets on every page (5–9 Hebrew keywords each)
- [x] Root keywords expanded to 22 (`app/layout.tsx`)
- [x] OG image `alt` text on blog post pages (both DB and markdown)
- [x] BreadcrumbList JSON-LD on every blog post (`app/blog/[slug]/page.tsx`)
- [x] FAQ JSON-LD on services page (4 Q&A pairs for rich results)
- [x] Security headers in `next.config.ts` (X-Content-Type-Options, X-Frame-Options, etc.)
- [x] Sitemap (`app/sitemap.ts`): recent posts get priority 0.8, older 0.6; images included per entry
- [x] Related posts component (`components/blog/RelatedPosts.tsx`) — tag-based, shown on every unlocked post
- [x] `/publish-blog` skill updated with SEO pre-publish checklist (Step 5.5)
- [x] `/convert-blog` skill updated with SEO metadata output (Step 7)
- [x] Newsletter scheduling — admin can set date/time; Vercel Cron (`*/15 * * * *`) processes `scheduled_newsletters` table via `/api/cron/send-scheduled-newsletters` (requires `CRON_SECRET`)
- [x] Resend Contacts/Audience sync — new subscribers auto-synced to Resend audience on subscribe/unsubscribe; bulk backfill button on admin page (requires `RESEND_AUDIENCE_ID`)
- [x] Skill vault data cleaning module — tabbed "אמנות הנתונים הנקיים" section with 8 prompts (3 cleaning + 5 audit) at bottom of `/skill-vault`
- [x] Google Search Console — `ronenamoscpa.co.il` property set up; two verification tokens in `metadata.verification.google` (`app/layout.tsx`): `h6QCaukFQ3DE1M7n84R35IvuQp4RyhhCjYhjq5b_Lu4` (original) + `Qb4gOaZzEmtn_QSohy-v6cglMkkYnTEnkykVaRF6J9M` (domain verification)
- [x] Google Analytics 4 — property `G-EWLVGXCWLK`, Consent Mode v2 enabled, no data sent before user consent
- [x] GSC redirect fix — `vercel.json` explicit 308 permanent redirect: `ronenamoscpa.co.il` → `www.ronenamoscpa.co.il` (replaces Vercel's automatic 307 temporary); domain-level redirect type changed to Permanent in Vercel Dashboard; sitemap + key pages submitted for re-indexing in GSC

## GEO/SEO Audit — Completed (2026-03-26)

- [x] `app/robots.ts` — Disallow: /admin, /dashboard, /login, /thanks, /api, /auth (fixes 22 crawled-not-indexed pages)
- [x] noindex metadata on all admin pages (`app/admin/layout.tsx`), dashboard, login, thanks
- [x] `app/login/layout.tsx` — created for noindex on "use client" login page
- [x] `components/seo/StructuredData.tsx` — upgraded to `["LocalBusiness", "AccountingService"]` with geo coords (32.0842, 34.8124), hasMap, currenciesAccepted, paymentAccepted, full PostalAddress (postalCode: 5252006)
- [x] `app/faq/page.tsx` — dedicated FAQ page: 15 Hebrew Q&As, accordion UI, FAQPage JSON-LD schema
- [x] `app/faq/layout.tsx` — metadata with canonical, keywords, OG
- [x] `app/sitemap.ts` — added /faq at priority 0.7
- [x] `/services` + `/contact` — linked to /faq ("ראה שאלות נפוצות ←")
- [x] `lib/blog.ts` — `addInternalLinks()`: auto-links Power BI→/services, NotebookLM→/courses/notebook-master, קורס AI→/courses/ai-mastery, ייעוץ פיננסי→/services, אוטומציה פיננסית→/services (max 1 per term per post)
- [x] `app/blog/[slug]/page.tsx` — content piped through `addInternalLinks(linkify(rawHtml))`
- [x] Meta titles updated: /services, /about, /blog, /contact — benefit-led, specific Hebrew titles
- [x] `public/llms.txt` — added /faq, zero-click answers section, content clusters section

### noindex pattern for "use client" pages
Client components cannot export metadata. Solution: create a `layout.tsx` in the same directory that exports `metadata: { robots: { index: false } }`.

## Language

Site content is in Hebrew (RTL). Code and comments in English.
