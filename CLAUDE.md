# AI Finance — Ronen Amos CPA Site

## Project Info

- **Repo:** https://github.com/ronenamos-arch/Amos_AI_SITE
- **Live URL:** https://amos-ai-site.vercel.app
- **Hosting:** Vercel (auto-deploys from `main` branch)
- **Database:** Supabase (PostgreSQL + Auth)
- **Payments:** PayPal (production + sandbox)
- **Email:** Resend (transactional emails)

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
- `RESEND_API_KEY`
- `PAYPAL_WEBHOOK_ID`
- `GOOGLE_AI_API_KEY`
- `NEXT_PUBLIC_SITE_URL`

## Language

Site content is in Hebrew (RTL). Code and comments in English.
