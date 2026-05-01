# Add Guide

Adds a new guide to the guides library at `/guides`, commits, and pushes to production.

Use this command whenever the user wants to add a new guide to the site — whether they say "add a guide", "new guide", "publish a guide", or share a Gamma URL and ask you to add it.

## Step 1 — Collect inputs

Ask the user for the following. If they already provided some in the message that triggered this command, use those and only ask for what's missing:

1. **Gamma URL** — e.g. `https://gamma.app/docs/My-Guide--abc123xyz`
2. **Hebrew title** — the card headline
3. **Hebrew description** — 1–2 sentences shown on the card and guide page
4. **Image path** — full path to the thumbnail image on disk (e.g. `C:\...\public\guides\myfile.jpg`). If they say "no image" or skip it, use `null`.

## Step 2 — Derive values automatically

From the inputs above, derive:

**slug** — extract from the Gamma URL. The slug is the last path segment after `/docs/`, lowercased, with trailing `--<id>` removed and spaces/underscores replaced with hyphens.
- Example: `https://gamma.app/docs/Live-Artifacts-Claude--tc34b99focp2u95` → `live-artifacts-claude`
- Example: `https://gamma.app/docs/Subagents--ptensygek0sxy54` → `subagents`

**category** — infer from the title and description using these rules:
- Mentions Claude, Claude Code, Artifacts, Subagents, MCP → `Claude`
- Mentions ChatGPT, GPT → `ChatGPT`
- Mentions אוטומציה, automation, n8n, Zapier, workflow → `אוטומציה`
- Mentions Excel → `Excel`
- Mentions Power BI → `Power BI`
- Mentions NotebookLM → `NotebookLM`
- Mentions מחלקת כספים, CFO, finance department → `מחלקות כספים`

**tags** — pick 2–3 relevant tags from the title/description. Use existing tags from the codebase where possible (Claude, Dashboard, Finance Ops, Workflow, Productivity, Claude Code, Automation, Excel, Power BI, ChatGPT, Prompting, Strategy, CFO).

**duration** — estimate reading time based on the description length and topic complexity. Default to `"10 דק'"` if unsure.

**publishedAt** — today's date in `YYYY-MM-DD` format.

Then show the user a summary and ask for confirmation before proceeding:

```
כותרת: <title>
slug: <slug>
קטגוריה: <category>
תגיות: <tags>
תמונה: <thumbnail path or null>
זמן קריאה: <duration>
```

Wait for the user to confirm (or request changes) before continuing.

## Step 3 — Copy image to public/guides/

The project root is: `c:\Users\Ronen\Documents\Projects\Personal\Antigravity\blog andwebsite\site`

If the user provided an image path:
- Check if the file already exists in `public/guides/` (it may have been placed there already)
- If not, copy it from the provided path to `public/guides/<filename>`
- The thumbnail value in the data file should be `/guides/<filename>` (web path, not filesystem path)

If no image, set `thumbnail: null`.

## Step 4 — Update lib/guides-data.ts

Read `lib/guides-data.ts` and insert a new entry at the **top** of the `guides` array (before the first existing entry). Use today's date as `publishedAt` so it sorts as newest.

Entry format:
```ts
{
  slug: '<slug>',
  title: '<Hebrew title>',
  description: '<Hebrew description>',
  category: '<category>',
  tags: [<tags>],
  gammaUrl: '<full Gamma URL>',
  thumbnail: '<web path or null>',
  duration: "<duration>",
  isPremium: false,
  publishedAt: '<YYYY-MM-DD>',
},
```

## Step 5 — Update public/llms.txt

Read `public/llms.txt` and add a bullet under the `## Guides Library` section, immediately after the main library bullet (before the existing guide bullets):

```
- /guides/<slug> — <Hebrew title>
```

## Step 6 — Commit and push

Stage and commit exactly these files:
- `lib/guides-data.ts`
- `public/llms.txt`
- `public/guides/<image filename>` (only if a new image was copied)

Commit message:
```
feat(guides): add <title>
```

Then push to `main`. Vercel auto-deploys in ~1–2 minutes.

Confirm to the user that the guide is live at:
`https://www.ronenamoscpa.co.il/guides/<slug>`