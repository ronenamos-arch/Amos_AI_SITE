import sharp from 'sharp';

async function generateHeader() {
  const inputPath = 'C:/Users/Ronen/.gemini/antigravity/brain/e24781c5-9642-420a-8892-499a44cd5dc8/claude_skills_header_1791548108368.jpg';
  const width = 1376;
  const height = 768;

  const overlaySvg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="featherEdge" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0b111a" stop-opacity="0.0"/>
      <stop offset="100%" stop-color="#0b111a" stop-opacity="1.0"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="12" flood-color="#000000" flood-opacity="0.9"/>
    </filter>
  </defs>

  <!-- Feathered transition zone from x=620 to x=760 -->
  <rect x="620" y="0" width="140" height="${height}" fill="url(#featherEdge)"/>
  <!-- Completely solid dark background covering all right side text -->
  <rect x="760" y="0" width="${width - 760}" height="${height}" fill="#0b111a"/>

  <!-- Ronen Amos watermark on bottom left -->
  <text x="65" y="${height - 45}" font-family="Segoe UI, -apple-system, Arial, sans-serif" font-size="28" font-weight="600" fill="#94a3b8" opacity="0.6">Ronen Amos</text>

  <!-- Header Typography centered in right column (x=1070) -->
  <g filter="url(#glow)">
    <!-- Main Hebrew Titles -->
    <text x="1070" y="270" font-family="Segoe UI, Tahoma, Arial, sans-serif" font-size="58" font-weight="900" fill="#ffffff" text-anchor="middle">בניית Claude Skills</text>
    <text x="1070" y="350" font-family="Segoe UI, Tahoma, Arial, sans-serif" font-size="40" font-weight="800" fill="#facc15" text-anchor="middle">המדריך המלא למחלקת כספים</text>
    
    <!-- Subtitle -->
    <text x="1070" y="420" font-family="Segoe UI, Tahoma, Arial, sans-serif" font-size="24" font-weight="500" fill="#cbd5e1" text-anchor="middle">מארכיטקטורת תיקיות ועד תהליכי עבודה ארגוניים</text>

    <!-- Badges / Pills centered -->
    <g transform="translate(835, 480)">
      <rect x="0" y="0" width="140" height="38" rx="19" fill="rgba(20, 184, 166, 0.25)" stroke="#14b8a6" stroke-width="1.5"/>
      <text x="70" y="24" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#5eead4" text-anchor="middle">אוטומציה פיננסית</text>

      <rect x="155" y="0" width="150" height="38" rx="19" fill="rgba(56, 189, 248, 0.25)" stroke="#38bdf8" stroke-width="1.5"/>
      <text x="230" y="24" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#7dd3fc" text-anchor="middle">ארכיטקטורת AI</text>

      <rect x="320" y="0" width="150" height="38" rx="19" fill="rgba(250, 204, 21, 0.25)" stroke="#facc15" stroke-width="1.5"/>
      <text x="395" y="24" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#fef08a" text-anchor="middle">מדריך פרודקשן</text>
    </g>
  </g>
</svg>
`;

  await sharp(inputPath)
    .resize(width, height)
    .composite([{ input: Buffer.from(overlaySvg), top: 0, left: 0 }])
    .png()
    .toFile('public/images/blog/claude-skills-building-guide-header.png');

  console.log('Generated public/images/blog/claude-skills-building-guide-header.png');
}

async function generateDiagram() {
  const inputPath = 'C:/Users/Ronen/.gemini/antigravity/brain/e24781c5-9642-420a-8892-499a44cd5dc8/claude_skills_diagram_1791548137610.jpg';
  const width = 1376;
  const height = 768;

  const overlaySvg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="topVignette" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0e131d" stop-opacity="0.96"/>
      <stop offset="50%" stop-color="#0e131d" stop-opacity="0.88"/>
      <stop offset="100%" stop-color="#0e131d" stop-opacity="0.0"/>
    </linearGradient>
    <linearGradient id="bottomVignette" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#0e131d" stop-opacity="0.96"/>
      <stop offset="40%" stop-color="#0e131d" stop-opacity="0.88"/>
      <stop offset="100%" stop-color="#0e131d" stop-opacity="0.0"/>
    </linearGradient>
    <filter id="diagramGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="12" flood-color="#000000" flood-opacity="0.9"/>
    </filter>
  </defs>

  <rect width="${width}" height="220" fill="url(#topVignette)"/>
  <rect y="${height - 200}" width="${width}" height="200" fill="url(#bottomVignette)"/>

  <!-- Top Title centered across width -->
  <g filter="url(#diagramGlow)">
    <text x="${width / 2}" y="85" font-family="Segoe UI, Tahoma, Arial, sans-serif" font-size="46" font-weight="900" fill="#ffffff" text-anchor="middle">
      תהליך העבודה השלם: מהגדרת קוד ועד לתוצר הנהלה
    </text>
    <text x="${width / 2}" y="135" font-family="Segoe UI, Tahoma, Arial, sans-serif" font-size="24" font-weight="600" fill="#94a3b8" text-anchor="middle">
      ארכיטקטורת תיקיות • אימות ובקרת נתונים • מצגות לדירקטוריון ודוחות כספיים
    </text>
  </g>

  <!-- Bottom Stage Labels aligned with visual cards -->
  <g filter="url(#diagramGlow)">
    <!-- Stage 1 (Left: Code Repository) -->
    <text x="210" y="${height - 75}" font-family="Segoe UI, Tahoma, Arial, sans-serif" font-size="25" font-weight="800" fill="#38bdf8" text-anchor="middle">ארכיטקטורה וקוד</text>
    <text x="210" y="${height - 40}" font-family="Segoe UI, Tahoma, Arial, sans-serif" font-size="16" font-weight="600" fill="#cbd5e1" text-anchor="middle">הוראות ביצוע בקובץ SKILL.md</text>

    <!-- Stage 2 (Middle: AI Brain) -->
    <text x="690" y="${height - 75}" font-family="Segoe UI, Tahoma, Arial, sans-serif" font-size="25" font-weight="800" fill="#5eead4" text-anchor="middle">מוח הבינה המלאכותית</text>
    <text x="690" y="${height - 40}" font-family="Segoe UI, Tahoma, Arial, sans-serif" font-size="16" font-weight="600" fill="#cbd5e1" text-anchor="middle">אימות מקורות נתונים ובקרה</text>

    <!-- Stage 3 (Right: Executive Decision) -->
    <text x="1170" y="${height - 75}" font-family="Segoe UI, Tahoma, Arial, sans-serif" font-size="25" font-weight="800" fill="#4ade80" text-anchor="middle">תוצר הנהלה מוכן</text>
    <text x="1170" y="${height - 40}" font-family="Segoe UI, Tahoma, Arial, sans-serif" font-size="16" font-weight="600" fill="#cbd5e1" text-anchor="middle">מצגת Board ותקציר מנהלים</text>
  </g>

  <!-- Ronen Amos watermark -->
  <text x="45" y="${height - 20}" font-family="Segoe UI, -apple-system, Arial, sans-serif" font-size="20" font-weight="600" fill="#64748b" opacity="0.6">Ronen Amos</text>
</svg>
`;

  await sharp(inputPath)
    .resize(width, height)
    .composite([{ input: Buffer.from(overlaySvg), top: 0, left: 0 }])
    .png()
    .toFile('public/images/blog/claude-skills-building-guide-diagram.png');

  console.log('Generated public/images/blog/claude-skills-building-guide-diagram.png');
}

async function run() {
  await generateHeader();
  await generateDiagram();
}

run();
