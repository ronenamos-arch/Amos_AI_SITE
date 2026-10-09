import sharp from 'sharp';
import path from 'path';

// 1. Header Infographic (1200x630)
const headerSvg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="60%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#f1f5f9"/>
    </linearGradient>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#0f172a" flood-opacity="0.07"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bgGrad)"/>
  <rect width="1200" height="6" fill="#0d9488"/>

  <!-- Top Badge -->
  <g transform="translate(420, 28)">
    <rect width="360" height="34" rx="17" fill="#f0fdfa" stroke="#0d9488" stroke-width="1.5"/>
    <text x="180" y="22" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="13" font-weight="bold" fill="#0f766e" text-anchor="middle" letter-spacing="1">AI FINANCE TRANSFORMATION • מדריך מעשי</text>
  </g>

  <!-- Main Titles -->
  <text x="600" y="105" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="34" font-weight="800" fill="#0f172a" text-anchor="middle">AI Finance: מדריך מעשי לאנשי כספים</text>
  <text x="600" y="145" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="18" font-weight="500" fill="#475569" text-anchor="middle">ייעול דוחות, סגירת חודש, תחזיות ובקרות — בארכיטקטורה אמינה ואימות אנושי</text>

  <!-- Stage Cards -->
  <!-- Card 1: Data Preparation -->
  <g transform="translate(80, 185)" filter="url(#shadow)">
    <rect width="320" height="350" rx="16" fill="#ffffff" stroke="#14b8a6" stroke-width="2"/>
    <rect x="120" y="20" width="80" height="26" rx="13" fill="#ccfbf1"/>
    <text x="160" y="38" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#0f766e" text-anchor="middle">שלב 1</text>
    
    <text x="160" y="85" font-family="system-ui, sans-serif" font-size="22" font-weight="bold" fill="#0d9488" text-anchor="middle">הכנת נתונים ומקורות</text>
    <text x="160" y="115" font-family="system-ui, sans-serif" font-size="15" font-weight="600" fill="#0f172a" text-anchor="middle">הפרדה בין עובדות לפרשנות</text>
    
    <line x1="30" y1="135" x2="290" y2="135" stroke="#e2e8f0" stroke-width="1.5"/>
    
    <text x="160" y="170" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• יתרות מקור מ-ERP (Priority/NetSuite)</text>
    <text x="160" y="205" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• חישובים מתמטיים בנוסחה בלבד</text>
    <text x="160" y="240" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• סינון רעשים וניקוי מוקדם ב-ETL</text>
    <text x="160" y="275" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• מניעת ערבוב בין עובדה לניחוש</text>

    <rect x="25" y="305" width="270" height="28" rx="8" fill="#f0fdfa"/>
    <text x="160" y="324" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0f766e" text-anchor="middle">בסיס נתונים נקי ומוכח</text>
  </g>

  <!-- Card 2: Instructions & Format -->
  <g transform="translate(440, 185)" filter="url(#shadow)">
    <rect width="320" height="350" rx="16" fill="#ffffff" stroke="#0284c7" stroke-width="2"/>
    <rect x="120" y="20" width="80" height="26" rx="13" fill="#e0f2fe"/>
    <text x="160" y="38" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#0369a1" text-anchor="middle">שלב 2</text>
    
    <text x="160" y="85" font-family="system-ui, sans-serif" font-size="22" font-weight="bold" fill="#0284c7" text-anchor="middle">הוראות ופלט מובנה</text>
    <text x="160" y="115" font-family="system-ui, sans-serif" font-size="15" font-weight="600" fill="#0f172a" text-anchor="middle">סכמה מוגדרת ואכיפת גבולות</text>
    
    <line x1="30" y1="135" x2="290" y2="135" stroke="#e2e8f0" stroke-width="1.5"/>
    
    <text x="160" y="170" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• הגדרת תפקיד ומטרת הניתוח</text>
    <text x="160" y="205" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• שימוש ב-Structured Outputs (JSON)</text>
    <text x="160" y="240" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• הוראה מפורשת: ללא הזיות או ניחושים</text>
    <text x="160" y="275" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• סימון פריטים חסרים לבדיקה</text>

    <rect x="25" y="305" width="270" height="28" rx="8" fill="#f0f9ff"/>
    <text x="160" y="324" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0284c7" text-anchor="middle">מניעת שגיאות מבניות והטיות</text>
  </g>

  <!-- Card 3: Review & Audit -->
  <g transform="translate(800, 185)" filter="url(#shadow)">
    <rect width="320" height="350" rx="16" fill="#ffffff" stroke="#9333ea" stroke-width="2"/>
    <rect x="120" y="20" width="80" height="26" rx="13" fill="#f3e8ff"/>
    <text x="160" y="38" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#7e22ce" text-anchor="middle">שלב 3</text>
    
    <text x="160" y="85" font-family="system-ui, sans-serif" font-size="22" font-weight="bold" fill="#9333ea" text-anchor="middle">בדיקה, אישור ותיעוד</text>
    <text x="160" y="115" font-family="system-ui, sans-serif" font-size="15" font-weight="600" fill="#0f172a" text-anchor="middle">שמירה על אחריות מקצועית</text>
    
    <line x1="30" y1="135" x2="290" y2="135" stroke="#e2e8f0" stroke-width="1.5"/>
    
    <text x="160" y="170" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• סף אישור אנושי (Human-in-the-Loop)</text>
    <text x="160" y="205" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• בדיקת מדגם מוגדרת מראש</text>
    <text x="160" y="240" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• תיעוד מלא לצורכי ביקורת (Audit)</text>
    <text x="160" y="275" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• תנאי עצירה מוגדרים בפיילוט</text>

    <rect x="25" y="305" width="270" height="28" rx="8" fill="#faf5ff"/>
    <text x="160" y="324" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#7e22ce" text-anchor="middle">ביטחון מלא לפני דיווח ותשלום</text>
  </g>

  <!-- Bottom Footer Bar -->
  <g transform="translate(0, 565)">
    <rect width="1200" height="65" fill="#f8fafc"/>
    <line x1="0" y1="0" x2="1200" y2="0" stroke="#e2e8f0" stroke-width="1.5"/>
    <text x="600" y="40" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#64748b" text-anchor="middle">רונן עמוס רו״ח • קהילת AI Finance Transformation • ronenamoscpa.co.il</text>
  </g>
</svg>
`;

// 2. Process Infographic (1200x520)
const processSvg = `
<svg width="1200" height="520" viewBox="0 0 1200 520" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="pBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f8fafc"/>
    </linearGradient>
    <filter id="pShadow" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="4" stdDeviation="7" flood-color="#0f172a" flood-opacity="0.06"/>
    </filter>
  </defs>

  <rect width="1200" height="520" fill="url(#pBgGrad)"/>
  <rect width="1200" height="5" fill="#0d9488"/>

  <!-- Top Badge -->
  <g transform="translate(450, 24)">
    <rect width="300" height="32" rx="16" fill="#f0fdfa" stroke="#0d9488" stroke-width="1.5"/>
    <text x="150" y="21" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#0f766e" text-anchor="middle">PROCESS OVERVIEW • ארכיטקטורת תהליך</text>
  </g>

  <!-- Title -->
  <text x="600" y="92" font-family="system-ui, sans-serif" font-size="30" font-weight="800" fill="#0f172a" text-anchor="middle">איך בנוי תהליך AI פיננסי שאפשר לסמוך עליו</text>
  <text x="600" y="126" font-family="system-ui, sans-serif" font-size="16" font-weight="500" fill="#475569" text-anchor="middle">שלושת שלבי הברזל למניעת טעויות והבטחת דיוק בספרי החשבונות</text>

  <!-- Stage 1 -->
  <g transform="translate(60, 155)" filter="url(#pShadow)">
    <rect width="340" height="280" rx="14" fill="#ffffff" stroke="#14b8a6" stroke-width="2"/>
    <rect x="25" y="22" width="90" height="26" rx="13" fill="#ccfbf1"/>
    <text x="70" y="39" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0f766e" text-anchor="middle">STAGE 1</text>
    
    <text x="170" y="85" font-family="system-ui, sans-serif" font-size="20" font-weight="bold" fill="#0f172a" text-anchor="middle">הכנת נתונים והפרדת מקורות</text>
    <line x1="30" y1="105" x2="310" y2="105" stroke="#f1f5f9" stroke-width="1.5"/>

    <text x="170" y="140" font-family="system-ui, sans-serif" font-size="14.5" font-weight="400" fill="#334155" text-anchor="middle">הפרידו בין נתון מקור (ספר חשבונות),</text>
    <text x="170" y="168" font-family="system-ui, sans-serif" font-size="14.5" font-weight="400" fill="#334155" text-anchor="middle">חישוב שנעשה בנוסחה מבוקרת (Power Query),</text>
    <text x="170" y="196" font-family="system-ui, sans-serif" font-size="14.5" font-weight="400" fill="#334155" text-anchor="middle">לטקסט או ניסוח שנבנה ע"י המודל.</text>

    <rect x="30" y="225" width="280" height="32" rx="8" fill="#f0fdfa"/>
    <text x="170" y="246" font-family="system-ui, sans-serif" font-size="12.5" font-weight="bold" fill="#0f766e" text-anchor="middle">איתור תקלות במקור מול ניסוח</text>
  </g>

  <!-- Stage 2 -->
  <g transform="translate(430, 155)" filter="url(#pShadow)">
    <rect width="340" height="280" rx="14" fill="#ffffff" stroke="#0284c7" stroke-width="2"/>
    <rect x="25" y="22" width="90" height="26" rx="13" fill="#e0f2fe"/>
    <text x="70" y="39" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0369a1" text-anchor="middle">STAGE 2</text>
    
    <text x="170" y="85" font-family="system-ui, sans-serif" font-size="20" font-weight="bold" fill="#0f172a" text-anchor="middle">הוראות ותבנית פלט</text>
    <line x1="30" y1="105" x2="310" y2="105" stroke="#f1f5f9" stroke-width="1.5"/>

    <text x="170" y="140" font-family="system-ui, sans-serif" font-size="14.5" font-weight="400" fill="#334155" text-anchor="middle">הוראה טובה מגדירה תפקיד, מטרה,</text>
    <text x="170" y="168" font-family="system-ui, sans-serif" font-size="14.5" font-weight="400" fill="#334155" text-anchor="middle">מקורות מותרים, אופן טיפול בחוסר מידע</text>
    <text x="170" y="196" font-family="system-ui, sans-serif" font-size="14.5" font-weight="400" fill="#334155" text-anchor="middle">וסכמת פלט קשיחה (Structured Outputs).</text>

    <rect x="30" y="225" width="280" height="32" rx="8" fill="#f0f9ff"/>
    <text x="170" y="246" font-family="system-ui, sans-serif" font-size="12.5" font-weight="bold" fill="#0284c7" text-anchor="middle">צמצום עמימות ואכיפת פורמט</text>
  </g>

  <!-- Stage 3 -->
  <g transform="translate(800, 155)" filter="url(#pShadow)">
    <rect width="340" height="280" rx="14" fill="#ffffff" stroke="#9333ea" stroke-width="2"/>
    <rect x="25" y="22" width="90" height="26" rx="13" fill="#f3e8ff"/>
    <text x="70" y="39" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#7e22ce" text-anchor="middle">STAGE 3</text>
    
    <text x="170" y="85" font-family="system-ui, sans-serif" font-size="20" font-weight="bold" fill="#0f172a" text-anchor="middle">בדיקה, אישור ותיעוד</text>
    <line x1="30" y1="105" x2="310" y2="105" stroke="#f1f5f9" stroke-width="1.5"/>

    <text x="170" y="140" font-family="system-ui, sans-serif" font-size="14.5" font-weight="400" fill="#334155" text-anchor="middle">לפני השפעה על תשלום, פקודה או דיווח,</text>
    <text x="170" y="168" font-family="system-ui, sans-serif" font-size="14.5" font-weight="400" fill="#334155" text-anchor="middle">קובעים נקודת אישור אנושית, מדגם חריגים,</text>
    <text x="170" y="196" font-family="system-ui, sans-serif" font-size="14.5" font-weight="400" fill="#334155" text-anchor="middle">ותיעוד מלא של גרסת ההנחיות והבודק.</text>

    <rect x="30" y="225" width="280" height="32" rx="8" fill="#faf5ff"/>
    <text x="170" y="246" font-family="system-ui, sans-serif" font-size="12.5" font-weight="bold" fill="#7e22ce" text-anchor="middle">הבקרה היא חלק בלתי נפרד מהתוצר</text>
  </g>

  <!-- Bottom Brand Watermark -->
  <g transform="translate(0, 465)">
    <rect width="1200" height="55" fill="#f8fafc"/>
    <line x1="0" y1="0" x2="1200" y2="0" stroke="#e2e8f0" stroke-width="1.5"/>
    <text x="600" y="34" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="#64748b" text-anchor="middle">רונן עמוס רו״ח • קהילת AI Finance Transformation • ronenamoscpa.co.il</text>
  </g>
</svg>
`;

async function generate() {
  const publicBlogDir = path.resolve('public', 'images', 'blog');
  
  const headerPath = path.join(publicBlogDir, 'ai-finance-practical-guide-header.png');
  await sharp(Buffer.from(headerSvg))
    .png({ quality: 95 })
    .toFile(headerPath);
  console.log(`Generated: ${headerPath}`);

  const processPath = path.join(publicBlogDir, 'ai-finance-practical-guide-process.png');
  await sharp(Buffer.from(processSvg))
    .png({ quality: 95 })
    .toFile(processPath);
  console.log(`Generated: ${processPath}`);
}

generate().catch(console.error);
