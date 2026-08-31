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
    <Link href={`/academy/paths/${path.slug}`} className="block group">
      <article
        className="glass-panel rounded-xl p-6 h-full flex flex-col transition-all duration-300 hover:-translate-y-1"
        style={{
          borderColor: tier.border,
          boxShadow: `0 0 30px -12px ${tier.glow}`,
        }}
      >
        {/* Icon + Tier */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
            style={{ backgroundColor: tier.bg, border: `1px solid ${tier.border}` }}
          >
            {path.icon}
          </div>
          <span
            className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
            style={{ backgroundColor: tier.bg, border: `1px solid ${tier.border}`, color: tier.text }}
          >
            {path.tierLabel}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-2 leading-snug">
          {path.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-400 leading-relaxed mb-4 flex-grow">
          {path.description}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
          <div className="flex items-center gap-1">
            <Layers size={12} />
            <span>{premiumSteps} שלבים</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>{formatDuration(path.totalMinutes)}</span>
          </div>
        </div>

        {/* CTA */}
        <div
          className="flex items-center gap-1 text-sm font-bold transition-colors"
          style={{ color: tier.text }}
        >
          <span>התחל מסלול</span>
          <ArrowLeft size={14} className="inline-block transition-transform group-hover:-translate-x-1" />
        </div>
      </article>
    </Link>
  );
}
