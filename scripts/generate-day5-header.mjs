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
  <g transform="translate(350, 35)">
    <rect width="500" height="36" rx="18" fill="#f0fdfa" stroke="#0d9488" stroke-width="1.5"/>
    <text x="250" y="23" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="14" font-weight="bold" fill="#0f766e" text-anchor="middle" letter-spacing="1">AI FINANCE TRANSFORMATION • AUTONOMOUS FP&amp;A</text>
  </g>

  <!-- Main Titles -->
  <text x="600" y="115" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="33" font-weight="800" fill="#0f172a" text-anchor="middle">דיווח ניהולי חודשי אוטונומי ב-Claude</text>
  <text x="600" y="155" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="18" font-weight="500" fill="#475569" text-anchor="middle">עידן הפרומפטים נגמר: בניית מערכת דיווח מקצה-לקצה עם Projects, Skills ומשימה מתוזמנת</text>

  <!-- Stage Cards -->
  <!-- Card 1: Three Layers Separation -->
  <g transform="translate(80, 195)" filter="url(#shadow)">
    <rect width="320" height="340" rx="16" fill="#ffffff" stroke="#14b8a6" stroke-width="2"/>
    <rect x="20" y="20" width="80" height="26" rx="13" fill="#ccfbf1"/>
    <text x="60" y="38" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#0f766e" text-anchor="middle">שכבה 1</text>
    
    <text x="160" y="85" font-family="system-ui, sans-serif" font-size="22" font-weight="bold" fill="#0d9488" text-anchor="middle">SYSTEM • הפרדת שכבות</text>
    <text x="160" y="118" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#0f172a" text-anchor="middle">קבוע, אטי ומשתנה</text>
    
    <line x1="30" y1="135" x2="290" y2="135" stroke="#e2e8f0" stroke-width="1.5"/>
    
    <text x="160" y="170" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• יציב: הנחיות פרויקט ו-5 סקילים</text>
    <text x="160" y="205" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• אטי: תקציב, מבנה ארגוני ו-KPIs</text>
    <text x="160" y="240" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• חודשי: יצוא מ-Priority/NetSuite</text>
    <text x="160" y="275" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• סוף להתחלה מחדש בכל חודש</text>

    <rect x="25" y="295" width="270" height="28" rx="8" fill="#f0fdfa"/>
    <text x="160" y="314" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0f766e" text-anchor="middle">בניית מערכת במקום צ'אטבוט</text>
  </g>

  <!-- Card 2: Five Skills & Context -->
  <g transform="translate(440, 195)" filter="url(#shadow)">
    <rect width="320" height="340" rx="16" fill="#ffffff" stroke="#0284c7" stroke-width="2"/>
    <rect x="20" y="20" width="80" height="26" rx="13" fill="#e0f2fe"/>
    <text x="60" y="38" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#0369a1" text-anchor="middle">שכבה 2</text>
    
    <text x="160" y="85" font-family="system-ui, sans-serif" font-size="22" font-weight="bold" fill="#0284c7" text-anchor="middle">SKILLS • חמש מיומנויות</text>
    <text x="160" y="118" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#0f172a" text-anchor="middle">סדר ביצוע חשבונאי קשיח</text>
    
    <line x1="30" y1="135" x2="290" y2="135" stroke="#e2e8f0" stroke-width="1.5"/>
    
    <text x="160" y="170" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• בדיקות שלמות וסטטוס מוכנות</text>
    <text x="160" y="205" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• דוח רווח והפסד ולוח מדדי KPI</text>
    <text x="160" y="240" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• ניתוח סטיות וגשר EBITDA מוסבר</text>
    <text x="160" y="275" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• תחזית מתגלגלת ומצגת דירקטוריון</text>

    <rect x="25" y="295" width="270" height="28" rx="8" fill="#f0f9ff"/>
    <text x="160" y="314" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0284c7" text-anchor="middle">פרומפט חודשי מינימלי ב-3 שורות</text>
  </g>

  <!-- Card 3: Autonomous Run & Human Sign-off -->
  <g transform="translate(800, 195)" filter="url(#shadow)">
    <rect width="320" height="340" rx="16" fill="#ffffff" stroke="#9333ea" stroke-width="2"/>
    <rect x="20" y="20" width="80" height="26" rx="13" fill="#f3e8ff"/>
    <text x="60" y="38" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#7e22ce" text-anchor="middle">שכבה 3</text>
    
    <text x="160" y="85" font-family="system-ui, sans-serif" font-size="22" font-weight="bold" fill="#9333ea" text-anchor="middle">SCHEDULE • משימה אוטונומית</text>
    <text x="160" y="118" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#0f172a" text-anchor="middle">משימה מתוזמנת + חתימת CFO</text>
    
    <line x1="30" y1="135" x2="290" y2="135" stroke="#e2e8f0" stroke-width="1.5"/>
    
    <text x="160" y="170" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• ריצה ב-07:00 בבוקר ביום הסגירה</text>
    <text x="160" y="205" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• אם NOT READY: הפקת דוח חוסרים</text>
    <text x="160" y="240" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• ייצור טיוטת PowerPoint מלאה</text>
    <text x="160" y="275" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• אימות 5 מספרי עוגן ע"י איש כספים</text>

    <rect x="25" y="295" width="270" height="28" rx="8" fill="#faf5ff"/>
    <text x="160" y="314" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#7e22ce" text-anchor="middle">המכונה בונה טיוטה — האדם חותם</text>
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
    .toFile('public/images/blog/autonomous-monthly-reporting-claude-header.png');
  console.log('Generated public/images/blog/autonomous-monthly-reporting-claude-header.png');
}

generate();
