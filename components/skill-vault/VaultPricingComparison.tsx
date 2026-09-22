"use client";

import React from "react";
import Link from "next/link";
import { Check, X, Sparkles, ArrowLeft, ShieldCheck, Zap, Crown } from "lucide-react";
import { SMARTBEE_CONFIG } from "@/lib/smartbee-config";
import { SUBSCRIPTION_PRICE, SUBSCRIPTION_PERIOD } from "@/lib/paypal-subscribe";

export function VaultPricingComparison() {
  const subscribeUrl = SMARTBEE_CONFIG.products.monthlySubscription.url;

  const features = [
    { name: "פרומפטים מוכנים לשימוש", free: "15 פרומפטים", pro: "כל 102 הפרומפטים (מתעדכן)" },
    { name: "מודול ניקוי נתונים וקובץ תרגול PnL", free: true, pro: true },
    { name: "פרומפטי ביקורת CFO מתקדמים", free: "בסיסי בלבד", pro: "5 פרומפטי עומק מלאים" },
    { name: "סקריפטים לאוטומציה (Python, Colab, VBA)", free: false, pro: true },
    { name: "דשבורדים אינטראקטיביים ב-Artifacts", free: false, pro: true },
    { name: "ספריית וובינרים מוקלטים (15+ שעות)", free: false, pro: true },
    { name: "חוברות עבודה ומצגות מוכנות", free: false, pro: true },
    { name: "קבוצת WhatsApp סגורה לייעוץ עם רונן", free: false, pro: true },
  ];

  return (
    <section className="my-16" dir="rtl">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider mb-3">
          <Zap className="w-3.5 h-3.5" /> תוכניות מנוי
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3">
          שדרג את היכולות של <span className="bg-gradient-to-l from-cyan-400 via-teal-300 to-cyan-200 bg-clip-text text-transparent">צוות הכספים</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-300">
          התחל בחינם עם הפרומפטים הפתוחים, או שדרג למנוי Pro המלא לקבלת גישה לכל ארגז הכלים והאוטומציות.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Free Tier */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">גרסה חינמית</h3>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs font-bold text-slate-300">
                ללא עלות
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              טעימה ראשונית לאנשי כספים שרוצים להתחיל לעבוד עם AI.
            </p>
            <div className="mb-6">
              <span className="text-4xl font-black text-white">₪0</span>
              <span className="text-xs text-slate-400 mr-2">לתמיד</span>
            </div>

            <div className="space-y-3 mb-8 text-xs sm:text-sm text-slate-300">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  {f.free ? (
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <X className="w-4 h-4 text-slate-600 shrink-0" />
                  )}
                  <span className={!f.free ? "text-slate-500 line-through" : ""}>
                    {f.name} {typeof f.free === "string" ? `(${f.free})` : ""}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <a
            href="#prompts"
            className="w-full text-center rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-bold text-white hover:bg-white/10 transition-all"
          >
            גלול לפרומפטים החינמיים ↓
          </a>
        </div>

        {/* Pro Tier (Featured) */}
        <div className="relative rounded-3xl border-2 border-cyan-400 bg-gradient-to-b from-slate-900 via-slate-900/90 to-space-950 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl shadow-cyan-500/20 flex flex-col justify-between">
          <div className="absolute -top-3.5 right-8 rounded-full bg-gradient-to-r from-cyan-400 to-teal-400 px-4 py-1 text-[11px] font-black text-slate-950 shadow-md">
            המסלול המלא והמומלץ
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-400" />
                <h3 className="text-xl font-bold text-white">AI Finance Pro</h3>
              </div>
              <span className="rounded-full border border-amber-400/40 bg-amber-400/15 px-3 py-1 font-mono text-xs font-bold text-amber-300">
                PRO
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mb-6">
              כל הכלים, הפרומפטים, הסקריפטים והקהילה הסגורה למנהלי כספים.
            </p>
            <div className="mb-6 flex items-baseline gap-2">
              <span className="text-4xl font-black text-cyan-300">{SUBSCRIPTION_PRICE}</span>
              <span className="text-xs text-slate-300">/ {SUBSCRIPTION_PERIOD}</span>
            </div>

            <div className="space-y-3 mb-8 text-xs sm:text-sm text-slate-200">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0 font-bold" />
                  <span className="font-medium text-white">
                    {f.name} {typeof f.pro === "string" ? `— ${f.pro}` : ""}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <a
              href={subscribeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-300 px-6 py-4 text-sm sm:text-base font-black text-slate-950 shadow-xl shadow-cyan-500/30 hover:opacity-95 transition-all text-center"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>הצטרף עכשיו למנוי Pro ←</span>
            </a>
            <p className="text-center text-[11px] text-slate-400 font-medium">
              ביטול עצמי בכל עת בלחיצת כפתור · תשלום מאובטח ומאושר
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
