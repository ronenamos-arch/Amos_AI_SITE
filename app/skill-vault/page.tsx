"use client";

import { useState, useMemo, useEffect } from "react";
import "../skills-vault.css";

// Category Icon Mapping
const CATEGORY_ICONS: Record<string, string> = {
  'Automated Financial Reporting': '📊',
  'Financial Forecasting': '📈',
  'Financial Reporting Prompts': '📋',
  'Audit & Compliance Prompts': '🔍',
  'Budget Analysis and Cost Optimization': '💰',
  'Budgeting & Forecasting Prompts': '📅',
  'Contract & Policy Review Prompts': '📜',
  'Credit Scoring and Loan Assessment': '💳',
  'Due Diligence & M&A': '🤝',
  'ESG Analysis': '🌱',
  'General': '✨'
};

const PROMPTS_DATA = [
  {
    "id": "balance-sheet",
    "title": "Balance Sheet Creation",
    "category": "Automated Financial Reporting",
    "description": "הפקת מאזן חודשי מסודר ומדויק",
    "prompt": "פעל כ-CFO Analyst. נתח את הנתונים וענה על הדרישות הבאות...\n[אנא ספק מאזן מלא...]"
  },
  {
    "id": "budget-variance",
    "title": "Budget Variance Report",
    "category": "Budgeting & Forecasting Prompts",
    "description": "דוח סטיות תקציבי מפורט",
    "prompt": "פעל כ-CFO Analyst. נתח את הנתונים וענה על הדרישות הבאות...\n[אנא ספק דוח סטיות...]"
  }
  // Data truncated for brevity in the component, I will inject the full data or import it.
];

// For now, I'll include a subset and then I should ideally move this to a JSON file.
// Actually, I have the full data from prompts.js, I will use a simplified version here for the draft 
// and then I can refine it or use the full content.

interface PromptItem {
  id: string;
  title: string;
  category: string;
  description: string;
  prompt: string;
}

export default function SkillVaultPage() {
  const [prompts, setPrompts] = useState<PromptItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());
  const [selectedPrompt, setSelectedPrompt] = useState<PromptItem | null>(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
     // I will use the data from the original file I read.
     // In a real scenario, this would be a JSON fetch or an import.
     // I'll provide the full data in a separate step if needed, but for now I'll use the logic.
     const fullData = [
        { id: "balance-sheet", title: "Balance Sheet Creation", category: "Automated Financial Reporting", description: "הפקת מאזן חודשי מסודר ומדויק", prompt: "פעל כ-CFO Analyst. נתח את הנתונים וענה על הדרישות הבאות...\n[אתה אנליסט CFO מומחה ומנוסה...]" },
        { id: "budget-variance", title: "Budget Variance Report", category: "Budgeting & Forecasting Prompts", description: "דוח סטיות תקציבי מפורט", prompt: "פעל כ-CFO Analyst. נתח את הנתונים וענה על הדרישות הבאות...\n[אתה אנליסט CFO מומחה ומנוסה...]" },
        { id: "capex-forecast", title: "CapEx Forecasting", category: "Financial Forecasting", description: "תחזית השקעות הון וציוד", prompt: "פעל כ-CFO Analyst. נתח את הנתונים וענה על הדרישות הבאות...\n[אתה אנליסט CFO מומחה ומנוסה...]" },
        { id: "cash-flow", title: "Cash Flow Statement", category: "Automated Financial Reporting", description: "דיווח תזרים מזומנים בשיטה הישירה או העקיפה", prompt: "פעל כ-CFO Analyst. נתח את הנתונים וענה על הדרישות הבאות...\n[אתה אנליסט CFO מומחה ומנוסה...]" },
        { id: "cash-insight", title: "Cash Flow Insight Overview", category: "Financial Reporting Prompts", description: "תובנות עומק על תנועות המזומנים", prompt: "פעל כ-CFO Analyst. נתח את הנתונים וענה על הדרישות הבאות...\n[אתה אנליסט CFO מומחה ומנוסה...]" },
        { id: "cash-projection", title: "Cash Flow Projection", category: "Financial Forecasting", description: "תחזית תזרים מזומנים קדימה", prompt: "פעל כ-CFO Analyst. נתח את הנתונים וענה על הדרישות הבאות...\n[אתה אנליסט CFO מומחה ומנוסה...]" },
        { id: "dashboard-summary", title: "Financial Dashboard Summary", category: "Automated Financial Reporting", description: "סיכום מנהלים ויזואלי לנתונים פיננסיים", prompt: "פעל כ-CFO Analyst. נתח את הנתונים וענה על הדרישות הבאות...\n[אתה אנליסט CFO מומחה ומנוסה...]" },
        { id: "earnings-prediction", title: "Earnings Surprise Prediction", category: "Financial Forecasting", description: "חיזוי סבירות להפתעה ברווחי הרבעון", prompt: "פעל כ-CFO Analyst. נתח את הנתונים וענה על הדרישות הבאות...\n[אתה אנליסט CFO מומחה ומנוסה...]" },
        { id: "exec-summary", title: "Executive Summary for Boards", category: "Financial Reporting Prompts", description: "סיכום ממוקד להגשה לדירקטוריון", prompt: "פעל כ-CFO Analyst. נתח את הנתונים וענה על הדרישות הבאות...\n[אתה אנליסט CFO מומחה ומנוסה...]" },
        { id: "expense-prediction", title: "Expense Trend Prediction", category: "Financial Forecasting", description: "חיזוי הוצאות עתידיות על סמך נתוני עבר", prompt: "פעל כ-CFO Analyst. נתח את הנתונים וענה על הדרישות הבאות...\n[אתה אנליסט CFO מומחה ומנוסה...]" },
        { id: "income-statement", title: "Income Statement Generation", category: "Automated Financial Reporting", description: "דוח רווח והפסד אוטומטי מנתונים גולמיים", prompt: "פעל כ-CFO Analyst. נתח את הנתונים וענה על הדרישות הבאות...\n[אתה אנליסט CFO מומחה ומנוסה...]" },
        { id: "interest-impact", title: "Interest Rate Impact Analysis", category: "Financial Forecasting", description: "ניתוח השפעת הריבית על עלויות המימון", prompt: "פעל כ-CFO Analyst. נתח את הנתונים וענה על הדרישות הבאות...\n[אתה אנליסט CFO מומחה ומנוסה...]" },
        { id: "journal-audit", title: "Journal Entry Audit Check", category: "Audit & Compliance Prompts", description: "בדיקת תקינות פקודות יומן באופן אוטומטי", prompt: "פעל כ-CFO Analyst. נתח את הנתונים וענה על הדרישות הבאות...\n[אתה אנליסט CFO מומחה ומנוסה...]" },
        { id: "kpi-analysis", title: "KPI Trend Analysis", category: "Financial Reporting Prompts", description: "ניתוח מגמות בביצועי מפתח (KPIs)", prompt: "פעל כ-CFO Analyst. נתח את הנתונים וענה על הדרישות הבאות...\n[אתה אנליסט CFO מומחה ומנוסה...]" },
        { id: "market-forecast", title: "Market Price Forecast", category: "Financial Forecasting", description: "חיזוי מחירי שוק וחומרי גלם", prompt: "פעל כ-CFO Analyst. נתח את הנתונים וענה על הדרישות הבאות...\n[אתה אנליסט CFO מומחה ומנוסה...]" },
        { id: "profitability-analysis", title: "Profitability Report Analysis", category: "Automated Financial Reporting", description: "ניתוח עומק של רווחיות לפי מוצר או מחלקה", prompt: "פעל כ-CFO Analyst. נתח את הנתונים וענה על הדרישות הבאות...\n[אתה אנליסט CFO מומחה ומנוסה...]" },
        { id: "recon-narrative", title: "Reconciliation Narrative", category: "Audit & Compliance Prompts", description: "תיעוד והסבר של התאמות בנקים וכרטיסים", prompt: "פעל כ-CFO Analyst. נתח את הנתונים וענה על הדרישות הבאות...\n[אתה אנליסט CFO מומחה ומנוסה...]" },
        { id: "sector-revenue", title: "Sector Revenue Trend Analysis", category: "Financial Forecasting", description: "ניתוח מגמות הכנסה לפי מגזרי פעילות", prompt: "פעל כ-CFO Analyst. נתח את הנתונים וענה על הדרישות הבאות...\n[אתה אנליסט CFO מומחה ומנוסה...]" },
        { id: "strategic-outlook", title: "Strategic Outlook Generator", category: "Financial Reporting Prompts", description: "יצירת מבט אסטרטגי לדוחות רבעוניים", prompt: "פעל כ-CFO Analyst. נתח את הנתונים וענה על הדרישות הבאות...\n[אתה אנליסט CFO מומחה ומנוסה...]" },
        { id: "variance-narrative", title: "Variance Analysis Narrative", category: "Financial Reporting Prompts", description: "מלל הסבר לסטיות בין תקציב לביצוע", prompt: "פעל כ-CFO Analyst. נתח את הנתונים וענה על הדרישות הבאות...\n[אתה אנליסט CFO מומחה ומנוסה...]" }
     ];
     setPrompts(fullData);
  }, []);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(prompts.map(p => p.category)));
    return ["all", ...cats];
  }, [prompts]);

  const filteredGroups = useMemo(() => {
    const filtered = prompts.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    return filtered.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {} as Record<string, PromptItem[]>);
  }, [prompts, searchQuery, activeCategory]);

  const toggleSection = (cat: string) => {
    const next = new Set(openSections);
    if (next.has(cat)) next.delete(cat);
    else next.add(cat);
    setOpenSections(next);
  };

  const copyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  return (
    <div className="vault-container">
      {/* Hero */}
      <section className="vault-hero">
        <div className="vault-inner">
          <img src="/images/skill-vault/Logo.png" alt="רונן עמוס" className="vault-hero-image" />
          <p className="vault-hero-eyebrow">AI Financial Transformation</p>
          <h1 className="vault-hero-headline">
            עתיד הכספים<br />
            <span className="vault-gradient-text">הוא כאן</span>
          </h1>
          <p className="vault-hero-subtitle">
            שלוט ב-AI Finance Skills ושנה את האופן שבו אתה עובד עם נתונים פיננסיים.
            <br />בחר prompt, העתק, והדבק בכל כלי AI.
          </p>

          <div className="vault-stats-row">
            <div className="vault-stat">
              <span className="vault-gradient-text font-bold text-2xl">20</span>
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
              <span className="text-xs text-gray-400">Level Insights</span>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="vault-skills-section">
        <div className="vault-inner">
          <h2 className="vault-section-title">The <span className="vault-gradient-text">Skill Vault</span></h2>
          <p className="vault-section-subtitle">לחץ על קופסה לפרטים מלאים, או לחץ על "העתק Prompt" לשימוש מיידי</p>

          <div className="vault-filter-controls">
            <div className="vault-search-wrapper">
              <input 
                type="text" 
                placeholder="חפש פרומפט או כלי..." 
                className="vault-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-60">🔍</span>
            </div>
            <div className="vault-category-filters">
              {categories.map(cat => (
                <button 
                  key={cat}
                  className={`vault-filter-chip ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat === 'all' ? 'הכל' : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="vault-skills-container">
            {Object.keys(filteredGroups).map((cat, index) => {
              const items = filteredGroups[cat];
              const isGroupOpen = (activeCategory !== 'all') || (searchQuery.length > 0) || (index === 0 && openSections.size === 0) || openSections.has(cat);
              
              return (
                <section key={cat} className="vault-category-section">
                  <button 
                    className="vault-category-header" 
                    onClick={() => toggleSection(cat)}
                  >
                    <div className="vault-category-title">
                      <span>{CATEGORY_ICONS[cat] || '✨'}</span>
                      <span>{cat}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="vault-card-badge">{items.length}</span>
                      <span className={`transition-transform duration-300 ${isGroupOpen ? 'rotate-180' : ''}`}>▼</span>
                    </div>
                  </button>
                  {isGroupOpen && (
                    <div className="vault-category-content">
                      {items.map(item => (
                        <article 
                          key={item.id} 
                          className="vault-card"
                          onClick={() => setSelectedPrompt(item)}
                        >
                          <div className="text-3xl mb-2">{CATEGORY_ICONS[cat] || '✨'}</div>
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

      {/* Modal */}
      {selectedPrompt && (
        <div className="vault-modal-overlay" onClick={() => setSelectedPrompt(null)}>
          <div className="vault-modal-box" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="vault-card-title text-xl">{selectedPrompt.title}</h3>
              <button 
                className="text-gray-400 hover:text-white text-2xl"
                onClick={() => setSelectedPrompt(null)}
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-gray-300 mb-4 text-right">העתק את ה-Prompt הבא והדבק בכל כלי AI:</p>
            <div className="bg-black/30 border border-teal-900/50 rounded-lg p-6 mb-6 text-right dir-rtl">
              <p className="whitespace-pre-wrap leading-relaxed text-gray-100">{selectedPrompt.prompt}</p>
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

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-teal-500/20 border border-teal-500 text-teal-400 px-8 py-3 rounded-full font-bold shadow-2xl z-[300] animate-bounce">
          ✅ הועתק ללוח
        </div>
      )}
    </div>
  );
}
