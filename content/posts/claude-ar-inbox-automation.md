---
title: 'התאמת תקבולים וסגירת חשבוניות אוטונומית ב-Claude: המדריך המלא'
date: "2026-10-23"
excerpt: 'כיצד להפוך את תיבת ar@ ממטלה ידנית של 4 שעות יומיות למערכת אוטונומית שרצה כל 15 דקות ומבצעת התאמת תקבולים וסגירת חשבוניות בעלות של אגורות.'
image: "/images/blog/claude-ar-inbox-automation-header.jpg"
tags: ["AI for Finance", "CFO", "Automation", "AR", "Claude", "Apps Script"]
premium: "true"
---

![איך נתתי ל-Claude לטפל בתיבת ה-AR שלנו: התאמת תקבולים אוטומטית](/images/blog/claude-ar-inbox-automation-header.jpg)

> **תשובה מהירה (Zero-Click Answer):**  
> תהליך התאמת תקבולים (Cash Application) ידני גוזל 10–15 דקות לכל הודעה ומצטבר לעשרות שעות עבודה חודשיות במחלקת הכספים. באמצעות ארכיטקטורה היברידית המשלבת מודל מולטי-מודאלי (Claude 3.5 Sonnet) לפענוח הודעות ומסמכי Remittance יחד עם מנוע הצלבה דטרמיניסטי בקוד (Google Apps Script / Priority API), ניתן לחלץ נתוני תשלום, להצליבם מול יתרות לקוחות פתוחות, לארכב התאמות מושלמות ולנתב חריגות (כגון ניכוי מס במקור או תת-תשלום) לבדיקת אדם — כל זאת במחזור ריצה אוטומטי של כל 15 דקות ובעלות של פחות מ-3 אגורות להודעה.

תשאלו כל מנהל כספים, חשב או מנהל גבייה מהי המשימה הכי שוחקת, סיזיפית ומועדת לטעויות בשגרה הפיננסית, והתשובה כמעט תמיד תהיה זהה: **התאמת תקבולים (Cash Application)**.

בכל בוקר מחדש נפתח הברז בתיבת ה-`ar@` (Account Receivables). עשרות הודעות דוא"ל נערמות: לקוח אחד שולח קובץ PDF של פירוט העברה (Remittance Advice), לקוח שני מצרף צילום מסך של העברה בנקאית או ספח צ'ק, לקוח שלישי שולח גיליון אקסל עם עשרות שורות מקוזזות, ולקוח רביעי רק רושם בגוף המייל "שילמנו עבור ההזמנה האחרונה".

בשיטה המסורתית, איש צוות כספים נדרש לפתוח כל מייל בנפרד, לחפש את החשבוניות המתאימות במערכת ה-ERP (כגון [Priority או NetSuite](/services)), לבדוק סכומים, לפענח קיזוזים של ניכוי מס במקור, לחשב הפרשים, ולבצע התאמה ידנית. עבור עסק ממוצע עם עשרות עד מאות תקבולים בחודש, מדובר ב-10 עד 15 דקות לכל מייל — שמשמעותן הצטברות של 60 עד 100 שעות עבודה בחודש, שווה ערך לכמעט משרה מלאה (מעל 120,000 ₪ בשנה) על עבודה רובוטית לחלוטין.

בקהילת **AI Finance Transformation של רונן עמוס**, גיבשנו עיקרון ברור: **אם תהליך חוזר על עצמו לפי כללים, אסור שאדם יעשה אותו בידיים.** 

במדריך מעשי זה נבנה מקצה-לקצה מערכת הפועלת כל 15 דקות באופן אוטונומי: היא קוראת את תיבת הדואר, מחלצת את נתוני התשלום בעזרת Claude, מצליבה אותם דטרמיניסטית מול ספר החשבוניות הפתוחות, ומנהלת את תיבת הדואר כך שכל מה שהותאם במלואו מאורכב מיד — בעוד חריגים אמיתיים בלבד נשארים לטיפול ממוקד שלכם.

---

## עקרון היסוד: הפרדה נוקשה בין פענוח (AI) להצלבה (Code)

הטעות הגדולה ביותר שארגונים עושים כשהם מנסים להטמיע AI במחלקת כספים היא לבקש מהמודל "להחליט מה לעשות" או לבצע חישובים מתמטיים מורכבים. מודלי שפה מצטיינים בקריאה, זיהוי הקשרים ופענוח מסמכים בלתי-מובנים (Unstructured Data), אך אסור לסמוך עליהם בביצוע חישובים חשבונאיים והחלטות התאמה כספיות.

בארכיטקטורה שלנו קיימת הפרדה קפדנית בין שתי שכבות:

1. **שכבת הקריאה והחילוץ (Claude Multimodal):** המודל מקבל את גוף המייל ואת הקבצים המצורפים (PDF, תמונות, סריקות), ומחלץ מבנה נתונים מוגדר וקשיח ב-JSON: מי שילם, מתי, מהו הסכום הכולל, ולאילו חשבוניות או הזמנות רכש (PO) התשלום מתייחס.
2. **שכבת ההצלבה וההתאמה (Deterministic Logic):** סקריפט קוד נוקשה בודק את הנתונים מול גיליון החשבוניות הפתוחות בספרים. אם המספרים והסכומים תואמים ב-100% — מתבצעת התאמה. אם יש פער, הקוד בודק ניכוי מס במקור (כגון 2% או 5%) או שמות חברות אם, ומסווג את המייל לפי סטטוס מדויק.

![שלוש השכבות: קליטה, מנוע הצלבה ורישום חוזר](/images/blog/claude-ar-inbox-automation-layers.png)

---

## 5 תוויות הסטטוס: הפיכת תיבת הדואר לרשימת משימות ממוקדת

במקום שאיש הכספים יעבור על כל הודעה שנכנסת, המערכת מתייגת כל מייל באחת מחמש תוויות Gmail (או תיקיות Outlook) ומעדכנת במקביל את גיליון המעקב.

<div style="background: #0f172a; border: 1px solid #1e293b; border-radius: 0.75rem; padding: 1.5rem; margin: 2rem 0; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
<div style="font-weight: 700; color: #5eead4; font-size: 1.15rem; margin-bottom: 1rem; border-bottom: 1px solid #1e293b; padding-bottom: 0.5rem;">
📌 חמשת סטטוסי הסיווג של המערכת
</div>

<div style="display: flex; flex-direction: column; gap: 0.85rem; font-size: 0.95rem; line-height: 1.6; color: #cbd5e1;">
<div><strong style="color: #34d399;">1. MATCHED (התאמה מלאה):</strong> כל השורות אותרו בספרים והסכום ששולם תואם בדיוק של 100%. המייל מתוייג, הנתונים נרשמים ביומן התקבולים, והמייל מאורכב ויוצא מתיבת הדואר הנכנס.</div>
<div><strong style="color: #fbbf24;">2. SHORT_PAY (תת-תשלום):</strong> זוהה פער בסכום ששולם לעומת יתרת החשבונית (לרוב עקב ניכוי מס במקור, הנחת תשלום מוקדם או עמלות בנק). המייל נשאר בתיבה ומסומן לבדיקת סיבת הקיזוז.</div>
<div><strong style="color: #c084fc;">3. OVERPAY (תשלום עודף):</strong> הסכום ששולם גבוה מיתרת החשבונית הפתוחה (תשלום כפול או מקדמה לפרויקט עתידי). נדרש אישור חשב להפקת קבלה על חשבון.</div>
<div><strong style="color: #f87171;">4. UNKNOWN_INVOICE (חשבונית לא קיימת):</strong> מספר החשבונית שצוין לא אותר ברשימת החשבוניות הפתוחות (למשל, שולם מספר הזמנה פנימי של הלקוח שלא קושר לחשבונית מס).</div>
<div><strong style="color: #94a3b8;">5. UNREADABLE / ERROR (מסמך לא קריא):</strong> קובץ פגום, צילום מטושטש או הודעה ללא פירוט מספק. נשאר בתיבה לפניה יזומה ללקוח.</div>
</div>
</div>

התוצאה: **בסוף כל סבב, תיבת הדואר הנכנס מכילה רק את המקרים שבאמת דורשים התערבות אנושית (כ-5% עד 10% מהמיילים בלבד).** כל היתר הותאמו, תועדו ויצאו מהדרך.

![מפת הזרימה: מתיבת הדואר ועד לסגירת ההתאמות](/images/blog/claude-ar-inbox-automation-flow.png)

---

## שלב 1: הכנת התשתית וטבלת החשבוניות הפתוחות

לצורך הפריסה המהירה ביותר (פחות מ-45 דקות עבודה), נשתמש ב-Google Sheets המשמש כמסד נתונים קל וגמיש, הניתן לחיבור ישיר מול ה-ERP באמצעות ייצוא יומי או Webhook.

![מבנה גיליון החשבוניות הפתוחות - AR Reconciliation](/images/blog/claude-ar-inbox-automation-sheet.png)

הגיליון יכלול 3 לשוניות:

1. **`Open Invoices` (חשבוניות פתוחות):**
   - עמודות: `Invoice Number` (מספר חשבונית מס), `Customer Name` (שם הלקוח), `PO Number` (מספר הזמנת רכש), `Invoice Date` (תאריך הפקה), `Open Balance` (יתרה פתוחה לתשלום בש"ח), `Parent Company` (שם חברת אם / גוף משלם).
2. **`Payments Log` (יומן תקבולים מעובדים):**
   - עמודות: `Timestamp`, `Email Subject`, `Sender`, `Customer Extracted`, `Payment Date`, `Total Paid`, `Matched Invoices`, `Status`, `Discrepancy Amount`, `Notes`.
3. **`Settings` (הגדרות מערכת):**
   - שורות מפתח: מפתח API של Claude, שם התווית ב-Gmail (`AR_Processed`), שיעור טולרנטיות לניכוי מס במקור (ברירת מחדל: עד 5%).

<!-- teaser -->
<div style="margin: 2.5rem 0; padding: 1.75rem; border-radius: 1rem; border: 1.5px solid #0d9488; background: linear-gradient(135deg, #090d16 0%, #111e2e 100%); box-shadow: 0 10px 30px rgba(13, 148, 136, 0.2);">
  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; border-bottom: 1px solid #1e293b; padding-bottom: 0.75rem;">
    <div style="display: flex; align-items: center; gap: 0.75rem;">
      <span style="font-size: 1.5rem;">🔒</span>
      <h3 style="margin: 0; color: #5eead4; font-size: 1.25rem; font-weight: 800;">התוכן המלא זמין למנויי ספריית התוכן Pro</h3>
    </div>
    <span style="background: rgba(13, 148, 136, 0.25); color: #2dd4bf; border: 1px solid #0d9488; font-size: 0.8rem; font-weight: 700; padding: 0.35rem 0.85rem; border-radius: 9999px;">PRO ASSETS</span>
  </div>
  <p style="color: #cbd5e1; font-size: 0.98rem; line-height: 1.6; margin-bottom: 1.25rem;">
    המשך המדריך כולל את כל רכיבי היישום המלאים ברמת Production:
  </p>
  <ul style="color: #94a3b8; font-size: 0.92rem; line-height: 1.8; margin-right: 1.2rem; margin-bottom: 1.5rem;">
    <li><strong style="color: #e2e8f0;">סקריפט Google Apps Script מלא ומוכן לשימוש (Copy-Paste)</strong> — כולל חיבור ל-Claude 3.5 Sonnet Vision, שליפת קבצי PDF והמרתם ל-Base64, והפעלת טריגר מתוזמן.</li>
    <li><strong style="color: #e2e8f0;">הפרומפט המערכתי וסכמת ה-JSON הקשיחה</strong> — מותאמת לזיהוי חשבוניות בישראל, מע"מ, ניכוי מס במקור ומספרי PO.</li>
    <li><strong style="color: #e2e8f0;">מנוע ההצלבה הדטרמיניסטי</strong> — אלגוריתם התאמה חכם המטפל בקיזוזים, שמות חברות אם ופערים קלים.</li>
    <li><strong style="color: #e2e8f0;">מדריך הגדרת אבטחה, צמצום טוקנים וטריגרים</strong> — שמירה מאובטחת של API Keys ב-Script Properties ומעקב ביקורת חשבונאי.</li>
  </ul>
  <div style="display: flex; justify-content: center;">
    <a href="https://www.ronenamoscpa.co.il/" style="display: inline-flex; align-items: center; justify-content: center; padding: 0.85rem 2rem; font-size: 1.05rem; font-weight: 700; color: #ffffff; background: linear-gradient(135deg, rgb(20, 184, 166) 0%, rgb(14, 165, 233) 100%); border-radius: 0.65rem; text-decoration: none; box-shadow: 0 0 25px rgba(20, 184, 166, 0.4); transition: all 0.2s;">
      רכשו מנוי ופתחו את הקוד והפרומפטים המלאים ←
    </a>
  </div>
</div>
<!-- /teaser -->

<!-- paywall -->

## שלב 2: פרומפט המערכת וסכמת ה-JSON המדויקת

כדי ש-Claude יוכל לחלץ את המידע ללא הזיות ובמבנה נתונים שיאפשר לקוד לבצע בדיקות לוגיות, אנו מגדירים פרומפט מערכתי מוקפד יחד עם JSON Schema מחייב.

הפרומפט מנחה את המודל לזהות לא רק מספרי חשבוניות מפורשים, אלא גם התייחסויות להזמנות רכש (PO), שמות חברות בנות/אם, ופירוט שורות תשלום מרובות.

<details style="margin: 2rem 0; padding: 1.25rem 1.5rem; border-radius: 0.85rem; border: 1.5px solid #0d9488; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); box-shadow: 0 4px 20px rgba(13, 148, 136, 0.15);">
<summary style="cursor: pointer; font-weight: 700; color: #2dd4bf; font-size: 1.05rem; outline: none; margin-bottom: 0.75rem; display: flex; align-items: center; justify-content: space-between;">
  <span>👉 לחצו כאן לצפייה בפרומפט המערכת (System Prompt & Schema)</span>
  <span style="background: rgba(13, 148, 136, 0.2); color: #5eead4; border: 1px solid #0d9488; font-size: 0.78rem; font-weight: 700; padding: 0.25rem 0.75rem; border-radius: 9999px;">PROMPT</span>
</summary>

<div style="position: relative; background: #000000; border-radius: 0.5rem; border: 1px solid #334155; margin-top: 0.75rem; overflow: hidden;">
<div style="display: flex; justify-content: space-between; align-items: center; background: #18181b; padding: 0.5rem 1rem; border-bottom: 1px solid #27272a;">
<span style="font-size: 0.8rem; color: #a1a1aa; font-family: ui-monospace, monospace; font-weight: 500;">CLAUDE SYSTEM PROMPT & JSON SCHEMA</span>
<button onclick="const t = this.closest('div').parentElement.querySelector('pre').innerText; navigator.clipboard.writeText(t); this.innerText = '✓ הועתק!'; this.style.color = '#10b981'; setTimeout(() => { this.innerText = '📋 העתק פרומפט'; this.style.color = '#e4e4e7'; }, 2000);" style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); color: #e4e4e7; padding: 0.3rem 0.75rem; border-radius: 0.375rem; font-size: 0.8rem; cursor: pointer; transition: all 0.2s; font-family: system-ui, sans-serif; display: flex; align-items: center; gap: 0.35rem;">📋 העתק פרומפט</button>
</div>
<pre style="color: #ffffff; padding: 1.25rem; margin: 0; overflow-x: auto; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 0.92rem; line-height: 1.6; direction: ltr; text-align: left; white-space: pre-wrap; background: transparent; border: none;">
You are an expert financial remittance extraction engine built for Accounts Receivable reconciliation.
Your sole job is to read the customer email text and any attached documents (remittance advice PDF, bank transfer confirmation, image of check stub, or excel snapshot), and extract the exact payment metadata.

RULES:
1. Extract the paying customer name, payment reference/transaction number, payment date (YYYY-MM-DD), currency (ILS, USD, EUR), and total amount paid.
2. For each invoice listed in the remittance:
   - invoice_number: Normalize the string (remove symbols like #, INV-, etc., but keep standard prefixes if ambiguous).
   - po_number: Capture purchase order numbers if mentioned.
   - amount_paid: Exact amount paid for this specific invoice.
   - deductions_or_withholding: Any explicit tax deduction (ניכוי מס במקור) or discounts noted.
3. If an email covers multiple invoices, list each one as an individual object in the "invoices" array.
4. Output STRICT, VALID JSON ONLY. Do not prepend markdown formatting, do not include code blocks (\`\`\`json), and do not add conversational pleasantries.

OUTPUT SCHEMA:
{
  "payer_name": "string",
  "payment_date": "YYYY-MM-DD",
  "payment_reference": "string",
  "currency": "ILS",
  "total_amount_paid": 0.00,
  "invoices": [
    {
      "invoice_number": "string",
      "po_number": "string or null",
      "amount_paid": 0.00,
      "deductions": 0.00,
      "notes": "string"
    }
  ],
  "confidence_score": "HIGH | MEDIUM | LOW",
  "extraction_notes": "string"
}
</pre>
</div>

</details>

כפי שניתחנו במדריך שלנו על [צמצום צריכת Tokens במערכות כספים](/blog/ai-token-optimization-finance), הגדרת סכמה מחייבת ללא טקסט חופשי מקצרת את זמן הריצה של ה-API ב-70% וחוסכת עלויות באופן דרמטי.

---

## שלב 3: קוד Google Apps Script המלא (Copy-Paste)

הקוד הבא מוטמע ישירות בתוך ה-Google Sheet שלכם (`תוספים` ← `Apps Script`). הוא פועל באופן עצמאי לחלוטין:

1. סורק מיילים שאינם מסומנים בתווית העיבוד.
2. מחלץ קבצים מצורפים (PDF, JPEG, PNG) וממיר אותם ל-Base64.
3. פונה אל ה-API של Claude (דגם `claude-3-5-sonnet-20241022` או `claude-3-5-haiku-20241022`).
4. מפעיל את מנוע ההצלבה הדטרמיניסטי.
5. רושם את התוצאות לגיליון ומתייג את המייל ב-Gmail.

<details style="margin: 2rem 0; padding: 1.25rem 1.5rem; border-radius: 0.85rem; border: 1.5px solid #0d9488; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); box-shadow: 0 4px 20px rgba(13, 148, 136, 0.15);">
<summary style="cursor: pointer; font-weight: 700; color: #2dd4bf; font-size: 1.05rem; outline: none; margin-bottom: 0.75rem; display: flex; align-items: center; justify-content: space-between;">
  <span>👉 לחצו כאן לצפייה בקוד ה-Apps Script המלא (Production Grade)</span>
  <span style="background: rgba(13, 148, 136, 0.2); color: #5eead4; border: 1px solid #0d9488; font-size: 0.78rem; font-weight: 700; padding: 0.25rem 0.75rem; border-radius: 9999px;">CODE</span>
</summary>

<div style="position: relative; background: #000000; border-radius: 0.5rem; border: 1px solid #334155; margin-top: 0.75rem; overflow: hidden;">
<div style="display: flex; justify-content: space-between; align-items: center; background: #18181b; padding: 0.5rem 1rem; border-bottom: 1px solid #27272a;">
<span style="font-size: 0.8rem; color: #a1a1aa; font-family: ui-monospace, monospace; font-weight: 500;">APPS_SCRIPT_AR_ENGINE.js</span>
<button onclick="const t = this.closest('div').parentElement.querySelector('pre').innerText; navigator.clipboard.writeText(t); this.innerText = '✓ הועתק!'; this.style.color = '#10b981'; setTimeout(() => { this.innerText = '📋 העתק קוד'; this.style.color = '#e4e4e7'; }, 2000);" style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); color: #e4e4e7; padding: 0.3rem 0.75rem; border-radius: 0.375rem; font-size: 0.8rem; cursor: pointer; transition: all 0.2s; font-family: system-ui, sans-serif; display: flex; align-items: center; gap: 0.35rem;">📋 העתק קוד</button>
</div>
<pre style="color: #ffffff; padding: 1.25rem; margin: 0; overflow-x: auto; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 0.90rem; line-height: 1.6; direction: ltr; text-align: left; white-space: pre-wrap; background: transparent; border: none;">
/**
 * AI AR CASH APPLICATION ENGINE - RONEN AMOS CPA
 * Automates AR email reading, remittance extraction via Claude 3.5 Sonnet,
 * deterministic invoice reconciliation, and inbox triage.
 */

const CONFIG = {
  SEARCH_QUERY: 'to:ar@yourcompany.com -label:AR_PROCESSED newer_than:2d',
  PROCESSED_LABEL: 'AR_PROCESSED',
  LABELS: {
    MATCHED: 'AR/MATCHED',
    SHORT_PAY: 'AR/SHORT_PAY',
    OVERPAY: 'AR/OVERPAY',
    UNKNOWN: 'AR/UNKNOWN_INVOICE',
    ERROR: 'AR/ERROR'
  },
  MAX_THREADS: 10,
  TOLERANCE_PERCENT: 0.05 // 5% allowance for Israeli Withholding Tax (ניכוי מס במקור)
};

function runARAutomation() {
  const apiKey = PropertiesService.getScriptProperties().getProperty('ANTHROPIC_API_KEY');
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY is missing in Script Properties');

  const sheet = SpreadsheetApp.getActiveSpreadsheet();
  const openInvoices = loadOpenInvoices(sheet.getSheetByName('Open Invoices'));
  const logSheet = sheet.getSheetByName('Payments Log');

  const threads = GmailApp.search(CONFIG.SEARCH_QUERY, 0, CONFIG.MAX_THREADS);
  Logger.log(`Found ${threads.length} threads to process`);

  for (const thread of threads) {
    const messages = thread.getMessages();
    const lastMsg = messages[messages.length - 1];

    try {
      const emailText = lastMsg.getPlainBody();
      const attachments = lastMsg.getAttachments();
      
      // Step 1: Call Claude Extraction
      const extracted = extractRemittanceWithClaude(apiKey, emailText, attachments);
      
      // Step 2: Deterministic Matching against Ledger
      const matchResult = reconcilePayment(extracted, openInvoices);

      // Step 3: Record to Payments Log
      logSheet.appendRow([
        new Date(),
        lastMsg.getSubject(),
        lastMsg.getFrom(),
        extracted.payer_name || 'Unknown',
        extracted.payment_date || '',
        extracted.total_amount_paid || 0,
        matchResult.matchedInvoices.join(', '),
        matchResult.status,
        matchResult.discrepancy,
        matchResult.explanation
      ]);

      // Step 4: Apply Gmail Labels & Archive if clean
      applyLabelsAndArchive(thread, matchResult.status);

    } catch (err) {
      Logger.log(`Error processing thread ${thread.getId()}: ${err.message}`);
      ensureLabel(CONFIG.LABELS.ERROR).addToThread(thread);
    }
  }
}

function extractRemittanceWithClaude(apiKey, text, attachments) {
  const content = [];

  // Add text snippet
  content.push({
    type: 'text',
    text: `Customer Email Body:\n${text.substring(0, 3000)}`
  });

  // Attach up to 2 PDF/Image documents as base64
  let docCount = 0;
  for (const att of attachments) {
    if (docCount >= 2) break;
    const contentType = att.getContentType();
    
    if (contentType === 'application/pdf') {
      content.push({
        type: 'document',
        source: {
          type: 'base64',
          media_type: 'application/pdf',
          data: Utilities.base64Encode(att.getBytes())
        }
      });
      docCount++;
    } else if (contentType.startsWith('image/')) {
      content.push({
        type: 'image',
        source: {
          type: 'base64',
          media_type: contentType,
          data: Utilities.base64Encode(att.getBytes())
        }
      });
      docCount++;
    }
  }

  const payload = {
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1500,
    temperature: 0.0,
    system: "You are a precise remittance extraction engine. Output valid raw JSON only according to schema.",
    messages: [
      {
        role: 'user',
        content: content
      }
    ]
  };

  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  const res = UrlFetchApp.fetch('https://api.anthropic.com/v1/messages', options);
  const data = JSON.parse(res.getContentText());
  
  if (data.error) {
    throw new Error(`Claude API Error: ${data.error.message}`);
  }

  const rawJson = data.content[0].text.trim().replace(/^```json/, '').replace(/```$/, '');
  return JSON.parse(rawJson);
}

function reconcilePayment(extracted, openInvoices) {
  if (!extracted.invoices || extracted.invoices.length === 0) {
    return {
      status: CONFIG.LABELS.UNKNOWN,
      matchedInvoices: [],
      discrepancy: extracted.total_amount_paid,
      explanation: 'No invoice references found in remittance'
    };
  }

  let totalMatched = 0;
  const matchedInvoices = [];
  let hasUnknown = false;
  let hasShortPay = false;

  for (const inv of extracted.invoices) {
    const invNum = String(inv.invoice_number).trim();
    const target = openInvoices[invNum] || findByPO(openInvoices, inv.po_number);

    if (!target) {
      hasUnknown = true;
      continue;
    }

    matchedInvoices.push(target.invoiceNumber);
    const expected = target.openBalance;
    const paid = inv.amount_paid;
    const diff = expected - paid;

    if (Math.abs(diff) <= 1.0) {
      totalMatched += paid;
    } else if (diff > 0 && (diff / expected) <= CONFIG.TOLERANCE_PERCENT) {
      // Recognized withholding tax / discount
      totalMatched += paid;
      hasShortPay = true;
    } else if (diff > 0) {
      hasShortPay = true;
      totalMatched += paid;
    }
  }

  if (hasUnknown) {
    return {
      status: CONFIG.LABELS.UNKNOWN,
      matchedInvoices,
      discrepancy: extracted.total_amount_paid - totalMatched,
      explanation: 'One or more invoices not located in Open Invoices'
    };
  }

  if (hasShortPay) {
    return {
      status: CONFIG.LABELS.SHORT_PAY,
      matchedInvoices,
      discrepancy: extracted.total_amount_paid - totalMatched,
      explanation: 'Payment has withholding tax, deduction, or variance'
    };
  }

  if (extracted.total_amount_paid > (totalMatched + 5.0)) {
    return {
      status: CONFIG.LABELS.OVERPAY,
      matchedInvoices,
      discrepancy: extracted.total_amount_paid - totalMatched,
      explanation: 'Payment exceeds open invoices total'
    };
  }

  return {
    status: CONFIG.LABELS.MATCHED,
    matchedInvoices,
    discrepancy: 0,
    explanation: 'Perfect match to open invoices'
  };
}

function loadOpenInvoices(sheet) {
  const data = sheet.getDataRange().getValues();
  const map = {};
  for (let i = 1; i < data.length; i++) {
    const [invNum, customer, po, date, balance] = data[i];
    if (invNum) {
      map[String(invNum).trim()] = {
        invoiceNumber: String(invNum).trim(),
        customer,
        poNumber: po ? String(po).trim() : null,
        openBalance: parseFloat(balance) || 0
      };
    }
  }
  return map;
}

function findByPO(openInvoices, poNumber) {
  if (!poNumber) return null;
  const cleanPO = String(poNumber).trim();
  for (const k in openInvoices) {
    if (openInvoices[k].poNumber === cleanPO) {
      return openInvoices[k];
    }
  }
  return null;
}

function applyLabelsAndArchive(thread, statusLabel) {
  ensureLabel(CONFIG.PROCESSED_LABEL).addToThread(thread);
  ensureLabel(statusLabel).addToThread(thread);

  // If clean match, remove from Inbox (Archive)
  if (statusLabel === CONFIG.LABELS.MATCHED) {
    thread.moveToArchive();
  }
}

function ensureLabel(name) {
  let label = GmailApp.getUserLabelByName(name);
  if (!label) {
    label = GmailApp.createLabel(name);
  }
  return label;
}
</pre>
</div>

</details>

---

## שלב 4: מנוע ההצלבה הדטרמיניסטי ומקרי קצה ישראליים

במערכות פיננסיות בישראל ישנם מספר מקרי קצה ספציפיים שחובה לטפל בהם כדי למנוע יצירת חריגות שווא:

### 1. ניכוי מס במקור (Withholding Tax)
חברות ישראליות רבות מקזזות 2% עד 5% בעת ביצוע התשלום בהתאם לפטור שקיים או בהיעדרו. אם חשבונית עומדת על 10,000 ₪, והלקוח שילם 9,500 ₪ (קיזוז 500 ₪), מנוע הכללים שלנו מזהה שהפער נופל בטווח ה-`TOLERANCE_PERCENT` (5%), מסווג את המייל כ-`SHORT_PAY`, ומציין במפורש: *"קיזוז של 500 ₪ (5%) – מיוחס לניכוי מס במקור"*.

### 2. תשלום לפי מספר הזמנה (PO) במקום חשבונית מס
חברות הייטק וארגונים גלובליים מעבירים לעיתים קרובות את התשלום תוך ציון מספר ה-PO שלהם בלבד. פונקציית `findByPO()` שכתבנו סורקת את הגיליון ומקשרת את ה-PO לחשבונית המס המתאימה בספרים באופן שקוף.

### 3. תשלום מחברת אם או גוף סולק
כאשר שמו של הגוף המשלם בדוח ההעברה אינו זהה לשם הלקוח בחשבונית (למשל, תשלום מ-"אלפא אחזקות" עבור חשבונית שהונפקה ל-"אלפא פתרונות ענן"), המערכת משתמשת בשדה `Parent Company` בגיליון כדי לזהות את הזיקה ולמנוע דחיית התאמה.

לקריאה נוספת על שילוב בקרה והצלבה רב-שלבית, ראו את המדריך שלנו על [סוכני ביקורת פיננסית וסקילים מותאמים אישית](/blog/agent-skills-financial-audit).

---

## שלב 5: הפעלת טריגר מתוזמן (כל 15 דקות) ואבטחת נתונים

כדי שהמערכת תעבוד באופן אוטונומי לחלוטין ללא לחיצה על כפתור:

1. היכנסו ב-Apps Script לסמל השעון בתפריט הצד (**Triggers**).
2. לחצו על **Add Trigger** (הוסף טריגר).
3. בחרו בפונקציה: `runARAutomation`.
4. מקור האירוע: **Time-driven** (מבוסס זמן).
5. סוג טריגר: **Minutes timer** (טיימר דקות) ← **Every 15 minutes** (כל 15 דקות).

![הגדרת הפעלה וטריגר מתוזמן ב-Google Apps Script](/images/blog/claude-ar-inbox-automation-trigger.png)

<div style="background: #0f172a; border-left: 4px solid #0d9488; padding: 1rem 1.25rem; margin: 1.5rem 0; border-radius: 0 0.5rem 0.5rem 0;">
<div style="font-weight: 700; color: #5eead4; margin-bottom: 0.25rem;">🔒 שמירה קפדנית על אבטחת מידע ו-API Keys</div>
<div style="font-size: 0.92rem; color: #cbd5e1; line-height: 1.6;">
לעולם אל תשמרו את ה-API Key של Claude ישירות בקוד! השתמשו ב-<strong>Script Properties</strong> של Google Apps Script: עברו אל <em>הגדרות פרויקט (Project Settings)</em> ← גללו מטה ל-<em>Script Properties</em> ← הוסיפו מאפיין בשם <code>ANTHROPIC_API_KEY</code> והדביקו את המפתח שלכם. בצורה זו המפתח מוצפן ואינו גלוי לאיש.
</div>
</div>

---

## חיבור ל-ERP: מ-Google Sheets אל פריוריטי (Priority) ו-NetSuite

השלב הטבעי שלאחר הפעלת המערכת ב-Google Sheets הוא חיבור ישיר מול ה-ERP הארגוני. במקום לעדכן גיליון, המערכת יכולה:

1. **קריאת יתרות פתוחות:** ביצוע קריאת REST API פשוטה מול ישות החשבוניות הפתוחות בפריוריטי (`EINVOICES?$filter=BALANCE gt 0`).
2. **רישום קבלה זמנית:** במקרים של `MATCHED`, המערכת יכולה לקרוא ישירות ל-API של פריוריטי כדי לפתוח **קבלה זמנית (Receipt)** ולסגור את החשבונית, כשהיא משאירה לחשב רק פעולת אישור סופית (Sign-off).

אנו מלווים ומיישמים תהליכים אלו במסגרת [שירותי הייעוץ והטרנספורמציה הפיננסית שלנו](/services), תוך התאמה אישית של רמות האוטומציה ומנגנוני הבקרה הפנימית (Internal Controls) של הארגון.

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

## סיכום וצ'ק-ליסט להטמעה מיידית

כדי להפוך את תיבת ה-AR שלכם לאוטונומית עוד השבוע, הנה רשימת הצעדים המעשית:

1. **הקמת הגיליון:** יצירת גיליון Google Sheets עם לשוניות `Open Invoices` ו-`Payments Log`.
2. **הטמעת הקוד:** פתיחת עורך Apps Script, הדבקת הקוד והגדרת מפתח ה-API ב-Script Properties.
3. **יצירת תוויות ב-Gmail:** יצירת תוויות הסטטוס (`AR/MATCHED`, `AR/SHORT_PAY`, `AR/OVERPAY`, `AR/UNKNOWN_INVOICE`).
4. **טסט ראשון:** הרצה ידנית מול 3 מיילים אמיתיים בתיבה לווידוא תקינות החילוץ והתיוג.
5. **הפעלת הטריגר המתוזמן:** קביעת ריצה כל 15 דקות והנחיית צוות הכספים לטפל אך ורק במיילים שנשארים בתיבה עם תווית חריג.

למעוניינים בהעמקה מעשית בבניית סוכני AI ואוטומציות פיננסיות מבוססות קוד ומודלים מובילים, מומלץ להצטרף ל-[קורס AI למנהלי כספים](/courses/ai-mastery).
