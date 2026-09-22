"use client";

import { useState } from "react";
import { Download, Sparkles, Copy, Check, ShieldAlert, ArrowLeft, Terminal, FileSpreadsheet, CheckCircle2 } from "lucide-react";

// ---------------------------------------------------------------------------
// Prompt data
// ---------------------------------------------------------------------------

const CLEANING_PROMPTS = [
  {
    id: "quick-clean",
    label: "ניקוי מהיר עם Claude",
    badge: "Claude.ai · 5 דקות",
    description: "העלה את הקובץ ישירות ל-Claude והדבק פרומפט אחד. Claude יבחן כל לשונית ויחזיר קובץ נקי עם יומן ניקוי.",
    prompt: `I have attached a multi-tab FP&A revenue file. Please clean it and return a clean .xlsx file. Specifically:

1. STRUCTURE: Find where each tab's actual data table begins (headers may not be at row 1). Remove all metadata comments, blank rows, and stray notes above and below the data table.

2. HEADERS: Standardise column headers across all tabs to snake_case. Map regional variants (H1/H2 → q1_actual+q2_actual through q4_actual, Jan-Mar → q1_actual, etc.).

3. DUPLICATES: Identify and remove exact or near-duplicate rows (e.g. same rep name with whitespace differences). Flag which rows were removed in a "Cleaning Log" sheet.

4. NULLS & TEXT IN NUMBER FIELDS: Replace 'N/A', 'PENDING', 'TBD', 'est. XXXX', and blanks in numeric columns with empty cells (not zero). Leave a flag column "data_flag" noting which cells were affected.

5. CURRENCIES: Add a "currency" column to each tab based on the country/region. Do not convert values — just label them so downstream tools know what they are.

6. CANCELLED / ZERO ROWS: Flag rows where all quarterly actuals are zero with a "status" column value of "cancelled_or_inactive".

7. STRAY DATA: Remove any rows below the main data table (old years, reference data, etc.) into a separate "Archive" sheet.

8. OUTPUT: Return a clean .xlsx with one sheet per region (same names) plus a "Cleaning_Log" sheet listing every change made, the original value, the new value, and the reason.

Please confirm your findings on each tab before writing the file.`,
    tip: 'השורה האחרונה — "confirm your findings before writing the file" — מכריחה את Claude לתאר מה הוא מצא לפני שהוא פועל, נותנת לך הזדמנות לתקן אם לשונית פורשה בצורה שגויה.',
  },
  {
    id: "artifact-builder",
    label: "Claude Artifact לשימוש חוזר",
    badge: "Claude.ai · בנה פעם, הרץ כל חודש",
    description: "בקש מ-Claude לבנות אפליקציית ניקוי בשיחה שמורה. כל חודש — העלה את הקובץ החדש, הורד את הגרסה הנקייה.",
    prompt: `Please build me a React artifact that acts as a reusable FP&A data cleaning tool. It should work like this:

INTERFACE:
- A clean upload area where I can drag-and-drop or select an .xlsx file
- A "Clean File" button that triggers the cleaning process
- A progress/status display showing what's being cleaned
- A "Download Clean File" button once processing is complete
- A collapsible "Cleaning Log" section showing all changes made

CLEANING RULES (apply to every file uploaded):
1. Auto-detect where data tables start on each sheet (skip rows until a row with 5+ non-empty cells is found — that's the header row)
2. Standardise all column headers to snake_case, mapping common FP&A variants: H1/H2 Actual → q1_actual+q2_actual / q3_actual+q4_actual, Jan-Mar/Apr-Jun/Jul-Sep/Oct-Dec → q1-q4, "($000s)" suffix removal
3. Strip leading/trailing whitespace from all text cells
4. Remove exact duplicate rows (same values across all columns after trim)
5. In numeric columns: replace "N/A", "n/a", "TBD", "PENDING", "CHECK", "ERR", "est." patterns with null; preserve actual numbers
6. Add column "currency_flag" populated from a country→currency lookup (USD default; GBP for UK rows, EUR for EMEA, CAD for Canada, etc.)
7. Add column "row_status": "active" if any quarterly actual > 0, "inactive_zero" if all actuals = 0, "incomplete" if any actual is null
8. Move any rows found below a '—' separator or below a row containing "reference", "2023", "ignore" (case-insensitive) into a separate sheet called "Archived_Rows"
9. Produce a "Cleaning_Log" sheet with columns: sheet, row_number, column, original_value, cleaned_value, reason

TECHNICAL:
- Use SheetJS (xlsx library from CDN) for reading and writing Excel files
- Process entirely in the browser — no data leaves the page
- Output a .xlsx file with the same sheet names as input, plus Cleaning_Log and (if applicable) Archived_Rows sheets

Make it look professional. Use a minimal, clean aesthetic.`,
    tip: "שמור/סמן את השיחה — כל חודש, חזור לשיחה זו, העלה את הקובץ החדש, לחץ Clean. הכללים כבר שם.",
  },
  {
    id: "python-colab",
    label: "Python + Google Colab",
    badge: "כלים חינמיים בלבד · כל AI",
    description: "השתמש בכל AI חינמי (ChatGPT, Gemini, Copilot) כדי לייצר קוד Python, ואז הרץ אותו ב-Google Colab — ללא התקנה.",
    prompt: `Write me Python code for Google Colab that cleans a messy FP&A Excel file. The file has these characteristics:
- Multiple sheets (one per region: NA, EMEA, APAC, LATAM)
- Each sheet has 4-6 rows of metadata/comments at the top before the actual data table
- Headers may be in inconsistent case and format (e.g. "q3 ($000s)", "H1 Actual", "Jan-Mar")
- Some cells contain text like "N/A", "PENDING", "TBD", "est. 1150" in numeric columns
- There are duplicate rows (some with whitespace differences in text fields)
- Stray data rows may appear below the main table
- Some rows have all-zero actuals (cancelled contracts)

Please write Colab-ready Python code using pandas and openpyxl that:
1. Reads all sheets from an uploaded .xlsx file (use google.colab files.upload())
2. For each sheet: auto-detects the header row (first row with 5+ non-empty cells), reads data from that row onwards, strips whitespace from all text cells, standardises column headers to snake_case
3. In numeric columns: replaces "N/A", "PENDING", "TBD", "CHECK", and strings matching "est." with NaN
4. Removes exact duplicate rows
5. Adds a "row_status" column: "active" (all quarterly cols > 0 or null), or "incomplete" (any quarterly col is null)
6. Saves the result to a new .xlsx file with a "Cleaning_Log" sheet and triggers a download

Include clear comments in the code explaining each step. Make the code robust to sheet naming variations.`,
    tip: "כדי לעשות אותו לשימוש חוזר: שמור את ה-Notebook ל-Google Drive. כל חודש, פתח את אותו Notebook, העלה את הקובץ החדש, הרץ.",
  },
];

const AUDIT_PROMPTS = [
  {
    id: "audit-1",
    number: 1,
    label: "שלמות מבנית",
    badge: "הרץ ראשון",
    description: "מאשר שורות, עמודות, ושמות לשוניות כצפוי. הבסיס לכל ביקורת — הרץ אותו קודם.",
    prompt: `I am attaching two Excel files: the original messy FP&A file and the cleaned version. Please perform a structural audit:

1. ROW COUNTS: For each sheet, compare the number of data rows in the original vs the cleaned file. List the difference and explain what was removed (duplicates, stray data, blank rows, archived rows).

2. COLUMN COUNTS: For each sheet, list columns that were added, removed, or renamed between the two files. Flag any column in the original that has no equivalent in the cleaned file.

3. HEADER ROW DETECTION: Confirm the cleaned file's headers start at row 1 on every sheet. Flag any sheet where headers are not in row 1.

4. SHEET INVENTORY: List all sheet names in both files. Confirm expected sheets are present in the cleaned file (one per region + Cleaning_Log). Note any unexpected sheets.

Present your findings as a structured comparison table for each sheet.`,
  },
  {
    id: "audit-2",
    number: 2,
    label: "פיוס כספי",
    badge: "חשוב ביותר",
    description: "מפייס הכנסות לפני ואחרי ניקוי. תופס מספרים שאבדו בטעות.",
    prompt: `I am attaching the original messy FP&A file and the cleaned version. Please run a financial integrity audit:

1. TOTAL REVENUE RECONCILIATION: For each sheet, sum all quarterly actual columns (Q1–Q4 or equivalent) in both files. Show the original total, the cleaned total, the difference, and explain what drove the change (e.g. removed duplicates, nulled-out text values).

2. NULL INTRODUCTION CHECK: Identify any cells that contained a real number in the original but are now null or blank in the cleaned file. This should only happen when the original had text like "N/A" or "PENDING" — flag any case where an actual number was lost.

3. ZERO-ROW REVIEW: List all rows flagged as "inactive_zero" or "cancelled_or_inactive" in the cleaned file. Confirm these rows genuinely had all-zero actuals in the original — not that they were zeroed out during cleaning.`,
  },
  {
    id: "audit-3",
    number: 3,
    label: "בדיקת יומן הניקוי",
    badge: "שביל ביקורת",
    description: "מאמת את שביל הביקורת עצמו. מבטיח שכל שינוי מתועד.",
    prompt: `I am attaching both Excel files. Please validate the Cleaning_Log sheet:

1. COMPLETENESS: Does every change visible in a row-by-row comparison appear in the Cleaning_Log? List any changes you can detect in the data that are not documented in the log.

2. FORMAT CHECK: Confirm the log has columns: sheet, row_number, column, original_value, cleaned_value, reason. Flag any missing columns or rows with blank reason fields.

3. REVERSIBILITY TEST: For 5 random entries in the Cleaning_Log, verify that applying the original_value back to the specified location in the cleaned file would restore it correctly.`,
  },
  {
    id: "audit-4",
    number: 4,
    label: "אימות מטבע",
    badge: "לפני מודל FX",
    description: "מאמת את הקצאת המטבע של כל שורה לפני שהקובץ נכנס לכל מודל המרת FX.",
    prompt: `I am attaching both files. Please validate the currency_flag column in the cleaned file:

1. COVERAGE: Confirm every row in every sheet has a non-null currency_flag value.

2. LOGIC CHECK: For each region, list the distinct currency values assigned. Flag any row where the currency assignment seems inconsistent with the country or region column.

3. COMPARISON TO ORIGINAL: Check whether the original file contained any explicit currency indicators (e.g. column headers, comments, cell values with "$" or "GBP"). Where found, confirm the cleaned file's currency_flag matches.`,
  },
  {
    id: "audit-5",
    number: 5,
    label: "סיכום מוכן ל-CFO",
    badge: "שלב אחרון",
    description: "מפיק סיכום ביקורת חד-עמודי בשפה ברורה — צרף אותו לקובץ הנקי לפני שיתוף עם ההנהלה.",
    prompt: `I am attaching the original messy FP&A file and the cleaned version. Please produce a one-page CFO-ready audit summary I can attach to the clean file when I share it:

FORMAT THE OUTPUT AS FOLLOWS:

CLEANING SUMMARY — FY202x Revenue File
Prepared: [today's date]
Files compared: [original filename] → [cleaned filename]

WHAT CHANGED
· Sheets processed: [list]
· Total rows in original: [n]
· Total rows in cleaned file: [n] ([+/-n] net change)
· Rows removed (duplicates): [n]
· Rows archived (stray/historical): [n]
· Columns standardised: [list key renames]
· Columns added: currency_flag, row_status, data_flag
· Cells nulled (text-in-numerics): [n] cells across [n] rows

FINANCIAL IMPACT OF CLEANING
· Revenue removed with duplicate rows: $[amount]k
· Revenue in rows marked inactive_zero: $[amount]k
· Revenue in rows with incomplete data: $[amount]k
· Net revenue in clean active rows: $[amount]k

ITEMS REQUIRING HUMAN REVIEW
[List any rows or values that could not be automatically resolved and need a finance team member to make a judgment call]

DATA QUALITY RATING
[Assign one of: Clean — ready for use / Amber — usable with noted caveats / Requires re-review]

Keep the language concise and factual. This will be read by a CFO who was not involved in the cleaning process.`,
  },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 rounded-lg border border-cyan-400/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-bold text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all shadow-sm"
      title="העתק פרומפט"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-emerald-400 font-bold">הועתק ללוח</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          <span>העתק פרומפט</span>
        </>
      )}
    </button>
  );
}

function PromptBlock({ prompt, tip }: { prompt: string; tip?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-4 sm:p-5 mt-3 shadow-inner">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
        <span className="font-mono text-xs font-bold text-cyan-400">📋 קוד הפרומפט להעתקה</span>
        <CopyButton text={prompt} />
      </div>
      <pre className="font-mono text-xs sm:text-sm text-slate-100 whitespace-pre-wrap leading-relaxed dir-ltr text-left overflow-x-auto max-h-[320px]">
        {prompt}
      </pre>
      {tip && (
        <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-3.5 text-xs text-cyan-200 font-medium">
          <span className="text-base leading-none">💡</span>
          <span className="leading-relaxed">{tip}</span>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

type Tab = "home" | "methods" | "audit" | "quickstart";

export default function DataCleaningModule() {
  const [activeTab, setActiveTab] = useState<Tab>("home");

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "home", label: "מבוא וסקירה", icon: "🏠" },
    { id: "quickstart", label: "התחלה מהירה", icon: "⚡" },
    { id: "methods", label: "3 שיטות ניקוי", icon: "🧹" },
    { id: "audit", label: "5 פרומפטי ביקורת CFO", icon: "🔍" },
  ];

  return (
    <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-b from-slate-900/90 via-space-950 to-slate-950 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl shadow-black/50" dir="rtl">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Workflow Studio
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3">
          🧹 אמנות <span className="bg-gradient-to-l from-cyan-400 via-teal-300 to-cyan-200 bg-clip-text text-transparent">הנתונים הנקיים</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          מדריך מעשי לניקוי נתוני FP&A וסגירת חודש בעזרת AI — שלוש שיטות ניקוי מקצועיות + חמישה פרומפטי ביקורת ברמת CFO.
        </p>

        {/* Demo Excel Download Card */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-cyan-500/30 bg-cyan-950/30 p-4 text-right">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shrink-0">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">קובץ PnL לדוגמה לתרגול מעשי</div>
              <div className="text-xs text-slate-400">גיליון הכנסות רב-אזורי (ישראל, אירופה, אסיה) עם נתונים מבולגנים לניקוי</div>
            </div>
          </div>
          <a
            href="/downloads/pnl-demo.xlsx"
            download="pnl-demo.xlsx"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 px-5 py-2.5 text-xs sm:text-sm font-black text-slate-950 hover:opacity-95 transition-all shadow-md shadow-cyan-500/20"
          >
            <Download className="w-4 h-4" />
            <span>הורד קובץ תרגול (.xlsx)</span>
          </a>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-8 border-b border-white/10 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all ${
              activeTab === tab.id
                ? "border border-cyan-400/50 bg-cyan-500/20 text-cyan-300 shadow-sm"
                : "border border-white/5 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {/* HOME TAB */}
        {activeTab === "home" && (
          <div className="space-y-6">
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed text-right bg-slate-900/60 p-5 rounded-2xl border border-white/10">
              לכל צוות כספים יש את הקובץ הזה: הערות מעל הכותרות, מטבעות מעורבים בין לשוניות, שורות נציגים כפולות, ונתוני שנים קודמות שקבורים מתחת לטבלה. המודול הזה מעניק לך 3 שיטות מוכחות לנקות את הקובץ עם AI תוך דקות — ו-5 פרומפטי ביקורת שיבטיחו אפס טעויות מול הדירקטוריון.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  num: "01",
                  icon: "⚡",
                  title: "ניקוי מהיר עם Claude",
                  desc: "פרומפט אחד, קובץ אחד. Claude יבחן כל לשונית ויחזיר קובץ נקי עם יומן ניקוי מלא.",
                  tags: ["Claude.ai", "5 דקות", "ללא התקנה"],
                  tab: "methods" as Tab,
                },
                {
                  num: "02",
                  icon: "🔄",
                  title: "Claude Artifact לשימוש חוזר",
                  desc: "בנה פעם אחת, הרץ כל חודש. אפליקציית ניקוי אינטראקטיבית שחיה בשיחה שמורה.",
                  tags: ["Claude.ai", "תהליך חודשי", "רץ בדפדפן"],
                  tab: "methods" as Tab,
                },
                {
                  num: "03",
                  icon: "🐍",
                  title: "Python & Google Colab",
                  desc: "ללא מנוי Claude. השתמש בכל AI חינמי לייצר קוד Python והרץ ישירות ב-Colab.",
                  tags: ["כלים חינמיים", "Google Colab", "כל AI"],
                  tab: "methods" as Tab,
                },
                {
                  num: "04",
                  icon: "🔍",
                  title: "ביקורת התוצאות כמו CFO",
                  desc: "חמישה פרומפטי ביקורת לאימות מה ה-AI ניקה — פיוס כספי, שלמות מבנית וסיכום מנהלים.",
                  tags: ["פיוס כספי", "יומן ניקוי", "סיכום CFO"],
                  tab: "audit" as Tab,
                },
              ].map((card) => (
                <button
                  key={card.num}
                  onClick={() => setActiveTab(card.tab)}
                  className="flex flex-col justify-between text-right rounded-2xl border border-white/10 bg-slate-900/60 p-5 hover:border-cyan-400/50 hover:bg-slate-900/90 hover:-translate-y-0.5 transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs font-bold text-cyan-400">{card.num}</span>
                      <span className="text-2xl">{card.icon}</span>
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 mb-4 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                    {card.tags.map((t) => (
                      <span key={t} className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-cyan-200 font-semibold border border-white/5">
                        {t}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-amber-400/30 bg-amber-950/20 p-4 text-xs sm:text-sm text-amber-200">
              <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
              <span>
                <strong>כלל ברזל פיננסי:</strong> בכל שיטה שתבחר — הרץ תמיד את פרומפטי הביקורת שלנו כדי לוודא ששום מספר לא נמחק בטעות במהלך הניקוי.
              </span>
            </div>
          </div>
        )}

        {/* QUICKSTART TAB */}
        {activeTab === "quickstart" && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white text-right">3 מסלולי עבודה לבחירתך:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  letter: "א",
                  title: "השתמש ב-Claude ישירות",
                  sub: "לעבודה חד-פעמית מהירה",
                  desc: "העלה את הקובץ המבולגן, הדבק את הפרומפט המובנה, וקבל קובץ נקי ב-5 דקות.",
                  cta: "צפה בפרומפט ←",
                  tab: "methods" as Tab,
                  recommended: false,
                },
                {
                  letter: "ב",
                  title: "Claude Artifact",
                  sub: "לתהליך חודשי קבוע",
                  desc: "בנה אפליקציית ניקוי בדפדפן פעם אחת. בכל סוף חודש — העלה את הגיליון החדש וקבל פלט נקי.",
                  cta: "בנה Artifact עכשיו ←",
                  tab: "methods" as Tab,
                  recommended: true,
                },
                {
                  letter: "ג",
                  title: "Google Colab & Python",
                  sub: "אם אין לך מנוי Claude",
                  desc: "ייצר את קוד ה-Python עם כל AI חינמי (ChatGPT / Gemini) והרץ בענן ללא התקנה.",
                  cta: "קבל קוד Python ←",
                  tab: "methods" as Tab,
                  recommended: false,
                },
              ].map((opt) => (
                <button
                  key={opt.letter}
                  onClick={() => setActiveTab(opt.tab)}
                  className={`relative flex flex-col justify-between text-right rounded-2xl border p-5 transition-all ${
                    opt.recommended
                      ? "border-cyan-400/50 bg-cyan-950/30 shadow-lg shadow-cyan-500/10"
                      : "border-white/10 bg-slate-900/60 hover:border-cyan-400/30"
                  }`}
                >
                  {opt.recommended && (
                    <span className="absolute -top-2.5 right-4 rounded-full bg-cyan-400 px-3 py-0.5 text-[10px] font-black text-slate-950 shadow-sm">
                      מומלץ ביותר
                    </span>
                  )}
                  <div>
                    <span className="inline-block font-mono text-sm font-black text-cyan-400 mb-2">
                      מסלול {opt.letter}
                    </span>
                    <h4 className="text-base font-bold text-white mb-1">{opt.title}</h4>
                    <div className="text-xs text-cyan-300 font-semibold mb-3">{opt.sub}</div>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">{opt.desc}</p>
                  </div>
                  <div className="text-xs font-bold text-cyan-400 flex items-center gap-1 pt-3 border-t border-white/5">
                    <span>{opt.cta}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Audit Flow Steps */}
            <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-5">
              <h4 className="text-sm font-bold text-white mb-3">סדר ביקורת מומלץ (5 השלבים):</h4>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {["1. שלמות מבנית", "2. פיוס כספי", "3. בדיקת יומן ניקוי", "4. אימות מטבע", "5. סיכום CFO"].map(
                  (step, i) => (
                    <div
                      key={step}
                      className="flex items-center gap-1.5 rounded-lg border border-cyan-500/20 bg-cyan-500/10 px-3 py-1.5 text-cyan-300 font-semibold shadow-sm"
                    >
                      <span>{step}</span>
                      {i < 4 && <span className="text-slate-600 mr-1">←</span>}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}

        {/* METHODS TAB */}
        {activeTab === "methods" && (
          <div className="space-y-8">
            {CLEANING_PROMPTS.map((p) => (
              <div key={p.id} className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 sm:p-6 text-right shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="text-lg font-bold text-white">{p.label}</h3>
                  <span className="rounded-md border border-cyan-500/30 bg-cyan-500/15 px-2.5 py-1 text-xs font-bold text-cyan-300">
                    {p.badge}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 mb-4">{p.description}</p>
                <PromptBlock prompt={p.prompt} tip={p.tip} />
              </div>
            ))}
          </div>
        )}

        {/* AUDIT TAB */}
        {activeTab === "audit" && (
          <div className="space-y-8">
            <div className="rounded-2xl border border-cyan-500/30 bg-cyan-950/30 p-4 text-xs sm:text-sm text-cyan-200 text-right leading-relaxed font-medium">
              <strong>איך מריצים ביקורת?</strong> העלה את <strong>שני הקבצים</strong> (הקובץ המקורי המבולגן + הקובץ הנקי החדש) אל ה-AI בו-זמנית, והדבק את פרומפט הביקורת הרצוי.
            </div>

            {AUDIT_PROMPTS.map((p) => (
              <div key={p.id} className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 sm:p-6 text-right shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/20 font-mono text-xs font-bold text-cyan-300 shadow-sm border border-cyan-500/30">
                      {p.number}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white">{p.label}</h3>
                  </div>
                  <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-semibold text-slate-300">
                    {p.badge}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 mb-4">{p.description}</p>
                <PromptBlock prompt={p.prompt} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
