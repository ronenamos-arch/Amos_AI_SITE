'use client'

import { useState } from 'react'
import { tools, CATEGORIES, Tool, ToolCategory } from '@/lib/tools-data'

export default function ToolsPage() {
  const [active, setActive] = useState<'all' | ToolCategory>('all')

  const filtered =
    active === 'all' ? tools : tools.filter((t) => t.category === active)

  return (
    <div className="pt-16" dir="rtl">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        {/* radial-gradient overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(circle at top right, rgba(99, 102, 241, 0.2), transparent 70%)',
          }}
        />

        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center md:py-24">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-semibold tracking-wider text-neon-cyan backdrop-blur-md">
            AI & TECH-DRIVEN FINANCE
          </span>

          <h1 className="mb-6 text-4xl font-black leading-tight md:text-5xl">
            כלים ופלטפורמות
            <br />
            <span className="gradient-text">מומלצים לצוותי כספים</span>
          </h1>

          <p className="mx-auto mb-4 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg">
            אוסף הכלים הטובים ביותר בתחומי FP&A, אוטומציה, ERP, Fintech
            ו-AI פיננסי — שנבחרו בקפידה עבור מחלקות כספים מודרניות.
          </p>

          {/* selection criteria line — trust signal */}
          <p className="text-sm text-slate-500">
            נבחר לפי שימוש אמיתי בצוותי כספים.
          </p>
        </div>
      </section>

      {/* FILTER PILLS */}
      <div className="flex flex-wrap justify-center gap-3 px-4 py-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            aria-pressed={active === cat.key}
            onClick={() => setActive(cat.key)}
            className={
              active === cat.key
                ? 'bg-gradient-to-l from-neon-cyan to-neon-teal rounded-full px-5 py-2 text-sm font-bold text-space-950 transition-all'
                : 'glass-panel rounded-full px-5 py-2 text-sm font-semibold text-slate-400 transition-colors hover:text-neon-cyan'
            }
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="mx-auto max-w-7xl px-4 pb-16 grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {filtered.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>

      {/* COMING SOON FOOTER NOTE */}
      <div className="mx-auto max-w-7xl px-4 pb-20 text-center">
        <p className="text-sm text-slate-500">
          בהמשך: סקירות מעמיקות ומדריכי הטמעה לכל כלי.
        </p>
      </div>
    </div>
  )
}

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <article
      className="group relative glass-panel flex flex-col gap-4 overflow-hidden rounded-xl p-6 transition-all duration-300 md:p-7
        hover:-translate-y-2 hover:border-neon-cyan/80 hover:shadow-[0_0_50px_-10px_rgba(34,211,238,0.6),0_0_80px_-20px_rgba(45,212,191,0.3)]"
      style={{
        transitionProperty: 'all',
      }}
    >
      {/* Shimmer shine overlay on hover */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'linear-gradient(135deg, transparent 0%, rgba(34,211,238,0.2) 30%, transparent 60%)',
          animation: 'shine 0.6s ease-in-out',
        }}
      />

      {/* Blur glow background on hover */}
      <div
        className="absolute -inset-1 -z-10 opacity-0 blur-2xl transition-all duration-300 group-hover:opacity-50"
        style={{
          background:
            'radial-gradient(circle, rgba(34,211,238,0.5), rgba(45,212,191,0.3))',
        }}
      />
      {/* Category badge */}
      <span className="relative z-10 self-start rounded-full border border-neon-cyan/20 bg-neon-cyan/10 px-3 py-1 text-[11px] font-bold tracking-wider text-neon-cyan transition-all duration-300 group-hover:border-neon-cyan/60 group-hover:bg-neon-cyan/20">
        {tool.categoryLabel}
        {tool.isIsraeli && ' 🇮🇱'}
      </span>

      {/* Name */}
      <h2 className="relative z-10 text-2xl font-black text-white transition-colors duration-300 group-hover:text-neon-cyan">
        {tool.name}
      </h2>

      {/* Description */}
      <p className="relative z-10 flex-1 text-sm leading-relaxed text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
        {tool.descriptionHe}
      </p>

      {/* CTA */}
      <a
        href={tool.href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10 mt-auto inline-flex items-center gap-2 text-sm font-bold text-neon-cyan transition-all duration-300 hover:gap-3 hover:text-neon-teal group-hover:text-neon-teal"
      >
        למידע נוסף →
      </a>

      <style>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </article>
  )
}
