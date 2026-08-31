import Link from 'next/link';
import { Crown, Sparkles, BookOpen, Video, Wrench, Terminal, FileText } from 'lucide-react';
import { getAcademyStats } from '@/lib/academy-data';

interface AcademyHeroProps {
  hasAccess: boolean;
  userName?: string | null;
}

export function AcademyHero({ hasAccess, userName }: AcademyHeroProps) {
  const stats = getAcademyStats();
  const totalHours = Math.round(stats.totalMinutes / 60);

  return (
    <section className="relative overflow-hidden border-b border-white/[0.06]">
      {/* Subtle gradient background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(34,211,238,0.08), transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="max-w-3xl">
          {/* Subscriber badge */}
          {hasAccess ? (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel mb-6 border border-neon-cyan/30">
              <Crown size={14} className="text-neon-cyan" />
              <span className="text-sm font-medium text-neon-cyan">
                מנוי Pro פעיל
                {userName && <span className="text-slate-400 mr-1">· {userName}</span>}
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel mb-6 border border-slate-700">
              <Sparkles size={14} className="text-slate-400" />
              <span className="text-sm font-medium text-slate-400">
                גישה חינמית — שדרג למנוי Pro לגישה מלאה
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 leading-tight">
            <span className="text-white">האקדמיה שלך ל-</span>
            <span className="gradient-text">AI בכספים</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-slate-400 leading-relaxed mb-8 max-w-2xl">
            מדריכים, וובינרים, כלים אינטראקטיביים ופרומפטים — הכל מאורגן במסלולי למידה מובנים.
            {!hasAccess && (
              <span className="block mt-2 text-sm text-slate-500">
                חלק מהתכנים פתוחים לכולם. מנוי Pro פותח את הכל.
              </span>
            )}
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <BookOpen size={16} className="text-neon-cyan" />
              <span>{stats.byType.guides} מדריכים</span>
            </div>
            <div className="flex items-center gap-2">
              <Video size={16} className="text-pink-400" />
              <span>{stats.byType.lessons} וובינרים</span>
            </div>
            <div className="flex items-center gap-2">
              <Wrench size={16} className="text-purple-400" />
              <span>{stats.byType.resources} כלים אינטראקטיביים</span>
            </div>
            <div className="flex items-center gap-2">
              <Terminal size={16} className="text-teal-400" />
              <span>{stats.byType.prompts} פרומפטים</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-blue-400" />
              <span>{stats.byType.blogs} מאמרים</span>
            </div>
          </div>

          {/* CTA for non-subscribers */}
          {!hasAccess && (
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/api/subscribe"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-space-950 transition-all duration-200 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #22d3ee, #2dd4bf)',
                }}
              >
                <Crown size={16} />
                רכוש מנוי Pro — ₪100 לחודש
              </a>
              <Link
                href="#paths"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-slate-300 glass-panel hover:text-white transition-colors"
              >
                גלה את מסלולי הלמידה ↓
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
