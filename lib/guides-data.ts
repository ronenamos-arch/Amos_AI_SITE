export type GuideCategory =
  | 'Claude'
  | 'ChatGPT'
  | 'אוטומציה'
  | 'Excel'
  | 'Power BI'
  | 'NotebookLM'
  | 'מחלקות כספים';

export const CATEGORIES: readonly GuideCategory[] = [
  'Claude',
  'ChatGPT',
  'אוטומציה',
  'Excel',
  'Power BI',
  'NotebookLM',
  'מחלקות כספים',
] as const;

export interface Guide {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  category: GuideCategory;
  tags: string[];
  gammaUrl: string;
  thumbnail: string | null;
  duration: string;
  isPremium: boolean;
  publishedAt: string;
}

export const guides: Guide[] = [
  {
    slug: 'copilot-guide',
    title: 'Copilot המדריך המלא',
    description: 'המדריך הפרקטי: 5 תכונות שישנו את עבודתכם',
    category: 'אוטומציה',
    tags: ['Copilot', 'Automation', 'Productivity'],
    gammaUrl: 'https://gamma.app/embed/bfzwd8lj4ugiwoj',
    thumbnail: '/guides/copilot-guide.png',
    duration: "13 דק'",
    isPremium: true,
    publishedAt: '2026-05-31',
  },
  {
    slug: 'projects',
    title: 'Projects ב-AI: מכפיל הכוח שאנשי הכספים עוד לא מנצלים מספיק',
    description: 'Projects הם סביבת עבודה ייעודית בתוך כלי AI שמאפשרת להגדיר פעם אחת את ההקשר, הידע ודרך העבודה, ולשמר אותם לאורך כל השיחות. במקום לפתוח שיחה ריקה בכל פעם, אתם נכנסים לסביבה שכבר "מכירה" אתכם.',
    category: 'Claude',
    tags: ['Claude', 'Projects', 'Workflow', 'Productivity'],
    gammaUrl: 'https://gamma.app/embed/l38cdtlw865g0nx',
    thumbnail: '/guides/projects-ai.png',
    duration: "12 דק'",
    isPremium: false,
    publishedAt: '2026-05-31',
  },
  {
    slug: 'claude-routines-fpna',
    title: 'Claude Routines למנהלי כספים וצוותי FP&A',
    description: 'Claude השיקה יכולת חדשה בשם Routines בתוך פלטפורמת Claude Code. מדובר ב-workflow אוטומטי שרץ בענן של Anthropic — על פי לוח זמנים קבוע או בהפעלה חיצונית — ומאפשר לצוות הפיננסי לבצע עבודה חוזרת בצורה אוטומטית ועקבית.',
    category: 'Claude',
    tags: ['Claude', 'Automation', 'Workflow', 'Finance Ops'],
    gammaUrl: 'https://gamma.app/embed/s4fn1w5ua2oqrsh',
    thumbnail: '/guides/claude-routines-pnl.png',
    duration: "15 דק'",
    isPremium: true,
    publishedAt: '2026-05-31',
  },
  {
    slug: 'chatgpt-finance-guide-hebrew',
    title: 'ChatGPT לפיננסים: 20 מסגרות עבודה',
    description: 'למדו איך לכתוב פרומפטים טובים יותר לפיננסים עם 20 מסגרות עבודה ב־ChatGPT, כולל דוגמאות מעשיות ל־FP&A, תקציב, תזרים וסקירות הנהלה.',
    category: 'ChatGPT',
    tags: ['ChatGPT', 'Prompting', 'Finance Ops'],
    gammaUrl: 'https://gamma.app/embed/f5xvsd0pfybxfa0',
    thumbnail: '/guides/chatgpt-20-frameworks.png',
    duration: "15 דק'",
    isPremium: false,
    publishedAt: '2026-05-30',
  },
  {
    slug: 'claude-live-artifacts',
    title: 'מדריך Claude Live Artifacts לצוותי Finance ו-FP&A',
    description: 'מדריך פרקטי בעברית לשימוש ב-Claude Live Artifacts עבור צוותי Finance ו-FP&A. תלמדו איך לבנות דשבורדים חיים, לחבר מקורות נתונים, ולהפוך שאלות פיננסיות חוזרות לממשק עבודה אינטראקטיבי ומתעדכן.',
    category: 'Claude',
    tags: ['Claude', 'Dashboard', 'Finance Ops'],
    gammaUrl: 'https://gamma.app/embed/n4yrpzmk00kqge4',
    thumbnail: '/guides/claude-live-artifacts.png',
    duration: "15 דק'",
    isPremium: true,
    publishedAt: '2026-05-30',
  },
  {
    slug: 'zite-MRR-dashboard',
    title: 'מ‑Excel חוזים ללוח שליטה ב‑Zite: Retainer Control Panel לצוותי כספים',
    description: 'מדריך מעשי שמראה איך להפוך גיליון חוזים וריטיינרים באקסל לאפליקציית Retainer Control Panel ב‑Zite: Dashboard ל‑MRR/ARR, חידושי חוזים, מסכי Clients ו‑Contracts, כולל קובץ Excel לדוגמה והפרומפט המלא.',
    category: 'מחלקות כספים',
    tags: ['Excel', 'Dashboard', 'CFO', 'Finance Ops'],
    gammaUrl: 'https://gamma.app/embed/j2pen9r6uzhux5h',
    thumbnail: '/guides/zite-retainer-dashboard.png',
    duration: "15 דק'",
    isPremium: true,
    publishedAt: '2026-05-19',
  },
  {
    slug: 'excel-to-zite-finance-crm-guide',
    title: 'מ‑Excel מבולגן לאפליקציית CRM פיננסית חכמה: מדריך Zite לאנשי כספים',
    description: 'מדריך שלב‑אחר‑שלב לאנשי כספים למעבר מגיליון Excel כבד ומסוכן לאפליקציית CRM פיננסית חכמה ב‑Zite – עם קשרי טבלאות, בקרת גישה ו‑Audit Trail.',
    category: 'Excel',
    tags: ['Excel to app', 'Automation', 'CRM ל‑אנשי כספים', 'רואי חשבון ו‑CFOs', 'אפליקציות ללא קוד'],
    gammaUrl: 'https://gamma.app/embed/Excel-Zite-gh8qt3uzu6lwxhw',
    thumbnail: '/guides/building-custom-tools.png',
    duration: "15 דק'",
    isPremium: false,
    publishedAt: '2026-05-13',
  },
  {
    slug: 'finance-teams',
    title: 'מחלקות כספים — איך בונים צוות פיננסי שעובד חכם יותר',
    description: 'מדריך לבניית מחלקת כספים מודרנית עם תהליכים ברורים, אוטומציה, בקרות, dashboards ויכולת לספק להנהלה תמונה ניהולית מהירה.',
    category: 'מחלקות כספים',
    tags: ['Finance Teams', 'Finance Ops', 'Reporting', 'Controls', 'Operations'],
    gammaUrl: 'https://gamma.app/embed/t7lt8p1wgq7fgw6',
    thumbnail: '/guides/finance-teams.png',
    duration: "20 דק'",
    isPremium: true,
    publishedAt: '2026-05-11',
  },
  {
    slug: 'power-bi',
    title: 'Power BI לאנשי כספים — לראות את המספרים אחרת',
    description: 'איך להשתמש ב-Power BI כדי לבנות דשבורדים פיננסיים, לשפר visibility, לזהות חריגות ולתמוך בהחלטות הנהלה.',
    category: 'Power BI',
    tags: ['Power BI', 'Dashboard', 'BI', 'Finance', 'KPI'],
    gammaUrl: 'https://gamma.app/embed/m5hn9hn3gij6t78',
    thumbnail: '/guides/power-bi.png',
    duration: "18 דק'",
    isPremium: true,
    publishedAt: '2026-05-11',
  },
  {
    slug: 'chatgpt',
    title: 'ChatGPT לאנשי כספים — המדריך השלם',
    description: 'מדריך פרקטי לשימוש ב-ChatGPT עבור חשבים, CFOs, רואי חשבון ואנליסטים לצורך ניסוח, ניתוח, סיכום, תובנות וייעול עבודה.',
    category: 'ChatGPT',
    tags: ['ChatGPT', 'Prompting', 'Finance', 'Accounting', 'Productivity'],
    gammaUrl: 'https://gamma.app/embed/mfw4zkmzk3madvh',
    thumbnail: '/guides/chatgpt.png',
    duration: "15 דק'",
    isPremium: true,
    publishedAt: '2026-05-11',
  },
  {
    slug: 'automation',
    title: '5 אוטומציות שכל צוות כספים צריך',
    description: 'חמש אוטומציות פרקטיות שיכולות לחסוך לצוות הכספים שעות עבודה בכל חודש, לשפר בקרה ולהפחית עבודה ידנית.',
    category: 'אוטומציה',
    tags: ['Automation', 'Finance Ops', 'Workflow', 'Controls', 'Efficiency'],
    gammaUrl: 'https://gamma.app/embed/wq6xfw8y29upt2y',
    thumbnail: '/guides/automation.png',
    duration: "20 דק'",
    isPremium: true,
    publishedAt: '2026-05-11',
  },
  {
    slug: 'excel-ai',
    title: 'Excel + AI — האנליסט החדש שלך',
    description: 'שילוב של Excel עם Claude/ChatGPT ליצירת ניתוחים מורכבים, נוסחאות, ניקוי דאטה ותובנות ניהוליות במהירות גבוהה יותר.',
    category: 'Excel',
    tags: ['Excel', 'AI', 'Analysis', 'Finance', 'Productivity'],
    gammaUrl: 'https://gamma.app/embed/binzzaidm00b3s1',
    thumbnail: '/guides/excel-ai.png',
    duration: "16 דק'",
    isPremium: true,
    publishedAt: '2026-05-11',
  },
  {
    slug: 'claude-cowork',
    title: 'המדריך המלא לעבודה עם Claude Cowork — עקרון 80/20',
    description: 'המדריך בנוי על עיקרון ה-80/20: רוב התוצאות מגיעות ממיעוט הפעולות. לכן חילקנו אותו כך שתדעו בדיוק מה חשוב ללמוד קודם — ומה שמור למקצוענים.',
    category: 'Claude',
    tags: ['Claude', 'Claude Cowork', 'Collaboration', 'Productivity'],
    gammaUrl: 'https://gamma.app/docs/Claude-Cowork-gkvc6xn43v3htzd',
    thumbnail: '/guides/claude-cowork.png',
    duration: "15 דק'",
    isPremium: true,
    publishedAt: '2026-05-11',
  },
  {
    slug: 'ai-agents-finance',
    title: '5 סוכני AI שכל צוות כספים צריך להכיר',
    description: 'האם AI באמת יכול לעזור בעבודה הפיננסית היומיומית — או שזה בעיקר רעש? AI לא מחליף שיקול דעת מקצועי, אבל הוא כן מתחיל להיות מאוד שימושי דווקא בחלקים הכי שוחקים של העבודה — התאמות, בדיקות, בניית טיוטות, סקירות ראשוניות, וניתוח ראשוני של נתונים.',
    category: 'מחלקות כספים',
    tags: ['AI', 'Agents', 'Automation', 'Finance', 'Productivity'],
    gammaUrl: 'https://gamma.app/embed/5-AI--w12mxql861zjz5m',
    thumbnail: '/guides/רקע פיננסי.png',
    duration: "20 דק'",
    isPremium: true,
    publishedAt: '2026-05-11',
  },
  {
    slug: 'codex',
    title: 'מדריך Codex App לרואי חשבון 2026: מ-0 ל-AI מלא ב-30 דקות',
    description: 'מדריך מלא לכלי Codex App של OpenAI לרואי חשבון בהייטק. למד להוריד, להקים, ולבנות דוחות תזרים בעשר דקות. 70% חיסכון זמן + דוגמאות חיות.',
    longDescription: 'Codex היא אפליקציית desktop חדשה של OpenAI עם multi-agent AI שמנתחת קבצים מקומיים (Excel, PDF, CSV). בניית דוחות תזרים, סידור חשבוניות וניתוח FP&A - הכל בדקות בודדות במקום שעות. פתרון מושלם לסטארטאפים ורואי חשבון בהייטק.',
    category: 'ChatGPT',
    tags: ['Finance Ops', 'Automation', 'CFO'],
    gammaUrl: 'https://gamma.app/embed/4f2dayq2vlfz7sn',
    thumbnail: '/guides/codex.png',
    duration: "30 דק'",
    isPremium: false,
    publishedAt: '2026-05-04',
  },
  {
    slug: 'claude-code-loop',
    title: 'איך לחסוך שעות בשבוע בלי לדעת לתכנת? אוטומציית /loop עם Claude Code',
    description: 'אתם שורפים שעות יקרות על משימות רפטטיביות ודוחות שחוזרים על עצמם, במקום להתעסק במה שבאמת מביא ערך. האוטומציה הזו תעשה עבורכם את העבודה השחורה – בעזרת פקודת /loop הפשוטה ב-Claude Code, תוכלו להריץ תהליכים בלופ במרחק של פרומפט אחד (וגם אם בחיים לא כתבתם שורת קוד). הגיע הזמן להפסיק לעבוד קשה, ולהתחיל לעבוד חכם.',
    category: 'אוטומציה',
    tags: ['Claude Code', 'Automation', 'Workflow'],
    gammaUrl: 'https://gamma.app/docs/1-loop--qxcrkdjnzcrb6yn',
    thumbnail: '/guides/loop.png',
    duration: "11 דק'",
    isPremium: false,
    publishedAt: '2026-05-01',
  },
  {
    slug: 'b2b-claude-vibe-prospecting',
    title: 'איך למצוא לקוחות פרימיום ב-60 שניות? אוטומציית לידים לרואי חשבון עם Claude AI',
    description: 'יושב לכם כסף על הרצפה במשרד, ואתם פשוט דורכים עליו. הלידים המדויקים ביותר שלכם נמצאים במרחק פרומפט אחד – הגיע הזמן שתאספו אותם ותפסיקו לבזבז זמן על חיפושים ידניים.',
    category: 'Claude',
    tags: ['Claude', 'Automation', 'Workflow'],
    gammaUrl: 'https://gamma.app/docs/B2B-Claude-Vibe-Prospecting-mrh1bqt9jp80hrb',
    thumbnail: '/guides/vibe-prospecting.png',
    duration: "12 דק'",
    isPremium: false,
    publishedAt: '2026-04-29',
  },
  {
    slug: 'live-artifacts-claude',
    title: 'Live Artifacts ב-Claude – המדריך המלא',
    description: 'כיצד לבנות דאשבורדים חיים לניהול פיננסי חכם – מדריך שלב-אחר-שלב לרואי חשבון ומנהלי כספים בישראל.',
    category: 'Claude',
    tags: ['Claude', 'Dashboard', 'Finance Ops'],
    gammaUrl: 'https://gamma.app/docs/Live-Artifacts-Claude--tc34b99focp2u95',
    thumbnail: '/guides/artifacts.jpg',
    duration: "10 דק'",
    isPremium: false,
    publishedAt: '2026-04-26',
  },
  {
    slug: 'subagents',
    title: 'Subagents — קלוד שעובד כמו צוות שלם',
    description: 'איך לבנות צוות סוכנים שעובד בשבילך 24/7 — מהבסיס של Claude Code ועד delegation מתקדם.',
    category: 'Claude',
    tags: ['Subagents', 'Workflow'],
    gammaUrl: 'https://gamma.app/docs/7-Subagents--ptensygek0sxy54',
    thumbnail: '/guides/subagents.png',
    duration: "12 דק'",
    isPremium: false,
    publishedAt: '2026-04-26',
  },
  {
    slug: 'claude-code-checkpoints',
    title: 'Claude Code Checkpoints — שמירה חכמה של עבודה',
    description: 'כל מה שצריך לדעת על Checkpoints ב-Claude Code — איך לשחזר, להשוות גרסאות ולא לאבד שום שינוי.',
    category: 'Claude',
    tags: ['Claude Code', 'Productivity'],
    gammaUrl: 'https://gamma.app/docs/Claude-Code-Checkpoints-81xx84cs1vbpj8b',
    thumbnail: '/guides/checkpoints.jpg',
    duration: "8 דק'",
    isPremium: false,
    publishedAt: '2026-04-25',
  },
  {
    slug: 'Repeatable-Routines',
    title: 'תזמן את קלוד כמו עובד שמגיע לבד',
    description: 'מדריך פרקטי שמראה איך להגדיר Repeatable Routines ב- Claude כדי להריץ אוטומטית משימות פיננסיות קבועות – מדוחות חוזרים ועד מעקב אחרי חייבים.',
    category: 'Claude',
    tags: ['Claude'],
    gammaUrl: 'https://gamma.app/docs/Untitled-wpdzhezkj470s92',
    thumbnail: '/guides/routines.png',
    duration: "10 דק'",
    isPremium: false,
    publishedAt: '2026-04-24',
  },
];

function sortByDateDesc(list: Guide[]): Guide[] {
  return [...list].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getAllGuides(): Guide[] {
  return sortByDateDesc(guides);
}

export function getGuidesByCategory(category: GuideCategory | 'all'): Guide[] {
  if (category === 'all') return sortByDateDesc(guides);
  return sortByDateDesc(guides.filter((g) => g.category === category));
}

export function searchGuides(query: string): Guide[] {
  const q = query.trim().toLowerCase();
  if (!q) return sortByDateDesc(guides);
  const matched = guides.filter((g) => {
    const haystack = [
      g.title,
      g.description,
      g.category,
      ...g.tags,
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(q);
  });
  return sortByDateDesc(matched);
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug && g.gammaUrl !== '#');
}

export function getRelatedGuides(slug: string, limit = 3): Guide[] {
  const current = guides.find((g) => g.slug === slug);
  const real = guides.filter((g) => g.gammaUrl !== '#' && g.slug !== slug);
  const sameCategory = sortByDateDesc(real.filter((g) => g.category === current?.category));
  const others = sortByDateDesc(real.filter((g) => g.category !== current?.category));
  return [...sameCategory, ...others].slice(0, limit);
}

export function getCategoryCounts(): Record<GuideCategory | 'all', number> {
  const counts = {
    all: guides.length,
    Claude: 0,
    ChatGPT: 0,
    'אוטומציה': 0,
    Excel: 0,
    'Power BI': 0,
    NotebookLM: 0,
    'מחלקות כספים': 0,
  } as Record<GuideCategory | 'all', number>;
  for (const g of guides) {
    counts[g.category] += 1;
  }
  return counts;
}
