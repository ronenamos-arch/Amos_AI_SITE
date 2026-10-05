import sharp from 'sharp';

// Switch 4: Context Condensation Diagram
const switch4Svg = `
<svg width="1200" height="520" viewBox="0 0 1200 520" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="s4bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="60%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#f1f5f9"/>
    </linearGradient>
    <filter id="shadow4" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0f172a" flood-opacity="0.06"/>
    </filter>
  </defs>

  <rect width="1200" height="520" fill="url(#s4bg)"/>
  <rect width="1200" height="5" fill="#8b5cf6"/>

  <!-- Badge & Header -->
  <g transform="translate(430, 25)">
    <rect width="340" height="32" rx="16" fill="#f5f3ff" stroke="#8b5cf6" stroke-width="1.5"/>
    <text x="170" y="21" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="bold" fill="#6d28d9" text-anchor="middle">SWITCH 4 • CONTEXT CONDENSER</text>
  </g>

  <text x="600" y="90" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="800" fill="#0f172a" text-anchor="middle">מתג 4: תהליך דחיסת קונטקסט ומעבר לצ'אט נקי</text>
  <text x="600" y="122" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="500" fill="#64748b" text-anchor="middle">שלושת השלבים לשמירה על חדות המודל ואיפוס צריכת הטוקנים</text>

  <!-- Step 1 Card -->
  <g transform="translate(60, 150)" filter="url(#shadow4)">
    <rect width="320" height="290" rx="14" fill="#ffffff" stroke="#ef4444" stroke-width="2"/>
    <rect x="20" y="20" width="85" height="26" rx="13" fill="#fee2e2"/>
    <text x="62" y="38" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#b91c1c" text-anchor="middle">שלב 1</text>
    
    <text x="160" y="82" font-family="system-ui, sans-serif" font-size="19" font-weight="bold" fill="#991b1b" text-anchor="middle">שיחה ממושכת וכבדה</text>
    <line x1="25" y1="100" x2="295" y2="100" stroke="#fecaca" stroke-width="1.5"/>
    
    <text x="160" y="135" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">מעל 15 סבבי שאלות ותשובות</text>
    <text x="160" y="168" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">צריכה של 50,000+ טוקנים</text>
    <text x="160" y="201" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">ירידה בחדות ואיבוד הנחיות</text>

    <rect x="20" y="232" width="280" height="38" rx="8" fill="#fef2f2"/>
    <text x="160" y="256" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#b91c1c" text-anchor="middle">המודל מתחיל לפספס פרטים</text>
  </g>

  <!-- Arrow 1 -->
  <g transform="translate(395, 275)">
    <circle cx="15" cy="0" r="18" fill="#ede9fe"/>
    <text x="15" y="7" font-family="system-ui, sans-serif" font-size="18" font-weight="bold" fill="#6d28d9" text-anchor="middle">→</text>
  </g>

  <!-- Step 2 Card -->
  <g transform="translate(440, 150)" filter="url(#shadow4)">
    <rect width="320" height="290" rx="14" fill="#ffffff" stroke="#8b5cf6" stroke-width="2"/>
    <rect x="20" y="20" width="85" height="26" rx="13" fill="#ede9fe"/>
    <text x="62" y="38" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#6d28d9" text-anchor="middle">שלב 2</text>
    
    <text x="160" y="82" font-family="system-ui, sans-serif" font-size="19" font-weight="bold" fill="#6d28d9" text-anchor="middle">פרומפט דחיסה וזיקוק</text>
    <line x1="25" y1="100" x2="295" y2="100" stroke="#ddd6fe" stroke-width="1.5"/>
    
    <text x="160" y="135" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">הפעלת פרומפט סיכום תמציתי</text>
    <text x="160" y="168" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">חילוץ החלטות ומספרים בלבד</text>
    <text x="160" y="201" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">השמטת שאלות רקע מיותרות</text>

    <rect x="20" y="232" width="280" height="38" rx="8" fill="#faf5ff"/>
    <text x="160" y="256" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#6d28d9" text-anchor="middle">זיקוק המידע ל-500 טוקנים נקיים</text>
  </g>

  <!-- Arrow 2 -->
  <g transform="translate(775, 275)">
    <circle cx="15" cy="0" r="18" fill="#d1fae5"/>
    <text x="15" y="7" font-family="system-ui, sans-serif" font-size="18" font-weight="bold" fill="#047857" text-anchor="middle">→</text>
  </g>

  <!-- Step 3 Card -->
  <g transform="translate(820, 150)" filter="url(#shadow4)">
    <rect width="320" height="290" rx="14" fill="#ffffff" stroke="#10b981" stroke-width="2"/>
    <rect x="20" y="20" width="85" height="26" rx="13" fill="#d1fae5"/>
    <text x="62" y="38" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#047857" text-anchor="middle">שלב 3</text>
    
    <text x="160" y="82" font-family="system-ui, sans-serif" font-size="19" font-weight="bold" fill="#047857" text-anchor="middle">פתיחת צ'אט נקי</text>
    <line x1="25" y1="100" x2="295" y2="100" stroke="#a7f3d0" stroke-width="1.5"/>
    
    <text x="160" y="135" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">הדבקת הסיכום בפרומפט הראשון</text>
    <text x="160" y="168" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">מהירות תגובה גבוהה פי 3</text>
    <text x="160" y="201" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">דיוק מקסימלי ללא שאריות עבר</text>

    <rect x="20" y="232" width="280" height="38" rx="8" fill="#ecfdf5"/>
    <text x="160" y="256" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#047857" text-anchor="middle">אפס זיהום קונטקסט ודיוק מושלם</text>
  </g>

  <!-- Footer -->
  <text x="600" y="485" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#94a3b8" text-anchor="middle">רונן עמוס רו״ח • קהילת AI Finance Transformation • ronenamoscpa.co.il</text>
</svg>
`;

// Switch 5: Projects & RAG Storage Diagram (Redesigned & Pristine Hebrew Layout)
const switch5Svg = `
<svg width="1200" height="560" viewBox="0 0 1200 560" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="s5bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="60%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#f1f5f9"/>
    </linearGradient>
    <filter id="shadow5" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0f172a" flood-opacity="0.06"/>
    </filter>
  </defs>

  <rect width="1200" height="560" fill="url(#s5bg)"/>
  <rect width="1200" height="5" fill="#ec4899"/>

  <!-- Badge & Header -->
  <g transform="translate(420, 25)">
    <rect width="360" height="32" rx="16" fill="#fdf2f8" stroke="#ec4899" stroke-width="1.5"/>
    <text x="180" y="21" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="bold" fill="#be185d" text-anchor="middle">SWITCH 5 • PROJECTS &amp; KNOWLEDGE</text>
  </g>

  <text x="600" y="90" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="800" fill="#0f172a" text-anchor="middle">מתג 5: העלאה חוזרת מול סביבות עבודה מבוססות Projects</text>
  <text x="600" y="122" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="500" fill="#64748b" text-anchor="middle">כיצד אחזור מידע ממוקד (RAG) חוסך עשרות אלפי טוקנים בכל יום עבודה</text>

  <!-- Left Card: Wrong approach (Repeated Uploads) -->
  <g transform="translate(80, 155)" filter="url(#shadow5)">
    <rect width="490" height="330" rx="16" fill="#ffffff" stroke="#ef4444" stroke-width="2"/>
    <rect x="25" y="20" width="130" height="28" rx="14" fill="#fee2e2"/>
    <text x="90" y="39" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#b91c1c" text-anchor="middle">✗ שיטה בזבזנית</text>
    
    <text x="245" y="85" font-family="system-ui, sans-serif" font-size="22" font-weight="bold" fill="#991b1b" text-anchor="middle">העלאה ידנית חוזרת בכל שיחה</text>
    <line x1="30" y1="105" x2="460" y2="105" stroke="#fecaca" stroke-width="1.5"/>

    <text x="245" y="145" font-family="system-ui, sans-serif" font-size="15" font-weight="600" fill="#334155" text-anchor="middle">• העלאת ספר חשבונות ונהלים בכל צ'אט מחדש</text>
    <text x="245" y="185" font-family="system-ui, sans-serif" font-size="15" font-weight="600" fill="#334155" text-anchor="middle">• כל תוכן הקובץ נקרא מחדש בכל שאילתה</text>
    <text x="245" y="225" font-family="system-ui, sans-serif" font-size="15" font-weight="600" fill="#334155" text-anchor="middle">• שריפת טוקנים מסיבית והגעה למגבלת שימוש</text>

    <rect x="30" y="255" width="430" height="50" rx="10" fill="#fef2f2" stroke="#fca5a5" stroke-width="1"/>
    <text x="245" y="286" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#b91c1c" text-anchor="middle">תוצאה: בזבוז זמן צוות ועלויות עתק</text>
  </g>

  <!-- Right Card: Projects RAG Architecture -->
  <g transform="translate(630, 155)" filter="url(#shadow5)">
    <rect width="490" height="330" rx="16" fill="#ffffff" stroke="#0d9488" stroke-width="2"/>
    <rect x="25" y="20" width="130" height="28" rx="14" fill="#ccfbf1"/>
    <text x="90" y="39" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#0f766e" text-anchor="middle">✓ שיטה מומלצת</text>
    
    <text x="245" y="85" font-family="system-ui, sans-serif" font-size="22" font-weight="bold" fill="#0f766e" text-anchor="middle">סביבת פרויקט עם אחזור RAG חכם</text>
    <line x1="30" y1="105" x2="460" y2="105" stroke="#99f6e4" stroke-width="1.5"/>

    <text x="245" y="145" font-family="system-ui, sans-serif" font-size="15" font-weight="600" fill="#334155" text-anchor="middle">• העלאת קובצי Markdown פעם אחת לסביבת הפרויקט</text>
    <text x="245" y="185" font-family="system-ui, sans-serif" font-size="15" font-weight="600" fill="#334155" text-anchor="middle">• המודל מאנדקס ושואב רק את הסעיף הרלוונטי</text>
    <text x="245" y="225" font-family="system-ui, sans-serif" font-size="15" font-weight="600" fill="#334155" text-anchor="middle">• שמירה על קונטקסט נקי, מהיר וחסכוני</text>

    <rect x="30" y="255" width="430" height="50" rx="10" fill="#f0fdfa" stroke="#5eead4" stroke-width="1"/>
    <text x="245" y="286" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#0f766e" text-anchor="middle">תוצאה: חיסכון של 90% בעלויות ואחזור מדויק</text>
  </g>

  <!-- Footer -->
  <text x="600" y="525" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#94a3b8" text-anchor="middle">רונן עמוס רו״ח • קהילת AI Finance Transformation • ronenamoscpa.co.il</text>
</svg>
`;

async function run() {
  await sharp(Buffer.from(switch4Svg))
    .png()
    .toFile('public/images/blog/5-smart-switches-ai-finance-switch4-fresh-chat.png');

  await sharp(Buffer.from(switch5Svg))
    .png()
    .toFile('public/images/blog/5-smart-switches-ai-finance-switch5-projects-rag.png');

  console.log('Re-generated Switch 4 and Switch 5 diagrams with clean Hebrew typography');
}

run().catch(console.error);
