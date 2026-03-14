# AI Finance — Ronen Amos CPA Site

## Project Info

- **Repo:** https://github.com/ronenamos-arch/Amos_AI_SITE
- **Live URL:** https://amos-ai-site.vercel.app
- **Hosting:** Vercel (auto-deploys from `main` branch)
- **Database:** Supabase (PostgreSQL + Auth)
- **Payments:** PayPal (production + sandbox)
- **Email:** Resend (transactional emails)
- **Email domain:** amosbudget.com (pending DNS verification in Resend)

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

## Email Architecture Note

All Resend calls live in `lib/mailer.ts` (no `"use server"` directive).
Route handlers (`app/api/webhooks/paypal/`, `app/auth/callback/`) import directly from `lib/mailer.ts`.
`lib/actions/email.ts` re-exports from `lib/mailer.ts` as `"use server"` for client-callable actions.
Never import `lib/actions/email.ts` from a route handler — it will silently fail due to the `"use server"` boundary.

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

## Still TODO

- [ ] Test purchase confirmation email end-to-end (make a test PayPal payment)
- [ ] Subscription cancellation UI (user-facing)
- [ ] Invoice/receipt generation
- [ ] Payment history page in dashboard

## Language

Site content is in Hebrew (RTL). Code and comments in English.
