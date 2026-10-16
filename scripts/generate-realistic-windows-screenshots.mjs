import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = path.resolve('public/images/blog');
const tempDir = path.resolve('scripts/temp_ui');

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// Windows 11 Titlebar component
function winTitleBar(title) {
  return `
  <div style="display:flex; justify-content:space-between; align-items:center; height:36px; background:#202020; color:#cccccc; font-family:'Segoe UI', sans-serif; font-size:12px; padding:0 12px; border-top-left-radius:8px; border-top-right-radius:8px; user-select:none; border-bottom:1px solid #2d2d2d;">
    <div style="display:flex; align-items:center; gap:8px;">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <span style="color:#ffffff; font-weight:600;">${title}</span>
    </div>
    <div style="display:flex; align-items:center; gap:16px;">
      <span style="font-size:13px; cursor:pointer;">&#8212;</span>
      <span style="font-size:11px; cursor:pointer;">&#9633;</span>
      <span style="font-size:14px; cursor:pointer; color:#ef4444;">&#10005;</span>
    </div>
  </div>
  `;
}

// 1. Step 1: Copilot Chat Prompt Analysis
const html1 = `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin:0; padding:0; }
  body { background:#0f172a; padding:30px; font-family:'Segoe UI', sans-serif; }
  .win { width:1100px; margin:0 auto; background:#18181b; border-radius:10px; border:1px solid #334155; box-shadow:0 25px 50px -12px rgba(0,0,0,0.7); overflow:hidden; }
  .app-header { display:flex; justify-content:space-between; align-items:center; padding:12px 24px; background:#27272a; border-bottom:1px solid #3f3f46; color:#f4f4f5; }
  .chat-area { padding:28px; display:flex; flex-direction:column; gap:20px; }
  .user-msg { background:#2563eb; color:#ffffff; padding:18px 22px; border-radius:16px 16px 4px 16px; max-width:85%; align-self:flex-start; font-size:15px; line-height:1.6; direction:ltr; text-align:left; box-shadow:0 4px 12px rgba(37,99,235,0.25); }
  .status-pill { display:inline-flex; align-items:center; gap:8px; background:rgba(56,189,248,0.15); border:1px solid #0284c7; color:#38bdf8; padding:6px 16px; border-radius:20px; font-size:13px; font-weight:600; width:fit-content; }
  .copilot-msg { background:#27272a; border:1px solid #3f3f46; color:#e4e4e7; padding:20px 24px; border-radius:16px 16px 16px 4px; max-width:88%; align-self:flex-end; font-size:14.5px; line-height:1.7; }
</style>
</head>
<body>
<div class="win">
  ${winTitleBar('Microsoft 365 Copilot — Web &amp; Work Graph')}
  <div class="app-header">
    <div style="display:flex; align-items:center; gap:12px;">
      <div style="width:36px; height:36px; border-radius:8px; background:linear-gradient(135deg, #0284c7, #8b5cf6); display:flex; align-items:center; justify-content:center; color:#fff; font-weight:bold;">C</div>
      <div>
        <div style="font-weight:700; font-size:16px;">Copilot Chat — רונן עמוס רו"ח (Work Account)</div>
        <div style="font-size:12px; color:#a1a1aa;">Connected to Outlook Emails &amp; Microsoft Teams Graph</div>
      </div>
    </div>
    <div style="background:#10b981; color:#064e3b; padding:4px 12px; border-radius:12px; font-size:12px; font-weight:700;">● Enterprise Protected</div>
  </div>
  <div class="chat-area">
    <div class="user-msg">
      <strong>Prompt:</strong><br>
      Please review the emails I have sent or replied to in Outlook and the messages I sent in Microsoft Teams over the past 24 months. Analyze my authentic communication patterns and extract my exact personal brand voice and writing style... Output the entire result as a clean, structured SKILL.md specification file.
    </div>
    
    <div class="status-pill">
      <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:#38bdf8; animation:pulse 1s infinite;"></span>
      סורק נתונים ב-Microsoft Graph: 1,420 מיילים נשלחו • 840 הודעות Teams • מפיק מאפייני סגנון...
    </div>

    <div class="copilot-msg">
      <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px; color:#38bdf8; font-weight:700; font-size:15px;">
        ✦ Copilot Analysis Complete
      </div>
      שלום רונן, ניתחתי את דפוסי התקשורת שלך מהשנתיים האחרונות. זיהיתי סגנון ישיר וממוקד CFO:
      <ul style="margin:10px 24px; display:flex; flex-direction:column; gap:6px;">
        <li><strong>טון כללי:</strong> תמציתי, פרקטי, קורקטי ללא פתיחים מליציים ("היי [שם]" ישירות לנושא).</li>
        <li><strong>מבנה:</strong> פסקאות קצרות (עד 3 שורות), שימוש תדיר בבולטים להצגת מספרים ותאריכי יעד.</li>
        <li><strong>טרמינולוגיה:</strong> שילוב עברית עם מונחי FP&amp;A באנגלית (ARR, Runway, Capex, Priority, תקציב, חריגה).</li>
      </ul>
      גיבשתי עבורך קובץ הנחיות מובנה: <strong>FINANCE_CFO_VOICE_SKILL.md</strong> להטמעה בסוכן.
    </div>
  </div>
</div>
</body>
</html>
`;

// 2. Step 2: The SKILL.md file viewer in Copilot
const html2 = `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin:0; padding:0; }
  body { background:#0f172a; padding:30px; font-family:'Segoe UI', sans-serif; }
  .win { width:1100px; margin:0 auto; background:#18181b; border-radius:10px; border:1px solid #334155; box-shadow:0 25px 50px -12px rgba(0,0,0,0.7); overflow:hidden; }
  .code-container { margin:24px; background:#090d16; border:1px solid #334155; border-radius:8px; overflow:hidden; }
  .code-bar { display:flex; justify-content:space-between; align-items:center; background:#1e293b; padding:10px 18px; border-bottom:1px solid #334155; }
  pre { padding:24px; color:#f8fafc; font-family:Consolas, monospace; font-size:13.5px; line-height:1.6; direction:ltr; text-align:left; white-space:pre-wrap; }
  .tag { background:rgba(13,148,136,0.25); color:#2dd4bf; border:1px solid #0d9488; padding:3px 10px; border-radius:12px; font-size:12px; font-weight:bold; }
  .copy-btn { background:#0284c7; color:#fff; border:none; padding:6px 14px; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer; }
</style>
</head>
<body>
<div class="win">
  ${winTitleBar('Microsoft 365 Copilot — Generated Artifact: SKILL.md')}
  <div style="padding:16px 24px; background:#27272a; border-bottom:1px solid #3f3f46; display:flex; justify-content:space-between; align-items:center;">
    <div>
      <h2 style="color:#ffffff; font-size:18px;">📄 FINANCE_CFO_VOICE_SKILL.md</h2>
      <p style="color:#94a3b8; font-size:13px;">מסמך אפיון הקול והסגנון (מותאם לחשבים ומנהלי כספים) • נקי ממידע רגיש (Sanitized)</p>
    </div>
    <span class="tag">✓ שעבר אימות חשבונאי</span>
  </div>
  <div class="code-container">
    <div class="code-bar">
      <span style="color:#cbd5e1; font-size:12px; font-family:monospace;">SKILL.md — Markdown Specification</span>
      <button class="copy-btn">📋 Copy Code</button>
    </div>
    <pre>
# Persona & Voice Specification: CFO & Finance Director (Ronen Amos)

## 1. Core Persona & Communication Rules
- Tone: Direct, pragmatic, metrics-driven, respectful, no-nonsense.
- Pacing: Get straight to the bottom line within the first 2 sentences.
- Structure: Max 3 paragraphs. Always use bullets for variances, dates, and ownership.

## 2. Professional Terminology
- Israeli Hebrew + English standard finance terms:
  FP&A, ARR, Runway, EBITDA, Priority ERP, NetSuite, Capex/Opex, תזרים, בקרה.
- Currencies: ₪ for NIS (e.g. ₪45K), $ for USD (e.g. $1.2M).

## 3. Strict Negative Constraints (What NEVER to do)
- NO fluffy openers ("I hope this email finds you well", "מקווה שהכל בסדר").
- NO multiple exclamation marks (!!).
- NO passive voice when assigning financial tasks.

## 4. Sign-offs
- Internal: "תודה, רונן"
- External: "בברכה, רונן עמוס רו״ח, סמנכ״ל כספים"
    </pre>
  </div>
</div>
</body>
</html>
`;

// 3. Step 3: Copilot Studio / Agent Builder
const html3 = `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin:0; padding:0; }
  body { background:#0f172a; padding:30px; font-family:'Segoe UI', sans-serif; }
  .win { width:1100px; margin:0 auto; background:#18181b; border-radius:10px; border:1px solid #334155; box-shadow:0 25px 50px -12px rgba(0,0,0,0.7); overflow:hidden; }
  .tabs { display:flex; gap:20px; border-bottom:1px solid #334155; padding:0 24px; background:#202020; }
  .tab { padding:14px 0; color:#94a3b8; font-weight:600; font-size:14px; border-bottom:2px solid transparent; cursor:pointer; }
  .tab.active { color:#38bdf8; border-color:#38bdf8; }
  .content { padding:28px; display:grid; grid-template-columns:1fr 1fr; gap:24px; }
  .card { background:#27272a; border:1px solid #3f3f46; border-radius:8px; padding:20px; display:flex; flex-direction:column; gap:14px; }
  .label { font-size:13px; font-weight:700; color:#f8fafc; }
  .input { background:#18181b; border:1px solid #52525b; border-radius:6px; padding:10px 14px; color:#fff; font-size:14px; }
  .textarea { background:#18181b; border:1px solid #52525b; border-radius:6px; padding:10px 14px; color:#e4e4e7; font-size:13px; line-height:1.5; height:140px; resize:none; direction:ltr; text-align:left; font-family:monospace; }
  .file-badge { display:flex; align-items:center; justify-content:space-between; background:#0f172a; border:1px solid #0d9488; padding:10px 14px; border-radius:6px; color:#2dd4bf; font-size:13px; }
</style>
</head>
<body>
<div class="win">
  ${winTitleBar('Microsoft Copilot Studio — Agent Configuration')}
  <div class="tabs">
    <div class="tab">תיאור וסקירה (Overview)</div>
    <div class="tab active">הגדרות סוכן (Configure)</div>
    <div class="tab">בדיקה בזמן אמת (Test Agent)</div>
  </div>
  <div class="content">
    <div class="card">
      <div class="label">שם הסוכן (Agent Name)</div>
      <div class="input">סוכן ניסוח אישי — רונן עמוס (My Finance Voice Agent)</div>

      <div class="label">הנחיות מערכת (Instructions)</div>
      <div class="textarea">You are Ronen Amos's dedicated writing agent. Always adopt the exact brand voice, tone, and constraints defined in the uploaded SKILL.md file. When drafting emails, focus on CFO precision, concise Hebrew sentences, and correct FP&A terminology.</div>
    </div>

    <div class="card">
      <div class="label">מקורות ידע והנחיות (Knowledge Sources)</div>
      <div style="font-size:13px; color:#a1a1aa;">הסוכן ישתמש במסמכים אלו להחלת חוקי הניסוח:</div>
      
      <div class="file-badge">
        <div style="display:flex; align-items:center; gap:8px;">
          <span>📄</span>
          <strong>FINANCE_CFO_VOICE_SKILL.md</strong>
        </div>
        <span style="font-size:12px; color:#10b981; font-weight:bold;">● פעיל (Loaded)</span>
      </div>

      <div style="margin-top:auto; background:#1e293b; padding:14px; border-radius:6px; border:1px dashed #475569; text-align:center;">
        <span style="color:#38bdf8; font-size:13px; font-weight:600;">+ העלאת קבצי ידע נוספים (מדיניות רכש, תבניות דיווח)</span>
      </div>
    </div>
  </div>
</div>
</body>
</html>
`;

// 4. Step 4: Testing & Comparison Before / After
const html4 = `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin:0; padding:0; }
  body { background:#0f172a; padding:30px; font-family:'Segoe UI', sans-serif; }
  .win { width:1100px; margin:0 auto; background:#18181b; border-radius:10px; border:1px solid #334155; box-shadow:0 25px 50px -12px rgba(0,0,0,0.7); overflow:hidden; }
  .grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; padding:24px; }
  .box { border-radius:8px; padding:20px; font-size:14px; line-height:1.6; }
  .bad { background:#1c1917; border:1px solid #ef4444; color:#fca5a5; }
  .good { background:#064e3b; border:1px solid #10b981; color:#d1fae5; }
  .badge-bad { background:rgba(239,68,68,0.2); color:#ef4444; font-weight:bold; padding:4px 10px; border-radius:12px; font-size:12px; display:inline-block; margin-bottom:12px; }
  .badge-good { background:rgba(16,185,129,0.2); color:#10b981; font-weight:bold; padding:4px 10px; border-radius:12px; font-size:12px; display:inline-block; margin-bottom:12px; }
</style>
</head>
<body>
<div class="win">
  ${winTitleBar('Copilot Test Bench — השוואת ביצועים: ניסוח רגיל מול סוכן הקול של רונן עמוס')}
  <div class="grid">
    <div class="box bad">
      <span class="badge-bad">❌ ללא סוכן (ניסוח גנרי של AI)</span>
      <p style="color:#e2e8f0; margin-bottom:10px;"><strong>שלום רב,</strong><br>אני מקווה שהודעה זו מוצאת אותך בטוב ושבוע העבודה מתקדם כשורה. בהמשך לבקשתך המפורטת בנוגע להגדלת מסגרת התקציב עבור הכנס החשוב, ברצוני להביא לידיעתך כי בשלב זה לא נוכל להיעתר לבקשה לאישור החריגה בסך 45,000 ש"ח...</p>
      <div style="font-size:12px; color:#f87171; border-top:1px dashed #7f1d1d; padding-top:8px;">
        ⚠️ ארוך מדי • קלישאתי • מנותק מהמספרים ב-ERP • דורש 10 דקות שכתוב
      </div>
    </div>

    <div class="box good">
      <span class="badge-good">✅ עם סוכן ה-Voice האישי (My Finance Agent)</span>
      <p style="color:#ffffff; margin-bottom:10px;"><strong>היי תומר,</strong><br>ראיתי את הבקשה לכנס. תקציב ה-Opex של השיווק ל-Q3 עומד על 98% ניצול מול ה-Budget ב-Priority. אין לנו מקום לחריגה של 45,000 ₪ ברבעון הנוכחי ללא פגיעה ביעד ה-EBITDA.<br><br><strong>הפתרון שאני מאשר:</strong><br>1. הקפאת הקמפיין הדיגיטלי (סעיף 4201) והסטת 30,000 ₪.<br>2. דחיית 15,000 ₪ ל-Q4.<br>תעדכן אותי עד 14:00 להוצאת PO לספק.<br><br>תודה, רונן</p>
      <div style="font-size:12px; color:#34d399; border-top:1px dashed #065f46; padding-top:8px;">
        ✓ חד וממוקד • שומר על יעדי דירקטוריון • פתרון מעשי מבוסס Priority • מוכן למשלוח מיידי
      </div>
    </div>
  </div>
</div>
</body>
</html>
`;

// 5. Step 5: Outlook for Windows Integration
const html5 = `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin:0; padding:0; }
  body { background:#0f172a; padding:30px; font-family:'Segoe UI', sans-serif; }
  .win { width:1100px; margin:0 auto; background:#ffffff; border-radius:10px; border:1px solid #cbd5e1; box-shadow:0 25px 50px -12px rgba(0,0,0,0.7); overflow:hidden; color:#1e293b; }
  .ribbon { background:#f1f5f9; padding:8px 16px; border-bottom:1px solid #cbd5e1; display:flex; gap:16px; font-size:13px; font-weight:600; color:#334155; }
  .body-area { display:flex; height:420px; }
  .email-compose { flex:1; padding:20px; display:flex; flex-direction:column; gap:12px; background:#ffffff; border-left:1px solid #e2e8f0; }
  .field { display:flex; align-items:center; gap:10px; border-bottom:1px solid #f1f5f9; padding-bottom:8px; font-size:13.5px; }
  .field-label { width:50px; color:#64748b; font-weight:bold; }
  .sidebar { width:360px; background:#f8fafc; padding:18px; display:flex; flex-direction:column; gap:14px; border-right:1px solid #e2e8f0; }
  .agent-header { display:flex; align-items:center; gap:10px; padding-bottom:12px; border-bottom:1px solid #e2e8f0; }
  .prompt-box { background:#ffffff; border:1.5px solid #0284c7; border-radius:8px; padding:10px; font-size:13px; line-height:1.4; color:#0f172a; }
  .insert-btn { background:#0284c7; color:#fff; border:none; padding:8px 16px; border-radius:6px; font-weight:bold; font-size:13px; cursor:pointer; width:100%; margin-top:auto; }
</style>
</head>
<body>
<div class="win">
  ${winTitleBar('Outlook (Classic &amp; New for Windows) — הודעה חדשה')}
  <div class="ribbon">
    <span style="color:#0284c7; border-bottom:2px solid #0284c7; padding-bottom:4px;">הודעה (Message)</span>
    <span>הוספה (Insert)</span>
    <span>אפשרויות (Options)</span>
    <span style="margin-right:auto; display:flex; align-items:center; gap:6px; color:#0284c7;">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#0284c7" stroke-width="2"/></svg>
      Copilot Sidebar
    </span>
  </div>

  <div class="body-area">
    <div class="email-compose">
      <div class="field"><span class="field-label">אל:</span> <span>accounting@vendor-corp.co.il</span></div>
      <div class="field"><span class="field-label">נושא:</span> <strong>אישור מועד תשלום מס"ב — חשבונית 40982</strong></div>
      <div style="padding-top:12px; font-size:14px; line-height:1.7; color:#0f172a;">
        היי מיכל,<br><br>
        בהמשך לבירור לגבי חשבונית 40982:<br>
        התשלום בסך 65,000 ₪ נקלט במערכת וישודר במסלקת מס"ב ביום חמישי הקרוב, בהתאם לתנאי שוטף+60 שנקבעו בהסכם ההתקשרות.<br><br>
        נא לדאוג לשליחת קבלה מקורית חתומה למחלקת הנהלת חשבונות מיד עם קבלת הזיכוי בבנק.<br><br>
        תודה,<br>
        רונן עמוס רו"ח
      </div>
    </div>

    <div class="sidebar">
      <div class="agent-header">
        <div style="width:28px; height:28px; border-radius:6px; background:linear-gradient(135deg, #0284c7, #10b981); display:flex; align-items:center; justify-content:center; color:#fff; font-size:12px; font-weight:bold;">AI</div>
        <div>
          <div style="font-weight:bold; font-size:13px; color:#0f172a;">סוכן ניסוח אישי (רונן עמוס)</div>
          <div style="font-size:11px; color:#10b981;">● מחובר ל-SKILL.md</div>
        </div>
      </div>

      <div style="font-size:12px; color:#64748b; font-weight:600;">הוראה קצרה לסוכן:</div>
      <div class="prompt-box">
        נסח מענה לחשב של ספק X: תשלום של 65,000 ₪ ישודר במס"ב ביום חמישי הקרוב בשוטף+60. בקש קבלה מקורית.
      </div>

      <div style="background:#e0f2fe; color:#0369a1; padding:8px 12px; border-radius:6px; font-size:12px;">
        ✓ נוסחה טיוטה מלאה בסגנון הקול שלך בתוך 1.8 שניות
      </div>

      <button class="insert-btn">הכנס להודעה (Insert into Email)</button>
    </div>
  </div>
</div>
</body>
</html>
`;

const items = [
  { file: 'copilot-voice-step1-prompt-analysis.png', html: html1 },
  { file: 'copilot-voice-step2-skill-file.png', html: html2 },
  { file: 'copilot-voice-step3-agent-config.png', html: html3 },
  { file: 'copilot-voice-step4-testing-comparison.png', html: html4 },
  { file: 'copilot-voice-step5-outlook-integration.png', html: html5 },
];

for (const item of items) {
  const tmpHtml = path.join(tempDir, item.file.replace('.png', '.html'));
  const targetImg = path.join(outDir, item.file);
  
  fs.writeFileSync(tmpHtml, item.html, 'utf8');
  console.log(`Rendering realistic screenshot for ${item.file}...`);
  
  execSync(
    `"${edgePath}" --headless --disable-gpu --screenshot="${targetImg}" --window-size=1200,680 --hide-scrollbars "file://${tmpHtml.replace(/\\\\/g, '/')}"`
  );
}

// Clean temp directory
fs.rmSync(tempDir, { recursive: true, force: true });
console.log('All realistic screenshots generated successfully!');
