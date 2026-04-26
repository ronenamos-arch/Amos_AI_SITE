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
  {
    slug: 'chatgpt-finance-guide',
    title: 'ChatGPT לאנשי כספים — המדריך השלם',
    description: 'איך להפיק מ-ChatGPT עבודה ברמת אנליסט בכיר. פרומפטים, דוגמאות ושיטות עבודה.',
    category: 'ChatGPT',
    tags: ['ChatGPT', 'Prompting'],
    // TODO: Add real Gamma URL
    gammaUrl: '#',
    thumbnail: null,
    duration: "15 דק'",
    isPremium: false,
    publishedAt: '2026-04-23',
  },
  {
    slug: '5-finance-automations',
    title: '5 אוטומציות שכל צוות כספים צריך',
    description: 'אוטומציות שחוסכות 10+ שעות בחודש — מסגירת חודש ועד התאמות בנקים.',
    category: 'אוטומציה',
    tags: ['Automation', 'Finance Ops'],
    // TODO: Add real Gamma URL
    gammaUrl: '#',
    thumbnail: null,
    duration: "20 דק'",
    isPremium: false,
    publishedAt: '2026-04-22',
  },
  {
    slug: 'excel-ai-analyst',
    title: 'Excel + AI — האנליסט החדש שלך',
    description: 'שילוב של Excel עם Claude/ChatGPT ליצירת ניתוחים מורכבים בלחיצת כפתור.',
    category: 'Excel',
    tags: ['Excel', 'AI'],
    // TODO: Add real Gamma URL
    gammaUrl: '#',
    thumbnail: null,
    duration: "14 דק'",
    isPremium: false,
    publishedAt: '2026-04-21',
  },
  {
    slug: 'cfo-dashboard-powerbi',
    title: 'דשבורד CFO ב-Power BI מאפס',
    description: 'שלב-אחרי-שלב לבניית דשבורד שמדבר בשפה של מנכ"לים — KPIs, drill-down ו-mobile-ready.',
    category: 'Power BI',
    tags: ['Power BI', 'Dashboard'],
    // TODO: Add real Gamma URL
    gammaUrl: '#',
    thumbnail: null,
    duration: "22 דק'",
    isPremium: false,
    publishedAt: '2026-04-20',
  },
  {
    slug: 'ai-finance-roadmap',
    title: 'מחלקת כספים מבוססת-AI — Roadmap',
    description: 'איך להפוך מחלקת כספים שמרנית למחלקה שמובילה את הארגון בעזרת AI.',
    category: 'מחלקות כספים',
    tags: ['CFO', 'Strategy'],
    // TODO: Add real Gamma URL
    gammaUrl: '#',
    thumbnail: null,
    duration: "18 דק'",
    isPremium: false,
    publishedAt: '2026-04-19',
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
