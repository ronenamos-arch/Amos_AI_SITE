# Guides Page — Cheatsheet

Quick reference for managing the `/guides` page (https://www.ronenamoscpa.co.il/guides).

## Where everything lives

| What | Where |
|---|---|
| **Single source of truth** (titles, URLs, categories, tags) | `lib/guides-data.ts` |
| Card component | `components/guides/GuideCard.tsx` |
| Grid + sidebar + search | `components/guides/GuidesGrid.tsx` |
| Page (hero + dashboard mockup + grid) | `app/guides/page.tsx` |
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
  description: 'תיאור קצר מתחת לכותרת',
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

### 3. Commit + push

```bash
git add lib/guides-data.ts public/guides/your-file.png
git commit -m "feat(guides): add <title>"
git push
```

Vercel auto-deploys in ~1-2 min.

## Edit an existing guide

Open `lib/guides-data.ts`, find the entry by `slug`, edit any field, save, push.

The card refreshes automatically — no rebuild step.

## Common mistakes

- **Image not loading?** Check that the `thumbnail` path matches the actual filename in `public/guides/` exactly (case-sensitive). Hard-refresh the page (Ctrl+F5) to bust the cached 404.
- **Card shows gradient instead of image?** Either `thumbnail` is `null`, or the path is wrong.
- **"בקרוב..." showing instead of CTA?** That's intentional when `gammaUrl === '#'`. Replace with the real Gamma URL.
- **Build error about category type?** You used a category not in the `GuideCategory` union — fix the spelling or add it to `CATEGORIES`.

## Phase 2 (not built yet)

- Internal `/guides/[slug]` pages that embed Gamma instead of opening external link
- Admin UI for non-technical editing
- Premium gating (mechanism exists via `isPremium: true`, but no paywall on click yet)
