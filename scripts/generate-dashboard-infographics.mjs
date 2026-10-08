import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const outputDir = path.resolve('public/images/blog');
fs.mkdirSync(outputDir, { recursive: true });

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
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0f172a" flood-opacity="0.06"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bgGrad)"/>
  <rect width="1200" height="6" fill="#0d9488"/>

  <!-- Top Badge -->
  <g transform="translate(390, 25)">
    <rect width="420" height="34" rx="17" fill="#f0fdfa" stroke="#0d9488" stroke-width="1.5"/>
    <text x="210" y="22" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" font-size="13" font-weight="bold" fill="#0f766e" text-anchor="middle" letter-spacing="1">AI FINANCE TRANSFORMATION • DECISION DASHBOARD</text>
  </g>

  <!-- Main Titles -->
  <text x="600" y="95" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" font-size="32" font-weight="800" fill="#0f172a" text-anchor="middle">איך לבנות AI Dashboard פיננסי שמוביל להחלטות ולא רק לגרפים</text>
  <text x="600" y="130" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" font-size="16" font-weight="500" fill="#475569" text-anchor="middle">ארבע שכבות עבודה: מילון אמת, אימות נתונים, בינה מסבירה ולולאת פעולה ניהולית</text>

  <!-- 4 Architecture Cards Grid -->
  <!-- Card 1: Single Source of Truth -->
  <g transform="translate(45, 165)" filter="url(#shadow)">
    <rect width="255" height="375" rx="14" fill="#ffffff" stroke="#0d9488" stroke-width="2"/>
    <rect x="15" y="15" width="85" height="24" rx="12" fill="#ccfbf1"/>
    <text x="57" y="31" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#0f766e" text-anchor="middle">שכבה 1</text>
    <text x="127" y="70" font-family="system-ui, sans-serif" font-size="17" font-weight="bold" fill="#0f172a" text-anchor="middle">שכבת אמת חשבונאית</text>
    <text x="127" y="92" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0d9488" text-anchor="middle">Truth Layer &amp; Data Dict</text>
    <line x1="20" y1="105" x2="235" y2="105" stroke="#e2e8f0" stroke-width="1.5"/>
    <text x="127" y="135" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#334155" text-anchor="middle">מילון נתונים אחיד ומוסכם</text>
    <text x="127" y="160" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#64748b" text-anchor="middle">הגדרת הכנסות, מועדי הכרה</text>
    <text x="127" y="195" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#334155" text-anchor="middle">איחוד מפתחות וספקים</text>
    <text x="127" y="220" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#64748b" text-anchor="middle">מניעת כפילויות ERP / CRM</text>
    <text x="127" y="255" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#334155" text-anchor="middle">חסימת תיקונים שקטים</text>
    <text x="127" y="280" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#64748b" text-anchor="middle">אין עריכה ידנית על הדשבורד</text>
    <rect x="15" y="320" width="225" height="38" rx="8" fill="#f0fdfa"/>
    <text x="127" y="343" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#0f766e" text-anchor="middle">בסיס עובדתי מוצק ללא ויכוחים</text>
  </g>

  <!-- Card 2: Freshness & Quality -->
  <g transform="translate(325, 165)" filter="url(#shadow)">
    <rect width="255" height="375" rx="14" fill="#ffffff" stroke="#0284c7" stroke-width="2"/>
    <rect x="15" y="15" width="85" height="24" rx="12" fill="#e0f2fe"/>
    <text x="57" y="31" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#0369a1" text-anchor="middle">שכבה 2</text>
    <text x="127" y="70" font-family="system-ui, sans-serif" font-size="17" font-weight="bold" fill="#0f172a" text-anchor="middle">בקרת איכות ורענון</text>
    <text x="127" y="92" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0284c7" text-anchor="middle">SLA &amp; Drill-Down</text>
    <line x1="20" y1="105" x2="235" y2="105" stroke="#e2e8f0" stroke-width="1.5"/>
    <text x="127" y="135" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#334155" text-anchor="middle">התאמת טריות להחלטה</text>
    <text x="127" y="160" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#64748b" text-anchor="middle">תזרים יומי מול סגירה קפואה</text>
    <text x="127" y="195" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#334155" text-anchor="middle">5 בדיקות איכות אוטומטיות</text>
    <text x="127" y="220" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#64748b" text-anchor="middle">שלמות, התאמה, כפילות, טווח</text>
    <text x="127" y="255" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#334155" text-anchor="middle">מסלול ירידה לפרטים</text>
    <text x="127" y="280" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#64748b" text-anchor="middle">מהנהלה ועד שורת המקור ב-GL</text>
    <rect x="15" y="320" width="225" height="38" rx="8" fill="#f0f9ff"/>
    <text x="127" y="343" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#0284c7" text-anchor="middle">זיהוי מיידי של נתון חסר</text>
  </g>

  <!-- Card 3: AI Explanation Layer -->
  <g transform="translate(605, 165)" filter="url(#shadow)">
    <rect width="255" height="375" rx="14" fill="#ffffff" stroke="#7c3aed" stroke-width="2"/>
    <rect x="15" y="15" width="85" height="24" rx="12" fill="#f3e8ff"/>
    <text x="57" y="31" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#7e22ce" text-anchor="middle">שכבה 3</text>
    <text x="127" y="70" font-family="system-ui, sans-serif" font-size="17" font-weight="bold" fill="#0f172a" text-anchor="middle">בינה שמסבירה (AI)</text>
    <text x="127" y="92" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#7c3aed" text-anchor="middle">Explain, Don't Hallucinate</text>
    <line x1="20" y1="105" x2="235" y2="105" stroke="#e2e8f0" stroke-width="1.5"/>
    <text x="127" y="135" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#334155" text-anchor="middle">ספי פעולה ולא ציונים</text>
    <text x="127" y="160" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#64748b" text-anchor="middle">חריגה מתמשכת מעל סף כספי</text>
    <text x="127" y="195" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#334155" text-anchor="middle">פלט מובנה (Structured JSON)</text>
    <text x="127" y="220" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#64748b" text-anchor="middle">חריגה, גורם, ראיה, פעולה</text>
    <text x="127" y="255" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#334155" text-anchor="middle">עקיבות לאסמכתאות מקור</text>
    <text x="127" y="280" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#64748b" text-anchor="middle">סימון השערה אם אין הוכחה</text>
    <rect x="15" y="320" width="225" height="38" rx="8" fill="#faf5ff"/>
    <text x="127" y="343" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#7e22ce" text-anchor="middle">הסברים אמינים ללא הזיות</text>
  </g>

  <!-- Card 4: Governance & Decisions -->
  <g transform="translate(885, 165)" filter="url(#shadow)">
    <rect width="255" height="375" rx="14" fill="#ffffff" stroke="#059669" stroke-width="2"/>
    <rect x="15" y="15" width="85" height="24" rx="12" fill="#d1fae5"/>
    <text x="57" y="31" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#047857" text-anchor="middle">שכבה 4</text>
    <text x="127" y="70" font-family="system-ui, sans-serif" font-size="17" font-weight="bold" fill="#0f172a" text-anchor="middle">ממשל ניהולי והרשאות</text>
    <text x="127" y="92" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#059669" text-anchor="middle">Role Views &amp; Governance</text>
    <line x1="20" y1="105" x2="235" y2="105" stroke="#e2e8f0" stroke-width="1.5"/>
    <text x="127" y="135" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#334155" text-anchor="middle">תצוגות מותאמות תפקיד</text>
    <text x="127" y="160" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#64748b" text-anchor="middle">CFO, FP&amp;A, גבייה, שכר, חשב</text>
    <text x="127" y="195" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#334155" text-anchor="middle">הרשאות שורה (RLS)</text>
    <text x="127" y="220" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#64748b" text-anchor="middle">הגבלת שכר וספקים לבעלי עניין</text>
    <text x="127" y="255" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#334155" text-anchor="middle">לולאת אימות החלטות</text>
    <text x="127" y="280" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#64748b" text-anchor="middle">בדיקה האם התוצאה השתפרה</text>
    <rect x="15" y="320" width="225" height="38" rx="8" fill="#ecfdf5"/>
    <text x="127" y="343" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#059669" text-anchor="middle">קיצור הזמן להחלטה אמינה</text>
  </g>

  <!-- Bottom Footer Bar -->
  <g transform="translate(0, 565)">
    <rect width="1200" height="65" fill="#f8fafc"/>
    <line x1="0" y1="0" x2="1200" y2="0" stroke="#e2e8f0" stroke-width="1.5"/>
    <text x="600" y="40" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#64748b" text-anchor="middle">רונן עמוס רו״ח • קהילת AI Finance Transformation • ronenamoscpa.co.il</text>
  </g>
</svg>
`;

// 2. Decision Framework Diagram (1000x520)
const decisionFlowSvg = `
<svg width="1000" height="520" viewBox="0 0 1000 520" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f8fafc"/>
    </linearGradient>
    <filter id="shadow2" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="3" stdDeviation="5" flood-color="#0f172a" flood-opacity="0.06"/>
    </filter>
  </defs>

  <rect width="1000" height="520" fill="url(#bgGrad2)"/>
  <rect width="1000" height="5" fill="#0284c7"/>

  <!-- Title -->
  <text x="500" y="55" font-family="system-ui, sans-serif" font-size="24" font-weight="bold" fill="#0f172a" text-anchor="middle">לולאת ההחלטה הפיננסית: מנתון אמין לפעולה מתועדת</text>
  <text x="500" y="85" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#64748b" text-anchor="middle">איך AI Dashboard סוגר את הפער בין איתור חריגה לפעולה בשטח</text>

  <!-- Flow Steps -->
  <!-- Step 1 -->
  <g transform="translate(60, 130)" filter="url(#shadow2)">
    <rect width="160" height="280" rx="12" fill="#ffffff" stroke="#0d9488" stroke-width="2"/>
    <rect x="15" y="15" width="130" height="30" rx="6" fill="#ccfbf1"/>
    <text x="80" y="35" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#0f766e" text-anchor="middle">1. האות (Signal)</text>
    <text x="80" y="85" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#0f172a" text-anchor="middle">חריגה מוגדרת</text>
    <text x="80" y="115" font-family="system-ui, sans-serif" font-size="12" fill="#475569" text-anchor="middle">פער מתמשך מול תקציב</text>
    <text x="80" y="145" font-family="system-ui, sans-serif" font-size="12" fill="#475569" text-anchor="middle">סיכון נזילות או גבייה</text>
    <text x="80" y="175" font-family="system-ui, sans-serif" font-size="12" fill="#475569" text-anchor="middle">חריגת שכר לא מאושרת</text>
    <line x1="20" y1="210" x2="140" y2="210" stroke="#e2e8f0" stroke-width="1"/>
    <text x="80" y="240" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#0d9488" text-anchor="middle">סף מוגדר מראש</text>
  </g>

  <text x="235" y="275" font-family="system-ui, sans-serif" font-size="24" font-weight="bold" fill="#0d9488" text-anchor="middle">→</text>

  <!-- Step 2 -->
  <g transform="translate(250, 130)" filter="url(#shadow2)">
    <rect width="160" height="280" rx="12" fill="#ffffff" stroke="#0284c7" stroke-width="2"/>
    <rect x="15" y="15" width="130" height="30" rx="6" fill="#e0f2fe"/>
    <text x="80" y="35" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#0369a1" text-anchor="middle">2. פירוק (Drill-Down)</text>
    <text x="80" y="85" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#0f172a" text-anchor="middle">נתיב חקירה</text>
    <text x="80" y="115" font-family="system-ui, sans-serif" font-size="12" fill="#475569" text-anchor="middle">מהנהלה למחלקה</text>
    <text x="80" y="145" font-family="system-ui, sans-serif" font-size="12" fill="#475569" text-anchor="middle">מחשבון למסמך</text>
    <text x="80" y="175" font-family="system-ui, sans-serif" font-size="12" fill="#475569" text-anchor="middle">לשורת המקור ב-ERP</text>
    <line x1="20" y1="210" x2="140" y2="210" stroke="#e2e8f0" stroke-width="1"/>
    <text x="80" y="240" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#0284c7" text-anchor="middle">זיהוי מוקד הבעיה</text>
  </g>

  <text x="425" y="275" font-family="system-ui, sans-serif" font-size="24" font-weight="bold" fill="#0284c7" text-anchor="middle">→</text>

  <!-- Step 3 -->
  <g transform="translate(440, 130)" filter="url(#shadow2)">
    <rect width="160" height="280" rx="12" fill="#ffffff" stroke="#7c3aed" stroke-width="2"/>
    <rect x="15" y="15" width="130" height="30" rx="6" fill="#f3e8ff"/>
    <text x="80" y="35" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#7e22ce" text-anchor="middle">3. הסבר (AI Context)</text>
    <text x="80" y="85" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#0f172a" text-anchor="middle">ניתוח סיבתי</text>
    <text x="80" y="115" font-family="system-ui, sans-serif" font-size="12" fill="#475569" text-anchor="middle">סיכום פער עובדתי</text>
    <text x="80" y="145" font-family="system-ui, sans-serif" font-size="12" fill="#475569" text-anchor="middle">סיווג גורם מתוך רשימה</text>
    <text x="80" y="175" font-family="system-ui, sans-serif" font-size="12" fill="#475569" text-anchor="middle">הצגת ראיות ומקור</text>
    <line x1="20" y1="210" x2="140" y2="210" stroke="#e2e8f0" stroke-width="1"/>
    <text x="80" y="240" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#7c3aed" text-anchor="middle">ללא המצאות</text>
  </g>

  <text x="615" y="275" font-family="system-ui, sans-serif" font-size="24" font-weight="bold" fill="#7c3aed" text-anchor="middle">→</text>

  <!-- Step 4 -->
  <g transform="translate(630, 130)" filter="url(#shadow2)">
    <rect width="160" height="280" rx="12" fill="#ffffff" stroke="#ea580c" stroke-width="2"/>
    <rect x="15" y="15" width="130" height="30" rx="6" fill="#ffedd5"/>
    <text x="80" y="35" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#c2410c" text-anchor="middle">4. פעולה (Action)</text>
    <text x="80" y="85" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#0f172a" text-anchor="middle">בעל החלטה מוגדר</text>
    <text x="80" y="115" font-family="system-ui, sans-serif" font-size="12" fill="#475569" text-anchor="middle">עדכון תחזית מזומן</text>
    <text x="80" y="145" font-family="system-ui, sans-serif" font-size="12" fill="#475569" text-anchor="middle">עצירת שידור שכר</text>
    <text x="80" y="175" font-family="system-ui, sans-serif" font-size="12" fill="#475569" text-anchor="middle">שיחת גבייה מתועדפת</text>
    <line x1="20" y1="210" x2="140" y2="210" stroke="#e2e8f0" stroke-width="1"/>
    <text x="80" y="240" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#ea580c" text-anchor="middle">זמן תגובה מוגדר</text>
  </g>

  <text x="805" y="275" font-family="system-ui, sans-serif" font-size="24" font-weight="bold" fill="#ea580c" text-anchor="middle">→</text>

  <!-- Step 5 -->
  <g transform="translate(820, 130)" filter="url(#shadow2)">
    <rect width="140" height="280" rx="12" fill="#ffffff" stroke="#059669" stroke-width="2"/>
    <rect x="10" y="15" width="120" height="30" rx="6" fill="#d1fae5"/>
    <text x="70" y="35" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#047857" text-anchor="middle">5. אימות (Verify)</text>
    <text x="70" y="85" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#0f172a" text-anchor="middle">מדידת השפעה</text>
    <text x="70" y="115" font-family="system-ui, sans-serif" font-size="12" fill="#475569" text-anchor="middle">זמן תגובה קוצר?</text>
    <text x="70" y="145" font-family="system-ui, sans-serif" font-size="12" fill="#475569" text-anchor="middle">הגבייה השתפרה?</text>
    <text x="70" y="175" font-family="system-ui, sans-serif" font-size="12" fill="#475569" text-anchor="middle">ההחלטה תועדה?</text>
    <line x1="15" y1="210" x2="125" y2="210" stroke="#e2e8f0" stroke-width="1"/>
    <text x="70" y="240" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#059669" text-anchor="middle">לולאת משוב</text>
  </g>

  <!-- Watermark -->
  <text x="500" y="475" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#94a3b8" text-anchor="middle">רונן עמוס רו״ח • קהילת AI Finance Transformation • ronenamoscpa.co.il</text>
</svg>
`;

async function run() {
  console.log('Rendering header infographic...');
  await sharp(Buffer.from(headerSvg))
    .png()
    .toFile(path.join(outputDir, 'ai-financial-dashboard-better-decisions-header.png'));

  console.log('Rendering decision loop infographic...');
  await sharp(Buffer.from(decisionFlowSvg))
    .png()
    .toFile(path.join(outputDir, 'ai-financial-dashboard-decision-loop.png'));

  console.log('All infographics generated successfully!');
}

run().catch(console.error);
