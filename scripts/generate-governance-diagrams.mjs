import sharp from 'sharp';

// Diagram 1: Matrix vs Ladder
const matrixSvg = `
<svg width="1200" height="560" viewBox="0 0 1200 560" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f8fafc"/>
    </linearGradient>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="4" stdDeviation="10" flood-color="#0f172a" flood-opacity="0.08"/>
    </filter>
  </defs>

  <rect width="1200" height="560" fill="url(#bgGrad)"/>
  <rect width="1200" height="5" fill="#0d9488"/>

  <!-- Left Card: Signing Authority Matrix -->
  <g transform="translate(60, 45)" filter="url(#shadow)">
    <rect width="500" height="420" rx="20" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
    <text x="250" y="60" font-family="Arial, Segoe UI, Tahoma, sans-serif" font-size="24" font-weight="800" fill="#0f172a" text-anchor="middle">מטריצת סמכויות חתימה</text>
    <text x="250" y="88" font-family="Arial, Segoe UI, Tahoma, sans-serif" font-size="14" font-weight="600" fill="#64748b" text-anchor="middle">הפרדת סמכויות לפי סכומי מהותיות וסיכון</text>

    <!-- Row 1: Board -->
    <g transform="translate(40, 130)">
      <text x="0" y="32" font-family="Arial, Segoe UI, Tahoma, sans-serif" font-size="16" font-weight="700" fill="#0f172a">דירקטוריון</text>
      <rect x="110" y="0" width="310" height="52" rx="26" fill="#1e1b4b"/>
      <text x="265" y="32" font-family="Arial, Segoe UI, Tahoma, sans-serif" font-size="15" font-weight="700" fill="#ffffff" text-anchor="middle">מעל ₪200,000 (€50k+)</text>
    </g>

    <!-- Row 2: CFO -->
    <g transform="translate(40, 215)">
      <text x="0" y="32" font-family="Arial, Segoe UI, Tahoma, sans-serif" font-size="16" font-weight="700" fill="#0f172a">סמנכ״ל כספים</text>
      <rect x="110" y="0" width="310" height="52" rx="26" fill="#f1f5f9"/>
      <rect x="110" y="0" width="220" height="52" rx="26" fill="#2563eb"/>
      <text x="220" y="32" font-family="Arial, Segoe UI, Tahoma, sans-serif" font-size="15" font-weight="700" fill="#ffffff" text-anchor="middle">עד ₪200,000 (עד €50k)</text>
    </g>

    <!-- Row 3: Manager -->
    <g transform="translate(40, 300)">
      <text x="0" y="32" font-family="Arial, Segoe UI, Tahoma, sans-serif" font-size="16" font-weight="700" fill="#0f172a">מנהל / חשב</text>
      <rect x="110" y="0" width="310" height="52" rx="26" fill="#f1f5f9"/>
      <rect x="110" y="0" width="140" height="52" rx="26" fill="#38bdf8"/>
      <text x="180" y="32" font-family="Arial, Segoe UI, Tahoma, sans-serif" font-size="15" font-weight="700" fill="#0f172a" text-anchor="middle">עד ₪20,000</text>
    </g>
  </g>

  <!-- Transition Arrow Circles in middle -->
  <g transform="translate(580, 190)">
    <circle cx="20" cy="0" r="20" fill="#dbeafe"/>
    <text x="20" y="6" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#2563eb" text-anchor="middle">→</text>

    <circle cx="20" cy="85" r="20" fill="#dbeafe"/>
    <text x="20" y="91" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#2563eb" text-anchor="middle">→</text>

    <circle cx="20" cy="170" r="20" fill="#dbeafe"/>
    <text x="20" y="176" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#2563eb" text-anchor="middle">→</text>
  </g>

  <!-- Right Card: AI Governance Ladder -->
  <g transform="translate(640, 45)" filter="url(#shadow)">
    <rect width="500" height="420" rx="20" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
    <text x="250" y="60" font-family="Arial, Segoe UI, Tahoma, sans-serif" font-size="24" font-weight="800" fill="#0f172a" text-anchor="middle">סולם בקרת בינה מלאכותית</text>
    <text x="250" y="88" font-family="Arial, Segoe UI, Tahoma, sans-serif" font-size="14" font-weight="600" fill="#64748b" text-anchor="middle">רמות אימות לפי השפעת התוצר והסיכון העסקי</text>

    <!-- Tier 3 -->
    <g transform="translate(50, 130)">
      <rect x="90" y="0" width="320" height="52" rx="14" fill="#1e1b4b"/>
      <text x="250" y="32" font-family="Arial, Segoe UI, Tahoma, sans-serif" font-size="15" font-weight="700" fill="#ffffff" text-anchor="middle">Tier 3 • דירקטוריון ודיווח חיצוני</text>
    </g>

    <!-- Tier 2 -->
    <g transform="translate(50, 215)">
      <rect x="50" y="0" width="360" height="52" rx="14" fill="#2563eb"/>
      <text x="230" y="32" font-family="Arial, Segoe UI, Tahoma, sans-serif" font-size="15" font-weight="700" fill="#ffffff" text-anchor="middle">Tier 2 • אימות חשב / CFO (הסברים ותחזיות)</text>
    </g>

    <!-- Tier 1 -->
    <g transform="translate(50, 300)">
      <rect x="0" y="0" width="410" height="52" rx="14" fill="#7dd3fc"/>
      <text x="205" y="32" font-family="Arial, Segoe UI, Tahoma, sans-serif" font-size="15" font-weight="700" fill="#0f172a" text-anchor="middle">Tier 1 • בדיקת מכין עצמית (ניסוח וטיוטות)</text>
    </g>
  </g>

  <!-- Footer Brand -->
  <g transform="translate(0, 500)">
    <line x1="60" y1="0" x2="1140" y2="0" stroke="#e2e8f0" stroke-width="1.5"/>
    <text x="600" y="36" font-family="Arial, Segoe UI, Tahoma, sans-serif" font-size="14" font-weight="bold" fill="#64748b" text-anchor="middle">רונן עמוס רו״ח • קהילת AI Finance Transformation • ronenamoscpa.co.il</text>
  </g>
</svg>
`;

// Diagram 2: The One-Page Structure
const onePageSvg = `
<svg width="800" height="920" viewBox="0 0 800 920" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#f1f5f9"/>
    </linearGradient>
    <filter id="cardShadow" x="-10%" y="-5%" width="120%" height="115%">
      <feDropShadow dx="0" dy="6" stdDeviation="12" flood-color="#0f172a" flood-opacity="0.08"/>
    </filter>
  </defs>

  <rect width="800" height="920" fill="url(#bgGrad2)"/>
  <rect width="800" height="5" fill="#0d9488"/>

  <!-- Top Title -->
  <text x="400" y="65" font-family="Arial, Segoe UI, Tahoma, sans-serif" font-size="30" font-weight="900" fill="#0f172a" text-anchor="middle">מבנה עמוד אחד שמקבל ״כן״ מההנהלה</text>
  <text x="400" y="100" font-family="Arial, Segoe UI, Tahoma, sans-serif" font-size="16" font-weight="600" fill="#64748b" text-anchor="middle">The One-Page Structure That Gets a Yes — הצגת תוכנית AI ל-CEO / דירקטוריון</text>

  <!-- Sheet Container -->
  <g transform="translate(70, 135)" filter="url(#cardShadow)">
    <rect width="660" height="690" rx="16" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
    
    <!-- Top Sheet Header Bar -->
    <rect x="40" y="35" width="340" height="18" rx="9" fill="#0f172a"/>
    <rect x="40" y="65" width="220" height="10" rx="5" fill="#cbd5e1"/>
    <line x1="40" y1="95" x2="620" y2="95" stroke="#f1f5f9" stroke-width="2"/>

    <!-- Section 01 -->
    <g transform="translate(40, 120)">
      <rect width="580" height="105" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
      <circle cx="48" cy="38" r="24" fill="#38bdf8"/>
      <text x="48" y="44" font-family="Arial, sans-serif" font-size="16" font-weight="900" fill="#ffffff" text-anchor="middle">01</text>
      
      <text x="90" y="36" font-family="Arial, Segoe UI, Tahoma, sans-serif" font-size="19" font-weight="800" fill="#0f172a">מה כבר קורה בארגון כיום (What is already happening)</text>
      <text x="90" y="64" font-family="Arial, Segoe UI, Tahoma, sans-serif" font-size="14" font-weight="500" fill="#475569">מיפוי עובדתי: עובדים כבר משתמשים בכלים פרטיים • יש לחסום דלף מידע ולהסדיר רישוי עסקי</text>
    </g>

    <!-- Section 02 -->
    <g transform="translate(40, 245)">
      <rect width="580" height="105" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
      <circle cx="48" cy="38" r="24" fill="#0284c7"/>
      <text x="48" y="44" font-family="Arial, sans-serif" font-size="16" font-weight="900" fill="#ffffff" text-anchor="middle">02</text>
      
      <text x="90" y="36" font-family="Arial, Segoe UI, Tahoma, sans-serif" font-size="19" font-weight="800" fill="#0f172a">מה אני מציע לפיילוט (What I propose)</text>
      <text x="90" y="64" font-family="Arial, Segoe UI, Tahoma, sans-serif" font-size="14" font-weight="500" fill="#475569">פיילוט ממוקד לתהליך חוזר בודד (למשל: טיוטת הסבר לסטיות רווחיות) עם מקורות נתונים מאומתים</text>
    </g>

    <!-- Section 03 -->
    <g transform="translate(40, 370)">
      <rect width="580" height="105" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
      <circle cx="48" cy="38" r="24" fill="#2563eb"/>
      <text x="48" y="44" font-family="Arial, sans-serif" font-size="16" font-weight="900" fill="#ffffff" text-anchor="middle">03</text>
      
      <text x="90" y="36" font-family="Arial, Segoe UI, Tahoma, sans-serif" font-size="19" font-weight="800" fill="#0f172a">שלוש החלטות שאני צריך מההנהלה (Three decisions I need)</text>
      <text x="90" y="64" font-family="Arial, Segoe UI, Tahoma, sans-serif" font-size="14" font-weight="500" fill="#475569">1. בעלות על המדיניות  |  2. סיווג מידע מותר/אסור  |  3. אישור כלי מאובטח ותקציב רישוי</text>
    </g>

    <!-- Section 04 -->
    <g transform="translate(40, 495)">
      <rect width="580" height="105" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
      <circle cx="48" cy="38" r="24" fill="#1e1b4b"/>
      <text x="48" y="44" font-family="Arial, sans-serif" font-size="16" font-weight="900" fill="#ffffff" text-anchor="middle">04</text>
      
      <text x="90" y="36" font-family="Arial, Segoe UI, Tahoma, sans-serif" font-size="19" font-weight="800" fill="#0f172a">מה אדווח בעוד 90 יום (What I will report in 90 days)</text>
      <text x="90" y="64" font-family="Arial, Segoe UI, Tahoma, sans-serif" font-size="14" font-weight="500" fill="#475569">מדדים קשיחים: שעות נטו שנחסכו, איכות ודיוק התוצרים, תקלות שטופלו והמלצת המשך/הרחבה</text>
    </g>
  </g>

  <!-- Footer Brand -->
  <g transform="translate(0, 855)">
    <line x1="70" y1="0" x2="730" y2="0" stroke="#e2e8f0" stroke-width="1.5"/>
    <text x="400" y="38" font-family="Arial, Segoe UI, Tahoma, sans-serif" font-size="13" font-weight="bold" fill="#64748b" text-anchor="middle">רונן עמוס רו״ח • קהילת AI Finance Transformation • ronenamoscpa.co.il</text>
  </g>
</svg>
`;

async function generate() {
  await sharp(Buffer.from(matrixSvg))
    .png()
    .toFile('public/images/blog/ai-governance-finance-matrix.png');
  console.log('Generated ai-governance-finance-matrix.png');

  await sharp(Buffer.from(onePageSvg))
    .png()
    .toFile('public/images/blog/ai-governance-finance-one-page.png');
  console.log('Generated ai-governance-finance-one-page.png');
}

generate();
