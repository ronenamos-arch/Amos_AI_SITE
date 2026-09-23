"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Sparkles,
  Layers,
  Flame,
  CheckCircle2,
  Lock,
  ChevronDown,
  HelpCircle,
  X,
  SlidersHorizontal,
  FileCode,
  Laptop,
  Crown,
  FileSpreadsheet,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  BookOpen,
} from "lucide-react";
import {
  ALL_VAULT_PROMPTS,
  VAULT_SURFACES,
  VAULT_CATEGORIES,
  VAULT_LEVELS,
  type VaultPrompt,
} from "@/lib/prompts-vault-data";
import { PromptCard } from "@/components/skill-vault/PromptCard";
import { PromptModal } from "@/components/skill-vault/PromptModal";
import { VaultQuickWins } from "@/components/skill-vault/VaultQuickWins";
import { VisualDataPipeline } from "@/components/skill-vault/VisualDataPipeline";
import { HeroBookVisual } from "@/components/skill-vault/HeroBookVisual";
import DataCleaningModule from "@/components/skill-vault/DataCleaningModule";
import { VaultPricingComparison } from "@/components/skill-vault/VaultPricingComparison";
import { VaultCTA } from "@/components/skill-vault/VaultCTA";

const FAQS = [
  {
    q: "באיזה כלי AI מומלץ להשתמש עם הפרומפטים שבספרייה?",
    a: "כל הפרומפטים נבדקו והותאמו ל-Claude (3.5 Sonnet / 3.7 Sonnet), ChatGPT (GPT-4o / o1 / o3), ו-Google Gemini. פרומפטים מסוימים מסומנים במיוחד עבור Claude in Excel, Artifacts, או Google Colab.",
  },
  {
    q: "האם הנתונים הפיננסיים של החברה שלי נשארים מאובטחים?",
    a: "כן. הפרומפטים מיועדים להרצה ישירה בסביבת ה-AI הפרטית שלך (Claude / OpenAI / Colab). שום נתון שתעתיק או תדביק אינו עובר או נשמר בשרתי האתר שלנו. תמיד מומלץ להסיר נתונים מזהים (PII) או להשתמש בחשבון Enterprise/Team בעל מדיניות אי-אימון מודלים (Zero Data Retention).",
  },
  {
    q: "מה ההבדל בין הפרומפטים החינמיים לפרומפטי ה-PRO?",
    a: "הפרומפטים החינמיים מספקים פתרונות מהירים למשימות נפוצות (חריגות תקציב, סיכום מנהלים, ניקוי אקסל בסיסי). מנויי PRO מקבלים גישה מלאה לכל 102 הפרומפטים, כולל מודלים אינטראקטיביים (Artifacts), סקריפטים מלאים ב-Python ו-VBA, פרומפטי ביקורת עמוקים וקהילת WhatsApp סגורה עם רונן עמוס.",
  },
  {
    q: "איך מפעילים את הפרומפטים של Claude בתוך אקסל?",
    a: "מתקינים את תוסף Claude for Excel מה-Office Add-ins Store, פותחים את לשונית ה-Add-in, מדביקים את הפרומפט ובוחרים את טווח התאים הרצוי. Claude יקרא ויכתוב ישירות לתוך הגיליון.",
  },
];

interface SkillVaultClientProps {
  userEmail?: string | null;
  isPro?: boolean;
}

export function SkillVaultClient({ userEmail, isPro }: SkillVaultClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSurface, setSelectedSurface] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [accessFilter, setAccessFilter] = useState<"all" | "free" | "pro">("all");
  const [visibleCount, setVisibleCount] = useState(24);

  const [selectedPrompt, setSelectedPrompt] = useState<VaultPrompt | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Copy handler with visual feedback
  const handleCopy = (text: string, idOrEvent?: string | React.MouseEvent) => {
    if (idOrEvent && typeof idOrEvent !== "string") {
      idOrEvent.stopPropagation();
    }
    navigator.clipboard.writeText(text);
    const id = typeof idOrEvent === "string" ? idOrEvent : "modal";
    setCopiedId(id);
    setToastMessage("הפרומפט הועתק ללוח בהצלחה!");
    setTimeout(() => {
      setCopiedId(null);
      setToastMessage(null);
    }, 2500);
  };

  // Filtered prompts calculation
  const filteredPrompts = useMemo(() => {
    return ALL_VAULT_PROMPTS.filter((p) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSurface =
        selectedSurface === "all" || p.surface === selectedSurface;

      const matchesLevel =
        selectedLevel === "all" || p.level === selectedLevel;

      const matchesCategory =
        selectedCategory === "all" || p.category === selectedCategory;

      const matchesAccess =
        accessFilter === "all" ||
        (accessFilter === "free" && p.isFree) ||
        (accessFilter === "pro" && !p.isFree);

      return matchesSearch && matchesSurface && matchesLevel && matchesCategory && matchesAccess;
    });
  }, [searchQuery, selectedSurface, selectedLevel, selectedCategory, accessFilter]);

  const displayedPrompts = useMemo(() => {
    return filteredPrompts.slice(0, visibleCount);
  }, [filteredPrompts, visibleCount]);

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedSurface !== "all" ||
    selectedLevel !== "all" ||
    selectedCategory !== "all" ||
    accessFilter !== "all";

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedSurface("all");
    setSelectedLevel("all");
    setSelectedCategory("all");
    setAccessFilter("all");
    setVisibleCount(24);
  };

  // JSON-LD Schema for SEO / GEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        name: "AI Finance Skill Vault — ספריית הפרומפטים והמודלים הפיננסיים",
        description: "102 פרומפטים וסקריפטים מוכנים לשימוש לאנשי כספים, CFOs, Controllers ו-FP&A",
        numberOfItems: ALL_VAULT_PROMPTS.length,
        itemListElement: ALL_VAULT_PROMPTS.slice(0, 15).map((p, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: p.title,
          description: `פרומפט ${p.category} ברמת ${p.level} עבור ${p.surface}`,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-space-950 text-slate-100 font-sans selection:bg-cyan-400 selection:text-slate-950 pt-2 pb-20 overflow-x-hidden">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── 1. Hero Section (Option 3 Editorial & 3D Visual with Brand Colors) ─────────────────────── */}
      <section className="relative overflow-hidden border-b border-cyan-500/20 bg-gradient-to-b from-slate-900 via-space-950 to-slate-950 pt-10 pb-16 lg:pb-20 shadow-2xl">
        {/* Ambient Gradient Glows */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-[900px] max-w-full rounded-full bg-gradient-to-b from-cyan-500/15 via-royal-500/10 to-transparent blur-3xl z-0" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Pro Subscriber Banner */}
          {isPro && (
            <div className="mb-8 rounded-2xl border border-teal-400/40 bg-gradient-to-r from-teal-500/15 via-cyan-500/10 to-emerald-500/15 p-4 sm:p-5 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl shadow-cyan-950/40">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-teal-400/20 border border-teal-400/40 flex items-center justify-center text-teal-300 shrink-0">
                  <Crown className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base flex items-center gap-2">
                    מנוי PRO פעיל {userEmail ? `(${userEmail})` : ""}
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono">גישה מלאה</span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    כל 102 הפרומפטים, הסקריפטים ומודלי ה-CFO פתוחים עבורך לצפייה, העתקה והרצה ישירה ללא הגבלה!
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a href="#prompts" className="rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 px-4 py-2 text-xs font-bold text-slate-950 hover:opacity-90 transition-all shadow-md">
                  גש לקטלוג הפרומפטים ↓
                </a>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Right Column: Copy & Actions */}
            <div className="lg:col-span-7 text-right">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-950/40 px-4 py-1.5 text-xs font-mono font-bold text-cyan-300 shadow-lg shadow-cyan-950/40 backdrop-blur-md mb-6">
                <Sparkles className="w-4 h-4 text-cyan-400" /> AI Finance Transformation Vault
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] mb-6">
                אוצר פרומפטים מובחר ל-
                <span className="bg-gradient-to-l from-cyan-300 via-teal-300 to-amber-200 bg-clip-text text-transparent">
                  AI בפיננסים וכספים
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-xl">
                פתח תובנות מקצועיות עם ספריית הפרומפטים והמודלים המובילה לאנשי כספים בישראל — תקציב, דוחות, ניתוח סטיות וניקוי נתונים.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
                <a
                  href="#prompts"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-300 px-8 py-4 text-base font-black text-slate-950 shadow-xl shadow-cyan-500/25 hover:opacity-95 transition-all"
                >
                  <Sparkles className="w-5 h-5 text-slate-950" />
                  <span>גלה את כל הפרומפטים ↓</span>
                </a>
                <a
                  href="#cleaning"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-cyan-500/30 bg-slate-900/80 px-6 py-4 text-base font-bold text-cyan-300 hover:bg-slate-900 hover:border-cyan-400 transition-all backdrop-blur-md"
                >
                  <FileSpreadsheet className="w-5 h-5 text-cyan-400" />
                  <span>סדנת ניקוי נתונים באקסל</span>
                </a>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-3 max-w-lg">
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-3.5 text-center backdrop-blur-md">
                  <span className="block font-mono text-2xl font-black text-cyan-400">102</span>
                  <span className="text-[11px] text-slate-400 font-medium">פרומפטים מוכנים</span>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-3.5 text-center backdrop-blur-md">
                  <span className="block font-mono text-2xl font-black text-amber-300">CFO</span>
                  <span className="text-[11px] text-slate-400 font-medium">רמת דיוק עסקית</span>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-3.5 text-center backdrop-blur-md">
                  <span className="block font-mono text-2xl font-black text-emerald-400">100%</span>
                  <span className="text-[11px] text-slate-400 font-medium">העתקה מיידית</span>
                </div>
              </div>
            </div>

            {/* Left Column: 3D Master Vault Visual Book & Prompts Reader with Gumroad Link */}
            <div className="lg:col-span-5 relative flex justify-center">
              <HeroBookVisual />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
        {/* ── 2. Visual Workflow Pipeline (Option 3 Feature) ───────────── */}
        <VisualDataPipeline />

        {/* ── 3. Quick Wins Section (Free Starter Prompts) ─────────────── */}
        <VaultQuickWins onCopy={handleCopy} copiedId={copiedId} />

        {/* ── 4. Data Cleaning & Workflow Studio ─────────────────────────── */}
        <section id="cleaning" className="mb-20 scroll-mt-20">
          <DataCleaningModule />
        </section>

        {/* ── 5. The 102 Prompts Catalog & Search Engine ───────────────── */}
        <section id="prompts" className="my-16 scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
                <Layers className="w-3.5 h-3.5" /> Full Catalog
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                קטלוג 102 הפרומפטים והמודלים
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                סנן לפי סביבת עבודה, רמת קושי או קטגוריה מקצועית · לחץ על פרומפט לצפייה והעתקה
              </p>
            </div>

            {/* Access Toggle Filter (All vs Free vs Pro) */}
            <div className="flex items-center rounded-xl border border-white/10 bg-slate-900/90 p-1 self-start md:self-auto shadow-lg">
              <button
                type="button"
                onClick={() => setAccessFilter("all")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  accessFilter === "all"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                הכל ({ALL_VAULT_PROMPTS.length})
              </button>
              <button
                type="button"
                onClick={() => setAccessFilter("free")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  accessFilter === "free"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                חינם בלבד ({ALL_VAULT_PROMPTS.filter((p) => p.isFree).length})
              </button>
              <button
                type="button"
                onClick={() => setAccessFilter("pro")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  accessFilter === "pro"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                פרומפטי Pro ({ALL_VAULT_PROMPTS.filter((p) => !p.isFree).length})
              </button>
            </div>
          </div>

          {/* Search and Filters Bar */}
          <div className="mb-8 space-y-4 rounded-3xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-xl shadow-xl">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="חפש לפי נושא, מילת מפתח (תקציב, סטייה, אקסל, תזרים, P&L...)"
                className="w-full rounded-2xl border border-white/15 bg-slate-950/80 py-3.5 pr-12 pl-10 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Pills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              {/* Category Filter */}
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1.5 font-mono">
                  קטגוריה מקצועית
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-xs text-slate-200 focus:border-cyan-400 focus:outline-none"
                >
                  <option value="all">כל הקטגוריות ({VAULT_CATEGORIES.length})</option>
                  {VAULT_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Surface Filter */}
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1.5 font-mono">
                  סביבת עבודה / כלי
                </label>
                <select
                  value={selectedSurface}
                  onChange={(e) => setSelectedSurface(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-xs text-slate-200 focus:border-cyan-400 focus:outline-none"
                >
                  <option value="all">כל הסביבות</option>
                  {VAULT_SURFACES.filter((s) => s.id !== "all").map((surf) => (
                    <option key={surf.id} value={surf.id}>
                      {surf.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Level Filter */}
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1.5 font-mono">
                  רמת מורכבות
                </label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-xs text-slate-200 focus:border-cyan-400 focus:outline-none"
                >
                  <option value="all">כל הרמות</option>
                  {VAULT_LEVELS.filter((l) => l.id !== "all").map((lvl) => (
                    <option key={lvl.id} value={lvl.id}>
                      {lvl.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active Filters count & reset */}
            <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
              <span className="text-slate-400">
                נמצאו <strong className="text-cyan-300 font-mono">{filteredPrompts.length}</strong> פרומפטים
              </span>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-xs text-cyan-400 hover:underline font-bold"
                >
                  <X className="w-3.5 h-3.5" /> נקה סינונים
                </button>
              )}
            </div>
          </div>

          {/* Prompts Cards Grid */}
          {filteredPrompts.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-12 text-center">
              <Search className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-1">לא נמצאו פרומפטים תואמים</h3>
              <p className="text-xs text-slate-400 mb-4">
                נסה לשנות את מילת החיפוש או לאפס את המסננים.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-xs font-bold text-cyan-300 hover:bg-cyan-500/20"
              >
                איפוס כל המסננים
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayedPrompts.map((p) => (
                <PromptCard
                  key={p.id}
                  prompt={p}
                  onOpenModal={(item) => setSelectedPrompt(item)}
                  onCopy={(text, e) => handleCopy(text, e)}
                  isCopied={copiedId === "modal" || copiedId === p.id}
                  isPro={isPro}
                />
              ))}
            </div>
          )}

          {/* Load More Button */}
          {filteredPrompts.length > visibleCount && (
            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 24)}
                className="inline-flex items-center gap-2 rounded-2xl border border-cyan-500/30 bg-slate-900 px-8 py-3.5 text-sm font-bold text-cyan-300 hover:bg-slate-850 hover:border-cyan-500/50 shadow-lg shadow-cyan-950/40 transition-all"
              >
                <span>טען עוד פרומפטים ({filteredPrompts.length - visibleCount} נותרו)</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}
        </section>

        {/* ── 6. Value Stack Comparison Matrix (Free vs Pro) ─────────────── */}
        {!isPro && <VaultPricingComparison />}

        {/* ── 7. Zero-Click SEO & FAQ Section ─────────────────────────────── */}
        <section className="my-16 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
              <HelpCircle className="w-3.5 h-3.5" /> שאלות נפוצות
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              כל מה שצריך לדעת על השימוש ב-Skill Vault
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-white/10 bg-slate-900/60 p-5 transition-all open:border-cyan-500/40 open:bg-slate-900/90"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  <span>{faq.q}</span>
                  <ChevronDown className="w-4 h-4 text-cyan-400 transition-transform group-open:rotate-180 shrink-0 mr-2" />
                </summary>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* ── 8. Bottom CTA Banner ───────────────────────────────────────── */}
        {!isPro && <VaultCTA />}
      </div>

      {/* ── Modal Dialog for Viewing / Copying Single Prompt ────────── */}
      <PromptModal
        prompt={selectedPrompt}
        onClose={() => setSelectedPrompt(null)}
        onCopy={(text) => handleCopy(text)}
        isCopied={copiedId === "modal"}
        isPro={isPro}
      />

      {/* Copy Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-2xl bg-cyan-400 px-5 py-3 text-slate-950 font-bold text-sm shadow-2xl shadow-cyan-400/30 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
