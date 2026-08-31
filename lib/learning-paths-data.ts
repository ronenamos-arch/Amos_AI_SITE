/**
 * Learning Paths — Structured learning journeys through Academy content.
 *
 * Each path sequences content items in a logical flow:
 * prerequisites first, then building blocks, then advanced applications.
 *
 * Paths reference items from academy-data.ts by content type + slug.
 */

import type { ContentType, DifficultyTier } from './academy-data';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A single step in a learning path */
export interface PathStep {
  /** Position in the path (1-based) */
  order: number;
  /** Content type */
  contentType: ContentType;
  /** Content slug */
  slug: string;
  /** Display title */
  title: string;
  /** Why this step is here — shown as helper text */
  rationale: string;
  /** Whether this is a recommended reading (vs. core item) */
  isOptional?: boolean;
}

/** A complete learning path */
export interface LearningPath {
  /** URL-safe slug */
  slug: string;
  /** Hebrew display name */
  title: string;
  /** Short description */
  description: string;
  /** Emoji icon */
  icon: string;
  /** Difficulty tier (Foundation / Core / Mastery) */
  tier: DifficultyTier;
  /** Tier display label in Hebrew */
  tierLabel: string;
  /** Whether this path is 100% free or requires a Pro subscription */
  isPremium: boolean;
  /** Estimated total duration in minutes */
  totalMinutes: number;
  /** Total number of core (non-optional) steps */
  coreStepCount: number;
  /** Ordered steps */
  steps: PathStep[];
  /** Suggested next path slug after completing this one */
  nextPathSlug?: string;
  /** Optional: course upsell at end of path */
  upsell?: {
    title: string;
    description: string;
    price: string;
    href: string;
  };
}

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

function step(
  order: number,
  contentType: ContentType,
  slug: string,
  title: string,
  rationale: string,
  isOptional = false,
): PathStep {
  return { order, contentType, slug, title, rationale, isOptional };
}

// ---------------------------------------------------------------------------
// The 6 Learning Paths
// ---------------------------------------------------------------------------

export const learningPaths: LearningPath[] = [
  // ═══════════════════════════════════════════════════════════════════════
  // PATH A — AI for Beginners (Tier 1: Foundation) — 100% FREE HOOK
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: 'ai-beginners',
    title: 'AI למתחילים בכספים',
    description: 'מסלול ההתחלה החינמי — תלמד ליצור פרומפטים ראשונים, לאוטמט דוח סטיות תקציב ולנסח סיכום מנהלים תוך פחות משעה. ללא ניסיון קודם וללא תשלום.',
    icon: '🌱',
    tier: 'beginner',
    tierLabel: 'יסודות',
    isPremium: false, // 100% FREE STAGE
    totalMinutes: 57,
    coreStepCount: 7,
    steps: [
      step(1, 'prompt', 'budget-variance', 'Quick Win: Budget Variance Report', 'רגע "אהא" מיידי — העתק, הדבק, קבל תוצאה'),
      step(2, 'prompt', 'kpi-analysis', 'Quick Win: KPI Performance Breakdown', 'עוד ניצחון מהיר — ניתוח KPI בלחיצה'),
      step(3, 'prompt', 'exec-summary', 'Quick Win: Executive Summary', 'סיכום מנהלים מוכן — הפרומפט השלישי שלך'),
      step(4, 'blog', 'ai-cpa-7-automation-areas', 'AI לרואי חשבון: 7 תחומים', 'סקירה רחבה — מה אפשר בכלל לעשות עם AI'),
      step(5, 'blog', 'ai-לא-יתקן-נתונים-שבורים', 'ה-AI לא יתקן לך נתונים שבורים', 'ציפיות ריאליסטיות — מה AI לא עושה'),
      step(6, 'blog', 'context-file', 'Context File: תיק היכרות ל-AI', 'הכישור הראשון האמיתי — ללמד AI להכיר את הארגון'),
      step(7, 'blog', 'chatgpt-work-vs-claude-cowork', 'ChatGPT Work מול Claude Cowork', 'בחירת הכלי הנכון — איזה AI מתאים לך'),
      step(8, 'blog', 'איך-מצאתי-19850-שח-בטעות-תוך-5-שניות-עם-gemini-3', 'מצאתי 19,850 ש"ח בטעות תוך 5 שניות', 'השראה — סיפור ניצחון מהיר מהשטח', true),
    ],
    nextPathSlug: 'prompt-engineering',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // PATH B — ChatGPT & Prompt Engineering (Tier 1: Foundation) — PREMIUM
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: 'prompt-engineering',
    title: 'ChatGPT ומסגרות פרומפטינג',
    description: 'שליטה במסגרות עבודה מתקדמות, טכניקת PRICE הייחודית וספריית 102 הפרומפטים הפיננסיים למנויים בלבד.',
    icon: '💬',
    tier: 'beginner',
    tierLabel: 'יסודות',
    isPremium: true, // PREMIUM STAGE
    totalMinutes: 148,
    coreStepCount: 8,
    steps: [
      step(1, 'guide', 'chatgpt-finance-guide-hebrew', '20 מסגרות עבודה ל-ChatGPT', 'הבסיס — מסגרות מובנות לפרומפטינג פיננסי'),
      step(2, 'resource', 'price-framework', 'מסגרת PRICE', 'המתודולוגיה — 5 שלבים ליצירת פרומפטים אפקטיביים'),
      step(3, 'blog', 'human-loop', 'הטריק ה-Human-in-the-Loop', 'מנגנון בטיחות קריטי — תמיד לשלב ביקורת אנושית'),
      step(4, 'blog', '4-סוגי-ניתוח-דאטא-עם-ai-איך-להפוך-את-צוות-הכספים-שלכם-לשותפי', '4 סוגי ניתוח דאטא עם AI', 'העמקה — מ-Descriptive ל-Prescriptive'),
      step(5, 'prompt', 'monte-carlo', 'Monte Carlo Risk Simulation', 'תרגול — פרומפט מתקדם לסימולציית סיכונים'),
      step(6, 'prompt', 'revenue-forecast', 'Revenue Forecast Modeling', 'תרגול — חיזוי הכנסות רב-משתנים'),
      step(7, 'resource', '102-prompt', '102 Prompts לאנשי כספים', 'הספרייה המלאה — 102 פרומפטים מוכנים לשימוש'),
      step(8, 'blog', 'ai-token-optimization-finance', 'איך לצמצם צריכת Tokens', 'אופטימיזציה — חיסכון בעלויות AI'),
      step(9, 'guide', 'chatgpt', 'ChatGPT לאנשי כספים — המדריך השלם', 'קריאה נוספת — מדריך יסודות מקיף', true),
    ],
    nextPathSlug: 'claude-mastery',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // PATH C — Claude Mastery (Tier 2: Core Skills) — PREMIUM
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: 'claude-mastery',
    title: 'Claude Mastery',
    description: 'שליטה מלאה ב-Claude למקצועני כספים — מ-Projects ועד Live Artifacts, הדרכות וידאו וכלי Cowork מובנים.',
    icon: '🧠',
    tier: 'intermediate',
    tierLabel: 'מיומנויות ליבה',
    isPremium: true, // PREMIUM STAGE
    totalMinutes: 495,
    coreStepCount: 13,
    steps: [
      step(1, 'guide', 'projects', 'Projects ב-AI: מכפיל הכוח', 'נקודת ההתחלה — המושג הפשוט ביותר ב-Claude'),
      step(2, 'resource', 'claude-playbook', 'Claude Playbook לאנשי כספים', 'המדריך המקיף — תשמור כ-reference'),
      step(3, 'lesson', 'claude-accountant', 'Claude לרואי חשבון (וובינר)', 'למידה חזותית — ראה את Claude בפעולה'),
      step(4, 'lesson', 'webinar-04-projects', 'עבודה עם פרויקטים (וובינר)', 'ידיים על הקלידים — Projects בשטח'),
      step(5, 'guide', 'live-artifacts-claude', 'Live Artifacts — המדריך המלא', 'הרמה הבאה — פלטים אינטראקטיביים'),
      step(6, 'lesson', 'webinar-03-live-artifacts', 'Live Artifacts (וובינר)', 'צפייה ב-Live Artifacts נבנים חי'),
      step(7, 'guide', 'claude-live-artifacts', 'Live Artifacts לצוותי Finance', 'יישום ספציפי — דשבורדים ווידג\'טים לכספים'),
      step(8, 'resource', 'claude-excel', 'Claude ב-Excel ו-PowerPoint', 'אינטגרציה — שילוב Claude עם הכלים שכבר משתמשים בהם'),
      step(9, 'lesson', 'claude-excel-pp', 'Claude עם Excel ו-PPT (וובינר)', 'ראה את האינטגרציה בפעולה'),
      step(10, 'guide', 'claude-cowork', 'Claude Cowork — עקרון 80/20', 'שיתוף פעולה — עבודה בצוות עם Claude'),
      step(11, 'lesson', 'webinar-05-skills', 'Claude Skills מאפס (וובינר)', 'מתקדם — בניית כלים משלך'),
      step(12, 'resource', 'ai-skills', 'Claude Skills לאנשי פיננסים', 'ארכיטקטורה — SKILL.md ומבנה מתקדם'),
      step(13, 'guide', 'claude-code-loop', 'אוטומציית /loop עם Claude Code', 'Power-user — לולאות אוטומטיות'),
      step(14, 'guide', 'claude-code-checkpoints', 'Claude Code Checkpoints', 'קריאה נוספת — ניהול גרסאות מתקדם', true),
    ],
    nextPathSlug: 'month-end-close',
    upsell: {
      title: 'AI Finance Master Course',
      description: '16 מודולים מתקדמים — מ-Haiku ל-Opus, מ-PRICE ל-Claude Code',
      price: '₪999',
      href: '/courses/sell-page',
    },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // PATH D — Excel & Automation (Tier 2: Core Skills) — PREMIUM
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: 'excel-automation',
    title: 'Excel, אוטומציה וכלי AI',
    description: 'Copilot, Python, Google Colab, Zite — אוטומציות שמחסלות עבודה ידנית וממירות גיליונות אקסל לאפליקציות.',
    icon: '⚡',
    tier: 'intermediate',
    tierLabel: 'מיומנויות ליבה',
    isPremium: true, // PREMIUM STAGE
    totalMinutes: 220,
    coreStepCount: 9,
    steps: [
      step(1, 'guide', 'excel-ai', 'Excel + AI — האנליסט החדש שלך', 'נקודת ההתחלה — מה אפשר בשילוב Excel + AI'),
      step(2, 'blog', 'ai-excel', 'AI באקסל עושה את העבודה של אנליסט', '4 שלבים מעשיים — מסגרת עבודה'),
      step(3, 'guide', 'copilot-cowork', 'Copilot Cowork — המדריך המעשי', 'Microsoft AI — Copilot ב-Office'),
      step(4, 'guide', 'copilot-skill', 'Copilot Skills לרואי חשבון', 'אוטומציה — מתכונים של Copilot'),
      step(5, 'guide', 'automation', '5 אוטומציות שכל צוות צריך', 'ניצחונות מהירים — אוטומציות פשוטות'),
      step(6, 'guide', 'codex', 'Codex App — מ-0 ל-AI מלא', 'כלי חלופי — OpenAI Codex לניתוח קבצים'),
      step(7, 'resource', 'colab-he', 'Google Colab לאנשי כספים', 'Level up — Python בלי התקנה'),
      step(8, 'lesson', 'sheets-automation', 'אוטומציה ב-Google Sheets (וובינר)', 'הדרכה חיה — Apps Script בפעולה'),
      step(9, 'guide', 'excel-to-zite-finance-crm-guide', 'Zite — מ-Excel לאפליקציה', 'No-code — הפיכת גיליון לאפליקציה'),
    ],
    nextPathSlug: 'dashboard-pro',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // PATH E — Month-End Close & Reporting (Tier 3: Mastery) — PREMIUM
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: 'month-end-close',
    title: 'Month-End Close & Reporting',
    description: 'אוטומציה מתקדמת של סגירת חודש — מאימות נתונים והתאמות בנקים ועד ניתוח AVB ודוחות דירקטוריון.',
    icon: '📋',
    tier: 'advanced',
    tierLabel: 'מומחיות',
    isPremium: true, // PREMIUM STAGE
    totalMinutes: 248,
    coreStepCount: 11,
    steps: [
      step(1, 'blog', 'אימות-נתונים-לפני-הכל-אל-תתנו-ל-ai-לנתח-לפני-שווידאתם-ששורות', 'אימות נתונים לפני הכל', 'כלל #1 — תמיד לוודא שהנתונים תקינים לפני AI'),
      step(2, 'prompt', 'reconciliation', 'Bank Reconciliation Matcher', 'פרומפט ליבה — התאמה בנקאית'),
      step(3, 'prompt', 'journal-audit', 'Journal Entry Audit', 'פרומפט ליבה — ביקורת פקודות יומן'),
      step(4, 'prompt', 'budget-variance', 'Budget Variance Report', 'פרומפט ליבה — דוח סטיות'),
      step(5, 'prompt', 'variance-commentary', 'Variance Commentary Writer', 'פרומפט ליבה — הסברי סטיות לדירקטוריון'),
      step(6, 'resource', '50-ways-ai', '50 דרכים להשתמש ב-AI לסגירת חודש', 'הספרייה המלאה — 50 פרומפטים ב-8 קטגוריות'),
      step(7, 'blog', 'איך-לבצע-ניתוח-avb-תקציב-מול-ביצוע-ב-5-דקות-בלבד-בעזרת-claud', 'ניתוח AVB ב-5 דקות', 'מקרה מבחן — Actual vs Budget מהיר'),
      step(8, 'blog', 'cash-flow-playground', 'Cash Flow Playground', 'סימולציה — מודל תרחישי תזרים'),
      step(9, 'lesson', 'cfo-ai-2', 'Claude ל-CFO (וובינר)', 'הדרכה חיה — דשבורדים חיים ל-CFO'),
      step(10, 'lesson', 'excel-hell', 'Artifacts — מ-3 ימים ל-30 דקות (וובינר)', 'הדרכה חיה — חיסכון דרמטי בזמן'),
      step(11, 'blog', 'rev-rec-ai-agent', 'AI Agent ל-Revenue Recognition', 'מתקדם — אוטומציה של ASC 606 / IFRS 15'),
      step(12, 'blog', 'מערכת-fpa-ai-שמסבירה-את-המספרים', 'מערכת FP&A שמסבירה מספרים', 'קריאה נוספת — קונסולידציה ונרטיב', true),
    ],
    upsell: {
      title: 'AI Finance Master Course',
      description: 'העמקה ל-16 מודולים — כולל Claude Code, Close Automation, ו-200+ פרומפטים',
      price: '₪999',
      href: '/courses/sell-page',
    },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // PATH F — Dashboard Pro with AI (Tier 3: Mastery) — PREMIUM
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: 'dashboard-pro',
    title: 'Dashboard Pro with AI',
    description: 'בניית דשבורדים פיננסיים אינטראקטיביים עם AI — מתכנון ארכיטקטורת נתונים, דרך Python P&L ועד דשבורד CFO נייד.',
    icon: '📊',
    tier: 'advanced',
    tierLabel: 'מומחיות',
    isPremium: true, // PREMIUM STAGE
    totalMinutes: 183,
    coreStepCount: 9,
    steps: [
      step(1, 'blog', 'ai-finance-dashboards-5-prompts', '5 דשבורדים חכמים שכל CFO צריך', 'השראה — ראה מה אפשר לבנות'),
      step(2, 'guide', 'ai-excel-dashboard', 'תכנון Dashboard ב-Excel עם AI', 'שלב 1 — תכנן לפני שבונים'),
      step(3, 'resource', '12-shitot-avoda-dashboard-ai', '12 שיטות לדשבורדים עם Claude', 'מסגרת H·T·M·L — השיטה'),
      step(4, 'blog', 'claude-mobile-cfo-dashboard-decisions', 'מהטלפון לדשבורד חי', 'Mobile-First — חשיבה מובייל'),
      step(5, 'prompt', 'dashboard-summary', 'Financial Dashboard Summary', 'פרומפט — סינתוז נתונים לדשבורד'),
      step(6, 'prompt', 'kpi-analysis', 'KPI Performance Breakdown', 'פרומפט — ניתוח KPI ו-drill-down'),
      step(7, 'blog', 'כך-תבנו-דאשבורד-cfo-אינטראקטיבי-תוך-דקות-בלי-it-ובלי-דליפת-נ', 'דשבורד CFO אינטראקטיבי', 'Hands-on — בנה דשבורד עכשיו'),
      step(8, 'guide', 'command-center', 'Copilot Command Center', 'מתקדם — דשבורד מנהלים רב-מקורי'),
      step(9, 'resource', 'python-cfo', 'Python P&L Terminal', 'מתקדם — דשבורד אינטראקטיבי בדפדפן'),
      step(10, 'guide', 'power-bi-finance', 'דשבורדים עם AI לאנשי כספים', 'קריאה נוספת — פלטפורמת BI מלאה', true),
    ],
    upsell: {
      title: 'הכשרה ארגונית: Power BI ודשבורדים',
      description: 'הכשרה ליום שלם לצוות — כל משתתף יוצא עם דשבורד עובד',
      price: '₪8,000',
      href: '/training',
    },
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Get a learning path by slug */
export function getLearningPath(slug: string): LearningPath | undefined {
  return learningPaths.find((p) => p.slug === slug);
}

/** Get all paths for a specific tier */
export function getPathsByTier(tier: DifficultyTier): LearningPath[] {
  return learningPaths.filter((p) => p.tier === tier);
}

/** Get the recommended next path after completing one */
export function getNextPath(currentSlug: string): LearningPath | undefined {
  const current = getLearningPath(currentSlug);
  if (!current?.nextPathSlug) return undefined;
  return getLearningPath(current.nextPathSlug);
}

/** Format duration in minutes to Hebrew display string */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} דקות`;
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  if (remaining === 0) return hours === 1 ? 'שעה' : `${hours} שעות`;
  return `${hours} שעות ו-${remaining} דקות`;
}
