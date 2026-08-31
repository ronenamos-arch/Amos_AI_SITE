import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, Layers } from 'lucide-react';
import type { LearningPath } from '@/lib/learning-paths-data';
import { formatDuration } from '@/lib/learning-paths-data';

const PATH_IMAGES = {
  'ai-beginners': '/guides/chatgpt.png',
  'prompt-engineering': '/guides/chatgpt-20-frameworks.png',
  'claude-mastery': '/guides/claude-finance-guide.png',
  'excel-automation': '/guides/excel-ai.png',
  'month-end-close': '/images/fpna-book.png',
  'dashboard-pro': '/guides/ai-excel-dashboard.png',
};

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
        <div className="relative h-40 w-full flex items-center justify-center overflow-hidden border-b border-white/5 bg-space-950">
          
          <Image 
            src={PATH_IMAGES[path.slug as keyof typeof PATH_IMAGES] || '/images/card-guides.jpg'}
            alt={path.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-space-950 via-space-950/40 to-transparent" />
          
          <div
            className="absolute bottom-4 right-4 z-10 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-xl transition-transform duration-500 group-hover:-translate-y-1"
            style={{ backgroundColor: tier.bg, border: `1px solid ${tier.border}` }}
          >
            {path.icon}
          </div>

          <div className="absolute top-3 right-3 z-10">
            <span
              className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-lg"
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
