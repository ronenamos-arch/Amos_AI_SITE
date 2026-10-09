---
title: 'המדריך המלא לבניית Skills ב-Claude: מארכיטקטורת תיקיות ועד אוטומציה ארגונית'
date: '2026-06-18'
excerpt: 'Skills של Claude הם הדרך להפוך ידע מקצועי לתהליכים שנטענים אוטומטית בכל שיחה — בלי להעתיק הוראות מחדש. במקום להתחיל כל שיחה מאפס, בונים ארכיטקטורה מודולרית של שלוש שכבות המאפשרת לארגון להטמיע מומחיות ומתודולוגיה קבועה.'
image: '/images/blog/claude-skills-building-guide-header.png'
tags: ["Claude", "Skills", "AI for Finance", "CFO", "אוטומציה", "FP&A", "ארכיטקטורת AI"]
premium: 'true'
---

![המדריך המלא לבניית Skills ב-Claude](/images/blog/claude-skills-building-guide-header.png)

> **תשובה מהירה (Zero-Click Answer):**  
> **Claude Skills** הם ארכיטקטורת תיקיות מודולרית מבוססת קובץ `SKILL.md` ותיקיות עזר, המאפשרת למודל לטעון ידע מקצועי, הנחיות עבודה, סקריפטים ובקרות איכות באופן אוטומטי ומותנה-הקשר (Progressive Disclosure) — מבלי להעמיס טוקנים על חלון ההקשר ומבלי להדביק פרומפטים מחדש בכל שיחה. במקום מודל כללי שמתחיל כל שיחה מאפס, Skill מטמיע את נהלי העבודה, מבנה הנתונים וחוקי העסק של הארגון ישירות בסביבת ה-AI (באפליקציית Claude.ai, ב-Claude Code ובפריסה ארגונית רחבה), ומבטיח תוצרים עקביים, מבוקרים וחסכוניים בעלויות שימוש.

---

כל מי שעובד עם מודלי שפה על בסיס יומיומי מכיר היטב את "מס ההקמה" הכבד: פותחים שיחה חדשה עם Claude — ומתחילים הכל מאפס. הפורמט המועדף על ההנהלה, סגנון הכתיבה של הצוות, המינוח המקצועי המדויק, מבנה החשבונות וסטנדרטי האיכות — הכל נעלם. אתם מוצאים את עצמכם מבזבזים דקות ארוכות בכל בוקר על שחזור הקשר שכבר הסברתם אתמול.

לפרויקט חד-פעמי — אפשר לחיות עם זה. אבל עבור עבודה מקצועית שוטפת במחלקת כספים או בארגון טכנולוגי — זהו בזבוז משאבים משווע שמונע סקיילינג אמיתי.

בקהילת **AI Finance Transformation של רונן עמוס**, אנחנו מלמדים עיקרון יסוד: **אל תנהלו שיחות עם AI — תבנו מערכות**.

**Claude Skills הם הפתרון המבני לבעיה הזו.** Skill הוא תיקייה מובנית המכילה הוראות, תבניות וקוד, אותה אתם בונים פעם אחת בלבד. Claude טוען את המיומנות הזו באופן אוטונומי ברגע שהשיחה עוסקת בנושא המתאים. הידע המקצועי, תהליכי העבודה (Workflows) והבקרות מוטמעים במערכת לצמיתות.

מאז השקתם כסטנדרט פתוח ב-[agentskills.io](https://agentskills.io/), מאגר ה-Skills הרשמי של Anthropic ב-**[github.com/anthropics/skills](https://github.com/anthropics/skills)** חצה 141,000 כוכבים ואלפי ארגונים אימצו אותו כארכיטקטורת האוטומציה המרכזית שלהם.

---

## צפו במדריך המעשי: בניית Skills ב-Claude שלב-אחר-שלב

לפני שנצלול לקרביים הטכניים של הארכיטקטורה, הכנתי עבורכם מדריך וידאו מעשי שמדגים את תהליך ההקמה בפועל:

<div style="background: #0f172a; border: 1px solid #1e293b; border-radius: 1rem; padding: 1.5rem; margin: 2rem 0; box-shadow: 0 8px 30px rgba(0,0,0,0.35);">
  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <span style="background: #ef4444; color: #ffffff; font-weight: 800; font-size: 0.8rem; padding: 0.25rem 0.65rem; border-radius: 9999px;">VIDEO</span>
      <span style="color: #f8fafc; font-weight: 700; font-size: 1.05rem;">מדריך וידאו מעשי: בניית Skills ב-Claude שלב-אחר-שלב</span>
    </div>
    <span style="color: #94a3b8; font-size: 0.85rem;">צפייה ישירה (16:9)</span>
  </div>

  <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 0.65rem; border: 1px solid #334155; background: #000000;">
    <iframe src="https://www.youtube.com/embed/opfuy7WrmFE" title="מדריך מעשי לבניית Skills ב-Claude" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  </div>

  <p style="color: #94a3b8; font-size: 0.88rem; margin: 0.85rem 0 0 0; line-height: 1.5;">
    בסרטון נדגים כיצד לפתוח את תיקיית ה-Skill, לנסח את קובץ ה-`SKILL.md`, להגדיר את תנאי ההפעלה האוטומטיים (Triggers), ולהריץ תהליך אוטומציה שלם מקצה לקצה.
  </p>
</div>

---

## הארכיטקטורה השלמה: מהגדרת קוד ועד לתוצר הנהלה

![תהליך העבודה השלם: מהגדרת קוד ועד לתוצר הנהלה](/images/blog/claude-skills-building-guide-diagram.png)

כפי שמומחש בתרשים הארכיטקטורה, תהליך העבודה של Skill מורכב משלושה מרכיבים עיקריים:
1. **ארכיטקטורה וקוד (Repository & Definitions):** קובץ `SKILL.md` המגדיר חוקי ביצוע, תיקיות `references/` לידע עמוק, וסקריפטים לאוטומציה.
2. **מוח הבינה המלאכותית (Intelligent AI Processor):** מודל ה-AI קורא את ההוראות, מאמת את הנתונים ומבצע את העבודה ב-Reasoning מבוקר וללא הזיות.
3. **תוצר הנהלה מוכן (Business Value):** הפקת תוצר עסקי סופי באיכות הגבוהה ביותר — בין אם מדובר במצגת דירקטוריון (Board Deck), דוח כספי מנותח או [דוח נסיעות מבוקר לעובדים](/blog/ai-employee-travel-report-skill).

---

## מה זה בעצם Skill? (המבנה הטכני הפשוט)

מבחינה טכנית, Skill אינו מודל חדש, אינו תוסף בתשלום ואינו קוד מסובך. Skill הוא פשוט **תיקייה בעלת מבנה מוגדר**:

```text
your-skill-name/
├── SKILL.md              # חובה — קובץ ה-Skill הראשי עם ההוראות וה-Frontmatter
├── scripts/              # אופציונלי — סקריפטים להרצה (Python, Bash, JS)
│   ├── process_data.py
│   └── validate_financials.py
├── references/           # אופציונלי — מסמכי עזר, מתודולוגיה ותיעוד שנטענים לפי צורך
│   ├── accounting_standards.md
│   └── presentation_guidelines.md
└── assets/               # אופציונלי — תבניות קבצים, סגנונות וסמלילים
    └── board_deck_template.pptx
```

### מערכת שלוש השכבות (Progressive Disclosure)

הסוד של Claude Skills נעוץ במנגנון החשיפה המדורגת (**Progressive Disclosure**). במקום להעמיס את כל הוראות העבודה על המודל ולבזבז עשרות אלפי טוקנים בכל שיחה (שגם מייקרים עלויות וגם פוגעים בדיוק, כפי שהסברנו במדריך על [צמצום צריכת Tokens](/blog/ai-token-optimization-finance)), Claude מחלק את הידע ל-3 שכבות:

<div style="background: #0f172a; border: 1px solid #1e293b; border-radius: 0.75rem; padding: 1.25rem; margin: 1.5rem 0;">
<table style="width: 100%; border-collapse: collapse; color: #cbd5e1; font-size: 0.95rem;">
  <thead>
    <tr style="border-bottom: 2px solid #334155; text-align: right;">
      <th style="padding: 0.6rem; color: #5eead4;">שכבה</th>
      <th style="padding: 0.6rem; color: #5eead4;">מה נטען במודל</th>
      <th style="padding: 0.6rem; color: #5eead4;">מתי זה נטען?</th>
      <th style="padding: 0.6rem; color: #5eead4;">עלות טוקנים</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid #1e293b;">
      <td style="padding: 0.6rem; font-weight: bold; color: #f8fafc;">1. YAML Frontmatter</td>
      <td style="padding: 0.6rem;">שם ה-Skill ושדה ה-Description בלבד</td>
      <td style="padding: 0.6rem; color: #38bdf8;">תמיד — בכל שיחה ושיחה</td>
      <td style="padding: 0.6rem; color: #4ade80;">זניחה (~100 טוקנים)</td>
    </tr>
    <tr style="border-bottom: 1px solid #1e293b;">
      <td style="padding: 0.6rem; font-weight: bold; color: #f8fafc;">2. גוף ה-SKILL.md</td>
      <td style="padding: 0.6rem;">מתודולוגיית העבודה וחוקי הברזל</td>
      <td style="padding: 0.6rem; color: #facc15;">רק כאשר השאילתה מתאימה ל-Trigger</td>
      <td style="padding: 0.6rem;">לפי גודל ההנחיות</td>
    </tr>
    <tr>
      <td style="padding: 0.6rem; font-weight: bold; color: #f8fafc;">3. תיקיית references/</td>
      <td style="padding: 0.6rem;">מדריכים מעמיקים, קוד ותבניות</td>
      <td style="padding: 0.6rem; color: #f43f5e;">רק כשהמשימה הספציפית דורשת זאת</td>
      <td style="padding: 0.6rem;">קריאה נקודתית בלבד</td>
    </tr>
  </tbody>
</table>
</div>

**המשמעות הכלכלית והביצועית:** ארגון יכול להחזיק ספרייה של 50 Skills שונים במחשבי העובדים, מבלי שסביבת העבודה תסבול מאיטיות או מניפוח חשבון ה-API.

---

### מה ההבדל בין Skill לבין MCP (Model Context Protocol)?

שאלה שעולה תדיר בקרב מנהלי טכנולוגיה ו-CFOs: *"אם חיברנו שרת MCP למערכת ה-ERP או ל-Salesforce, לשם מה נחוצים Skills?"*

<div style="background: #0f172a; border: 1px solid #1e293b; border-radius: 0.85rem; padding: 1.5rem; margin: 1.5rem 0; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
<h3 style="color: #38bdf8; margin-top: 0; font-size: 1.25rem; display: flex; align-items: center; gap: 0.5rem;">
  <span>🍽️</span>
  <span>אנלוגיית המטבח: MCP מול Skills</span>
</h3>

<ul style="margin-bottom: 0; padding-right: 1.25rem; color: #cbd5e1; line-height: 1.8;">
  <li style="margin-bottom: 0.75rem;"><strong style="color: #f8fafc;">שרת MCP הוא המטבח המקצועי:</strong> הוא מספק את התשתית, את כלי העבודה ואת הגישה למקרר — חיבור למאגרי נתונים, גישה ל-APIs והרשאות קריאה וכתיבה. MCP אומר ל-Claude <em>מה הוא יכול לעשות</em>.</li>
  <li style="margin-bottom: 0;"><strong style="color: #f8fafc;">Skill הוא ספר המתכונים של השף:</strong> הוא מגדיר את סדר הפעולות, את המינונים, את בקרת האיכות ואת שלבי הבדיקה. Skill אומר ל-Claude <em>איך להכין מנה ברמת כוכב מישלן</em>.</li>
</ul>
</div>

ללא Skill, חיבור MCP נשאר צינור טכני בלבד. עובד יכול לשלוף נתונים, אך המודל עלול לפרש אותם באופן שגוי או לחשב מדדים בלי להכיר את מדיניות החברה (קראו עוד על [בקרות בינה מלאכותית וממשל תאגידי](/blog/ai-governance-finance)).

---

<!-- teaser -->
<div style="background: linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.98) 100%); border: 2px solid #14b8a6; border-radius: 1rem; padding: 2rem 2.25rem; margin: 2.5rem 0; box-shadow: 0 12px 35px rgba(20, 184, 166, 0.2);">
<div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
  <span style="background: #14b8a6; color: #042f2e; font-weight: 900; font-size: 0.85rem; padding: 0.35rem 0.85rem; border-radius: 9999px; letter-spacing: 0.5px;">⚡ ארכיטקטורת פרודקשן למנהלי כספים</span>
  <span style="color: #5eead4; font-weight: 700; font-size: 0.9rem;">🔒 תוכן פרימיום בלעדי למנויי AI Finance Pro</span>
</div>

<h3 style="color: #ffffff; font-size: 1.35rem; font-weight: 900; margin: 0.5rem 0 1rem 0; line-height: 1.4;">
רוצים לבנות Skills שעובדים בארגון בלי שגיאות שקטות ובלי התרסקויות?
</h3>

<p style="color: #cbd5e1; font-size: 1rem; line-height: 1.7; margin-bottom: 1.25rem;">
רוב ה-Skills נכשלים בשקט בגלל כללי תחביר נוקשים של שמות קבצים וניסוח שגוי של ה-Frontmatter. בחלק המלא של המדריך פירטנו את כל מה שדרוש להטמעה מבצעית מלאה:
</p>

<div style="display: grid; grid-template-columns: 1fr; gap: 0.75rem; margin-bottom: 1.5rem;">
  <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(20, 184, 166, 0.3); border-radius: 0.5rem; padding: 0.85rem 1rem; color: #e2e8f0; font-size: 0.95rem; line-height: 1.6;">
    📐 <strong style="color: #5eead4;">חוקי הברזל למניעת כשלים שקטים:</strong> אותיות קטנות (kebab-case), מניעת תגיות XML, ואיסור מוחלט על שמות שמורים.
  </div>
  <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(20, 184, 166, 0.3); border-radius: 0.5rem; padding: 0.85rem 1rem; color: #e2e8f0; font-size: 0.95rem; line-height: 1.6;">
    📋 <strong style="color: #5eead4;">קוד Skill מלא להעתקה (FP&A Board Deck):</strong> פרויקט מוכן של 8 שקפי הנהלה, אימות Actuals מול Budget, ובקרת סטיות.
  </div>
  <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(20, 184, 166, 0.3); border-radius: 0.5rem; padding: 0.85rem 1rem; color: #e2e8f0; font-size: 0.95rem; line-height: 1.6;">
    🧪 <strong style="color: #5eead4;">חבילת בדיקות איכות (Triggering, QA & Regression):</strong> מתודולוגיה לבדיקת דיוק הפעלה מעל 90%.
  </div>
  <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(20, 184, 166, 0.3); border-radius: 0.5rem; padding: 0.85rem 1rem; color: #e2e8f0; font-size: 0.95rem; line-height: 1.6;">
    🏢 <strong style="color: #5eead4;">פריסה ארגונית מרוכזת (Enterprise Deployment):</strong> הפצה מרכזית לכל עובדי הארגון ב-Claude Code וב-Claude.ai.
  </div>
</div>

<p style="color: #94a3b8; font-size: 0.9rem; margin: 0; font-style: italic;">
המשך המדריך זמין מיידית למנויי ספריית התוכן והקהילה של AI Finance Transformation.
</p>
</div>
<!-- /teaser -->

<!-- paywall -->

---

## הדרישות הטכניות: איפה רוב ה-Skills נכשלים בשקט?

כאן רוב המפתחים ומנהלי האוטומציה נתקעים: מנוע ה-Skills של Anthropic נוקשה ביותר. כאשר ישנה חריגה מחוקי התחביר, **המודל אינו פולט שגיאה — הוא פשוט מתעלם מקיומו של ה-Skill**.

<div style="background: #0f172a; border: 1px solid #1e293b; border-radius: 0.75rem; padding: 1.25rem; margin: 1.5rem 0;">
<table style="width: 100%; border-collapse: collapse; color: #cbd5e1; font-size: 0.95rem;">
  <thead>
    <tr style="border-bottom: 2px solid #334155; text-align: right;">
      <th style="padding: 0.6rem; color: #5eead4;">כלל טכני</th>
      <th style="padding: 0.6rem; color: #5eead4;">פורמט נכון ✓</th>
      <th style="padding: 0.6rem; color: #5eead4;">פורמט שגוי ✗</th>
      <th style="padding: 0.6rem; color: #5eead4;">השלכה בעת שגיאה</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid #1e293b;">
      <td style="padding: 0.6rem; font-weight: bold; color: #f8fafc;">שם קובץ ההוראות</td>
      <td style="padding: 0.6rem; color: #4ade80;"><code>SKILL.md</code> (אותיות גדולות בלבד)</td>
      <td style="padding: 0.6rem; color: #f43f5e;"><code>skill.md</code>, <code>Skill.md</code></td>
      <td style="padding: 0.6rem; color: #94a3b8;">הקובץ אינו מזוהה</td>
    </tr>
    <tr style="border-bottom: 1px solid #1e293b;">
      <td style="padding: 0.6rem; font-weight: bold; color: #f8fafc;">שם התיקייה</td>
      <td style="padding: 0.6rem; color: #4ade80;"><code>kebab-case</code> (למשל: <code>fpa-board-deck</code>)</td>
      <td style="padding: 0.6rem; color: #f43f5e;">רווחים, אותיות גדולות או מקף תחתון <code>_</code></td>
      <td style="padding: 0.6rem; color: #94a3b8;">כשל בטעינה</td>
    </tr>
    <tr style="border-bottom: 1px solid #1e293b;">
      <td style="padding: 0.6rem; font-weight: bold; color: #f8fafc;">קבצים אסורים</td>
      <td style="padding: 0.6rem; color: #4ade80;">הסבר ב-<code>SKILL.md</code> או בשורש ה-repo</td>
      <td style="padding: 0.6rem; color: #f43f5e;"><code>README.md</code> בתוך תיקיית ה-Skill</td>
      <td style="padding: 0.6rem; color: #94a3b8;">התנגשות בהקשר</td>
    </tr>
    <tr style="border-bottom: 1px solid #1e293b;">
      <td style="padding: 0.6rem; font-weight: bold; color: #f8fafc;">שמות שמורים</td>
      <td style="padding: 0.6rem; color: #4ade80;">שם ספציפי של הדומיין (<code>variance-review</code>)</td>
      <td style="padding: 0.6rem; color: #f43f5e;">שימוש במילים "claude" או "anthropic"</td>
      <td style="padding: 0.6rem; color: #94a3b8;">חסימת רישום מובנית</td>
    </tr>
    <tr>
      <td style="padding: 0.6rem; font-weight: bold; color: #f8fafc;">תוכן ב-Frontmatter</td>
      <td style="padding: 0.6rem; color: #4ade80;">טקסט פשוט בעברית או באנגלית ללא תגיות</td>
      <td style="padding: 0.6rem; color: #f43f5e;">תגיות XML עם <code>&lt; &gt;</code></td>
      <td style="padding: 0.6rem; color: #94a3b8;">שגיאת Parsing של ה-YAML</td>
    </tr>
  </tbody>
</table>
</div>

---

## ניסוח ה-Frontmatter: נוסחת ה-Triggering המושלמת

שדה ה-`description` ב-YAML Frontmatter הוא **הקריטי ביותר בכל המערכת**. זהו החלק היחיד שנטען בכל שיחה, והוא שקובע האם Claude יעיר את ה-Skill משנתו או יתעלם ממנו:

```yaml
---
name: your-skill-name
description: [מה זה עושה] + [מתי להשתמש וביטויי מפתח] + [מה אסור לעשות].
license: MIT
compatibility: דורש Claude Code עם סביבת Python 3.9+.
metadata:
  author: Ronen Amos CPA
  version: 1.0.0
---
```

> **כלל זהב לניסוח `description`:**  
> כללו תמיד שמות קבצים ספציפיים (`.xlsx`, `.csv`), מונחים מקצועיים של המשתמש ("board deck", "התאמת בנק", "ניתוח סטיות"), ורשימת ביטויים של מתי **לא** להשתמש במיומנות — כדי למנוע הפעלות שווא (False Positives).

---

## פרויקט מלא להעתקה: FP&A Board Deck Generator

להלן הגדרת Skill מבצעית מלאה, המיועדת למנהלי כספים, חשבים וצוותי FP&A. ה-Skill קולט נתוני אקסל (Actuals מול Budget מול שנה קודמת), ומפיק מצגת דירקטוריון מלאה בת 8 שקפים עם הערות דובר (Speaker Notes) לסמנכ"ל הכספים.

<details style="margin: 2rem 0; padding: 1.25rem 1.5rem; border-radius: 0.85rem; border: 1.5px solid #0d9488; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); box-shadow: 0 4px 20px rgba(13, 148, 136, 0.15);">
<summary style="cursor: pointer; font-weight: 700; color: #2dd4bf; font-size: 1.05rem; outline: none; margin-bottom: 0.75rem; display: flex; align-items: center; justify-content: space-between;">
  <span>👉 לחצו כאן לצפייה בקוד ה-Skill המלא (SKILL.md)</span>
  <span style="background: rgba(13, 148, 136, 0.2); color: #5eead4; border: 1px solid #0d9488; font-size: 0.78rem; font-weight: 700; padding: 0.25rem 0.75rem; border-radius: 9999px;">CLAUDE SKILL SPEC</span>
</summary>

<div style="position: relative; background: #000000; border-radius: 0.5rem; border: 1px solid #334155; margin-top: 0.75rem; overflow: hidden;">
<div style="display: flex; justify-content: space-between; align-items: center; background: #18181b; padding: 0.5rem 1rem; border-bottom: 1px solid #27272a;">
<span style="font-size: 0.8rem; color: #a1a1aa; font-family: ui-monospace, monospace; font-weight: 500;">fpa-board-deck / SKILL.md</span>
<button onclick="const t = this.closest('div').parentElement.querySelector('pre').innerText; navigator.clipboard.writeText(t); this.innerText = '✓ הועתק!'; this.style.color = '#10b981'; setTimeout(() => { this.innerText = '📋 העתק קוד'; this.style.color = '#e4e4e7'; }, 2000);" style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); color: #e4e4e7; padding: 0.3rem 0.75rem; border-radius: 0.375rem; font-size: 0.8rem; cursor: pointer; transition: all 0.2s; font-family: system-ui, sans-serif; display: flex; align-items: center; gap: 0.35rem;">📋 העתק קוד</button>
</div>
<pre style="color: #ffffff; padding: 1.25rem; margin: 0; overflow-x: auto; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 0.9rem; line-height: 1.6; direction: ltr; text-align: left; white-space: pre-wrap; background: transparent; border: none;">
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

# FP&A Board Deck Generator

## Purpose & Boundaries
Generate an 8-slide executive board presentation from verified corporate financial records.
Refuse generation if source actuals or approved budget datasets are missing or contradictory.
Do not invent narrative drivers; flag unverified fluctuations for human CFO review.

## Workflow

### Step 1: Ingest & Validate Financial Sources
1. Request and verify three mandatory data sources:
   - Current Period Actuals (P&L line items)
   - Board-Approved Budget / Plan
   - Prior Year Comparative Period (YoY)
2. Verify mathematical reconciliation across all sheets. If rounding variances exceed 0.1%, halt and flag discrepancies.

### Step 2: Executive Slide Structure (8 Slides)
1. Slide 1 - Title: Corporate Identity, Reporting Period, Executive Attribution.
2. Slide 2 - Executive Summary: 3-5 macro takeaways answering "What happened and why it matters".
3. Slide 3 - P&L Financial Performance: Actuals vs. Budget vs. Prior Year with variance highlights.
4. Slide 4 - Revenue Segmentation: Segment analysis with volume/mix drivers.
5. Slide 5 - Strategic KPI Dashboard: 6 metric cards (ARR, Net Margin, CAC, Burn Rate, Runway, Rule of 40).
6. Slide 6 - Profitability Waterfall: Budget-to-Actual variance bridge.
7. Slide 7 - Risk Matrix & Strategic Opportunities: Balanced two-column breakdown.
8. Slide 8 - Rolling Forecast & Outlook: 12-month projection with core assumptions.

### Step 3: Quality Assurance & CFO Speaker Notes
- Every slide must include structured speaker notes in Hebrew/English for executive presentation.
- Color formatting standards: Favorable variance #16A34A (Green), Unfavorable #DC2626 (Red).
- Currency presentation: Formatted in thousands/millions with consistent currency symbols (₪ / $).
- Label output: "DRAFT FOR CFO & AUDIT REVIEW — NOT FINALIZED".
</pre>
</div>
</details>

---

## פרומפט מוכן להרצה ישירה בצ'אט (Quick-Start Prompt)

אם אינכם עובדים עדיין בסביבת Skills מקומית וברצונכם להריץ בדיקה מיידית ב-Claude.ai או ב-ChatGPT, השתמשו בפרומפט הבא המכיל את כל הגבולות החשבונאיים:

<details style="margin: 2rem 0; padding: 1.25rem 1.5rem; border-radius: 0.85rem; border: 1.5px solid #0284c7; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); box-shadow: 0 4px 20px rgba(2, 132, 199, 0.15);">
<summary style="cursor: pointer; font-weight: 700; color: #38bdf8; font-size: 1.05rem; outline: none; margin-bottom: 0.75rem; display: flex; align-items: center; justify-content: space-between;">
  <span>👉 לחצו כאן לצפייה בפרומפט להרצה מהירה בצ'אט</span>
  <span style="background: rgba(2, 132, 199, 0.2); color: #38bdf8; border: 1px solid #0284c7; font-size: 0.78rem; font-weight: 700; padding: 0.25rem 0.75rem; border-radius: 9999px;">CHAT PROMPT</span>
</summary>

<div style="position: relative; background: #000000; border-radius: 0.5rem; border: 1px solid #334155; margin-top: 0.75rem; overflow: hidden;">
<div style="display: flex; justify-content: space-between; align-items: center; background: #18181b; padding: 0.5rem 1rem; border-bottom: 1px solid #27272a;">
<span style="font-size: 0.8rem; color: #a1a1aa; font-family: ui-monospace, monospace; font-weight: 500;">FP&A BOARD DECK CHAT PROMPT</span>
<button onclick="const t = this.closest('div').parentElement.querySelector('pre').innerText; navigator.clipboard.writeText(t); this.innerText = '✓ הועתק!'; this.style.color = '#10b981'; setTimeout(() => { this.innerText = '📋 העתק פרומפט'; this.style.color = '#e4e4e7'; }, 2000);" style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); color: #e4e4e7; padding: 0.3rem 0.75rem; border-radius: 0.375rem; font-size: 0.8rem; cursor: pointer; transition: all 0.2s; font-family: system-ui, sans-serif; display: flex; align-items: center; gap: 0.35rem;">📋 העתק פרומפט</button>
</div>
<pre style="color: #ffffff; padding: 1.25rem; margin: 0; overflow-x: auto; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 0.9rem; line-height: 1.6; direction: ltr; text-align: left; white-space: pre-wrap; background: transparent; border: none;">
פעל כארכיטקט FP&A ויועץ AI בכיר להכנת מצגת דירקטוריון (Board Deck) מנתונים פיננסיים.

הנתונים המצורפים:
1. דוח ביצוע בפועל (Actuals) לתקופה המדווחת.
2. תקציב מאושר (Budget).
3. נתוני השוואה לשנה קודמת (Prior Year).

הנחיות עבודה קשיחות לבקרה פיננסית:
1. בצע אימות נתונים מקדים: ודא שאין פערי סיכום או סתירות מתמטיות מעל 0.1%.
2. אל תמציא סיבות עסקיות לסטיות: אם סיבת הסטייה אינה מופיעה בהערות, סמן אותה כ"דורשת בירור מול מנהל היחידה העסקית".
3. בנה מבנה שקפים מקצועי בן 8 שקפים: תקציר מנהלים, דוח רווח והפסד השוואתי, פילוח הכנסות, לוח מדדי מפתח (KPIs), גשר סטיות (Waterfall), סיכונים והזדמנויות, ותחזית קדימה.
4. הוסף עבור כל שקף הערות דובר (Speaker Notes) מפורטות בעברית לסמנכ"ל הכספים.
5. סמן בראש המסמך: "טיוטת עבודה לבדיקה ואישור של סמנכ"ל הכספים".
</pre>
</div>
</details>

---

## מתודולוגיית בדיקות איכות (Acceptance & Regression Testing)

לפני שמשחררים Skill לשימוש נרחב בצוות, יש להריץ עליו חבילת בדיקות שיטתית:

1. **בדיקת Triggering (הפעלה אוטונומית):** הריצו 10 בקשות רלוונטיות (למשל: *"צור מצגת לישיבת הדירקטוריון"* או *"מצורף אקסל ביצוע מול תקציב"*) ו-10 בקשות לא רלוונטיות (*"תקן נוסחה באקסל"*, *"נסח מייל לקוח"*). ודאו שה-Skill מתעורר בלפחות 90% מהבקשות הרלוונטיות ונשאר רדום בשאר.
2. **בדיקת עקביות (Output Consistency):** הריצו את אותה משימה 3 פעמים עם פרמטרי חשיבה שונים (קראו עוד על [בחירת מודל ומאמץ חשיבה ב-Claude Code](/blog/model-veeffort-claude-code)) ובדקו שמבנה השקפים והחישובים נשמרים בעקביות מלאה.
3. **בדיקת Regression (נסיגת ביצועים):** בכל עדכון עתידי של קובץ ה-`SKILL.md`, הריצו מחדש את מבחני הקבצה כדי לוודא שתוספת חוק חדש לא שברה את יכולת ההפעלה האוטומטית.

---

## הפצה והטמעה ארגונית (Enterprise Deployment)

Anthropic מאפשרת להפיץ Skills במספר ערוצים מקבילים:

* **אפליקציית Claude.ai:** מכווצים את תיקיית ה-Skill לקובץ ZIP, נכנסים ל-`Settings > Capabilities > Skills` ומעלים את הקובץ.
* **התקנה גלובלית ב-Claude Code:**
  ```bash
  mkdir -p ~/.claude/skills
  cp -r fpa-board-deck/ ~/.claude/skills/
  ```
* **התקנה ברמת הפרויקט (Project Scope):**
  ```bash
  mkdir -p ./.claude/skills
  cp -r fpa-board-deck/ ./.claude/skills/
  ```
* **פריסה ארגונית מרכזית (Enterprise Org-Level):** מנהלי מערכת (Admins) ב-Claude Enterprise יכולים לפרוס תיקיית Skills לכלל עובדי הארגון במרוכז דרך לוח הניהול. ברגע שה-Skill נפרס ברמת הארגון, כל עובד מקבל את היכולת מיידית ללא צורך בהתקנה מקומית.

---

## שאלות נפוצות (FAQ)

### האם Claude Skills דורשים ידע בתכנות כדי לבנות אותם?
ממש לא. כפי שראיתם, קובץ ה-`SKILL.md` נכתב בשפת Markdown פשוטה וטקסט חופשי. הידע החשוב ביותר הוא המתודולוגיה וההבנה החשבונאית שלכם, ולא שורות קוד.

### האם הנתונים המועלים ל-Skill משמשים לאימון מודלים של Anthropic?
במסלולי Claude Pro, Team ו-Enterprise, Anthropic מתחייבת מפורשות שנתוני המשתמשים ושיחותיהם אינם משמשים לאימון מודלים. מומלץ לקרוא את המדריך המלא שלנו על [ממשל תאגידי ובקרת AI במחלקת כספים](/blog/ai-governance-finance).

### מה קורה אם שרת ה-MCP מתנתק באמצע הפעלת ה-Skill?
ה-Skill יזהה שהכלי אינו זמין ויציג הודעת שגיאה מובנית המבקשת מהמשתמש לבדוק את החיבור, מבלי להמציא נתונים פיקטיביים.

---

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

---

### לבנות תהליכי AI אוטונומיים במחלקת הכספים
בקהילת **AI Finance Transformation של רונן עמוס** אנו מלווים מנהלי כספים, חשבים וצוותי FP&A בבניית תהליכי עבודה אוטונומיים, מבוקרים ומאובטחים — מבניית Skills מותאמים אישית ועד אוטומציה של סגירת חודש ותחזיות תזרים.

* 💬 **[הצטרפו לקהילת הוואטסאפ של AI Finance Transformation](https://chat.whatsapp.com/CS6dgqnK45Q9XAMqScNr6R)** לדיונים, תבניות ושיתוף מתודולוגיות עם מובילי כספים בישראל.
* 🎓 **[קורסי AI פיננסי מעשיים](/courses/ai-mastery):** הכשרה מעמיקה לצוותי כספים לבניית סוכנים, Skills ואוטומציות ללא צורך בידע מוקדם בתכנות.
* 💼 **[שירותי ייעוץ והטמעת AI בארגונים](/services):** ליווי אישי של רונן עמוס רו"ח בבניית בקרות, ארכיטקטורת נתונים והטמעת כלי AI בסביבת העבודה הארגונית.
* 📊 **[קראו עוד על הטמעת AI במחלקת כספים מבקרה ועד ROI](/blog/ai-finance-implementation)** לקבלת תמונת המצב המלאה על מהפכת ה-AI בעולם הכספים.
