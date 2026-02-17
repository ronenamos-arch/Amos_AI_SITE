import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

const testimonials = [
  {
    quote:
      "רונן לא רק עזר לנו להטמיע את ASC 606 - הוא בנה לנו דשבורד Power BI שחוסך לנו 20 שעות עבודה בחודש. עכשיו אנחנו רואים את כל הנתונים בזמן אמת.",
    author: "דני כהן",
    role: "CFO, חברת SaaS בתחום ה-HR",
  },
  {
    quote:
      "הייתה לנו בעיה עם טעויות בהכרת הכנסות. רונן בנה לנו אוטומציה ב-Excel שמחשבת הכל אוטומטית לפי ASC 606. אפס טעויות מאז.",
    author: "מיכל לוי",
    role: "מנהלת כספים, חברת מנויים דיגיטליים",
  },
  {
    quote:
      "יום ההכשרה על Power BI היה מעולה. רונן לא רק לימד - הוא עזר לכל אחד מאיתנו לבנות דשבורד אמיתי. עכשיו כל הצוות משתמש בזה.",
    author: "יוסי אברהם",
    role: "מנהל חשבונאות, חברת ייצור",
  },
];

export function Testimonials() {
  return (
    <section className="bg-space-900/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="מה אומרים עליי" />
        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <GlassCard key={t.author} hover={false}>
              {/* Stars */}
              <div className="mb-4 flex gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="h-5 w-5 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mb-6 text-text-secondary">&quot;{t.quote}&quot;</p>
              <div>
                <p className="font-semibold text-text-primary">{t.author}</p>
                <p className="text-sm text-text-muted">{t.role}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
