import fs from 'fs';
import path from 'path';

const filePath = path.resolve('public/llms.txt');
let content = fs.readFileSync(filePath, 'utf-8');

const articleEntry = `- [התאמת תקבולים וסגירת חשבוניות אוטונומית ב-Claude: המדריך המלא](https://www.ronenamoscpa.co.il/blog/claude-ar-inbox-automation): מדריך מעשי לאוטומציה מלאה של תיבת ה-ar@ והתאמת תקבולים (Cash Application) ב-Claude 3.5 Sonnet: חילוץ מולטי-מודאלי מ-PDF ותמונות, מנוע הצלבה דטרמיניסטי מול יתרות פתוחות, ארכוב אוטומטי של התאמות מושלמות וניהול 5 תוויות סטטוס מובנות ב-Gmail/Outlook.\n`;

const answerEntry = `- **How do you automate AR cash application and invoice reconciliation using Claude?** By separating multimodal document extraction from deterministic reconciliation logic: Claude 3.5 Sonnet extracts customer details, payment amounts, and invoice line items from incoming emails, PDFs, and check stubs into a strict JSON schema; then a deterministic rule engine (Google Apps Script / Priority ERP API) matches lines against open receivables, flags withholding tax or short-payments, logs entries to the ledger, and labels emails into 5 statuses (MATCHED, SHORT_PAY, OVERPAY, UNKNOWN, ERROR), auto-archiving clean matches and leaving only real exceptions for human review every 15 minutes.\n`;

if (!content.includes('claude-ar-inbox-automation')) {
  content = content.replace(/(## Blog — Featured Articles\r?\n\r?\n)/, `$1${articleEntry}`);
  content = content.replace(/(## Zero-Click Answers\r?\n\r?\n)/, `$1${answerEntry}`);
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('Successfully updated public/llms.txt');
} else {
  console.log('Already in llms.txt');
}
