/**
 * Academy Data — Topic clusters and content item mappings.
 *
 * This is the single source of truth for how content is organized
 * in the Academy page. Each topic cluster groups content from
 * multiple sources (guides, resources, lessons, prompts, blog posts)
 * into a coherent topic.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** The type of content item — drives icon, link pattern, and access logic */
export type ContentType = 'guide' | 'resource' | 'lesson' | 'prompt' | 'blog';

/** Difficulty tier — drives the 3-tier progression model */
export type DifficultyTier = 'beginner' | 'intermediate' | 'advanced';

/** A single content item reference within a topic cluster or learning path */
export interface AcademyContentItem {
  /** Unique key: `${contentType}:${slug}` */
  id: string;
  /** Display title (Hebrew) */
  title: string;
  /** Where this content lives */
  contentType: ContentType;
  /** Slug used to build the link (guide slug, resource slug, blog slug, etc.) */
  slug: string;
  /** Difficulty level */
  difficulty: DifficultyTier;
  /** Whether this content requires a Pro subscription */
  isPremium: boolean;
  /** Estimated time to consume in minutes */
  durationMinutes: number;
  /** Short description (Hebrew) */
  description: string;
}

/** A topic cluster that groups related content across types */
export interface TopicCluster {
  /** URL-safe identifier */
  slug: string;
  /** Display name (Hebrew) */
  title: string;
  /** Short description of the topic */
  description: string;
  /** Emoji icon for the cluster */
  icon: string;
  /** Primary difficulty tier for this cluster */
  tier: DifficultyTier;
  /** Ordered list of content items in this cluster */
  items: AcademyContentItem[];
}

// ---------------------------------------------------------------------------
// Helper — build a content item with auto-generated ID
// ---------------------------------------------------------------------------

function item(
  contentType: ContentType,
  slug: string,
  title: string,
  difficulty: DifficultyTier,
  isPremium: boolean,
  durationMinutes: number,
  description: string,
): AcademyContentItem {
  return {
    id: `${contentType}:${slug}`,
    title,
    contentType,
    slug,
    difficulty,
    isPremium,
    durationMinutes,
    description,
  };
}

// ---------------------------------------------------------------------------
// Topic Clusters
// ---------------------------------------------------------------------------

export const topicClusters: TopicCluster[] = [
  // ─── TIER 1: FOUNDATION ───────────────────────────────────────────────
  {
    slug: 'ai-beginners',
    title: 'AI למתחילים בכספים',
    description: 'הכרות ראשונה עם בינה מלאכותית בעולם הפיננסים — מושגים, סיכונים, ופרומפטים ראשונים',
    icon: '🌱',
    tier: 'beginner',
    items: [
      item('prompt', 'budget-variance', 'Budget Variance Report', 'beginner', false, 5, 'פרומפט מוכן לניתוח סטיות תקציב'),
      item('prompt', 'kpi-analysis', 'KPI Performance Breakdown', 'beginner', false, 5, 'פרומפט מוכן לפירוט KPI'),
      item('prompt', 'exec-summary', 'Executive Summary for Boards', 'beginner', false, 5, 'פרומפט מוכן לסיכום מנהלים'),
      item('blog', 'ai-cpa-7-automation-areas', 'AI לרואי חשבון: 7 תחומים שבהם אוטומציה משנה הכל', 'beginner', false, 10, 'סקירה של 7 תחומים לאימוץ AI בחשבונאות'),
      item('blog', 'ai-לא-יתקן-נתונים-שבורים', 'ה-AI לא יתקן לך את הנתונים — הוא יסתיר שהם שבורים', 'beginner', false, 8, 'למה חשוב לנקות נתונים לפני AI'),
      item('blog', 'context-file', 'Context File: תיק היכרות ל-AI', 'beginner', false, 10, 'איך לבנות קובץ הקשר שהופך כל AI לאנליסט שמכיר את העסק'),
      item('blog', 'chatgpt-work-vs-claude-cowork', 'ChatGPT Work מול Claude Cowork', 'beginner', false, 8, 'השוואה ברורה בין שתי הפלטפורמות'),
      item('blog', 'איך-מצאתי-19850-שח-בטעות-תוך-5-שניות-עם-gemini-3', 'איך מצאתי 19,850 ש"ח בטעות תוך 5 שניות', 'beginner', false, 6, 'סיפור quick-win מעורר השראה'),
    ],
  },

  {
    slug: 'prompt-engineering',
    title: 'ChatGPT ומסגרות פרומפטינג',
    description: 'מסגרות עבודה מובנות, פרומפטים מתקדמים, וטכניקות לתקשורת יעילה עם AI',
    icon: '💬',
    tier: 'beginner',
    items: [
      item('guide', 'chatgpt-finance-guide-hebrew', 'ChatGPT לפיננסים: 20 מסגרות עבודה', 'intermediate', true, 30, '20 מסגרות פרומפטינג מובנות ל-FP&A ותקצוב'),
      item('resource', 'price-framework', 'מסגרת PRICE — ארטיפקטים עם Claude', 'intermediate', true, 20, 'מתודולוגיית PRICE ל-5 שלבי פרומפטינג'),
      item('blog', 'human-loop', 'הטריק ה-Human-in-the-Loop', 'intermediate', true, 8, 'מנגנוני בטיחות בפרומפטים פיננסיים'),
      item('blog', '4-סוגי-ניתוח-דאטא-עם-ai-איך-להפוך-את-צוות-הכספים-שלכם-לשותפי', 'ניתוח דאטא עם AI: 4 סוגים', 'intermediate', true, 12, 'Descriptive, Diagnostic, Predictive, Prescriptive'),
      item('prompt', 'exec-summary', 'Executive Summary for Boards', 'intermediate', true, 5, 'תרגול: סיכום מנהלים'),
      item('prompt', 'monte-carlo', 'Monte Carlo Risk Simulation', 'advanced', true, 5, 'סימולציית סיכונים מתקדמת'),
      item('prompt', 'revenue-forecast', 'Revenue Forecast Modeling', 'intermediate', true, 5, 'מודל חיזוי הכנסות'),
      item('resource', '102-prompt', '102 Prompts לאנשי כספים', 'intermediate', true, 45, 'הספרייה המלאה — 102 פרומפטים'),
      item('blog', 'ai-token-optimization-finance', 'איך לצמצם צריכת Tokens', 'intermediate', true, 8, 'חיסכון בעלויות וייעול פרומפטים'),
    ],
  },

  // ─── TIER 2: CORE SKILLS ──────────────────────────────────────────────
  {
    slug: 'claude-mastery',
    title: 'Claude Mastery',
    description: 'שליטה מלאה ב-Claude: Projects, Artifacts, Skills, Cowork, ואוטומציות',
    icon: '🧠',
    tier: 'intermediate',
    items: [
      item('guide', 'projects', 'Projects ב-AI: מכפיל הכוח', 'beginner', true, 15, 'הגדרת הקשר ארגוני ב-Claude Projects'),
      item('resource', 'claude-playbook', 'Claude Playbook לאנשי כספים', 'intermediate', true, 40, 'מדריך מקיף: Haiku, Sonnet, Opus, Artifacts, Skills'),
      item('lesson', 'claude-accountant', 'Claude לרואי חשבון (וובינר)', 'beginner', true, 60, 'וובינר יסודות — סביבת העבודה החדשה'),
      item('lesson', 'webinar-04-projects', 'פרויקטים בקלוד (וובינר)', 'beginner', true, 60, 'הגדרת system prompts וזיכרון ארגוני'),
      item('guide', 'live-artifacts-claude', 'Live Artifacts — המדריך המלא', 'intermediate', true, 20, 'יצירת ארטיפקטים אינטראקטיביים'),
      item('lesson', 'webinar-03-live-artifacts', 'Live Artifacts (וובינר)', 'intermediate', true, 60, 'קוד חי, מודלים אינטראקטיביים'),
      item('guide', 'claude-live-artifacts', 'Live Artifacts לצוותי Finance', 'intermediate', true, 25, 'דשבורדים אוטומטיים וווידג\'טים'),
      item('resource', 'claude-excel', 'Claude ב-Excel ו-PowerPoint', 'intermediate', true, 30, 'אינטגרציה Cross-App'),
      item('lesson', 'claude-excel-pp', 'Claude עם Excel ו-PPT (וובינר)', 'intermediate', true, 60, 'אוטומציה בין אקסל למצגות'),
      item('guide', 'claude-cowork', 'Claude Cowork — עקרון 80/20', 'beginner', true, 20, 'שיתוף פעולה אפקטיבי עם Claude'),
      item('lesson', 'webinar-05-skills', 'Claude Skills מאפס (וובינר)', 'advanced', true, 60, 'בניית Skills בהדרכה חיה'),
      item('resource', 'ai-skills', 'Claude Skills לאנשי פיננסים', 'advanced', true, 35, 'ארכיטקטורת SKILL.md ו-Progressive Disclosure'),
      item('guide', 'claude-code-loop', 'אוטומציית /loop עם Claude Code', 'advanced', true, 15, 'עיבוד אצווה ולולאות אוטומטיות'),
      item('guide', 'claude-code-checkpoints', 'Claude Code Checkpoints', 'intermediate', true, 10, 'ניהול גרסאות ו-rollbacks'),
    ],
  },

  {
    slug: 'excel-automation',
    title: 'Excel, אוטומציה וכלי AI',
    description: 'Python, Copilot, Google Colab, Zite, ואוטומציות שמחסלות עבודה ידנית',
    icon: '⚡',
    tier: 'intermediate',
    items: [
      item('guide', 'excel-ai', 'Excel + AI — האנליסט החדש שלך', 'beginner', true, 15, 'שילוב Excel עם LLMs למידול נתונים'),
      item('blog', 'ai-excel', 'AI באקסל עושה את העבודה של אנליסט', 'beginner', true, 10, '4 שלבים לשדרוג Excel עם AI'),
      item('guide', 'copilot-cowork', 'Copilot Cowork — המדריך המעשי', 'beginner', true, 20, 'Copilot ליצירת מסמכים, לוחות שנה, ומיילים'),
      item('guide', 'copilot-skill', 'Copilot Skills — רואי חשבון עם AI', 'beginner', true, 15, 'אוטומציה של נוסחאות וניקוי נתונים'),
      item('guide', 'automation', '5 אוטומציות שכל צוות כספים צריך', 'beginner', true, 15, 'אוטומציות no-code חוסכות שעות'),
      item('guide', 'codex', 'Codex App — מ-0 ל-AI מלא ב-30 דקות', 'intermediate', true, 20, 'ניתוח Excel, PDF, CSV עם סוכנים'),
      item('resource', 'colab-he', 'Google Colab לאנשי כספים', 'intermediate', true, 40, 'Python בלי התקנה — 10 מודולים'),
      item('lesson', 'sheets-automation', 'אוטומציה לרואי חשבון: Google Sheets (וובינר)', 'intermediate', true, 60, 'Apps Script וחישובים אוטומטיים'),
      item('guide', 'excel-to-zite-finance-crm-guide', 'Zite — מ-Excel לאפליקציית CRM', 'intermediate', true, 15, 'הפיכת גיליון לאפליקציה ללא קוד'),
    ],
  },

  // ─── TIER 3: MASTERY ──────────────────────────────────────────────────
  {
    slug: 'month-end-close',
    title: 'Month-End Close & Reporting',
    description: 'אוטומציה של סגירת חודש — מהתאמות ועד דוחות דירקטוריון',
    icon: '📋',
    tier: 'advanced',
    items: [
      item('blog', 'אימות-נתונים-לפני-הכל-אל-תתנו-ל-ai-לנתח-לפני-שווידאתם-ששורות', 'אימות נתונים לפני הכל', 'intermediate', true, 8, 'כלל #1: וולידציה לפני ניתוח'),
      item('prompt', 'reconciliation', 'Bank Reconciliation Matcher', 'intermediate', true, 5, 'התאמה בנקאית עם Fuzzy Logic'),
      item('prompt', 'journal-audit', 'Journal Entry Audit', 'advanced', true, 5, 'ביקורת פקודות יומן'),
      item('prompt', 'budget-variance', 'Budget Variance Report', 'intermediate', true, 5, 'דוח סטיות תקציב'),
      item('prompt', 'variance-commentary', 'Variance Commentary Writer', 'intermediate', true, 5, 'כתיבת הסברי סטיות לדירקטוריון'),
      item('resource', '50-ways-ai', '50 דרכים להשתמש ב-AI לסגירת חודש', 'intermediate', true, 45, '50 פרומפטים ב-8 קטגוריות סגירה'),
      item('blog', 'איך-לבצע-ניתוח-avb-תקציב-מול-ביצוע-ב-5-דקות-בלבד-בעזרת-claud', 'ניתוח AVB ב-5 דקות עם Claude', 'intermediate', true, 8, 'ניתוח Actual vs Budget מהיר'),
      item('blog', 'cash-flow-playground', 'Cash Flow Playground: מודל תרחישים', 'intermediate', true, 10, 'סימולציית תזרים דינמית'),
      item('lesson', 'cfo-ai-2', 'Claude ל-CFO: ניתוח ודשבורדים (וובינר)', 'intermediate', true, 60, 'וובינר 60 דקות — דשבורדים חיים ל-CFO'),
      item('lesson', 'excel-hell', 'Artifacts — מ-3 ימים ל-30 דקות (וובינר)', 'intermediate', true, 60, 'חיסכון דרמטי בזמן עם Artifacts'),
      item('blog', 'rev-rec-ai-agent', 'AI Agent ל-Revenue Recognition', 'advanced', true, 15, 'אוטומציה של ASC 606 / IFRS 15'),
      item('blog', 'מערכת-fpa-ai-שמסבירה-את-המספרים', 'מערכת FP&A שמסבירה את המספרים', 'advanced', true, 12, 'קונסולידציה רב-קבצית ויצירת נרטיב'),
    ],
  },

  {
    slug: 'dashboard-pro',
    title: 'Dashboard Pro with AI',
    description: 'דשבורדים פיננסיים אינטראקטיביים, ויזואליזציה, ו-KPI cards',
    icon: '📊',
    tier: 'advanced',
    items: [
      item('blog', 'ai-finance-dashboards-5-prompts', '5 דשבורדים חכמים שכל CFO צריך', 'intermediate', true, 10, '5 פרומפטים לדשבורדים HTML עצמאיים'),
      item('guide', 'ai-excel-dashboard', 'AI Dashboard Planning ב-Excel', 'beginner', true, 15, 'תכנון KPI ומבנה לפני שפותחים Excel'),
      item('resource', '12-shitot-avoda-dashboard-ai', '12 שיטות עבודה לדשבורדים עם Claude', 'intermediate', true, 30, 'מסגרת H·T·M·L לדשבורדים'),
      item('blog', 'claude-mobile-cfo-dashboard-decisions', 'מהטלפון לדשבורד חי: 3 שלבים', 'intermediate', true, 8, 'ארכיטקטורת דשבורד Mobile-First'),
      item('prompt', 'dashboard-summary', 'Financial Dashboard Summary', 'intermediate', true, 5, 'סינתוז נתונים לדשבורד'),
      item('prompt', 'kpi-analysis', 'KPI Performance Breakdown', 'intermediate', true, 5, 'פירוק KPI ו-drill-down'),
      item('blog', 'כך-תבנו-דאשבורד-cfo-אינטראקטיבי-תוך-דקות-בלי-it-ובלי-דליפת-נ', 'דשבורד CFO אינטראקטיבי תוך דקות', 'intermediate', true, 10, 'דשבורדים ללא IT עם Claude Artifacts'),
      item('guide', 'command-center', 'Copilot Command Center Dashboard', 'intermediate', true, 20, 'דשבורד מנהלים רב-מקורי'),
      item('resource', 'python-cfo', 'Python P&L Terminal', 'advanced', true, 35, 'דשבורד P&L אינטראקטיבי בדפדפן'),
      item('guide', 'power-bi-finance', 'דשבורדים עם AI לאנשי כספים', 'intermediate', true, 25, 'עיצוב דשבורדים, זיהוי אנומליות'),
    ],
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Get a topic cluster by slug */
export function getTopicCluster(slug: string): TopicCluster | undefined {
  return topicClusters.find((c) => c.slug === slug);
}

/** Get all clusters for a specific tier */
export function getClustersByTier(tier: DifficultyTier): TopicCluster[] {
  return topicClusters.filter((c) => c.tier === tier);
}

/** Get all unique content items across all clusters (deduplicated by id) */
export function getAllAcademyItems(): AcademyContentItem[] {
  const seen = new Set<string>();
  const result: AcademyContentItem[] = [];
  for (const cluster of topicClusters) {
    for (const itm of cluster.items) {
      if (!seen.has(itm.id)) {
        seen.add(itm.id);
        result.push(itm);
      }
    }
  }
  return result;
}

/** Count total items and premium items across all clusters */
export function getAcademyStats() {
  const all = getAllAcademyItems();
  return {
    totalItems: all.length,
    premiumItems: all.filter((i) => i.isPremium).length,
    freeItems: all.filter((i) => !i.isPremium).length,
    totalMinutes: all.reduce((sum, i) => sum + i.durationMinutes, 0),
    byType: {
      guides: all.filter((i) => i.contentType === 'guide').length,
      resources: all.filter((i) => i.contentType === 'resource').length,
      lessons: all.filter((i) => i.contentType === 'lesson').length,
      prompts: all.filter((i) => i.contentType === 'prompt').length,
      blogs: all.filter((i) => i.contentType === 'blog').length,
    },
  };
}

/** Build the URL for a content item based on its type */
export function getContentUrl(item: AcademyContentItem): string {
  switch (item.contentType) {
    case 'guide':
      return `/guides/${item.slug}`;
    case 'resource':
      return `/guides/${item.slug}`;
    case 'lesson':
      return `/lessons`;
    case 'prompt':
      return `/skill-vault`;
    case 'blog':
      return `/blog/${item.slug}`;
    default:
      return '#';
  }
}
