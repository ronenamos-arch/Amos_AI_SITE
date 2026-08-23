import type { GuideCategory } from "@/lib/guides-data";

export interface Resource {
    slug: string;
    title: string;
    /** One-liner for the card and the meta description. */
    description: string;
    /** Body copy for the preview page at /guides/<slug> — this is what search engines read. */
    summary: string;
    category: GuideCategory;
    tags: string[];
    keywords: string[];
    /** Screenshot of the resource itself, captured from content/resources/<contentFile>. */
    thumbnail: string;
    duration: string;
    /**
     * PLACEHOLDER, sort key only. The real publication dates are not recorded anywhere in
     * the repo, so /guides/<slug> deliberately hides the date and omits it from the JSON-LD
     * for resource entries. Replace these with the actual dates and the date will show.
     */
    publishedAt: string;
    contentFile: string;
    free?: boolean;
    /** ISO date; resource is free until this date, then premium-only. */
    freeUntilDate?: string;
}

/** Whether a resource is currently accessible without a subscription. */
export function isResourceCurrentlyFree(resource: Resource): boolean {
    if (resource.free) return true;
    if (resource.freeUntilDate) return new Date() < new Date(resource.freeUntilDate);
    return false;
}

export const resources: Resource[] = [
    {
        slug: "50-ways-ai",
        title: "50 דרכים להשתמש ב-AI לסגירת חודש",
        description: "50 שימושים מעשיים ב-AI לאנשי כספים.",
        summary:
            "סגירת החודש היא התהליך שאוכל הכי הרבה שעות בצוות הכספים, והוא גם התהליך שהכי קל לקצר עם AI — כי רובו חוזר על עצמו. המשאב הזה אוסף 50 פרומפטים מוכנים להעתקה, מסודרים בשמונה קטגוריות: אוטומציה וקוד, התאמות, דיווח, ניתוח, קוד ו-APIs, תקשורת, וביקורת ובקרות.\n\nכל פרומפט נכתב סביב משימה אמיתית מתהליך הסגירה ולא סביב הדגמה תיאורטית: ייבוא מאזן בוחן מה-ERP דרך API או CSV וניקוי שלו, סקריפט Python להתאמות בנקאיות עם fuzzy matching על התיאורים והתאמה מדויקת על הסכומים, מאקרו VBA שמסנן תנועות יומן לפי תאריך ומסמן שורות שבהן חובה ≠ זכות, אוטומציית מייל שמפיצה סטטוס סגירה יומי מגיליון מעקב משותף, זרימת Power Automate שמנתבת הפרשות מעל סף מסוים לאישור מנהל הכספים דרך Teams, וניתוח סטיות שמחזיר הסבר של שתי שורות בשפה עסקית לכל סטייה מהותית — מוכן להיכנס ל-CFO pack.\n\nהפרומפטים מנוסחים כך שיעבדו ב-Claude, ב-ChatGPT וב-Copilot, ומגיעים עם סינון לפי קטגוריה כדי למצוא את מה שרלוונטי לשלב שאתם נמצאים בו בסגירה.",
        category: "מחלקות כספים",
        tags: ["Finance Ops", "Automation", "Prompting", "Reporting"],
        keywords: [
            "סגירת חודש AI",
            "פרומפטים לרואי חשבון",
            "אוטומציה בהנהלת חשבונות",
            "התאמות בנקאיות אוטומטיות",
            "month-end close",
            "ניתוח סטיות",
        ],
        thumbnail: "/guides/resources/50-ways-ai.png",
        duration: "20 דק'",
        publishedAt: "2026-05-01",
        contentFile: "50-ways-ai.html",
    },
    {
        slug: "claude-excel",
        title: "Claude ב-Excel וב-PowerPoint לאנשי FP&A",
        description: "מדריך לשימוש ב-Claude עם Excel ו-PowerPoint.",
        summary:
            "הדרך שבה רוב אנשי הכספים עובדים עם AI היא עדיין העתק-הדבק: מוציאים נתונים מאקסל, מדביקים בצ'אט, מקבלים תשובה, ומדביקים בחזרה. ה-add-ins של Claude ל-Excel ול-PowerPoint מוחקים את השלב הזה — Claude קורא וכותב ישירות לקבצים הפתוחים, ויכול לעבוד על שניהם באותה בקשה.\n\nהמדריך מפרק את ההקמה לארבעה שלבים: התקנת שני ה-add-ins מה-Microsoft Marketplace והפעלה ראשונית של כל אחד, פתיחת קובץ ה-Excel וקובץ ה-PowerPoint במקביל (Claude יכול לגשת רק למה שפתוח), הפעלת ה-Toggle של Work Across Files בהגדרות ה-add-in, וכתיבת פרומפט אחד שמתאר את המשימה מקצה לקצה — Claude מתאם בין האפליקציות מאחורי הקלעים.\n\nיש כאן גם את מה שרוב ההדגמות מדלגות עליו: הדרישות המדויקות לפי סוג המנוי (ב-Pro וב-Max ה-Toggle פעיל כברירת מחדל, ב-Team וב-Enterprise הוא כבוי), המגבלות האמיתיות של העבודה החוצה-אפליקציות, ומדריך פתרון תקלות לשני המקרים הנפוצים — כשהקובץ לא נקרא וכששינויים לא מופיעים בקובץ היעד.",
        category: "Excel",
        tags: ["Excel", "Claude", "PowerPoint", "FP&A"],
        keywords: [
            "Claude ב-Excel",
            "Claude PowerPoint",
            "add-in אקסל AI",
            "FP&A אוטומציה",
            "Work Across Files",
        ],
        thumbnail: "/guides/resources/claude-excel.png",
        duration: "10 דק'",
        publishedAt: "2026-05-01",
        contentFile: "claude-excel.html",
    },
    {
        slug: "price-framework",
        title: "מסגרת PRICE — ארטיפקטים עם Claude לאנשי כספים",
        description: "מסגרת עבודה בת חמישה שלבים לבניית כלים פיננסיים עם Claude.",
        summary:
            "רוב אנשי הכספים שמנסים לבנות משהו אמיתי עם Claude נעצרים באותה נקודה: הפרומפט הראשון מחזיר משהו סביר, ומשם זה נתקע. PRICE היא מסגרת בת חמישה שלבים שמתרגמת בעיה פיננסית לכלי עובד — dashboard, מודל או סקריפט — בלי מעורבות של IT ובלי ידע בתכנות.\n\nהאות R היא Relevant Context: לתת ל-Claude את ה\"למה\" מאחורי ה\"מה\". לעבודה מקצועית עמוקה ההקשר הוא הכול — הענף שבו אתם פועלים, מבנה הנתונים, דרישות רגולטוריות (IFRS מול US GAAP), קצב הדיווח ו-Chart of Accounts הפנימי. CFO בחברת SaaS צריך תצוגת ARR/MRR; Controller בייצור צריך פירוט מרכזי עלות. אותה בקשה בדיוק, שני כלים שונים לגמרי.\n\nהאות I היא Iterate: הפעל, שבור, תקן, חזור. Claude בונה artifact עובד בתוך הצ'אט, ואת האיטרציה עושים על הכלי עצמו — מה שנשבר הוא בדיוק מה שיש להגיד בסבב הבא. המסגרת מלווה בדוגמאות מלאות: מודל Monte Carlo לתקצוב הכנסות, ניתוח Variance אוטומטי, ותהליכים שמגיעים לתוצר עובד תוך שניים עד ארבעה סבבים.",
        category: "Claude",
        tags: ["Claude", "Artifacts", "Framework", "CFO"],
        keywords: [
            "מסגרת PRICE",
            "Claude Artifacts",
            "בניית כלים פיננסיים",
            "prompt framework",
            "Monte Carlo תקציב",
        ],
        thumbnail: "/guides/resources/price-framework.png",
        duration: "12 דק'",
        publishedAt: "2026-05-01",
        contentFile: "price-framework.html",
        free: true,
    },
    {
        slug: "claude-playbook",
        title: "Claude Playbook לאנשי כספים",
        description: "פלייבוק מלא לעבודה עם Claude.",
        summary:
            "פלייבוק מלא שעובר על כל מה ש-Claude מציע לאיש כספים, מסודר לפי החלטות ולא לפי רשימת פיצ'רים. הוא נפתח בשכבת המודלים: Haiku לעבודה היומיומית של האנליסט — סיווג תנועות, ניסוח מזכרים, נוסחאות ושאילתות; Sonnet כמודל המועדף למידול פיננסי, ניתוח סטיות ומצגות לדירקטוריון; ו-Opus לבעיות המורכבות באמת — מיזוגים ורכישות, תכנון רב-תרחישי, סינתזה רגולטורית והחלטות שדורשות ניתוח מעמיק. לכל שכבה יש המלצה ישירה לפי תפקיד: מה מתאים לחשב ולרואה חשבון, מה ל-FP&A ול-VP Finance, ומה ל-CFO.\n\nמשם הפלייבוק עובר ליכולות: Artifacts כקנבס שבו Claude מייצר דשבורדים, טבלאות מוכנות לאקסל ומודלים ב-Python כתוצר עצמאי ואינטראקטיבי לצד השיחה; Skills להטמעת ידע מקצועי חוזר; Projects לשימור הקשר לאורך זמן; ו-Connectors לחיבור מקורות נתונים. הפרק האחרון מכסה את המוצרים — Claude Code, Claude Cowork, Claude Design, ו-Claude בתוך Excel ו-PowerPoint.\n\nלאורך הפלייבוק יש Starter Prompts ברמות Starter ו-Advanced, ודאטהסט P&L של חברת SaaS להורדה כדי לתרגל על נתונים אמיתיים.",
        category: "Claude",
        tags: ["Claude", "CFO", "Artifacts", "Strategy"],
        keywords: [
            "Claude לאנשי כספים",
            "Claude playbook",
            "Opus Sonnet Haiku",
            "Claude Artifacts",
            "מודלים של Claude",
        ],
        thumbnail: "/guides/resources/claude-playbook.png",
        duration: "18 דק'",
        publishedAt: "2026-05-01",
        contentFile: "claude-playbook.html",
    },
    {
        slug: "python-cfo",
        title: "Python Can Do Whaaat — CFO P&L Terminal",
        description: "מה Python יכול לעשות עבור מנהלי כספים.",
        summary:
            "במקום להסביר מה Python יכול לעשות עבור מנהל כספים, המשאב הזה פשוט מראה את זה: טרמינל P&L אינטראקטיבי מלא שרץ בדפדפן, בנוי כולו סביב האופן שבו CFO קורא מספרים.\n\nהמסך נפתח על סרט P&L חי עם הכנסות, רווח גולמי, שיעור רווח גולמי, EBITDA וסטייה מהתוכנית, ומעליו שלושה מסננים — תרחיש, יחידה עסקית ותקופה — שמעדכנים את כל התצוגה בזמן אמת. מתחת לזה: גרף מגמה של הכנסות, רווח גולמי ו-EBITDA; מפל Revenue → EBITDA; פילוח הוצאות ל-COGS, S&M, R&D ו-G&A; גשר שיעורי רווחיות לאורך זמן; ומפת סיכון והזדמנות שמדרגת את עוצמת הסטייה לפי driver.\n\nהחלק שהכי שווה לראות הוא התחתון: Executive Commentary שנכתב אוטומטית מהתצוגה הנבחרת, טבלת פירוט סטיות מול תקציב שורה-שורה, לוח Operating Levers של מה שההנהלה יכולה לכוונן בפועל, ו-CFO Decision Queue שמדרג פעולות לפי סדר עדיפויות. זו הדגמה של מה שמחליף חבילת דיווח חודשית שנבנית ידנית מחדש בכל חודש.",
        category: "אוטומציה",
        tags: ["Python", "Dashboard", "CFO", "Finance Ops"],
        keywords: [
            "Python לאנשי כספים",
            "P&L dashboard",
            "CFO terminal",
            "ניתוח סטיות אוטומטי",
            "דוח רווח והפסד אינטראקטיבי",
        ],
        thumbnail: "/guides/resources/python-cfo.png",
        duration: "8 דק'",
        publishedAt: "2026-05-01",
        contentFile: "python-cfo.html",
    },
    {
        slug: "ai-skills",
        title: "Claude Skills לאנשי פיננסים",
        description: "מיומנויות AI מרכזיות לאנשי כספים.",
        summary:
            "Skill הוא תיקייה שמכילה קובץ SKILL.md אחד — הוראות ב-Markdown עם כותרת YAML — ולצידו סקריפטים ב-Python או ב-Bash, מסמכי עזר, תבניות ודוגמאות פלט. Claude יודע שהם שם וטוען אותם רק כשהמשימה מצדיקה את זה. זו הדרך להפוך ידע מקצועי חוזר — תהליך סגירה, תבנית דוח, מינוח פנימי, סטנדרט ביקורת — למשהו שנטען אוטומטית במקום להידבק מחדש בכל שיחה.\n\nהמשאב מסביר את שלושת הדברים שקובעים אם Skill יעבוד. הראשון הוא ה-trigger: שדה ה-description ב-SKILL.md הוא מה שמחליט מתי Claude מפעיל את ה-Skill, ולכן הוא צריך להיכתב בשפה שהמשתמש באמת אומר — \"commentary על variance\", \"דוח חודשי\", \"CFO pack\". אפשר גם להפעיל Skill ישירות עם slash command, בלי matching אוטומטי.\n\nהשני הוא איפה Skills גרים: Skills אישיים בחשבון ועובדים בכל פרויקט, Skills של פרויקט משותפים לצוות דרך version control, ואדמינים ארגוניים יכולים לפרוס Skills לכל החברה. השלישי הוא ה-progressive disclosure — שלוש שכבות של context שבהן רק ה-YAML נטען תמיד, כך שאפשר להחזיק הרבה Skills בלי לשלם על כולם בטוקנים. הכל עובד על standard פתוח בשם Agent Skills, נייד בין Claude.ai, Claude Code וה-API.",
        category: "Claude",
        tags: ["Claude", "Skills", "Automation", "Workflow"],
        keywords: [
            "Claude Skills",
            "SKILL.md",
            "Agent Skills",
            "אוטומציה פיננסית",
            "progressive disclosure",
        ],
        thumbnail: "/guides/resources/ai-skills.png",
        duration: "12 דק'",
        publishedAt: "2026-05-01",
        contentFile: "ai-skills.html",
    },
    {
        slug: "colab-he",
        title: "Google Colab לאנשי כספים — מ-Excel לסקריפטים בלי לפחד",
        description: "מדריך עבודה עם Google Colab בעברית.",
        summary:
            "מדריך שטח בעברית ל-Python ול-Google Colab, כתוב ל-CFOs, Controllers ואנשי FP&A שלא כתבו שורת קוד מעולם. אין דרישת ידע מוקדם בתכנות — רק Excel ונכונות לעבוד אחרת.\n\nהוא נפתח בנימוק ולא בתחביר: Excel נשבר בקנה מידה. מיליון שורות הוא הגבול, ואקספורטים מ-ERP חוצים אותו בקלות; כ-40% מהגיליונות הגדולים מכילים לפחות שגיאת נוסחה מהותית אחת לפי EuSpRIG; ו-\"Budget_FINAL_v3_REVISED.xlsx\" הוא לא ממשל — אין audit trail ואין rollback.\n\nמשם המדריך רץ על עשרה מודולים: פתיחת Colab בפחות משישים שניות בלי התקנה ובלי מעורבות IT, ארבע ספריות Python שמחליפות ארגז כלים שלם של אנליסט, שלוש שיטות לטעינת נתונים פיננסיים — מ-CSV ועד Google Sheets חי, סקריפט Variance Analysis מלא להעתקה והרצה, תרגול מעשי עם רמזים שמותאם למי שאין לו זמן, ופרק סיום על ממשל ואבטחה לפריסה ארגונית.",
        category: "אוטומציה",
        tags: ["Python", "Google Colab", "Automation", "FP&A"],
        keywords: [
            "Google Colab בעברית",
            "Python לרואי חשבון",
            "מ-Excel ל-Python",
            "variance analysis script",
            "אוטומציה פיננסית",
        ],
        thumbnail: "/guides/resources/colab-he.png",
        duration: "25 דק'",
        publishedAt: "2026-05-01",
        contentFile: "colab-he-ronen.html",
    },
    {
        slug: "102-prompt",
        title: "102 Prompts",
        description: "102 פרומפטים מוכנים לרואי חשבון ולמחלקות כספים.",
        summary:
            "ספריית פרומפטים מלאה לעבודה פיננסית — 102 פרומפטים מוכנים להעתקה, מסודרים לפי תחום, לרואי חשבון ולמחלקות כספים.",
        category: "מחלקות כספים",
        tags: ["Prompting", "Finance Ops"],
        keywords: ["102 פרומפטים", "פרומפטים לרואי חשבון", "prompt library"],
        thumbnail: "/guides/resources/102-prompt.png",
        duration: "25 דק'",
        publishedAt: "2026-05-01",
        contentFile: "102-prompt.html",
    },
    {
        slug: "12-shitot-avoda-dashboard-ai",
        title: "12 שיטות עבודה לבניית דשבורדים פיננסיים עם Claude AI",
        description:
            "מדריך מעשי ל-CFOs, קונטרולרים ואנשי FP&A: 12 שיטות עבודה, פרומפטים מוכנים להעתקה, וכלים מתקדמים לבניית דשבורדים פיננסיים עם Claude.",
        summary:
            "רוב אנשי הכספים שמנסים לבנות דשבורד עם AI נתקעים באותה נקודה: הם מקבלים תוצאה שנראית \"כמעט טוב\", אבל לא ברמה שאפשר להציג להנהלה — כי הם לא יודעים איך לנסח את הבקשה נכון. המדריך הזה מרכז 12 שיטות עבודה מעשיות, שנבנו ונבחנו בפועל, להפיכת Claude לכלי אמין לבניית דשבורדים פיננסיים — מה-brief הראשוני ועד לקובץ HTML עצמאי שאפשר לשלוח במייל, לארח באתר, או להציג בישיבת דירקטוריון.\n\nהמדריך עונה על השאלות שכל CFO, קונטרולר או אנליסט FP&A שואל כשהוא מתחיל לעבוד עם AI: איך מנסחים פרומפט שמניב דשבורד ברמת סטודיו עיצוב ולא סקיצה? איך שומרים על עיצוב אחיד לאורך כל הדוח? איך הופכים דשבורד חד-פעמי לכלי שמתעדכן כל חודש בלחיצת כפתור? ואיך, לפני שמציגים מספר להנהלה, בודקים אותו כמו שהיו בודקים עבודה של אנליסט זוטר — כדי לא לגלות טעות מול הדירקטוריון. כל שיטה מלווה בדוגמת פרומפט מלאה, מוכנה להעתקה ישירה ל-Claude.\n\nמה תמצאו במדריך בפירוט: מסגרת הפרומפט H·T·M·L — התדריך בן 4 השלבים לכל בקשת דשבורד; איך לבנות אב-טיפוס עם נתוני דמה לפני שמכניסים מספרים אמיתיים; דשבורד שמתעדכן לבד מהעלאת קובץ CSV חודשי; סימולטור אינטראקטיבי וניתוח רגישות ל\"מה אם\" בזמן אמת מול ההנהלה; פרוטוקול ביקורת AI לבדיקת כל KPI לפני שהוא מגיע להנהלה; ופרומפט-על אחד שמאחד את כל 12 השיטות למסמך הזמנה יחיד.",
        category: "Claude",
        tags: ["Claude", "Dashboard", "FP&A", "CFO"],
        keywords: [
            "דשבורד פיננסי AI",
            "Claude דשבורדים",
            "H·T·M·L פרומפט",
            "FP&A AI",
            "דשבורד פיננסי Claude",
        ],
        thumbnail: "/guides/resources/12-shitot-avoda-dashboard-ai.png",
        duration: "15 דק'",
        publishedAt: "2026-08-23",
        contentFile: "12-shitot-avoda-dashboard-ai.html",
        freeUntilDate: "2026-09-06",
    },
];

/**
 * 102 Prompts lives on the Skill Vault page next to the prompt library, not in the
 * guides grid. Everything else becomes a guide card.
 */
export const SKILL_VAULT_RESOURCE_SLUG = "102-prompt";

export function getResourceBySlug(slug: string): Resource | undefined {
    return resources.find((r) => r.slug === slug);
}

/** The resources that surface as cards on /guides. */
export function getGuideResources(): Resource[] {
    return resources.filter((r) => r.slug !== SKILL_VAULT_RESOURCE_SLUG);
}
