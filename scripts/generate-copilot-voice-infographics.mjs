import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDir = 'public/images/blog';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 1. Header Infographic (1200x630)
const headerSvg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg" direction="rtl">
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
  <rect width="1200" height="6" fill="#0284c7"/>

  <!-- Top Badge -->
  <g transform="translate(320, 32)">
    <rect width="560" height="36" rx="18" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.5"/>
    <text x="280" y="23" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="14" font-weight="bold" fill="#0369a1" text-anchor="middle" letter-spacing="1">AI FINANCE TRANSFORMATION • MICROSOFT 365 COPILOT</text>
  </g>

  <!-- Main Titles -->
  <text x="600" y="112" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="34" font-weight="800" fill="#0f172a" text-anchor="middle">איך לגרום ל-Copilot לכתוב בדיוק בקול שלך</text>
  <text x="600" y="152" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="18" font-weight="500" fill="#475569" text-anchor="middle">המדריך המעשי ל-CFOs וחשבים: חילוץ Brand Voice מ-Teams ו-Outlook ויצירת סוכן אישי</text>

  <!-- Stage Cards -->
  <!-- Card 1 -->
  <g transform="translate(80, 185)" filter="url(#shadow)">
    <rect width="320" height="350" rx="16" fill="#ffffff" stroke="#0284c7" stroke-width="2"/>
    <rect x="20" y="20" width="85" height="26" rx="13" fill="#e0f2fe"/>
    <text x="62" y="38" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#0369a1" text-anchor="middle">שלב 1</text>
    
    <text x="160" y="85" font-family="system-ui, sans-serif" font-size="20" font-weight="bold" fill="#0284c7" text-anchor="middle">ניתוח דפוסי תקשורת</text>
    <text x="160" y="115" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#0f172a" text-anchor="middle">Copilot Chat &amp; Graph</text>
    
    <line x1="30" y1="130" x2="290" y2="130" stroke="#e2e8f0" stroke-width="1.5"/>
    
    <text x="160" y="165" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• סריקת היסטוריית מיילים ו-Teams</text>
    <text x="160" y="200" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• זיהוי אורך משפטים, טון ואינטונציה</text>
    <text x="160" y="235" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• איתור מונחים מקצועיים (FP&amp;A, ERP)</text>
    <text x="160" y="270" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• הרצת פרומפט ייעודי לחילוץ קול</text>

    <rect x="25" y="295" width="270" height="32" rx="8" fill="#f0f9ff"/>
    <text x="160" y="316" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#0369a1" text-anchor="middle">דיוק מבוסס עובדות במקום ניחוש</text>
  </g>

  <!-- Card 2 -->
  <g transform="translate(440, 185)" filter="url(#shadow)">
    <rect width="320" height="350" rx="16" fill="#ffffff" stroke="#0d9488" stroke-width="2"/>
    <rect x="20" y="20" width="85" height="26" rx="13" fill="#ccfbf1"/>
    <text x="62" y="38" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#0f766e" text-anchor="middle">שלב 2</text>
    
    <text x="160" y="85" font-family="system-ui, sans-serif" font-size="20" font-weight="bold" fill="#0d9488" text-anchor="middle">הפקת SKILL.md פרטי</text>
    <text x="160" y="115" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#0f172a" text-anchor="middle">פרופיל סגנון מובנה</text>
    
    <line x1="30" y1="130" x2="290" y2="130" stroke="#e2e8f0" stroke-width="1.5"/>
    
    <text x="160" y="165" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• ניסוח חוקי עשה ואל-תעשה בסגנון</text>
    <text x="160" y="200" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• ניקוי פרטים פיננסיים רגישים (סניטציה)</text>
    <text x="160" y="235" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• הגדרת תבניות לפתיחה ולסגירה</text>
    <text x="160" y="270" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• יצירת קובץ הנחיות קבוע לקופיילוט</text>

    <rect x="25" y="295" width="270" height="32" rx="8" fill="#f0fdfa"/>
    <text x="160" y="316" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#0f766e" text-anchor="middle">מסמך DNA סגנוני שניתן לעדכון</text>
  </g>

  <!-- Card 3 -->
  <g transform="translate(800, 185)" filter="url(#shadow)">
    <rect width="320" height="350" rx="16" fill="#ffffff" stroke="#8b5cf6" stroke-width="2"/>
    <rect x="20" y="20" width="85" height="26" rx="13" fill="#f3e8ff"/>
    <text x="62" y="38" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#7c3aed" text-anchor="middle">שלב 3</text>
    
    <text x="160" y="85" font-family="system-ui, sans-serif" font-size="20" font-weight="bold" fill="#8b5cf6" text-anchor="middle">הפעלת סוכן ב-Outlook</text>
    <text x="160" y="115" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#0f172a" text-anchor="middle">Agent בתוך שגרת העבודה</text>
    
    <line x1="30" y1="130" x2="290" y2="130" stroke="#e2e8f0" stroke-width="1.5"/>
    
    <text x="160" y="165" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• יצירת Custom Copilot Agent ייעודי</text>
    <text x="160" y="200" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• טעינת ה-SKILL כ-Knowledge בסיסי</text>
    <text x="160" y="235" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• ניסוח מיילים ישירות מסרגל Outlook</text>
    <text x="160" y="270" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#334155" text-anchor="middle">• חסכון של 80% מזמן שכתוב הטקסט</text>

    <rect x="25" y="295" width="270" height="32" rx="8" fill="#faf5ff"/>
    <text x="160" y="316" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#7c3aed" text-anchor="middle">מייל שנשמע 100% אתם — ברגע</text>
  </g>

  <!-- Footer Watermark -->
  <text x="600" y="585" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#64748b" text-anchor="middle">
    רונן עמוס רו״ח • קהילת AI Finance Transformation • ronenamoscpa.co.il
  </text>
</svg>
`;

// Helper to create visual placeholder SVG
function createPlaceholderSvg(title, timestamp, stepNum, description, color) {
  return `
<svg width="1000" height="520" viewBox="0 0 1000 520" xmlns="http://www.w3.org/2000/svg" direction="rtl">
  <defs>
    <linearGradient id="pgrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
    <filter id="pshadow" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="6" stdDeviation="12" flood-color="#000000" flood-opacity="0.3"/>
    </filter>
  </defs>

  <rect width="1000" height="520" rx="16" fill="url(#pgrad)"/>
  <rect x="0" y="0" width="1000" height="520" rx="16" fill="none" stroke="${color}" stroke-width="2"/>

  <!-- Top Mockup Bar -->
  <rect x="0" y="0" width="1000" height="48" rx="16" fill="#1e293b"/>
  <rect x="0" y="32" width="1000" height="16" fill="#1e293b"/>
  <circle cx="35" cy="24" r="6" fill="#ef4444"/>
  <circle cx="55" cy="24" r="6" fill="#f59e0b"/>
  <circle cx="75" cy="24" r="6" fill="#10b981"/>
  
  <text x="500" y="30" font-family="system-ui, sans-serif" font-size="14" fill="#94a3b8" text-anchor="middle" font-weight="600">
    Microsoft 365 Copilot • צילום מסך מתוך ההדרכה
  </text>

  <!-- Central Box -->
  <g transform="translate(100, 90)" filter="url(#pshadow)">
    <rect width="800" height="350" rx="14" fill="#090d16" stroke="#334155" stroke-width="1.5"/>
    
    <!-- Badge -->
    <rect x="290" y="28" width="220" height="32" rx="16" fill="rgba(255,255,255,0.06)" stroke="${color}" stroke-width="1.2"/>
    <text x="400" y="49" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="${color}" text-anchor="middle">
      TIMELINE: ${timestamp} בוידאו
    </text>

    <!-- Title -->
    <text x="400" y="110" font-family="system-ui, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc" text-anchor="middle">
      ${title}
    </text>
    
    <!-- Step -->
    <text x="400" y="145" font-family="system-ui, sans-serif" font-size="16" font-weight="600" fill="#38bdf8" text-anchor="middle">
      [ צילום מסך מיועד - שלב ${stepNum} ]
    </text>

    <!-- Line -->
    <line x1="80" y1="175" x2="720" y2="175" stroke="#1e293b" stroke-width="1.5"/>

    <!-- Description -->
    <text x="400" y="215" font-family="system-ui, sans-serif" font-size="15" fill="#cbd5e1" text-anchor="middle">
      ${description}
    </text>

    <!-- Camera Icon Visual -->
    <g transform="translate(375, 255)">
      <rect width="50" height="36" rx="6" fill="none" stroke="${color}" stroke-width="2"/>
      <circle cx="25" cy="18" r="9" fill="none" stroke="${color}" stroke-width="2"/>
      <rect x="18" y="-4" width="14" height="6" rx="2" fill="${color}"/>
    </g>
    
    <text x="400" y="325" font-family="system-ui, sans-serif" font-size="13" fill="#64748b" text-anchor="middle">
      הוראה לרונן: החלף קובץ זה בצילום מסך מהדקה ${timestamp} בוידאו
    </text>
  </g>
</svg>
`;
}

async function run() {
  console.log('Generating header infographic...');
  await sharp(Buffer.from(headerSvg))
    .png()
    .toFile(path.join(outDir, 'copilot-custom-voice-cfo-finance-agent-header.png'));

  const placeholders = [
    {
      file: 'copilot-voice-step1-prompt-analysis.png',
      title: 'הרצת פרומפט ניתוח הקול ב-Copilot Chat',
      timestamp: '01:15',
      stepNum: '1',
      description: 'הפרומפט מנחה את Copilot לסרוק מיילים וצ\'אטים מ-2 השנים האחרונות ולחלץ את ה-Brand Voice',
      color: '#38bdf8'
    },
    {
      file: 'copilot-voice-step2-skill-file.png',
      title: 'פלט הניתוח ויצירת קובץ SKILL.md',
      timestamp: '02:30',
      stepNum: '2',
      description: 'המערכת מייצרת מסמך Markdown מובנה של כללי סגנון, אינטונציה, מונחים מקצועיים ומבנה משפטים',
      color: '#14b8a6'
    },
    {
      file: 'copilot-voice-step3-agent-config.png',
      title: 'בניית הסוכן האישי (Custom Agent Configuration)',
      timestamp: '04:45',
      stepNum: '3',
      description: 'הגדרת סוכן כתיבה אישי והזנת ה-SKILL.md כקובץ ידע והנחיות מערכת (Instructions)',
      color: '#a855f7'
    },
    {
      file: 'copilot-voice-step4-testing-comparison.png',
      title: 'בדיקת הסוכן: השוואת תשובה גנרית מול קול אותנטי',
      timestamp: '06:30',
      stepNum: '4',
      description: 'בחינת המענה בניסוח מייל עסקי — מעבר מטקסט רובוטי לתשובה מקצועית ותמציתית בדיוק בסגנון שלך',
      color: '#f59e0b'
    },
    {
      file: 'copilot-voice-step5-outlook-integration.png',
      title: 'שימוש בסוכן ישירות מתוך סרגל Outlook',
      timestamp: '09:40',
      stepNum: '5',
      description: 'פתיחת הסוכן בסרגל הצד של אאוטלוק לניסוח מיילים שוטפים לספקים, הנהלה וצוות בלחיצת כפתור',
      color: '#10b981'
    }
  ];

  for (const p of placeholders) {
    console.log(`Generating placeholder: ${p.file}...`);
    const svg = createPlaceholderSvg(p.title, p.timestamp, p.stepNum, p.description, p.color);
    await sharp(Buffer.from(svg))
      .png()
      .toFile(path.join(outDir, p.file));
  }

  console.log('Done generating all images!');
}

run().catch(console.error);
