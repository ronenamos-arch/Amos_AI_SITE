import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = path.resolve('public/images/blog');
const tempDir = path.resolve('scripts/temp_ui');

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

function winTitleBar(title) {
  return `
  <div style="display:flex; justify-content:space-between; align-items:center; height:38px; background:#1e293b; color:#cbd5e1; font-family:'Segoe UI', sans-serif; font-size:12px; padding:0 14px; border-top-left-radius:10px; border-top-right-radius:10px; user-select:none; border-bottom:1px solid #334155;">
    <div style="display:flex; align-items:center; gap:10px;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#0f766e"/><path d="M7 12l3 3 7-7" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <span style="color:#ffffff; font-weight:600; font-size:13px;">${title}</span>
    </div>
    <div style="display:flex; align-items:center; gap:16px;">
      <span style="font-size:14px; cursor:pointer;">&#8212;</span>
      <span style="font-size:11px; cursor:pointer;">&#9633;</span>
      <span style="font-size:14px; cursor:pointer; color:#f87171;">&#10005;</span>
    </div>
  </div>
  `;
}

const html = `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin:0; padding:0; }
  body { background:#090d16; padding:25px; font-family:'Segoe UI', system-ui, -apple-system, sans-serif; color:#e2e8f0; }
  .win { width:1140px; margin:0 auto; background:#0f172a; border-radius:10px; border:1px solid #334155; box-shadow:0 30px 60px -15px rgba(0,0,0,0.8); overflow:hidden; }
  .nav-bar { background:#1e293b; padding:12px 24px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #334155; font-size:13px; }
  .nav-title { display:flex; align-items:center; gap:12px; font-weight:700; color:#38bdf8; font-size:15px; }
  .stats-row { display:grid; grid-template-columns: repeat(4, 1fr); gap:16px; padding:20px 24px 10px; }
  .stat-card { background:#1e293b; border-radius:8px; padding:14px 18px; border:1px solid #334155; }
  .stat-val { font-size:24px; font-weight:800; color:#f8fafc; margin-top:4px; }
  .stat-lbl { font-size:12px; color:#94a3b8; font-weight:600; }
  
  .table-container { padding:16px 24px 24px; }
  .table-title { font-size:14px; font-weight:700; color:#cbd5e1; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center; }
  table { width:100%; border-collapse:collapse; background:#131d31; border-radius:8px; overflow:hidden; font-size:13px; border:1px solid #26354f; }
  th { background:#1e293b; color:#94a3b8; padding:12px 14px; text-align:right; font-weight:600; border-bottom:1px solid #334155; }
  td { padding:12px 14px; border-bottom:1px solid #1e293b; color:#e2e8f0; }
  tr:hover { background:#1c273d; }
  
  .badge { display:inline-flex; align-items:center; gap:5px; padding:4px 10px; border-radius:12px; font-size:11.5px; font-weight:700; }
  .badge-matched { background:rgba(16, 185, 129, 0.15); color:#34d399; border:1px solid #059669; }
  .badge-shortpay { background:rgba(245, 158, 11, 0.15); color:#fbbf24; border:1px solid #d97706; }
  .badge-overpay { background:rgba(168, 85, 247, 0.15); color:#c084fc; border:1px solid #9333ea; }
  .badge-unknown { background:rgba(239, 68, 68, 0.15); color:#f87171; border:1px solid #dc2626; }
  
  .method-pill { font-size:11.5px; color:#38bdf8; background:rgba(56, 189, 248, 0.1); padding:2px 8px; border-radius:4px; font-family:ui-monospace, monospace; }
  .num { direction:ltr; text-align:left; font-family:ui-monospace, monospace; }
  .tag-archive { color:#64748b; font-size:11.5px; }
</style>
</head>
<body>
<div class="win">
  ${winTitleBar('AI AR Automation Engine • Google Sheets &amp; Claude 3.5 Sonnet Integration')}
  
  <div class="nav-bar">
    <div class="nav-title">
      <span>📊 יומן התאמת תקבולים וסגירת חשבוניות אוטומטית (Cash Application Log)</span>
      <span style="background:#0f766e; color:#5eead4; font-size:11px; padding:3px 10px; border-radius:999px; font-weight:bold;">LIVE SYNC</span>
    </div>
    <div style="color:#94a3b8; font-size:12.5px;">סריקה אחרונה: היום 14:15 • טריגר מתוזמן (כל 15 דק')</div>
  </div>

  <div class="stats-row">
    <div class="stat-card" style="border-right:3px solid #10b981;">
      <div class="stat-lbl">תקבולים נסרקו היום</div>
      <div class="stat-val">42 מיילים</div>
    </div>
    <div class="stat-card" style="border-right:3px solid #38bdf8;">
      <div class="stat-lbl">שיעור התאמה מושלמת (Zero-Touch)</div>
      <div class="stat-val" style="color:#38bdf8;">90.5%</div>
    </div>
    <div class="stat-card" style="border-right:3px solid #f59e0b;">
      <div class="stat-lbl">חריגים לטיפול אנושי (Exceptions)</div>
      <div class="stat-val" style="color:#fbbf24;">4 מיילים</div>
    </div>
    <div class="stat-card" style="border-right:3px solid #a855f7;">
      <div class="stat-lbl">עלות טוקנים כוללת (Claude)</div>
      <div class="stat-val" style="color:#c084fc;">$0.73 <span style="font-size:14px; color:#94a3b8;">(~₪2.7)</span></div>
    </div>
  </div>

  <div class="table-container">
    <div class="table-title">
      <span>תוצאות עיבוד אחרונות מתיבת ar@</span>
      <span style="font-size:12px; color:#38bdf8;">ספר חשבוניות: Priority ERP Live View</span>
    </div>

    <table>
      <thead>
        <tr>
          <th>שם לקוח / שולח</th>
          <th>מספר חשבונית</th>
          <th>סכום ששולם</th>
          <th>סכום בספרים</th>
          <th>סטטוס סיווג (Gmail Label)</th>
          <th>לוגיקת התאמה</th>
          <th>פעולת תיבה</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>סייברגלובל בע"מ</strong></td>
          <td><span class="num">INV-2026-8812</span></td>
          <td><span class="num">₪ 45,630.00</span></td>
          <td><span class="num">₪ 45,630.00</span></td>
          <td><span class="badge badge-matched">✔ MATCHED</span></td>
          <td>התאמה מלאה (PDF Remittance)</td>
          <td class="tag-archive">אורכב אוטומטית</td>
        </tr>
        <tr>
          <td><strong>נקסטג'ן פתרונות ענן</strong></td>
          <td><span class="num">INV-2026-8840</span></td>
          <td><span class="num">₪ 12,870.00</span></td>
          <td><span class="num">₪ 12,870.00</span></td>
          <td><span class="badge badge-matched">✔ MATCHED</span></td>
          <td>התאמה לפי מספר PO-77192</td>
          <td class="tag-archive">אורכב אוטומטית</td>
        </tr>
        <tr>
          <td><strong>מדיקל דיאגנוסטיקה בע"מ</strong></td>
          <td><span class="num">INV-2026-8795</span></td>
          <td><span class="num">₪ 19,000.00</span></td>
          <td><span class="num">₪ 20,000.00</span></td>
          <td><span class="badge badge-shortpay">⚠ SHORT_PAY</span></td>
          <td>ניכוי מס במקור 5% (1,000 ₪)</td>
          <td style="color:#fbbf24; font-weight:600;">נשאר בתיבה לבדיקה</td>
        </tr>
        <tr>
          <td><strong>אלפא תעשיות מתקדמות</strong></td>
          <td><span class="num">INV-2026-8890</span></td>
          <td><span class="num">₪ 84,200.00</span></td>
          <td><span class="num">₪ 84,200.00</span></td>
          <td><span class="badge badge-matched">✔ MATCHED</span></td>
          <td>הצלבת תשלום חברת-אם (אלפא אחזקות)</td>
          <td class="tag-archive">אורכב אוטומטית</td>
        </tr>
        <tr>
          <td><strong>ריטייל פלוס ישראל</strong></td>
          <td><span class="num">INV-2026-9014</span></td>
          <td><span class="num">₪ 3,450.00</span></td>
          <td><span class="num">₪ 0.00</span></td>
          <td><span class="badge badge-unknown">✕ UNKNOWN</span></td>
          <td>חשבונית לא אותרה במערכת פריוריטי</td>
          <td style="color:#f87171; font-weight:600;">נשאר בתיבה לבירור לקוח</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</body>
</html>
`;

async function run() {
  const tempHtmlPath = path.join(tempDir, 'ar_dashboard.html');
  const outPngPath = path.join(outDir, 'claude-ar-inbox-automation-dashboard.png');

  fs.writeFileSync(tempHtmlPath, html, 'utf-8');

  const cmd = `& "${edgePath}" --headless --disable-gpu --screenshot="${outPngPath}" --window-size=1200,680 "${tempHtmlPath}"`;
  execSync(cmd, { shell: 'powershell.exe' });
  console.log('Successfully generated:', outPngPath);
}

run().catch(console.error);
