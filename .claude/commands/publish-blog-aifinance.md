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

**CTA קבוע בסוף כל פוסט — עם כפתור זוהר:**

הכותרת והטקסט המקדים **תמיד זהים** לכל הפוסטים:

```markdown
## הצעד הבא

הצעד הבא שלך הוא לעוד מידע, תוכן ומדריכים לפני כולם. הירשם לבלוג שלי.
```

**כפתור לפוסט חינמי** (`premium: "false"`) — קישור לבלוג להרשמה:
```html
<div style="display: flex; justify-content: center; margin: 3rem 0;">
  <a href="https://www.ronenamoscpa.co.il/blog" style="
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
    הירשם לבלוג וקבל תוכן לפני כולם →
  </a>
</div>
```

**כפתור לפוסט פרימיום** (`premium: "true"`) — קישור לעמוד המנוי:
```html
<div style="display: flex; justify-content: center; margin: 3rem 0;">
  <a href="https://www.ronenamoscpa.co.il/pricing" style="
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
    לתוכן פרימיום נוסף — הצטרף עכשיו →
  </a>
</div>
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

## עיצוב מומלץ לסעיפים שונים

### FAQ Accordion — שאלות נפוצות

אם הפוסט כולל FAQ, השתמש בפורמט accordion מקופל (collapsible):

```html
<div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem; margin: 2rem 0;">
  <details style="
    padding: 1.5rem;
    border: 1px solid rgba(20, 184, 166, 0.2);
    border-radius: 0.75rem;
    background: rgba(20, 184, 166, 0.05);
    cursor: pointer;
    transition: all 0.3s ease;
  " onmouseover="this.style.background='rgba(20, 184, 166, 0.1)'; this.style.borderColor='rgba(20, 184, 166, 0.4)';" onmouseout="this.style.background='rgba(20, 184, 166, 0.05)'; this.style.borderColor='rgba(20, 184, 166, 0.2)';">
    <summary style="
      font-weight: 600;
      font-size: 1.0625rem;
      color: rgb(20, 184, 166);
      outline: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
    ">
      [השאלה]
      <span style="margin-right: 1rem;">▼</span>
    </summary>
    <p style="margin-top: 1rem; color: inherit; line-height: 1.6;">[התשובה]</p>
  </details>
</div>
```

---

## כללים חשובים

- **תמונה — לא יוצר placeholder** — ממתין תמיד לאישור המשתמש לפני יצירת הקובץ
- **שם תמונה — קצר** — מקסימום 3-4 מילים אנגליות, ללא slug מלא
- **סיומת תמונה** — ברירת מחדל `.png`; אם המשתמש ציין סיומת אחרת — קבל אותה
- **Frontmatter תאריך** — תמיד תאריך היום
- **slug** — ייחודי, לא קיים כבר ב-`content/posts/`; עדיף בעברית בלבד או אנגלית קצרה
- **כפתור CTA** — תמיד השתמש בתבנית הזוהר (glowing button) - עם gradient teal וסיבוב עם hover
- **FAQ Accordion** — אם יש שאלות נפוצות, השתמש בתבנית accordion לא בנקודות פשוטות
- **`force-dynamic`** — כבר קיים ב-`app/blog/[slug]/page.tsx`, לא צריך לשנות
- **עברית RTL** — כל התוכן בעברית, כתיבה מימין לשמאל
- **Preview URL** — בדוק תמיד ב-localhost לפני deploy כדי לוודא עיצוב וטעימות
