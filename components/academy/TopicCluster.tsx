'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { TopicCluster as TopicClusterType } from '@/lib/academy-data';
import { ContentCard } from './ContentCard';

interface TopicClusterProps {
  cluster: TopicClusterType;
  hasAccess: boolean;
  /** Whether to start expanded */
  defaultOpen?: boolean;
}

const TIER_COLORS = {
  beginner: { bg: 'rgba(34,211,238,0.08)', border: 'rgba(34,211,238,0.25)', text: '#22d3ee', label: 'יסודות' },
  intermediate: { bg: 'rgba(96,165,250,0.08)', border: 'rgba(96,165,250,0.25)', text: '#60a5fa', label: 'מיומנויות ליבה' },
  advanced: { bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.25)', text: '#a78bfa', label: 'מומחיות' },
};

export function TopicCluster({ cluster, hasAccess, defaultOpen = false }: TopicClusterProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const tier = TIER_COLORS[cluster.tier];
  const freeCount = cluster.items.filter((i) => !i.isPremium).length;
  const premiumCount = cluster.items.filter((i) => i.isPremium).length;

  return (
    <div className="mb-6">
      {/* Cluster Header — clickable to expand/collapse */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-4 p-4 rounded-xl glass-panel transition-all duration-200 hover:border-white/[0.15] group text-right"
      >
        {/* Icon */}
        <div
          className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
          style={{ backgroundColor: tier.bg, border: `1px solid ${tier.border}` }}
        >
          {cluster.icon}
        </div>

        {/* Title + meta */}
        <div className="flex-grow min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-lg font-bold text-white">{cluster.title}</h2>
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-medium"
              style={{ backgroundColor: tier.bg, border: `1px solid ${tier.border}`, color: tier.text }}
            >
              {tier.label}
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-0.5 line-clamp-1">{cluster.description}</p>
        </div>

        {/* Stats */}
        <div className="hidden sm:flex items-center gap-4 flex-shrink-0 text-xs text-slate-500">
          <span>{cluster.items.length} פריטים</span>
          {freeCount > 0 && (
            <span className="text-neon-teal">{freeCount} חינם</span>
          )}
          {premiumCount > 0 && (
            <span className="text-royal-400">{premiumCount} פרימיום</span>
          )}
        </div>

        {/* Chevron */}
        <ChevronDown
          size={20}
          className={`flex-shrink-0 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Expanded content grid */}
      {isOpen && (
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pr-2">
          {cluster.items.map((item) => (
            <ContentCard key={item.id} item={item} hasAccess={hasAccess} />
          ))}
        </div>
      )}
    </div>
  );
}
