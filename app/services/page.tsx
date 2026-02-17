import type { Metadata } from "next";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "שירותים",
  description:
    "ייעוץ עסקי ופיננסי מבוסס נתונים, הכשרות Power BI ו-AI, ליווי והטמעת מערכות.",
};

const services = [
  {
    title: "ייעוץ עסקי ופיננסי מבוסס נתונים",
    subtitle: "לא עוד ייעוץ תיאורטי. אני מביא תשובות מבוססות נתונים.",
    items: [
      "ניתוח פיננסי מתקדם עם Power BI - תובנות שלא רואים בדוחות רגילים",
      "אסטרטגיית הכרת הכנסות לפי ASC 606/IFRS 15 - בלי טעויות, בלי קנסות",
      "אופטימיזציה של תהליכים פיננסיים - איפה אפשר לחסוך זמן וכסף",
      "ליווי בהטמעת מערכות - ERP, BI, אוטומציות",
    ],
    audience: [
      "חברות SaaS שצריכות לעמוד ב-ASC 606",
      "ארגונים עם מחלקות כספים קטנות (2-5 עובדים)",
      "מנכ\"לים שרוצים תובנות פיננסיות בזמן אמת",
      "סטארטאפים שצריכים תשתית פיננסית מקצועית",
    ],
    result:
      "לקוח אחד חסך 15 שעות עבודה שבועיות אחרי הטמעת דשבורד Power BI שבניתי",
    color: "teal",
  },
  {
    title: "ליווי והטמעה ארוך טווח",
    subtitle: "לא פרויקט חד-פעמי. שותפות אסטרטגית.",
    items: [
      "ליווי חודשי של מחלקת הכספים - בניית תהליכים ושיפור מתמיד",
      "הטמעת מערכות ERP ו-BI - מבחירה ועד הפעלה מלאה",
      "בניית דשבורדים ודוחות אוטומטיים",
      "תמיכה טכנית שוטפת לצוות הכספים",
    ],
    audience: [
      "ארגונים שרוצים שינוי מתמשך ולא חד-פעמי",
      "חברות בצמיחה שצריכות תשתית כספית שגדלה איתן",
      "מחלקות כספים שרוצות מנטור טכנולוגי",
    ],
    result:
      "חברה שליוויתי 6 חודשים קיצרה את תהליך סגירת החודש מ-10 ימים ל-3",
    color: "royal",
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="השירותים שלי"
          subtitle="פתרונות פיננסיים-טכנולוגיים מותאמים אישית עם ROI מדיד"
          gradient
        />

        <div className="space-y-12">
          {services.map((service) => (
            <GlassCard key={service.title} hover={false}>
              <h2 className="mb-2 text-2xl font-bold">{service.title}</h2>
              <p className="mb-6 text-text-secondary">{service.subtitle}</p>

              <div className="grid gap-8 lg:grid-cols-2">
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-teal-400">
                    מה אני עושה
                  </h3>
                  <ul className="space-y-2">
                    {service.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-text-secondary"
                      >
                        <span className="mt-0.5 text-teal-400">&#10003;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-semibold text-royal-400">
                    למי זה מתאים
                  </h3>
                  <ul className="space-y-2">
                    {service.audience.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-text-secondary"
                      >
                        <span className="mt-0.5 text-royal-400">&#8226;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-space-950/50 p-4">
                <p className="text-sm text-text-muted">
                  <span className="font-semibold text-teal-400">
                    תוצאה מדידה:
                  </span>{" "}
                  &quot;{service.result}&quot;
                </p>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button href="/contact" size="lg">
            הזמן פגישת ייעוץ חינם
          </Button>
        </div>
      </div>
    </div>
  );
}
