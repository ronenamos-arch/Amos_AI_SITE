import Link from 'next/link';
import { ArrowLeft, Clock, Layers } from 'lucide-react';
import type { LearningPath } from '@/lib/learning-paths-data';
import { formatDuration } from '@/lib/learning-paths-data';

interface LearningPathCardProps {
  path: LearningPath;
  hasAccess: boolean;
}

const TIER_GRADIENTS = {
  beginner: {
    border: 'rgba(34,211,238,0.35)',
    glow: 'rgba(34,211,238,0.15)',
    text: '#22d3ee',
    bg: 'rgba(34,211,238,0.06)',
  },
  intermediate: {
    border: 'rgba(96,165,250,0.35)',
    glow: 'rgba(96,165,250,0.15)',
    text: '#60a5fa',
    bg: 'rgba(96,165,250,0.06)',
  },
  advanced: {
    border: 'rgba(167,139,250,0.35)',
    glow: 'rgba(167,139,250,0.15)',
    text: '#a78bfa',
    bg: 'rgba(167,139,250,0.06)',
  },
};

export function LearningPathCard({ path, hasAccess }: LearningPathCardProps) {
  const tier = TIER_GRADIENTS[path.tier];
  const premiumSteps = path.steps.filter((s) => !s.isOptional).length;

  return (
    <Link href={`/academy/paths/${path.slug}`} className="block group h-full">
      <article
        className="glass-panel rounded-xl overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-1"
        style={{
          borderColor: tier.border,
          boxShadow: `0 0 30px -12px ${tier.glow}`,
        }}
      >
        {/* Graphic Header Area */}
        <div className="relative h-32 w-full flex items-center justify-center overflow-hidden border-b border-white/5"
             style={{ background: `radial-gradient(circle at top right, ${tier.bg} 0%, rgba(15,23,42,1) 100%)` }}>
          
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 opacity-40" 
               style={{
                 backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                 backgroundSize: '20px 20px'
               }} 
          />
          
          <div
            className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-2xl transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundColor: tier.bg, border: `1px solid ${tier.border}` }}
          >
            {path.icon}
          </div>

          <div className="absolute top-3 right-3 z-10">
            <span
              className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md"
              style={{ backgroundColor: tier.bg, border: `1px solid ${tier.border}`, color: tier.text }}
            >
              {path.tierLabel}
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-white mb-3 leading-snug group-hover:text-neon-cyan transition-colors">
            {path.title}
          </h3>

          <p className="text-sm text-slate-400 leading-relaxed mb-6 flex-grow line-clamp-3">
            {path.description}
          </p>

          <div className="mt-auto">
            {/* Meta row */}
            <div className="flex items-center gap-4 text-xs text-slate-500 mb-4 pb-4 border-b border-white/5">
              <div className="flex items-center gap-1.5">
                <Layers size={14} style={{ color: tier.text }} />
                <span>{premiumSteps} שלבים</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} style={{ color: tier.text }} />
                <span>{formatDuration(path.totalMinutes)}</span>
              </div>
            </div>

            {/* CTA */}
            <div
              className="flex items-center gap-1.5 text-sm font-bold transition-colors"
              style={{ color: tier.text }}
            >
              <span>התחל מסלול</span>
              <ArrowLeft size={16} className="inline-block transition-transform group-hover:-translate-x-1" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
