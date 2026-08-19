// Real webinar library. Source of truth for the copy here is
// "AI FINANCE TRANSFORMATION/Webiners/webinars_list.txt".
// Every webinar page carries the recording at the bottom of the page, together
// with the downloadable files — hence the shared note rendered on each card.

export type MaterialKind = "workbook" | "prompts" | "skills" | "deck" | "bonus" | "code" | "pdf";

export interface Lesson {
    slug: string;
    title: string;
    description: string;
    /** Primary tool or platform the lesson is about. Drives the filter bar. */
    topic: string;
    /** Small label above the title — episode number when the webinar has one,
     *  otherwise the audience it was built for. */
    context: string;
    /** Hebrew display date, newest lesson first in the array. */
    date: string;
    minutes: number;
    materials: { kind: MaterialKind; label: string }[];
    /** The webinar page. Recording + downloads all live there. */
    href: string;
    /** True when the page is hosted off-site and should open in a new tab. */
    external?: boolean;
}

const SITE = "https://www.ronenamoscpa.co.il/resources/webiners";

export const lessons: Lesson[] = [
    {
        slug: "webinar-05-skills",
        title: "Claude Skills — בונים Skills שבאמת עובדים",
        description:
            "פרק שבו בונים Skill מאפס ב-Claude, והופכים כל פרומפט שחוזר על עצמו לכלי עבודה קבוע לך ולכל מחלקת הכספים.",
        topic: "Claude",
        context: "פרק 5",
        date: "19 באוגוסט 2026",
        minutes: 60,
        materials: [
            { kind: "prompts", label: "פרומפטים" },
            { kind: "skills", label: "Skills מוכנים" },
        ],
        href: `${SITE}/webinar-05-skills`,
    },
    {
        slug: "webinar-04-projects",
        title: "עבודה עם פרויקטים בקלוד — ארגן את העבודה שלך כמו מקצוען",
        description:
            "מה זה Project בקלוד ולמה זה שונה מחלון שיחה רגיל, איך להגדיר הנחיות מערכת לפרויקט, להעלות תקנות ונהלים כידע קבוע, ולנהל שיחות מרובות בלי לאבד הקשר.",
        topic: "Claude",
        context: "פרק 4",
        date: "30 ביולי 2026",
        minutes: 60,
        materials: [
            { kind: "prompts", label: "פרומפטים" },
            { kind: "skills", label: "הנחיות מערכת" },
        ],
        href: `${SITE}/webinar-04-projects`,
    },
    {
        slug: "cfo-ai-2",
        title: "Claude ל-CFO: ניתוח, דשבורדים ומסמכים — חי מהמסך",
        description:
            "CFO Brain — דוח ERP גולמי נכנס, תמצית מנהלים עם Red Flags ו-Action Items יוצאת. עיבוד מסמכים — שש הצעות ספקים לטבלת השוואה בלי הקלדה ידנית. ודשבורד ניהולי אינטראקטיבי שנבנה בפגישה אחת.",
        topic: "Claude",
        context: "CFO",
        date: "9 ביולי 2026",
        minutes: 60,
        materials: [
            { kind: "workbook", label: "חוברת Excel" },
            { kind: "prompts", label: "פרומפטים" },
            { kind: "bonus", label: "דשבורד לדוגמה" },
        ],
        href: `${SITE}/CFO-AI2`,
    },
    {
        slug: "webinar-03-live-artifacts",
        title: "סביבת העבודה החדשה של רואי החשבון — Claude Live Artifacts",
        description:
            "החלק השלישי בסדרה מציג את יכולות ה-Artifacts של Claude בסביבת העבודה של רואי החשבון: יצירת קוד, טבלאות ודוחות אינטראקטיביים ישירות מול עיני המשתמש.",
        topic: "Claude",
        context: "פרק 3",
        date: "25 ביוני 2026",
        minutes: 60,
        materials: [
            { kind: "prompts", label: "פרומפטים" },
            { kind: "code", label: "Artifacts לדוגמה" },
        ],
        href: `${SITE}/webinar-03-live-artifacts`,
    },
    {
        slug: "claude-excel-pp",
        title: "Claude לרואי חשבון עם Excel ו-PowerPoint — כמו שלא הכרתם",
        description:
            "פרק המשך המעמיק בשילוב שבין Claude ליישומי Office המסורתיים Excel ו-PowerPoint, ומציג טכניקות מתקדמות לאוטומציה וניתוח פיננסי.",
        topic: "Excel / Sheets",
        context: "פרק 2",
        date: "11 ביוני 2026",
        minutes: 60,
        materials: [
            { kind: "workbook", label: "חוברת Excel" },
            { kind: "prompts", label: "פרומפטים" },
            { kind: "deck", label: "תבניות PPT" },
        ],
        href: `${SITE}/Claude-excel-pp`,
    },
    {
        slug: "claude-accountant",
        title: "Claude לרואי חשבון — סביבת העבודה החדשה של איש הכספים",
        description:
            "המפגש הראשון בסדרה פורצת הדרך, המציג לרואי חשבון ואנשי כספים את סביבת העבודה החדשה של Claude ככלי מרכזי לניהול משימות וניתוחים פיננסיים.",
        topic: "Claude",
        context: "פרק 1",
        date: "26 במאי 2026",
        minutes: 60,
        materials: [
            { kind: "prompts", label: "פרומפטים" },
            { kind: "skills", label: "מיומנויות" },
        ],
        href: `${SITE}/claude-accountant`,
    },
    {
        slug: "excel-hell",
        title: "Artifacts — איך להפוך תהליכי עבודה כספיים של 3 ימים ל-30 דקות",
        description:
            "מפגש המוקדש כולו לטכנולוגיית ה-Artifacts, וכיצד ניתן לרתום אותה לקיצור דרמטי של תהליכי עבודה ומטלות כספיות מורכבות שלוקחות בדרך כלל ימים רבים.",
        topic: "Claude",
        context: "אנשי כספים",
        date: "14 במאי 2026",
        minutes: 60,
        materials: [
            { kind: "workbook", label: "חוברת Excel" },
            { kind: "prompts", label: "פרומפטים" },
            { kind: "bonus", label: "חומרים נלווים" },
        ],
        href: `${SITE}/excel-hell`,
    },
    {
        slug: "sheets-automation",
        title: "אוטומציה לרואי חשבון: להפוך את Google Sheets למכונת עבודה חכמה",
        description:
            "וובינר מעשי המלמד כיצד להפוך את גיליונות Google Sheets לכלים אוטומטיים וחכמים, המבצעים חישובים ומשימות רוטיניות עבור רואי חשבון באופן עצמאי.",
        topic: "אוטומציה",
        context: "רואי חשבון",
        date: "28 באפריל 2026",
        minutes: 60,
        materials: [
            { kind: "workbook", label: "תבניות Sheets" },
            { kind: "prompts", label: "פרומפטים" },
            { kind: "code", label: "קוד Apps Script" },
        ],
        href: "https://gamma.app/docs/-ehg194h0putjuvv",
        external: true,
    },
];

export const lessonTopics = ["הכל", ...Array.from(new Set(lessons.map((l) => l.topic)))];

export const totalLessonMinutes = lessons.reduce((sum, l) => sum + l.minutes, 0);

export const totalMaterials = lessons.reduce((sum, l) => sum + l.materials.length, 0);
