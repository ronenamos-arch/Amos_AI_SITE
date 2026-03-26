---
title: The Five Audit Prompts
category: Financial Reporting Prompts
description: ביקורת נתונים 
---
פעל כ-CFO Analyst. נתח את הנתונים וענה על הדרישות הבאות...
[אתה אנליסט CFO מומחה ומנוסה, עם ידע עמוק בחשבונאות, ניתוח פיננסי, תחזיות וניהול עסקי. הפק דוח ניתוח סטיות (Variance Analysis Narrative) על סמך הנתונים שסופקו על ידי המשתמש, כולל:


Audit Prompt 1 · Row Count & Structural Integrity

I am attaching two Excel files: the original messy FP&A file and the cleaned version. Please perform a structural audit:

1. ROW COUNTS: For each sheet, compare the number of data rows in the original vs the cleaned file. List the difference and explain what was removed (duplicates, stray data, blank rows, archived rows).

2. COLUMN COUNTS: For each sheet, list columns that were added, removed, or renamed between the two files. Flag any column in the original that has no equivalent in the cleaned file.

3. HEADER ROW DETECTION: Confirm the cleaned file's headers start at row 1 on every sheet. Flag any sheet where headers are not in row 1.

4. SHEET INVENTORY: List all sheet names in both files. Confirm expected sheets are present in the cleaned file (one per region + Cleaning_Log). Note any unexpected sheets.

Present your findings as a structured comparison table for each sheet.


Audit Prompt 2 · Numeric Integrity & Financial Totals

I am attaching the original messy FP&A file and the cleaned version. Please run a financial integrity audit:

1. TOTAL REVENUE RECONCILIATION: For each sheet, sum all quarterly actual columns (Q1–Q4 or equivalent) in both files. Show the original total, the cleaned total, the difference, and explain what drove the change (e.g. removed duplicates, nulled-out text values).

2. NULL INTRODUCTION CHECK: Identify any cells that contained a real number in the original but are now null or blank in the cleaned file. This should only happen where the original had text like "N/A" or "PENDING" — flag any case where an actual number was lost.

3. ZERO-ROW REVIEW: List all rows flagged as "inactive_zero" or "cancelled_or_inactive" in the cleaned file. Confirm these rows genuinely had all-zero actuals in the original — not that they were zeroed out during cleaning.

4. BUDGET TOTALS: If a budget column exists, confirm the sum of budget figures is unchanged between the original and cleaned files (budget should never be modified by cleaning).

Show all figures to the nearest $000 and highlight any unexplained variance greater than $50k.
Audit Prompt 3 · Cleaning Log Review

I am attaching the cleaned FP&A Excel file. Please audit the Cleaning_Log sheet:

1. COMPLETENESS: Does the Cleaning_Log have entries for every structural change — removed rows, nulled values, renamed headers, archived rows, added columns? Flag any change type that appears in the data but has no corresponding log entry.

2. REASON QUALITY: Review the "reason" column. Are the reasons specific and defensible (e.g. "duplicate row — name matched after whitespace trim") or vague (e.g. "cleaned")? List any log entries with insufficient reasoning.

3. REVERSIBILITY CHECK: For the 10 highest-impact changes (largest revenue rows removed or modified), confirm that the original value is recorded in the log so the change could be reversed manually if needed.

4. RISK FLAGS: Identify any logged change that a finance controller should review before the file is used in planning — specifically: rows removed that had non-zero actuals, any budget figures that were touched, and any currency flag assignments that may be incorrect.

Summarise your findings with a traffic-light rating: Green (log is complete and defensible), Amber (minor gaps), or Red (material omissions that require re-cleaning).
Audit Prompt 4 · Currency & FX Flag Validation
Copy
I am attaching the cleaned FP&A Excel file. Please validate the currency flags applied during cleaning:

1. COVERAGE: Confirm every row has a value in the "currency_flag" column. List any rows where it is blank.

2. ACCURACY CHECK: For each region, review whether the assigned currency makes sense for the country:
   - UK rows → GBP
   - Germany, France, Netherlands, Spain, Nordics → EUR
   - Canada → CAD
   - Mexico → MXN
   - Japan → JPY
   - China → CNY
   - Australia → AUD
   - New Zealand → NZD
   - India → INR
   - South Korea → KRW
   - Middle East → USD (typically)
   - Brazil → BRL
   - Colombia → COP
   - Chile → CLP
   - Argentina → ARS
   - Ecuador → USD (dollarized)
   Flag any mismatches.

3. MULTI-CURRENCY ROWS: Identify any rows that cover multiple countries (e.g. "Nordics", "Southeast Asia Other", "Central America") and confirm they are flagged appropriately or noted as requiring a manual split.

4. UNCONVERTED VALUES: Remind me which columns still contain local-currency amounts (not USD-equivalent) so that downstream models apply the correct FX conversion before aggregating.
Audit Prompt 5 · CFO-Ready Variance Summary

I am attaching the original messy FP&A file and the cleaned version. Please produce a one-page CFO-ready audit summary I can attach to the clean file when I share it:

FORMAT THE OUTPUT AS FOLLOWS:

CLEANING SUMMARY — FY2024 Revenue File
Prepared: [today's date]
Files compared: [original filename] → [cleaned filename]

WHAT CHANGED
- Sheets processed: [list]
- Total rows in original: [n]
- Total rows in cleaned file: [n] ([+/-n] net change)
- Rows removed (duplicates): [n]
- Rows archived (stray/historical): [n]
- Columns standardised: [list key renames]
- Columns added: currency_flag, row_status, data_flag
- Cells nulled (text-in-numeric): [n] cells across [n] rows

FINANCIAL IMPACT OF CLEANING
- Revenue removed with duplicate rows: $[amount]k
- Revenue in rows marked inactive_zero: $[amount]k
- Revenue in rows with incomplete data: $[amount]k
- Net revenue in clean active rows: $[amount]k

ITEMS REQUIRING HUMAN REVIEW
[List any rows or values that could not be automatically resolved and need a finance team member to make a judgment call — e.g. the Argentina rows, the Germany probable duplicate, the Nordics multi-country row.]

DATA QUALITY RATING
[Assign one of: Clean — ready for use / Amber — usable with noted caveats / Requires re-review]

Keep the language concise and factual. This will be read by a CFO who was not involved in the cleaning process.