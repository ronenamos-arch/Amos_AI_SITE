# publish-blog

פרסום פוסט חדש לבלוג של רונן עמוס — מתוכן גולמי לדיפלוי מלא.

## תהליך העבודה

### שלב 1 — קבלת תוכן מהמשתמש

בקש מהמשתמש לספק:
1. **תוכן הפוסט** — טקסט גולמי, נקודות, מאמר, כל פורמט
2. **תמונה** — הדבק/שתף ישירות בצ'אט (תשמר ב-`public/images/blog/`)
3. **פרמיום או חינמי?** — `premium: "true"` / `premium: "false"`

אם המשתמש סיפק את הכל בהודעה אחת — המשך ישירות לשלב 2.

### שלב 2 — הכנת הפוסט

**קרא תחילה את 2 הפוסטים האחרונים** כטמפלט:
- `content/posts/agent-skills-financial-audit.md`
- `content/posts/netsuite-claude-ai-connector-2026.md`

**צור slug מהכותרת:**
- עברית בלבד → slug עברי (לדוגמה: `ניקוי-נתונים-עם-ai`)
- אנגלית/מעורב → slug אנגלי (לדוגמה: `data-cleaning-with-ai`)
- מקפים במקום רווחים, ללא תווים מיוחדים

**שמור תמונה:**
- אם המשתמש סיפק תמונה → שמור בשם `public/images/blog/<slug>-1.<סיומת>`
- אם לא סיפק → בחר תמונה קיימת מ-`public/images/blog/` שמתאימה לנושא

**בנה את ה-Frontmatter:**
```yaml
---
title: "<כותרת ברורה ומושכת בעברית>"
date: "<תאריך היום YYYY-MM-DD>"
excerpt: "<תקציר 1-2 משפטים שמסביר את הערך לקורא>"
image: "/images/blog/<slug>-1.<סיומת>"
tags: ["<תגית1>", "<תגית2>", "<תגית3>"]
premium: "<true/false>"
---
```

**בנה את גוף הפוסט:**
- פתח עם תמונה: `![<תיאור alt>](/images/blog/<slug>-1.<סיומת>)`
- כותרת ראשית שמחכה בהמשך (לא לחזור על ה-title)
- שימוש ב-`##` לסעיפים ראשיים, `###` לתת-סעיפים
- הדגש נקודות מפתח ב-**bold**
- טבלאות כשרלוונטי
- בלוקי קוד/פרומפטים כשרלוונטי
- סגנון: ישיר, מקצועי, לא אקדמי — כמו מומחה שמסביר לעמית

**CTA קבוע בסוף כל פוסט (העתק כמו שהוא):**
```markdown
---

## מה הצעד הבא שלכם?

**אפשרות 1:** [הצטרפו לקורס AI Finance Mastery](https://www.ronenamoscpa.co.il/courses/ai-mastery) והתחילו ליישם AI במחלקת הכספים שלכם.

**אפשרות 2:** [Mastering NotebookLM — קורס מעשי לאנשי פיננסים](https://www.ronenamoscpa.co.il/courses/notebook-master) — כלי ה-AI שמארגן את הידע שלכם.

**אפשרות 3:** [הזמינו אותי להרצאה או סדנה מעשית](https://www.ronenamoscpa.co.il/contact) לצוות שלכם בנושא שילוב AI ו-ERP.
```

### שלב 3 — Preview

הצג את הפוסט המלא בפורמט Markdown בתוך הצ'אט כ-preview.

כלול גם:
```
📄 שם קובץ: content/posts/<slug>.md
🖼️ תמונה: public/images/blog/<slug>-1.<סיומת>
🔒 פרמיום: כן/לא
🔗 URL עתידי: https://www.ronenamoscpa.co.il/blog/<slug>
```

**המתן לאישור המשתמש לפני המשך.**

### שלב 4 — יצירת קובץ ושמירת תמונה

רק לאחר אישור:

1. **שמור את התמונה** ב-`public/images/blog/<slug>-1.<סיומת>`
2. **צור קובץ markdown** ב-`content/posts/<slug>.md`

### שלב 5 — Git: Branch, Commit, Push

```bash
# צור branch חדש
git checkout -b claude/blog-post-<slug>

# Stage הקבצים
git add content/posts/<slug>.md
git add public/images/blog/<slug>-1.*  # אם הועלתה תמונה

# Commit
git commit -m "Add blog post: <כותרת הפוסט>"

# Push
git push -u origin claude/blog-post-<slug>
```

### שלב 6 — הנחיות למשתמש

לאחר ה-push, הצג:

```
✅ הפוסט הועלה ל-branch: claude/blog-post-<slug>

כדי לפרסם באתר:
1. כנס ל-GitHub → פתח Pull Request
2. Merge → Vercel מבצע deploy אוטומטי (~3-5 דקות)
3. URL: https://www.ronenamoscpa.co.il/blog/<slug>

📡 IndexNow (Bing) — פתח בדפדפן לאחר deploy:
https://api.indexnow.org/indexnow?url=https://www.ronenamoscpa.co.il/blog/<slug-encoded>&key=f9826b1b81c34964b0fa14797b4af314&keyLocation=https://www.ronenamoscpa.co.il/f9826b1b81c34964b0fa14797b4af314.txt

🔍 Google Search Console — בקש אינדקס ידנית:
https://search.google.com/search-console
```

---

## כללים חשובים

- **אל תיגע בנתון המקורי** — תמיד branch חדש, אף פעם לא push ל-main ישירות
- **Frontmatter תאריך** — תמיד תאריך היום
- **slug** — ייחודי, לא קיים כבר ב-`content/posts/`
- **תמונה חסרה** — אם המשתמש לא סיפק, בחר מהקיימות ב-`public/images/blog/` לפי נושא
- **`force-dynamic`** — כבר קיים ב-`app/blog/[slug]/page.tsx`, לא צריך לשנות
- **עברית RTL** — כל התוכן בעברית, כתיבה מימין לשמאל
