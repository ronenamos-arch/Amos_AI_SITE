import { Button } from "@/components/ui/Button";

export function CTA() {
  return (
    <section className="relative overflow-hidden py-20">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-400/10 via-transparent to-royal-500/10" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold sm:text-4xl">
          מוכן להפוך את מחלקת הכספים שלך{" "}
          <span className="gradient-text">לחכמה ויעילה?</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-text-secondary">
          בוא נתחיל עם פגישת ייעוץ חינמית של 30 דקות. ללא התחייבות, ללא עלות.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/contact" size="lg">
            הזמן פגישה עכשיו
          </Button>
          <Button href="/blog" variant="ghost" size="lg">
            קרא מאמרים בבלוג
          </Button>
        </div>
      </div>
    </section>
  );
}
