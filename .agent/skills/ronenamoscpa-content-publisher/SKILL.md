---
name: ronenamoscpa-content-publisher
description: >-
  Official content creation, guide formatting, and blog publishing workflow for ronenamoscpa.co.il (Ronen Amos CPA).
  Ingests source material from Gmail newsletters or direct user input (no Notion), extracts & optimizes images to public/images/blog/,
  writes authoritative Hebrew finance/AI Markdown posts, updates local search index, provides localhost:3000 review links,
  and strictly enforces user review before any deployment.
---

# Ronen Amos CPA — Content Publisher & Blog Workflow

This skill defines the end-to-end publishing pipeline for **ronenamoscpa.co.il** (Ronen Amos CPA — AI Finance Transformation).

---

## 🛑 STRICT RULE: ZERO AUTO-DEPLOYMENT

> [!IMPORTANT]
> **NEVER deploy (`git push`) automatically.**
> 1. Always create the content and assets locally first.
> 2. Regenerate the local index: `node scripts/generate-posts-index.mjs`.
> 3. Provide the user with a clickable **localhost review link**: `http://localhost:3000/blog/<slug>`.
> 4. **WAIT for the user's explicit review and approval** before running any git commit or push to production.

---

## 🎯 Target Audience & Positioning

* **Audience:** Israeli CFOs, Finance Directors (סמנכ"לי כספים), Controllers (חשבים), FP&A Managers, CPAs (רואי חשבון), and tech/startup finance professionals.
* **Tone:** Authoritative, practical, practitioner-to-practitioner, ROI-driven, with actionable workflows, code/prompt templates, and architecture breakdowns.
* **Language:** Professional Hebrew (RTL), keeping technical and industry terms in English where standard (e.g. System 1, FP&A, Tokens, Reasoning Effort, Order Book).

---

## 📥 1. Content Ingestion (Gmail & Direct Input)

Sources for this website are **strictly**:
1. **Gmail Ingestion:** Newsletters, substacks, or tech announcements received in Gmail (e.g., Linas's Newsletter, AI announcements) fetched via Composio / Gmail tool.
2. **Direct User Input:** Drafts, notes, voice transcripts, or outlines provided directly in the chat.
3. *(NOT from Notion or external third-party DBs).*

---

## 🖼️ 2. Media & Image Handling

1. All images from the email or source MUST be downloaded and stored locally in:
   `public/images/blog/<slug>-<descriptor>.<ext>`
2. Never rely on external ephemeral URLs (like Substack temporary CDNs or expired tokens).
3. In the Markdown post, embed images with descriptive Hebrew alt tags:
   ```markdown
   ![תיאור התמונה בעברית עבור נגישות ו-SEO](/images/blog/<image-name>.png)
   ```

---

## ✍️ 3. Article Formatting & Frontmatter Schema

Create the file in: `content/posts/<slug>.md`

```markdown
---
title: "כותרת מושכת וממוקדת ערך בעברית (כולל מילת מפתח עיקרית)"
date: "YYYY-MM-DD"
excerpt: "תקציר תמציתי ומסקרן (עד 2 משפטים) המציג את הבעיה, הפתרון והערך המעשי לקורא."
image: "/images/blog/<main-header-image>.png"
tags: ["AI for Finance", "CFO", "Automation", "FP&A", "Claude"]
premium: "false"
---

![כותרת תמונת נושא](/images/blog/<main-header-image>.png)

[פסקת פתיחה חזקה - ה-Hook, הרקע, והשורה התחתונה]

## [כותרת H2 ברורה ומכוונת תועלת]
...
```

### In-Article Structure Requirements:
* **H2 / H3 Structure:** Short, scannable sections.
* **Visuals & Tables:** Compare Old Way vs. New Way, ROI calculations, and cost comparisons.
* **Practical Code / Prompt Snippets:** Ready-to-copy code blocks (TypeScript, Python, Prompts).
* **Internal Linking & Site CTAs:** Naturally link to Ronen Amos CPA ecosystem:
  - Finance AI Services: `/services`
  - AI Courses: `/courses/ai-mastery`, `/courses/notebook-master`
  - Skill Vault & Automation Tools: `/skill-vault`
  - Gamma Guides: `/guides`
  - Newsletter Signup: `/api/subscribe`

---

## ⚙️ 4. Local Build & Verification

After creating the post and saving images:
1. Run index generation:
   ```bash
   node scripts/generate-posts-index.mjs
   ```
2. Verify local compilation / preview link.
3. Output the local review URL:
   `http://localhost:3000/blog/<slug>`

---

## 🚀 5. Production Release (Only After Explicit Approval)

Once the user approves the localhost preview:
```bash
git add content/posts/<slug>.md public/images/blog/<slug>-* lib/generated/posts-index.ts
git commit -m "feat(blog): publish <slug> article"
git pull --rebase origin main
git push origin main
```
