import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const outputDir = path.resolve('public/images/blog');
fs.mkdirSync(outputDir, { recursive: true });

// 1. Header Infographic
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
  <g transform="translate(410, 25)">
    <rect width="380" height="34" rx="17" fill="#f0fdfa" stroke="#0d9488" stroke-width="1.5"/>
    <text x="190" y="22" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="bold" fill="#0f766e" text-anchor="middle" letter-spacing="1">AI FINANCE TRANSFORMATION • LEADERSHIP</text>
  </g>

  <!-- Main Titles -->
  <text x="600" y="95" font-family="system-ui, -apple-system, sans-serif" font-size="32" font-weight="800" fill="#0f172a" text-anchor="middle">חמש ההחלטות הניהוליות שהופכות מחלקת כספים לאוטונומית</text>
  <text x="600" y="130" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="500" fill="#475569" text-anchor="middle">מדריך מעשי לסמנכ"לי כספים, מנהלי FP&amp;A ורואי חשבון: משינוי תפיסה ועד סוכנים חכמים</text>

  <!-- 5 Decision Cards Grid -->
  <!-- Card 1 -->
  <g transform="translate(35, 160)" filter="url(#shadow)">
    <rect width="215" height="380" rx="14" fill="#ffffff" stroke="#0d9488" stroke-width="2"/>
    <rect x="15" y="15" width="75" height="24" rx="12" fill="#ccfbf1"/>
    <text x="52" y="31" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#0f766e" text-anchor="middle">החלטה 1</text>
    <text x="107" y="70" font-family="system-ui, sans-serif" font-size="17" font-weight="bold" fill="#0f172a" text-anchor="middle">המנהיג בונה ראשון</text>
    <text x="107" y="92" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0d9488" text-anchor="middle">Lead by Building</text>
    <line x1="20" y1="105" x2="195" y2="105" stroke="#e2e8f0" stroke-width="1.5"/>
    <text x="107" y="135" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#334155" text-anchor="middle">בניית 3 תהליכים בעצמך</text>
    <text x="107" y="158" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#64748b" text-anchor="middle">דוחות הכנסות, סריקה ותזרים</text>
    <text x="107" y="195" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#334155" text-anchor="middle">הדגמת תהליך פתוח לצוות</text>
    <text x="107" y="230" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#334155" text-anchor="middle">פתיחת ערוץ בינה מלאכותית</text>
    <rect x="15" y="325" width="185" height="38" rx="8" fill="#f0fdfa"/>
    <text x="107" y="348" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#0f766e" text-anchor="middle">דוגמה אישית במקום הרצאות</text>
  </g>

  <!-- Card 2 -->
  <g transform="translate(265, 160)" filter="url(#shadow)">
    <rect width="215" height="380" rx="14" fill="#ffffff" stroke="#0284c7" stroke-width="2"/>
    <rect x="15" y="15" width="75" height="24" rx="12" fill="#e0f2fe"/>
    <text x="52" y="31" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#0369a1" text-anchor="middle">החלטה 2</text>
    <text x="107" y="70" font-family="system-ui, sans-serif" font-size="17" font-weight="bold" fill="#0f172a" text-anchor="middle">אפס חסמים ותמרוץ</text>
    <text x="107" y="92" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0284c7" text-anchor="middle">Output over Tokens</text>
    <line x1="20" y1="105" x2="195" y2="105" stroke="#e2e8f0" stroke-width="1.5"/>
    <text x="107" y="135" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#334155" text-anchor="middle">חשבון ארגוני מוגן ומאובטח</text>
    <text x="107" y="158" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#64748b" text-anchor="middle">אפס שמירת מידע לאימון</text>
    <text x="107" y="195" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#334155" text-anchor="middle">ללא הגבלת מכסות שימוש</text>
    <text x="107" y="230" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#334155" text-anchor="middle">בונוסים על אוטומציה וסקילים</text>
    <rect x="15" y="325" width="185" height="38" rx="8" fill="#f0f9ff"/>
    <text x="107" y="348" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#0284c7" text-anchor="middle">תגמול על כלים שמשתפים</text>
  </g>

  <!-- Card 3 -->
  <g transform="translate(495, 160)" filter="url(#shadow)">
    <rect width="215" height="380" rx="14" fill="#ffffff" stroke="#6366f1" stroke-width="2"/>
    <rect x="15" y="15" width="75" height="24" rx="12" fill="#e0e7ff"/>
    <text x="52" y="31" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#4338ca" text-anchor="middle">החלטה 3</text>
    <text x="107" y="70" font-family="system-ui, sans-serif" font-size="17" font-weight="bold" fill="#0f172a" text-anchor="middle">משמעת הנדסית</text>
    <text x="107" y="92" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#6366f1" text-anchor="middle">Engineering Rigor</text>
    <line x1="20" y1="105" x2="195" y2="105" stroke="#e2e8f0" stroke-width="1.5"/>
    <text x="107" y="135" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#334155" text-anchor="middle">ספריית סקילים מסודרת בגיט</text>
    <text x="107" y="158" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#64748b" text-anchor="middle">קובצי הקשר ובקרת גרסאות</text>
    <text x="107" y="195" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#334155" text-anchor="middle">אינקובציה לפני סטנדרט</text>
    <text x="107" y="230" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#334155" text-anchor="middle">הרצה על תקופות סגורות</text>
    <rect x="15" y="325" width="185" height="38" rx="8" fill="#eef2ff"/>
    <text x="107" y="348" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#4338ca" text-anchor="middle">בקרת איכות ואימות עמיתים</text>
  </g>

  <!-- Card 4 -->
  <g transform="translate(725, 160)" filter="url(#shadow)">
    <rect width="215" height="380" rx="14" fill="#ffffff" stroke="#8b5cf6" stroke-width="2"/>
    <rect x="15" y="15" width="75" height="24" rx="12" fill="#ede9fe"/>
    <text x="52" y="31" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#6d28d9" text-anchor="middle">החלטה 4</text>
    <text x="107" y="70" font-family="system-ui, sans-serif" font-size="17" font-weight="bold" fill="#0f172a" text-anchor="middle">שיחות קריירה אישיות</text>
    <text x="107" y="92" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#8b5cf6" text-anchor="middle">Human in the Loop</text>
    <line x1="20" y1="105" x2="195" y2="105" stroke="#e2e8f0" stroke-width="1.5"/>
    <text x="107" y="135" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#334155" text-anchor="middle">פירוק הפחד מהחלפה</text>
    <text x="107" y="158" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#64748b" text-anchor="middle">תפקידכם הוא להבטיח דיוק</text>
    <text x="107" y="195" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#334155" text-anchor="middle">הכשרת מהנדסי כספים</text>
    <text x="107" y="230" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#334155" text-anchor="middle">אנשי המקצוע חותמים ומאשרים</text>
    <rect x="15" y="325" width="185" height="38" rx="8" fill="#faf5ff"/>
    <text x="107" y="348" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#6d28d9" text-anchor="middle">הניסיון שלכם הוא מבחן המודל</text>
  </g>

  <!-- Card 5 -->
  <g transform="translate(955, 160)" filter="url(#shadow)">
    <rect width="210" height="380" rx="14" fill="#ffffff" stroke="#059669" stroke-width="2"/>
    <rect x="15" y="15" width="75" height="24" rx="12" fill="#d1fae5"/>
    <text x="52" y="31" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#047857" text-anchor="middle">החלטה 5</text>
    <text x="105" y="70" font-family="system-ui, sans-serif" font-size="17" font-weight="bold" fill="#0f172a" text-anchor="middle">סחיפת כלל הארגון</text>
    <text x="105" y="92" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#059669" text-anchor="middle">Org-Wide Scaling</text>
    <line x1="20" y1="105" x2="190" y2="105" stroke="#e2e8f0" stroke-width="1.5"/>
    <text x="105" y="135" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#334155" text-anchor="middle">מחלקת הכספים בצומת מרכזי</text>
    <text x="105" y="158" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#64748b" text-anchor="middle">חוזים, רכש, תקציב ושכר</text>
    <text x="105" y="195" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#334155" text-anchor="middle">חיבור צוותי מכירות ופיתוח</text>
    <text x="105" y="230" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#334155" text-anchor="middle">שיתוף סקילים חוצה מחלקות</text>
    <rect x="15" y="325" width="180" height="38" rx="8" fill="#ecfdf5"/>
    <text x="105" y="348" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#059669" text-anchor="middle">הכספים מובילים את החדשנות</text>
  </g>

  <!-- Bottom Footer Bar -->
  <g transform="translate(0, 565)">
    <line x1="0" y1="0" x2="1200" y2="0" stroke="#e2e8f0" stroke-width="1.5"/>
    <text x="600" y="38" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="#64748b" text-anchor="middle">רונן עמוס, רו״ח | קהילת AI Finance Transformation | ronenamoscpa.co.il</text>
  </g>
</svg>
`;

// 2. 5 Stages Infographic
const stagesSvg = `
<svg width="1200" height="720" viewBox="0 0 1200 720" xmlns="http://www.w3.org/2000/svg">
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
  <rect width="1200" height="720" fill="url(#bgGrad2)"/>
  <rect width="1200" height="6" fill="#0284c7"/>

  <!-- Top Badge -->
  <g transform="translate(420, 22)">
    <rect width="360" height="32" rx="16" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.5"/>
    <text x="180" y="21" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0369a1" text-anchor="middle" letter-spacing="1">AI MATURITY MODEL FOR FINANCE</text>
  </g>

  <!-- Main Titles -->
  <text x="600" y="85" font-family="system-ui, sans-serif" font-size="30" font-weight="800" fill="#0f172a" text-anchor="middle">חמשת שלבי הבשלות של מחלקת כספים בדרך לאוטומציה מלאה</text>
  <text x="600" y="118" font-family="system-ui, sans-serif" font-size="16" font-weight="500" fill="#475569" text-anchor="middle">מעבודה ידנית שמרנית, דרך חלונות צ'אט מבודדים, ועד סוכנים אוטונומיים עם פיקוח אנושי</text>

  <!-- Progress Track -->
  <g transform="translate(50, 140)">
    <line x1="70" y1="20" x2="1030" y2="20" stroke="#cbd5e1" stroke-width="4" stroke-dasharray="8 6"/>
    <line x1="70" y1="20" x2="840" y2="20" stroke="#0d9488" stroke-width="4"/>
    
    <!-- Dots & Stage Indicators -->
    <circle cx="70" cy="20" r="10" fill="#64748b"/>
    <circle cx="310" cy="20" r="10" fill="#0284c7"/>
    <circle cx="550" cy="20" r="10" fill="#6366f1"/>
    <circle cx="790" cy="20" r="10" fill="#8b5cf6"/>
    <circle cx="1030" cy="20" r="14" fill="#0d9488" stroke="#ccfbf1" stroke-width="4"/>

    <text x="70" y="45" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#64748b" text-anchor="middle">עשייה ידנית</text>
    <text x="1030" y="48" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#0d9488" text-anchor="middle">קבלת החלטות</text>
  </g>

  <!-- 5 Columns -->
  <!-- Column 0: Manual -->
  <g transform="translate(30, 205)" filter="url(#shadow2)">
    <rect width="216" height="430" rx="14" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5"/>
    <rect x="15" y="15" width="80" height="24" rx="12" fill="#f1f5f9"/>
    <text x="55" y="31" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#475569" text-anchor="middle">שלב 0</text>
    <text x="108" y="70" font-family="system-ui, sans-serif" font-size="18" font-weight="bold" fill="#0f172a" text-anchor="middle">ידני לחלוטין</text>
    <text x="108" y="92" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#64748b" text-anchor="middle">סגירה כמו בעבר</text>
    <line x1="15" y1="105" x2="201" y2="105" stroke="#e2e8f0" stroke-width="1.5"/>
    
    <text x="108" y="130" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">כלים מובילים</text>
    <text x="108" y="150" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#475569" text-anchor="middle">Excel, Outlook, ERP ידני</text>
    
    <text x="108" y="185" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">שגרת היום יום</text>
    <text x="108" y="205" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#475569" text-anchor="middle">עושים הכל בידיים</text>
    <text x="108" y="223" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#475569" text-anchor="middle">העתק הדבק ידני מהמערכת</text>
    
    <text x="108" y="258" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">הצעד הבא להתקדמות</text>
    <text x="108" y="278" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#475569" text-anchor="middle">ייצוא נתונים מובנה ונקי</text>
    <text x="108" y="296" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#475569" text-anchor="middle">תיעוד תהליכי סגירה</text>
    <text x="108" y="314" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#475569" text-anchor="middle">מינוי מוביל חדשנות ראשון</text>
    
    <rect x="15" y="380" width="186" height="34" rx="8" fill="#f8fafc"/>
    <text x="108" y="402" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#475569" text-anchor="middle">כ-5% מהצוותים</text>
  </g>

  <!-- Column 1: Chat -->
  <g transform="translate(260, 205)" filter="url(#shadow2)">
    <rect width="216" height="430" rx="14" fill="#ffffff" stroke="#0284c7" stroke-width="1.5"/>
    <rect x="15" y="15" width="80" height="24" rx="12" fill="#e0f2fe"/>
    <text x="55" y="31" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#0369a1" text-anchor="middle">שלב 1</text>
    <text x="108" y="70" font-family="system-ui, sans-serif" font-size="18" font-weight="bold" fill="#0f172a" text-anchor="middle">צ'אט אישי מבודד</text>
    <text x="108" y="92" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#0284c7" text-anchor="middle">חלון נפרד לכל עובד</text>
    <line x1="15" y1="105" x2="201" y2="105" stroke="#e2e8f0" stroke-width="1.5"/>
    
    <text x="108" y="130" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">כלים מובילים</text>
    <text x="108" y="150" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#475569" text-anchor="middle">ChatGPT או Claude בדפדפן</text>
    
    <text x="108" y="185" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">שגרת היום יום</text>
    <text x="108" y="205" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#475569" text-anchor="middle">שואלים שאלות בצ'אט</text>
    <text x="108" y="223" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#475569" text-anchor="middle">אך מבצעים הכל לבד ידנית</text>
    
    <text x="108" y="258" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">הצעד הבא להתקדמות</text>
    <text x="108" y="278" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#475569" text-anchor="middle">מעבר לחשבון Enterprise</text>
    <text x="108" y="296" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#475569" text-anchor="middle">מפגש שיתוף ידע חודשי</text>
    <text x="108" y="314" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#475569" text-anchor="middle">מיפוי משימות לספריות סקיל</text>
    
    <rect x="15" y="380" width="186" height="34" rx="8" fill="#f0f9ff"/>
    <text x="108" y="402" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#0284c7" text-anchor="middle">כ-55% מהצוותים (הרוב)</text>
  </g>

  <!-- Column 2: Copilot -->
  <g transform="translate(490, 205)" filter="url(#shadow2)">
    <rect width="216" height="430" rx="14" fill="#ffffff" stroke="#6366f1" stroke-width="1.5"/>
    <rect x="15" y="15" width="80" height="24" rx="12" fill="#e0e7ff"/>
    <text x="55" y="31" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#4338ca" text-anchor="middle">שלב 2</text>
    <text x="108" y="70" font-family="system-ui, sans-serif" font-size="18" font-weight="bold" fill="#0f172a" text-anchor="middle">קופיילוט וכפתורים</text>
    <text x="108" y="92" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#6366f1" text-anchor="middle">נוסף כפתור, העבודה זהה</text>
    <line x1="15" y1="105" x2="201" y2="105" stroke="#e2e8f0" stroke-width="1.5"/>
    
    <text x="108" y="130" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">כלים מובילים</text>
    <text x="108" y="150" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#475569" text-anchor="middle">Copilot ב-Excel וכפתור ERP</text>
    
    <text x="108" y="185" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">שגרת היום יום</text>
    <text x="108" y="205" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#475569" text-anchor="middle">מבקשים נוסחה בגיליון</text>
    <text x="108" y="223" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#475569" text-anchor="middle">אך עדיין מריצים הכל ידנית</text>
    
    <text x="108" y="258" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">הצעד הבא להתקדמות</text>
    <text x="108" y="278" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#475569" text-anchor="middle">מעבר ל-Claude Code</text>
    <text x="108" y="296" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#475569" text-anchor="middle">חיבור ממשקי API ו-MCP</text>
    <text x="108" y="314" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#475569" text-anchor="middle">בניית תהליך שרץ עצמאית</text>
    
    <rect x="15" y="380" width="186" height="34" rx="8" fill="#eef2ff"/>
    <text x="108" y="402" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#6366f1" text-anchor="middle">כ-30% מהצוותים</text>
  </g>

  <!-- Column 3: Build -->
  <g transform="translate(720, 205)" filter="url(#shadow2)">
    <rect width="216" height="430" rx="14" fill="#ffffff" stroke="#8b5cf6" stroke-width="1.5"/>
    <rect x="15" y="15" width="80" height="24" rx="12" fill="#ede9fe"/>
    <text x="55" y="31" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#6d28d9" text-anchor="middle">שלב 3</text>
    <text x="108" y="70" font-family="system-ui, sans-serif" font-size="18" font-weight="bold" fill="#0f172a" text-anchor="middle">בניית סקילים וקוד</text>
    <text x="108" y="92" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#8b5cf6" text-anchor="middle">סוכנים מריצים, אדם מפקח</text>
    <line x1="15" y1="105" x2="201" y2="105" stroke="#e2e8f0" stroke-width="1.5"/>
    
    <text x="108" y="130" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">כלים מובילים</text>
    <text x="108" y="150" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#475569" text-anchor="middle">Claude Code, GitHub, פייתון</text>
    
    <text x="108" y="185" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">שגרת היום יום</text>
    <text x="108" y="205" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#475569" text-anchor="middle">בונים את הסוכן והסקיל</text>
    <text x="108" y="223" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#475569" text-anchor="middle">ואז מלווים ומאמתים אותו</text>
    
    <text x="108" y="258" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">הצעד הבא להתקדמות</text>
    <text x="108" y="278" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#475569" text-anchor="middle">ספריית סקילים משותפת ב-Git</text>
    <text x="108" y="296" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#475569" text-anchor="middle">הכשרת 2-3 בונים מובילים</text>
    <text x="108" y="314" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#475569" text-anchor="middle">הרצה במקביל 3-5 חודשים</text>
    
    <rect x="15" y="380" width="186" height="34" rx="8" fill="#faf5ff"/>
    <text x="108" y="402" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#8b5cf6" text-anchor="middle">כ-7% מהצוותים</text>
  </g>

  <!-- Column 4: AI-Native -->
  <g transform="translate(950, 205)" filter="url(#shadow2)">
    <rect width="220" height="430" rx="14" fill="#ffffff" stroke="#0d9488" stroke-width="2.5"/>
    <rect x="15" y="15" width="85" height="24" rx="12" fill="#ccfbf1"/>
    <text x="57" y="31" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#0f766e" text-anchor="middle">שלב 4</text>
    <text x="110" y="70" font-family="system-ui, sans-serif" font-size="18" font-weight="bold" fill="#0f172a" text-anchor="middle">מחלקת כספים אוטונומית</text>
    <text x="110" y="92" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0d9488" text-anchor="middle">סוכנים מריצים, אדם מחליט</text>
    <line x1="15" y1="105" x2="205" y2="105" stroke="#e2e8f0" stroke-width="1.5"/>
    
    <text x="110" y="130" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">כלים מובילים</text>
    <text x="110" y="150" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#0f766e" text-anchor="middle">סוכנים מתוזמנים, Git, APIs</text>
    
    <text x="110" y="185" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">שגרת היום יום</text>
    <text x="110" y="205" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#475569" text-anchor="middle">בודקים את תוצרי הסוכנים</text>
    <text x="110" y="223" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#475569" text-anchor="middle">מאשרים ומקבלים החלטות</text>
    
    <text x="110" y="258" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">הצעד הבא לשימור</text>
    <text x="110" y="278" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#475569" text-anchor="middle">הסוכן מציע, האדם מאשר</text>
    <text x="110" y="296" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#475569" text-anchor="middle">עדכון חוקים בכל חריגה</text>
    <text x="110" y="314" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#475569" text-anchor="middle">בניית התהליך הבא</text>
    
    <rect x="15" y="380" width="190" height="34" rx="8" fill="#f0fdfa"/>
    <text x="110" y="402" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#0f766e" text-anchor="middle">כ-3% בלבד (חוד החנית)</text>
  </g>

  <!-- Bottom Footer Bar -->
  <g transform="translate(0, 655)">
    <line x1="0" y1="0" x2="1200" y2="0" stroke="#e2e8f0" stroke-width="1.5"/>
    <text x="600" y="38" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="#64748b" text-anchor="middle">רונן עמוס, רו״ח | קהילת AI Finance Transformation | ronenamoscpa.co.il</text>
  </g>
</svg>
`;

async function run() {
  console.log('Generating Clean Header Infographic...');
  await sharp(Buffer.from(headerSvg))
    .png({ quality: 95 })
    .toFile(path.join(outputDir, 'how-to-make-finance-team-ai-native-header.png'));
  console.log('Saved: how-to-make-finance-team-ai-native-header.png');

  console.log('Generating Clean Stages Infographic...');
  await sharp(Buffer.from(stagesSvg))
    .png({ quality: 95 })
    .toFile(path.join(outputDir, 'how-to-make-finance-team-ai-native-stages.png'));
  console.log('Saved: how-to-make-finance-team-ai-native-stages.png');
}

run().catch(console.error);
