import sharp from 'sharp';

const svg = `
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
  <g transform="translate(360, 35)">
    <rect width="480" height="36" rx="18" fill="#f0fdfa" stroke="#0d9488" stroke-width="1.5"/>
    <text x="240" y="23" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="14" font-weight="bold" fill="#0f766e" text-anchor="middle" letter-spacing="1">AI FINANCE TRANSFORMATION • FINANCIAL MODELING</text>
  </g>

  <!-- Main Titles -->
  <text x="600" y="115" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="33" font-weight="800" fill="#0f172a" text-anchor="middle">אם אפשר להוכיח כל חישוב, מה בעצם הבעיה?</text>
  <text x="600" y="155" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="18" font-weight="500" fill="#475569" text-anchor="middle">בניית מודל פיננסי תלת-דוחִי (3-Statement) ב-Excel עם AI: ביקורת נוסחאות מול שפיטה עסקית</text>

  <!-- Stage Cards -->
  <!-- Card 1: Rigorous Inputs -->
  <g transform="translate(80, 195)" filter="url(#shadow)">
    <rect width="320" height="340" rx="16" fill="#ffffff" stroke="#14b8a6" stroke-width="2"/>
    <rect x="20" y="20" width="80" height="26" rx="13" fill="#ccfbf1"/>
    <text x="60" y="38" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#0f766e" text-anchor="middle">שלב 1</text>
    
    <text x="160" y="85" font-family="system-ui, sans-serif" font-size="22" font-weight="bold" fill="#0d9488" text-anchor="middle">INPUTS • שני מקורות</text>
    <text x="160" y="118" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#0f172a" text-anchor="middle">נעילת האמת החשבונאית</text>
    
    <line x1="30" y1="135" x2="290" y2="135" stroke="#e2e8f0" stroke-width="1.5"/>
    
    <text x="160" y="170" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• נתוני היסטוריה נעולים (2020-2025)</text>
    <text x="160" y="205" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• גיליון הנחות יחיד: 3 תרחישים</text>
    <text x="160" y="240" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• מתג תרחיש חי (Base/Worst/Best)</text>
    <text x="160" y="275" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• מניעת 'המצאת נתונים' ע"י המודל</text>

    <rect x="25" y="295" width="270" height="28" rx="8" fill="#f0fdfa"/>
    <text x="160" y="314" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0f766e" text-anchor="middle">הגבלת הקונטקסט לאמת בלבד</text>
  </g>

  <!-- Card 2: Formulas & Checks Sheet -->
  <g transform="translate(440, 195)" filter="url(#shadow)">
    <rect width="320" height="340" rx="16" fill="#ffffff" stroke="#0284c7" stroke-width="2"/>
    <rect x="20" y="20" width="80" height="26" rx="13" fill="#e0f2fe"/>
    <text x="60" y="38" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#0369a1" text-anchor="middle">שלב 2</text>
    
    <text x="160" y="85" font-family="system-ui, sans-serif" font-size="22" font-weight="bold" fill="#0284c7" text-anchor="middle">AUDIT • נוסחאות חיות</text>
    <text x="160" y="118" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#0f172a" text-anchor="middle">גיליון בקרה עם 15 בדיקות</text>
    
    <line x1="30" y1="135" x2="290" y2="135" stroke="#e2e8f0" stroke-width="1.5"/>
    
    <text x="160" y="170" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• אפס מספרים מוזנים ידנית בתחזית</text>
    <text x="160" y="205" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• Trace Precedents שקוף באקסל</text>
    <text x="160" y="240" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• הצגת פער מתמטי ממשי (0.000)</text>
    <text x="160" y="275" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• אימות תזרים, מאזן ורווחיות</text>

    <rect x="25" y="295" width="270" height="28" rx="8" fill="#f0f9ff"/>
    <text x="160" y="314" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0284c7" text-anchor="middle">אל תבקש דיוק — דרוש הוכחה</text>
  </g>

  <!-- Card 3: Skeptical Review & Business Judgement -->
  <g transform="translate(800, 195)" filter="url(#shadow)">
    <rect width="320" height="340" rx="16" fill="#ffffff" stroke="#9333ea" stroke-width="2"/>
    <rect x="20" y="20" width="80" height="26" rx="13" fill="#f3e8ff"/>
    <text x="60" y="38" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#7e22ce" text-anchor="middle">שלב 3</text>
    
    <text x="160" y="85" font-family="system-ui, sans-serif" font-size="22" font-weight="bold" fill="#9333ea" text-anchor="middle">JUDGEMENT • שכל אנושי</text>
    <text x="160" y="118" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#0f172a" text-anchor="middle">עיני המבקר הסקפטי</text>
    
    <line x1="30" y1="135" x2="290" y2="135" stroke="#e2e8f0" stroke-width="1.5"/>
    
    <text x="160" y="170" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• ירוק מוכיח אריתמטיקה — לא היגיון</text>
    <text x="160" y="205" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• בחינת הנחות בסיס מול תרחיש קיצון</text>
    <text x="160" y="240" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• שאלות בנקאים ומשקיעים (Debt / Cash)</text>
    <text x="160" y="275" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• ביקורת קפדנית זהה למודל ידני</text>

    <rect x="25" y="295" width="270" height="28" rx="8" fill="#faf5ff"/>
    <text x="160" y="314" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#7e22ce" text-anchor="middle">ה-AI חוסך בנייה — האדם מקצה חשיבה</text>
  </g>

  <!-- Bottom Footer Bar -->
  <g transform="translate(0, 565)">
    <rect width="1200" height="65" fill="#f8fafc"/>
    <line x1="0" y1="0" x2="1200" y2="0" stroke="#e2e8f0" stroke-width="1.5"/>
    <text x="600" y="40" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#64748b" text-anchor="middle">רונן עמוס רו״ח • קהילת AI Finance Transformation • ronenamoscpa.co.il</text>
  </g>
</svg>
`;

async function generate() {
  await sharp(Buffer.from(svg))
    .png({ quality: 90 })
    .toFile('public/images/blog/if-we-can-prove-every-calculation-whats-the-problem-header.png');
  console.log('Generated public/images/blog/if-we-can-prove-every-calculation-whats-the-problem-header.png');
}

generate();
