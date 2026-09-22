export type ProductCategory = 'all' | 'ar' | 'playbooks' | 'prompts' | 'free';

export interface DigitalProduct {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: string;
  priceNumeric: number;
  originalPrice?: string;
  category: ProductCategory;
  categoryLabel: string;
  coverImage?: string;
  gumroadUrl: string;
  smartbeeUrl?: string;
  internalUrl?: string;
  isFlagship?: boolean;
  isFeatured?: boolean;
  badge?: string;
  format: string;
  highlights: string[];
}

export const PRODUCT_CATEGORIES = [
  { key: 'all', label: 'כל המוצרים' },
  { key: 'ar', label: 'תזרים וחייבים (AR)' },
  { key: 'playbooks', label: 'Playbooks ומדריכים' },
  { key: 'prompts', label: 'פרומפטים ו-Engineering' },
  { key: 'free', label: 'חינמיים ו-Lead Magnets' },
] as const;

export const digitalProducts: DigitalProduct[] = [
  // 1. FLAGSHIP: AR Command Center
  {
    slug: 'ar-command-center',
    name: 'חמ״ל ניהול חייבים ותזרים ב-AI',
    tagline: 'AR Command Center v2.4 — דשבורד מנהלים אינטראקטיבי, מודל אקסל רב-ישותי ופרומפט מאסטר',
    description: 'מערכת עבודה שלמה לסמנכ״לי כספים, חשבים ומנהלי גבייה. כוללת חיזוי התנהגותי של מועדי פירעון (Median Drift), התאמות ספר ראשי אוטומטיות, ניהול מחלוקות ודשבורד מנהלים עצמאי.',
    price: '₪99',
    priceNumeric: 99,
    originalPrice: '₪199',
    category: 'ar',
    categoryLabel: 'תזרים וחייבים (AR)',
    coverImage: '/products/ar-command-center/dashboard-main.png',
    gumroadUrl: 'https://ronenamos.gumroad.com/l/command-center-ar',
    smartbeeUrl: 'https://ronenamos.gumroad.com/l/command-center-ar', // Will be updated to SmartBee direct payment link
    internalUrl: '/products/ar-command-center',
    isFlagship: true,
    isFeatured: true,
    badge: '🔥 מוצר הדגל',
    format: 'דשבורד HTML עצמאי + מודל אקסל 6 גיליונות + פרומפט',
    highlights: [
      'דשבורד מנהלים אינטראקטיבי חי (HTML עצמאי לחלוטין)',
      'מודל אקסל מקושר 6 גיליונות עם חישובי מריחת אשראי',
      'פרומפט מאסטר מותאם ל-ChatGPT ו-Claude',
      'הורדה מיידית • גישה לכל החיים ללא מנוי'
    ]
  },

  // 2. Chat GPT for Finance
  {
    slug: 'chatgpt-for-finance',
    name: 'Chat GPT for Finance — מדריך פרקטי',
    tagline: 'מדריך ממוקד צעד-אחר-צעד להפיכת בינה מלאכותית לכלי עבודה יומיומי בכספים',
    description: 'המדריך שמחליף שעות אקסל, מיילים וניתוחים ידניים. בנוי במיוחד עבור אנשי פיננסים וחשבונאות שרוצים להתחיל לעבוד תכלס עם ChatGPT במשימות אמיתיות.',
    price: '₪99',
    priceNumeric: 99,
    category: 'playbooks',
    categoryLabel: 'Playbooks ומדריכים',
    coverImage: 'https://public-files.gumroad.com/0nscsmkp3y4y0mq8j1mpawn92v9f',
    gumroadUrl: 'https://ronenamos.gumroad.com/l/ChatGPT',
    isFeatured: true,
    badge: '⭐ רב-מכר',
    format: 'קורס ומדריך דיגיטלי מלא',
    highlights: [
      'דוגמאות פיננסיות מעשיות מהשטח',
      'ניתוחי דוחות ואוטומציה של ניסוחים ומיילים',
      'חיסכון מיידי של שעות עבודה שבועיות'
    ]
  },

  // 3. 100 Tips Practical Guide
  {
    slug: 'ai-finance-100-tips',
    name: 'המדריך הפרקטי AI לכספים — 100 טיפים',
    tagline: '100 טיפים לייעול, חיסכון ודיוק עם AI במחלקת הכספים',
    description: 'הספר המעשי למנהלי כספים, רואי חשבון ואנשי Finance שרוצים להתחיל להשתמש ב-AI בעבודה היומיומית. בלי באזז, בלי תיאוריה מיותרת, ובלי להסתכן בדיוק ובאמינות.',
    price: '₪79',
    priceNumeric: 79,
    category: 'playbooks',
    categoryLabel: 'Playbooks ומדריכים',
    coverImage: 'https://public-files.gumroad.com/wtt8tmluhj4nzbadrsy9n22a4g17',
    gumroadUrl: 'https://ronenamos.gumroad.com/l/AI-100-tips',
    isFeatured: true,
    badge: 'מומלץ',
    format: 'ספר דיגיטלי (eBook / PDF)',
    highlights: [
      '100 מקרי שימוש ופתרונות מהירים',
      'שיטות עבודה בטוחות ללא דליפת מידע רגיש',
      'טיפים קצרים ליישום מיידי באקסל, מיילים וניתוחים'
    ]
  },

  // 4. 102 AI Finance Prompts
  {
    slug: '102-ai-finance-prompts',
    name: '102 דרכים ופרומפטים ל-AI למחלקות כספים',
    tagline: 'מאגר הפרומפטים המקצועי ביותר לרואי חשבון ומנהלי כספים',
    description: 'בנק פרומפטים מובנה ומוכן להעתקה-הדבקה: ניתוח יחסים פיננסיים, בדיקת סבירות, איתור חריגות בספר ראשי, התאמות בנק וניסוח מכתבי גבייה.',
    price: '₪69',
    priceNumeric: 69,
    category: 'prompts',
    categoryLabel: 'פרומפטים ו-Engineering',
    gumroadUrl: 'https://ronenamos.gumroad.com/l/102-ai-finance-prompts',
    format: 'קובץ פרומפטים מובנה + הסברים',
    highlights: [
      '102 פרומפטים נבדקו במחלקות כספים אמיתיות',
      'כולל תבניות משתנים למילוי מהיר',
      'מתאים ל-ChatGPT, Claude ו-Gemini'
    ]
  },

  // 5. Claude Code Guide
  {
    slug: 'claude-code-guide',
    name: 'המדריך המלא והמעשי ל-Claude Code בעברית',
    tagline: 'איך לרתום את סוכן ה-AI של Anthropic לעבודה עם דאטה, קוד ואוטומציות',
    description: 'מדריך מקיף ומעשי להטמעת כלי ה-CLI המהפכני של Claude בעבודה השוטפת: עיבוד קובצי נתונים כבדים, כתיבת סקריפטים פיננסיים ואוטומציה של משימות חוזרות.',
    price: '₪59',
    priceNumeric: 59,
    category: 'playbooks',
    categoryLabel: 'Playbooks ומדריכים',
    gumroadUrl: 'https://ronenamos.gumroad.com/l/claude-code-guide',
    format: 'מדריך דיגיטלי מקיף',
    highlights: [
      'התקנה והגדרה נכונה צעד-אחר-צעד',
      'פקודות עבודה מומלצות לניתוח קבצים פיננסיים',
      'טריקים מתקדמים להפקת דוחות אוטומטיים'
    ]
  },

  // 6. Claude Playbook for CFOs
  {
    slug: 'claude-playbook-cfo',
    name: 'Claude Playbook למנהלי כספים ו-CFOs',
    tagline: 'פלייבוק עבודה ממוקד לשימוש ב-Claude 3.5 / 3.7 בניתוחי עומק פיננסיים',
    description: 'מדריך ייעודי המדגים כיצד לנצל את היכולות האנליטיות המתקדמות של Claude בבניית תוכניות עסקיות, סימולציות תזרים, וניתוח דוחות דירקטוריון.',
    price: '₪49',
    priceNumeric: 49,
    category: 'playbooks',
    categoryLabel: 'Playbooks ומדריכים',
    gumroadUrl: 'https://ronenamos.gumroad.com/l/claude-playbook-cfo',
    format: 'פלייבוק עבודה דיגיטלי',
    highlights: [
      'שימוש ב-Artifacts ו-Projects של Claude',
      'ניתוח דוחות כספיים וביאורים מורכבים',
      'פרומפטים מוכנים לקבלת החלטות הנהלה'
    ]
  },

  // 7. 50 Ways Closing Month
  {
    slug: '50-ways-closing-month',
    name: '50 דרכים מעשיות לשימוש ב-AI לסגירת חודש',
    tagline: 'קיצור זמני סגירת חודש ורבעון באמצעות סוכני AI ופרומפטים חכמים',
    description: 'אוסף טכניקות ממוקדות שמקצרות ימי עבודה בבדיקת יתרות, התאמת כרטיסים, רישומי חתך (Accruals), ובדיקת דוחות הפרשי שער.',
    price: '₪49',
    priceNumeric: 49,
    category: 'playbooks',
    categoryLabel: 'Playbooks ומדריכים',
    gumroadUrl: 'https://ronenamos.gumroad.com/l/50-ways-closing-month',
    format: 'מדריך סגירת חודש',
    highlights: [
      'צ׳קליסט סגירה חודשית מואצת',
      'אוטומציה של ניתוחי שונות (Variance Analysis)',
      'בדיקות סבירות מבוססות בינה מלאכותית'
    ]
  },

  // 8. Claude in PowerPoint
  {
    slug: 'claude-powerpoint-guide',
    name: 'Claude ב-PowerPoint — מ-2 שעות ל-10 דקות',
    tagline: 'בניית מצגות הנהלה ודירקטוריון מבוססות נתונים פיננסיים במהירות שיא',
    description: 'שיטה מדויקת להפיכת טבלאות נתונים ודוחות גולמיים לשקפי מנהלים מעוצבים, חדים ומוכנים להצגה בתוך דקות בודדות.',
    price: '₪39',
    priceNumeric: 39,
    category: 'playbooks',
    categoryLabel: 'Playbooks ומדריכים',
    coverImage: 'https://public-files.gumroad.com/bhj9nizrbt2op4dl0717ajkunq3n',
    gumroadUrl: 'https://ronenamos.gumroad.com/l/claude-powerpoint-guide',
    format: 'מדריך + תבניות עבודה',
    highlights: [
      'מבנה שקפים מנצח למצגות תקציב ותוצאות',
      'המרת טקסט וטבלאות לוויזואליזציה מקצועית',
      'טריקים לכתיבת סיכומי מנהלים (Executive Summaries)'
    ]
  },

  // 9. Vibe Engineering Blocks (Hebrew)
  {
    slug: 'vibe-engineering-he',
    name: 'בלוקים להנדסת Vibe',
    tagline: 'תבניות ומודולים לבניית אפליקציות וכלים דיגיטליים ב-AI',
    description: 'מדריך ובלוקים מוכנים לפיתוח ממשקים, דשבורדים וכלי עבודה עצמאיים באמצעות מודלי שפה.',
    price: '₪39',
    priceNumeric: 39,
    category: 'prompts',
    categoryLabel: 'פרומפטים ו-Engineering',
    coverImage: 'https://public-files.gumroad.com/711pvmi3ks6qomb6ca8wva8abq21',
    gumroadUrl: 'https://ronenamos.gumroad.com/l/vibe-engineering-he',
    format: 'ספריית בלוקים וקוד',
    highlights: [
      'בלוקים מוכנים לממשקי משתמש ודשבורדים',
      'הנחיות ארכיטקטורה לפיתוח מהיר',
      'תמיכה מלאה בעברית ו-RTL'
    ]
  },

  // 10. The Practical Guide to AI in Finance (English)
  {
    slug: 'ai-100-tips-en',
    name: 'The Practical Guide to AI in Finance — 100 Tips',
    tagline: 'English edition: 100 practical tips for finance leaders and CFOs',
    description: 'The comprehensive English handbook for modern finance teams navigating generative AI and workflow automation.',
    price: '₪79',
    priceNumeric: 79,
    category: 'playbooks',
    categoryLabel: 'Playbooks ומדריכים',
    coverImage: 'https://public-files.gumroad.com/tmsxcpn6g8s6lvph9ux4had380wn',
    gumroadUrl: 'https://ronenamos.gumroad.com/l/AI-100-tips-en',
    format: 'Digital eBook (English)',
    highlights: [
      '100 hands-on tips & prompts',
      'Risk-free enterprise workflows',
      'Prompt templates for FP&A & Controllers'
    ]
  },

  // 11. FREE: Audit AI Junior Analyst
  {
    slug: 'audit-ai-junior-analyst',
    name: 'לבדוק AI כמו שבודקים אנליסט ג׳וניור',
    tagline: 'מסגרת עבודה מומלצת לבקרת איכות ואמינות של תוצרי בינה מלאכותית',
    description: 'איך מוודאים שהנתונים, הנוסחאות והתחזיות שה-AI מייצר מדויקים לחלוטין לפני שהם מגיעים לשולחן ההנהלה.',
    price: 'חינם',
    priceNumeric: 0,
    category: 'free',
    categoryLabel: 'חינמיים ו-Lead Magnets',
    gumroadUrl: 'https://ronenamos.gumroad.com/l/audit-ai-junior-analyst',
    badge: '🎁 מתנה',
    format: 'מדריך להורדה חופשית',
    highlights: [
      '5 שלבי בדיקה קריטיים לכל חישוב AI',
      'איך למנוע הזיות וטעויות בנוסחאות מורכבות',
      'צ׳קליסט בקרת איכות'
    ]
  },

  // 12. FREE: Interactive Book of Prompting
  {
    slug: 'interactive-book-of-prompting',
    name: 'ספר הפרומפטים העולמי — הנדסת AI',
    tagline: 'המדריך המקיף להנדסת פרומפטים בעולם הפיננסים והעסקים',
    description: 'ספר אינטראקטיבי המלמד עקרונות הנדסת פרומפטים מתקדמים, החל מ-Few-Shot ועד ל-Chain-of-Thought המותאם לעולם הפיננסי.',
    price: 'חינם',
    priceNumeric: 0,
    category: 'free',
    categoryLabel: 'חינמיים ו-Lead Magnets',
    coverImage: 'https://public-files.gumroad.com/wgtpg3e85jrvitjgp5w7hmuo0llp',
    gumroadUrl: 'https://ronenamos.gumroad.com/l/interactive-book-of-prompting',
    badge: '🎁 מתנה',
    format: 'ספר אינטראקטיבי',
    highlights: [
      'עקרונות פרומפטינג מתקדמים',
      'דוגמאות אינטראקטיביות להרצה',
      'מותאם לרואי חשבון ואנליסטים'
    ]
  }
];

export function getAllProducts(): DigitalProduct[] {
  return digitalProducts;
}

export function getProductBySlug(slug: string): DigitalProduct | undefined {
  return digitalProducts.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): DigitalProduct[] {
  return digitalProducts.filter((p) => p.isFeatured);
}
