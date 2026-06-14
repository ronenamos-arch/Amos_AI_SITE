---
title: "Working Capital עם AI: כך שוחררו 13 מיליון דולר ממזומן תקוע"
date: "2026-06-14"
excerpt: "חברה רווחית, P&L מסודר — ובכל זאת חסרו לה 13 מיליון דולר. כך בנינו מרכז פיקוד על Net Working Capital עם קלוד שגילה בדיוק איפה הכסף תקוע."
image: "/images/blog/nwc-dashboard-4.png"
tags: ["Finance Ops", "CFO", "Claude"]
premium: "false"
readingTime: "12"
---

החברה הייתה רווחית. ובכל זאת חסרו לה $13 מיליון במזומן.

זה לא תרחיש דמיוני. זה מה שקרה לחברה אחת כשהפעילה כלי AI על הנתונים הפיננסיים שלה.

![](/images/blog/nwc-hero-1.png)

ה-P&L נראה בסדר. המרג'ינים יציבים. ההכנסות עלו שנה על שנה. ואז מישהו הסתכל על ה-balance sheet — ומצא שהעסק הרגיש הרבה יותר עני ממה שהמספרים אמרו.

**הסיבה: working capital**

מזומן שהחברה הרוויחה על הנייר, אבל עדיין לא גבתה. כסף שנתקע בתוך invoices שלא שולמו, inventory שלא נמכר, ובתזמון של מה שמגיע לספקים.

> **Profit הוא דעה חשבונאית. Cash הוא עובדה.** הפער ביניהם הוא working capital — ובחלק גדול מהחברות, הפער הזה הרבה יותר גדול ממה שחושבים.

## הבעיה: את הכסף הזה קשה לראות

הוא לא מופיע כשורה ב-P&L. הוא מפוזר על פני אלפי invoices, מאות SKUs, עשרות חשבונות ספקים. כדי למצוא אותו, מישהו צריך למשוך את ה-receivables ledger, ה-payables ledger, ואת ה-inventory subledger, להצליב אותם מול ה-balance sheet, לחשב את מה שמשתמע מהם בימים — ואז לבנות מודל של מה קורה אם הימים האלה זזים.

**שבוע של עבודת אנליסט.** ועד שזה מוכן, המספרים כבר זזו.

## מה שנבנה: מרכז פיקוד על Net Working Capital

**הקלט:** קובץ Excel אחד עם חמישה tabs — הנתונים שכל צוות finance יכול לייצא מהמערכת שלו.

הנה 2 טאבים מתוך הגיליון:

![](/images/blog/nwc-excel-tabs-2.png)

![Accounts Receivable Ledger — לפי לקוח, אזור, DSO וימי פיגור](/images/blog/nwc-ar-ledger-8.png)

- **12 חודשי actuals** מחוברים ל-balance sheet
- **Receivables ledger** לפי לקוח, עם terms וימי פיגור

מהנתונים האלה, נבנה כלי שמחשב את הימים הגלומים בכל יתרה, מקרין את ה-cash flow ל-12 חודשים קדימה, ומאפשר להפעיל כל driver בנפרד.

**מכאן — כל מה שאתם רואים נבנה עם קלוד.**

**מרכז הפיקוד עם אפשרויות בחירה לפי מצב הדרייבר ו-3 תרחישים לכל אחד:**

![](/images/blog/nwc-dashboard-4.png)

## שלוש מדידות שמניעות הכל

לפני שהכלי יכול לחזות, הוא צריך לבטא את ה-balance sheet בימים — לא בדולרים:

**DSO (Days Sales Outstanding)** — כמה זמן לקוחות לוקחים לשלם. DSO גבוה = יותר cash תקוע ב-accounts receivable שהרווחנו אבל עוד לא גבינו.

**DIO (Days Inventory Outstanding)** — כמה זמן המלאי יושב לפני שנמכר. DIO גבוה = cash שוכב על המדפים.

**DPO (Days Payable Outstanding)** — כמה זמן אנחנו לוקחים לשלם לספקים. DPO גבוה עוזר לנו — אנחנו שומרים את הכסף יותר זמן.

**הנוסחה: CCC = DSO + DIO − DPO**

ה-Cash Conversion Cycle מורה כמה ימים הכסף שלנו "תפוס" — מרגע ששילמנו על חומרי גלם ועד שגבינו מהלקוחות. חברה עם CCC של 40 יום מחזירה את המזומן שלה פי ארבעה יותר מהר מחברה שרצה על 180 יום.

<div style="display: flex; justify-content: center; margin: 2.5rem 0;">
  <a href="https://www.ronenamoscpa.co.il/guides/claude-finance-guide" style="
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.875rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    color: rgb(20, 184, 166);
    background: transparent;
    border-radius: 0.75rem;
    text-decoration: none;
    border: 2px solid rgb(20, 184, 166);
    transition: all 0.3s ease;
  " onmouseover="this.style.background='rgba(20, 184, 166, 0.1)'; this.style.transform='translateY(-2px)';" onmouseout="this.style.background='transparent'; this.style.transform='translateY(0)';">
    5 שימושים מעשיים לצוות הכספים עם קלוד ←
  </a>
</div>

## שבעה מנופים — כל אחד עצמאי

![מעגל סגירת המעבר מחשבונית למזומן כאשר כל מדידה מוצמדת לתרחיש שנבחר](/images/blog/nwc-ccc-cycle-3.png)

*מעגל סגירת המעבר מחשבונית למזומן כאשר כל מדידה מוצמדת לתרחיש שנבחר*

הכלי מאפשר להפעיל שבעה drivers: שלושת המדדים בימים, plus other current assets, other current liabilities, גידול מכירות חודשי, ו-COGS כאחוז ממכירות.

כל driver עובד בנפרד — **Base, Upside, או Downside** — לפי ה-assumptions שהחברה קבעה לעצמה. לא תרחיש גלובלי אחד. כי המציאות לא עובדת ככה.

אפשר לשאול: מה קורה אם ה-collections משתפרים, אבל בו זמנית הספקים מקצרים תנאים? מגדירים DSO ל-Upside, DPO ל-Downside, ומקבלים תשובה בשניות.

## מה שבאמת מזיז

**עמודות אדומות** מציגות שימוש מזומן (תשלום ספקים מהיר) לעומת **עמודות ירוקות** שחרור מזומן (גבייה ומכירת מלאי יותר מהירה)

![](/images/blog/nwc-driver-impact-5.png)

גביה מהירה יותר + הפחתת inventory = cash משתחרר. תשלום לספקים מאוחר יותר = cash נשאר אצלנו. הגרף מציג את התרומה של כל driver לשינוי הכולל.

## פירוט receivables, inventory ו-current assets לפי רמת פירוט

יתרת receivables של $7.6M לא אומרת לנו כלום. אותה יתרה מפורקת לפי לקוח, אזור, וכמה ימים מעבר ל-terms — אומרת בדיוק **אצל מי מתחילים לגבות**.

![](/images/blog/nwc-receivables-6.png)

**ספקים לפי קטגוריה ואזור, עם DPO ממוצע וסימון ספקים עם early-pay discount**

אגב: לשלם לספק עם discount מאוחר כדי לשמר cash יכול לעלות יותר ממה שה-cash שווה. הכלי מסמן איפה "למתוח תנאים" הוא **חינם** — ואיפה זה **עולה כסף**.

## המספר שמשנה שיחות

המדד הראשי:

**Cash-Flow Impact = working capital נוכחי פחות working capital חזוי ב-12 חודשים**

הלוגיקה שכולנו יודעים, אבל לא רואים ב-real time: אם ה-working capital עולה — cash נצרך. אם הוא יורד — cash משתחרר. אפשר להיות רווחיים לחלוטין ובמקביל לסחוט את ה-credit line כל חודש, בגלל שהגידול בהכנסות מזרים עוד ועוד כסף ל-accounts receivable ול-inventory לפני שהרווח מגיע לחשבון.

## מה שהנתונים גילו

![](/images/blog/nwc-findings-7.png)

**הפלט: red flags, המלצות, ותוכנית פעולה ל-90 יום**

הכלי לא רק ארגן נתונים — הוא הצביע ישירות על הבעיה.

ה-inventory נשא כ-**200 ימי עלות** ב-balance sheet, מול target של 50 יום. כ-150 ימי עודף מלאי. עובדה בודדת שדומיננטית על הכל — וזה בדיוק הסוג של דבר שנוסה חודש אחר חודש בלי שמישהו עורך את החשבון, כי כל חודש בנפרד נראה רק קצת גרוע מהקודם.

**תוצאה:** גם ב-base case שמרני, שוחרר כ-**$13 מיליון cash ב-12 חודשים** — כמעט כולו מנירמול ה-inventory. לחברה עם מכירות של $5-6M בחודש, הכסף הזה שווה יותר משני חודשי הכנסות — שוכב על המדפים.

ניתוח הרגישות אישר: **המלאי הוא ה-lever הגדול ביותר**, הרבה לפני receivables וה-payables. זה הנקודה. לא לפזר מאמץ שווה בין שלושת ה-levers — אלא לשים את רוב האנרגיה איפה שרוב הכסף.

גם חשבונות הלקוחות (accounts receivable) היו בבעיה — חלק גדול מהיתרה היה מעבר לתנאי התשלום (over terms) על פני עשרות לקוחות — ובמלאי (inventory) נמצא מלאי בעל תנועה נמוכה (slow-moving) שקרוב להתיישנות. שני הגורמים הללו דורשים טיפול, אך התחלה מהם לא תאפשר לאופטימיזציה של הדבר הנכון.

## הרצף שתמיד עובד

ניהול working capital הוא לא תרגיל חשבונאי. זה **תרגיל שחרור מזומן**. הסדר תמיד זהה:

**Diagnose** — איפה הכסף תקוע. למשוך subledgers, להמיר יתרות לימים, למצוא את ה-levers עם הפער הגדול ביותר בין מצב נוכחי ל-target.

**Quantify** — את הפרס בדולרים, לא בימים. פער של 150 יום ב-inventory לא אומר כלום ל-CEO. $13M של cash שניתן לשחרר — כן.

**Rank** — את ה-levers לפי השפעה, כדי שהמאמץ ילך לאיפה שהתמורה הגדולה ביותר.

**Execute** — לפי סדר התמורה, עם ריצה חוזרת של המודל ככל שהמספרים זזים.

## מה שה-AI לא עשה כאן

הוא לא קבע את ה-target של 50 ימי inventory — זה הגיע מה-assumptions של החברה עצמה. הוא לא אימת שה-ledgers נקיים — garbage in עדיין אומר garbage out. והוא לא ניהל משא ומתן עם ספק אחד ולא גבה invoice אחד.

**הוא אבחן, כימת ודירג.** ה-execution וההחלטה אילו assumptions נכונים לעסק הספציפי הזה — נשארת עם צוות ה-finance. זה חלוקת עבודה נכונה.

---

**מה שחשוב ללמוד:** חברה יכולה להיות רווחית לחלוטין ועדיין לסחוט את ה-credit line. הסיבה כמעט תמיד היא working capital. והכסף הזה — ניתן לאתר אותו, לכמת אותו, ולשחרר אותו. פשוט צריך להסתכל.

---

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
    לעוד תוכן ומדריכים הרשמו לבלוג ←
  </a>
</div>
