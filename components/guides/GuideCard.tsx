import Image from 'next/image';
import Link from 'next/link';
import {
  Bot,
  MessageSquare,
  Workflow,
  Table,
  BarChart3,
  BookOpen,
  Briefcase,
} from 'lucide-react';
import type { Guide, GuideCategory } from '@/lib/guides-data';

const CATEGORY_ICONS: Record<GuideCategory, typeof Bot> = {
  Claude: Bot,
  ChatGPT: MessageSquare,
  'אוטומציה': Workflow,
  Excel: Table,
  'Power BI': BarChart3,
  NotebookLM: BookOpen,
  'מחלקות כספים': Briefcase,
};

const GRID_PATTERN_STYLE = {
  backgroundImage:
    'linear-gradient(rgba(100,116,139,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(100,116,139,0.08) 1px, transparent 1px)',
  backgroundSize: '24px 24px',
};

export function GuideCard({ guide }: { guide: Guide }) {
  const Icon = CATEGORY_ICONS[guide.category];
  const isComingSoon = guide.gammaUrl === '#';

  const card = (
    <article className="glass-panel rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-neon-cyan/50 hover:shadow-[0_0_30px_-8px_rgba(34,211,238,0.4)] group h-full">
      <div className="relative h-44 overflow-hidden">
        {guide.thumbnail ? (
          <Image
            src={guide.thumbnail}
            alt={guide.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-300">
            <div className="absolute inset-0" style={GRID_PATTERN_STYLE} />
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon size={56} className="text-slate-600 opacity-60" strokeWidth={1.5} />
            </div>
          </div>
        )}

        <div className="absolute top-3 left-3">
          {guide.isPremium ? (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-royal-400 text-space-950">
              פרימיום
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-neon-teal text-space-950">
              חינמי
            </span>
          )}
        </div>

        <div className="absolute bottom-3 inset-x-3 flex justify-between items-center">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-800/90 text-slate-100">
            {guide.category}
          </span>
          <span className="text-[11px] text-slate-600 font-medium bg-white/70 px-2 py-0.5 rounded">
            {guide.duration}
          </span>
        </div>
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-lg font-bold text-white leading-snug mb-2">
          {guide.title}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed mb-4 flex-grow">
          {guide.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {guide.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded font-medium"
              style={{ backgroundColor: 'rgba(34,211,238,0.1)', color: '#67e8f9' }}
            >
              {tag}
            </span>
          ))}
        </div>

        {isComingSoon ? (
          <span className="text-sm font-bold text-neon-cyan opacity-50 cursor-not-allowed">
            בקרוב...
          </span>
        ) : (
          <span className="text-sm font-bold text-neon-cyan hover:text-neon-teal inline-flex items-center gap-1 transition-colors">
            <span>{guide.resourceSlug ? 'צפה במשאב' : 'צפה במדריך'}</span>
            <span className="inline-block transition-transform group-hover:-translate-x-1">←</span>
          </span>
        )}
      </div>
    </article>
  );

  if (isComingSoon) return card;
  return (
    <Link href={`/guides/${guide.slug}`} className="block">
      {card}
    </Link>
  );
}
