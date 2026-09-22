---
name: ronenamoscpa-content-publisher
description: >-
  Official content creation, guide formatting, and blog publishing workflow for ronenamoscpa.co.il (Ronen Amos CPA).
  Ingests source material from Gmail newsletters or direct user input (no Notion), extracts & optimizes images to public/images/blog/,
  writes authoritative Hebrew finance/AI Markdown posts with Zero-Click Answer blocks, toggle code views, internal backlinks,
  content library CTA button, syncs public/llms.txt and local search index, provides localhost review links,
  and strictly enforces user review before any deployment.
---

# Ronen Amos CPA — Content Publisher & Blog Workflow

This skill defines the complete, production-grade publishing pipeline for **ronenamoscpa.co.il** (Ronen Amos CPA — AI Finance Transformation).

---

## 🛑 STRICT RULE: ZERO AUTO-DEPLOYMENT

> [!IMPORTANT]
> **NEVER deploy (`git push`) automatically.**
> 1. All content creation, asset downloads, and edits are strictly local first.
> 2. Regenerate the local index: `node scripts/generate-posts-index.mjs`.
> 3. Provide the user with a clickable **localhost review link**: `http://localhost:<port>/blog/<slug>`.
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

## ✍️ 3. Article Formatting & Structure Rules

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

> **תשובה מהירה (Zero-Click Answer):**  
> [הגדרה תמציתית, עובדתית ומדויקת של 2-3 משפטים המסבירה את נושא המאמר, היתרונות והשורה התחתונה עבור מנועי AI ומנועי חיפוש].

[פסקת פתיחה חזקה - ה-Hook, הרקע, והשורה התחתונה מנקודת מבטו של רונן עמוס רו"ח ויועץ AI פיננסי]

## [כותרת H2 ברורה ומכוונת תועלת]
...
```

### 📋 Mandatory Content Elements:

1. **Zero-Click Answer Block:** Always place a blockquote with `> **תשובה מהירה (Zero-Click Answer):**` right below the hero image for LLM citations (Google AI Overviews, Perplexity, ChatGPT Search).
2. **Toggle View for Code Blocks:** Every long code snippet (>10 lines) MUST be placed inside an expandable `<details>` block:
   ```html
   <details style="margin: 1.5rem 0; padding: 1.25rem; border-radius: 0.75rem; border: 1px solid #e2e8f0; background: #f8fafc;">
   <summary style="cursor: pointer; font-weight: 600; color: #1d4ed8; font-size: 1.05rem; outline: none;">👉 לחצו כאן לצפייה בדוגמת הקוד המלאה (TypeScript / API Call)</summary>

   ```typescript
   // code here
   ```

   </details>
   ```
3. **Internal Backlinks (3–5 Contextual Links):** Always link to existing relevant blog posts and core pages, e.g.:
   * `/blog/ai-token-optimization-finance` (צמצום צריכת Tokens)
   * `/blog/model-veeffort-claude-code` (בחירת מודל ומאמץ חשיבה)
   * `/blog/agent-skills-financial-audit` (סוכני ביקורת פיננסית)
   * `/blog/אימות-נתונים-לפני-הכל-אל-תתנו-ל-ai-לנתח-לפני-שווידאתם-ששורות` (אימות נתונים)
   * `/blog/בניית-skills-לצוות-fpa` (בניית סקילים ל-FP&A)
   * `/blog/claude-skills-building-guide` (מדריך בניית סקילים)
   * `/courses/ai-mastery` (קורס AI למנהלי כספים)
   * `/services` (שירותי ייעוץ והטמעה)
4. **Standard Content Library CTA Button:** Insert this exact CTA section before the final summary:
   ```html
   ## הצעד הבא

   הצעד הבא שלך הוא לעוד מידע, תוכן ומדריכים לפני כולם. הירשם לספריית התוכן AI Finance Transformation.

   <div style="display: flex; justify-content: center; margin: 3rem 0;">
     <a href="https://www.ronenamoscpa.co.il/" style="
       display: inline-flex;
       align-items: center;
       justify-content: center;
       padding: 1rem 2.5rem;
       font-size: 1.125rem;
       font-weight: 600;
       color: white;
       background: linear-gradient(135deg, rgb(20, 184, 166) 0%, rgb(14, 165, 233) 100%);
       border-radius: 0.75rem;
       text-decoration: none;
       transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
       box-shadow: 0 0 30px rgba(20, 184, 166, 0.5), 0 10px 25px rgba(20, 184, 166, 0.3);
       border: 1px solid rgba(20, 184, 166, 0.3);
     " onmouseover="this.style.boxShadow='0 0 40px rgba(20, 184, 166, 0.8), 0 15px 35px rgba(20, 184, 166, 0.5)'; this.style.transform='translateY(-2px)';" onmouseout="this.style.boxShadow='0 0 30px rgba(20, 184, 166, 0.5), 0 10px 25px rgba(20, 184, 166, 0.3)'; this.style.transform='translateY(0)';">
       להרשמה ורכישת מנוי לספריית התוכן ←
     </a>
   </div>
   ```
5. **Sync `public/llms.txt`:** Always append the post title, URL, description, and zero-click answer to `public/llms.txt`.

---

## ⚙️ 4. Local Build & Verification

After creating the post and saving images:
1. Run index generation:
   ```bash
   node scripts/generate-posts-index.mjs
   ```
2. Check active dev server port (e.g. 3000 or 3005).
3. Output the local review URL:
   `http://localhost:<port>/blog/<slug>`

---

## 🚀 5. Production Release (Only After Explicit User Approval)

Once the user reviews and explicitly approves the localhost preview:
```bash
git add content/posts/<slug>.md public/images/blog/<slug>-* public/llms.txt lib/generated/posts-index.ts
git commit -m "feat(blog): publish <slug> article"
git pull --rebase origin main
git push origin main
```
