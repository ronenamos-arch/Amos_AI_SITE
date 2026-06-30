---
title: "5 תיקיות שהופכות את Claude לעוזר שיודע בדיוק איפה הכל"
date: "2026-06-30"
excerpt: "מערכת תיקיות פשוטה שהופכת את Claude מכלי שמנחש לעוזר שיודע מה לקרוא, מה להשתמש בו, ומה להתעלם ממנו — בלי לשנות שורה אחת ב-prompt."
image: "/images/blog/claude-folder-1.png"
tags: ["Claude", "AI", "Cowork", "workflow", "ניהול קבצים"]
premium: "false"
---

![מבנה התיקיות המלא ל-Claude](/images/blog/claude-folder-1.png)

## הבעיה לא הייתה ב-prompt — היא הייתה בתיקייה

רובנו מאשימים את הניסוח כשהפלט של Claude לא טוב.

אבל לעיתים קרובות הבעיה נמצאת במקום אחר לגמרי: בקבצים. קבצי `final.docx`, `final_v2.docx`, `new_final_REAL.docx`. טיוטות ישנות מעורבות עם העבודה הנוכחית. ללא מבנה ברור וללא סדר הגיוני.

Claude עשה את הכי טוב שיכל עם workspace מבולגן. וסביבה מבולגנת = פלט מבולגן.

מבנה תיקיות נכון משנה את זה. Claude יודע מה לקרוא, מה להשתמש בו, ולאן לשמור את התוצאה. **הפלט משתפר בלי לשנות ולו מילה אחת ב-prompt.**

## התיקייה היא חלק מה-prompt

ה-prompt שלך הוא לא רק הטקסט שאתה מקליד.

הוא גם כל מה שנמצא בתיקייה שלך. זו הסיבה שתיקייה מבולגנת נותנת ל-Claude הקשר מבולגן — הוא עלול לפתוח את הטיוטה הישנה, להתייחס לנתון ישן כאילו הוא עדכני, או להתעלם מהקובץ שחשוב באמת.

במקום לעשות את העבודה, הוא מבזבז זמן על לנסות להבין את ה-workspace שלך.

תיקייה מסודרת מסירה את ההתלבטות הזו. היא אומרת ל-Claude בדיוק היכן הכל נמצא.

## המבנה: 5 תיקיות וסיום הבלבול

![מבנה 5 התיקיות הממוספרות](/images/blog/claude-folder-2.png)

הבסיס פשוט:

```
YOUR-WORKSPACE/
├── [01] system/
├── [02] context/
├── [03] projects/
├── [04] outputs/
└── [99] archive/
```

**המספרים עושים הבדל גדול.** הם קובעים סדר קריאה — Claude יודע להתחיל מ-`[01]`, לדעת שזה ה"חוקים", ולהבין שה-archive תמיד בסוף. `[99]` מבטיח שה-archive נשאר בתחתית — לא פעיל, אבל חיפוש עדיין מוצא אותו.

הנה מה שכל תיקייה עושה:

| תיקייה | תפקיד |
|---|---|
| `[01] system/` | כללים שClaude חייב לעקוב אחריהם |
| `[02] context/` | הקשר יציב שClaude חייב לדעת |
| `[03] projects/` | עבודה פעילה |
| `[04] outputs/` | עבודה שהושלמה |
| `[99] archive/` | ישן, אבל עדיין ניתן לחיפוש |

זה הכל. אין צורך בעשרים תיקיות או בטקסונומיה מושלמת. רק מבנה שClaude יכול לסרוק מהר ולהבין.

## שמות קבצים — תן ל-Claude לדעת מה בפנים לפני שפותחים

![דוגמת שמות קבצים נכונים](/images/blog/claude-folder-3.png)

שמות קבצים הם הקשר.

לפני ש-Claude פותח מסמך, השם כבר אומר לו מה הקובץ מכיל. **כל שם קובץ צריך לענות על 3 שאלות: מתי? מה? באיזה סטטוס?**

להימנע מ:
- `final.docx` / `final_v2.docx` / `new_final_REAL.docx`
- `notes.md` / `screenshot.png`

להשתמש ב:
- `2026-06-28_budget-review_draft-v1.md`
- `2026-Q2_forecasting-model_final.xlsx`
- `2026-06_client-report_approved.docx`

לא כל קובץ צריך את אותה רמת דיוק בתאריך. הכלל הפשוט:

| סוג קובץ | פורמט תאריך |
|---|---|
| קבצים ארוכי-טווח | YEAR בלבד |
| מחזורי תכנון | YEAR + QUARTER |
| עבודה חוזרת | YEAR + MONTH |
| משימות ספציפיות | FULL DATE |

## להפריד בין עבודה פעילה, ידע לשימוש חוזר, וארכיון

![הפרדת סוגי קבצים](/images/blog/claude-folder-4.png)

לא כל הקבצים צריכים את אותה יחס.

יש קבצים פעילים. יש כאלה לשימוש חוזר. יש שכבר הסתיימו. ויש ישנים שאולי יהיו שימושיים מאוחר יותר.

**אל תערבב אותם.**

- `projects/` — עבודה פעילה שClaude מעבד עכשיו
- `context/` — הקשר יציב לשימוש חוזר בפרויקטים שונים
- `outputs/` — עבודה שהסתיימה
- `archive/` — ישן, אבל ניתן לחיפוש

בתוך `[03] projects/`, ממספרים כי יש workflow:

```
[03] projects/
└── budget-review-2026/
    ├── 00_BRIEF.md
    ├── 01_SOURCES/
    ├── 02_NOTES/
    ├── 03_DRAFTS/
    ├── 04_VISUALS/
    └── 05_FINAL/
```

הסדר הזה אומר ל-Claude: `00_BRIEF` קודם, אחר כך מקורות, אחר כך notes, ואז טיוטות. **Claude יודע איפה לקרוא ובאיזה סדר.**

לעומת זאת, `[02] context/` עובד כמו **ספרייה** — לא צריך סדר קריאה, רק נגישות:

```
[02] context/
├── HOW-I-WORK.md
├── voice-guide.md
├── audience.md
└── references/
    ├── brand-guide.md
    ├── report-examples/
    └── prompt-library/
```

קבצים לשימוש חוזר לא צריכים להיות מועתקים לכל פרויקט. פשוט אומרים ל-Claude להשתמש בהם לפי הצורך.

## כלל העיצוב שמאחד הכל

```
Workspace   → מפה ממוספרת
Projects    → workflow ממוספר
Context     → ספרייה תיאורית
Outputs     → תאריך + נושא + סטטוס
Archive     → ישן, אבל ניתן לחיפוש
```

**Markdown להוראות. מספרים לסדר. שמות למשמעות. תאריכים לחיפוש. Archive לרעש.**

זה הכל.

## איפה להתחיל

אל תארגן מחדש את כל המחשב הלילה. ככה אנשים הופכים ניהול קבצים לפרויקט שלעולם לא מסיימים.

התחל מתיקייה אחת שClaude כבר נוגע בה. הוסף מבנה. שנה שם לקבצים שחשובים. העבר את הישן ל-`[99] archive/`.

זה מספיק. תן ל-Claude פחות סיבות לנחש.

---

## הצעד הבא — תן ל-AI לעבוד בשבילך באמת

מבנה תיקיות נכון הוא רק השכבה הראשונה. השכבה הבאה היא לגרום ל-Claude לא רק למצוא קבצים — אלא לנהל את כל תהליכי הכספים שלך: P&L, cash flow, דוחות חודשיים — באופן אוטומטי.

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
    גלה כיצד AI Finance Transformation עובד
  </a>
</div>
