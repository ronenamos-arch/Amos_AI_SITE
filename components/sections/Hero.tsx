import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden pt-20">
      {/* Dynamic Background Effects */}
      <div className="data-stream-bg" />
      <div className="absolute top-0 left-1/4 h-[600px] w-[600px] rounded-full bg-neon-cyan/10 blur-[140px] animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-0 right-1/4 h-[600px] w-[600px] rounded-full bg-royal-500/10 blur-[140px] animate-pulse" style={{ animationDuration: '12s' }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Text content */}
          <div className="animate-wow">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-400/20 bg-teal-400/5 text-teal-400 text-xs font-bold mb-6 tracking-wider uppercase">
              <span className="flex h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
              AI & Tech-Driven Finance
            </div>
            <h1 className="text-6xl font-extrabold leading-[1.1] sm:text-7xl lg:text-8xl tracking-tight">
              רואה חשבון בשפה של{" "}
              <span className="gradient-text">טכנולוגיה</span>
            </h1>
            <p className="mt-8 text-2xl leading-relaxed text-slate-300 sm:text-3xl font-light max-w-2xl">
              הופך מחלקות כספים לחכמות, מהירות ויעילות - עם AI, Power BI
              ואוטומציה
            </p>
            <p className="mt-8 max-w-xl text-lg text-slate-400 leading-relaxed font-normal">
              רו&quot;ח מוסמך המתמחה בשילוב טכנולוגיה וכספים. מביא את חזית הקידמה לניהול הפיננסי שלך עם פתרונות AI מותאמים אישית.
            </p>
            <div className="mt-12 flex flex-wrap gap-6">
              <Button href="/contact" size="lg" className="px-12 py-7 text-xl shadow-2xl shadow-teal-400/20">
                הזמן ייעוץ חינם
              </Button>
              <Button href="#services" variant="ghost" size="lg" className="px-12 py-7 text-xl backdrop-blur-sm">
                השירותים שלי
              </Button>
            </div>
          </div>

          {/* Avatar image with enhanced glass effect */}
          <div className="relative animate-wow" style={{ animationDelay: "0.2s" }}>
            <div className="relative p-3 rounded-[2.5rem] bg-gradient-to-tr from-white/10 to-transparent border border-white/10 shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-space-950/20 group-hover:bg-transparent transition-colors duration-700" />
              <div className="absolute -inset-[100%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_20deg,rgba(34,211,238,0.1)_25deg,transparent_30deg)] animate-[spin_10s_linear_infinite]" />
              <Image
                src="/images/avatar-hero-2.jpg"
                alt="רונן עמוס - Master AI Finance"
                width={800}
                height={600}
                className="rounded-[2rem] relative z-20 grayscale-[20%] group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-1000 ease-out"
                priority
              />
            </div>
            {/* Background Glows */}
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-neon-teal/20 blur-3xl rounded-full animate-bounce-subtle" />
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-royal-500/20 blur-3xl rounded-full animate-bounce-subtle" style={{ animationDelay: '2s' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
