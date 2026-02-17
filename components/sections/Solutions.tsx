import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

const solutions = [
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
      </svg>
    ),
    title: "מומחיות פיננסית עמוקה",
    items: [
      "רו\"ח מוסמך עם 10+ שנות ניסיון",
      "התמחות ב-ASC 606/IFRS 15",
      "ייעוץ לחברות SaaS וסטארטאפים",
    ],
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
      </svg>
    ),
    title: "שליטה טכנולוגית מתקדמת",
    items: [
      "Power BI - דשבורדים מתקדמים",
      "AI - ChatGPT, Claude לעבודה פיננסית",
      "Python, Excel Automation, API",
    ],
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
    title: "חשיבה עסקית אסטרטגית",
    items: [
      "ייעוץ מבוסס נתונים",
      "בניית תהליכים פיננסיים יעילים",
      "ROI מדיד בכל פרויקט",
    ],
  },
];

export function Solutions() {
  return (
    <section className="bg-space-900/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="הפתרון: שילוב ייחודי של מומחיות"
          gradient
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {solutions.map((solution) => (
            <GlassCard key={solution.title}>
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-teal-400/10 text-teal-400">
                {solution.icon}
              </div>
              <h3 className="mb-4 text-xl font-semibold">{solution.title}</h3>
              <ul className="space-y-2">
                {solution.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-text-secondary"
                  >
                    <span className="mt-0.5 text-teal-400">&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
