"use client";

import React from "react";
import { Lock, Copy, Check, Sparkles, Crown } from "lucide-react";
import type { VaultPrompt } from "@/lib/prompts-vault-data";

interface PromptCardProps {
  prompt: VaultPrompt;
  onOpenModal: (prompt: VaultPrompt) => void;
  onCopy: (text: string, e: React.MouseEvent) => void;
  isCopied: boolean;
  isPro?: boolean;
}

const LEVEL_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Beginner: {
    bg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
    text: "text-emerald-400",
    border: "border-emerald-500/25",
  },
  Intermediate: {
    bg: "bg-cyan-500/10 text-cyan-300 border-cyan-500/25",
    text: "text-cyan-300",
    border: "border-cyan-500/25",
  },
  Advanced: {
    bg: "bg-purple-500/10 text-purple-300 border-purple-500/25",
    text: "text-purple-300",
    border: "border-purple-500/25",
  },
};

const LEVEL_LABELS: Record<string, string> = {
  Beginner: "מתחילים",
  Intermediate: "בינוני",
  Advanced: "מתקדם",
};

export function PromptCard({ prompt, onOpenModal, onCopy, isCopied, isPro }: PromptCardProps) {
  const levelStyle = LEVEL_COLORS[prompt.level] || LEVEL_COLORS.Beginner;
  const levelLabel = LEVEL_LABELS[prompt.level] || prompt.level;
  const isUnlocked = prompt.isFree || Boolean(isPro);

  return (
    <div
      onClick={() => onOpenModal(prompt)}
      className={`group relative flex flex-col justify-between rounded-2xl border p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer overflow-hidden ${
        isUnlocked
          ? prompt.isFree
            ? "border-cyan-500/20 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-space-950/95 shadow-lg shadow-black/40 hover:border-cyan-400 hover:shadow-[0_12px_35px_rgba(34,211,238,0.18)]"
            : "border-teal-500/30 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-teal-950/25 shadow-lg shadow-black/40 hover:border-teal-400 hover:shadow-[0_12px_35px_rgba(45,212,191,0.2)]"
          : "border-amber-400/30 bg-gradient-to-b from-slate-900/90 via-slate-900/90 to-amber-950/25 shadow-lg shadow-black/40 hover:border-amber-400 hover:shadow-[0_12px_35px_rgba(251,191,36,0.18)]"
      }`}
    >
      {/* Ambient background glow on hover */}
      <div
        className={`pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full blur-3xl transition-opacity duration-300 group-hover:opacity-100 opacity-25 ${
          isUnlocked ? "bg-cyan-500/20" : "bg-amber-400/20"
        }`}
      />

      <div>
        {/* Card Header: Number + Badges */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <span className="font-mono text-xs font-bold tracking-wider text-slate-400 group-hover:text-cyan-300 transition-colors">
            #{String(prompt.num).padStart(2, "0")}
          </span>

          <div className="flex items-center gap-2">
            <span
              className={`rounded-md border px-2 py-0.5 font-mono text-[11px] font-semibold ${levelStyle.bg}`}
            >
              {levelLabel}
            </span>

            {prompt.isFree ? (
              <span className="rounded-md border border-emerald-500/40 bg-emerald-500/15 px-2.5 py-0.5 font-mono text-[11px] font-bold text-emerald-300 shadow-sm">
                חינם
              </span>
            ) : isPro ? (
              <span className="rounded-md border border-teal-400/40 bg-gradient-to-r from-teal-400/20 via-cyan-400/20 to-teal-500/20 px-2.5 py-0.5 font-mono text-[11px] font-bold text-teal-300 flex items-center gap-1 shadow-sm">
                <Crown className="w-3 h-3 text-teal-400" /> PRO פתוח
              </span>
            ) : (
              <span className="rounded-md border border-amber-400/40 bg-gradient-to-r from-amber-400/20 via-yellow-400/20 to-amber-500/20 px-2.5 py-0.5 font-mono text-[11px] font-bold text-amber-300 flex items-center gap-1 shadow-sm">
                <Crown className="w-3 h-3 text-amber-400" /> PRO
              </span>
            )}
          </div>
        </div>

        {/* Category & Surface Tags */}
        <div className="flex flex-wrap items-center gap-1.5 mb-2.5 text-xs">
          <span className="rounded-md bg-white/5 px-2.5 py-0.5 text-[11px] text-cyan-200 font-semibold border border-cyan-500/20">
            {prompt.category}
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-[11px] text-slate-400 font-medium">{prompt.surfaceLabel || prompt.surface}</span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-white leading-snug group-hover:text-cyan-300 transition-colors mb-3">
          {prompt.title}
        </h3>

        {/* Preview snippet */}
        <div className="relative rounded-xl border border-white/10 bg-slate-950/80 p-3 mb-4 font-mono text-xs leading-relaxed overflow-hidden">
          {isUnlocked ? (
            <p className="line-clamp-3 dir-ltr text-left font-sans text-xs text-slate-300">
              {prompt.prompt.slice(0, 160)}...
            </p>
          ) : (
            <div className="relative">
              <p className="line-clamp-2 dir-ltr text-left font-sans text-xs text-slate-400 blur-[3.5px] select-none opacity-40">
                You are a senior CFO & FP&A analyst. Analyze the following financial dataset with specialized calculations and root cause commentary...
              </p>
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60 rounded">
                <span className="flex items-center gap-1.5 text-xs font-bold text-amber-300 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-400/40 shadow-md">
                  <Lock className="w-3.5 h-3.5 text-amber-400" /> פתח עם מנוי Pro
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
        <span className="text-xs text-slate-400 flex items-center gap-1 group-hover:text-cyan-300 transition-colors font-medium">
          {isUnlocked ? "פתח פרומפט מלא ←" : "פרטים ושדרוג ←"}
        </span>

        {isUnlocked ? (
          <button
            type="button"
            onClick={(e) => onCopy(prompt.prompt, e)}
            className="flex items-center gap-1.5 rounded-lg border border-cyan-400/40 bg-cyan-400/15 px-3 py-1.5 text-xs font-bold text-cyan-300 hover:bg-cyan-400/30 hover:border-cyan-400 transition-all shadow-sm"
            title="העתק פרומפט ללוח"
          >
            {isCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">הועתק</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>העתק</span>
              </>
            )}
          </button>
        ) : (
          <span className="flex items-center gap-1 rounded-lg border border-amber-400/30 bg-amber-400/10 px-2.5 py-1 text-xs font-bold text-amber-300">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>נעול למנויים</span>
          </span>
        )}
      </div>
    </div>
  );
}
