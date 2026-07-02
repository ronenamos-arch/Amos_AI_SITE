---
title: "Context File: איך לבנות 'תיק היכרות' שהופך כל AI לאנליסט פיננסי שמכיר את העסק שלך"
date: "2026-06-23"
excerpt: "איך בונים מסמך Context אחד שמלמד כל AI — Claude, ChatGPT, Copilot — להכיר את העסק שלכם, ומונע מהמודל להמציא מספרים"
image: "/images/blog/context-file-ai-finance-1.png"
tags: ["AI", "FP&A", "Context Engineering"]
premium: "false"
---

![תמונת header למאמר על Context File](/images/blog/context-file.png)

# Context File: איך לבנות "תיק היכרות" שהופך כל AI לאנליסט פיננסי שמכיר את העסק שלך

תארו לעצמכם שאתם מגייסים אנליסט FP&A חדש. ביום הראשון אתם לא נותנים לו גישה לדוחות ומבקשים תשובות. אתם מתחילים בהסברה: מה החברה עושה, איך היא מרוויחה כסף, מה ה-Chart of Accounts, מי מאשר הוצאות, מה המשמעות של כל KPI, ואילו חריגות חשוב להכיר.

בעבודה עם AI — ChatGPT, Claude, Copilot, או כל מודל אחר — קורה משהו דומה, אבל בלי השלב הזה. אנחנו מצפים מהמודל להבין הכל מההקשר של שאלה בודדת, ואז מתפלאים כשהתשובה לא מדויקת.

הפתרון הוא **Context File**: מסמך אחד שמכיל את כל הידע הזה, ושמתפקד כ"תיק היכרות" קבוע שאפשר לחבר לכל AI שתבחרו לעבוד איתו.

## למה בלי Context, ה-AI סתם מנחש

נניח ששואלים מודל AI:

*"Analyze our gross margin decline"*

בלי הקשר, המודל לא יודע:
- מה ה-Gross Margin אצלכם בפועל
- האם עלויות Freight נכנסות ל-COGS
- האם יש הבדלים בין מדינות או קווי מוצר

אז הוא ימציא הנחות — וזה המקום שבו רוב ה-Hallucinations הפיננסיות נולדות.

עם Context File, המודל כבר יודע:

```
Gross Margin =
Revenue minus COGS
COGS includes: Freight Costs
COGS excludes: Support Costs
```

ופתאום התשובה מדויקת, כי היא מבוססת על ההגדרות שלכם — לא על הנחות גנריות.

## שלב 1: איפה הידע הארגוני מתחבא

הידע שצריך בתוך ה-Context File לא נמצא במקום אחד. הוא מפוזר בארבעה מקורות עיקריים:

**מסמכים** — SOP, נהלים, מצגות הנהלה, חומרי Onboarding.

**פגישות** — Zoom, Teams, Meet. שם נמצאות ההחלטות האמיתיות שלעולם לא הגיעו למסמך רשמי.

**Excel, Word ו-Drive** — הרבה מהחוקים העסקיים בפועל לא נכתבו בנוהל מסודר. הם חיים בקבצי Excel מבוזרים, מסמכי Word ישנים, ותיקיות Drive שרק אנשים מסוימים יודעים לנווט בהן.

**המערכות** — ERP, מערכת הנהלת חשבונות, CRM, Payroll, Billing. כל מערכת מחזיקה חלק מהפאזל.

האתגר האמיתי הוא לא לכתוב Context File — הוא לאסוף את הידע הזה ממקורות מבוזרים ולא מתועדים.

[תמונה 2: דיאגרמה המציגה את ארבעת מקורות הידע הארגוני (מסמכים, פגישות, Excel/Word/Drive, מערכות) מתכנסים לתוך Context File אחד (finance_context.md), שמתחבר משם לכלי AI שונים — Claude, ChatGPT Projects, NotebookLM/Copilot]

## שלב 2: 16 השכבות שמרכיבות Context מלא

לאחר איסוף הידע, בונים מסמך מבני בשם `finance_context.md` או `company_context.md`. הוא מחולק ל-16 שכבות, שאפשר לקבץ לשש קבוצות לוגיות:

**זהות החברה (Foundation)**
- *Company Overview* — שם, תעשייה, מדינה, מודל עסקי, מטבע, שנת כספים
- *Strategic Context* — מה קורה בחברה כרגע, אירועים קרובים
- *Glossary* — מילון מושגים פנימי (למשל: Client, Lead, MRR, CAC)

**איך החברה פועלת (Rules)**
- *Business Rules* — חוקים תפעוליים כמו תדירות הפקת חשבוניות, שיעור מע"מ, סף אישור הוצאות
- *Departments* — מבנה אגפים (כספים, מכירות, שיווק, תפעול)

**איך הכסף זורם (Finance)**
- *Revenue Model* — מקורות ההכנסה
- *Cost Structure* — מבנה ההוצאות
- *Chart of Accounts* — אחת השכבות הקריטיות ביותר; בלי קוד חשבונות מדויק, כל ניתוח פיננסי באוויר
- *KPIs* — המדדים החשובים (Revenue, Gross Margin, Net Profit, Cash Balance)

**איך הנתונים בנויים (Data)**
- *Systems* — אילו מערכות בשימוש (QuickBooks, Airtable, HubSpot וכו')
- *Data Sources* — מאיפה כל נתון מגיע בפועל (הכנסות מ-QuickBooks, לידים מ-HubSpot, מזומן מתדפיסי בנק)
- *Reporting Logic* — תדירות ומבנה הדוחות (P&L חודשי, Cash Flow שבועי, תחזית רבעונית)

**איך מקבלים החלטות (Decision Making)**
- *Known Issues* — חריגות שחשוב שה-AI ידע (למשל: ינואר כולל חידושי תוכנה שנתיים)
- *Forecast Assumptions* — שיעורי צמיחה, שער חליפין
- *Decision Framework* — סדר עדיפויות (Cash Preservation → Profitability → Growth)

**איך ה-AI צריך להתנהג (AI Layer)**
- *AI Instructions* — השכבה החשובה ביותר במסמך, שמגדירה את כללי המשחק עם המודל

## הכלל שמוריד Hallucinations

החלק הקריטי באמת הוא שכבת ה-AI Instructions, ובפרט הוראה אחת מפורשת:

```
CRITICAL RULES

Never create financial data.
Never estimate missing figures.
Never assume revenue or expenses.

If information is missing — stop and ask.
```

זו ההוראה שמשנה את ההתנהגות של המודל מ"לנחש בביטחון" ל"לעצור ולשאול". בלי השורות הללו, מודלים נוטים למלא חללי מידע בהנחות סבירות-לכאורה שלא תמיד נכונות. עם ההוראה הזו, המודל הופך לכלי שמכבד את גבולות הידע שלו.

הוראות שימושיות נוספות לשכבה הזו:

- *State assumptions* — כל הנחה חייבת להיות מוצהרת, לא משתמעת
- *Act as a senior FP&A analyst* — מסגרת תפקיד עוזרת למודל לכוון את רמת הניתוח
- *Currency = ILS, VAT shown separately* — פרטים טכניים שחוסכים אי-הבנות חוזרות

## חמש השכבות שכדאי להוסיף מעבר ל-16 הבסיסיות

מעבר למבנה הבסיסי, יש חמש שכבות מתקדמות שהופכות את ה-Context File ממסמך סטטי לתשתית AI חיה:

**Systems Map** — מיפוי איך המערכות מתחברות זו לזו בפועל (למשל: בנק → מערכת הנהלת חשבונות → Airtable → Power BI).

**Automation Map** — תיאור זרימות אוטומציה קיימות (חשבונית נוצרת → Zapier → עדכון Airtable → עדכון Dashboard).

**Prompt Library** — אוסף הפרומפטים החזרתיים של הארגון, כדי שלא תצטרכו לנסח אותם מאפס בכל פעם.

**AI Use Cases** — רשימת התרחישים שבהם AI אכן בשימוש: תחזיות, ניתוח שונות (Variance Analysis), דיווח לדירקטוריון, ניתוח Cash Flow.

**Knowledge Sources** — רשימת קבצי הרפרנס הקבועים (מדיניות פיננסית, מצגות לדירקטוריון, נוהל הנהלת חשבונות, אסטרטגיית תמחור) שה-AI יכול להפנות אליהם.

## איך בונים את זה בפועל עם Claude

הדרך הפרקטית ביותר לבנות Context File היא לא לשבת ולכתוב הכל בבת אחת, אלא לבנות תהליך ראיון מובנה. ב-Claude אפשר להגדיר Skill עם הנחיה כזו:

```
You are a Finance Context Builder.
Interview me section by section.
Ask questions one section at a time.
After each answer: update the context file.
At the end: generate a complete markdown file.
```

המודל עובר איתכם שכבה-שכבה — שואל מה שם החברה, מה מודל ההכנסות, מהם ה-KPIs המרכזיים, מה מבנה קוד החשבונות — ובונה את הקובץ בהדרגה, שורה אחר שורה, עד שמתקבל מסמך מלא ומדויק.

## למה זה משנה הכל

ברגע שיש לכם `finance_context.md` שלם, אתם לא בונים אותו פעם אחת לכלי אחד. אתם מחברים אותו לכל סביבת AI שתבחרו — Claude, ChatGPT Projects, NotebookLM, Copilot, או כל Agent עתידי. כל כלי כזה "מבין" את העסק שלכם מהשנייה הראשונה, בלי שתצטרכו להסביר מחדש את ה-Gross Margin, את ה-Chart of Accounts, או את החריגה ברבעון הראשון.

זה ההבדל בין AI שמנחש לבין AI שעובד איתכם כאנליסט בכיר שכבר עבר את ה-Onboarding.
