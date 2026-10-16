import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const srcDir = 'C:/Users/Ronen/Documents/Projects/Business/AI FINANCE TRANSFORMATION/Posts ideas/מדריכים לאתר/images/Copilot- powerquery';
const meDir = 'C:/Users/Ronen/Documents/Projects/Business/AI FINANCE TRANSFORMATION/Images/me';
const destDir = path.resolve('public/images/blog');

async function generateHeaderWithPortrait() {
  console.log('Regenerating Header Infographic with correct text positioning...');
  
  // Cut and prepare Ronen portrait
  const portraitPath = path.join(meDir, 'photo_5861891453326397738_y.jpg');
  const portraitBuffer = await sharp(portraitPath)
    .resize(440, 530, { fit: 'cover', position: 'center' })
    .toBuffer();

  const svgCard = `
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#090d16"/>
        <stop offset="50%" stop-color="#0f172a"/>
        <stop offset="100%" stop-color="#1e293b"/>
      </linearGradient>
      <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#10b981"/>
        <stop offset="100%" stop-color="#06b6d4"/>
      </linearGradient>
      <filter id="glow">
        <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#10b981" flood-opacity="0.35"/>
      </filter>
    </defs>

    <!-- Background -->
    <rect width="1200" height="630" fill="url(#bg)"/>
    <rect width="1200" height="5" fill="url(#emeraldGrad)"/>

    <!-- Left Content Column -->
    <g transform="translate(60, 48)">
      <!-- Top Badge -->
      <rect x="0" y="0" width="460" height="34" rx="17" fill="rgba(16,185,129,0.12)" stroke="#10b981" stroke-width="1.2"/>
      <text x="230" y="22" font-family="'Segoe UI', system-ui, sans-serif" font-size="12" font-weight="700" fill="#34d399" text-anchor="middle" letter-spacing="0.5">
        AI FINANCE TRANSFORMATION • EXCEL BETA &amp; COPILOT
      </text>

      <!-- Main Headline -->
      <text x="0" y="85" font-family="'Segoe UI', system-ui, sans-serif" font-size="34" font-weight="800" fill="#ffffff">
        Copilot פוגש את Power Query
      </text>
      <text x="0" y="125" font-family="'Segoe UI', system-ui, sans-serif" font-size="26" font-weight="700" fill="#10b981">
        המהפכה השקטה של אקסל כבר כאן
      </text>
      
      <text x="0" y="165" font-family="'Segoe UI', system-ui, sans-serif" font-size="15" font-weight="400" fill="#94a3b8">
        מדריך מעשי ל-CFOs וחשבים: איחוד תיקיות, יומן ביקורת (Audit Trail) וקוד M
      </text>

      <!-- 3 Key Features Cards -->
      <g transform="translate(0, 195)">
        <!-- Card 1 -->
        <rect width="640" height="74" rx="12" fill="#111827" stroke="#1f2937" stroke-width="1.5"/>
        <rect x="16" y="14" width="46" height="46" rx="10" fill="rgba(16,185,129,0.15)"/>
        <text x="39" y="44" font-family="'Segoe UI', sans-serif" font-size="22" text-anchor="middle">⚡</text>
        <text x="76" y="34" font-family="'Segoe UI', sans-serif" font-size="15" font-weight="700" fill="#f8fafc">איחוד תיקיות וקבצי CSV ב-90 שניות</text>
        <text x="76" y="56" font-family="'Segoe UI', sans-serif" font-size="12.5" fill="#94a3b8">חיבור ישיר למנוע Power Query ללא צורך בכתיבת קוד M ידני</text>

        <!-- Card 2 -->
        <g transform="translate(0, 86)">
          <rect width="640" height="74" rx="12" fill="#111827" stroke="#1f2937" stroke-width="1.5"/>
          <rect x="16" y="14" width="46" height="46" rx="10" fill="rgba(56,189,248,0.15)"/>
          <text x="39" y="44" font-family="'Segoe UI', sans-serif" font-size="22" text-anchor="middle">🛡️</text>
          <text x="76" y="34" font-family="'Segoe UI', sans-serif" font-size="15" font-weight="700" fill="#f8fafc">פרומפט יומן ביקורת מובנה (Audit Trail)</text>
          <text x="76" y="56" font-family="'Segoe UI', sans-serif" font-size="12.5" fill="#94a3b8">תיעוד מלא של כל פקודה, פילטר ושינוי בגיליון נפרד לבקרה מקצועית</text>
        </g>

        <!-- Card 3 -->
        <g transform="translate(0, 172)">
          <rect width="640" height="74" rx="12" fill="#111827" stroke="#1f2937" stroke-width="1.5"/>
          <rect x="16" y="14" width="46" height="46" rx="10" fill="rgba(168,85,247,0.15)"/>
          <text x="39" y="44" font-family="'Segoe UI', sans-serif" font-size="22" text-anchor="middle">🔄</text>
          <text x="76" y="34" font-family="'Segoe UI', sans-serif" font-size="15" font-weight="700" fill="#f8fafc">טבלאות מקושרות הניתנות לרענון (Refreshable)</text>
          <text x="76" y="56" font-family="'Segoe UI', sans-serif" font-size="12.5" fill="#94a3b8">הוספת קובץ חדש בחודש הבא וקליק ימני על Refresh — והדוחות מוכנים</text>
        </g>
      </g>
    </g>

    <!-- Right Side Portrait Frame -->
    <g filter="url(#glow)">
      <rect x="736" y="46" width="448" height="538" rx="20" fill="none" stroke="#10b981" stroke-width="2.5"/>
    </g>
    
    <!-- Footer watermark -->
    <text x="600" y="612" font-family="'Segoe UI', sans-serif" font-size="13" font-weight="600" fill="#64748b" text-anchor="middle">
      רונן עמוס רו״ח • קהילת AI Finance Transformation • ronenamoscpa.co.il
    </text>
  </svg>
  `;

  const baseImg = await sharp(Buffer.from(svgCard)).png().toBuffer();

  await sharp(baseImg)
    .composite([
      {
        input: portraitBuffer,
        top: 50,
        left: 740,
      }
    ])
    .png({ quality: 90 })
    .toFile(path.join(destDir, 'copilot-power-query-excel-finance-guide-header.png'));

  console.log('Fixed Header generated successfully!');
}

generateHeaderWithPortrait().catch(console.error);
