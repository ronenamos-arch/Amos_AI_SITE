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

// ─── Component ──────────────────────────────────────────────────────────────
interface ContentCardProps {
  item: AcademyContentItem;
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

  // Determine an image or generic rich background
  const hasThumbnail = false; // We can add item.thumbnail to academy-data later

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

      {/* Image / Graphic Header Area */}
      <div className={`relative overflow-hidden flex-shrink-0 ${compact ? 'w-28 border-l border-white/10' : 'h-36 border-b border-white/10'}`}>
        {hasThumbnail ? (
          <Image
            src={"" /* placeholder for item.thumbnail */}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-space-950 flex flex-col items-center justify-center transition-transform duration-500 group-hover:scale-105"
               style={{ background: `radial-gradient(circle at center, ${typeColor}20 0%, #090D16 100%)` }}>
            <div className="absolute inset-0" style={GRID_PATTERN_STYLE} />
            <TypeIcon size={40} style={{ color: typeColor, opacity: 0.8 }} strokeWidth={1.5} className="z-10" />
          </div>
        )}
        
        {/* Top-left Badges inside the image area */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {item.isPremium ? (
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-royal-400 text-space-950 shadow-md">
              פרימיום
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-neon-teal text-space-950 shadow-md">
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

  if (isLocked) {
    return (
      <Link href="/api/subscribe" className="block h-full">
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
