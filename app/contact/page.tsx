import type { Metadata } from "next";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "צור קשר",
  description: "הזמן פגישת ייעוץ חינמית עם רונן עמוס - רו\"ח ויועץ טכנולוגי פיננסי.",
};

const contactInfo = [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    label: "אימייל",
    value: "finance@amosbudget.com",
    href: "mailto:finance@amosbudget.com",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.638l4.685-1.228A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.115 0-4.12-.654-5.813-1.89a.5.5 0 00-.417-.067l-3.286.862.647-2.45a.5.5 0 00-.08-.446C1.77 16.29 1 14.21 1 12 1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11z" />
      </svg>
    ),
    label: "קבוצת WhatsApp",
    value: "הצטרף לקבוצה השקטה לעדכונים",
    href: "https://chat.whatsapp.com/CS6dgqnK45Q9XAMqScNr6R",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    label: "YouTube",
    value: "אשף האוטומציה הפיננסית | AI for Finance",
    href: "https://youtube.com/channel/UCHUP0gASQ89be2Mj3vW4YcA",
  },
];

export default function ContactPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="צור קשר"
          subtitle="בוא נתחיל עם פגישת ייעוץ חינמית של 30 דקות. ללא התחייבות."
          gradient
        />

        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          {/* Native Form */}
          <GlassCard hover={false} className="lg:order-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">שלח הודעה ישירה</h2>
              <p className="text-text-secondary text-sm">
                מלא את הפרטים ואחזור אליך תוך 24 שעות.
              </p>
            </div>
            <ContactForm />
          </GlassCard>

          {/* Info */}
          <div className="space-y-6 lg:order-1">
            <GlassCard hover={false}>
              <h2 className="mb-4 text-xl font-semibold">פרטי התקשרות</h2>
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    className="flex items-center gap-3 text-text-secondary transition-colors hover:text-teal-400"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-400/10 text-teal-400">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-xs text-text-muted">{info.label}</p>
                      <p className="text-sm">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </GlassCard>

            <GlassCard hover={false}>
              <h2 className="mb-4 text-xl font-semibold">במפגש נדבר על</h2>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-teal-400">&#10003;</span>
                  האתגרים הספציפיים שלך
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-teal-400">&#10003;</span>
                  איפה אפשר לחסוך זמן וכסף
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-teal-400">&#10003;</span>
                  איזה פתרון מתאים לך ביותר
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-teal-400">&#10003;</span>
                  תכנית עבודה ראשונית
                </li>
              </ul>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
