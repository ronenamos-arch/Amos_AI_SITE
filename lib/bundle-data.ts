export type MaterialKind = "workbook" | "prompts" | "skills" | "deck" | "code";

export interface BundleMaterial {
  kind: MaterialKind;
  label: string;
}

export interface BundleChapter {
  chapterNumber: number;
  slug: string;
  title: string;
  description: string;
  date: string;
  minutes: number;
  materials: BundleMaterial[];
  href: string;
  imageUrl?: string;
}

export const bundleChapters: BundleChapter[] = [
  {
    chapterNumber: 1,
    slug: "claude-accountant",
    title: "Claude לרואי חשבון — סביבת העבודה החדשה של איש הכספים",
    description:
      "המפגש הראשון בסדרה: הכרות מעמיקה עם Claude ככלי מרכזי לניהול משימות וניתוחים פיננסיים. Projects, Files, Artifacts, Chrome ו-Excel.",
    date: "26 במאי 2026",
    minutes: 60,
    materials: [
      { kind: "prompts", label: "פרומפטים" },
      { kind: "skills", label: "מיומנויות" },
    ],
    href: "https://www.ronenamoscpa.co.il/resources/webiners/claude-accountant",
    imageUrl: "/course-assets/ai-master-course/images/c-logo.png",
  },
  {
    chapterNumber: 2,
    slug: "claude-excel-pp",
    title: "Claude לרואי חשבון עם Excel ו-PowerPoint — כמו שלא הכרתם",
    description:
      "שילוב Claude עם Excel ו-PowerPoint: מ-GL גולמי לדוח דירקטוריון, ניתוח סטיות, ותבניות PPT מוכנות.",
    date: "11 ביוני 2026",
    minutes: 60,
    materials: [
      { kind: "workbook", label: "חוברת Excel" },
      { kind: "prompts", label: "פרומפטים" },
      { kind: "deck", label: "תבניות PPT" },
    ],
    href: "https://www.ronenamoscpa.co.il/resources/webiners/Claude-excel-pp",
    imageUrl: "/course-assets/ai-master-course/images/claude-excel.png",
  },
  {
    chapterNumber: 3,
    slug: "webinar-03-live-artifacts",
    title: "סביבת העבודה החדשה של רואי החשבון — Claude Live Artifacts",
    description:
      "יצירת קוד, טבלאות ודוחות אינטראקטיביים ישירות מול עיני המשתמש. דשבורדים חיים, Connectors ורענון אוטומטי.",
    date: "25 ביוני 2026",
    minutes: 60,
    materials: [
      { kind: "prompts", label: "פרומפטים" },
      { kind: "code", label: "Artifacts לדוגמה" },
    ],
    href: "https://www.ronenamoscpa.co.il/resources/webiners/webinar-03-live-artifacts",
    imageUrl: "/course-assets/ai-master-course/images/live-artifact.png",
  },
  {
    chapterNumber: 4,
    slug: "webinar-04-projects",
    title: "עבודה עם פרויקטים בקלוד — ארגן את העבודה שלך כמו מקצוען",
    description:
      "הגדרת Projects ב-Claude: הנחיות מערכת, העלאת תקנות ונהלים כידע קבוע, ושיחות מרובות בלי לאבד הקשר.",
    date: "30 ביולי 2026",
    minutes: 60,
    materials: [
      { kind: "prompts", label: "פרומפטים" },
      { kind: "skills", label: "הנחיות מערכת" },
    ],
    href: "https://www.ronenamoscpa.co.il/resources/webiners/webinar-04-projects",
    imageUrl: "/course-assets/ai-master-course/images/Projects-folder-structure.png",
  },
  {
    chapterNumber: 5,
    slug: "webinar-05-skills",
    title: "Claude Skills — בונים Skills שבאמת עובדים",
    description:
      "בניית Skill מאפס ב-Claude, והפיכת כל פרומפט שחוזר על עצמו לכלי עבודה קבוע לך ולכל מחלקת הכספים.",
    date: "19 באוגוסט 2026",
    minutes: 60,
    materials: [
      { kind: "prompts", label: "פרומפטים" },
      { kind: "skills", label: "Skills מוכנים" },
    ],
    href: "https://www.ronenamoscpa.co.il/resources/webiners/webinar-05-skills",
    imageUrl: "/course-assets/ai-master-course/images/skill.png",
  },
];

export const bundleConfig = {
  name: "Claude לכספים — 5 הוובינרים המלאים",
  price: 150,
  originalPrice: 250,
  currency: "ILS",
};

export const totalBundleMinutes = bundleChapters.reduce((total, chapter) => total + chapter.minutes, 0);

export const totalBundleMaterials = bundleChapters.reduce((total, chapter) => total + chapter.materials.length, 0);
