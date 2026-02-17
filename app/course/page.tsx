import type { Metadata } from "next";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "קורס AI לחשבונאים",
  description:
    "קורס מקיף של 8 מפגשים: ChatGPT לפיננסים וחשבונאות ארגונית. לימוד מעשי עם 100+ פרומפטים מוכנים.",
};

const syllabus = [
  {
    lesson: 1,
    title: "מבוא",
    description: "כלים, ציפיות ומטרות. הכרת סביבת העבודה וכלי ה-AI המובילים.",
  },
  {
    lesson: 2,
    title: "מאסטר פרומפטים",
    description: "עקרונות ChatGPT ומסגרות פרומפט מנצחות לעולם הכספים.",
  },
  {
    lesson: 3,
    title: "כתיבה עסקית במהירות",
    description: "דוחות, מיילים ומסמכים מקצועיים - הכל עם AI.",
  },
  {
    lesson: 4,
    title: "חשיבה יצירתית עם AI",
    description: "חדשנות וסיעור מוחות לאתגרים פיננסיים.",
  },
  {
    lesson: 5,
    title: "מנתונים לתובנות",
    description: "ניתוח מורכב מהיר ואוטומציה של תהליכים פיננסיים.",
  },
  {
    lesson: 6,
    title: "פתרון בעיות טכניות",
    description: "קבלת עזרה מיידית ופתרון תקלות טכניות עם AI.",
  },
  {
    lesson: 7,
    title: "מודלים מתקדמים (GPT-4o)",
    description: "יכולות מולטימדיה ותכונות AI חדישות.",
  },
  {
    lesson: 8,
    title: "עתיד ה-AI בכספים",
    description: "מגמות, התפתחויות והכנה ארוכת טווח.",
  },
];

const includes = [
  "ספריית Notion עם 100+ פרומפטים לרואי חשבון ו-CFOs",
  "חוברות תרגול לכל שיעור",
  "כלי תרגום מהיר אנגלית-עברית",
  "גישה לקהילת AI ופיננסים",
  "תעודת סיום",
];

export default function CoursePage() {
  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="mb-16 text-center">
          <Badge variant="teal" className="mb-4">
            8 מפגשים
          </Badge>
          <h1 className="text-4xl font-bold sm:text-5xl">
            <span className="gradient-text">AI Mastery</span> לחשבונאים
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
            ChatGPT לפיננסים וחשבונאות ארגונית. קורס מקיף שיהפוך אותך
            לחשבונאי של העתיד.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="https://www.paypal.com/ncp/payment/J4W48J6LKJ78N" size="lg">
              הירשם עכשיו
            </Button>
            <Button href="#syllabus" variant="ghost" size="lg">
              צפה בסילבוס
            </Button>
          </div>
        </div>

        {/* Syllabus */}
        <div id="syllabus" className="mb-16">
          <SectionHeading title="סילבוס הקורס" />
          <div className="grid gap-4 sm:grid-cols-2">
            {syllabus.map((item) => (
              <GlassCard key={item.lesson} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-400/10 text-sm font-bold text-teal-400">
                  {item.lesson}
                </div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-text-secondary">
                    {item.description}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* What's included */}
        <div className="mb-16">
          <SectionHeading title="מה כלול בקורס" gradient />
          <GlassCard hover={false} className="mx-auto max-w-2xl">
            <ul className="space-y-3">
              {includes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-text-secondary"
                >
                  <span className="mt-0.5 text-teal-400">&#10003;</span>
                  {item}
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>

        {/* CTA */}
        <div className="rounded-2xl bg-gradient-to-br from-teal-400/10 to-royal-500/10 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold sm:text-3xl">
            מוכן להפוך לחשבונאי של העתיד?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-text-secondary">
            הצטרף למאות אנשי כספים שכבר משתמשים ב-AI בעבודה היומיומית שלהם.
          </p>
          <div className="mt-8">
            <Button href="https://www.paypal.com/ncp/payment/J4W48J6LKJ78N" size="lg">
              הירשם לקורס
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
