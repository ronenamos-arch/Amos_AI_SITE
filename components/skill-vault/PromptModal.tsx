"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { X, Copy, Check, Lock, Sparkles, ArrowLeft, ShieldCheck, CheckCircle2, Crown } from "lucide-react";
import type { VaultPrompt } from "@/lib/prompts-vault-data";
import { SMARTBEE_CONFIG } from "@/lib/smartbee-config";

interface PromptModalProps {
  prompt: VaultPrompt | null;
  onClose: () => void;
  onCopy: (text: string) => void;
  isCopied: boolean;
}

export function PromptModal({ prompt, onClose, onCopy, isCopied }: PromptModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (prompt) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [prompt, onClose]);

  if (!prompt) return null;

  const subscribeUrl = SMARTBEE_CONFIG.products.monthlySubscription.url;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-space-950/85 p-4 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/15 bg-slate-900/95 p-6 sm:p-8 text-right shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute left-5 top-5 rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
          aria-label="סגור חלון"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-5 flex flex-wrap items-center gap-2 pr-1">
          <span className="font-mono text-sm font-bold text-cyan-400">
            #{String(prompt.num).padStart(2, "0")}
          </span>
          <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-semibold text-slate-300">
            {prompt.category}
          </span>
          <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-400 font-medium">
            {prompt.surfaceLabel || prompt.surface}
          </span>
          {prompt.isFree ? (
            <span className="rounded-md border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-1 font-mono text-xs font-bold text-emerald-300">
              חינם לשימוש
            </span>
          ) : (
            <span className="rounded-md border border-amber-400/40 bg-amber-400/15 px-2.5 py-1 font-mono text-xs font-bold text-amber-300 flex items-center gap-1 shadow-sm">
              <Crown className="w-3.5 h-3.5 text-amber-400" /> בלעדי למנויי Pro
            </span>
          )}
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-white leading-tight mb-4">
          {prompt.title}
        </h2>

        {/* Content Body */}
        {prompt.isFree ? (
          <div>
            <p className="text-sm text-slate-300 mb-3 leading-relaxed">
              העתק את הפרומפט המלא להלן והדבק אותו ישירות ב-Claude, ChatGPT או בתוסף המתאים:
            </p>

            {/* Prompt Code Block */}
            <div className="relative mb-6 rounded-2xl border border-cyan-500/20 bg-slate-950/90 p-4 sm:p-5 font-mono text-xs sm:text-sm text-slate-200 leading-relaxed max-h-[380px] overflow-y-auto dir-ltr text-left shadow-inner">
              <pre className="whitespace-pre-wrap font-mono text-xs sm:text-sm text-cyan-100">
                {prompt.prompt}
              </pre>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => onCopy(prompt.prompt)}
                className="w-full sm:flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-300 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/25 hover:opacity-95 transition-all"
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4 text-slate-950" />
                    <span>הועתק ללוח בהצלחה!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>העתק פרומפט עכשיו</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto rounded-xl border border-white/10 px-5 py-3.5 text-sm font-semibold text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
              >
                סגור
              </button>
            </div>
          </div>
        ) : (
          /* Locked Pro Modal */
          <div className="space-y-6">
            <div className="rounded-2xl border border-amber-400/40 bg-gradient-to-b from-amber-950/30 via-slate-900 to-slate-950 p-6">
              <div className="flex items-center gap-3 mb-4 text-amber-300">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300">
                  <Crown className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    פרומפט מקצועי למנויי AI Finance Pro
                  </h3>
                  <p className="text-xs text-slate-300">
                    קבל גישה מלאה לכל 102 הפרומפטים, הסקריפטים והדשבורדים
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 mb-6 text-xs sm:text-sm text-slate-200">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>פרומפט מובנה ומנוסה ברמת CFO עם הנחיות דיוק וטיפול במקרי קצה</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>כולל גישה לכל סקריפטי האוטומציה ב-Python, Colab ו-Excel VBA</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>חברות בקהילת ה-WhatsApp הסגורה של רואי חשבון ומנהלי כספים</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>גישה לכל הוובינרים המוקלטים והמדריכים הבלעדיים</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={subscribeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-300 px-6 py-3.5 text-sm font-black text-slate-950 shadow-xl shadow-cyan-500/30 hover:opacity-95 transition-all text-center"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>שדרג עכשיו למנוי Pro ←</span>
                </a>
                <Link
                  href="/login"
                  className="w-full sm:w-auto text-center rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm font-bold text-slate-200 hover:bg-white/10 transition-colors"
                >
                  כבר מנוי? התחבר
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>תשלום מאובטח · ביטול עצמי בכל עת בלחיצת כפתור · חשבונית מס אוטומטית</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
