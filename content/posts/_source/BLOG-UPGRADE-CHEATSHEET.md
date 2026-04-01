ond# Blog Post Upgrade — Cheat Sheet

## How to activate in a new conversation

Open the post file in the IDE (or paste the path), then say:

> **"redo this post like we did before"**
> **"upgrade this post to premium"**
> **"fix this post / do the same to this post"**

Claude will automatically recall the full flow from memory and execute it.

---

## What Claude does (the 6 steps)

1. **Reads** the existing post — understands content, structure, tone
2. **Checks images** — finds which `-0.jpg`, `-1.jpg` etc. exist in `public/images/blog/`
3. **Picks a template** — A, B, or C (see below)
4. **Builds HTML preview** → saves to `_source/preview_[slug].html`
5. **Waits for your approval** — you say "approve" or "deploy it"
6. **Updates `.md` + commits + pushes** → Vercel auto-deploys in ~2 min

---

## Template Selection (Claude decides)

| Template | When to use |
|----------|-------------|
| **A — מדריך שלב-אחר-שלב** | How-to guide, numbered steps, "כך תבנו", "5 דרכים ל..." |
| **B — טיעון/דעה** | Strong claim, opinion, "למה X כושל", "האמת על..." |
| **C — סקירת כלי** | Single tool spotlight, "מה זה NotebookLM", "ChatGPT ל..." |

---

## What gets stripped (old mess)

- Author bio sections
- Links to: amosbudget.com · substack · gamma.site presentations
- Blogger image wrappers (clickable images → blogger.googleusercontent.com)
- Fake heading separators (`---` repeated, `===` underlines)
- "תגיבו פה / שלחו לי הודעה" requests
- Last image if it's an author headshot

## What gets added (standard premium structure)

- Clean cover image (no link wrapper)
- Template sections (varies by A/B/C)
- **WhatsApp CTA** (mid-post): https://chat.whatsapp.com/CS6dgqnK45Q9XAMqScNr6R
- **💡 Tip box** (amber)
- **Summary bullets**
- **Bottom CTA block** (3 options always):
  1. קורס AI Finance Mastery → `/courses/ai-mastery`
  2. Mastering NotebookLM → `/courses/notebook-master`
  3. הרצאה/סדנה → `/contact`
- Closing line: *"המתחרים שלכם כבר בוחנים... האם אתם מובילים — או מגיבים."*

---

## Key paths (for reference)

```
Site root:  blog andwebsite/site/
Posts:      content/posts/[slug].md
Images:     public/images/blog/[slug]-0.jpg (cover), -1, -2 ...
Previews:   content/posts/_source/preview_[slug].html
Templates:  content/posts/_source/_TEMPLATE.md / _B.md / _C.md
Git:        branch main → Vercel auto-deploys on push
Live site:  https://www.ronenamoscpa.co.il
```

---

## Posts already upgraded ✅

| Post | Template | Date |
|------|----------|------|
| כך-תבנו-דאשבורד-cfo... | A | 2026-03-29 |
| המדריך-למשתמש-המתקדם-7-שימושים-ב-notebooklm | C | 2026-03-29 |
| 4-ההשקעות-המרכזיות-בבינה-מלאכותית... | A | 2026-03-29 |
| 5-workflows-שאנחנו-מיישמים-אצל-לקוחות-המדריך-המלא | A | 2026-04-01 |

---

## Posts still to upgrade

Check `content/posts/` — any post with old-style CTAs (amosbudget links, Substack, Gamma, blogger image links, author bio at bottom) needs the upgrade flow.
