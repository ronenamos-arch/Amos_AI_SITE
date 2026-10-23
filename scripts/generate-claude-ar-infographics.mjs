import sharp from 'sharp';
import path from 'path';

const headerSvg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg" direction="rtl">
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
  <g transform="translate(330, 35)">
    <rect width="540" height="36" rx="18" fill="#f0fdfa" stroke="#0d9488" stroke-width="1.5"/>
    <text x="270" y="23" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="14" font-weight="bold" fill="#0f766e" text-anchor="middle" letter-spacing="1">AI FINANCE TRANSFORMATION • CASH APPLICATION</text>
  </g>

  <!-- Main Titles -->
  <text x="600" y="112" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="33" font-weight="800" fill="#0f172a" text-anchor="middle">התאמת תקבולים וסגירת חשבוניות אוטונומית ב-Claude</text>
  <text x="600" y="152" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="17" font-weight="500" fill="#475569" text-anchor="middle">הופכים את תיבת ה-ar@ מבור שחור של 4 שעות יומיות — למערכת שרצה כל 15 דקות בעלות של אגורות</text>

  <!-- Stage Cards -->
  <!-- Card 1: Multimodal Ingestion -->
  <g transform="translate(80, 190)" filter="url(#shadow)">
    <rect width="320" height="345" rx="16" fill="#ffffff" stroke="#14b8a6" stroke-width="2"/>
    <rect x="20" y="20" width="85" height="26" rx="13" fill="#ccfbf1"/>
    <text x="62" y="38" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#0f766e" text-anchor="middle">שכבה 1</text>
    
    <text x="160" y="85" font-family="system-ui, sans-serif" font-size="20" font-weight="bold" fill="#0d9488" text-anchor="middle">INGESTION • קליטה</text>
    <text x="160" y="116" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#0f172a" text-anchor="middle">קריאה מולטי-מודאלית</text>
    
    <line x1="30" y1="135" x2="290" y2="135" stroke="#e2e8f0" stroke-width="1.5"/>
    
    <text x="160" y="170" font-family="system-ui, sans-serif" font-size="13.5" font-weight="500" fill="#334155" text-anchor="middle">• סריקת תיבת ar@ כל 15 דקות</text>
    <text x="160" y="205" font-family="system-ui, sans-serif" font-size="13.5" font-weight="500" fill="#334155" text-anchor="middle">• פענוח PDF, תמונות צ'ק ו-Excel</text>
    <text x="160" y="240" font-family="system-ui, sans-serif" font-size="13.5" font-weight="500" fill="#334155" text-anchor="middle">• חילוץ: לקוח, תאריך, סכום ושורות</text>
    <text x="160" y="275" font-family="system-ui, sans-serif" font-size="13.5" font-weight="500" fill="#334155" text-anchor="middle">• עלות ממוצעת: פחות מ-3 אגורות למייל</text>

    <rect x="25" y="300" width="270" height="28" rx="8" fill="#f0fdfa"/>
    <text x="160" y="319" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0f766e" text-anchor="middle">Claude 3.5 עם Vision לכל פורמט</text>
  </g>

  <!-- Card 2: Deterministic Matching Rules -->
  <g transform="translate(440, 190)" filter="url(#shadow)">
    <rect width="320" height="345" rx="16" fill="#ffffff" stroke="#0284c7" stroke-width="2"/>
    <rect x="20" y="20" width="85" height="26" rx="13" fill="#e0f2fe"/>
    <text x="62" y="38" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#0369a1" text-anchor="middle">שכבה 2</text>
    
    <text x="160" y="85" font-family="system-ui, sans-serif" font-size="20" font-weight="bold" fill="#0284c7" text-anchor="middle">RULES • מנוע הצלבה</text>
    <text x="160" y="116" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#0f172a" text-anchor="middle">הצלבה דטרמיניסטית בקוד</text>
    
    <line x1="30" y1="135" x2="290" y2="135" stroke="#e2e8f0" stroke-width="1.5"/>
    
    <text x="160" y="170" font-family="system-ui, sans-serif" font-size="13.5" font-weight="500" fill="#334155" text-anchor="middle">• התאמה מול חשבוניות פתוחות</text>
    <text x="160" y="205" font-family="system-ui, sans-serif" font-size="13.5" font-weight="500" fill="#334155" text-anchor="middle">• זיהוי PO חלופי ושמות חברות-אם</text>
    <text x="160" y="240" font-family="system-ui, sans-serif" font-size="13.5" font-weight="500" fill="#334155" text-anchor="middle">• הפרדת שורות תשלום מרובות</text>
    <text x="160" y="275" font-family="system-ui, sans-serif" font-size="13.5" font-weight="500" fill="#334155" text-anchor="middle">• אפס הזיות: ה-AI קורא, הקוד מצליב</text>

    <rect x="25" y="300" width="270" height="28" rx="8" fill="#f0f9ff"/>
    <text x="160" y="319" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0284c7" text-anchor="middle">כללי לוגיקה נוקשים ועקביים</text>
  </g>

  <!-- Card 3: 5 Statuses & Exception Inbox -->
  <g transform="translate(800, 190)" filter="url(#shadow)">
    <rect width="320" height="345" rx="16" fill="#ffffff" stroke="#9333ea" stroke-width="2"/>
    <rect x="20" y="20" width="85" height="26" rx="13" fill="#f3e8ff"/>
    <text x="62" y="38" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#7e22ce" text-anchor="middle">שכבה 3</text>
    
    <text x="160" y="85" font-family="system-ui, sans-serif" font-size="20" font-weight="bold" fill="#9333ea" text-anchor="middle">STATUS • 5 תוויות</text>
    <text x="160" y="116" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#0f172a" text-anchor="middle">התיבה כרשימת משימות</text>
    
    <line x1="30" y1="135" x2="290" y2="135" stroke="#e2e8f0" stroke-width="1.5"/>
    
    <text x="160" y="170" font-family="system-ui, sans-serif" font-size="13.5" font-weight="500" fill="#334155" text-anchor="middle">• MATCHED: סגירה אוטומטית וארכוב</text>
    <text x="160" y="205" font-family="system-ui, sans-serif" font-size="13.5" font-weight="500" fill="#334155" text-anchor="middle">• SHORT_PAY: בדיקת ניכוי מס/הנחה</text>
    <text x="160" y="240" font-family="system-ui, sans-serif" font-size="13.5" font-weight="500" fill="#334155" text-anchor="middle">• OVERPAY / UNKNOWN: טיפול מהיר</text>
    <text x="160" y="275" font-family="system-ui, sans-serif" font-size="13.5" font-weight="500" fill="#334155" text-anchor="middle">• בתיבה נשארים רק חריגים אמיתיים</text>

    <rect x="25" y="300" width="270" height="28" rx="8" fill="#faf5ff"/>
    <text x="160" y="319" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#7e22ce" text-anchor="middle">טיפול אנושי רק ב-5%-10% מהמיילים</text>
  </g>

  <!-- Bottom Footer Bar -->
  <g transform="translate(0, 565)">
    <rect width="1200" height="65" fill="#f8fafc"/>
    <line x1="0" y1="0" x2="1200" y2="0" stroke="#e2e8f0" stroke-width="1.5"/>
    <text x="600" y="40" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#64748b" text-anchor="middle">רונן עמוס רו״ח • קהילת AI Finance Transformation • ronenamoscpa.co.il</text>
  </g>
</svg>
`;

const archSvg = `
<svg width="1200" height="680" viewBox="0 0 1200 680" xmlns="http://www.w3.org/2000/svg" direction="rtl">
  <defs>
    <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f8fafc"/>
    </linearGradient>
    <filter id="cardShadow" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#0f172a" flood-opacity="0.08"/>
    </filter>
  </defs>

  <rect width="1200" height="680" fill="url(#bg2)"/>
  <rect width="1200" height="6" fill="#0284c7"/>

  <!-- Title -->
  <g transform="translate(380, 25)">
    <rect width="440" height="34" rx="17" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.5"/>
    <text x="220" y="22" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#0369a1" text-anchor="middle" letter-spacing="1">AR RECONCILIATION ARCHITECTURE PIPELINE</text>
  </g>
  <text x="600" y="95" font-family="system-ui, sans-serif" font-size="28" font-weight="800" fill="#0f172a" text-anchor="middle">מפת הזרימה: מתיבת הדואר ועד לסגירת החשבונית</text>
  <text x="600" y="125" font-family="system-ui, sans-serif" font-size="16" font-weight="500" fill="#64748b" text-anchor="middle">שילוב מדויק בין מודל מולטי-מודאלי לפענוח מסמכים לבין מנוע קוד להצלבה ללא טעויות</text>

  <!-- Step 1: Mail Arrival -->
  <g transform="translate(70, 160)" filter="url(#cardShadow)">
    <rect width="230" height="360" rx="14" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
    <rect x="15" y="15" width="200" height="36" rx="8" fill="#f1f5f9"/>
    <text x="115" y="38" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="#334155" text-anchor="middle">1. קליטת הודעה</text>
    
    <text x="115" y="85" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#0f172a" text-anchor="middle">תיבת ar@</text>
    <text x="115" y="115" font-family="system-ui, sans-serif" font-size="13" fill="#64748b" text-anchor="middle">Gmail / M365</text>
    
    <line x1="25" y1="135" x2="205" y2="135" stroke="#f1f5f9" stroke-width="1.5"/>
    
    <text x="115" y="165" font-family="system-ui, sans-serif" font-size="12.5" fill="#475569" text-anchor="middle">• סריקה כל 15 דקות</text>
    <text x="115" y="195" font-family="system-ui, sans-serif" font-size="12.5" fill="#475569" text-anchor="middle">• זיהוי מיילים חדשים</text>
    <text x="115" y="225" font-family="system-ui, sans-serif" font-size="12.5" fill="#475569" text-anchor="middle">• חילוץ קבצים מצורפים</text>
    <text x="115" y="255" font-family="system-ui, sans-serif" font-size="12.5" fill="#475569" text-anchor="middle">• PDF / תמונה / אקסל</text>
    
    <rect x="20" y="300" width="190" height="34" rx="6" fill="#f8fafc" stroke="#e2e8f0"/>
    <text x="115" y="322" font-family="system-ui, sans-serif" font-size="11.5" font-weight="bold" fill="#0f766e" text-anchor="middle">Apps Script Trigger</text>
  </g>

  <!-- Step 2: Claude Multimodal Vision -->
  <g transform="translate(340, 160)" filter="url(#cardShadow)">
    <rect width="240" height="360" rx="14" fill="#ffffff" stroke="#14b8a6" stroke-width="2"/>
    <rect x="15" y="15" width="210" height="36" rx="8" fill="#ccfbf1"/>
    <text x="120" y="38" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="#0f766e" text-anchor="middle">2. פענוח ומיצוי נתונים</text>
    
    <text x="120" y="85" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#0d9488" text-anchor="middle">Claude 3.5 Sonnet</text>
    <text x="120" y="115" font-family="system-ui, sans-serif" font-size="13" fill="#64748b" text-anchor="middle">Vision API &amp; JSON Schema</text>
    
    <line x1="25" y1="135" x2="215" y2="135" stroke="#f1f5f9" stroke-width="1.5"/>
    
    <text x="120" y="165" font-family="system-ui, sans-serif" font-size="12.5" fill="#475569" text-anchor="middle">• מיצוי שם הלקוח המשלם</text>
    <text x="120" y="195" font-family="system-ui, sans-serif" font-size="12.5" fill="#475569" text-anchor="middle">• סכום כולל ותאריך תשלום</text>
    <text x="120" y="225" font-family="system-ui, sans-serif" font-size="12.5" fill="#475569" text-anchor="middle">• שורות חשבוניות וסכומיהן</text>
    <text x="120" y="255" font-family="system-ui, sans-serif" font-size="12.5" fill="#475569" text-anchor="middle">• מספרי PO / פרויקט</text>
    
    <rect x="20" y="300" width="200" height="34" rx="6" fill="#f0fdfa" stroke="#14b8a6"/>
    <text x="120" y="322" font-family="system-ui, sans-serif" font-size="11.5" font-weight="bold" fill="#0d9488" text-anchor="middle">JSON מובנה ומאומת</text>
  </g>

  <!-- Step 3: Reconciliation Engine -->
  <g transform="translate(620, 160)" filter="url(#cardShadow)">
    <rect width="240" height="360" rx="14" fill="#ffffff" stroke="#0284c7" stroke-width="2"/>
    <rect x="15" y="15" width="210" height="36" rx="8" fill="#e0f2fe"/>
    <text x="120" y="38" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="#0369a1" text-anchor="middle">3. מנוע הצלבה כפול</text>
    
    <text x="120" y="85" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#0284c7" text-anchor="middle">קוד דטרמיניסטי</text>
    <text x="120" y="115" font-family="system-ui, sans-serif" font-size="13" fill="#64748b" text-anchor="middle">מול יתרות פתוחות בספרים</text>
    
    <line x1="25" y1="135" x2="215" y2="135" stroke="#f1f5f9" stroke-width="1.5"/>
    
    <text x="120" y="165" font-family="system-ui, sans-serif" font-size="12.5" fill="#475569" text-anchor="middle">• התאמה מלאה (מספר + סכום)</text>
    <text x="120" y="195" font-family="system-ui, sans-serif" font-size="12.5" fill="#475569" text-anchor="middle">• התאמה עקיפה לפי PO / ח"פ</text>
    <text x="120" y="225" font-family="system-ui, sans-serif" font-size="12.5" fill="#475569" text-anchor="middle">• זיהוי ניכוי מס במקור</text>
    <text x="120" y="255" font-family="system-ui, sans-serif" font-size="12.5" fill="#475569" text-anchor="middle">• בידוד הפרשי שער / עגלות</text>
    
    <rect x="20" y="300" width="200" height="34" rx="6" fill="#f0f9ff" stroke="#0284c7"/>
    <text x="120" y="322" font-family="system-ui, sans-serif" font-size="11.5" font-weight="bold" fill="#0284c7" text-anchor="middle">Sheets / Priority API</text>
  </g>

  <!-- Step 4: Outcome & Exception Handling -->
  <g transform="translate(900, 160)" filter="url(#cardShadow)">
    <rect width="230" height="360" rx="14" fill="#ffffff" stroke="#9333ea" stroke-width="2"/>
    <rect x="15" y="15" width="200" height="36" rx="8" fill="#f3e8ff"/>
    <text x="115" y="38" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="#7e22ce" text-anchor="middle">4. תיוג ופעולה</text>
    
    <text x="115" y="85" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#9333ea" text-anchor="middle">5 תוויות סטטוס</text>
    <text x="115" y="115" font-family="system-ui, sans-serif" font-size="13" fill="#64748b" text-anchor="middle">ארכוב או ניתוב לבדיקה</text>
    
    <line x1="25" y1="135" x2="205" y2="135" stroke="#f1f5f9" stroke-width="1.5"/>
    
    <text x="115" y="165" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#059669" text-anchor="middle">✔ MATCHED: ארכוב אוטומטי</text>
    <text x="115" y="195" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#d97706" text-anchor="middle">⚠ SHORT_PAY: תת-תשלום</text>
    <text x="115" y="225" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#dc2626" text-anchor="middle">✕ UNKNOWN: לא בספרים</text>
    <text x="115" y="255" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#7c3aed" text-anchor="middle">⚡ OVERPAY: תשלום יתר</text>
    
    <rect x="20" y="300" width="190" height="34" rx="6" fill="#faf5ff" stroke="#9333ea"/>
    <text x="115" y="322" font-family="system-ui, sans-serif" font-size="11.5" font-weight="bold" fill="#7e22ce" text-anchor="middle">Zero-Touch ב-90% מהמקרים</text>
  </g>

  <!-- Connectors -->
  <path d="M 300 340 L 340 340" stroke="#0d9488" stroke-width="3" stroke-dasharray="4,4"/>
  <path d="M 580 340 L 620 340" stroke="#0284c7" stroke-width="3" stroke-dasharray="4,4"/>
  <path d="M 860 340 L 900 340" stroke="#9333ea" stroke-width="3" stroke-dasharray="4,4"/>

  <!-- Footer -->
  <g transform="translate(0, 615)">
    <rect width="1200" height="65" fill="#f8fafc"/>
    <line x1="0" y1="0" x2="1200" y2="0" stroke="#e2e8f0" stroke-width="1.5"/>
    <text x="600" y="40" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#64748b" text-anchor="middle">רונן עמוס רו״ח • קהילת AI Finance Transformation • ronenamoscpa.co.il</text>
  </g>
</svg>
`;

async function main() {
  const targetHeader = path.resolve('public/images/blog/claude-ar-inbox-automation-header.png');
  const targetArch = path.resolve('public/images/blog/claude-ar-inbox-automation-architecture.png');

  await sharp(Buffer.from(headerSvg))
    .png({ quality: 90 })
    .toFile(targetHeader);
  console.log('Created:', targetHeader);

  await sharp(Buffer.from(archSvg))
    .png({ quality: 90 })
    .toFile(targetArch);
  console.log('Created:', targetArch);
}

main().catch(console.error);
