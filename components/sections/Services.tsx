import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

const services = [
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
    ),
    title: "ייעוץ עסקי ופיננסי",
    description: "ניתוח פיננסי מתקדם עם Power BI, אסטרטגיית ASC 606, אופטימיזציה של תהליכים והטמעת מערכות.",
    href: "/services",
    color: "teal",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
      </svg>
    ),
    title: "הכשרות מעשיות",
    description: "ימי הכשרה למחלקות כספים: Power BI, AI ואוטומציה, הכשרת מנהלים. ROI מדיד וכלים מוכנים לשימוש.",
    href: "/training",
    color: "royal",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
    title: "קורס AI לחשבונאים",
    description: "קורס מקיף של 8 מפגשים: Prompts, כתיבה עסקית, ניתוח נתונים, GPT-4o ועתיד ה-AI בכספים.",
    href: "/course",
    color: "teal",
  },
];

export function Services() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="השירותים שלי"
          subtitle="פתרונות מותאמים אישית לכל שלב בצמיחה של מחלקת הכספים שלך"
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {services.map((service) => (
            <GlassCard key={service.title}>
              <div
                className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${
                  service.color === "teal"
                    ? "bg-teal-400/10 text-teal-400"
                    : "bg-royal-500/10 text-royal-400"
                }`}
              >
                {service.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold">{service.title}</h3>
              <p className="mb-6 text-sm text-text-secondary">
                {service.description}
              </p>
              <Button href={service.href} variant="ghost" size="sm">
                למידע נוסף
              </Button>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
