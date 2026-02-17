import type { Metadata } from "next";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "אודות",
  description:
    "רונן עמוס - רו\"ח מוסמך ויועץ טכנולוגי פיננסי. ronenamos@gmail.com",
};

const certifications = [
  "רואה חשבון מוסמך (ישראל)",
  "Microsoft Power BI Data Analyst",
  "Python for Finance",
  "חבר לשכת רואי החשבון בישראל",
];

const skills = [
  { name: "Power BI", category: "טכנולוגיה" },
  { name: "Python", category: "טכנולוגיה" },
  { name: "ChatGPT / Claude", category: "AI" },
  { name: "Excel Automation (VBA, Power Query)", category: "טכנולוגיה" },
  { name: "ASC 606 / IFRS 15", category: "חשבונאות" },
  { name: "n8n / Zapier", category: "אוטומציה" },
  { name: "API Integrations", category: "טכנולוגיה" },
  { name: "Financial Modeling", category: "חשבונאות" },
];

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="mb-16 grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold sm:text-5xl">
              רונן עמוס -{" "}
              <span className="gradient-text">
                רו&quot;ח שמדבר בשפה של הטכנולוגיה
              </span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-text-secondary">
              אני לא רק רואה חשבון. אני מגשר בין עולם הכספים המסורתי לעידן
              הבינה המלאכותית. עם ניסיון של למעלה מעשור בניהול פיננסי,
              סטארטאפים וחברות שירותים, אני משלב מומחיות עמוקה בתקני דיווח
              בינלאומיים עם שליטה מתקדמת בכלי AI, Power BI ואוטומציה.
            </p>
            <p className="mt-4 text-text-secondary">
              <strong className="text-text-primary">התוצאה?</strong> מחלקות
              כספים שעובדות חכם, לא קשה. דוחות בלחיצת כפתור. תובנות בזמן אמת.
              ROI מדיד.
            </p>
            <div className="mt-8">
              <Button href="/contact">בוא נדבר</Button>
            </div>
          </div>

          {/* Avatar Photo */}
          <div className="relative group">
            <div className="absolute inset-0 bg-teal-400/20 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity rounded-full" />
            <div className="glass rounded-2xl p-1 relative z-10 overflow-hidden border border-white/10">
              <img
                src="/images/avatar-hero.png"
                alt="רונן עמוס"
                className="w-full h-auto rounded-xl object-cover"
              />
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <SectionHeading title="הסמכות ורישיונות" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {certifications.map((cert) => (
              <GlassCard key={cert} hover={false} className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-teal-400/10">
                  <svg
                    className="h-6 w-6 text-teal-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium">{cert}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <SectionHeading title="המומחיות שלי" gradient />
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill) => (
              <span
                key={skill.name}
                className="glass rounded-full px-4 py-2 text-sm text-text-secondary"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
