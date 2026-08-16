# Antigravity Site - Project Context

## Quick Facts

* **Type:** Next.js blog + course platform with email automation
* **Stack:** Next.js + TypeScript, Supabase, Resend, PayPal
* **Location:** C:\Users\Ronen\Documents\Projects\Personal\Antigravity\blog andwebsite\site

For God Nodes, subsystem breakdown, and known architectural issues, see
`docs/ARCHITECTURE.md` (not auto-loaded — open it when a task touches that
area).

## Work Guidelines

1. **Before any task:** check this file for context.
2. **Focus:** Only work on this project unless explicitly redirected.
3. **Test coverage:** Light on isolated unit tests; focus on integration tests.
4. **No breaking changes** to the Supabase client pattern without refactoring
   all `createAdminClient()` call sites (see `docs/ARCHITECTURE.md`).

## Deployment

* ALL production deploys go to the `main` branch only. Never push fixes to a
  feature branch and call it deployed — feature branches only create Vercel
  preview deploys.
* After pushing, confirm the commit is on `main`
  (`git log origin/main -1`) and report the deployed URL.

## Verification Before Declaring Done

* One passing test is not proof. For any user-facing flow (payments, forms,
  webhooks, embeds), verify end-to-end in the real environment and state
  exactly what you verified and what you did not.
* Screenshot or curl the live page after every deploy.

## Guides & Resources (as of 2026-08-09)

* **Resources are guides now.** Entries in `lib/resources-data.ts` are adapted into the `guides`
  array by `resourceToGuide()` in `lib/guides-data.ts`. The grid, search, category counts, related
  guides and the sitemap all read from `getAllGuides()`, so a new resource added there surfaces
  everywhere automatically — do not build a second list.
* **`/resources/[slug]` and `/api/resources/[slug]` must stay** even though Resources left the
  header. They are the subscription-gated delivery route and the target of five legacy `.html`
  redirects in `next.config.ts:44-70`. The guide preview page only *links* there.
* **`publishedAt` on resources is a placeholder sort key.** `app/guides/[slug]/page.tsx`
  deliberately hides the date and omits `datePublished`/`dateModified` from the JSON-LD when
  `resourceSlug` is set. Do not restore it until real publication dates exist.
* **The UI says ספריית פרומפטים; the route and directory stay `/skill-vault`.** Rename the label
  only — never the path.

## Committing in this repo

* **Stage by explicit path.** This working tree usually holds unrelated in-progress work (home
  page, `app/preview-home/`, design docs). Never `git add -A`, `git add .`, or `git commit -a`.
* Before pushing, run `git show --stat HEAD`, read the file list, and confirm nothing unrelated
  slipped in. If it did, unwind rather than push.
