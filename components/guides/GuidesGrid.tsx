'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, ChevronDown, Menu } from 'lucide-react';
import {
  CATEGORIES,
  getCategoryCounts,
  type Guide,
  type GuideCategory,
} from '@/lib/guides-data';
import { GuideCard } from './GuideCard';

type CategoryFilter = GuideCategory | 'all';

export function GuidesGrid({ guides }: { guides: Guide[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const counts = useMemo(() => getCategoryCounts(), []);

  const filteredByCategory = useMemo(() => {
    if (activeCategory === 'all') return guides;
    return guides.filter((g) => g.category === activeCategory);
  }, [guides, activeCategory]);

  const availableTags = useMemo(() => {
    return Array.from(new Set(filteredByCategory.flatMap((g) => g.tags)));
  }, [filteredByCategory]);

  const filtered = useMemo(() => {
    let list = filteredByCategory;
    if (activeTag) list = list.filter((g) => g.tags.includes(activeTag));
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.description.toLowerCase().includes(q) ||
          g.tags.some((t) => t.toLowerCase().includes(q)) ||
          g.category.toLowerCase().includes(q),
      );
    }
    return list;
  }, [filteredByCategory, activeTag, searchQuery]);

  const handleSelectCategory = (cat: CategoryFilter) => {
    setActiveCategory(cat);
    setActiveTag(null);
    setMobileSidebarOpen(false);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
    setActiveTag(null);
  };

  const activeCategoryLabel = activeCategory === 'all' ? 'הכל' : activeCategory;

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <aside className="w-full md:w-64 flex-shrink-0">
        <button
          type="button"
          onClick={() => setMobileSidebarOpen((v) => !v)}
          className="md:hidden glass-panel rounded-xl w-full px-4 py-3 flex items-center justify-between text-slate-200 font-medium"
          aria-expanded={mobileSidebarOpen}
        >
          <span className="flex items-center gap-2">
            <Menu size={18} />
            <span>קטגוריות · {activeCategoryLabel}</span>
          </span>
          <ChevronDown
            size={18}
            className={`transition-transform ${mobileSidebarOpen ? 'rotate-180' : ''}`}
          />
        </button>

        <div className={`${mobileSidebarOpen ? 'block' : 'hidden'} md:block md:sticky md:top-24 mt-3 md:mt-0`}>
          <div className="glass-panel rounded-xl p-4">
            <p className="hidden md:block text-xs uppercase tracking-wider text-slate-500 mb-4 px-2">
              קטגוריות
            </p>
            <nav className="flex flex-col">
              <CategoryButton
                label="הכל"
                count={counts.all}
                active={activeCategory === 'all'}
                onClick={() => handleSelectCategory('all')}
              />
              {CATEGORIES.map((cat) => (
                <CategoryButton
                  key={cat}
                  label={cat}
                  count={counts[cat]}
                  active={activeCategory === cat}
                  onClick={() => handleSelectCategory(cat)}
                />
              ))}
            </nav>
          </div>

          <div
            className="glass-panel rounded-xl p-5 mt-4 relative overflow-hidden"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 0%, rgba(45,212,191,0.15), transparent 60%)',
            }}
          >
            <h4 className="text-white font-bold text-base mb-2">רוצה גישה מלאה?</h4>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              מנוי פרימיום פותח את כל הבלוג, ספריית הפרומפטים והמדריכים המתקדמים.
            </p>
            <Link
              href="/pricing"
              className="inline-block w-full text-center bg-gradient-to-l from-neon-cyan to-neon-teal text-space-950 font-bold text-sm py-2.5 rounded-lg hover:opacity-90 transition-opacity"
            >
              שדרג עכשיו
            </Link>
          </div>
        </div>
      </aside>

      <main className="flex-grow min-w-0">
        <div className="relative mb-5">
          <Search
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="חפש מדריך, תגית או קטגוריה..."
            className="glass-panel w-full rounded-xl py-3 pr-12 pl-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div className="flex flex-wrap gap-2">
            <FilterChip
              label="הכל"
              active={activeTag === null}
              onClick={() => setActiveTag(null)}
            />
            {availableTags.map((tag) => (
              <FilterChip
                key={tag}
                label={tag}
                active={activeTag === tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              />
            ))}
          </div>

          <select
            className="glass-panel text-sm text-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 cursor-pointer"
            defaultValue="newest"
          >
            <option value="newest">החדש ביותר</option>
            <option value="popular">פופולרי</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="glass-panel rounded-xl p-12 text-center">
            <p className="text-slate-300 text-lg mb-4">לא נמצאו מדריכים תואמים</p>
            <button
              type="button"
              onClick={resetFilters}
              className="bg-gradient-to-l from-neon-cyan to-neon-teal text-space-950 font-bold text-sm px-5 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              נקה פילטרים
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function CategoryButton({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-l-lg text-sm transition-colors ${
        active ? 'text-neon-cyan font-bold' : 'text-slate-400 hover:bg-white/5'
      }`}
      style={
        active
          ? {
              backgroundImage:
                'linear-gradient(to left, rgba(34,211,238,0.15), rgba(45,212,191,0.05))',
              borderRight: '2px solid #22d3ee',
            }
          : undefined
      }
    >
      <span>{label}</span>
      <span className={`text-xs ${active ? 'text-neon-cyan' : 'text-slate-500'}`}>
        {count}
      </span>
    </button>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  if (active) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="text-xs font-bold px-3 py-1.5 rounded-full bg-gradient-to-l from-neon-cyan to-neon-teal text-space-950 transition-all"
      >
        {label}
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className="glass-panel text-xs font-medium px-3 py-1.5 rounded-full text-slate-300 hover:text-white hover:border-neon-cyan/40 transition-colors"
    >
      {label}
    </button>
  );
}
