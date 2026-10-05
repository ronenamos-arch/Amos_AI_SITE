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

## 🎯 Target Audience, Positioning & Israeli Localization

* **Audience:** Israeli CFOs, Finance Directors (סמנכ"לי כספים), Controllers (חשבים), FP&A Managers, CPAs (רואי חשבון), and tech/startup finance professionals.
* **Tone:** Authoritative, practical, practitioner-to-practitioner, ROI-driven, with actionable workflows, code/prompt templates, and architecture breakdowns.
* **Language:** Professional Hebrew (RTL), keeping technical and industry terms in English where standard (e.g. System 1, FP&A, Tokens, Reasoning Effort, Order Book).
* **🇮🇱 Israeli Persona & Community Alignment:**
  * **Community Name:** Always reference the official community: **AI Finance Transformation של רונן עמוס**.
  * **Local Examples:** Adapt foreign names or overseas case studies from incoming newsletters into Israeli personas (e.g., "בשיחה שקיימתי עם דוד, CFO פרקציונלי מוביל, בקהילת AI Finance Transformation של רונן עמוס...").
  * **Israeli Finance Ecosystem:** Use ILS currency (₪), local tax and audit terminology, and standard Israeli ERPs (Priority, NetSuite).

---

## 📥 1. Content Ingestion (Gmail & Direct Input)

Sources for this website are **strictly**:
1. **Gmail Ingestion:** Newsletters, substacks, or tech announcements received in Gmail fetched via Composio / Gmail tool.
2. **Direct User Input:** Drafts, notes, voice transcripts, or outlines provided directly in the chat.
3. *(NOT from Notion or external third-party DBs).*

---

## 🖼️ 2. Media, Images & Infographic Standards

1. All images from the email or source MUST be downloaded and stored locally in:
   `public/images/blog/<slug>-<descriptor>.<ext>`
2. Never rely on external ephemeral URLs (like Substack temporary CDNs or expired tokens).
3. **🎨 White / Light Background Infographic Standard & SVG Typography:**
   * Hero infographics and custom process diagrams must always use a **clean white/light background** (`#ffffff` / `#f8fafc`) with sharp dark typography (`#0f172a`), distinct card containers (teal, sky-blue, purple accents), and Hebrew labels.
   * **SVG Text Alignment:** Always center text in cards (`text-anchor="middle"`) or use explicit LTR coordinates. Never combine `direction="rtl"` with `text-anchor="end"` on container boundaries to prevent text cutoff.
   * Brand watermark/footer: `רונן עמוס רו״ח • קהילת AI Finance Transformation • ronenamoscpa.co.il`.
4. In the Markdown post, embed images with descriptive Hebrew alt tags:
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
excerpt: 'תקציר תמציתי ומסקרן (עד 2 משפטים) המציג את הבעיה, הפתרון והערך המעשי לקורא.'
image: "/images/blog/<slug>-header.png"
tags: ["AI for Finance", "CFO", "Automation", "FP&A", "Claude"]
premium: "false"
---

![כותרת תמונת נושא](/images/blog/<slug>-header.png)

> **תשובה מהירה (Zero-Click Answer):**  
> [הגדרה תמציתית, עובדתית ומדויקת של 2-3 משפטים המסבירה את נושא המאמר, היתרונות והשורה התחתונה עבור מנועי AI ומנועי חיפוש].

[פסקת פתיחה חזקה - ה-Hook, הרקע, והשורה התחתונה מנקודת מבטו של רונן עמוס רו"ח ויועץ AI פיננסי בקהילת AI Finance Transformation]

## [כותרת H2 ברורה ומכוונת תועלת]
...
```

### 📋 Mandatory Content Elements:

1. **Zero-Click Answer Block:** Always place a blockquote with `> **תשובה מהירה (Zero-Click Answer):**` right below the hero image for LLM citations (Google AI Overviews, Perplexity, ChatGPT Search).
2. **YAML Frontmatter Quotes:** When Hebrew titles or excerpts contain double quotes (e.g. סמנכ"לי, רו"ח), use single quotes `'...'` in the frontmatter to prevent unwanted backslash escaping (`\"`).
3. **HTML Blocks & Flowcards (Dark Mode Compatible & Zero-Indent Rule):**
   * Raw HTML components (process flowcards, alert boxes) must have **ZERO leading 4-space indentation** to prevent Markdown parsers (`marked`) from mistakenly wrapping them in `<pre><code>` black code boxes.
   * **Dark Mode Container Standard:** The site uses dark mode styling (`prose-invert`). Never use plain pale white cards (`#ffffff`/`#f8fafc`) without dark text overrides. Use sleek dark slate / navy cards (`background: #0f172a; border: 1px solid #1e293b; color: #e2e8f0;`) with glowing colored borders (Teal, Sky, Emerald, Violet) and bright headings (`#f8fafc` / `#5eead4`).
4. **Closed & Open Styling for Long Code/Prompts (`<details>`):** Every long prompt or code snippet MUST be styled as a standout interactive container:
   ```html
   <details style="margin: 2rem 0; padding: 1.25rem 1.5rem; border-radius: 0.85rem; border: 1.5px solid #0d9488; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); box-shadow: 0 4px 20px rgba(13, 148, 136, 0.15);">
   <summary style="cursor: pointer; font-weight: 700; color: #2dd4bf; font-size: 1.05rem; outline: none; margin-bottom: 0.75rem; display: flex; align-items: center; justify-content: space-between;">
     <span>👉 לחצו כאן לצפייה בפרומפט / הקוד המלא</span>
     <span style="background: rgba(13, 148, 136, 0.2); color: #5eead4; border: 1px solid #0d9488; font-size: 0.78rem; font-weight: 700; padding: 0.25rem 0.75rem; border-radius: 9999px;">PROMPT</span>
   </summary>

   <div style="position: relative; background: #000000; border-radius: 0.5rem; border: 1px solid #334155; margin-top: 0.75rem; overflow: hidden;">
   <div style="display: flex; justify-content: space-between; align-items: center; background: #18181b; padding: 0.5rem 1rem; border-bottom: 1px solid #27272a;">
   <span style="font-size: 0.8rem; color: #a1a1aa; font-family: ui-monospace, monospace; font-weight: 500;">PROMPT</span>
   <button onclick="const t = this.closest('div').parentElement.querySelector('pre').innerText; navigator.clipboard.writeText(t); this.innerText = '✓ הועתק!'; this.style.color = '#10b981'; setTimeout(() => { this.innerText = '📋 העתק פרומפט'; this.style.color = '#e4e4e7'; }, 2000);" style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); color: #e4e4e7; padding: 0.3rem 0.75rem; border-radius: 0.375rem; font-size: 0.8rem; cursor: pointer; transition: all 0.2s; font-family: system-ui, sans-serif; display: flex; align-items: center; gap: 0.35rem;">📋 העתק פרומפט</button>
   </div>
   <pre style="color: #ffffff; padding: 1.25rem; margin: 0; overflow-x: auto; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 0.92rem; line-height: 1.6; direction: ltr; text-align: left; white-space: pre-wrap; background: transparent; border: none;">
   // code or prompt here
   </pre>
   </div>

   </details>
   ```
4. **Internal Backlinks (3–5 Contextual Links):** Always link to existing relevant blog posts and core pages, e.g.:
   * `/blog/ai-token-optimization-finance` (צמצום צריכת Tokens)
   * `/blog/model-veeffort-claude-code` (בחירת מודל ומאמץ חשיבה)
   * `/blog/agent-skills-financial-audit` (סוכני ביקורת פיננסית)
   * `/blog/אימות-נתונים-לפני-הכל-אל-תתנו-ל-ai-לנתח-לפני-שווידאתם-ששורות` (אימות נתונים)
   * `/courses/ai-mastery` (קורס AI למנהלי כספים)
   * `/services` (שירותי ייעוץ והטמעה)
5. **Standard Content Library CTA Button:** Insert this exact CTA section before the final summary:
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
6. **Sync `public/llms.txt`:** Always append the post title, URL, description, and zero-click answer to `public/llms.txt`.

---

## ⚙️ 4. Local Build & Verification

After creating the post and saving images:
1. Run index generation:
   ```bash
   node scripts/generate-posts-index.mjs
   ```
2. Check active dev server port (`http://localhost:3000`).
3. Output the local review URL:
   `http://localhost:<port>/blog/<slug>`

---

## 🚀 5. Production Release & SEO Indexing (Only After User Approval)

Once the user reviews and explicitly approves the localhost preview:

```bash
# 1. Commit and push to main
git add content/posts/<slug>.md public/images/blog/<slug>-* public/llms.txt scripts/generate-header-infographic.mjs
git commit -m "feat(blog): publish <slug> article"
git pull --rebase origin main
git push origin main

# 2. Submit to Google Search Console
python scripts/gsc_client.py submit-sitemap https://www.ronenamoscpa.co.il/sitemap.xml

# 3. Submit to IndexNow (Bing & Search Engines)
node -e "
const https = require('https');
const postData = JSON.stringify({
  host: 'www.ronenamoscpa.co.il',
  key: 'f9826b1b81c34964b0fa14797b4af314',
  keyLocation: 'https://www.ronenamoscpa.co.il/f9826b1b81c34964b0fa14797b4af314.txt',
  urlList: ['https://www.ronenamoscpa.co.il/blog/<slug>', 'https://www.ronenamoscpa.co.il/sitemap.xml', 'https://www.ronenamoscpa.co.il/blog']
});
const req = https.request({
  hostname: 'api.indexnow.org',
  port: 443,
  path: '/indexnow',
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8', 'Content-Length': Buffer.byteLength(postData) }
}, (res) => console.log('IndexNow status:', res.statusCode));
req.write(postData);
req.end();
"
```
