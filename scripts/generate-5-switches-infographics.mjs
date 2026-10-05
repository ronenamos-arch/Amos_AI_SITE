import sharp from 'sharp';

// 1. Header Infographic: 5 Smart Switches
const headerSvg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg" direction="rtl">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="60%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#f1f5f9"/>
    </linearGradient>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0f172a" flood-opacity="0.06"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bgGrad)"/>
  <rect width="1200" height="6" fill="#0d9488"/>

  <!-- Top Badge -->
  <g transform="translate(430, 25)">
    <rect width="340" height="34" rx="17" fill="#f0fdfa" stroke="#0d9488" stroke-width="1.5"/>
    <text x="170" y="22" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="13" font-weight="bold" fill="#0f766e" text-anchor="middle" letter-spacing="1">AI FINANCE TRANSFORMATION • ROI</text>
  </g>

  <!-- Main Titles -->
  <text x="600" y="95" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="32" font-weight="800" fill="#0f172a" text-anchor="middle">5 המתגים החכמים: תוצאות פיננסיות מעולות ב-90% פחות צריכת AI</text>
  <text x="600" y="130" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="16" font-weight="500" fill="#475569" text-anchor="middle">כיצד לחתוך עלויות טוקנים, למנוע ניפוח קונטקסט (Context Bloat) ולהחזיר את הדיוק למודל</text>

  <!-- 5 Switches Grid Cards -->
  <!-- Card 1: Default Model (Sonnet vs Opus) -->
  <g transform="translate(40, 160)" filter="url(#shadow)">
    <rect width="210" height="380" rx="14" fill="#ffffff" stroke="#0d9488" stroke-width="2"/>
    <rect x="15" y="15" width="70" height="24" rx="12" fill="#ccfbf1"/>
    <text x="50" y="31" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#0f766e" text-anchor="middle">מתג 1</text>
    <text x="105" y="70" font-family="system-ui, sans-serif" font-size="18" font-weight="bold" fill="#0f172a" text-anchor="middle">מודל ברירת מחדל</text>
    <text x="105" y="92" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#0d9488" text-anchor="middle">Sonnet תחילה</text>
    <line x1="20" y1="105" x2="190" y2="105" stroke="#e2e8f0" stroke-width="1.5"/>
    <text x="105" y="135" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#334155" text-anchor="middle">✓ Sonnet ל-90% מהעבודה</text>
    <text x="105" y="160" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#64748b" text-anchor="middle">(אקסל, פייתון, ניתוחי FP&amp;A)</text>
    <text x="105" y="195" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#334155" text-anchor="middle">✓ Haiku למיילים ומזכרים</text>
    <text x="105" y="230" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#334155" text-anchor="middle">✓ Opus רק למשימות קצה</text>
    <text x="105" y="255" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#64748b" text-anchor="middle">(מידול פיננסי סבוך ביותר)</text>
    <rect x="15" y="325" width="180" height="38" rx="8" fill="#f0fdfa"/>
    <text x="105" y="348" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#0f766e" text-anchor="middle">חיסכון של 50% בעלות</text>
  </g>

  <!-- Card 2: Markdown vs PDF -->
  <g transform="translate(270, 160)" filter="url(#shadow)">
    <rect width="210" height="380" rx="14" fill="#ffffff" stroke="#0284c7" stroke-width="2"/>
    <rect x="15" y="15" width="70" height="24" rx="12" fill="#e0f2fe"/>
    <text x="50" y="31" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#0369a1" text-anchor="middle">מתג 2</text>
    <text x="105" y="70" font-family="system-ui, sans-serif" font-size="18" font-weight="bold" fill="#0f172a" text-anchor="middle">המרת PDF לטקסט</text>
    <text x="105" y="92" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#0284c7" text-anchor="middle">Markdown במקום PDF</text>
    <line x1="20" y1="105" x2="190" y2="105" stroke="#e2e8f0" stroke-width="1.5"/>
    <text x="105" y="135" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#ef4444" text-anchor="middle">✗ עמוד PDF גולמי:</text>
    <text x="105" y="158" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#64748b" text-anchor="middle">1,500-3,000 טוקנים</text>
    <text x="105" y="195" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#10b981" text-anchor="middle">✓ עמוד ב-Markdown:</text>
    <text x="105" y="218" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#64748b" text-anchor="middle">פחות מ-200 טוקנים</text>
    <text x="105" y="255" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#334155" text-anchor="middle">הסרת פונטים, עיצוב ומטא-דאטה</text>
    <rect x="15" y="325" width="180" height="38" rx="8" fill="#f0f9ff"/>
    <text x="105" y="348" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#0284c7" text-anchor="middle">חיתוך של 90% במשקל הקובץ</text>
  </g>

  <!-- Card 3: Edit Don't Argue -->
  <g transform="translate(500, 160)" filter="url(#shadow)">
    <rect width="210" height="380" rx="14" fill="#ffffff" stroke="#6366f1" stroke-width="2"/>
    <rect x="15" y="15" width="70" height="24" rx="12" fill="#e0e7ff"/>
    <text x="50" y="31" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#4338ca" text-anchor="middle">מתג 3</text>
    <text x="105" y="70" font-family="system-ui, sans-serif" font-size="18" font-weight="bold" fill="#0f172a" text-anchor="middle">עריכה במקום ויכוח</text>
    <text x="105" y="92" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#6366f1" text-anchor="middle">Edit Prompt Directly</text>
    <line x1="20" y1="105" x2="190" y2="105" stroke="#e2e8f0" stroke-width="1.5"/>
    <text x="105" y="135" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#ef4444" text-anchor="middle">✗ "לא, לא התכוונתי לזה"</text>
    <text x="105" y="158" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#64748b" text-anchor="middle">(מזהם את הזיכרון בתשובות שגויות)</text>
    <text x="105" y="195" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#10b981" text-anchor="middle">✓ גלילה לעריכת הפרומפט</text>
    <text x="105" y="218" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#64748b" text-anchor="middle">מחיקת היסטוריה שגויה</text>
    <text x="105" y="255" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#334155" text-anchor="middle">שמירה על קונטקסט חד ונקי</text>
    <rect x="15" y="325" width="180" height="38" rx="8" fill="#eef2ff"/>
    <text x="105" y="348" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#4338ca" text-anchor="middle">מניעת הזיות וסחרור טוקנים</text>
  </g>

  <!-- Card 4: New Topic New Chat -->
  <g transform="translate(730, 160)" filter="url(#shadow)">
    <rect width="210" height="380" rx="14" fill="#ffffff" stroke="#8b5cf6" stroke-width="2"/>
    <rect x="15" y="15" width="70" height="24" rx="12" fill="#ede9fe"/>
    <text x="50" y="31" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#6d28d9" text-anchor="middle">מתג 4</text>
    <text x="105" y="70" font-family="system-ui, sans-serif" font-size="18" font-weight="bold" fill="#0f172a" text-anchor="middle">איפוס שיחה וסיכום</text>
    <text x="105" y="92" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#8b5cf6" text-anchor="middle">New Topic, New Chat</text>
    <line x1="20" y1="105" x2="190" y2="105" stroke="#e2e8f0" stroke-width="1.5"/>
    <text x="105" y="135" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#334155" text-anchor="middle">✓ נושא חדש = צ'אט חדש</text>
    <text x="105" y="158" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#64748b" text-anchor="middle">(מניעת ערבוב סגירה וחוזים)</text>
    <text x="105" y="195" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#334155" text-anchor="middle">✓ שיחה התארכה והידרדרה?</text>
    <text x="105" y="218" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#64748b" text-anchor="middle">בקשו סיכום תמציתי דחוס</text>
    <text x="105" y="255" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#334155" text-anchor="middle">והעבירו אותו לצ'אט נקי</text>
    <rect x="15" y="325" width="180" height="38" rx="8" fill="#faf5ff"/>
    <text x="105" y="348" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#6d28d9" text-anchor="middle">אפס שאריות וקריאה כפולה</text>
  </g>

  <!-- Card 5: Projects / Knowledge Containers -->
  <g transform="translate(960, 160)" filter="url(#shadow)">
    <rect width="200" height="380" rx="14" fill="#ffffff" stroke="#ec4899" stroke-width="2"/>
    <rect x="15" y="15" width="70" height="24" rx="12" fill="#fce7f3"/>
    <text x="50" y="31" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#be185d" text-anchor="middle">מתג 5</text>
    <text x="100" y="70" font-family="system-ui, sans-serif" font-size="18" font-weight="bold" fill="#0f172a" text-anchor="middle">ריכוז ב-Projects</text>
    <text x="100" y="92" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#ec4899" text-anchor="middle">Knowledge Containers</text>
    <line x1="20" y1="105" x2="180" y2="105" stroke="#e2e8f0" stroke-width="1.5"/>
    <text x="100" y="135" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#ef4444" text-anchor="middle">✗ העלאה מחדש בכל צ'אט</text>
    <text x="100" y="158" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#64748b" text-anchor="middle">(שריפת טוקנים וזמן צוות)</text>
    <text x="100" y="195" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#10b981" text-anchor="middle">✓ העלאה מרוכזת לפרויקט</text>
    <text x="100" y="218" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#64748b" text-anchor="middle">(אינדוקס חכם ואחזור ממוקד)</text>
    <text x="100" y="255" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#334155" text-anchor="middle">ה-AI קורא רק קטעים רלוונטיים</text>
    <rect x="15" y="325" width="170" height="38" rx="8" fill="#fdf2f8"/>
    <text x="100" y="348" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#be185d" text-anchor="middle">אחזור RAG חסכוני</text>
  </g>

  <!-- Bottom Footer Bar -->
  <g transform="translate(0, 565)">
    <rect width="1200" height="65" fill="#f8fafc"/>
    <line x1="0" y1="0" x2="1200" y2="0" stroke="#e2e8f0" stroke-width="1.5"/>
    <text x="600" y="40" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#64748b" text-anchor="middle">רונן עמוס רו״ח • קהילת AI Finance Transformation • ronenamoscpa.co.il</text>
  </g>
</svg>
`;

// 2. Context Bloat vs Clean Architecture Comparison Diagram
const comparisonSvg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg" direction="rtl">
  <defs>
    <linearGradient id="bgGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="60%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#f1f5f9"/>
    </linearGradient>
    <filter id="shadow2" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0f172a" flood-opacity="0.06"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bgGrad2)"/>
  <rect width="1200" height="6" fill="#0284c7"/>

  <!-- Top Badge -->
  <g transform="translate(430, 25)">
    <rect width="340" height="34" rx="17" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.5"/>
    <text x="170" y="22" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#0369a1" text-anchor="middle" letter-spacing="1">AI FINANCE ARCHITECTURE</text>
  </g>

  <!-- Main Titles -->
  <text x="600" y="95" font-family="system-ui, sans-serif" font-size="30" font-weight="800" fill="#0f172a" text-anchor="middle">מלכודת ניפוח הקונטקסט (Context Bloat) מול ארכיטקטורה חסכונית</text>
  <text x="600" y="130" font-family="system-ui, sans-serif" font-size="16" font-weight="500" fill="#475569" text-anchor="middle">למה המודל נהיה "טיפש" ואיך לחסוך 90% מהטוקנים בכל אינטראקציה פיננסית</text>

  <!-- Side by Side Cards -->
  <!-- Left Card: The Bloat Trap -->
  <g transform="translate(60, 165)" filter="url(#shadow2)">
    <rect width="510" height="375" rx="16" fill="#ffffff" stroke="#ef4444" stroke-width="2"/>
    <rect x="25" y="20" width="130" height="28" rx="14" fill="#fee2e2"/>
    <text x="90" y="39" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#b91c1c" text-anchor="middle">⚠️ דפוס עבודה בזבזני</text>
    
    <text x="255" y="85" font-family="system-ui, sans-serif" font-size="22" font-weight="bold" fill="#991b1b" text-anchor="middle">מלכודת ניפוח הקונטקסט</text>
    <line x1="35" y1="105" x2="475" y2="105" stroke="#fecaca" stroke-width="1.5"/>

    <text x="475" y="145" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#334155" text-anchor="end">1. צ'אט ענק ואינסופי המערבב מספר נושאים בלתי קשורים</text>
    <text x="475" y="185" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#334155" text-anchor="end">2. העלאת קובצי PDF גולמיים (2,500 טוקנים לעמוד עמוס עיצוב)</text>
    <text x="475" y="225" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#334155" text-anchor="end">3. ויכוחים בצ'אט: "לא, טעית בסעיף 4" (מזהם את כל השרשרת)</text>
    <text x="475" y="265" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#334155" text-anchor="end">4. בחירה תמידית במודל הכבד והיקר ביותר (Opus) לכל משימה</text>

    <rect x="35" y="295" width="440" height="55" rx="10" fill="#fef2f2" stroke="#fca5a5" stroke-width="1"/>
    <text x="255" y="320" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#b91c1c" text-anchor="middle">התוצאה: איבוד הנחיות, ירידה באיכות התשובות,</text>
    <text x="255" y="340" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#b91c1c" text-anchor="middle">חסימת מכסות (Usage Limits) ובזבוז של 90% מהטוקנים</text>
  </g>

  <!-- Right Card: The 5 Switches Solution -->
  <g transform="translate(630, 165)" filter="url(#shadow2)">
    <rect width="510" height="375" rx="16" fill="#ffffff" stroke="#10b981" stroke-width="2"/>
    <rect x="25" y="20" width="130" height="28" rx="14" fill="#d1fae5"/>
    <text x="90" y="39" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#047857" text-anchor="middle">✓ ארכיטקטורה נקייה</text>
    
    <text x="255" y="85" font-family="system-ui, sans-serif" font-size="22" font-weight="bold" fill="#065f46" text-anchor="middle">5 המתגים החכמים</text>
    <line x1="35" y1="105" x2="475" y2="105" stroke="#a7f3d0" stroke-width="1.5"/>

    <text x="475" y="145" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#334155" text-anchor="end">1. Sonnet כברירת מחדל + Haiku למזכרים קצרים</text>
    <text x="475" y="185" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#334155" text-anchor="end">2. המרת PDF ל-Markdown (פחות מ-200 טוקנים לעמוד טקסט)</text>
    <text x="475" y="225" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#334155" text-anchor="end">3. עריכת הפרומפט המקורי בלחיצת Edit (מחיקת היסטוריה שגויה)</text>
    <text x="475" y="265" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#334155" text-anchor="end">4. איפוס שיחות (New Chat) ואחסון קבצים חוזרים ב-Projects</text>

    <rect x="35" y="295" width="440" height="55" rx="10" fill="#ecfdf5" stroke="#6ee7b7" stroke-width="1"/>
    <text x="255" y="320" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#047857" text-anchor="middle">התוצאה: דיוק מרבי, מהירות מענה פי 3,</text>
    <text x="255" y="340" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#047857" text-anchor="middle">וחיסכון של 90% בצריכת ה-AI לכל מחלקת הכספים</text>
  </g>

  <!-- Bottom Footer Bar -->
  <g transform="translate(0, 565)">
    <rect width="1200" height="65" fill="#f8fafc"/>
    <line x1="0" y1="0" x2="1200" y2="0" stroke="#e2e8f0" stroke-width="1.5"/>
    <text x="600" y="40" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#64748b" text-anchor="middle">רונן עמוס רו״ח • קהילת AI Finance Transformation • ronenamoscpa.co.il</text>
  </g>
</svg>
`;

async function run() {
  console.log('Generating header infographic...');
  await sharp(Buffer.from(headerSvg))
    .png()
    .toFile('public/images/blog/5-smart-switches-ai-finance-header.png');

  console.log('Generating comparison infographic...');
  await sharp(Buffer.from(comparisonSvg))
    .png()
    .toFile('public/images/blog/5-smart-switches-ai-finance-comparison.png');

  console.log('Done generating infographics successfully!');
}

run().catch(console.error);
