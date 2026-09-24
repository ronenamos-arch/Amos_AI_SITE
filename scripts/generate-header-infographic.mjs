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
  <g transform="translate(430, 35)">
    <rect width="340" height="36" rx="18" fill="#f0fdfa" stroke="#0d9488" stroke-width="1.5"/>
    <text x="170" y="23" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="14" font-weight="bold" fill="#0f766e" text-anchor="middle" letter-spacing="1">AI FINANCE TRANSFORMATION</text>
  </g>

  <!-- Main Titles -->
  <text x="600" y="115" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="34" font-weight="800" fill="#0f172a" text-anchor="middle">למה מנהל כספים מסרב לחבר את ה-AI למייל?</text>
  <text x="600" y="155" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="18" font-weight="500" fill="#475569" text-anchor="middle">ארכיטקטורת 3 השלבים לאוטומציה פיננסית מדויקת, חסכונית ומאובטחת</text>

  <!-- Stage Cards -->
  <!-- Card 1: Shop -->
  <g transform="translate(80, 195)" filter="url(#shadow)">
    <rect width="320" height="340" rx="16" fill="#ffffff" stroke="#14b8a6" stroke-width="2"/>
    <rect x="20" y="20" width="80" height="26" rx="13" fill="#ccfbf1"/>
    <text x="60" y="38" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#0f766e" text-anchor="middle">שלב 1</text>
    
    <text x="160" y="85" font-family="system-ui, sans-serif" font-size="24" font-weight="bold" fill="#0d9488" text-anchor="middle">SHOP • בחירה</text>
    <text x="160" y="118" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#0f172a" text-anchor="middle">בידוד מקורות הנתונים</text>
    
    <line x1="30" y1="135" x2="290" y2="135" stroke="#e2e8f0" stroke-width="1.5"/>
    
    <text x="160" y="170" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• מניעת גישה ישירה לתיבה הראשית</text>
    <text x="160" y="205" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• חסימת מתקפות Prompt Injection</text>
    <text x="160" y="240" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• שימוש בתיבת פרוקסי ותגיות MCP</text>
    <text x="160" y="275" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• סגירת ברז הדאטא הלא-מאומת</text>

    <rect x="25" y="295" width="270" height="28" rx="8" fill="#f0fdfa"/>
    <text x="160" y="314" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0f766e" text-anchor="middle">הגנה על הארגון ממידע עוין</text>
  </g>

  <!-- Card 2: Prep -->
  <g transform="translate(440, 195)" filter="url(#shadow)">
    <rect width="320" height="340" rx="16" fill="#ffffff" stroke="#0284c7" stroke-width="2"/>
    <rect x="20" y="20" width="80" height="26" rx="13" fill="#e0f2fe"/>
    <text x="60" y="38" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#0369a1" text-anchor="middle">שלב 2</text>
    
    <text x="160" y="85" font-family="system-ui, sans-serif" font-size="24" font-weight="bold" fill="#0284c7" text-anchor="middle">PREP • הכנה</text>
    <text x="160" y="118" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#0f172a" text-anchor="middle">תת-סוכנים (Sub-Agents)</text>
    
    <line x1="30" y1="135" x2="290" y2="135" stroke="#e2e8f0" stroke-width="1.5"/>
    
    <text x="160" y="170" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• מודלים קלים ומהירים (Flash / Haiku)</text>
    <text x="160" y="205" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• צמצום 12,000 מילים ל-400 בלבד</text>
    <text x="160" y="240" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• סינון 200 שורות GL ל-20 סטיות</text>
    <text x="160" y="275" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• ניקוי רעשי רקע לפני האנליזה</text>

    <rect x="25" y="295" width="270" height="28" rx="8" fill="#f0f9ff"/>
    <text x="160" y="314" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0284c7" text-anchor="middle">חיסכון של עד 90% בעלויות טוקנים</text>
  </g>

  <!-- Card 3: Cook -->
  <g transform="translate(800, 195)" filter="url(#shadow)">
    <rect width="320" height="340" rx="16" fill="#ffffff" stroke="#9333ea" stroke-width="2"/>
    <rect x="20" y="20" width="80" height="26" rx="13" fill="#f3e8ff"/>
    <text x="60" y="38" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#7e22ce" text-anchor="middle">שלב 3</text>
    
    <text x="160" y="85" font-family="system-ui, sans-serif" font-size="24" font-weight="bold" fill="#9333ea" text-anchor="middle">COOK • בישול</text>
    <text x="160" y="118" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#0f172a" text-anchor="middle">חשיבה עמוקה + שכל אנושי</text>
    
    <line x1="30" y1="135" x2="290" y2="135" stroke="#e2e8f0" stroke-width="1.5"/>
    
    <text x="160" y="170" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• מודל חשיבה מתקדם (Opus / o3)</text>
    <text x="160" y="205" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• שולחן עבודה נקי (Mise en place)</text>
    <text x="160" y="240" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• הסקת תובנות וניסוח להנהלה</text>
    <text x="160" y="275" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• החלטות פיננסיות ברמת דיוק גבוהה</text>

    <rect x="25" y="295" width="270" height="28" rx="8" fill="#faf5ff"/>
    <text x="160" y="314" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#7e22ce" text-anchor="middle">דיוק מקצועי ללא הזיות</text>
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
    .png()
    .toFile('public/images/blog/cfo-ai-inbox-architecture-mistakes-header.png');
  console.log('Generated white-background header image successfully');
}

generate();
