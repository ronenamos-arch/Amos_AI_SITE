"use client";

import { useState } from "react";

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
            className="dc-copy-btn"
            title="העתק פרומפט"
        >
            {copied ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                </svg>
            )}
            <span>{copied ? "✓ הועתק" : "העתק"}</span>
        </button>
    );
}

function PromptBlock({ prompt, tip }: { prompt: string; tip?: string }) {
    return (
        <div className="dc-prompt-block">
            <div className="dc-prompt-header">
                <span className="dc-prompt-label">📋 הפרומפט</span>
                <CopyButton text={prompt} />
            </div>
            <pre className="dc-prompt-text">{prompt}</pre>
            {tip && (
                <div className="dc-pro-tip">
                    <span className="dc-pro-tip-icon">💡</span>
                    <span>{tip}</span>
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
        { id: "home", label: "בית", icon: "🏠" },
        { id: "quickstart", label: "התחלה מהירה", icon: "⚡" },
        { id: "methods", label: "שיטות ניקוי", icon: "🧹" },
        { id: "audit", label: "ביקורת התוצאות", icon: "🔍" },
    ];

    return (
        <div className="dc-module" dir="rtl">
            {/* Section header */}
            <div className="dc-module-header">
                <div className="dc-module-eyebrow">מודול מתקדם</div>
                <h2 className="dc-module-title">
                    🧹 אמנות הנתונים הנקיים
                </h2>
                <p className="dc-module-subtitle">
                    מדריך מעשי לניקוי נתוני FP&A בעזרת AI — שלוש שיטות ניקוי + חמישה פרומפטי ביקורת
                </p>
            </div>

            {/* Tab bar */}
            <div className="dc-tab-bar">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`dc-tab ${activeTab === tab.id ? "dc-tab-active" : ""}`}
                    >
                        <span>{tab.icon}</span>
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Tab content */}
            <div className="dc-tab-content">

                {/* HOME TAB */}
                {activeTab === "home" && (
                    <div className="dc-home">
                        <p className="dc-home-intro">
                            לכל צוות כספים יש את הקובץ הזה. זה שיש בו הערות מעל הכותרות, מטבעות מעורבים בין לשוניות, שורת נציג כפולה שקבורה שלוש שורות למטה, ונתוני שנה שעברה שעדיין אורבים מתחת לטבלה. המדריך הזה נותן לך שלוש דרכים לנקות אותו בעזרת AI — ודרך אחת לוודא שהתוצאה אמינה.
                        </p>
                        <div className="dc-home-grid">
                            {[
                                { num: "I", icon: "⚡", title: "ניקוי מהיר עם Claude", desc: "פרומפט אחד, קובץ אחד. Claude יבחן כל לשונית ויחזיר קובץ נקי עם יומן ניקוי מלא.", tags: ["Claude.ai", "5 דקות", "ללא התקנה"], tab: "methods" as Tab },
                                { num: "II", icon: "🔄", title: "Claude Artifact לשימוש חוזר", desc: "בנה פעם אחת, הרץ כל חודש. אפליקציית ניקוי שחיה בשיחה שמורה.", tags: ["Claude.ai", "תהליך חודשי", "רץ בדפדפן"], tab: "methods" as Tab },
                                { num: "III", icon: "🐍", title: "Python & Google Colab", desc: "ללא מנוי Claude. השתמש בכל AI חינמי לייצר קוד Python ורץ ב-Colab.", tags: ["כלים חינמיים", "Google Colab", "כל AI"], tab: "methods" as Tab },
                                { num: "IV", icon: "🔍", title: "ביקורת התוצאות", desc: "חמישה פרומפטי ביקורת לאימות מה ה-AI ניקה — פיוס כספי, שלמות מבנית, וסיכום CFO.", tags: ["פיוס כספי", "יומן ניקוי", "סיכום CFO"], tab: "audit" as Tab },
                            ].map((card) => (
                                <button
                                    key={card.num}
                                    onClick={() => setActiveTab(card.tab)}
                                    className="dc-home-card"
                                >
                                    <div className="dc-home-card-num">{card.num}</div>
                                    <div className="dc-home-card-icon">{card.icon}</div>
                                    <div className="dc-home-card-title">{card.title}</div>
                                    <div className="dc-home-card-desc">{card.desc}</div>
                                    <div className="dc-home-card-tags">
                                        {card.tags.map((t) => (
                                            <span key={t} className="dc-tag">{t}</span>
                                        ))}
                                    </div>
                                </button>
                            ))}
                        </div>
                        <div className="dc-warning">
                            <span>⚠️</span>
                            <span>חשוב: בכל דרך שתבחר — תמיד בצע ביקורת על התוצאה לפני שימוש בנתונים.</span>
                        </div>
                    </div>
                )}

                {/* QUICK START TAB */}
                {activeTab === "quickstart" && (
                    <div className="dc-quickstart">
                        <h3 className="dc-section-title">יש לך 3 אפשרויות — מה מתאים לך?</h3>
                        <div className="dc-qs-grid">
                            {[
                                {
                                    letter: "א",
                                    title: "השתמש ב-Claude ישירות",
                                    sub: "אם זו עבודה חד-פעמית",
                                    desc: "העלה את הקובץ. הדבק את הפרומפט. גמור בתוך 5 דקות.",
                                    cta: "ראה את הפרומפט ←",
                                    tab: "methods" as Tab,
                                    recommended: false,
                                },
                                {
                                    letter: "ב",
                                    title: "Claude Artifact",
                                    sub: "אם אתה צריך את זה כל חודש",
                                    desc: "בנה את האפליקציה פעם אחת. העלה והורד כל סוף חודש.",
                                    cta: "בנה את ה-Artifact ←",
                                    tab: "methods" as Tab,
                                    recommended: true,
                                },
                                {
                                    letter: "ג",
                                    title: "AI כלשהו + Python",
                                    sub: "אם אתה לא רוצה להשתמש ב-Claude",
                                    desc: "ייצר את הקוד עם כל AI חינמי. הרץ אותו ב-Google Colab.",
                                    cta: "קבל את פרומפט הקוד ←",
                                    tab: "methods" as Tab,
                                    recommended: false,
                                },
                            ].map((opt) => (
                                <button
                                    key={opt.letter}
                                    onClick={() => setActiveTab(opt.tab)}
                                    className={`dc-qs-card ${opt.recommended ? "dc-qs-card-recommended" : ""}`}
                                >
                                    {opt.recommended && <div className="dc-recommended-badge">מומלץ</div>}
                                    <div className="dc-qs-letter">{opt.letter}</div>
                                    <div className="dc-qs-title">{opt.title}</div>
                                    <div className="dc-qs-sub">{opt.sub}</div>
                                    <div className="dc-qs-desc">{opt.desc}</div>
                                    <div className="dc-qs-cta">{opt.cta}</div>
                                </button>
                            ))}
                        </div>
                        <div className="dc-warning mt-6">
                            <span>⚠️</span>
                            <span>חשוב: בכל דרך שתבחר — תמיד בצע ביקורת על התוצאה.</span>
                        </div>
                        <div className="dc-audit-flow">
                            <div className="dc-audit-flow-title">סדר ביקורת מומלץ:</div>
                            <div className="dc-audit-flow-steps">
                                {["שלמות מבנית", "פיוס כספי", "בדיקת יומן", "אימות מטבע", "סיכום CFO"].map((step, i) => (
                                    <div key={step} className="dc-audit-flow-step">
                                        <span className="dc-audit-flow-num">{i + 1}</span>
                                        <span>{step}</span>
                                        {i < 4 && <span className="dc-audit-flow-arrow">←</span>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* METHODS TAB */}
                {activeTab === "methods" && (
                    <div className="dc-methods">
                        {CLEANING_PROMPTS.map((p) => (
                            <div key={p.id} className="dc-method-section">
                                <div className="dc-method-header">
                                    <h3 className="dc-method-title">{p.label}</h3>
                                    <span className="dc-tag">{p.badge}</span>
                                </div>
                                <p className="dc-method-desc">{p.description}</p>
                                <PromptBlock prompt={p.prompt} tip={p.tip} />
                            </div>
                        ))}
                    </div>
                )}

                {/* AUDIT TAB */}
                {activeTab === "audit" && (
                    <div className="dc-audit">
                        <div className="dc-audit-intro">
                            <p>ניקוי ללא ביקורת הוא חצי עבודה. לפני שהקובץ הנקי מגיע למצגת CFO — חמשת פרומפטי הביקורת האלה יחשפו כל מה שפספס שלב הניקוי.</p>
                            <div className="dc-pro-tip dc-audit-howto">
                                <span className="dc-pro-tip-icon">📌</span>
                                <span>העלה <strong>שני הקבצים</strong> — המקורי המבולגן והנקי — ל-Claude בו-זמנית, ואז הדבק את הפרומפט.</span>
                            </div>
                        </div>
                        {AUDIT_PROMPTS.map((p) => (
                            <div key={p.id} className="dc-audit-section">
                                <div className="dc-audit-section-header">
                                    <div className="dc-audit-num">{p.number}</div>
                                    <div>
                                        <div className="dc-audit-label">{p.label}</div>
                                        <div className="dc-audit-desc">{p.description}</div>
                                    </div>
                                    <span className="dc-tag dc-tag-sm">{p.badge}</span>
                                </div>
                                <PromptBlock prompt={p.prompt} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
