export type ToolCategory =
  | 'automations'
  | 'erp'
  | 'financial-close'
  | 'financial-modeling'
  | 'fintech'
  | 'fpa';

export type Tool = {
  name: string;
  slug: string;
  category: ToolCategory;
  categoryLabel: string;
  descriptionHe: string;
  descriptionEn?: string;
  href: string;
  isIsraeli?: boolean;
};

export const CATEGORIES: { key: 'all' | ToolCategory; label: string }[] = [
  { key: 'all', label: 'הכל' },
  { key: 'automations', label: 'אוטומציה' },
  { key: 'erp', label: 'ERP' },
  { key: 'financial-close', label: 'סגירה פיננסית' },
  { key: 'financial-modeling', label: 'מידול פיננסי' },
  { key: 'fintech', label: 'Fintech' },
  { key: 'fpa', label: 'FP&A' },
];

export const tools: Tool[] = [
  {
    name: 'Traild',
    slug: 'traild',
    category: 'automations',
    categoryLabel: 'אוטומציה',
    descriptionHe:
      'Traild מגדירה מחדש את תהליך חשבונות לתשלום (AP) על ידי שילוב אינטגרציה עמוקה עם ERP, AI מתקדם וראיות real-time. המערכת אוטומטית מאשרת חשבוניות בסיכון נמוך, מסמנת סיכונים גבוהים עם ציון סיכון וזיהוי הונאות, ומטפלת בתעשיות מורכבות עם PO matching, תשלומי B2B ואינטגרציה ל-NetSuite, SAP ו-Xero.',
    href: 'https://traildsoftware.com',
  },
  {
    name: 'Sequence',
    slug: 'sequence',
    category: 'automations',
    categoryLabel: 'אוטומציה',
    descriptionHe:
      'Sequence היא פלטפורמת Revenue המבוססת AI שמאחדת CPQ, Billing ו-Revenue Recognition למנגנון אוטומטי אחד. מיועדת לחברות B2B מודרניות, היא מאפשרת גבייה ללא שגיאות על עסקאות מורכבות בקנה מידה גדול, עם תמיכה במחירים גמישים, חוזים אוטומטיים ו-Revenue Recognition לפי ASC 606.',
    href: 'https://getsequence.io',
  },
  {
    name: 'Nilus',
    slug: 'nilus',
    category: 'automations',
    categoryLabel: 'אוטומציה',
    descriptionHe:
      'Nilus AI היא פלטפורמת ניהול תזרים מזומנים דור-הבא שמשנה את ניהול ה-Treasury. באמצעות AI Agents שמבצעים תחזית, פיוס ואופטימיזציית נזילות, Nilus מאפשרת לצוותי כספים לבצע פעולות ממוסגרות עם מסגרת שקופה וניתנת לביקורת, תוך הפחתה של עד 80% בעבודה ידנית.',
    href: 'https://nilus.com',
  },
  {
    name: 'NetSuite',
    slug: 'netsuite',
    category: 'erp',
    categoryLabel: 'ERP',
    descriptionHe:
      'NetSuite הוא ה-ERP המוביל בענן בעולם, המספק פלטפורמה אחת מאוחדת שכוללת ERP, Financials, CRM, eCommerce וניהול הון אנושי. מהימן על ידי למעלה מ-43,000 לקוחות גלובלית, NetSuite מחבר כל היבט של הארגון למקור אמת יחיד — עם AI מובנה, ניהול גלובלי ו-analytics בזמן אמת.',
    href: 'https://www.netsuite.com',
  },
  {
    name: 'Campfire',
    slug: 'campfire',
    category: 'erp',
    categoryLabel: 'ERP',
    descriptionHe:
      'Campfire הוא ERP AI-native שנועד להכפיל את תפוקת הצוות שלך. בנוי לצמיחה מהירה ולהתרחבויות, הוא מספק פלטפורמה אחת ומאוחדת לספר חשבונות ראשי, אוטומציית הכנסות, דיווח בזמן אמת וניהול סגירה פיננסית. המטרה: לאוטומט את עבודת החשבונאות החוזרת שאף אחד לא רוצה לעשות.',
    href: 'https://campfire.ai',
  },
  {
    name: 'FloQast',
    slug: 'floqast',
    category: 'financial-close',
    categoryLabel: 'סגירה פיננסית',
    descriptionHe:
      'FloQast היא פלטפורמת טרנספורמציה חשבונאית מבוססת AI, שמבטלת עבודה ידנית על ידי אוטומציה של פיוסים (Reconciliations), follow-ups ותהליך ה-Record-to-Report כולו. AI Agents ממירים מכינים למעיינים ומבטיחים שהארגון תמיד מוכן לביקורת, עם עד 40-80% אוטומציה ללא צורך בקוד.',
    href: 'https://www.floqast.com',
  },
  {
    name: 'Numeric',
    slug: 'numeric',
    category: 'financial-close',
    categoryLabel: 'סגירה פיננסית',
    descriptionHe:
      'Numeric היא פלטפורמת AI-Native לאוטומציה של Close מורכב, שמאחדת ניהול סגירה, דיווח ומזומן לצוותי חשבונאות ארגוניים. היא מתחברת ישירות ל-ERP, משלבת bank feeds ועיבוד מסמכים לאוטומציית פיוסים, cash matching (90% אוטומטי), ניתוח flux ומעקב בזמן אמת.',
    href: 'https://www.numeric.io',
  },
  {
    name: 'Endex',
    slug: 'endex',
    category: 'financial-modeling',
    categoryLabel: 'מידול פיננסי',
    descriptionHe:
      'Endex הוא AI Agent מוסדי-רמה, native ל-Excel, שנבנה ספציפית לצוותי Finance ארגוניים. מגובה OpenAI, הוא מאיץ מידול פיננסי וניתוח נתונים עם LLMs מותאמים לכספים, גישה מאוחדת לנתונים, המרת PDF לטבלה ובדיקות לביקורת ואבטחה ברמה ארגונית.',
    href: 'https://endex.ai',
  },
  {
    name: 'Nummo',
    slug: 'nummo',
    category: 'financial-modeling',
    categoryLabel: 'מידול פיננסי',
    descriptionHe:
      'Nummo הוא תוכנת ספרדשיט AI-Native הראשונה בעולם עם אינטגרציה פתוחה, שנועדה לשמש כ-workflow engine הראשי לכלל התעשיות. תומכת בהוראות שפה טבעית (Prompt-to-Action) לשינויים בגיליון, בדיקת שגיאות פרואקטיבית, ייבוא נתונים חלק וגרפים סמנטיים למודלים.',
    href: 'https://www.nummo.ai',
  },
  {
    name: 'Lumanu',
    slug: 'lumanu',
    category: 'fintech',
    categoryLabel: 'Fintech',
    descriptionHe:
      'Lumanu היא פלטפורמת תשלומים ועמידה ברגולציה (Compliance) שנבנתה לכלכלת היוצרים. מהימנה על ידי מאות מותגים וסוכנויות גלובליות, היא מייעלת את תהליך ה-Onboarding והתשלום עבור משפיענים, שותפים (Affiliates) וספקים — ומאפשרת לצוותי Marketing לנוע מהר יותר בעוד צוותי כספים מקבלים שליטה ונראות מלאה.',
    href: 'https://lumanu.io',
  },
  {
    name: 'Airwallex',
    slug: 'airwallex',
    category: 'fintech',
    categoryLabel: 'Fintech',
    descriptionHe:
      'Airwallex היא פלטפורמת הפיננסים והתשלומים המובילה לעסקים גלובליים שמבקשים להתרחב ללא גבולות. מהימנה על ידי מעל 200,000 חברות בעולם, היא מאחדת חשבונות עסקיים גלובליים (70+ מדינות), קבלת תשלומים (180+ מדינות), ניהול הוצאות, כרטיסי חיוב ארגוניים ואינטגרציות אוטומטיות.',
    href: 'https://www.airwallex.com',
  },
  {
    name: 'Lucanet',
    slug: 'lucanet',
    category: 'fpa',
    categoryLabel: 'FP&A',
    descriptionHe:
      'Lucanet היא פלטפורמת CFO Solution מקיפה לעידן המודרני של הכספים. היא מספקת workflows מאוחדים ופתרונות ארגוניים שמהפכים נתונים מפוצלים למקור אמת אסטרטגי אחד. כוללת: Consolidation, xP&A, ESG Reporting, Tax Compliance וניהול Cash Management — עם ארכיטקטורת AI-Native ו-300+ ETL adapters.',
    href: 'https://www.lucanet.com',
  },
  {
    name: 'Jedox',
    slug: 'jedox',
    category: 'fpa',
    categoryLabel: 'FP&A',
    descriptionHe:
      'Jedox מספקת תוכנת FP&A מבוססת AI שמאפשרת לצוותי כספים גלובליים "Superplännen" — כלומר, להפוך תהליכי תכנון, תחזית וניהול ביצועים לאוטומטיים לחלוטין. JedoxAI הוא מנוע Agentic AI רב-שכבתי שמבין את ההקשר העסקי ספציפי, עם אינטגרציה חלקה וממשק Excel-like.',
    href: 'https://www.jedox.com',
  },
  {
    name: 'Switch-io',
    slug: 'switch-io',
    category: 'fpa',
    categoryLabel: 'FP&A',
    descriptionHe:
      'Switch-IO היא פלטפורמת AI שמשמשת כמנוע אחיד לניהול פיננסי אסטרטגי בזמן אמת. היא ממזגת בין Business Intelligence (BI) לבין FP&A, מאפשרת לצוותי הנהלה לעבור מדיווח ידני לניווט פרואקטיבי — על ידי שילוב נתונים מפוצלים לפלטפורמה אחת חלקה.',
    href: 'https://www.switch.io',
  },
  {
    name: 'Datarails',
    slug: 'datarails',
    category: 'fpa',
    categoryLabel: 'FP&A',
    descriptionHe:
      'Datarails היא פלטפורמת FP&A ישראלית (Tel Aviv + New York) שמאפשרת לצוותי כספים לעבוד עם Excel שלהם — אוטומציית Consolidation, דיווח, תקצוב ו-AI FP&A Genius. גייסה $175M כולל סיבוב C משמעותי בשנים האחרונות.',
    href: 'https://www.datarails.com',
    isIsraeli: true,
  },
];
