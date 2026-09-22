"use client";

import React, { useState } from "react";
import { Copy, Check, Sparkles, Table2, Flame, ArrowLeft } from "lucide-react";

interface QuickWin {
  id: string;
  num: number;
  category: string;
  title: string;
  desc: string;
  prompt: string;
  sampleOutput: string;
}

const QUICK_WINS: QuickWin[] = [
  {
    id: "qw-variance",
    num: 1,
    category: "ניתוח פיננסי",
    title: "ניסוח commentary לחריגות P&L מול תקציב",
    desc: "מייצר טבלה מסודרת לדירקטוריון עם הסבר שורש (Root Cause) וסיווג החריגה (עיתוי מול קבוע).",
    prompt: `You are an FP&A analyst writing variance commentary for our CFO's monthly board deck.

For each P&L line item with a variance greater than 5% or $10K vs budget, write:
- Dollar and % variance (favorable/unfavorable)
- Likely root cause in 1-2 sentences
- Whether this is a timing issue, structural change, or one-time item
- An action note if the variance is unfavorable

Format as a table: Line Item | Variance $ | Variance % | F/U | Root Cause | Classification | Action Required

[Paste your actuals vs budget P&L here]`,
    sampleOutput: `| Line Item | Variance $ | Variance % | F/U | Root Cause | Classification | Action Required |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Sales Marketing** | -$45,000 | -18.2% | U | הקדמת קמפיין השקה רבעוני לחודש מרץ לצורך חדירה לשוק EMEA. | Timing Issue | מעקב הוצאות Q2 לוודא קיזוז מול התקציב המקורי. |
| **Cloud Hosting** | -$12,500 | -8.5% | U | גידול בלתי צפוי בתעבורת משתמשים בעקבות פיצ'ר ה-AI החדש. | Structural Change | הפעלת תוכנית התייעלות מול AWS / Reserved Instances. |
| **Travel & Ent.** | +$8,200 | +14.0% | F | מעבר פגישות מכירה לאונליין וצמצום טיסות הנהלה. | Structural Change | עדכון תחזית (Reforecast) לחסכון שנתי של $35K. |`,
  },
  {
    id: "qw-board-pack",
    num: 2,
    category: "דיווח ותקשורת",
    title: "סיכום Board Pack של 50 עמודים לעמוד CFO אחד",
    desc: "מתמצת חוברת דירקטוריון עמוסה ל-5 נקודות ליבה ברורות ברמת מנכ\"ל ומשקיעים.",
    prompt: `You are an experienced CFO preparing a one-page executive brief from this board pack.

Create a structured summary with these sections:
1. Headline Performance (3 bullet points: revenue, EBITDA, cash)
2. Top 3 Positive Developments
3. Top 3 Risks or Concerns
4. Key Decisions Required from the Board
5. Forward-Looking Outlook (2-3 sentences)

Use crisp, board-ready language. Avoid jargon. Flag any numbers that need verification.

[Paste or attach your board pack here]`,
    sampleOutput: `**Executive Brief for Board of Directors — Q1 Performance**

1. **Headline Performance:**
   • Revenue: $4.8M (+12% YoY, 98% to Budget)
   • Adj. EBITDA: $850K (17.7% Margin vs. 15.0% Target)
   • Cash Runway: 18.5 months ($6.2M balance, zero debt drawn)

2. **Top 3 Positive Developments:**
   • קיצור זמן גבייה (DSO) מ-68 ל-52 ימים בעקבות אוטומציית חיובים.
   • חדירה מהירה לשוק ארה"ב (42% מסך ה-ARR החדש).
   • שיפור Gross Margin ב-240 bps ל-74.2%.

3. **Top 3 Risks / Concerns:**
   • עיכוב בחידוש חוזה מול לקוח Tier-1 (מהווה 6% מההכנסות).
   • אינפלציית שכר במחלקת R&D.
   • חשיפת מט"ח מול התחזקות הדולר.

4. **Decisions Required from the Board:**
   • אישור תוכנית CapEx מעודכנת בסך $350K להרחבת שרתים.`,
  },
  {
    id: "qw-excel-cleanup",
    num: 31,
    category: "Excel וניקוי",
    title: "נוסחת על לניקוי תווים וריווחים כפולים באקסל",
    desc: "מתקן שמות לקוחות, מק\"טים ומספרי חשבוניות מבולגנים שהגיעו מיצוא ה-ERP.",
    prompt: `You are an Excel and Power Query specialist.
Generate a dynamic Excel formula / Lambda function to clean messy raw text strings from ERP exports:
1. Remove all non-printable characters (CHAR(1-31), CHAR(127))
2. Replace multiple internal spaces with a single space
3. Trim leading and trailing whitespace
4. Convert Hebrew/English mixed text into standard UTF-8 readable format
5. Provide both the modern Excel (LET / LAMBDA) formula and the classic Excel formula.

[Paste example messy rows here]`,
    sampleOutput: `=LET(
  raw_cell, A2,
  clean_text, CLEAN(raw_cell),
  no_nbsp, SUBSTITUTE(clean_text, CHAR(160), " "),
  trimmed, TRIM(no_nbsp),
  trimmed
)

// הסבר: נוסחה זו מסירה תווי שבירה נסתרים (CHAR 160 הנפוץ ביצוא SAP/Priority), מבטלת רווחים כפולים ומחזירה ערך נקי מוכן ל-VLOOKUP/XLOOKUP.`,
  },
];

export function VaultQuickWins({
  onCopy,
  copiedId,
}: {
  onCopy: (text: string, id: string) => void;
  copiedId: string | null;
}) {
  const [activeTab, setActiveTab] = useState<Record<string, "prompt" | "sample">>({
    "qw-variance": "prompt",
    "qw-board-pack": "prompt",
    "qw-excel-cleanup": "prompt",
  });

  const toggleTab = (id: string, tab: "prompt" | "sample") => {
    setActiveTab((prev) => ({ ...prev, [id]: tab }));
  };

  return (
    <section className="mb-16" dir="rtl">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          <Flame className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            התחל כאן — 3 פרומפטים מובילים לשימוש מיידי
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            העתק את הפרומפט והדבק ב-ChatGPT, Claude או Excel לקבלת תוצאה תוך שניות
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {QUICK_WINS.map((item) => {
          const currentTab = activeTab[item.id] || "prompt";
          const isCopied = copiedId === item.id;

          return (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-slate-900/90 to-space-950 p-5 sm:p-6 shadow-xl backdrop-blur-xl hover:border-cyan-400/50 transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="rounded-md border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-0.5 font-mono text-[11px] font-bold text-emerald-300">
                    חינם לשימוש
                  </span>
                  <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-semibold text-slate-300">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  {item.desc}
                </p>

                {/* Tab Switcher: Prompt vs Output */}
                <div className="flex rounded-xl border border-white/10 bg-slate-950/80 p-1 mb-3 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => toggleTab(item.id, "prompt")}
                    className={`flex-1 py-1.5 text-center rounded-lg transition-all ${
                      currentTab === "prompt"
                        ? "bg-cyan-500/20 text-cyan-300 shadow-sm font-bold border border-cyan-500/30"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    פרומפט להעתקה
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleTab(item.id, "sample")}
                    className={`flex-1 py-1.5 text-center rounded-lg transition-all ${
                      currentTab === "sample"
                        ? "bg-cyan-500/20 text-cyan-300 shadow-sm font-bold border border-cyan-500/30"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    דוגמת פלט מה-AI
                  </button>
                </div>

                {/* Display Box */}
                <div className="rounded-xl border border-white/10 bg-slate-950/90 p-3.5 mb-4 font-mono text-xs text-slate-200 max-h-[220px] overflow-y-auto dir-ltr text-left leading-relaxed shadow-inner">
                  {currentTab === "prompt" ? (
                    <pre className="whitespace-pre-wrap font-mono text-xs text-cyan-100">
                      {item.prompt}
                    </pre>
                  ) : (
                    <pre className="whitespace-pre-wrap font-sans text-xs text-emerald-300 dir-rtl text-right">
                      {item.sampleOutput}
                    </pre>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onCopy(item.prompt, item.id)}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-300 px-4 py-2.5 text-xs font-black text-slate-950 hover:opacity-95 transition-all shadow-md shadow-cyan-500/20"
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4 text-slate-950" />
                    <span>הועתק ללוח!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>העתק פרומפט עכשיו</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
