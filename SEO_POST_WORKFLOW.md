# Programmatic-SEO Workflow — Operator's Manual

Your step-by-step guide for the Hebrew CFO-niche programmatic-SEO pipeline.
This file answers: **where am I, what do I do next, what do I type, what do I check.**

Related docs:
- Full planning: `C:\Users\Ronen\Documents\Projects\Obsidian\Content-Strategy\2026-04-21-programmatic-seo-skill-planning.md`
- Session handoff: `C:\Users\Ronen\Documents\Projects\Obsidian\Content-Strategy\2026-04-21-session-handoff.md`
- Reference post: `content/posts/איך-להשתמש-ב-ai-באקסל-לניהול-תזרים-מזומנים.md`

---

## Where you are right now — Phase 3 (monitoring gate)

The reference post is live. The next 2–3 weeks are measurement, not building.

**Do NOT build the `/seo-post` skill yet.** The template needs to prove it works before we freeze it.

---

## The phases (updated — Perplexity removed)

| Phase | What happens | Who does it | Gate to next phase |
|-------|--------------|-------------|---------------------|
| A | Skill spec (input/output contract, frozen template) | Claude (me) drafts, you approve | You sign off on spec |
| B | Monitor reference post in GSC for 2–3 weeks | You check GSC weekly, paste data to Claude | Non-zero clicks + top-20 position |
| C | Build `/seo-post` skill — I do SERP research directly via WebSearch (no Perplexity) | Claude builds, you review | Manual dry-run on keyword #2 produces a usable post |
| D | Batch 5 more posts using the skill | You + Claude, one at a time | 3 of 5 reach top-20 within 4 weeks |

**You are between Phase A and Phase B.** Phase A (skill spec) can happen anytime; Phase B runs in the background.

---

## How to contact me (Claude)

Open a new Claude Code session in this folder:

```
cd "C:\Users\Ronen\Documents\Projects\Personal\Antigravity\blog andwebsite\site"
claude
```

Then paste one of the session-starter prompts below depending on what you want to do.

---

## Weekly routine — Phase B (monitoring)

**Every Monday morning**, do these 3 things. Takes ~5 minutes.

### 1. Check GSC performance for the reference post

Open Google Search Console → Performance → Search results → filter by page URL:
`https://www.ronenamoscpa.co.il/blog/איך-להשתמש-ב-ai-באקסל-לניהול-תזרים-מזומנים`

Record these 4 numbers for the last 7 days:
- Impressions
- Clicks
- Average position
- CTR

### 2. Check if it's showing up for the target keyword

Open GSC → Performance → Search results → filter by query: `תזרים מזומנים`

Is the reference post showing? What's its average position?

### 3. Paste results into a new Claude session

```
cd "C:\Users\Ronen\Documents\Projects\Personal\Antigravity\blog andwebsite\site"
claude
```

Then paste:

```
SEO monitoring check-in — week of [DATE]

Reference post GSC data (last 7 days):
- Impressions: [N]
- Clicks: [N]
- Avg position: [N]
- CTR: [N]%

Target keyword "תזרים מזומנים" — ranking: [position or "not ranking"]

Tell me: is the post trending up, flat, or dead? Should we wait another week, tweak the post, or move to Phase C (build skill)?
```

I'll answer, update the handoff doc with the week's numbers, and tell you if the gate is passed.

### Gate for Phase B → C
- **Pass** (build skill): ≥100 impressions/week AND avg position ≤20 AND ≥1 click in a single week
- **Fail** (iterate template): 3 weeks of zero clicks — we revisit the post's hook, structure, or keyword choice
- **Inconclusive** (wait): positive trend but not yet at the thresholds — keep monitoring

---

## When Phase B gate passes — Phase C (build skill)

Open a new session:

```
cd "C:\Users\Ronen\Documents\Projects\Personal\Antigravity\blog andwebsite\site"
claude
```

Paste:

```
Phase B gate passed — GSC numbers met the threshold. Build the /seo-post skill now.

Use:
- Reference post (content/posts/איך-להשתמש-ב-ai-באקסל-לניהול-תזרים-מזומנים.md) as the frozen template
- WebSearch (not Perplexity) for SERP research
- The skill spec we agreed in Phase A
- Conventions from existing skills at C:\Users\Ronen\.claude\skills\ (publish-blog, convert-blog)

Output: a new skill at C:\Users\Ronen\.claude\skills\seo-post\SKILL.md

When done, do a dry-run on keyword "איך להשתמש ב-AI באקסל לבניית KPI פיננסי" and show me the resulting .md before I commit.
```

---

## Using the skill — Phase D (batch 5 posts)

After the skill exists, for each new post:

```
cd "C:\Users\Ronen\Documents\Projects\Personal\Antigravity\blog andwebsite\site"
claude
```

In-session:

```
/seo-post

keyword: [paste the full Hebrew keyword, e.g. איך להשתמש ב-AI באקסל לבניית דשבורד ניהולי]
```

The skill will:
1. Do SERP research via WebSearch — confirm competition is weak
2. Generate the post following the frozen template (9 H2 sections, 3 prompts, case study, honest limits, 3 JSON-LD)
3. Write to `content/posts/{slug}.md`
4. Stop — does NOT publish

You then review the file (open in VS Code, read the Hebrew), edit voice/tone if needed.

### Deploy the post

Same session, paste:

```
/publish-blog

The post is at content/posts/{slug}.md
```

That skill handles: cover image copy, preview HTML, commit, push. Deploys to Vercel automatically on push to `main`.

### After publishing — track each post

Add a row to a tracking sheet (GSC + GA4 + premium signup attribution) weekly:
- Post slug
- Week-1 impressions / clicks / avg position
- Week-2 impressions / clicks / avg position
- Week-4 impressions / clicks / avg position
- Verdict: won / iterate / dead

---

## Troubleshooting

### "A new post shows 404 on production"
Known bug category — see `project_blog_posts_static_bundling.md` memory. Posts are bundled at build time via `scripts/generate-posts-index.mjs`. If you pushed a new .md but it 404s:

1. Verify the `prebuild` script ran in Vercel build logs
2. Check `lib/generated/posts-index.ts` was regenerated with the new slug
3. Do NOT add cache-bust comments to `lib/blog.ts` — that pattern failed 4 times in git history

### "The skill doesn't exist yet"
Don't invoke `/seo-post` before Phase C. It doesn't exist. Use the Phase B monitoring prompt instead.

### "I want to skip monitoring and just build 5 posts now"
Don't. Phase B is the whole point — if the template doesn't produce a ranking post, scaling it to 5 posts wastes writing time and pollutes the blog with underperforming content. Key principle from planning: **don't scale a broken template.**

---

## Quick-reference commands

| Situation | Paste this |
|-----------|------------|
| Weekly GSC check-in | "SEO monitoring check-in — week of [DATE]" + numbers |
| Phase B gate passed | "Phase B gate passed — build /seo-post skill now" |
| Generate a new post (after skill exists) | `/seo-post` then `keyword: ...` |
| Publish a generated post | `/publish-blog` then path |
| Post 404s on prod | "New post 404s — check generate-posts-index build step" |
| Template not ranking after 3 weeks | "Phase B failing — reference post stuck at zero clicks. What do we change?" |

---

## Files I (Claude) will touch — and what you should NOT touch

**Claude updates during monitoring:**
- `C:\Users\Ronen\Documents\Projects\Obsidian\Content-Strategy\2026-04-21-session-handoff.md` — weekly numbers log

**Claude creates in Phase C:**
- `C:\Users\Ronen\.claude\skills\seo-post\SKILL.md`
- Any supporting files in the same folder

**Claude writes per post in Phase D:**
- `content/posts/{slug}.md` (only this)

**You should only hand-edit:**
- Voice/tone in the generated .md before `/publish-blog`
- GSC numbers in the weekly check-in
