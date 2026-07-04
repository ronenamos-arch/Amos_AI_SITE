# Guides Page — Cheatsheet

Quick reference for managing the `/guides` page (https://www.ronenamoscpa.co.il/guides).

## Where everything lives

| What | Where |
|---|---|
| **Single source of truth** (titles, URLs, categories, tags) | `lib/guides-data.ts` |
| Card component | `components/guides/GuideCard.tsx` |
| Grid + sidebar + search | `components/guides/GuidesGrid.tsx` |
| Listing page (hero + grid) | `app/guides/page.tsx` |
| **Individual guide page** | `app/guides/[slug]/page.tsx` |
| Header nav link | `components/layout/Header.tsx` |
| **Images** | `public/guides/` |

No DB, no admin UI. Edit `lib/guides-data.ts` → push → live.

## Add a new guide (3 steps)

### 1. Drop image in `public/guides/`

- Format: `.jpg`, `.png`, or `.webp`
- Aspect ratio: ~16:10 (card slot is `h-44` ≈ 176px tall)
- Recommended size: 800×500px (compress at squoosh.app or tinypng.com)
- Naming: lowercase, hyphens, no spaces or Hebrew (`subagents.png`, not `סאב.png`)

### 2. Add an entry to `lib/guides-data.ts`

Append to the `guides` array:

```ts
{
  slug: 'unique-slug',
  title: 'הכותרת על הכרטיס',
  description: 'תיאור קצר מתחת לכותרת (מופיע בכרטיס ובעמוד)',
  longDescription: 'פסקה ארוכה יותר שמופיעה רק בעמוד המדריך, מעל ה-embed. אופציונלי — אם לא מוגדר, נעשה שימוש ב-description.',
  category: 'Claude',                 // must be one of CATEGORIES
  tags: ['Tag1', 'Tag2'],
  gammaUrl: 'https://gamma.app/docs/...',
  thumbnail: '/guides/your-file.png', // or null for slate-gradient fallback
  duration: "12 דק'",
  isPremium: false,
  publishedAt: '2026-04-26',          // YYYY-MM-DD; sorts newest first
},
```

**Allowed `category` values:** `'Claude'`, `'ChatGPT'`, `'אוטומציה'`, `'Excel'`, `'Power BI'`, `'NotebookLM'`, `'מחלקות כספים'`

**Placeholder behavior:** Set `gammaUrl: '#'` to show the disabled "בקרוב..." state.

### 3. Also update `public/llms.txt`

Under the "Guides Library" section, add a bullet for the new guide:

```
- /guides/<slug> — <title>
```

### 4. Commit + push (⚠️ DON'T FORGET THE IMAGE)

Add all three files — the guide data, the image, and the llms.txt entry:

```bash
git add lib/guides-data.ts public/guides/your-file.png public/llms.txt
git commit -m "feat(guides): add <title>"
git push
```

**Critical:** The image file (`public/guides/your-file.png`) MUST be added to git and pushed. If you skip the image, the card will show the gradient fallback instead of your thumbnail. Vercel auto-deploys in ~1-2 min.

## Edit an existing guide

Open `lib/guides-data.ts`, find the entry by `slug`, edit any field, save, push.

The card refreshes automatically — no rebuild step.

## How the internal page works (Phase 2)

Each non-placeholder guide has an internal page at `/guides/<slug>`. The page:

- Embeds the Gamma presentation via `https://gamma.app/embed/<id>` (responsive 16:9 iframe)
- Shows a "פתח ב-Gamma" fallback link below the embed
- Renders breadcrumb, H1, meta strip (category, duration, date), tags
- Shows `longDescription` if set, otherwise falls back to `description`
- Emits `Article` + `BreadcrumbList` JSON-LD for SEO
- Shows 3 related guides from the same category (padded from other categories)
- Newsletter CTA + Pricing CTA below the embed

**Placeholder guides** (`gammaUrl === '#'`) do NOT have an internal page — `generateStaticParams` skips them and the card stays disabled.

## Common mistakes

- **Image not loading after deploy?** First check: did you `git add` and `git push` the actual image file (`public/guides/your-file.png`)? The file must be committed to git or Vercel won't have it. If the image exists locally but isn't in git, it won't deploy. Then verify the `thumbnail` path matches the filename exactly (case-sensitive). Finally, hard-refresh the page (Ctrl+F5) to bust browser cache.
- **Card shows gradient instead of image?** Either `thumbnail` is `null`, or the path is wrong.
- **"בקרוב..." showing instead of CTA?** That's intentional when `gammaUrl === '#'`. Replace with the real Gamma URL.
- **Build error about category type?** You used a category not in the `GuideCategory` union — fix the spelling or add it to `CATEGORIES`.
- **Guide page returns 404?** Either `gammaUrl` is still `'#'`, or the `slug` in the URL doesn't match exactly (case-sensitive).

---

# Course Access Management — Cheatsheet

Quick reference for granting access to the AI Master Course (`/courses/ai-master-course`).

## Prerequisites before granting access

**IMPORTANT:** The customer **must have signed up** to your website first. They need an account in `auth.users` before you can grant them course access.

**Check:**
1. Customer receives signup link: `https://www.ronenamoscpa.co.il/login`
2. They create account (email + password or Google OAuth)
3. They see "No Access" screen on the course page
4. **Then** you run the SQL command below

If they haven't signed up yet, the SQL won't find them and nothing happens.

## Grant access to one email

Go to **Supabase Dashboard** → **SQL Editor** → **New Query** and paste:

```sql
INSERT INTO public.course_access (user_id, email, has_access)
SELECT id, email, true
FROM auth.users
WHERE email = 'customer@example.com';
```

Replace `'customer@example.com'` with their actual email. Click **Run**.

**Expected result:** "Success" message, "1 row inserted"

## Grant access to multiple emails at once

Replace `WHERE email = '...'` with `WHERE email IN (...)` and list all emails:

```sql
INSERT INTO public.course_access (user_id, email, has_access)
SELECT id, email, true
FROM auth.users
WHERE email IN (
  'customer1@example.com',
  'customer2@example.com',
  'customer3@example.com'
);
```

## Verify access was granted

1. Go to **Supabase Dashboard** → **Table Editor**
2. Click `course_access` table
3. Search for the customer's email — it should show with `has_access = TRUE`
4. Customer refreshes their browser on `/courses/ai-master-course` → course content now visible

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| **"ERROR: relation 'public.course_access' does not exist"** | Migration not applied yet | Run the migration (see setup guide) |
| **"0 rows inserted" (success but nothing added)** | Email not found in `auth.users` | Customer hasn't signed up yet. Share login link, have them sign up first, then retry |
| **Email shows in table but customer still sees "No Access"** | Customer's browser cache | Have them clear cookies or do hard refresh (Ctrl+F5) |
| **Added wrong email by mistake** | User error | Go to Table Editor → click the row → click delete icon (trash) |

## Still TODO

- Admin UI for non-technical editing
- Premium gating (mechanism exists via `isPremium: true`, but no paywall on click yet)
- Automated course access provisioning (currently manual)
