import Image from "next/image";
import { Sparkles, Video, Clock, FolderDown } from "lucide-react";

interface LessonsHeroProps {
    lessonsCount: number;
    hours: number;
    totalMaterials: number;
}

export function LessonsHero({ lessonsCount, hours, totalMaterials }: LessonsHeroProps) {
    return (
        <section className="relative pt-16 pb-12 lg:pt-20 lg:pb-16 overflow-hidden">
            <div className="rv2-container relative z-10">
                <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 xl:gap-12">
                    {/* Text Column */}
                    <div className="rv2-rise relative z-10 lg:max-w-[50%] xl:max-w-[48%]">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-gradient-to-r from-amber-500/15 to-yellow-500/10 px-4 py-1.5 text-xs font-bold text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.2)] backdrop-blur-md">
                            <Sparkles size={14} className="text-amber-400 animate-pulse" />
                            <span>הספרייה הבלעדית</span>
                        </div>

                        {/* Header Title */}
                        <h1 className="rv2-display text-3xl sm:text-4xl lg:text-[2.9rem] xl:text-[3.2rem] leading-[1.15] text-white">
                            הדרכות לייב ווובינרים{" "}
                            <span className="block sm:inline sm:before:content-['\a0|\a0'] bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(250,204,21,0.35)]">
                                הקלטות לצפייה
                            </span>
                        </h1>

                        <p className="mt-5 max-w-xl text-lg text-[var(--rv2-text-2)] leading-relaxed">
                            מפגשים מוקלטים של עבודה מעשית על המסך, בליווי קבצים להורדה — חוברות Excel,
                            פרומפטים, מצגות, Skills וקוד. כל שיעור נבנה סביב אתגר אמיתי מהעבודה השוטפת
                            של אנשי כספים.
                        </p>

                        {/* Luminous Stats Highlights */}
                        <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                            <div className="flex items-center gap-2 rounded-xl border border-amber-400/30 bg-amber-950/30 px-4 py-2 text-sm backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.15)]">
                                <Video size={16} className="text-amber-400" />
                                <span className="font-bold text-white" dir="ltr">{lessonsCount}</span>
                                <span className="text-[var(--rv2-text-2)]">מפגשים מוקלטים</span>
                            </div>
                            <div className="flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-950/30 px-4 py-2 text-sm backdrop-blur-md shadow-[0_0_15px_rgba(34,211,238,0.15)]">
                                <Clock size={16} className="text-cyan-400" />
                                <span className="font-bold text-white" dir="ltr">{hours}</span>
                                <span className="text-[var(--rv2-text-2)]">שעות תוכן מעשי</span>
                            </div>
                            <div className="flex items-center gap-2 rounded-xl border border-amber-400/30 bg-amber-950/30 px-4 py-2 text-sm backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.15)]">
                                <FolderDown size={16} className="text-amber-400" />
                                <span className="font-bold text-white" dir="ltr">{totalMaterials}</span>
                                <span className="text-[var(--rv2-text-2)]">קבצים וחומרים להורדה</span>
                            </div>
                        </div>
                    </div>

                    {/* 100% Crisp 3D Luxury Framed Mockup on Left (Enlarged +5%) */}
                    <div className="w-full lg:w-[48%] xl:w-[52%] relative z-10 lg:scale-[1.05] lg:origin-left transition-transform duration-300">
                        {/* 3D Glass Device Container */}
                        <div className="relative rounded-2xl border-2 border-amber-400/40 bg-gradient-to-b from-slate-900/95 to-slate-950 p-2.5 sm:p-3.5 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95),0_0_40px_rgba(234,179,8,0.3)] ring-1 ring-white/15 backdrop-blur-2xl">
                            {/* Top Browser/App Bar with Golden Accents */}
                            <div className="mb-2.5 flex items-center justify-between border-b border-amber-400/20 pb-2 px-2">
                                <div className="flex items-center gap-1.5">
                                    <div className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                                    <div className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                                </div>
                                <div className="flex items-center gap-2 rounded-md border border-amber-400/25 bg-slate-900 px-3 py-0.5 text-[11px] font-medium text-amber-300 shadow-inner">
                                    <Sparkles size={11} className="text-amber-400" />
                                    <span>לוח בקרה לביצועי SaaS — דוגמה מעשית</span>
                                </div>
                                <div className="w-10" />
                            </div>

                            {/* 100% Crisp Dashboard Image */}
                            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-slate-950">
                                <Image
                                    src="/images/lessons/hero-dashboard-bg.png"
                                    alt="לוח בקרה לביצועי SaaS"
                                    width={1200}
                                    height={675}
                                    className="w-full h-auto object-cover"
                                    priority
                                />
                                {/* Subtle Top-Edge Glass Shine */}
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-transparent to-amber-300/10" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
