"use client";

import { useState } from "react";
import { 
  PlayCircle, 
  FileText, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  Sparkles, 
  CheckCircle2,
  Filter
} from "lucide-react";

export interface CourseModule {
  num: string;
  part: string;
  partNum: number;
  titleHe: string;
  titleEn: string;
  description: string;
  level: "מתחיל" | "בינוני" | "מתקדם" | "כל הרמות";
  duration: string;
  tools: string[];
}

export const allCourseModules: CourseModule[] = [
  // Part 0 - מבוא
  {
    num: "00",
    part: "חלק 0 — מבוא",
    partNum: 0,
    titleHe: "ברוכים הבאים — מה זה Claude?",
    titleEn: "Welcome & What is Claude?",
    description: "מה זה Claude ולמה הוא שונה מ-ChatGPT? מה מחכה לך בקורס הזה וסיור ראשון בממשק — הכל בלי ג׳רגון טכני.",
    level: "מתחיל",
    duration: "15–20 דק׳",
    tools: ["Claude App"]
  },
  {
    num: "01",
    part: "חלק 0 — מבוא",
    partNum: 0,
    titleHe: "שלושת המודלים של Claude",
    titleEn: "Choosing the Right Model",
    description: "Haiku לשגרה, Sonnet ל-80% מהצרכים, Opus לניתוח עמוק. איך לבחור נכון לכל משימה פיננסית.",
    level: "מתחיל",
    duration: "20–25 דק׳",
    tools: ["Claude App", "Opus"]
  },
  // Part 1 - הבסיס
  {
    num: "02",
    part: "חלק 1 — הבסיס",
    partNum: 1,
    titleHe: "השיחה הפיננסית הראשונה שלך",
    titleEn: "Your First Finance Conversation",
    description: "איך לפתוח שיחה עם Claude ולקבל תשובה שימושית מהפעם הראשונה — עם דוגמאות מ-P&L, Variance ו-Budget.",
    level: "מתחיל",
    duration: "20–25 דק׳",
    tools: ["Claude App"]
  },
  {
    num: "03",
    part: "חלק 1 — הבסיס",
    partNum: 1,
    titleHe: "מסגרת PRICE לכל Prompt",
    titleEn: "The PRICE Framework",
    description: "5 שלבים שהופכים כל שאלה רפויה לבקשה מדויקת: Problem · Relevant Context · Instructions · Constraints · Examples.",
    level: "מתחיל",
    duration: "30–40 דק׳",
    tools: ["Claude App"]
  },
  // Part 2 - הפיצ׳רים
  {
    num: "04",
    part: "חלק 2 — הפיצ׳רים",
    partNum: 2,
    titleHe: "Artifacts — הקנבס של Claude",
    titleEn: "Creating Live Finance Artifacts",
    description: "דשבורדים, מחשבונים ודוחות אינטראקטיביים שנפתחים בדפדפן — CFO KPI Dashboard, Board Pack ו-HTML Variance Report.",
    level: "בינוני",
    duration: "35–45 דק׳",
    tools: ["Artifacts", "Claude App"]
  },
  {
    num: "05",
    part: "חלק 2 — הפיצ׳רים",
    partNum: 2,
    titleHe: "Skills — הזיכרון המוסדי שלך",
    titleEn: "Reusable Finance Skills",
    description: "קידוד מתודולוגיית הצוות פעם אחת — Variance Commentary, FP&A MBR, Board Deck — ושחזורה בכל שיחה.",
    level: "בינוני",
    duration: "30–40 דק׳",
    tools: ["Skills", "Claude App"]
  },
  {
    num: "06",
    part: "חלק 2 — הפיצ׳רים",
    partNum: 2,
    titleHe: "Projects — סביבת עבודה עם זיכרון",
    titleEn: "AI Finance Workspaces",
    description: "Claude Project שזוכר את החברה, המודל העסקי, ה-KPIs וה-Budget — לתקציב שנתי, סגירת חודש ודירקטוריון.",
    level: "בינוני",
    duration: "30–40 דק׳",
    tools: ["Projects", "Claude App"]
  },
  {
    num: "07",
    part: "חלק 2 — הפיצ׳רים",
    partNum: 2,
    titleHe: "Connectors — Claude מחובר",
    titleEn: "Connecting Claude to Live Data",
    description: "חיבור Claude ל-Google Drive, Notion ו-SharePoint — ניתוח Board Pack ישירות מ-Drive ללא העלאה ידנית.",
    level: "בינוני",
    duration: "25–35 דק׳",
    tools: ["Connectors", "Google Drive"]
  },
  // Part 3 - כלים
  {
    num: "08",
    part: "חלק 3 — כלים",
    partNum: 3,
    titleHe: "Claude ב-Excel",
    titleEn: "Claude Inside Excel",
    description: "Commentary אוטומטי על סטיות, ניקוי Trial Balance, Management P&L ו-Scenario Analysis ישירות מהגיליון.",
    level: "בינוני",
    duration: "40–50 דק׳",
    tools: ["Claude Excel"]
  },
  {
    num: "09",
    part: "חלק 3 — כלים",
    partNum: 3,
    titleHe: "Claude ב-PowerPoint",
    titleEn: "Board Presentations with Claude",
    description: "מספרים גולמיים הופכים למצגת דירקטוריון מלוטשת תוך דקות. Insight-Led Titles, Speaker Notes ו-8-Slide Board Pack.",
    level: "בינוני",
    duration: "35–45 דק׳",
    tools: ["Claude PPT"]
  },
  {
    num: "10",
    part: "חלק 3 — כלים",
    partNum: 3,
    titleHe: "Claude Design & Cowork",
    titleEn: "Visual Intelligence & Desktop",
    description: "Revenue Bridge Waterfall, גרפים מוכנים לדירקטוריון וניתוח Cross-File מבלי לצאת מהמסמכים שלך.",
    level: "בינוני",
    duration: "35–45 דק׳",
    tools: ["Design", "Cowork"]
  },
  // Part 4 - מתקדם
  {
    num: "11",
    part: "חלק 4 — מתקדם",
    partNum: 4,
    titleHe: "10 עקרונות לשליפת המקסימום",
    titleEn: "10 Principles for Advanced Prompting",
    description: "Effort Level, Specificity, XML Tags, Examples, Reasoning, Rich Context, Constraints, Mega Prompt — המפריד בין תשובה טובה למדהימה.",
    level: "מתקדם",
    duration: "60–75 דק׳",
    tools: ["Claude App", "Opus"]
  },
  {
    num: "12",
    part: "חלק 4 — מתקדם",
    partNum: 4,
    titleHe: "102 Use Cases — ספריית הפיננסים",
    titleEn: "102 Finance Use Cases Library",
    description: "22 קטגוריות, 102 Prompts מוכנים — מ-Variance Commentary ועד GL Reconciliation, FX Analysis ו-Data Pipelines.",
    level: "מתקדם",
    duration: "45–60 דק׳",
    tools: ["Claude App", "Excel", "Artifacts"]
  },
  // Part 5 - פרויקטים
  {
    num: "13",
    part: "חלק 5 — פרויקטים",
    partNum: 5,
    titleHe: "סגירת חודש עם Claude",
    titleEn: "Month-End Close: Full Workflow",
    description: "6 שלבים מ-Actuals ועד Commentary לדירקטוריון: Variance חישוב → Commentary → Dashboard HTML → CFO Narrative → Board Pack.",
    level: "מתקדם",
    duration: "60–90 דק׳",
    tools: ["Artifacts", "Excel", "Skills"]
  },
  {
    num: "14",
    part: "חלק 5 — פרויקטים",
    partNum: 5,
    titleHe: "דשבורד CFO — Capstone Project",
    titleEn: "CFO Dashboard: The Capstone",
    description: "6 KPI Cards עם RAG · EBITDA Bridge · Revenue Trend 8Q · Auto CFO Commentary · Toggle Board/Management בשיחה אחת.",
    level: "מתקדם",
    duration: "75–90 דק׳",
    tools: ["Artifacts", "Projects"]
  },
  // Bonus
  {
    num: "15",
    part: "בונוס — Skills מוכנות",
    partNum: 6,
    titleHe: "Skills מוכנות — מוריד ומשתמש",
    titleEn: "Ready-to-Use Finance Skills",
    description: "FP&A Commentary, Board Deck, ERP Data Cleaner, McKinsey Slides — 4 Skills מוכנות להתקנה מיידית ללא בנייה מאפס.",
    level: "כל הרמות",
    duration: "20–30 דק׳",
    tools: ["Skills", "Cowork"]
  }
];

const categoryFilters = [
  { id: "all", label: "כל התוכנית (16 מודולים)" },
  { id: "core", label: "מודולי היסוד (00–03)" },
  { id: "features", label: "פיצ'רים וכלים (04–10)" },
  { id: "advanced", label: "מתקדם וסגירת חודש (11–15)" },
];

export function CourseCurriculum() {
  const [showAll, setShowAll] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredModules = allCourseModules.filter(mod => {
    if (selectedCategory === "core") return mod.partNum <= 1;
    if (selectedCategory === "features") return mod.partNum >= 2 && mod.partNum <= 3;
    if (selectedCategory === "advanced") return mod.partNum >= 4;
    return true;
  });

  // If in "all" view and not expanded, show only 6 cards
  const displayedModules = (selectedCategory === "all" && !showAll) 
    ? filteredModules.slice(0, 6) 
    : filteredModules;

  const getLevelBadgeClass = (level: CourseModule["level"]) => {
    switch (level) {
      case "מתחיל": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "בינוני": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "מתקדם": return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      default: return "bg-teal-500/10 text-teal-400 border-teal-500/20";
    }
  };

  return (
    <div id="curriculum" className="mb-32">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium bg-royal-500/10 text-royal-400 border-royal-500/20 mb-4">
          <Layers className="w-4 h-4" />
          <span>סילבוס מקיף · 16 מודולים מעשיים</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70">
          תוכנית ההכשרה המלאה
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-text-secondary">
          מהצעד הראשון ועד בניית דשבורדים חיים לדירקטוריון, סגירת חודש מלאה ו-102 Use Cases פיננסיים.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categoryFilters.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                if (cat.id !== "all") setShowAll(true);
              }}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-teal-500/20 to-royal-500/20 border border-teal-400/40 text-white shadow-lg shadow-teal-500/10"
                  : "bg-white/5 border border-white/10 text-text-muted hover:text-white hover:bg-white/10"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayedModules.map((item) => (
          <div
            key={item.num}
            className="group relative flex flex-col justify-between p-7 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 hover:border-royal-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-500/5"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono font-bold text-xs tracking-wider text-royal-400 bg-royal-500/10 border border-royal-500/20 px-2.5 py-1 rounded-lg">
                  MODULE {item.num}
                </span>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getLevelBadgeClass(item.level)}`}>
                  {item.level}
                </span>
              </div>

              <div className="text-xs text-text-muted font-mono mb-1">{item.part}</div>
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-royal-300 transition-colors">
                {item.titleHe}
              </h3>
              <div className="text-xs text-text-muted font-mono mb-4 text-left" dir="ltr">
                {item.titleEn}
              </div>

              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                {item.description}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
              <div className="flex items-center gap-1.5 text-xs text-text-muted">
                <Clock className="w-3.5 h-3.5 text-teal-400" />
                <span>{item.duration}</span>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                {item.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono font-semibold bg-space-900 border border-white/10 px-2 py-0.5 rounded text-teal-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show All / Collapse Toggle Button */}
      {selectedCategory === "all" && (
        <div className="mt-12 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-base transition-all bg-gradient-to-r from-royal-500/20 to-teal-500/20 border border-white/15 hover:border-teal-400/50 hover:bg-white/10 text-white shadow-xl hover:scale-105 active:scale-95"
          >
            {showAll ? (
              <>
                <span>הצג רק 6 מודולים מובילים</span>
                <ChevronUp className="w-5 h-5 text-teal-400" />
              </>
            ) : (
              <>
                <span>צפה בכל 16 המודולים (10 נוספים)</span>
                <ChevronDown className="w-5 h-5 text-teal-400" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
