"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import "../skills-vault.css";
import promptsData from "../../content/prompts.json";
import { VaultCTA } from "@/components/skill-vault/VaultCTA";

// Category Icon Mapping
const CATEGORY_ICONS: Record<string, string> = {
  "Automated Financial Reporting": "📊",
  "Financial Forecasting": "📈",
  "Financial Reporting Prompts": "📋",
  "Audit & Compliance Prompts": "🔍",
  "Budget Analysis and Cost Optimization": "💰",
  "Budgeting & Forecasting Prompts": "📅",
  "Contract & Policy Review Prompts": "📜",
  "Credit Scoring and Loan Assessment": "💳",
  "Due Diligence & M&A": "🤝",
  "ESG Analysis": "🌱",
  "Financial Operating": "💼",
  General: "✨",
};

// First 2 categories open by default
const DEFAULT_OPEN = new Set([
  "Automated Financial Reporting",
  "Financial Forecasting",
]);

// Quick-win prompt IDs shown in the featured section
const QUICK_WIN_IDS = ["budget-variance", "kpi-analysis", "exec-summary"];

interface PromptItem {
  id: string;
  title: string;
  category: string;
  description: string;
  prompt: string;
}

const prompts = promptsData as PromptItem[];

// ─── Quick Win Card ────────────────────────────────────────────────────────────
function QuickWinCard({
  item,
  onCopy,
}: {
  item: PromptItem;
  onCopy: (text: string) => void;
}) {
  const preview = item.prompt.slice(0, 220).replace(/\r\n/g, "\n");
  return (
    <div className="qw-card">
      <div className="qw-card-top">
        <span className="vault-card-badge">{item.category}</span>
        <span className="qw-free-tag">חינם</span>
      </div>
      <h3 className="qw-card-title">{item.title}</h3>
      <p className="qw-card-desc">{item.description}</p>
      <div className="qw-prompt-preview">
        <div className="qw-prompt-bar">
          <span className="qw-prompt-label">Prompt</span>
        </div>
        <p className="qw-prompt-text">{preview}…</p>
      </div>
      <button
        className="qw-copy-btn"
        onClick={() => onCopy(item.prompt)}
      >
        📋 העתק Prompt
      </button>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function SkillVaultPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openSections, setOpenSections] = useState<Set<string>>(DEFAULT_OPEN);
  const [selectedPrompt, setSelectedPrompt] = useState<PromptItem | null>(null);
  const [showToast, setShowToast] = useState(false);

  const quickWins = useMemo(
    () =>
      QUICK_WIN_IDS.map((id) => prompts.find((p) => p.id === id)).filter(
        Boolean
      ) as PromptItem[],
    []
  );

  const categories = useMemo(() => {
    const cats = Array.from(new Set(prompts.map((p) => p.category)));
    return ["all", ...cats];
  }, []);

  const filteredGroups = useMemo(() => {
    const filtered = prompts.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    return filtered.reduce(
      (acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
      },
      {} as Record<string, PromptItem[]>
    );
  }, [searchQuery, activeCategory]);

  const toggleSection = (cat: string) => {
    const next = new Set(openSections);
    if (next.has(cat)) next.delete(cat);
    else next.add(cat);
    setOpenSections(next);
  };

  const copyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  return (
    <div className="vault-container">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="vault-hero">
        <div className="vault-inner">
          <p className="vault-hero-eyebrow">Free AI Finance Tools</p>
          
          {/* Academy Banner */}
          <div className="my-4 max-w-xl mx-auto">
            <Link 
              href="/academy" 
              className="flex items-center justify-between p-3.5 rounded-xl glass-panel border border-neon-cyan/40 bg-neon-cyan/10 hover:bg-neon-cyan/20 transition-all text-xs sm:text-sm group text-right"
            >
              <span className="text-neon-cyan font-bold">
                🎓 רוצה ללמוד במסלול מובנה? כל הפרומפטים והסקילים מאורגנים באקדמיה
              </span>
              <span className="text-neon-teal font-black group-hover:-translate-x-1 transition-transform">←</span>
            </Link>
          </div>

          <h1 className="vault-hero-headline">
            פרומפטים מוכנים לאנשי{" "}
            <span className="vault-gradient-text">פיננסים</span>
          </h1>
          <p className="vault-hero-subtitle">
            תקציב · P&L · תזרים · תחזית · דוחות לדירקטוריון
            <br />
            העתק, הדבק בכל AI — וקבל תוצאות מקצועיות תוך דקות.
          </p>

          <div className="vault-stats-row">
            <div className="vault-stat">
              <span className="vault-gradient-text font-bold text-2xl">22</span>
              <span className="text-xs text-gray-400">Prompt Templates</span>
            </div>
            <div className="vault-stat-divider" />
            <div className="vault-stat">
              <span className="vault-gradient-text font-bold text-2xl">100%</span>
              <span className="text-xs text-gray-400">Copy & Use</span>
            </div>
            <div className="vault-stat-divider" />
            <div className="vault-stat">
              <span className="vault-gradient-text font-bold text-2xl">CFO</span>
              <span className="text-xs text-gray-400">Level Output</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick Wins ───────────────────────────────────────────────────── */}
      <section className="vault-skills-section" style={{ paddingTop: 0, paddingBottom: "48px" }}>
        <div className="vault-inner">
          <div className="qw-header">
            <span className="qw-fire">🔥</span>
            <div>
              <h2 className="vault-section-title" style={{ textAlign: "right", marginBottom: "4px" }}>
                התחל כאן — 3 פרומפטים שתוכל להשתמש בהם עכשיו
              </h2>
              <p className="vault-section-subtitle" style={{ textAlign: "right", marginBottom: 0 }}>
                לחץ על "העתק Prompt" והדבק ב-ChatGPT, Claude או Gemini
              </p>
            </div>
          </div>

          <div className="qw-grid">
            {quickWins.map((item) => (
              <QuickWinCard key={item.id} item={item} onCopy={copyPrompt} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 102 Prompts resource ─────────────────────────────────────────── */}
      <section className="vault-skills-section" style={{ paddingTop: 0, paddingBottom: "48px" }}>
        <div className="vault-inner">
          <div className="vault-for-card" style={{ textAlign: "center" }}>
            <h2 className="vault-section-title" style={{ marginBottom: "12px" }}>
              102 פרומפטים <span className="vault-gradient-text">לאנשי כספים</span>
            </h2>
            <p className="vault-section-subtitle" style={{ marginBottom: "28px" }}>
              אוסף מלא של 102 פרומפטים מוכנים לשימוש — דוחות, תחזיות, ניתוח סטיות, ביקורת ובקרה —
              מסודרים לפי תחום ומוכנים להעתקה.
            </p>
            <Link
              href="/resources/102-prompt"
              className="inline-flex items-center gap-3 bg-gradient-to-l from-neon-cyan to-neon-teal text-space-950 font-black text-xl px-12 py-6 rounded-2xl shadow-2xl shadow-neon-cyan/20 hover:opacity-90 transition-opacity"
            >
              <span>לכל 102 הפרומפטים</span>
              <span aria-hidden="true">←</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Who Is This For ──────────────────────────────────────────────── */}
      <section className="vault-for-section">
        <div className="vault-inner">
          <h2 className="vault-section-title">
            למי זה <span className="vault-gradient-text">מתאים?</span>
          </h2>
          <div className="vault-for-grid">
            <div className="vault-for-card">
              <div className="vault-for-icon">📊</div>
              <h3>FP&A Analysts</h3>
              <p>תחזיות, ניתוח סטיות תקציב, דוחות ביצוע חודשיים</p>
            </div>
            <div className="vault-for-card">
              <div className="vault-for-icon">🏦</div>
              <h3>CFOs & Controllers</h3>
              <p>סיכומי מנהלים לדירקטוריון, ניתוח KPI, תחזית תזרים</p>
            </div>
            <div className="vault-for-card">
              <div className="vault-for-icon">🧾</div>
              <h3>רואי חשבון</h3>
              <p>ביקורת יומנים, ניתוח התאמות, דוחות ציות ורגולציה</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── All Prompts ──────────────────────────────────────────────────── */}
      <section id="skills" className="vault-skills-section">
        <div className="vault-inner">
          <h2 className="vault-section-title">
            כל ה-<span className="vault-gradient-text">Prompts</span>
          </h2>
          <p className="vault-section-subtitle">
            לחץ על קטגוריה לפתיחה · לחץ על "העתק Prompt" לשימוש מיידי
          </p>

          <div className="vault-filter-controls">
            <div className="vault-search-wrapper">
              <input
                type="text"
                placeholder="חפש פרומפט..."
                className="vault-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-60">
                🔍
              </span>
            </div>
            <div className="vault-category-filters">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`vault-filter-chip ${activeCategory === cat ? "active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat === "all" ? "הכל" : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="vault-skills-container">
            {Object.keys(filteredGroups).map((cat, index) => {
              const items = filteredGroups[cat];
              const isGroupOpen =
                activeCategory !== "all" ||
                searchQuery.length > 0 ||
                openSections.has(cat);

              return (
                <section key={cat} className="vault-category-section">
                  <button
                    className="vault-category-header"
                    onClick={() => toggleSection(cat)}
                  >
                    <div className="vault-category-title">
                      <span>{CATEGORY_ICONS[cat] || "✨"}</span>
                      <span>{cat}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="vault-card-badge">{items.length}</span>
                      <span
                        className={`transition-transform duration-300 ${isGroupOpen ? "rotate-180" : ""}`}
                      >
                        ▼
                      </span>
                    </div>
                  </button>

                  {isGroupOpen && (
                    <div className="vault-category-content">
                      {items.map((item) => (
                        <article
                          key={item.id}
                          className="vault-card"
                          onClick={() => setSelectedPrompt(item)}
                        >
                          <div className="text-3xl mb-2">
                            {CATEGORY_ICONS[cat] || "✨"}
                          </div>
                          <div className="vault-card-badge">{cat}</div>
                          <h3 className="vault-card-title">{item.title}</h3>
                          <p className="vault-card-desc">{item.description}</p>
                          <button
                            className="vault-btn-copy"
                            onClick={(e) => {
                              e.stopPropagation();
                              copyPrompt(item.prompt);
                            }}
                          >
                            העתק Prompt
                          </button>
                        </article>
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <VaultCTA />

      {/* ── Modal ────────────────────────────────────────────────────────── */}
      {selectedPrompt && (
        <div
          className="vault-modal-overlay"
          onClick={() => setSelectedPrompt(null)}
        >
          <div
            className="vault-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="vault-card-title text-xl">
                {selectedPrompt.title}
              </h3>
              <button
                className="text-gray-400 hover:text-white text-2xl"
                onClick={() => setSelectedPrompt(null)}
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-gray-300 mb-4 text-right">
              העתק את ה-Prompt הבא והדבק בכל כלי AI:
            </p>
            <div className="bg-black/30 border border-teal-900/50 rounded-lg p-6 mb-6 text-right dir-rtl">
              <p className="whitespace-pre-wrap leading-relaxed text-gray-100">
                {selectedPrompt.prompt}
              </p>
            </div>
            <div className="flex gap-4">
              <button
                className="vault-btn-copy flex-1 py-3 text-base font-bold bg-teal-400 text-black hover:bg-teal-300"
                onClick={() => {
                  copyPrompt(selectedPrompt.prompt);
                  setSelectedPrompt(null);
                }}
              >
                📋 העתק Prompt
              </button>
              <button
                className="flex-1 py-3 border border-gray-700 rounded-lg text-gray-400 hover:text-white"
                onClick={() => setSelectedPrompt(null)}
              >
                סגור
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Toast ────────────────────────────────────────────────────────── */}
      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-teal-500/20 border border-teal-500 text-teal-400 px-8 py-3 rounded-full font-bold shadow-2xl z-[300] animate-bounce">
          ✅ הועתק ללוח
        </div>
      )}
    </div>
  );
}
