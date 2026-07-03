export interface Course {
  slug: string;
  href?: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  color: "teal" | "royal" | "muted";
  image: string;
  isFeatured?: boolean;
}

export const courses: Course[] = [
  {
    slug: "ai-finance-master",
    href: "/courses/sell-page",
    title: "AI Finance Master",
    description: "קורס מתקדם לדור השני של מנהלי כספים. שליטה עמוקה ב-AI לאוטומציה, ניתוח מתקדם ועתיד הפיננסים.",
    duration: "קורס מקיף",
    level: "מתקדמים",
    color: "teal",
    image: "/course-assets/ai-master-course/images/before-after.png",
    isFeatured: true,
  },
  {
    slug: "ai-mastery",
    title: "AI לכספים: המדריך למתחילים",
    description: "ChatGPT לפיננסים וחשבונאות ארגונית. קורס יסוד של 8 שיעורים שיהפוך אותך לחשבונאי של העתיד.",
    duration: "8 שיעורים",
    level: "מתחילים - מתקדמים",
    color: "royal",
    image: "/images/courses/ai-mastery-syllabus.png",
  },
  {
    slug: "notebook-master",
    title: "Mastering NotebookLM: קורס מעשי לאנשי פיננסים",
    description: "שלטו ב-NotebookLM להכנה לדירקטוריון, Deep Research ומצוינות רגולטורית ללא הזיות. 8 שיעורים של פרקטיקה.",
    duration: "8 שיעורים",
    level: "מתחילים - מתקדמים",
    color: "royal",
    image: "/images/courses/notebook-master-syllabus.png",
  },
];

export const featuredCourse = courses.find(c => c.isFeatured)!;
export const gridCourses = courses.filter(c => !c.isFeatured);
