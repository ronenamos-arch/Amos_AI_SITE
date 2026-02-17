import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="data-stream-bg" />
      <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-neon-cyan/10 blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-royal-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Text content */}
          <div className="animate-wow">
            <h1 className="text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">
              רואה חשבון שמדבר{" "}
              <span className="gradient-text">בשפה של הטכנולוגיה</span>
            </h1>
            <p className="mt-8 text-2xl leading-relaxed text-slate-300 sm:text-3xl font-light">
              הופך מחלקות כספים לחכמות, מהירות ויעילות - עם AI, Power BI
              ואוטומציה
            </p>
            <p className="mt-6 max-w-xl text-lg text-slate-400 leading-relaxed">
              רו&quot;ח מוסמך ויועץ טכנולוגי פיננסי. משלב מומחיות עמוקה בתקני
              דיווח בינלאומיים (ASC 606/IFRS 15) עם שליטה מתקדמת ב-Power BI,
              Python, AI ואוטומציות.
            </p>
            <div className="mt-10 flex flex-wrap gap-6">
              <Button href="/contact" size="lg" className="neon-border px-10 py-6 text-xl">
                הזמן ייעוץ חינם
              </Button>
              <Button href="/services" variant="ghost" size="lg" className="px-10 py-6 text-xl hover:bg-white/5 transition-all">
                השירותים שלי
              </Button>
            </div>
          </div>

          {/* Avatar image */}
          <div className="relative animate-wow" style={{ animationDelay: "0.2s" }}>
            <div className="glass-panel rounded-3xl p-2 relative z-10 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-neon-cyan/20 to-transparent" />
              <Image
                src="/images/avatar-hero-2.jpg"
                alt="רונן עמוס - Master AI Finance"
                width={700}
                height={500}
                className="rounded-2xl relative z-20 hover:scale-105 transition-all duration-700"
                priority
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-neon-teal/20 blur-2xl rounded-full" />
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-royal-500/20 blur-2xl rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
