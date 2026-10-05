import sharp from 'sharp';

const comparisonSvg = `
<svg width="1200" height="600" viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgComp" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="60%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#f1f5f9"/>
    </linearGradient>
    <filter id="shadowComp" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#0f172a" flood-opacity="0.08"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1200" height="600" fill="url(#bgComp)"/>
  <rect width="1200" height="6" fill="#0284c7"/>

  <!-- Top Badge -->
  <g transform="translate(420, 25)">
    <rect width="360" height="34" rx="17" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.5"/>
    <text x="180" y="22" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="bold" fill="#0369a1" text-anchor="middle" letter-spacing="1">AI FINANCE ARCHITECTURE</text>
  </g>

  <!-- Main Titles -->
  <text x="600" y="95" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="800" fill="#0f172a" text-anchor="middle">מלכודת ניפוח הקונטקסט מול ארכיטקטורה חסכונית</text>
  <text x="600" y="130" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="500" fill="#475569" text-anchor="middle">למה המודל נהיה פחות חכם ואיך לחסוך 90% מהטוקנים בכל אינטראקציה פיננסית</text>

  <!-- Side by Side Cards -->
  <!-- Left Card: The Bloat Trap -->
  <g transform="translate(70, 160)" filter="url(#shadowComp)">
    <rect width="500" height="360" rx="16" fill="#ffffff" stroke="#ef4444" stroke-width="2"/>
    <rect x="25" y="20" width="140" height="28" rx="14" fill="#fee2e2"/>
    <text x="95" y="39" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#b91c1c" text-anchor="middle">⚠️ דפוס עבודה בזבזני</text>
    
    <text x="250" y="85" font-family="system-ui, sans-serif" font-size="21" font-weight="bold" fill="#991b1b" text-anchor="middle">מלכודת ניפוח הקונטקסט</text>
    <line x1="30" y1="105" x2="470" y2="105" stroke="#fecaca" stroke-width="1.5"/>

    <text x="250" y="145" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#334155" text-anchor="middle">1. צ'אט ענק ואינסופי המערבב מספר נושאים</text>
    <text x="250" y="180" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#334155" text-anchor="middle">2. העלאת קובצי PDF גולמיים עמוסי עיצוב</text>
    <text x="250" y="215" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#334155" text-anchor="middle">3. ויכוחים בצ'אט במקום עריכת הפרומפט המקורי</text>
    <text x="250" y="250" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#334155" text-anchor="middle">4. שימוש קבוע במודל הכבד ביותר לכל משימה</text>

    <rect x="25" y="280" width="450" height="60" rx="10" fill="#fef2f2" stroke="#fca5a5" stroke-width="1"/>
    <text x="250" y="306" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#b91c1c" text-anchor="middle">התוצאה: איבוד הנחיות, ירידה באיכות התשובות,</text>
    <text x="250" y="328" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#b91c1c" text-anchor="middle">חסימת מכסות שימוש ובזבוז של 90% מהטוקנים</text>
  </g>

  <!-- Right Card: The 5 Switches Solution -->
  <g transform="translate(630, 160)" filter="url(#shadowComp)">
    <rect width="500" height="360" rx="16" fill="#ffffff" stroke="#10b981" stroke-width="2"/>
    <rect x="25" y="20" width="140" height="28" rx="14" fill="#d1fae5"/>
    <text x="95" y="39" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#047857" text-anchor="middle">✓ ארכיטקטורה נקייה</text>
    
    <text x="250" y="85" font-family="system-ui, sans-serif" font-size="21" font-weight="bold" fill="#065f46" text-anchor="middle">5 המתגים החכמים</text>
    <line x1="30" y1="105" x2="470" y2="105" stroke="#a7f3d0" stroke-width="1.5"/>

    <text x="250" y="145" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#334155" text-anchor="middle">1. Sonnet כברירת מחדל + Haiku למזכרים קצרים</text>
    <text x="250" y="180" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#334155" text-anchor="middle">2. המרת PDF ל-Markdown (חיסכון 90% בטוקנים)</text>
    <text x="250" y="215" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#334155" text-anchor="middle">3. עריכת הפרומפט המקורי בלחיצת Edit</text>
    <text x="250" y="250" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#334155" text-anchor="middle">4. איפוס שיחות ואחסון קבצים חוזרים ב-Projects</text>

    <rect x="25" y="280" width="450" height="60" rx="10" fill="#ecfdf5" stroke="#6ee7b7" stroke-width="1"/>
    <text x="250" y="306" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#047857" text-anchor="middle">התוצאה: דיוק מרבי, מהירות מענה פי 3,</text>
    <text x="250" y="328" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#047857" text-anchor="middle">וחיסכון של 90% בצריכת ה-AI לכל מחלקת הכספים</text>
  </g>

  <!-- Bottom Footer Bar -->
  <g transform="translate(0, 545)">
    <line x1="0" y1="0" x2="1200" y2="0" stroke="#e2e8f0" stroke-width="1"/>
    <text x="600" y="35" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#64748b" text-anchor="middle">רונן עמוס רו״ח • קהילת AI Finance Transformation • ronenamoscpa.co.il</text>
  </g>
</svg>
`;

sharp(Buffer.from(comparisonSvg))
  .png()
  .toFile('public/images/blog/5-smart-switches-ai-finance-comparison.png')
  .then(() => console.log('Successfully regenerated 5-smart-switches-ai-finance-comparison.png'));
