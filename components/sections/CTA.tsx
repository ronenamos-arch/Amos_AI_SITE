import { Button } from "@/components/ui/Button";

export function CTA() {
  return (
    <section className="relative overflow-hidden py-24 pb-32">
      {/* Background visual flair */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-royal-500/5 blur-[120px] rounded-full" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-[3rem] p-12 md:p-16 text-center border-white/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-400/5 to-royal-500/5 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl text-white tracking-tight">
              מוכן להפוך את מחלקת הכספים שלך{" "}
              <span className="gradient-text">לחכמה ויעילה?</span>
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-xl text-slate-300 leading-relaxed font-light">
              בוא נתחיל עם פגישת ייעוץ חינמית של 30 דקות. ננתח את הצרכים שלך ונמפה את הדרך המהירה ביותר לאוטומציה ו-AI.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-6">
              <Button href="/contact" size="lg" className="px-12 py-7 text-xl shadow-xl shadow-royal-500/20">
                הזמן פגישה עכשיו
              </Button>
              <Button href="/blog" variant="ghost" size="lg" className="px-12 py-7 text-xl hover:bg-white/5 backdrop-blur-sm">
                קרא מאמרים בבלוג
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
