"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Database,
  Sparkles,
  ShieldCheck,
  Cpu,
  FileSpreadsheet,
  Zap,
  Activity,
  ChevronDown,
  Check,
  Code2,
  AlertTriangle,
  Flame,
  Layers,
} from "lucide-react";

interface StepDetail {
  step: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  icon: React.ReactNode;
  summary: string;
  inspectTitle: string;
  inspectContent: React.ReactNode;
}

export function VisualDataPipeline() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const steps: StepDetail[] = [
    {
      step: "01",
      title: "קלט נתונים מבולגן",
      subtitle: "Raw Data Ingestion",
      badge: "שלב 1 • קלט גולמי",
      badgeColor: "text-cyan-400 border-cyan-500/30 bg-cyan-950/40",
      icon: <Database className="w-5 h-5 text-cyan-400" />,
      summary: "קובץ Excel/ERP מרובה לשוניות עם הערות ידניות, שורות ריקות, מטבעות מעורבים וערכי #N/A.",
      inspectTitle: "תמונת מצב: הדאטה הגולמי לפני עיבוד",
      inspectContent: (
        <div className="space-y-3 font-mono text-xs text-right">
          <div className="flex items-center justify-between text-[11px] text-rose-400 bg-rose-950/40 border border-rose-500/30 rounded-lg p-2">
            <span className="flex items-center gap-1.5 font-bold">
              <AlertTriangle className="w-3.5 h-3.5" /> 4 שגיאות קריטיות זוהו בקובץ הגולמי
            </span>
            <span className="text-[10px] text-slate-400">P&L_Draft_v3.xlsx</span>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 overflow-x-auto text-[11px] text-slate-300">
            <div className="text-slate-500 mb-1 border-b border-slate-800 pb-1 flex justify-between">
              <span>A: מחלקה</span>
              <span>B: חודש</span>
              <span>C: תקציב (₪/$)</span>
              <span>D: סטטוס</span>
            </div>
            <div className="space-y-1 text-slate-400">
              <div className="flex justify-between text-rose-300/80">
                <span>R&D Dept (הערה: שכר)</span>
                <span>Jan-24</span>
                <span>$ 145,000 [USD]</span>
                <span className="text-rose-400">#VALUE!</span>
              </div>
              <div className="flex justify-between text-amber-300/80">
                <span>   מכירות ישראל   </span>
                <span>01/2024</span>
                <span>₪ 320,000</span>
                <span>רווח גולמי ידני</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>[שורה ריקה]</span>
                <span>--</span>
                <span>--</span>
                <span className="text-rose-400">רווח נקי: #N/A</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      step: "02",
      title: "מנוע ה-AI וזיהוי מבנה",
      subtitle: "Intelligent Structuring",
      badge: "שלב 2 • סריקת AI",
      badgeColor: "text-teal-400 border-teal-500/30 bg-teal-950/40",
      icon: <Cpu className="w-5 h-5 text-teal-400" />,
      summary: "Claude ו-Python מזהים אוטומטית את תחילת הטבלאות, מסירים כפילויות וממירים שמות עמודות ל-snake_case סטנדרטי.",
      inspectTitle: "פרוטוקול עיבוד ה-AI והסרת רעשים",
      inspectContent: (
        <div className="space-y-3 font-mono text-xs text-right">
          <div className="flex items-center justify-between text-[11px] text-teal-300 bg-teal-950/40 border border-teal-500/30 rounded-lg p-2">
            <span className="flex items-center gap-1.5 font-bold">
              <Code2 className="w-3.5 h-3.5 text-teal-400" /> הפעלת פקודת Python Data Cleaning ב-Claude
            </span>
            <span className="text-[10px] text-emerald-400 font-bold">⚡ 0.8 שניות</span>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/90 p-3 text-cyan-200 text-[11px] leading-relaxed">
            <p className="text-slate-400 mb-1"># סקריפט הניקוי האוטומטי שרץ ברקע:</p>
            <p>df = df.dropna(how=&apos;all&apos;).reset_index(drop=True)</p>
            <p>df.columns = [c.strip().lower().replace(&apos; &apos;, &apos;_&apos;) for c in df.columns]</p>
            <p className="text-amber-300">df[&apos;amount_ils&apos;] = df.apply(normalize_currency_to_ils, axis=1)</p>
            <p className="text-emerald-400">✓ 18 שורות ריקות הוסרו | כל שמות העמודות סודרו</p>
          </div>
        </div>
      ),
    },
    {
      step: "03",
      title: "פרוטוקול ביקורת CFO",
      subtitle: "5 Forensic Audit Checks",
      badge: "שלב 3 • בקרת איכות",
      badgeColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
      icon: <ShieldCheck className="w-5 h-5 text-amber-400" />,
      summary: "5 בדיקות שלמות מבנית: פיוס הכנסות לפני ואחרי, אימות שער חליפין, ואיתור אנומליות בספר הראשי ללא דליפת PII.",
      inspectTitle: "לוח בקרת איכות: 5 בדיקות רואה חשבון",
      inspectContent: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-right">
          {[
            "1. פיוס הכנסות מדויק: סכום כולל לפני = ₪1,450,000 = סכום אחרי",
            "2. אימות שערי המרה: 100% שורות מט\"ח הומרו לפי שער בנק ישראל",
            "3. ביקורת תאריכים: המרת כל הפורמטים ל-YYYY-MM-DD אחיד",
            "4. מניעת כפילויות: זוהו ונוטרלו 3 תנועות כפולות במערכת",
            "5. Zero Data Leakage: אין פרטים מזהים (PII) בפרומפט החיצוני",
          ].map((check, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-lg bg-amber-950/20 border border-amber-500/20 p-2 text-[11px] text-amber-200"
            >
              <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>{check}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      step: "04",
      title: "פלט נקי מוכן לדירקטוריון",
      subtitle: "Board-Ready Output",
      badge: "שלב 4 • תוצר סופי",
      badgeColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
      icon: <FileSpreadsheet className="w-5 h-5 text-emerald-400" />,
      summary: "קובץ Excel נקי, גיליון Cleaning_Log מלא עם תיעוד שקיפות, ומזכר תובנות ניהוליות חתום על ידי CFO.",
      inspectTitle: "התוצר הסופי: קובץ מוכן למצגת הנהלה",
      inspectContent: (
        <div className="space-y-3 font-mono text-xs text-right">
          <div className="flex items-center justify-between text-[11px] text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 rounded-lg p-2">
            <span className="flex items-center gap-1.5 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> דוח P&L רבעוני נקי + גיליון Cleaning_Log מלא
            </span>
            <span className="text-[10px] text-amber-300 font-bold">100% מאומת</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-slate-300 text-[11px]">
            <div className="rounded-lg bg-slate-950 p-2 border border-slate-800">
              <span className="block text-emerald-400 font-bold text-sm">0 שגיאות</span>
              <span className="text-[10px] text-slate-400">תקינות נתונים</span>
            </div>
            <div className="rounded-lg bg-slate-950 p-2 border border-slate-800">
              <span className="block text-cyan-400 font-bold text-sm">5 דקות</span>
              <span className="text-[10px] text-slate-400">זמן ביצוע כולל</span>
            </div>
            <div className="rounded-lg bg-slate-950 p-2 border border-slate-800">
              <span className="block text-amber-400 font-bold text-sm">מוכן ל-Board</span>
              <span className="text-[10px] text-slate-400">תקציר מנהלים</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="relative mb-14" dir="rtl">
      {/* ── Glamorous Outer Halo & Golden Border Frame ────────────────── */}
      <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-r from-amber-500/40 via-cyan-400/40 to-teal-400/30 blur-xl opacity-60 pointer-events-none" />

      <div className="relative rounded-[30px] border border-amber-500/30 bg-gradient-to-b from-slate-900/95 via-space-950/98 to-slate-950 p-6 sm:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] backdrop-blur-2xl overflow-hidden">
        
        {/* Subtle Decorative Golden/Cyan Light Bars */}
        <div className="absolute top-0 right-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        <div className="absolute bottom-0 left-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

        {/* ── Top Header with Real-Time Activity Ping ─────────────────── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-white/10 pb-6">
          <div className="text-right">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-mono font-bold text-amber-300 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> ארכיטקטורת הזרימה
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              זרימת עבודה לניקוי נתונים וביקורת פיננסית ב-AI
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              איך להפוך דאטה גולמי ומבולגן לדוח מנהלים מושלם ומאומת תוך דקות · לחץ על שלב לצפייה בפירוט
            </p>
          </div>

          {/* Live Engine Status Pill */}
          <div className="inline-flex items-center gap-2 rounded-2xl border border-cyan-500/30 bg-slate-950/80 px-4 py-2 text-xs font-mono backdrop-blur-md self-start md:self-auto shadow-inner">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-slate-300 font-medium">Real-Time CFO Engine</span>
            <span className="text-cyan-400 font-bold">| Live</span>
          </div>
        </div>

        {/* ── 4 Interactive Moving & Floating Step Cards ───────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative mb-6">
          {steps.map((s, idx) => {
            const isActive = activeStepIndex === idx;

            return (
              <motion.div
                key={s.step}
                whileHover={{ y: -5, scale: 1.015 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                onClick={() => setActiveStepIndex(idx)}
                className={`relative cursor-pointer flex flex-col justify-between rounded-2xl p-5 transition-all text-right ${
                  isActive
                    ? "border-2 border-amber-400/80 bg-slate-900 shadow-[0_0_30px_rgba(251,191,36,0.25)] scale-[1.02]"
                    : "border border-white/10 bg-slate-900/60 hover:border-cyan-400/50 hover:bg-slate-900/90"
                }`}
              >
                {/* Step Top Row */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all ${
                        isActive
                          ? "bg-amber-400 text-slate-950 border-amber-300 shadow-md shadow-amber-400/30 font-bold"
                          : "bg-cyan-500/10 border-cyan-500/20 text-cyan-300"
                      }`}
                    >
                      {s.icon}
                    </span>

                    <span
                      className={`font-mono text-xs font-black ${
                        isActive ? "text-amber-400" : "text-slate-400"
                      }`}
                    >
                      0{idx + 1}
                    </span>
                  </div>

                  <span
                    className={`inline-block rounded px-2 py-0.5 font-mono text-[10px] font-bold mb-2 border ${s.badgeColor}`}
                  >
                    {s.badge}
                  </span>

                  <h4
                    className={`text-base font-bold mb-1 transition-colors ${
                      isActive ? "text-amber-300" : "text-white"
                    }`}
                  >
                    {s.title}
                  </h4>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {s.summary}
                  </p>
                </div>

                {/* Active Step Indicator Pill */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px]">
                  <span
                    className={`font-medium ${
                      isActive ? "text-amber-400 font-bold" : "text-slate-500"
                    }`}
                  >
                    {isActive ? "● צופה בשלב זה" : "לחץ להצצה ←"}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isActive ? "rotate-180 text-amber-400" : "text-slate-600"
                    }`}
                  />
                </div>

                {/* Animated Arrow Connector (Desktop) */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -left-3 top-1/2 -translate-y-1/2 z-20 text-cyan-400/70 text-base font-mono pointer-events-none">
                    ←
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* ── Interactive Live Step Inspector / Micro-Demo ────────────── */}
        <div className="rounded-2xl border border-amber-500/30 bg-slate-950/90 p-5 sm:p-6 shadow-inner">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3 mb-4 text-right">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-400/20 text-amber-300 font-mono text-xs font-bold">
                0{activeStepIndex + 1}
              </span>
              <h5 className="text-sm font-bold text-white">
                {steps[activeStepIndex].inspectTitle}
              </h5>
            </div>
            <a
              href="#cleaning"
              className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <span>עבור לסדנת ניקוי הנתונים המלאה ↓</span>
            </a>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStepIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {steps[activeStepIndex].inspectContent}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
