import sharp from "sharp";
import { writeFileSync } from "fs";

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bg-grad1" cx="20%" cy="20%" r="60%">
      <stop offset="0%" stop-color="#0e7490" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#0b0f19" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="bg-grad2" cx="80%" cy="80%" r="60%">
      <stop offset="0%" stop-color="#4338ca" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#0b0f19" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="badge-border" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#22d3ee"/>
      <stop offset="100%" stop-color="#3b82f6"/>
    </linearGradient>
    <linearGradient id="card-border" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.4"/>
      <stop offset="50%" stop-color="#818cf8" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.4"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="#0b0f19"/>
  <rect width="1200" height="630" fill="url(#bg-grad1)"/>
  <rect width="1200" height="630" fill="url(#bg-grad2)"/>

  <!-- Outer Border Frame -->
  <rect x="30" y="30" width="1140" height="570" rx="24" fill="none" stroke="url(#card-border)" stroke-width="1.5"/>

  <!-- Top Header Bar -->
  <!-- Category Badge Pill -->
  <rect x="840" y="70" width="290" height="48" rx="24" fill="#083344" fill-opacity="0.8" stroke="url(#badge-border)" stroke-width="1.5"/>
  <text x="985" y="102" fill="#22d3ee" font-size="20" font-weight="bold" font-family="Heebo, Arial, sans-serif" text-anchor="middle" direction="rtl">✦ AI פיננסי ואוטומציה</text>

  <!-- Author Identity -->
  <text x="70" y="102" fill="#e2e8f0" font-size="22" font-weight="bold" font-family="Heebo, Arial, sans-serif">
    <tspan fill="#f8fafc">רונן עמוס</tspan>
    <tspan fill="#64748b"> | </tspan>
    <tspan fill="#94a3b8">רו״ח ויועץ AI פיננסי</tspan>
  </text>

  <!-- Center Main Title -->
  <text x="1130" y="240" fill="#ffffff" font-size="52" font-weight="900" font-family="Heebo, Arial, sans-serif" text-anchor="end" direction="rtl">
    המרכז ל-AI, דשבורדים חכמים
  </text>
  <text x="1130" y=\"310\" fill=\"#ffffff\" font-size=\"52\" font-weight=\"900\" font-family=\"Heebo, Arial, sans-serif\" text-anchor=\"end\" direction=\"rtl\">
    ואוטומציה למנהלי כספים
  </text>

  <!-- Subtitle Value Proposition -->
  <text x="1130" y="385" fill="#94a3b8" font-size="24" font-family="Heebo, Arial, sans-serif" text-anchor="end" direction="rtl">
    ייעוץ אסטרטגי, קיצור סגירת חודש, דשבורדים ניהוליים ל-CFO והרצאות AI לארגונים
  </text>

  <!-- Bottom Divider Line -->
  <line x1="70" y1="490" x2="1130" y2="490" stroke="#334155" stroke-width="1" stroke-opacity="0.6"/>

  <!-- Bottom Bar: Domain & Trust Badges -->
  <text x="70" y="540" fill="#38bdf8" font-size="22" font-weight="bold" font-family="Heebo, Arial, sans-serif">
    ronenamoscpa.co.il
  </text>

  <text x="1130" y="540" fill="#64748b" font-size="19" font-weight="bold" font-family="Heebo, Arial, sans-serif" text-anchor="end" direction="rtl">
    <tspan fill="#cbd5e1">רואה חשבון מוסמך</tspan>
    <tspan fill="#475569"> • </tspan>
    <tspan fill="#94a3b8">דשבורדים ל-CFO</tspan>
    <tspan fill="#475569"> • </tspan>
    <tspan fill="#94a3b8">סוכני AI ואוטומציה</tspan>
  </text>
</svg>
`;

async function generate() {
  const buffer = Buffer.from(svg.replace(/\\"/g, '"'));
  await sharp(buffer)
    .png({ quality: 90, compressionLevel: 9 })
    .toFile("public/og-image.png");
  console.log("Successfully generated public/og-image.png");
}

generate().catch(console.error);
