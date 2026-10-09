import sharp from 'sharp';

const width = 2048;
const height = 1152;

const overlaySvg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="textGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="12" flood-color="#000000" flood-opacity="0.9"/>
    </filter>
    <filter id="pillShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
    <linearGradient id="headerVignette" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.75"/>
      <stop offset="35%" stop-color="#000000" stop-opacity="0.5"/>
      <stop offset="55%" stop-color="#000000" stop-opacity="0.0"/>
    </linearGradient>
  </defs>

  <!-- Gentle top gradient to ensure text readability -->
  <rect width="${width}" height="${Math.round(height * 0.55)}" fill="url(#headerVignette)"/>

  <!-- Top Badge -->
  <g transform="translate(734, 75)" filter="url(#pillShadow)">
    <rect width="580" height="52" rx="26" fill="#0f172a" fill-opacity="0.85" stroke="#14b8a6" stroke-width="2"/>
    <text x="290" y="33" font-family="Arial, Segoe UI, Tahoma, sans-serif" font-size="20" font-weight="bold" fill="#5eead4" text-anchor="middle" letter-spacing="2">AI FINANCE TRANSFORMATION • AI GOVERNANCE</text>
  </g>

  <!-- Main Title -->
  <g filter="url(#textGlow)">
    <text x="1024" y="200" font-family="Arial, Segoe UI, Tahoma, sans-serif" font-size="68" font-weight="900" fill="#ffffff" text-anchor="middle">הטמעת בינה מלאכותית במחלקת כספים</text>
    <text x="1024" y="280" font-family="Arial, Segoe UI, Tahoma, sans-serif" font-size="38" font-weight="700" fill="#38bdf8" text-anchor="middle">איך מתחילים בלי לאבד שליטה: מדיניות, בקרות ותוכנית 90 יום</text>
    <text x="1024" y="340" font-family="Arial, Segoe UI, Tahoma, sans-serif" font-size="24" font-weight="600" fill="#cbd5e1" text-anchor="middle">כלים מאושרים • סיווג רגישות מידע • סולם בדיקות (Tiers) • מבנה אישור להנהלה</text>
  </g>
</svg>
`;

async function run() {
  await sharp('test_seedream.jpg')
    .composite([
      {
        input: Buffer.from(overlaySvg),
        top: 0,
        left: 0,
      }
    ])
    .png()
    .toFile('public/images/blog/ai-governance-finance-header.png');

  console.log('Successfully generated public/images/blog/ai-governance-finance-header.png');
}

run();
