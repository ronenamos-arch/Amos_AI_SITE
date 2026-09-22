"use client";

import { useState } from "react";
import { 
  ArrowLeft, 
  CheckCircle2, 
  Download, 
  FileSpreadsheet, 
  Layers, 
  Lock, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  ChevronDown, 
  FileCode2, 
  Bot, 
  TrendingUp,
  AlertTriangle,
  CreditCard
} from "lucide-react";

interface ARCommandCenterClientProps {
  smartbeeUrl: string;
  gumroadUrl: string;
}

export function ARCommandCenterClient({ smartbeeUrl, gumroadUrl }: ARCommandCenterClientProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleCheckout = () => {
    // Prefer SmartBee payment link when provided, fallback to Gumroad
    const target = smartbeeUrl || gumroadUrl;
    window.location.href = target;
  };

  const faqs = [
    {
      q: "האם הנתונים הפיננסיים שלי נשארים מאובטחים ופרטיים?",
      a: "באופן מוחלט — 100% פרטיות. הדשבורד הוא קובץ HTML עצמאי הפועל לחלוטין בדפדפן המקומי שלכם (Client-Side). שום נתון, שם לקוח או סכום אינם נשלחים לשרת חיצוני או לענן כלשהו. קובץ האקסל נשאר אצלכם במחשב בלבד."
    },
    {
      q: "איך המערכת מתחברת לתוכנת הנהלת החשבונות שלי (פריוריטי, חשבשבת, SAP, רווחית)?",
      a: "בצורה הפשוטה ביותר: מייצאים דוח גיול חובות או כרטיסי לקוחות (Ledger) כקובץ Excel או CSV מכל מערכת ERP, ומדביקים אותו בגיליון הנתונים הגולמיים שבמודל. הנוסחאות והדשבורד מתעדכנים מיידית."
    },
    {
      q: "מה זה בעצם מדד חיזוי מריחת אשראי (Median Drift)?",
      a: "דוח גיול רגיל מציג רק תמונת עבר (שוטף+30, שוטף+60). אלגוריתם ה-Median Drift מחשב את מרווח הימים האמיתי בין מועד הפירעון החוזי למועד התשלום בפועל על פני היסטוריית הלקוח, ומזהה מראש מתי לקוח מתחיל 'למרוח' תשלומים לפני שזה הופך לחוב אבוד."
    },
    {
      q: "מה אני מקבל מיידית לאחר התשלום?",
      a: "גישה מיידית לחבילת קבצים מלאה להורדה (קובץ ZIP): דשבורד מנהלים אינטראקטיבי (קובץ HTML עצמאי), מודל אקסל רב-ישותי מקושר של 6 גיליונות, ומסמך פרומפט מאסטר מובנה מותאם ל-ChatGPT, Claude ו-Gemini."
    },
    {
      q: "האם יש עלות מנוי חודשית?",
      a: "לא. מדובר ברכישה חד-פעמית במחיר השקה (₪99 בלבד) הכוללת שימוש ללא הגבלה וגישה לתמיד לכל הקבצים והעדכונים."
    }
  ];

  return (
    <div className="space-y-20">
      {/* 1. HERO SECTION */}
      <section className="pt-4 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Copy Column (7 cols) */}
        <div className="lg:col-span-7 text-right space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-medium">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>חמ״ל ניהול חייבים • דשבורד מנהלים חי • מודל אקסל רב-ישותי</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.25]">
            דוחות החייבים שלכם תקועים ב-1995? <br />
            <span className="bg-gradient-to-l from-indigo-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
              הגיע הזמן לחמ״ל AI
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
            בלי תיאוריות מיותרות ובלי שעות עבודה ידניות מבוזבזות. מערכת עבודה שלמה לסמנכ״לי כספים, חשבים ומנהלי גבייה מאת רונן עמוס, רו״ח הכוללת חיזוי התנהגותי של מועדי פירעון (Median Drift), התאמות אוטומטיות לספר הראשי ודשבורד מנהלים עצמאי.
          </p>

          {/* CTA & Micro Proof */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-start gap-4">
            <button
              onClick={handleCheckout}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-lg shadow-lg shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <span>לרכישה במחיר השקה — ₪99 בלבד</span>
              <ArrowLeft className="w-5 h-5 rtl:rotate-180" />
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>הורדה מיידית • גישה לתמיד לכל הקבצים • 100% פרטיות ואבטחה מקומית</span>
          </div>

          {/* Quick Stats */}
          <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 max-w-lg text-center">
            <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-2xl">
              <div className="text-2xl font-black text-white font-mono">6</div>
              <div className="text-xs text-slate-400 mt-0.5">גיליונות מקושרים</div>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-2xl">
              <div className="text-2xl font-black text-white font-mono">100%</div>
              <div className="text-xs text-slate-400 mt-0.5">קובץ HTML עצמאי</div>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-2xl">
              <div className="text-2xl font-black text-indigo-400 font-mono">94%</div>
              <div className="text-xs text-slate-400 mt-0.5">דיוק חיזוי התנהגותי</div>
            </div>
          </div>
        </div>

        {/* Featured Visual Column (5 cols) */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div className="relative group max-w-[530px] w-full">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-cyan-500 to-emerald-500 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition duration-500" />
            
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-indigo-500/30 bg-[#0F172A] shadow-2xl">
              <img
                src="/products/ar-command-center/dashboard-main.png"
                alt="דשבורד מנהלים - חמ״ל ניהול חייבים AR Command Center v2.4"
                className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>

            <div className="mt-3.5 bg-slate-950/90 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-3.5 flex items-center justify-between shadow-xl">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-white">AR Command Center v2.4 (HTML עצמאי)</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono">
                <span className="text-xs text-slate-500 line-through">₪199</span>
                <span className="text-xs font-extrabold text-indigo-300 bg-indigo-500/20 px-2.5 py-1 rounded-md border border-indigo-500/30">₪99</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM (דוחות החייבים תקועים ב-1995) */}
      <section className="rounded-3xl border border-rose-500/20 bg-gradient-to-b from-rose-950/20 via-slate-900/60 to-slate-950 p-8 sm:p-12 space-y-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            <span>הבעיה השקטה של ניהול גבייה ותזרים</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            למה דוח גיול חובות רגיל גורם לכם לאבד שליטה על התזרים?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            רוב מחלקות הכספים עדיין מסתכלות על דוח גיול סטטי (שוטף+30, שוטף+60). אבל הבעיה האמיתית אינה כמה ימים עברו — אלא **איך הלקוח מתנהג באמת**.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="font-bold text-white text-base">מריחת אשראי סמויה</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              לקוח שמשלם תמיד באיחור של 14 יום פתאום מאחר ב-32 יום. דוח הגיול לא מדליק נורה אדומה עד שזה מאוחר מדי והופך לחוב מסופק.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="font-bold text-white text-base">גבייה תגובתית ולא פרואקטיבית</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              צוותי הגבייה פונים ללקוחות רק אחרי שהחשבונית עברה את מועד הפירעון, במקום להקדים תרופה למכה לפי דפוסי התנהגות מנובאים ב-AI.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="font-bold text-white text-base">נתק בין ה-ERP לדשבורד ההנהלה</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              הנתונים כלואים במערכות ישנות, וסמנכ״ל הכספים מקבל תמונת מצב מעודכנת רק פעם בחודש במקום לוח מחוונים חי לקבלת החלטות.
            </p>
          </div>
        </div>
      </section>

      {/* 3. THE 4 PILLARS OF AR COMMAND CENTER */}
      <section className="space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-indigo-400 font-bold text-xs uppercase tracking-wider">
            פתרון 360° לסמנכ״לי כספים וחשבים
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            4 עמודי התווך של ה-AR Command Center
          </h2>
          <p className="text-slate-300 text-sm">
            ארכיטקטורה פיננסית מתקדמת המשלבת ניתוח נתונים סטטיסטי, אוטומציה ודשבורד עצמאי.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-indigo-500/30 bg-slate-900/70 p-7 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">חיזוי התנהגותי (Median Drift Score)</h3>
                <span className="text-xs text-indigo-300 font-mono">אלגוריתם חיזוי מריחת אשראי</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              המערכת מנתחת את חציון האיחור של כל לקוח בנפרד (Median Days Late) ומשווה אותו לחוזה המקורי. היא מתריעה אוטומטית ברגע שלקוח חורג מהדפוס השגרתי שלו.
            </p>
          </div>

          <div className="rounded-2xl border border-cyan-500/30 bg-slate-900/70 p-7 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">התאמות ספר ראשי (Ledger Reconciliation)</h3>
                <span className="text-xs text-cyan-300 font-mono">הצלבת נתונים אוטומטית</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              מנגנון הצלבה מובנה המזהה אוטומטית תשלומים ללא שיוך, כפילויות ברישום והפרשי שער, ומציג את היתרה האמיתית לכל ישות וסניף.
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-500/30 bg-slate-900/70 p-7 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">מודל אקסל רב-ישותי (6 גיליונות)</h3>
                <span className="text-xs text-emerald-300 font-mono">נוסחאות פתוחות ומקושרות</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              קובץ אקסל מובנה המכיל גיליונות נתונים, חישובי Drift, פילוח לפי מרכזי רווח וסימולטור תזרים שבועי. הכל בנוי בנוסחאות פתוחות שניתנות להתאמה אישית מלאה.
            </p>
          </div>

          <div className="rounded-2xl border border-amber-500/30 bg-slate-900/70 p-7 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">פרומפט מאסטר מובנה</h3>
                <span className="text-xs text-amber-300 font-mono">ChatGPT / Claude / Gemini System</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              פרומפט מובנה שמנחה את מודל השפה לנתח את טבלת הנתונים, להפיק סיכום מנהלים שבועי, ולנסח מכתבי פנייה מותאמים אישית ברמות תקיפות שונות.
            </p>
          </div>
        </div>
      </section>

      {/* 4. VISUAL DEMOS / GALLERY */}
      <section className="rounded-3xl border border-white/10 bg-slate-900/50 p-8 sm:p-10 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-black text-white">מבט מעמיק לתוך ממשק החמ״ל</h2>
          <p className="text-xs sm:text-sm text-slate-400">
            איך נראה הדשבורד האינטראקטיבי וכרטיסי ניתוח הלקוח בעבודה היומיומית
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-slate-950 shadow-xl">
              <img
                src="/products/ar-command-center/dashboard-table.png"
                alt="טבלת מעקב חייבים וניתוח Drift"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <p className="text-xs text-slate-400 text-center">
              טבלת מעקב מפורטת עם חישוב אוטומטי של ימי איחור, ציון סיכון ופילוח לפי סטטוס
            </p>
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-slate-950 shadow-xl">
              <img
                src="/products/ar-command-center/dashboard-modal.png"
                alt="כרטיס לקוח מורחב ומחולל פניות AI"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <p className="text-xs text-slate-400 text-center">
              דוח לקוח מורחב (Customer Drilldown) הכולל פירוט חשבוניות פתוחות וניסוח פנייה מותאם
            </p>
          </div>
        </div>
      </section>

      {/* 5. WHAT'S IN THE PACKAGE */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">
            תכולת החבילה המלאה
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            מה אתם מקבלים מיד לאחר הרכישה?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-indigo-500/30 bg-slate-900/80 p-6 space-y-4 text-right">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center">
              <FileCode2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-lg">1. דשבורד HTML עצמאי</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              קובץ HTML מלא שפועל בלחיצה כפולה בכל דפדפן (Chrome, Edge, Safari). כולל גרפים חיים, סינונים מתקדמים ומצב חושך/אור ללא צורך בהתקנת שרתים.
            </p>
          </div>

          <div className="rounded-2xl border border-cyan-500/30 bg-slate-900/80 p-6 space-y-4 text-right">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-lg">2. מודל אקסל מקצועי</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              6 גיליונות עבודה מקושרים: הזנת נתונים גולמיים, חישובי Drift, ניתוח גיול מורחב, סימולציית תזרים מזומנים והגדרות חברה מותאמות אישית.
            </p>
          </div>

          <div className="rounded-2xl border border-amber-500/30 bg-slate-900/80 p-6 space-y-4 text-right">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-lg">3. פרומפט מאסטר מובנה</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              מסמך פרומפטים פיננסיים מובנים המאפשרים לנתח את נתוני הגבייה בעזרת בינה מלאכותית, לזהות לקוחות בסיכון ולנסח פניות גבייה מדויקות.
            </p>
          </div>
        </div>
      </section>

      {/* 6. FAQ ACCORDION */}
      <section className="rounded-3xl border border-white/10 bg-slate-900/50 p-8 sm:p-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white">שאלות נפוצות</h2>
          <p className="text-xs sm:text-sm text-slate-400">
            כל מה שחשוב לדעת לפני הרכישה וההטמעה
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/10 bg-slate-900/80 overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-right font-bold text-white flex items-center justify-between gap-4 hover:text-indigo-300 transition-colors cursor-pointer"
              >
                <span className="text-sm sm:text-base">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0 ${
                    openFaq === idx ? "rotate-180 text-indigo-400" : ""
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/[0.06] pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 7. FINAL PRICING & BUY CARD */}
      <section className="rounded-3xl border-2 border-indigo-500/50 bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-950 p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-3.5 py-1 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>השקה מיוחדת — גישה מיידית ולתמיד</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white">
            קחו שליטה מלאה על החייבים והתזרים עוד היום
          </h2>

          <p className="text-sm sm:text-base text-slate-300">
            הורידו את חבילת ה-AR Command Center v2.4 המלאה (דשבורד HTML + מודל אקסל 6 גיליונות + פרומפט מאסטר) ותתחילו לנהל את הגבייה כמו בחמ״ל AI.
          </p>

          <div className="pt-2 flex items-baseline justify-center gap-3">
            <span className="text-slate-500 text-lg sm:text-xl line-through font-mono">₪199</span>
            <span className="text-4xl sm:text-5xl font-black text-white font-mono">₪99</span>
            <span className="text-xs text-emerald-400 font-bold bg-emerald-950/80 border border-emerald-800/60 px-2.5 py-1 rounded-md">
              תשלום חד-פעמי
            </span>
          </div>

          <div className="pt-2">
            <button
              onClick={handleCheckout}
              className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 hover:from-indigo-500 hover:to-indigo-400 text-white font-black text-lg shadow-xl shadow-indigo-600/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 mx-auto cursor-pointer"
            >
              <CreditCard className="w-5 h-5" />
              <span>רכישה מאובטחת והורדה מיידית ב-₪99</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 pt-3">
            <span className="flex items-center gap-1.5">
              <Download className="w-4 h-4 text-emerald-400" />
              הורדה ישירה מיד בסיום התשלום
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-cyan-400" />
              סליקה מאובטחת + חשבונית מס ישראלית
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
