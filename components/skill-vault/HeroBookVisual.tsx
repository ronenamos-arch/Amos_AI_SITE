"use client";

import React from "react";
import Image from "next/image";
import {
  ExternalLink,
  Star,
  Sparkles,
  ShieldCheck,
  Crown,
  BookOpen,
} from "lucide-react";

export function HeroBookVisual() {
  return (
    <div className="relative w-full max-w-[440px] mx-auto" dir="rtl">
      {/* ── Glamorous Radiant Background Lighting ─────────────────────── */}
      <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-tr from-amber-500/30 via-cyan-500/30 to-blue-600/25 rounded-[36px] blur-3xl opacity-80 pointer-events-none animate-pulse duration-1000" />
      <div className="absolute -top-10 -right-6 w-40 h-40 bg-amber-400/25 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-8 -left-6 w-44 h-44 bg-cyan-400/25 rounded-full blur-2xl pointer-events-none" />

      {/* ── 3D Book Frame Container ───────────────────────────────────── */}
      <div className="relative rounded-3xl border border-amber-500/40 bg-gradient-to-b from-slate-900/95 via-space-950/98 to-slate-950 p-4 sm:p-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(251,191,36,0.15)] backdrop-blur-2xl">
        
        {/* Book Image Frame */}
        <div className="relative w-full aspect-[3/4] max-h-[380px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-950 mb-4 group">
          <Image
            src="/images/skill-vault/ai-100-tips-book.jpg"
            alt="המדריך הפרקטי ל-AI בכספים — 100 טיפים מאת רונן עמוס"
            fill
            className="object-contain sm:object-cover object-center group-hover:scale-105 transition-transform duration-500"
            priority
          />
          {/* Subtle bottom gradient shadow */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

          {/* Floating Top Badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-slate-950/85 border border-amber-400/50 px-3 py-1 font-mono text-[11px] font-bold text-amber-300 backdrop-blur-md shadow-lg">
            <Crown className="w-3.5 h-3.5 text-amber-400" /> המדריך הרשמי
          </div>
        </div>

        {/* ── CTA Box Underneath the Book ──────────────────────────────── */}
        <div className="relative rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-950/40 via-slate-900/90 to-cyan-950/40 p-3.5 sm:p-4 backdrop-blur-md shadow-inner">
          <div className="flex items-center justify-between gap-3">
            <div className="text-right">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-md border border-amber-400/30 font-mono">
                  ספר דיגיטלי מומלץ
                </span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-2.5 h-2.5 fill-amber-400" />
                  ))}
                </div>
              </div>
              <h4 className="text-xs sm:text-sm font-black text-white">
                המדריך הפרקטי ל-AI בכספים — 100 טיפים
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                100 טיפים לייעול, חיסכון וקבלת החלטות ב-Finance
              </p>
            </div>

            {/* Gumroad Buy Link Button */}
            <a
              href="https://ronenamos.gumroad.com/l/AI-100-tips"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 px-4 py-2.5 text-xs font-black text-slate-950 shadow-lg shadow-amber-500/30 hover:brightness-110 active:scale-95 transition-all"
            >
              <span>רכוש ב-₪79</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-950 stroke-[2.5]" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
