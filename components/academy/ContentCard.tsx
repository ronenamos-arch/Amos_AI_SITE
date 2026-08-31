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

// ─── Component ──────────────────────────────────────────────────────────────
interface ContentCardProps {
  item: AcademyContentItem;
  /** Whether the current user has a Pro subscription */
  hasAccess: boolean;
  /** Optional: show step number in a learning path */
  stepNumber?: number;
  /** Optional: compact mode for path detail views */
  compact?: boolean;
}

export function ContentCard({ item, hasAccess, stepNumber, compact = false }: ContentCardProps) {
  const TypeIcon = TYPE_ICONS[item.contentType];
  const typeLabel = TYPE_LABELS[item.contentType];
  const typeColor = TYPE_COLORS[item.contentType];
  const href = getContentUrl(item);
  const isLocked = item.isPremium && !hasAccess;

  const durationDisplay = item.durationMinutes < 60
    ? `${item.durationMinutes} דק׳`
    : `${Math.floor(item.durationMinutes / 60)} שעות`;

  const card = (
    <article
      className={`
        glass-panel rounded-xl overflow-hidden flex transition-all duration-300
        group relative
        ${compact ? 'flex-row items-center gap-4 p-4' : 'flex-col p-5'}
        ${isLocked
          ? 'opacity-80 hover:opacity-100 hover:border-royal-400/40 hover:shadow-[0_0_20px_-8px_rgba(99,102,241,0.3)]'
          : 'hover:-translate-y-1 hover:border-neon-cyan/50 hover:shadow-[0_0_30px_-8px_rgba(34,211,238,0.4)]'
        }
      `}
    >
      {/* Step number badge (for learning paths) */}
      {stepNumber && (
        <div
          className={`
            ${compact ? 'flex-shrink-0' : 'absolute top-4 right-4'}
            w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
            border border-neon-cyan/30
          `}
          style={{ backgroundColor: 'rgba(34,211,238,0.1)', color: '#22d3ee' }}
        >
          {stepNumber}
        </div>
      )}

      {/* Type icon */}
      <div
        className={`flex-shrink-0 ${compact ? '' : 'mb-3'}`}
      >
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{
            backgroundColor: `${typeColor}15`,
            border: `1px solid ${typeColor}30`,
          }}
        >
          <TypeIcon size={20} style={{ color: typeColor }} strokeWidth={1.5} />
        </div>
      </div>

      {/* Content */}
      <div className={`flex-grow ${compact ? '' : ''}`}>
        {/* Top row: type label + badges */}
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          <span
            className="text-[10px] font-medium uppercase tracking-wider"
            style={{ color: typeColor }}
          >
            {typeLabel}
          </span>

          {item.isPremium ? (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-royal-400 text-space-950">
              פרימיום
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-neon-teal text-space-950">
              חינם
            </span>
          )}

          <span className="text-[10px] text-slate-500 mr-auto" dir="ltr">
            {durationDisplay}
          </span>
        </div>

        {/* Title */}
        <h3 className={`font-bold text-white leading-snug ${compact ? 'text-sm' : 'text-base mb-2'}`}>
          {item.title}
        </h3>

        {/* Description (hidden in compact mode) */}
        {!compact && (
          <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">
            {item.description}
          </p>
        )}
      </div>

      {/* Lock overlay for premium content */}
      {isLocked && (
        <div className={`flex-shrink-0 ${compact ? '' : 'mt-3'}`}>
          <div className="flex items-center gap-1.5 text-royal-400">
            <Lock size={14} />
            <span className="text-xs font-medium">מנוי Pro</span>
          </div>
        </div>
      )}

      {/* Arrow indicator for accessible content */}
      {!isLocked && !compact && (
        <div className="mt-3">
          <span className="text-sm font-bold text-neon-cyan hover:text-neon-teal inline-flex items-center gap-1 transition-colors">
            <span>צפה</span>
            <span className="inline-block transition-transform group-hover:-translate-x-1">←</span>
          </span>
        </div>
      )}
    </article>
  );

  // Locked items link to the subscribe flow
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
