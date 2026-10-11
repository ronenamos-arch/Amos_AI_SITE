import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="60%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#f1f5f9"/>
    </linearGradient>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#0f172a" flood-opacity="0.06"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bgGrad)"/>
  <rect width="1200" height="6" fill="#0d9488"/>

  <!-- Top Badge -->
  <g transform="translate(410, 32)">
    <rect width="380" height="34" rx="17" fill="#f0fdfa" stroke="#0d9488" stroke-width="1.5"/>
    <text x="190" y="22" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="bold" fill="#0f766e" text-anchor="middle" letter-spacing="1">AI FINANCE TRANSFORMATION • ARCHITECTURE</text>
  </g>

  <!-- Main Titles -->
  <text x="600" y="105" font-family="system-ui, -apple-system, sans-serif" font-size="32" font-weight="800" fill="#0f172a" text-anchor="middle">מ-Vibe Coding נאיבי ל-Vibe Engineering חסין תקלות</text>
  <text x="600" y="140" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="500" fill="#475569" text-anchor="middle">למה קוד שנראה עובד ב-Localhost מדמם תקציבי API בייצור — ואיך מתכננים בלוקים נכונים</text>

  <!-- Left Card: Naive Vibe Coding -->
  <g transform="translate(100, 175)" filter="url(#shadow)">
    <rect width="470" height="375" rx="16" fill="#ffffff" stroke="#ef4444" stroke-width="2"/>
    <rect x="25" y="20" width="130" height="26" rx="13" fill="#fee2e2"/>
    <text x="90" y="38" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#dc2626" text-anchor="middle">המלכודת הנאיבית</text>

    <text x="235" y="80" font-family="system-ui, sans-serif" font-size="22" font-weight="bold" fill="#dc2626" text-anchor="middle">VIBE CODING ללא תשתית</text>
    <text x="235" y="108" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#64748b" text-anchor="middle">קוד סינטקטי תקין שקורס בעולם האמיתי</text>

    <line x1="30" y1="125" x2="440" y2="125" stroke="#f1f5f9" stroke-width="2"/>

    <text x="235" y="160" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">❌ קריאה כבדה בתוך בקשת ה-HTTP הראשית</text>
    <text x="235" y="195" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">❌ נעילת שרתי אפליקציה עד 5 דקות לכל בקשה</text>
    <text x="235" y="230" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">❌ תשלום 100% לספק על קריאות שנחסמו או נכשלו</text>
    <text x="235" y="265" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">❌ סגירת טאב אינה מבטלת חיוב: ה-GPU ממשיך לרוץ</text>
    <text x="235" y="300" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">❌ משתמשים משלמים על שגיאות ודורשים החזרים</text>

    <rect x="30" y="325" width="410" height="30" rx="8" fill="#fef2f2"/>
    <text x="235" y="345" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#b91c1c" text-anchor="middle">התוצאה: 20%-30% אובדן תקציב וקריסת שרתים</text>
  </g>

  <!-- Right Card: Robust Vibe Engineering -->
  <g transform="translate(630, 175)" filter="url(#shadow)">
    <rect width="470" height="375" rx="16" fill="#ffffff" stroke="#0d9488" stroke-width="2"/>
    <rect x="25" y="20" width="130" height="26" rx="13" fill="#ccfbf1"/>
    <text x="90" y="38" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0f766e" text-anchor="middle">הפתרון המהונדס</text>

    <text x="235" y="80" font-family="system-ui, sans-serif" font-size="22" font-weight="bold" fill="#0d9488" text-anchor="middle">VIBE ENGINEERING חסין</text>
    <text x="235" y="108" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#64748b" text-anchor="middle">בלוקים ארכיטקטוניים מבוססי חוסן ו-ROI</text>

    <line x1="30" y1="125" x2="440" y2="125" stroke="#f1f5f9" stroke-width="2"/>

    <text x="235" y="160" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">✓ תור משימות אסינכרוני (Redis / Background Job)</text>
    <text x="235" y="195" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">✓ מענה מיידי לדפדפן ב-40ms (אין נעילת Workers)</text>
    <text x="235" y="230" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">✓ ספר עלויות (Cost Ledger) ומעקב מדויק אחר כל קריאה</text>
    <text x="235" y="265" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">✓ אות ביטול (AbortSignal / Webhook) לעצירת חיוב בנטישה</text>
    <text x="235" y="300" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">✓ זיכוי אוטומטי שקוף למשתמש ומניעת Chargebacks</text>

    <rect x="30" y="325" width="410" height="30" rx="8" fill="#f0fdfa"/>
    <text x="235" y="345" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0f766e" text-anchor="middle">התוצאה: חוסן עסקי, חיסכון בעלויות ואמון לקוחות</text>
  </g>

  <!-- Footer Watermark -->
  <line x1="100" y1="580" x2="1100" y2="580" stroke="#e2e8f0" stroke-width="1"/>
  <text x="600" y="605" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#64748b" text-anchor="middle">
    רונן עמוס רו״ח • קהילת AI Finance Transformation • ronenamoscpa.co.il
  </text>
</svg>
`;

const outputPath = path.resolve('public/images/blog/claude-code-vibe-engineering-infographic.png');
await sharp(Buffer.from(svg))
  .png()
  .toFile(outputPath);

console.log(`Generated infographic at: ${outputPath}`);
