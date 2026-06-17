---
title: "המדריך המלא לבניית Skills ב-Claude"
date: "2026-06-18"
excerpt: "Skills של Claude הם הדרך להפוך ידע מקצועי לתהליכים שטוענים אוטומטית בכל שיחה — בלי להעתיק הוראות מחדש. המדריך הזה מסביר איך בונים אותם מ-A עד Z."
image: "/images/blog/claude-skills-1.png"
tags: ["Claude", "Skills", "AI", "אוטומציה", "Cowork"]
premium: "false"
---

![המדריך המלא לבניית Skills ב-Claude](/images/blog/claude-skills-1.png)

## הבעיה שכולם מכירים

כל שיחה חדשה עם Claude — מתחילים מאפס. הפורמט המועדף עליך, סגנון הכתיבה של הצוות, המינוח המקצועי שלך, סטנדרטים האיכות — הכל נעלם. אתה מבלה את הדקות הראשונות בלבנות מחדש הקשר שכבר בנית בשיחה הקודמת.

לפרויקט חד-פעמי — בסדר. לעבודה מקצועית שחוזרת על עצמה — זה מס על כל שיחה.

**Claude Skills הם הפתרון.** Skill הוא תיקייה עם הוראות שאתה בונה פעם אחת, ו-Claude טוען אוטומטית כשהמשימה מתאימה. ההעדפות שלך, ה-workflow, הידע הדומיין — מוטמעים ב-Skill, לא מודבקים מחדש בכל צ'אט.

Skills הושקו באוקטובר 2025 ומהר מאוד הפכו לדרך הדומיננטית לתת ל-Claude יכולות ספציפיות לדומיין. מאגר ה-Skills הרשמי של Anthropic ב-**[github.com/anthropics/skills](https://github.com/anthropics/skills)** כבר עבר 141,000 כוכבים ו-16,000+ forks.

---

## מה זה בעצם Skill?

Skill הוא **תיקייה**. בתוכה קובץ `SKILL.md` (חובה) ואופציונלית:

```
your-skill-name/
├── SKILL.md              # חובה — קובץ ה-skill הראשי
├── scripts/              # אופציונלי — קוד להרצה
│   ├── process_data.py
│   └── validate.sh
├── references/           # אופציונלי — תיעוד שנטען לפי צורך
│   ├── api-guide.md
│   └── examples/
└── assets/               # אופציונלי — תבניות, גופנים, אייקונים
    └── report-template.md
```

זו **כל ההגדרה הטכנית**. Skills הם לא מודלים, לא plugins במובן של WordPress, לא תוספות בתשלום. הם הוראות Markdown בקוד פתוח + קבצים נלווים.

### מערכת שלוש השכבות

הכוח האמיתי טמון בארכיטקטורה. Claude משתמש במערכת **Progressive Disclosure** עם שלוש שכבות:

| שכבה | מה נטען | עלות |
|---|---|---|
| **YAML frontmatter** | תמיד — בכל שיחה | ~100 טוקנים לכל Skill |
| **גוף SKILL.md** | רק כש-Claude מזהה רלוונטיות | לפי הצורך |
| **קבצי references/** | רק כשהמשימה דורשת | לפי הצורך |

המשמעות: אפשר להתקין עשרות Skills מבלי להכביד על ה-context — רק ה-frontmatter של כל Skill נטען כברירת מחדל.

### ה-Skill מול MCP

לצוותים שבונים על שרתי MCP: Skills מוסיפים **שכבת ידע** מעל ה-connectivity.

כפי ש-Anthropic מסביר: MCP מספק את המטבח המקצועי — גישה לכלים, מרכיבים וציוד. Skills מספקים את המתכונים וההוראות לייצור משהו בעל ערך. MCP אומר ל-Claude **מה** הוא יכול לעשות. Skills אומרים לו **איך** לעשות זאת טוב.

---

## תכנון לפני שכותבים שורה אחת

הטעות הנפוצה: מתחילים עם מבנה הקבצים במקום עם תרחיש השימוש. ה-**[מדריך הרשמי של Anthropic](https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf)** ברור: הגדר 2-3 תרחישים קונקרטיים לפני שנוגעים בקבצים.

### ארבע שאלות לפני שמתחילים

1. **מה המשתמש רוצה להשיג?**
2. **איזה workflow רב-שלבי זה דורש?**
3. **אילו כלים נחוצים** — יכולות מובנות של Claude, או כלים מחוברים דרך MCP?
4. **איזה ידע דומיין או best practices כדאי להטמיע** שהמשתמש אחרת היה צריך להסביר בכל שיחה?

### שלוש קטגוריות עיקריות של Skills

**יצירת מסמכים ונכסים** — פלט עקבי ואיכותי: מסמכים, מצגות, עיצובים, קוד. מוטמעים מדריכי סגנון ו-checklists. דוגמאות מהמאגר הרשמי: `docx`, `pdf`, `pptx`, `xlsx`, `frontend-design`.

**אוטומציה של Workflow** — תהליכים רב-שלביים עם מתודולוגיה קבועה: pipelines של מחקר, workflow תוכן, רצפי onboarding. ה-`skill-creator` הוא הדוגמה הקנונית — הוא מנחה את המשתמש צעד אחרי צעד.

**שיפור MCP** — שכבת ידע מעל שרת MCP עובד. אם המשתמשים שלך חיברו Notion, Linear, או Sentry דרך MCP אבל לא יודעים אילו workflows להריץ — Skill של שיפור MCP מספק את שכבת הידע.

### קריטריוני הצלחה לפני ה-build

**כמותיים:** Skill מתעורר על לפחות 90% מהשאילתות הרלוונטיות; מסיים workflow במספר tool calls מוגדר.

**איכותיים:** משתמשים לא צריכים לתקן את Claude באמצע ה-workflow; תוצאות עקביות בין ריצות חוזרות; משתמש חדש מצליח בניסיון הראשון.

---

## הדרישות הטכניות

כאן רוב ה-Skills נכשלים בשקט. הכללים נוקשים, והשגיאות מבלבלות כי Claude פשוט לא יטען Skill שמפר אותם — **ללא הודעת שגיאה**.

### כללי שמות — קריטיים

| כלל | נכון | שגוי |
|---|---|---|
| שם קובץ | `SKILL.md` | `skill.md`, `Skill.md`, `SKILL.MD` |
| שם תיקייה | `kebab-case` בלבד | רווחים, underscores, אותיות גדולות |
| לא לשים | — | `README.md` בתוך תיקיית ה-Skill |
| שמות שמורים | — | לא להכיל "claude" או "anthropic" |
| ב-frontmatter | — | אין תגיות XML עם < > |

### YAML Frontmatter — הפורמט המינימלי

```yaml
---
name: your-skill-name
description: מה זה עושה. השתמש כש... [ביטויים ספציפיים].
---
```

**הפורמט המלא עם כל השדות האופציונליים:**

```yaml
---
name: your-skill-name
description: מה זה עושה ומתי להשתמש. (עד 1024 תווים, ללא תגיות XML)
license: MIT
compatibility: דורש Claude Code עם Python 3.9+ בסביבה.
metadata:
  author: השם שלך
  version: 1.0.0
  mcp-server: שם-השירות
---
```

**חשוב:** `description` יכול להכיל עד **1024 תווים**. זהו השדה הקריטי ביותר — הוא קובע אם Claude יטען את ה-Skill או לא.

---

## כתיבת Skills שעובדים

### נוסחת שדה ה-description

המבנה שמייצר triggering אמין: **[מה זה עושה]** + **[מתי להשתמש]** + **[יכולות מפתח]**.

**תיאורים טובים:**

```yaml
# טוב — משימה ספציפית, ביטויי trigger ספציפיים, סוג קובץ מוזכר
description: מנתח קבצי Figma ומייצר תיעוד handoff למפתחים.
  השתמש כש... קבצי .fig, "design specs", "component documentation",
  או "design-to-code handoff".

# טוב — שירות בשם, שפה ספציפית של trigger
description: מנהל workflows של Linear כולל תכנון sprint, יצירת משימות
  ומעקב סטטוס. השתמש כש... "sprint", "Linear tasks", "project planning",
  או "create tickets".
```

**תיאורים גרועים:**

```yaml
# גרוע — מעורפל, אין תנאי trigger
description: עוזר עם קבצי עיצוב.

# גרוע — אין ביטויי trigger, אין משימה ספציפית
description: Skill לאוטומציה של workflow.
```

### מבנה גוף ההוראות

אחרי ה-frontmatter, כתוב הוראות ב-Markdown:

```markdown
# שם ה-Skill

## הוראות

### שלב 1: [השלב הראשון]
הסבר ברור של מה קורה ולמה.

\`\`\`bash
python scripts/fetch_data.py --project-id PROJECT_ID
\`\`\`

פלט צפוי: [תאר איך נראה הצלחה]

## דוגמאות

### דוגמה 1: [תרחיש נפוץ]
**המשתמש אומר**: "צור Board Deck לרבעון Q3 — מצרף אקסל עם Actuals ו-Budget"
**פעולות:**
קרא את קובץ ה-Excel וחלץ Actuals, Budget, Prior Year
הרץ את scripts/generate_deck.py עם הנתונים
**תוצאה:** קובץ PPTX מוכן עם 8 שקפים + speaker notes לסמנכ"ל

## פתרון בעיות

### שגיאה: [הודעת שגיאה נפוצה]
**סיבה:** [למה זה קורה]
**פתרון:** [איך לתקן שלב אחרי שלב]
```

**ארבעה עקרונות שהופכים הוראות לאמינות:**
- **ספציפיות** — פקודות מדויקות עם פלטים צפויים, לא הנחיות מעורפלות
- **טיפול בשגיאות** — לכל כשל צפוי
- **הפניות ברורות לקבצים** — עם נתיב מדויק
- **Progressive disclosure** — הוראות ליבה ב-SKILL.md, פרטים מורחבים ב-`references/`

---

## Skill עובד מלא — דוגמה מ-A עד Z: FP&A Board Deck

הנה Skill מוכן לייצור שמקצועני פיננסים בונים כדי שסמנכ"ל הכספים יוכל לייצר מצגת Board Deck מוכנה ברגע שמספקים לו נתונים.

**מבנה התיקייה:**

```
fpa-board-deck/
├── SKILL.md
└── references/
    └── slides.md        # תבניות PptxGenJS לכל אחד מ-8 השקפים
```

<details style="
  padding: 1.25rem 1.5rem;
  border: 1px solid rgba(20, 184, 166, 0.2);
  border-radius: 0.75rem;
  background: rgba(20, 184, 166, 0.05);
  cursor: pointer;
  margin: 1.5rem 0;
" onmouseover="this.style.background='rgba(20, 184, 166, 0.1)'; this.style.borderColor='rgba(20, 184, 166, 0.4)';" onmouseout="this.style.background='rgba(20, 184, 166, 0.05)'; this.style.borderColor='rgba(20, 184, 166, 0.2)';">
  <summary style="
    font-weight: 600;
    font-size: 1rem;
    color: rgb(20, 184, 166);
    outline: none;
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
  ">
    📄 SKILL.md — הצג את קוד ה-Skill המלא
    <span style="margin-right: 0.5rem; font-size: 0.85rem;">▼</span>
  </summary>

```yaml
---
name: fpa-board-deck
description: Creates board-ready financial presentations from FP&A data.
  Use when... "board deck", "board presentation", "financial review",
  "quarterly review presentation", "board meeting slides",
  or when financial data (actuals, budget, prior year) is provided.
  Outputs an 8-slide PowerPoint with P&L, revenue deep-dive, KPI dashboard,
  waterfall bridge, risks/opportunities, and outlook.
license: MIT
compatibility: Requires Claude Code with Python 3.9+ and pptxgenjs installed.
metadata:
  author: Ronen Amos CPA
  version: 1.0.0
---

# FP&A Board Deck

## Workflow

### Step 1: Ingest & Validate
Request three required datasets: Actuals, Budget/Plan, Prior Year.
Ask for optional: revenue segments, KPIs list, forward forecast.
Refuse to generate if Actuals or Budget is missing — output an error message.

### Step 2: Generate (8 slides)
1. Title Slide — company name, period, board attribution
2. Executive Summary — 3-5 "what happened → why it matters" bullets
3. P&L Summary — Actuals vs Budget vs Prior Year with variance color-coding
4. Revenue Deep Dive — grouped bar chart by segment + driver commentary
5. Key Metrics Dashboard — 5-8 KPI cards with trend indicators
6. Waterfall Commentary — bridge chart from Budget to Actuals
7. Risks & Opportunities — two-column layout (red/green)
8. Outlook — forecast table + key assumptions

### Step 3: QA
Extract text from generated PPTX and verify every number matches source data.
Flag any variance > 0.1% as a potential rounding error.

## Style Rules
- Color palette "Midnight Executive": navy #1B2A4A, accent blue #3B82F6
- Green #16A34A for favorable variances, red #DC2626 for unfavorable
- Dollar amounts: $X.XM format. Percentages: 1 decimal. Negatives: (parentheses)
- Commentary leads with "so what" — implications first, numbers second
- Max 6 bullets per slide. Every slide includes CFO speaker notes.
```

</details>

**תוצאה לדוגמה:**

![Financial Performance Overview — Board Deck שנוצר על ידי ה-Skill](/images/blog/fpa-board-deck-result-1.png)

---

## בדיקת ה-Skill

Anthropic ממליץ על שלושה סוגי בדיקות:

**1. בדיקות Triggering** — האם ה-Skill נטען כשצריך? האם הוא שקט כשלא צריך?

```
צריך להתעורר:
  "צור Board Deck לישיבת הדירקטוריון של Q3"
  "הכן מצגת סקירה פיננסית מהנתונים המצורפים"
  "quarterly review presentation — הנה ה-actuals מול budget"

לא אמור להתעורר:
  "סכם לי את הדוח השנתי"
  "עזור לי לכתוב מייל לספק"
  "תקן את הנוסחה באקסל הזה"
```

הרץ 10-20 שאילתות וודא שלפחות 90% מפעילות את ה-Skill אוטומטית.

**2. בדיקות איכות תוצאות** — הרץ את אותה בקשה 3-5 פעמים והשווה עקביות. בדוק edge cases: נתונים חסרים (ללא Prior Year), תקופות לא סטנדרטיות (חצי שנה, LTM).

**3. בדיקות Regression** — אחרי כל שינוי ב-frontmatter, הרץ את כל ה-suite מחדש. עריכות בשדה ה-description הן הסיבה הנפוצה ביותר ל-regression.

---

## הפצת ה-Skill

**Claude.ai:** zip את תיקיית ה-Skill ← Settings > Capabilities > Skills ← Upload.

**Claude Code — התקנה גלובלית:**

```bash
mkdir -p ~/.claude/skills
cp -r your-skill-name/ ~/.claude/skills/
```

**Claude Code — התקנה ברמת פרויקט:**

```bash
mkdir -p ./.claude/skills
cp -r your-skill-name/ ./.claude/skills/
```

**רמת ארגון:** אדמינים יכולים לפרוס Skills לכל חברי הארגון — יכולת שהושקה ב-18 בדצמבר 2025. ברגע שנפרס ברמת הארגון, כל instance של Claude של עובד טוען את ה-Skill ללא התקנה אישית.

**GitHub:** שים את ה-README הקריא-לאדם בשורש ה-repo, **לא** בתוך תיקיית ה-Skill. הוראות התקנה:

```bash
/plugin marketplace add your-org/your-repo
/plugin install your-skill-name@your-marketplace-name
```

Anthropic פרסם את Agent Skills כ**סטנדרט פתוח** ב-[agentskills.io](https://agentskills.io/) — הפורמט עובד ב-Claude ובפלטפורמות AI נוספות שאימצו אותו.

---

## שגיאות נפוצות ופתרונות

| בעיה | סיבה סבירה | פתרון |
|---|---|---|
| Skill לא מתעורר אף פעם | description מעורפל, חסרים ביטויי trigger | כתוב מחדש עם שפה ספציפית מול המשתמש |
| Skill מתעורר כל הזמן | description רחב מדי | הוסף תנאי "אל תשתמש כש..." |
| הוראות מתעלמים מהן | הנחיות מעורפלות או סותרות | ספציפיות: פקודות מדויקות, פלטים צפויים |
| MCP calls נכשלים | השרת לא רץ או auth פג | הוסף שלבי reconnection לסעיף פתרון בעיות |
| עובד ב-Claude.ai, נכשל ב-Code | חסרות תלויות סביבה | תעד דרישות בשדה compatibility |
| תוצאות לא עקביות בין ריצות | הוראות גמישות מדי | הוסף checklist איכות + דרוש self-verification |

---

## הצעד הבא — Skills ב-AI Finance Transformation

Skills הם לא רק כלי לצוותי IT. כ-CFO, קונטרולר, או מנהל FP&A — **הידע המקצועי שלך** הוא בדיוק מה שצריך להיות מוטמע ב-Skill. תהליך ה-month-end close, תבניות דוחות, מינוח חשבונאי, סטנדרטים של audit — כל אלה יכולים להפוך ל-Skills שעובדים עבורך בכל שיחה.

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
    הצטרפו למנוי — גישה לכל המדריכים הפיננסיים
  </a>
</div>
