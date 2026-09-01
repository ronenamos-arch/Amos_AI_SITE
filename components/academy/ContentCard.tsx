'use client';

import Link from 'next/link';
import {
  Bot,
  MessageSquare,
  Workflow,
  Table,
  BarChart3,
  BookOpen,
  Briefcase,
  FileText,
  Video,
  Wrench,
  Terminal,
  Lock,
} from 'lucide-react';
import type { AcademyContentItem, ContentType } from '@/lib/academy-data';
import { getContentUrl } from '@/lib/academy-data';
import Image from 'next/image';

// ─── Content type icon mapping ──────────────────────────────────────────────
const TYPE_ICONS: Record<ContentType, typeof Bot> = {
  guide: BookOpen,
  resource: Wrench,
  lesson: Video,
  prompt: Terminal,
  blog: FileText,
};

const TYPE_LABELS: Record<ContentType, string> = {
  guide: 'מדריך',
  resource: 'משאב אינטראקטיבי',
  lesson: 'וובינר מוקלט',
  prompt: 'פרומפט',
  blog: 'מאמר',
};

const TYPE_COLORS: Record<ContentType, string> = {
  guide: '#22d3ee',    // cyan
  resource: '#a78bfa', // purple
  lesson: '#f472b6',   // pink
  prompt: '#2dd4bf',   // teal
  blog: '#60a5fa',     // blue
};

const GRID_PATTERN_STYLE = {
  backgroundImage:
    'linear-gradient(rgba(100,116,139,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(100,116,139,0.08) 1px, transparent 1px)',
  backgroundSize: '24px 24px',
};

const TYPE_IMAGES: Record<ContentType, string> = {
  guide: '/images/card-guides.jpg',
  resource: '/guides/artifacts.jpg',
  lesson: '/images/card-webinars.jpg',
  prompt: '/images/card-prompts.png',
  blog: '/images/card-blog.png',
};

// ─── Component ──────────────────────────────────────────────────────────────
interface ContentCardProps {
  item: AcademyContentItem & { thumbnail?: string };
  hasAccess: boolean;
  stepNumber?: number;
  compact?: boolean;
}

export function ContentCard({ item, hasAccess, stepNumber, compact = false }: ContentCardProps) {
  const TypeIcon = TYPE_ICONS[item.contentType];
  const typeLabel = TYPE_LABELS[item.contentType];
  const typeColor = TYPE_COLORS[item.contentType];
  const href = getContentUrl(item);
  
  // Enforce premium lock: only accessible if user has access OR item is explicitly free
  const isLocked = item.isPremium && !hasAccess;

  const durationDisplay = item.durationMinutes < 60
    ? `${item.durationMinutes} דק׳`
    : `${Math.floor(item.durationMinutes / 60)} שעות`;

  const imageSrc = item.thumbnail || TYPE_IMAGES[item.contentType];

  const card = (
    <article
      className={`
        glass-panel rounded-xl overflow-hidden flex transition-all duration-300
        group relative
        ${compact ? 'flex-row items-stretch h-28' : 'flex-col h-full'}
        ${isLocked
          ? 'opacity-85 hover:opacity-100 hover:border-royal-400/50 hover:shadow-[0_0_20px_-8px_rgba(99,102,241,0.3)]'
          : 'hover:-translate-y-1 hover:border-neon-cyan/50 hover:shadow-[0_0_30px_-8px_rgba(34,211,238,0.4)]'
        }
      `}
    >
      {/* Step number badge (for learning paths) */}
      {stepNumber && (
        <div
          className={`
            absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border border-white/20 shadow-lg
          `}
          style={{ backgroundColor: 'rgba(15,23,42,0.8)', color: '#fff' }}
        >
          {stepNumber}
        </div>
      )}

      {/* Image Header Area */}
      <div className={`relative overflow-hidden flex-shrink-0 bg-space-950 ${compact ? 'w-28 border-l border-white/10' : 'h-40 border-b border-white/10'}`}>
        <Image
          src={imageSrc}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
        />
        
        {/* Subtle overlay to ensure badges are legible */}
        <div className="absolute inset-0 bg-gradient-to-t from-space-950 via-transparent to-space-950/40" />
        
        {/* Large faint icon in the center */}
        <div className="absolute inset-0 flex items-center justify-center mix-blend-overlay opacity-30">
           <TypeIcon size={64} style={{ color: typeColor }} />
        </div>
        
        {/* Top-left Badges inside the image area */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {item.isPremium ? (
            <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-royal-400 text-space-950 shadow-md">
              פרימיום
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-neon-teal text-space-950 shadow-md">
              חינם
            </span>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className={`flex flex-col flex-grow p-4 ${compact ? 'justify-center' : ''}`}>
        
        {/* Meta row */}
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span
            className="text-[10px] font-medium uppercase tracking-wider"
            style={{ color: typeColor }}
          >
            {typeLabel}
          </span>
          <span className="text-[10px] text-slate-500 mr-auto" dir="ltr">
            {durationDisplay}
          </span>
        </div>

        {/* Title */}
        <h3 className={`font-bold text-white leading-snug ${compact ? 'text-sm line-clamp-2' : 'text-base mb-2'}`}>
          {item.title}
        </h3>

        {/* Description (expanded from 1 sentence) */}
        {!compact && item.description && (
          <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4 flex-grow">
            {item.description}
          </p>
        )}

        {/* Lock overlay or Call to action */}
        {!compact && (
          <div className="mt-auto pt-2 flex items-center justify-between border-t border-white/[0.04]">
            {isLocked ? (
              <div className="flex items-center gap-1.5 text-royal-400">
                <Lock size={14} />
                <span className="text-xs font-medium">דורש מנוי Pro</span>
              </div>
            ) : (
              <span className="text-xs font-bold text-neon-cyan hover:text-neon-teal inline-flex items-center gap-1 transition-colors">
                <span>צפה עכשיו</span>
                <span className="inline-block transition-transform group-hover:-translate-x-1">←</span>
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );

  // Locked items link to the pricing page so users see subscription value before paying
  if (isLocked) {
    return (
      <Link href="/pricing" className="block h-full">
        {card}
      </Link>
    );
  }

  return (
    <Link href={href} className="block h-full">
      {card}
    </Link>
  );
}
