import type { Metadata } from "next";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "הכשרות מעשיות למחלקות כספים",
  description:
    "ימי הכשרה מעשיים: Power BI, AI ואוטומציה, הכשרת מנהלים. ROI מדיד וכלים מוכנים לשימוש.",
};

const tracks = [
  {
    badge: "Power BI",
    title: "Power BI למחלקות כספים",
    duration: "יום מלא (8 שעות) או 2 מפגשים של 4 שעות",
    price: "8,000",
    maxParticipants: 10,
    items: [
      "חיבור Power BI למערכות ERP (SAP, Priority, וכו')",
      "בניית דשבורד לניתוח תזרים מזומנים",
      "דוחות הכרת הכנסות אוטומטיים (ASC 606)",
      "ויזואליזציה של תקציב vs. ביצוע",
      "התראות אוטומטיות לחריגות",
    ],
    result: "כל משתתף יוצא עם דשבורד עובד שהוא בנה בעצמו.",
    color: "teal" as const,
  },
  {
    badge: "AI",
    title: "AI ואוטומציה לעבודה היומיומית בכספים",
    duration: "יום מלא (8 שעות)",
    price: "7,500",
    maxParticipants: 10,
    items: [
      "ChatGPT/Claude לניתוח חוזים והכרת הכנסות",
      "אוטומציות Excel עם Power Query ו-VBA",
      "בוטים לאיסוף נתונים מספקים/לקוחות",
      "תמלול פגישות והפקת סיכומים אוטומטיים",
      "יצירת דוחות ומצגות בלחיצת כפתור",
    ],
    result: "חיסכון של 10-20 שעות עבודה חודשיות לכל עובד.",
    color: "royal" as const,
  },
  {
    badge: "מנהלים",
    title: "הכשרת מנהלים - AI כמנוף אסטרטגי בכספים",
    duration: "חצי יום (4 שעות)",
    price: "5,000",
    maxParticipants: 15,
    items: [
      "מגמות AI בעולם הפיננסים - מה קורה ב-2026?",
      "איך AI משנה את תפקיד רואה החשבון",
      "בניית תכנית הטמעה למחלקת הכספים",
      "ROI של השקעה בכלים חכמים",
      "סיכונים ואתגרים (אבטחת מידע, דיוק)",
    ],
    result: "תכנית עבודה ראשונית להטמעת AI במחלקת הכספים.",
    color: "teal" as const,
  },
];

export default function TrainingPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="הכשרות מעשיות למחלקות כספים"
          subtitle="לא עוד הרצאות תיאורטיות. תרגול אמיתי עם כלים אמיתיים."
          gradient
        />

        <div className="space-y-8">
          {tracks.map((track) => (
            <GlassCard key={track.title} hover={false}>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <Badge variant={track.color}>{track.badge}</Badge>
                <span className="text-sm text-text-muted">{track.duration}</span>
              </div>

              <h2 className="mb-4 text-2xl font-bold">{track.title}</h2>

              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <h3 className="mb-3 text-sm font-semibold text-teal-400">
                    מה לומדים
                  </h3>
                  <ul className="space-y-2">
                    {track.items.map((item) => (
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

                <div className="space-y-4">
                  <div className="rounded-xl bg-space-950/50 p-4 text-center">
                    <p className="text-3xl font-bold text-teal-400">
                      &#8362;{track.price}
                    </p>
                    <p className="text-sm text-text-muted">
                      עד {track.maxParticipants} משתתפים
                    </p>
                  </div>
                  <div className="rounded-xl bg-space-950/50 p-4">
                    <p className="text-sm text-text-muted">
                      <span className="font-semibold text-teal-400">
                        תוצאה:
                      </span>{" "}
                      {track.result}
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Benefits */}
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            "כל משתתף מקבל כלים מוכנים לשימוש",
            "ליווי לאחר ההכשרה (30 יום)",
            'לא "נחמד ללמוד" - חוסך כסף מיד',
          ].map((item) => (
            <GlassCard key={item} hover={false} className="text-center">
              <p className="text-sm text-text-secondary">{item}</p>
            </GlassCard>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button href="/contact" size="lg">
            בקש הצעת מחיר להכשרה
          </Button>
        </div>
      </div>
    </div>
  );
}
