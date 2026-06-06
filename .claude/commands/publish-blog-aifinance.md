# publish-blog

פרסום פוסט חדש לבלוג של רונן עמוס — מתוכן גולמי לדיפלוי מלא.

## תהליך העבודה

### שלב 1 — קבלת תוכן מהמשתמש

בקש מהמשתמש לספק:
1. **תוכן הפוסט** — טקסט גולמי, נקודות, מאמר, כל פורמט
2. **פרמיום או חינמי?** — `premium: "true"` / `premium: "false"`

אין צורך לבקש תמונה בשלב זה — המשתמש יעלה אותה בנפרד לאחר ה-preview.

אם המשתמש סיפק את הכל בהודעה אחת — המשך ישירות לשלב 2.

### שלב 2 — הכנת הפוסט

**קרא תחילה את 2 הפוסטים האחרונים** כטמפלט:
- `content/posts/agent-skills-financial-audit.md`
- `content/posts/מדריך-claude-לסמנכלי-כספים-90-יום.md`

**צור slug מהכותרת:**
- עברית בלבד → slug עברי (לדוגמה: `ניקוי-נתונים-עם-ai`)
- אנגלית/מעורב → slug אנגלי (לדוגמה: `data-cleaning-with-ai`)
- מקפים במקום רווחים, ללא תווים מיוחדים

**שם קובץ התמונה — קצר וברור:**
- בנה שם קצר מהנושא המרכזי: `<נושא-קצר>-1.png`
- **מקסימום 3-4 מילים**, אנגלית, מקפים
- דוגמאות טובות: `openclaw-workflow-1.png`, `ai-budget-alert-1.png`, `cfo-dashboard-1.png`
- **לא** להשתמש ב-slug המלא כשם התמונה — הוא ארוך מדי

**בנה את ה-Frontmatter:**
```yaml
---
title: "<כותרת ברורה ומושכת בעברית>"
date: "<תאריך היום YYYY-MM-DD>"
excerpt: "<תקציר 1-2 משפטים שמסביר את הערך לקורא>"
image: "/images/blog/<שם-תמונה-קצר>-1.png"
tags: ["<תגית1>", "<תגית2>", "<תגית3>"]
premium: "<true/false>"
---
```

**בנה את גוף הפוסט:**
- פתח עם תמונה: `![<תיאור alt>](/images/blog/<שם-תמונה-קצר>-1.png)`
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

### שלב 3 — Preview + הנחיית תמונה

הצג את הפוסט המלא בפורמט Markdown בתוך הצ'אט כ-preview.

כלול בסוף הpreview את הבלוק הזה במפורש:

```
📄 שם קובץ: content/posts/<slug>.md
🔒 פרמיום: כן/לא
🔗 URL עתידי: https://www.ronenamoscpa.co.il/blog/<slug>

📸 שם התמונה לשמור:
   <שם-תמונה-קצר>-1.png
   (העלה ל: public/images/blog/ בגיטהאב או מהמחשב)

✋ המתן — עדכן אותי כשהתמונה שמורה ואז נעלה ביחד.
```

**עצור כאן. אל תצור קבצים עד שהמשתמש מאשר שהתמונה הועלתה.**

### שלב 4 — יצירת קובץ + Push לאחר אישור תמונה

רק לאחר שהמשתמש אומר "שמרתי" / "העליתי" / "done":

1. **צור קובץ markdown** ב-`content/posts/<slug>.md`
2. **המשך מיד ל-commit ו-push** — אין צורך לבקש אישור נוסף

### שלב 5 — Git: Commit ו-Push ל-main

```bash
git checkout main && git pull origin main

git add content/posts/<slug>.md public/images/blog/<image-filename>

git commit -m "Add blog post: <כותרת הפוסט>"

git push origin main
```

**דגש: push ישירות ל-main** — ללא branch ביניים, כדי שהדיפלוי יהיה מיידי דרך Vercel.

### שלב 6 — סיכום למשתמש

לאחר ה-push, הצג:

```
✅ הפוסט עלה ל-main — Vercel מתחיל deploy (~3-5 דקות)
🔗 URL: https://www.ronenamoscpa.co.il/blog/<slug>

📡 IndexNow (Bing) — פתח בדפדפן לאחר deploy:
https://api.indexnow.org/indexnow?url=https://www.ronenamoscpa.co.il/blog/<slug>&key=f9826b1b81c34964b0fa14797b4af314&keyLocation=https://www.ronenamoscpa.co.il/f9826b1b81c34964b0fa14797b4af314.txt

🔍 Google Search Console — בקש אינדקס ידנית:
https://search.google.com/search-console
```

---

## כללים חשובים

- **תמונה — לא יוצר placeholder** — ממתין תמיד לאישור המשתמש לפני יצירת הקובץ
- **שם תמונה — קצר** — מקסימום 3-4 מילים אנגליות, ללא slug מלא
- **סיומת תמונה** — ברירת מחדל `.png`; אם המשתמש ציין סיומת אחרת — קבל אותה
- **Frontmatter תאריך** — תמיד תאריך היום
- **slug** — ייחודי, לא קיים כבר ב-`content/posts/`
- **`force-dynamic`** — כבר קיים ב-`app/blog/[slug]/page.tsx`, לא צריך לשנות
- **עברית RTL** — כל התוכן בעברית, כתיבה מימין לשמאל
