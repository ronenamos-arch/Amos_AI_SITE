import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  FileText,
  Presentation,
  Zap,
  CheckCircle2,
  ArrowLeft,
  Layers,
  BarChart3,
  Cpu,
  BookOpen,
  Sliders,
  Terminal,
} from 'lucide-react';
import type { Guide } from '@/lib/guides-data';

interface ResourceGuideLayoutProps {
  guide: Guide;
}

export function ResourceGuideLayout({ guide }: ResourceGuideLayoutProps) {
  const isClaudeOne = guide.slug === 'claude-one-fpna';
  const isTravelReport = guide.slug === 'ai-employee-travel-report-guide';

  const travelReportCards = [
    {
      num: '01',
      badge: 'הפרדה משולשת',
      title: 'הוצאה, אסמכתא ותנועת אשראי',
      desc: 'מזהים נפרדים לכל אירוע (EXP), מסמך (DOC) ותנועה (TX). מניעת כפילויות של קבלות מרובות ושמירה על עסקאות זהות.',
      icon: Layers,
      accent: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400',
    },
    {
      num: '02',
      badge: 'כספים בישראל',
      title: 'כרטיס חברה, מע״מ ומספרי הקצאה',
      desc: 'בידוד כרטיסי החברה (₪0 בהחזר לעובד), בדיקת מע״מ זר מול תשומות, מספרי הקצאה לפי חוק חשבוניות ישראל ושערי בנק ישראל.',
      icon: CheckCircle2,
      accent: 'from-emerald-500/20 to-lime-500/10 border-lime-500/30 text-lime-400',
    },
    {
      num: '03',
      badge: 'מנוע Reconciliation',
      title: 'הצלבת קבלות לאשראי ובידוד מקדמות',
      desc: 'מנוע התאמה חכם עם 4 סטטוסים ברורים, טיפול בטיפים וזיכויים, וסגירת התחשבנות מדויקת בשקלים.',
      icon: Zap,
      accent: 'from-amber-500/20 to-yellow-500/10 border-amber-500/30 text-amber-400',
    },
    {
      num: '04',
      badge: 'Skill מוכן להטמעה',
      title: 'קוד SKILL.md ו-8 מקרי קצה לבדיקה',
      desc: 'מפרט רשמי מלא ל-Claude עם 13 חוקי בקרה קשיחים, פרומפט להרצה מהירה בצ׳אט ו-8 מקרי מבחן קבלה (Acceptance Tests).',
      icon: Terminal,
      accent: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-400',
    },
  ];

  // Custom highlights for claude-one-fpna or generated from summary
  const claudeOneCards = [
    {
      num: '01',
      badge: 'Docs בבטא',
      title: 'ניתוח סטיות שבועי ומזכר פייפליין',
      desc: 'הפקת ניתוח מקיף של ביצוע מול תקציב, זיהוי פערים עסקיים ויצירת מזכר הנהלה ערוך ומוכן לשיתוף כולל הערות עמיתים.',
      icon: FileText,
      accent: 'from-emerald-500/20 to-lime-500/10 border-lime-500/30 text-lime-400',
    },
    {
      num: '02',
      badge: 'Slides בבטא',
      title: 'מצגות דירקטוריון והנהלה ישירות מהשיחה',
      desc: 'הפיכת תובנות פיננסיות וטבלאות נתונים למצגת שקפים מעוצבת בפורמט PPTX או PDF, להצגה ישירה מתוך Claude או להורדה.',
      icon: Presentation,
      accent: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400',
    },
    {
      num: '03',
      badge: 'Async & Connectors',
      title: 'תהליכי עבודה א-סינכרוניים ומחברים חיים',
      desc: 'Claude ממשיך לעבוד גם כשהמחשב סגור; חיבור ישיר למקורות מידע פיננסיים, הרצת משימות כבדות ומעקב שוטף מכל מכשיר.',
      icon: Zap,
      accent: 'from-amber-500/20 to-yellow-500/10 border-amber-500/30 text-amber-400',
    },
    {
      num: '04',
      badge: 'Framework & Models',
      title: 'מדריך בחירת מודלים ולוח בקרה',
      desc: 'התאמה מדויקת של Haiku למשימות מהירות, Sonnet למידול סטיות ו-Opus לתרחישים מורכבים, בליווי פרומפטים מוכנים להעתקה.',
      icon: Cpu,
      accent: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-400',
    },
  ];

  const travelReportChapters = [
    { num: '01', title: 'ההפרדה החשבונאית המשולשת — הוצאה, אסמכתא ותנועת תשלום' },
    { num: '02', title: 'חמשת עקרונות הברזל למחלקת כספים בישראל — מע״מ זר, מספרי הקצאה ושערי מט״ח' },
    { num: '03', title: 'מנוע ההתאמה (Reconciliation) — סיווג 4 סטטוסים ובידוד טיפים וזיכויים' },
    { num: '04', title: 'מקרה בוחן 1: סטארטאפ SaaS — 3 עובדים בכנס SaaStr בארה״ב' },
    { num: '05', title: 'מקרה בוחן 2: חברת ייעוץ — נסיעה משולבת בלונדון וציריך (עסקי + פרטי)' },
    { num: '06', title: 'מקרה בוחן 3: חברת חומרה — רכש ציוד מעבדה ומע״מ בגרמניה' },
    { num: '07', title: 'קוד ה-SKILL.md המלא ופרומפטים מוכנים להעתקה' },
    { num: '08', title: 'ארגז 8 מקרי קצה לבדיקה (Acceptance Test Suite) לפני פריסה' },
  ];

  const claudeOneChapters = [
    { num: '01', title: 'מה השתנה — המיזוג בין Cowork לצ\'אט למקום אחד' },
    { num: '02', title: 'שימושים ל-FP&A — ניירות עבודה, מזכרי סטיות ומצגות שקפים' },
    { num: '03', title: 'שגרת יום ראשון בבוקר — תהליך עבודה מלא שלב-אחר-שלב' },
    { num: '04', title: 'לוח הבקרה — חיבור למערכות נתונים ואוטומציות' },
    { num: '05', title: 'בחירת מודל — התאמת Sonnet, Haiku ו-Opus למשימות פיננסיות' },
    { num: '06', title: 'ספריית פרומפטים מעשית — תבניות מוכנות להעתקה' },
    { num: '07', title: 'השקה, תוכניות וזמינות ב-Pro & Max' },
    { num: '08', title: 'משאבים, קישורים וכלים משלימים' },
  ];

  return (
    <div className="space-y-12">
      {/* ── Executive Value Box ── */}
      <div className="relative glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-neon-cyan via-lime-400 to-neon-teal" />
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan hidden sm:flex shrink-0">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-lime-400/10 text-lime-300 border border-lime-400/30">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-ping" />
              תמצית מנהלים
            </div>
            <p className="text-lg sm:text-xl font-medium text-slate-200 leading-relaxed">
              {guide.description}
            </p>
          </div>
        </div>
      </div>

      {/* ── Interactive Hero Preview & Luxury CTA ── */}
      <div className="relative glass-panel rounded-3xl p-6 sm:p-10 border border-white/15 shadow-[0_0_50px_-12px_rgba(34,211,238,0.25)] overflow-hidden">
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-neon-cyan/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-lime-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Mockup Preview */}
          {guide.thumbnail && (
            <div className="w-full rounded-2xl overflow-hidden border border-white/15 shadow-2xl mb-8 group relative">
              <div className="absolute inset-0 bg-gradient-to-t from-space-950/80 via-transparent to-transparent opacity-60 z-10" />
              <Image
                src={guide.thumbnail}
                alt={guide.title}
                width={1200}
                height={675}
                priority
                className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 bg-space-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-bold text-slate-200">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                מדריך אינטראקטיבי חי
              </div>
            </div>
          )}

          {/* Luxury CTA Action */}
          <Link
            href={`/resources/${guide.resourceSlug}`}
            className="group relative inline-flex items-center justify-center gap-4 bg-gradient-to-l from-neon-cyan via-teal-300 to-neon-teal text-space-950 font-black text-xl sm:text-2xl px-10 sm:px-16 py-5 sm:py-6 rounded-2xl shadow-[0_0_40px_-5px_rgba(34,211,238,0.5)] hover:shadow-[0_0_60px_0px_rgba(34,211,238,0.8)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 border border-white/30"
          >
            <span className="relative z-10 font-black tracking-tight">פתח את המדריך המלא במסך מלא</span>
            <ArrowLeft className="w-6 h-6 relative z-10 transition-transform duration-300 group-hover:-translate-x-2" />
          </Link>

          {/* Micro badges below CTA */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-6 text-xs sm:text-sm font-medium text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-neon-cyan" /> ללא צורך בהתקנה
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-neon-cyan" /> תצוגה מותאמת לדפדפן
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-neon-cyan" /> כולל פרומפטים מוכנים להעתקה
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className={`w-4 h-4 ${guide.isPremium ? 'text-amber-400' : 'text-neon-cyan'}`} /> {guide.isPremium ? 'תוכן פרימיום בלעדי' : 'גישה חופשית'}
            </span>
          </div>
        </div>
      </div>

      {/* ── Key Feature Cards / What's inside ── */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <Layers className="w-6 h-6 text-neon-cyan" />
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              מה כולל המדריך האינטראקטיבי?
            </h2>
          </div>
          <span className="text-xs sm:text-sm text-slate-400 font-mono">4 יכולות ליבה</span>
        </div>

        {isClaudeOne || isTravelReport ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {(isClaudeOne ? claudeOneCards : travelReportCards).map((c) => {
              const CardIcon = c.icon;
              return (
                <div
                  key={c.num}
                  className="glass-panel rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full border bg-white/5 text-slate-300">
                        {c.num}
                      </span>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full border bg-gradient-to-l ${c.accent}`}>
                        {c.badge}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-neon-cyan group-hover:scale-110 transition-transform">
                        <CardIcon className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold text-white leading-snug">
                        {c.title}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {c.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {guide.summary?.split('\n\n').map((p, idx) => (
              <div key={idx} className="glass-panel rounded-xl p-5 border border-white/10">
                <p className="text-base text-slate-300 leading-relaxed">{p}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Structure / Curriculum Breakdown ── */}
      {(isClaudeOne || isTravelReport) && (
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 space-y-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <BookOpen className="w-6 h-6 text-lime-400" />
            <h3 className="text-xl sm:text-2xl font-black text-white">
              תוכן העניינים של המדריך
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {(isClaudeOne ? claudeOneChapters : travelReportChapters).map((ch) => (
              <div
                key={ch.num}
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-lime-400/30 hover:bg-white/[0.06] transition-colors"
              >
                <span className="font-mono text-xs font-black text-lime-400 bg-lime-400/10 px-2.5 py-1 rounded-md border border-lime-400/20 shrink-0">
                  {ch.num}
                </span>
                <span className="text-sm font-medium text-slate-200">
                  {ch.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Quote / Insight Box ── */}
      <div className="relative rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-space-900 via-space-900/90 to-space-950 border-r-4 border-lime-400 border-y border-l border-white/10">
        <blockquote className="text-lg sm:text-xl font-medium text-slate-100 leading-relaxed italic">
          ״שיחה אחת נושאת עכשיו שאלה מהירה, מזכר סטיות מפורט וחמישה שקפים לפגישת ההנהלה של יום ראשון — בלי להחליט מראש לאן המשימה שייכת ובלי לעבור בין כלים.״
        </blockquote>
        <div className="mt-4 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>רונן עמוס, CPA</span>
          <span>AI FINANCE TRANSFORMATION</span>
        </div>
      </div>

      {/* ── Bottom Floating Launch Bar ── */}
      <div className="glass-panel rounded-2xl p-6 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
        <div>
          <h4 className="text-lg font-bold text-white">מוכנים להתנסות?</h4>
          <p className="text-sm text-slate-400">פתחו את המדריך האינטראקטיבי במסך מלא לצפייה ותרגול מיידי.</p>
        </div>
        <Link
          href={`/resources/${guide.resourceSlug}`}
          className="inline-flex items-center gap-2 bg-gradient-to-l from-neon-cyan to-neon-teal text-space-950 font-bold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-neon-cyan/40 hover:opacity-95 transition-all text-base shrink-0"
        >
          <span>פתח את המדריך</span>
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
