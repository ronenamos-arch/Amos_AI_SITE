import Link from 'next/link';
import { Crown, Sparkles, BookOpen, Video, Wrench, Terminal, FileText, ArrowLeft } from 'lucide-react';
import { getAcademyStats } from '@/lib/academy-data';

interface AcademyHeroProps {
  hasAccess: boolean;
  userName?: string | null;
}

export function AcademyHero({ hasAccess, userName }: AcademyHeroProps) {
  const stats = getAcademyStats();

  return (
    <section className="relative overflow-hidden border-b border-white/[0.08] py-14 md:py-24">
      {/* Finance-themed backdrop image dimmed so copy stays crisp */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity"
          style={{ backgroundImage: "url('/images/guides-page-bg.webp')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-space-950/80 via-space-950/95 to-space-950" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Subscriber badge */}
          {hasAccess ? (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel mb-6 border border-neon-cyan/40 bg-neon-cyan/10">
              <Crown size={14} className="text-neon-cyan" />
              <span className="text-sm font-bold text-neon-cyan">
                מנוי Pro פעיל
                {userName && <span className="text-slate-300 mr-1">· שלום {userName}</span>}
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel mb-6 border border-neon-teal/40 bg-neon-teal/10">
              <Sparkles size={14} className="text-neon-teal animate-pulse" />
              <span className="text-sm font-bold text-neon-teal">
                שלב 1 פתוח בחינם לכולם · מנוי Pro פותח את כל המאסטר-קלאסים
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            <span className="text-white">האקדמיה לאנשי כספים – </span>
            <br />
            <span className="gradient-text">מאפס לשליטה מלאה ב-AI</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl">
            ספריית הדרכות מובנית לאנשי כספים ורואי חשבון. תלמד ליצור פרומפטים, לאוטמט דוחות סטיות, ולבנות דשבורדים ניהוליים ב-Claude ו-ChatGPT.
          </p>

          {/* 🌟 Compelling Hook Banner for Non-Subscribers */}
          {!hasAccess && (
            <div className="mb-8 p-5 rounded-2xl glass-panel border border-neon-teal/50 bg-gradient-to-r from-neon-teal/10 via-space-950/80 to-transparent flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
              <div>
                <div className="flex items-center gap-2 text-neon-teal font-black text-sm mb-1">
                  <span>🚀 התחל מכאן (100% חינם)</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-medium">
                  <strong>מסלול 1: AI למתחילים בכספים</strong> — 57 דק׳ של הדרכה מעשית, 3 פרומפטים מוכנים ל-Variance Report וקובץ Context מנצח.
                </p>
              </div>
              <Link
                href="#paths"
                className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-space-950 text-sm bg-neon-teal hover:bg-neon-cyan transition-all duration-200 shadow-lg hover:scale-105"
              >
                <span>התחל מסלול חינם</span>
                <ArrowLeft size={16} />
              </Link>
            </div>
          )}

          {/* Stats row */}
          <div className="flex flex-wrap gap-5 text-xs md:text-sm text-slate-400">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
              <BookOpen size={16} className="text-neon-cyan" />
              <span>{stats.byType.guides} מדריכים</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
              <Video size={16} className="text-pink-400" />
              <span>{stats.byType.lessons} וובינרים</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
              <Wrench size={16} className="text-purple-400" />
              <span>{stats.byType.resources} כלים אינטראקטיביים</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
              <Terminal size={16} className="text-teal-400" />
              <span>{stats.byType.prompts} פרומפטים</span>
            </div>
          </div>

          {/* CTA for non-subscribers */}
          {!hasAccess && (
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/api/subscribe"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-space-950 transition-all duration-200 hover:scale-105 shadow-xl text-sm"
                style={{
                  background: 'linear-gradient(135deg, #22d3ee, #2dd4bf)',
                }}
              >
                <Crown size={18} />
                שדרג למנוי Pro — ₪100 לחודש
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
