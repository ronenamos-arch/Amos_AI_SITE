import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = path.resolve('public/images/blog');
const tempDir = path.resolve('scripts/temp_duet_html');

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Common styles & footer wrapper
function wrapPage(title, width, height, bodyContent) {
  return `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: ${width}px;
    height: ${height}px;
    overflow: hidden;
    background: radial-gradient(circle at 10% 10%, #fffdfa 0%, #faf6f0 50%, #f4eee3 100%);
    font-family: 'Segoe UI', system-ui, -apple-system, Roboto, sans-serif;
    color: #0f172a;
    position: relative;
    padding: 35px 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .deco-dots {
    position: absolute;
    top: 30px;
    left: 40px;
    display: grid;
    grid-template-columns: repeat(4, 10px);
    gap: 8px;
    opacity: 0.35;
  }
  .deco-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #64748b;
  }
  
  .deco-sun {
    position: absolute;
    top: 25px;
    right: 40px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #ddd6fe;
    opacity: 0.5;
  }

  .deco-squiggle {
    position: absolute;
    bottom: 25px;
    left: 45px;
    width: 45px;
    height: 18px;
    border-bottom: 3px solid #f97316;
    border-radius: 50%;
    opacity: 0.6;
  }

  .card-shadow {
    box-shadow: 0 8px 30px rgba(15, 23, 42, 0.05), 0 2px 8px rgba(15, 23, 42, 0.03);
  }

  .footer-bar {
    border-top: 1px solid #e2e8f0;
    padding-top: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    font-size: 14.5px;
    font-weight: 700;
    color: #64748b;
    letter-spacing: 0.5px;
  }
</style>
</head>
<body>
  <div class="deco-dots">
    ${Array(12).fill('<div class="deco-dot"></div>').join('')}
  </div>
  <div class="deco-sun"></div>
  <div class="deco-squiggle"></div>

  <div style="flex: 1; display: flex; flex-direction: column; justify-content: center;">
    ${bodyContent}
  </div>

  <div class="footer-bar">
    <span>רונן עמוס רו״ח</span> <span>&bull;</span> <span>קהילת AI Finance Transformation</span> <span>&bull;</span> <span>ronenamoscpa.co.il</span>
  </div>
</body>
</html>`;
}

// 1. Header Infographic (1200 x 630)
const htmlHeader = wrapPage('Header', 1200, 630, `
  <div style="text-align: center; margin-bottom: 25px;">
    <div style="display: inline-flex; align-items: center; gap: 8px; background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 30px; padding: 6px 22px; font-size: 13px; font-weight: 800; color: #475569; letter-spacing: 1px; box-shadow: 0 2px 10px rgba(0,0,0,0.03); margin-bottom: 16px;">
      AI FINANCE TRANSFORMATION &bull; ANTHROPIC CLAUDE DUET
    </div>

    <div style="display: flex; align-items: center; justify-content: center; gap: 14px; margin-bottom: 12px;">
      <div style="width: 48px; height: 48px; border-radius: 14px; background: #ea580c; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(234, 88, 12, 0.25);">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M4 12c2-4 6-4 8 0s6 4 8 0" stroke="#000" stroke-width="3" stroke-linecap="round"/></svg>
      </div>
      <span style="font-family: Georgia, serif; font-size: 38px; font-weight: bold; color: #0f172a;">Claude Duet</span>
    </div>

    <h1 style="font-size: 33px; font-weight: 900; color: #0f172a; margin-bottom: 8px; line-height: 1.2;">
      <span>מה זה Claude Duet &mdash; סוכן ה-AI הפרואקטיבי של Anthropic למנהלי כספים</span>
    </h1>
    <p style="font-size: 17.5px; color: #475569; font-weight: 500;">הסוכן שניגש אליך ראשון: תדריך בוקר, בדיקות שקטות ברקע ועבודה בענן כשהלפטופ סגור</p>
  </div>

  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; max-width: 1100px; margin: 0 auto; width: 100%;">
    <!-- Col 1 (Right in RTL) -->
    <div class="card-shadow" style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 18px; padding: 24px;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 14px;">
        <div style="width: 42px; height: 42px; border-radius: 12px; background: #ecfdf5; display: flex; align-items: center; justify-content: center; font-size: 20px;">⚡</div>
        <div style="font-size: 18px; font-weight: 800; color: #0f172a;">פרואקטיבי לחלוטין</div>
      </div>
      <div style="border-top: 1px solid #f1f5f9; padding-top: 12px; display: flex; flex-direction: column; gap: 8px; font-size: 14px; color: #334155; line-height: 1.5;">
        <div>&bull; <strong>תדריך בוקר</strong> על מה שקריטי במערכות</div>
        <div>&bull; <strong>סריקה מתוזמנת</strong> כל כמה שעות</div>
        <div>&bull; <strong>שקט מוחלט</strong> כשאין צורך בהחלטה</div>
        <div>&bull; רץ במכונה וירטואלית עם דפדפן בענן</div>
      </div>
    </div>

    <!-- Col 2 (Middle) -->
    <div class="card-shadow" style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 18px; padding: 24px;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 14px;">
        <div style="width: 42px; height: 42px; border-radius: 12px; background: #eff6ff; display: flex; align-items: center; justify-content: center; font-size: 20px;">🛡️</div>
        <div style="font-size: 18px; font-weight: 800; color: #0f172a;">4 מעצורי ביטחון</div>
      </div>
      <div style="border-top: 1px solid #f1f5f9; padding-top: 12px; display: flex; flex-direction: column; gap: 8px; font-size: 14px; color: #334155; line-height: 1.5;">
        <div>&bull; <strong>לעולם אינו שולח</strong> הודעה ללא אישור</div>
        <div>&bull; <strong>תשלומים</strong> מחייבים אישור אדם וכרטיס וירטואלי</div>
        <div>&bull; <strong>אין חתימה על חוזה</strong> ללא בדיקה</div>
        <div>&bull; <strong>אין מחיקת קבצים</strong> או נתונים ללא הסכמה</div>
      </div>
    </div>

    <!-- Col 3 (Left in RTL) -->
    <div class="card-shadow" style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 18px; padding: 24px;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 14px;">
        <div style="width: 42px; height: 42px; border-radius: 12px; background: #faf5ff; display: flex; align-items: center; justify-content: center; font-size: 20px;">📈</div>
        <div style="font-size: 18px; font-weight: 800; color: #0f172a;">סולם אמון מדורג</div>
      </div>
      <div style="border-top: 1px solid #f1f5f9; padding-top: 12px; display: flex; flex-direction: column; gap: 8px; font-size: 14px; color: #334155; line-height: 1.5;">
        <div>&bull; <strong>שבוע 1:</strong> קריאה בלבד ודוחות חובות/פיגור</div>
        <div>&bull; <strong>שבוע 2:</strong> ניסוח טיוטות ובדיקת כל שליחה</div>
        <div>&bull; <strong>אמצעי תשלום:</strong> מנותקים עד הוכחת אמון</div>
        <div>&bull; כלול ב-Pro/Max ללא עלות נוספת</div>
      </div>
    </div>
  </div>
`);

// 2. What it does without being asked (1200 x 1150)
const htmlWhatItDoes = wrapPage('What It Does', 1200, 1150, `
  <div style="text-align: center; margin-bottom: 25px;">
    <h2 style="font-family: Georgia, serif; font-size: 44px; font-weight: bold; color: #0f172a; margin-bottom: 8px;">מה הוא עושה בלי שתבקשו</h2>
    <p style="font-size: 18px; color: #64748b; font-weight: 500;">במקום להמתין לפקודה בצ'אט &mdash; Claude Duet מפעיל לולאת פעולה פרואקטיבית בענן</p>
  </div>

  <div style="position: relative; max-width: 1050px; margin: 0 auto; width: 100%; height: 860px;">
    <svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;">
      <path d="M 525 210 L 525 320" stroke="#c084fc" stroke-width="2.5" stroke-dasharray="6,6"/>
      <path d="M 665 390 Q 770 330 830 290" fill="none" stroke="#f97316" stroke-width="2.5"/>
      <path d="M 665 470 Q 770 540 830 580" fill="none" stroke="#0ea5e9" stroke-width="2.5"/>
      <path d="M 525 540 L 525 660" stroke="#10b981" stroke-width="2.5"/>
      <path d="M 385 470 Q 280 540 220 580" fill="none" stroke="#8b5cf6" stroke-width="2.5"/>
      <path d="M 385 390 Q 280 330 220 290" fill="none" stroke="#10b981" stroke-width="2.5"/>
    </svg>

    <!-- Center Hub Card -->
    <div class="card-shadow" style="position: absolute; top: 320px; left: 50%; transform: translateX(-50%); width: 280px; background: #ffffff; border: 2px solid #cbd5e1; border-radius: 26px; padding: 24px; text-align: center; z-index: 10;">
      <div style="width: 86px; height: 86px; border-radius: 50%; background: #f5f3ff; margin: 0 auto 12px; display: flex; align-items: center; justify-content: center; font-size: 40px;">🪐</div>
      <div style="font-family: Georgia, serif; font-size: 32px; font-weight: bold; color: #0f172a; margin-bottom: 4px;">סוכן ה-AI</div>
      <div style="font-size: 12px; font-weight: 800; color: #7c3aed; background: #f5f3ff; padding: 4px 12px; border-radius: 20px; display: inline-block;">CLAUDE DUET CORE</div>
    </div>

    <!-- 1. Top Card: Morning Brief -->
    <div class="card-shadow" style="position: absolute; top: 10px; left: 50%; transform: translateX(-50%); width: 380px; background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 20px; padding: 18px 24px; text-align: center; z-index: 5;">
      <div style="display: flex; justify-content: center; gap: 8px; margin-bottom: 10px;">
        <span style="background: #f3e8ff; padding: 6px 10px; border-radius: 8px; font-size: 16px;">📄</span>
        <span style="background: #ecfdf5; padding: 6px 10px; border-radius: 8px; font-size: 16px;">📊</span>
        <span style="background: #eff6ff; padding: 6px 10px; border-radius: 8px; font-size: 16px;">✉️</span>
        <span style="background: #fff7ed; padding: 6px 10px; border-radius: 8px; font-size: 16px;">📅</span>
      </div>
      <div style="font-size: 20px; font-weight: 800; color: #0f172a; margin-bottom: 8px;">תדריך בוקר מרוכז</div>
      <div style="background: #faf5ff; border-radius: 10px; padding: 8px 12px; font-size: 14px; color: #6b21a8; font-weight: 600;">
        סיכום ממוקד של מה שחשוב בכל המערכות המחוברות
      </div>
    </div>

    <!-- 2. Top-Right: Decision Needed -->
    <div class="card-shadow" style="position: absolute; top: 170px; right: 0; width: 330px; background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 20px; padding: 20px; text-align: center; z-index: 5;">
      <div style="width: 50px; height: 50px; border-radius: 14px; background: #ffedd5; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center; font-size: 24px;">⚠️</div>
      <div style="font-size: 20px; font-weight: 800; color: #0f172a; margin-bottom: 8px;">החלטה נדרשת</div>
      <div style="background: #fff7ed; border-radius: 10px; padding: 10px 12px; font-size: 13.5px; color: #9a3412; font-weight: 600; line-height: 1.4;">
        שולח הודעה רק כשנדרש שיקול דעת אנושי. ביתר הזמן &mdash; שקט מוחלט.
      </div>
    </div>

    <!-- 3. Bottom-Right: VM + Browser -->
    <div class="card-shadow" style="position: absolute; bottom: 170px; right: 0; width: 330px; background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 20px; padding: 20px; text-align: center; z-index: 5;">
      <div style="width: 50px; height: 50px; border-radius: 14px; background: #e0f2fe; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center; font-size: 24px;">💻</div>
      <div style="font-size: 20px; font-weight: 800; color: #0f172a; margin-bottom: 8px;">מכונה וירטואלית ודפדפן</div>
      <div style="background: #f0f9ff; border-radius: 10px; padding: 10px 12px; font-size: 13.5px; color: #0369a1; font-weight: 600; line-height: 1.4;">
        מבצע פעולות בדפדפן בענן. ממשיך לעבוד גם כשהלפטופ שלכם סגור.
      </div>
    </div>

    <!-- 4. Bottom: Context Carrier -->
    <div class="card-shadow" style="position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); width: 400px; background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 20px; padding: 18px 24px; text-align: center; z-index: 5;">
      <div style="display: flex; justify-content: center; gap: 8px; margin-bottom: 10px;">
        <span style="background: #dcfce7; padding: 6px 10px; border-radius: 8px; font-size: 16px;">📖</span>
        <span style="background: #f3e8ff; padding: 6px 10px; border-radius: 8px; font-size: 16px;">🪄</span>
        <span style="background: #ffedd5; padding: 6px 10px; border-radius: 8px; font-size: 16px;">🔗</span>
      </div>
      <div style="font-size: 20px; font-weight: 800; color: #0f172a; margin-bottom: 8px;">שומר על ההקשר והידע המלא</div>
      <div style="background: #f0fdf4; border-radius: 10px; padding: 8px 14px; font-size: 13.5px; color: #166534; font-weight: 600; line-height: 1.4;">
        נושא זיכרון ארגוני, Skills מותאמים, ואת כל החיבורים הקיימים לחשבון Claude
      </div>
    </div>

    <!-- 5. Bottom-Left: One ongoing thread -->
    <div class="card-shadow" style="position: absolute; bottom: 170px; left: 0; width: 330px; background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 20px; padding: 20px; text-align: center; z-index: 5;">
      <div style="width: 50px; height: 50px; border-radius: 14px; background: #ede9fe; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center; font-size: 24px;">🎙️</div>
      <div style="font-size: 20px; font-weight: 800; color: #0f172a; margin-bottom: 8px;">שיחה רציפה אחת</div>
      <div style="background: #faf5ff; border-radius: 10px; padding: 10px 12px; font-size: 13.5px; color: #6d28d9; font-weight: 600; line-height: 1.4;">
        תקשורת שוטפת בהקלדה או קולית בשרשור מתמשך אחד, ללא פתיחת צ'אטים חדשים.
      </div>
    </div>

    <!-- 6. Top-Left: Periodic checks -->
    <div class="card-shadow" style="position: absolute; top: 170px; left: 0; width: 330px; background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 20px; padding: 20px; text-align: center; z-index: 5;">
      <div style="width: 50px; height: 50px; border-radius: 14px; background: #ccfbf1; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center; font-size: 24px;">⏱️</div>
      <div style="font-size: 20px; font-weight: 800; color: #0f172a; margin-bottom: 8px;">בדיקה כל כמה שעות</div>
      <div style="background: #f0fdf4; border-radius: 10px; padding: 10px 12px; font-size: 13.5px; color: #166534; font-weight: 600; line-height: 1.4;">
        סריקה מבוקרת במרווחי זמן מדודים &mdash; חוסכת טוקנים ומונעת הצפת התרעות שווא.
      </div>
    </div>
  </div>
`);

// 3. The jobs Anthropic says it takes on (1200 x 960)
const htmlJobs = wrapPage('Jobs', 1200, 960, `
  <div style="text-align: center; margin-bottom: 24px;">
    <h2 style="font-family: Georgia, serif; font-size: 40px; font-weight: bold; color: #0f172a; margin-bottom: 8px;">המשימות ש-Anthropic מייעדת לסוכן</h2>
    <p style="font-size: 17.5px; color: #64748b; font-weight: 500;">חלוקת האחריות בין המשימה העסקית, ביצוע ה-AI, והמערכות המחוברות</p>
  </div>

  <div style="max-width: 1080px; margin: 0 auto; width: 100%;">
    <div style="display: grid; grid-template-columns: 280px 1fr 240px; gap: 16px; margin-bottom: 12px;">
      <div class="card-shadow" style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 12px 18px; font-size: 16px; font-weight: 800; color: #0f172a; display: flex; align-items: center; gap: 10px;">
        <span style="background: #ede9fe; padding: 4px 8px; border-radius: 8px;">💼</span> המשימה שלך בעסק
      </div>
      <div class="card-shadow" style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 12px 18px; font-size: 16px; font-weight: 800; color: #0f172a; display: flex; align-items: center; gap: 10px;">
        <span style="background: #ede9fe; padding: 4px 8px; border-radius: 8px;">✨</span> מה ש-Duet מבצע בפועל
      </div>
      <div class="card-shadow" style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 12px 18px; font-size: 16px; font-weight: 800; color: #0f172a; display: flex; align-items: center; gap: 10px;">
        <span style="background: #ede9fe; padding: 4px 8px; border-radius: 8px;">📱</span> מערכות מקושרות
      </div>
    </div>

    <div style="display: flex; flex-direction: column; gap: 10px;">
      ${[
        { job: "מענה לפניית ליד חדש", duet: "מאתר הודעות שפוספסו ומנסח טיוטת מענה מותאמת", apps: "Gmail, Slack" },
        { job: "מרדף אחר חשבוניות פתוחות", duet: "בודק חובות וחשבוניות באיחור ומכין תזכורות לגבייה", apps: "QuickBooks, Stripe, ERP" },
        { job: "מעקב אחר עסקאות (Follow-up)", duet: "מנסח מיילי המשך מתוך היסטוריית השיחה והעסקה", apps: "HubSpot, CRM" },
        { job: "החתמת חוזים והסכמים", duet: "מכין הסכמים ומנתב אותם לבדיקה ולחתימה דיגיטלית", apps: "DocuSign" },
        { job: "השקת מהלך שיווקי", duet: "הופך את חומרי ההשקה לקמפיין ותוכן מופץ", apps: "Canva" },
        { job: "תשלום שכר לצוות", duet: "מכין שכר לפי שעות ובונוסים לבדיקת סמנכ\"ל הכספים", apps: "Gusto, מערכות שכר" },
        { job: "גיוס עובדים חדשים", duet: "מנסח תיאור משרה ומפרסם רק לאחר אישור מפורש", apps: "LinkedIn" },
        { job: "ניהול חנות דיגיטלית", duet: "מקים, מעצב ומנהל עדכונים שוטפים בחנות", apps: "Shopify" }
      ].map(r => `
        <div style="display: grid; grid-template-columns: 280px 1fr 240px; gap: 16px;">
          <div class="card-shadow" style="background: #ffffff; border: 1px solid #f1f5f9; border-radius: 12px; padding: 12px 18px; font-size: 14.5px; font-weight: 700; color: #0f172a; display: flex; align-items: center;">${r.job}</div>
          <div class="card-shadow" style="background: #ffffff; border: 1px solid #f1f5f9; border-radius: 12px; padding: 12px 18px; font-size: 14px; color: #334155; display: flex; align-items: center;">${r.duet}</div>
          <div class="card-shadow" style="background: #ffffff; border: 1px solid #f1f5f9; border-radius: 12px; padding: 12px 18px; font-size: 14px; font-weight: 700; color: #0369a1; display: flex; align-items: center;">${r.apps}</div>
        </div>
      `).join('')}
    </div>
  </div>
`);

// 4. The four things it always stops for (1200 x 820)
const htmlFourStops = wrapPage('Four Stops', 1200, 820, `
  <div style="text-align: center; margin-bottom: 24px;">
    <h2 style="font-family: Georgia, serif; font-size: 38px; font-weight: bold; color: #0f172a; margin-bottom: 8px;">4 הפעולות שבהן הסוכן תמיד עוצר וממתין לאישורך</h2>
    <p style="font-size: 17px; color: #64748b; font-weight: 500;">שכבות הבטיחות של Duet: הכנה עצמאית ברקע, אך עצירה מוחלטת לפני פעולות בלתי-הפיכות</p>
  </div>

  <div style="max-width: 1080px; margin: 0 auto; width: 100%;">
    <div style="display: grid; grid-template-columns: 420px 1fr; gap: 16px; margin-bottom: 12px;">
      <div class="card-shadow" style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 12px 20px; font-size: 16px; font-weight: 800; color: #0f172a; display: flex; align-items: center; gap: 10px;">
        <span style="background: #ede9fe; padding: 4px 8px; border-radius: 8px;">📋</span> מה שהסוכן עשוי לעשות
      </div>
      <div class="card-shadow" style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 12px 20px; font-size: 16px; font-weight: 800; color: #0f172a; display: flex; align-items: center; gap: 10px;">
        <span style="background: #ecfdf5; padding: 4px 8px; border-radius: 8px;">🛡️</span> מה שקורה בפועל (מעצור ביטחון מובנה)
      </div>
    </div>

    <div style="display: flex; flex-direction: column; gap: 10px;">
      ${[
        { icon: "📄", action: "ניסוח מענה, תזכורת, חוזה או תחזית", result: "מבצע עצמאית במלואו ומציג לך את התוצאה המוגמרת לבדיקה." },
        { icon: "✉️", action: "שליחת הודעה או דוא\"ל ללקוח", result: "מציג לך את נוסח ההודעה המלא וממתין ל-Yes מפורש שלך." },
        { icon: "💳", action: "ביצוע תשלום כספי", result: "מציג את התשלום וממתין לאישורך. רכישה דרך Link בכרטיס חד-פעמי (האשראי לא נחשף)." },
        { icon: "✍️", action: "חתימה על מסמך או הסכם", result: "מציג את המסמך המלא וכל סעיפיו, וממתין לאישור ולחתימתך." },
        { icon: "🗑️", action: "מחיקת נתונים או קבצים", result: "מציג בדיוק מה עומד להימחק וממתין לאישורך הבלעדי." },
        { icon: "🚫", action: "מסחר בני\"ע / העברות בנקאיות", result: "חסום לחלוטין (Off limits), אפילו אם המשתמש ינסה לאשר במפורש." }
      ].map(r => `
        <div style="display: grid; grid-template-columns: 420px 1fr; gap: 16px;">
          <div class="card-shadow" style="background: #ffffff; border: 1px solid #f1f5f9; border-radius: 12px; padding: 14px 20px; font-size: 15px; font-weight: 700; color: #0f172a; display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 18px;">${r.icon}</span> ${r.action}
          </div>
          <div class="card-shadow" style="background: #ffffff; border: 1px solid #f1f5f9; border-radius: 12px; padding: 14px 20px; font-size: 14.5px; color: #334155; display: flex; align-items: center;">
            ${r.result}
          </div>
        </div>
      `).join('')}
    </div>
  </div>
`);

// 5. Who can get it, and what it costs (1200 x 740)
const htmlPricing = wrapPage('Pricing', 1200, 740, `
  <div style="text-align: center; margin-bottom: 24px;">
    <h2 style="font-family: Georgia, serif; font-size: 38px; font-weight: bold; color: #0f172a; margin-bottom: 8px;">מי יכול לקבל גישה, וכמה זה עולה?</h2>
    <p style="font-size: 17px; color: #64748b; font-weight: 500;">תמונת המצב של זמינות Claude Duet והתמחור הרשמי בתוכניות השונות</p>
  </div>

  <div style="max-width: 1080px; margin: 0 auto; width: 100%;">
    <div style="display: grid; grid-template-columns: 320px 1fr 240px; gap: 16px; margin-bottom: 12px;">
      <div class="card-shadow" style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 12px 20px; font-size: 16px; font-weight: 800; color: #0f172a; display: flex; align-items: center; gap: 10px;">
        <span style="background: #ede9fe; padding: 4px 8px; border-radius: 8px;">💳</span> סוג התוכנית ב-Claude
      </div>
      <div class="card-shadow" style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 12px 20px; font-size: 16px; font-weight: 800; color: #0f172a; display: flex; align-items: center; gap: 10px;">
        <span style="background: #ecfdf5; padding: 4px 8px; border-radius: 8px;">✔️</span> האם ניתן להשתמש ב-Duet עכשיו?
      </div>
      <div class="card-shadow" style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 12px 20px; font-size: 16px; font-weight: 800; color: #0f172a; display: flex; align-items: center; gap: 10px;">
        <span style="background: #fef3c7; padding: 4px 8px; border-radius: 8px;">💰</span> מחיר חודשי (רשמי)
      </div>
    </div>

    <div style="display: flex; flex-direction: column; gap: 12px;">
      ${[
        { plan: "Claude Pro (בארה\"ב)", status: "כן, באמצעות הרשמה לרשימת המתנה (Waitlist)", price: "$20 לחודש ($17 בחיוב שנתי)" },
        { plan: "Claude Max (בארה\"ב)", status: "כן, באמצעות הרשמה לרשימת המתנה (Waitlist)", price: "החל מ-$100 לחודש" },
        { plan: "Pro / Max (מחוץ לארה\"ב / ישראל)", status: "טרם נפתח. טופס ההמתנה פתוח, אך ההשקה מתחילה בארה\"ב", price: "כלול במנוי (ללא עלות נוספת)" },
        { plan: "תוכניות צוות (Team / Enterprise)", status: "לא כרגע. עמוד המוצר מציין שתוכניות צוות אינן נכללות בשלב זה", price: "טרם פורסם" }
      ].map(r => `
        <div style="display: grid; grid-template-columns: 320px 1fr 240px; gap: 16px;">
          <div class="card-shadow" style="background: #ffffff; border: 1px solid #f1f5f9; border-radius: 12px; padding: 16px 20px; font-size: 15.5px; font-weight: 700; color: #0f172a; display: flex; align-items: center;">${r.plan}</div>
          <div class="card-shadow" style="background: #ffffff; border: 1px solid #f1f5f9; border-radius: 12px; padding: 16px 20px; font-size: 14.5px; color: #334155; display: flex; align-items: center;">${r.status}</div>
          <div class="card-shadow" style="background: #ffffff; border: 1px solid #f1f5f9; border-radius: 12px; padding: 16px 20px; font-size: 14.5px; font-weight: 800; color: #0369a1; display: flex; align-items: center;">${r.price}</div>
        </div>
      `).join('')}
    </div>
  </div>
`);

// 6. Where it will trip (1200 x 740)
const htmlWeakSpots = wrapPage('Weak Spots', 1200, 740, `
  <div style="text-align: center; margin-bottom: 24px;">
    <h2 style="font-family: Georgia, serif; font-size: 38px; font-weight: bold; color: #0f172a; margin-bottom: 8px;">איפה הסוכן עלול למעוד (ומה לעשות עם זה)</h2>
    <p style="font-size: 17px; color: #64748b; font-weight: 500;">Anthropic חושפת ביושר את נקודות התורפה של המערכת — ואיך להיערך אליהן נכון</p>
  </div>

  <div style="max-width: 1080px; margin: 0 auto; width: 100%;">
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 12px;">
      <div class="card-shadow" style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 12px 20px; font-size: 16px; font-weight: 800; color: #991b1b; display: flex; align-items: center; gap: 10px;">
        <span style="background: #fef2f2; padding: 4px 8px; border-radius: 8px;">⚠️</span> מה שאנתרופיק מודה בו ביושר
      </div>
      <div class="card-shadow" style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 12px 20px; font-size: 16px; font-weight: 800; color: #166534; display: flex; align-items: center; gap: 10px;">
        <span style="background: #f0fdf4; padding: 4px 8px; border-radius: 8px;">💡</span> איך מנהל כספים חכם צריך לפעול
      </div>
    </div>

    <div style="display: flex; flex-direction: column; gap: 12px;">
      ${[
        { weak: "עלול לפענח לא נכון שרשור או לטעות בהערכת דחיפות", fix: "הגדירו לו מראש על מה לקבל התרעה ובאיזו תדירות (אנתרופיק מאפשרת זאת)." },
        { weak: "עלול לפספס אירוע שמגיע בין סבבי הבדיקות (רץ כל כמה שעות)", fix: "השאירו התרעה ישירה בערוץ קריטי אחד שבו מהירות מענה מייצרת הכנסה." },
        { weak: "סידורים אישיים (הזמנת טיסות, קניות) מבוצעים פחות טוב", fix: "תנו לו משימות עסקיות ומשימות כספים — זה הליבה שלשמה הוא תוכנן." },
        { weak: "עדיין אינו יכול להציג לכם ויזואלית את מסך הדפדפן בזמן אמת", fix: "דרשו ממנו סיכום כתוב מפורט ומאומת של כל פעולה שביצע בכל אתר." }
      ].map(r => `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div class="card-shadow" style="background: #ffffff; border: 1px solid #f1f5f9; border-radius: 12px; padding: 16px 20px; font-size: 14.5px; font-weight: 700; color: #0f172a; display: flex; align-items: center;">${r.weak}</div>
          <div class="card-shadow" style="background: #ffffff; border: 1px solid #f1f5f9; border-radius: 12px; padding: 16px 20px; font-size: 14.5px; color: #334155; display: flex; align-items: center;">${r.fix}</div>
        </div>
      `).join('')}
    </div>
  </div>
`);

// 7. The first job to give it (1200 x 1050)
const htmlTrustRamp = wrapPage('Trust Ramp', 1200, 1050, `
  <div style="text-align: center; margin-bottom: 30px;">
    <h2 style="font-family: Georgia, serif; font-size: 42px; font-weight: bold; color: #0f172a; margin-bottom: 8px;">המשימה הראשונה שכדאי לתת לו</h2>
    <p style="font-size: 18px; color: #64748b; font-weight: 600;">התחילו בקריאה בלבד. בשבוע השני הוסיפו טיוטות. חברו כסף רק אחרי שנבנה אמון.</p>
  </div>

  <div style="position: relative; max-width: 1050px; margin: 0 auto; width: 100%; height: 780px;">
    <svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;">
      <path d="M 720 250 Q 640 340 580 370" fill="none" stroke="#10b981" stroke-width="3" stroke-dasharray="6,6"/>
      <path d="M 470 370 Q 400 340 330 250" fill="none" stroke="#8b5cf6" stroke-width="3" stroke-dasharray="6,6"/>
      <path d="M 525 500 L 525 600" stroke="#f97316" stroke-width="3" stroke-dasharray="6,6"/>
    </svg>

    <!-- Step 1: Week 1 Read-only (Top-Right / Hebrew RTL start) -->
    <div class="card-shadow" style="position: absolute; top: 20px; right: 40px; width: 440px; background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 22px; padding: 24px; z-index: 5;">
      <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 14px;">
        <div style="width: 52px; height: 52px; border-radius: 16px; background: #dcfce7; display: flex; align-items: center; justify-content: center; font-size: 26px;">👁️</div>
        <div>
          <div style="font-size: 20px; font-weight: 800; color: #0f172a;">שבוע 1 &bull; קריאה בלבד</div>
          <div style="font-size: 12px; font-weight: bold; color: #166534;">AUDIT &amp; READ-ONLY MODE</div>
        </div>
      </div>
      <div style="background: #f0fdf4; border-radius: 12px; padding: 12px 16px; font-size: 14.5px; color: #166534; font-weight: 600; margin-bottom: 10px;">
        דוח יומי של חשבוניות פתוחות וימי פיגור
      </div>
      <div style="background: #bbf7d0; color: #14532d; font-size: 13px; font-weight: 800; padding: 6px 14px; border-radius: 20px; display: inline-block;">
        ללא יצירת טיוטות כלל
      </div>
    </div>

    <!-- Center Card: Invoice Agent -->
    <div class="card-shadow" style="position: absolute; top: 270px; left: 50%; transform: translateX(-50%); width: 280px; background: #ffffff; border: 2px solid #cbd5e1; border-radius: 24px; padding: 24px; text-align: center; z-index: 10;">
      <div style="width: 80px; height: 80px; border-radius: 50%; background: #f5f3ff; margin: 0 auto 12px; display: flex; align-items: center; justify-content: center; font-size: 40px;">🤖</div>
      <div style="font-family: Georgia, serif; font-size: 26px; font-weight: bold; color: #0f172a; margin-bottom: 6px;">סוכן חשבוניות</div>
      <div style="background: #ede9fe; color: #6d28d9; font-size: 12.5px; font-weight: 800; padding: 4px 14px; border-radius: 20px; display: inline-block;">
        סולם אמון מדורג
      </div>
    </div>

    <!-- Step 2: Week 2 Drafts (Top-Left) -->
    <div class="card-shadow" style="position: absolute; top: 20px; left: 40px; width: 440px; background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 22px; padding: 24px; z-index: 5;">
      <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 14px;">
        <div style="width: 52px; height: 52px; border-radius: 16px; background: #ede9fe; display: flex; align-items: center; justify-content: center; font-size: 26px;">✍️</div>
        <div>
          <div style="font-size: 20px; font-weight: 800; color: #0f172a;">שבוע 2 &bull; יצירת טיוטות</div>
          <div style="font-size: 12px; font-weight: bold; color: #6d28d9;">DRAFTING ASSISTANT</div>
        </div>
      </div>
      <div style="background: #faf5ff; border-radius: 12px; padding: 12px 16px; font-size: 14.5px; color: #6d28d9; font-weight: 600; margin-bottom: 10px;">
        ניסוח תזכורות תשלום מעודנות ומקצועיות
      </div>
      <div style="background: #ddd6fe; color: #4c1d95; font-size: 13px; font-weight: 800; padding: 6px 14px; border-radius: 20px; display: inline-block;">
        אישור ידני לכל שליחה ללא יוצא מן הכלל
      </div>
    </div>

    <!-- Step 3: Wallets Disconnected (Bottom) -->
    <div class="card-shadow" style="position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%); width: 520px; background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 22px; padding: 24px; text-align: center; z-index: 5;">
      <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 12px;">
        <div style="width: 46px; height: 46px; border-radius: 14px; background: #ffedd5; display: flex; align-items: center; justify-content: center; font-size: 22px;">🔒</div>
        <div style="font-size: 22px; font-weight: 800; color: #0f172a;">ארנקים ואשראי מנותקים</div>
      </div>
      <div style="background: #fff7ed; border-radius: 12px; padding: 12px 18px; font-size: 15px; font-weight: 700; color: #c2410c;">
        חיבור אמצעי חיוב רק לאחר הוכחת אמינות מלאה לאורך זמן
      </div>
    </div>
  </div>
`);

const items = [
  { file: 'claude-duet-proactive-agent-header.png', html: htmlHeader, width: 1200, height: 630 },
  { file: 'claude-duet-proactive-agent-what-it-does.png', html: htmlWhatItDoes, width: 1200, height: 1150 },
  { file: 'claude-duet-proactive-agent-jobs.png', html: htmlJobs, width: 1200, height: 960 },
  { file: 'claude-duet-proactive-agent-four-stops.png', html: htmlFourStops, width: 1200, height: 820 },
  { file: 'claude-duet-proactive-agent-pricing.png', html: htmlPricing, width: 1200, height: 740 },
  { file: 'claude-duet-proactive-agent-weak-spots.png', html: htmlWeakSpots, width: 1200, height: 740 },
  { file: 'claude-duet-proactive-agent-trust-ramp.png', html: htmlTrustRamp, width: 1200, height: 1050 },
];

for (const item of items) {
  const tmpHtml = path.join(tempDir, item.file.replace('.png', '.html'));
  const targetImg = path.join(outDir, item.file);
  fs.writeFileSync(tmpHtml, item.html, 'utf8');
  console.log(`Re-rendering ${item.file}...`);
  execSync(
    `"${edgePath}" --headless --disable-gpu --screenshot="${targetImg}" --window-size=${item.width},${item.height} --hide-scrollbars "file://${tmpHtml.replace(/\\\\/g, '/')}"`
  );
}

fs.rmSync(tempDir, { recursive: true, force: true });
console.log('All 7 Claude Duet infographics rendered flawlessly via Edge headless!');
