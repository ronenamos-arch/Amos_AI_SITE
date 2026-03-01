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

## Completed

- [x] Purchase confirmation email via Resend (sent after PayPal payment)
- [x] PayPal webhook endpoint with signature verification
- [x] Webhook handles: payment completed, subscription activated, subscription cancelled
- [x] Thanks page updated to reflect email is sent
- [x] Vercel env vars updated (RESEND_API_KEY, PAYPAL_WEBHOOK_ID)
- [x] amosbudget.com DNS records added to Resend (pending verification)

## Still TODO

- [ ] Verify amosbudget.com domain in Resend, then set `RESEND_FROM_EMAIL=AI Finance <noreply@amosbudget.com>` in env
- [ ] Test email flow end-to-end (make a test purchase)
- [ ] Newsletter signup (collect emails, send campaigns)
- [ ] Subscription cancellation UI (user-facing)
- [ ] Invoice/receipt generation
- [ ] Payment history page in dashboard

## Language

Site content is in Hebrew (RTL). Code and comments in English.
