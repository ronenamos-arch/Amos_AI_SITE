import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Clock, Layers, Crown, ChevronLeft } from 'lucide-react';
import { getSubscriptionAccess } from '@/lib/subscription-access';
import { learningPaths, getLearningPath, getNextPath, formatDuration } from '@/lib/learning-paths-data';
import { ContentCard } from '@/components/academy/ContentCard';

export const dynamic = 'force-dynamic';

// Generate static params for all learning paths
export function generateStaticParams() {
  return learningPaths.map((path) => ({ slug: path.slug }));
}

// Dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const path = getLearningPath(slug);
  if (!path) return {};

  return {
    title: { absolute: `${path.title} — מסלול למידה | רונן עמוס` },
    description: path.description,
    alternates: { canonical: `https://www.ronenamoscpa.co.il/academy/paths/${slug}` },
    openGraph: {
      title: `${path.title} — מסלול למידה`,
      description: path.description,
      url: `https://www.ronenamoscpa.co.il/academy/paths/${slug}`,
      type: 'website',
    },
  };
}

const TIER_STYLES = {
  beginner: { color: '#22d3ee', bg: 'rgba(34,211,238,0.06)', border: 'rgba(34,211,238,0.25)' },
  intermediate: { color: '#60a5fa', bg: 'rgba(96,165,250,0.06)', border: 'rgba(96,165,250,0.25)' },
  advanced: { color: '#a78bfa', bg: 'rgba(167,139,250,0.06)', border: 'rgba(167,139,250,0.25)' },
};

export default async function LearningPathPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const path = getLearningPath(slug);
  if (!path) notFound();

  const { hasAccess } = await getSubscriptionAccess();
  const nextPath = getNextPath(slug);
  const tier = TIER_STYLES[path.tier];

  const coreSteps = path.steps.filter((s) => !s.isOptional);
  const optionalSteps = path.steps.filter((s) => s.isOptional);

  return (
    <div className="pt-16 relative">
      {/* Background glow */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 60% 40% at 50% 10%, ${tier.bg}, transparent 60%)`,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link href="/academy" className="hover:text-neon-cyan transition-colors">
            האקדמיה
          </Link>
          <ChevronLeft size={14} />
          <span className="text-slate-400">{path.title}</span>
        </nav>

        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="text-4xl">{path.icon}</span>
            <span
              className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{ backgroundColor: tier.bg, border: `1px solid ${tier.border}`, color: tier.color }}
            >
              {path.tierLabel}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
            {path.title}
          </h1>

          <p className="text-lg text-slate-400 leading-relaxed mb-6 max-w-2xl">
            {path.description}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-1.5">
              <Layers size={14} style={{ color: tier.color }} />
              <span>{coreSteps.length} שלבים</span>
              {optionalSteps.length > 0 && (
                <span className="text-slate-600">+ {optionalSteps.length} קריאה נוספת</span>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} style={{ color: tier.color }} />
              <span>{formatDuration(path.totalMinutes)}</span>
            </div>
          </div>
        </div>

        {/* ── Progress Line + Steps ──────────────────────────────────── */}
        <div className="relative">
          {/* Vertical progress line */}
          <div
            className="absolute top-0 bottom-0 right-[19px] w-px"
            style={{ backgroundColor: tier.border }}
          />

          {/* Core steps */}
          <div className="space-y-4">
            {coreSteps.map((step, index) => (
              <div key={step.slug} className="relative flex gap-4">
                {/* Step number circle */}
                <div
                  className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border"
                  style={{
                    backgroundColor: tier.bg,
                    borderColor: tier.border,
                    color: tier.color,
                  }}
                >
                  {index + 1}
                </div>

                {/* Card */}
                <div className="flex-grow pb-2">
                  <ContentCard
                    item={{
                      id: `${step.contentType}:${step.slug}`,
                      title: step.title,
                      contentType: step.contentType,
                      slug: step.slug,
                      difficulty: path.tier,
                      isPremium: step.contentType === 'lesson' || step.contentType === 'resource'
                        ? true // lessons and resources are generally premium
                        : false,
                      durationMinutes: 0,
                      description: step.rationale,
                    }}
                    hasAccess={hasAccess}
                    compact
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Optional steps */}
          {optionalSteps.length > 0 && (
            <div className="mt-8">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 mr-14">
                קריאה נוספת
              </h3>
              <div className="space-y-3">
                {optionalSteps.map((step) => (
                  <div key={step.slug} className="relative flex gap-4 opacity-70">
                    <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm border border-dashed border-slate-700 text-slate-600">
                      +
                    </div>
                    <div className="flex-grow">
                      <ContentCard
                        item={{
                          id: `${step.contentType}:${step.slug}`,
                          title: step.title,
                          contentType: step.contentType,
                          slug: step.slug,
                          difficulty: path.tier,
                          isPremium: false,
                          durationMinutes: 0,
                          description: step.rationale,
                        }}
                        hasAccess={hasAccess}
                        compact
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Course Upsell ──────────────────────────────────────────── */}
        {path.upsell && (
          <div className="mt-12 glass-panel rounded-xl p-8 border-t-2 border-royal-400/40 text-center">
            <Crown size={32} className="mx-auto text-royal-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">{path.upsell.title}</h3>
            <p className="text-sm text-slate-400 mb-4 max-w-md mx-auto">{path.upsell.description}</p>
            <a
              href={path.upsell.href}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-space-950 transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #818cf8, #6366f1)' }}
            >
              {path.upsell.price} — למידע נוסף
            </a>
          </div>
        )}

        {/* ── Next Path CTA ──────────────────────────────────────────── */}
        {nextPath && (
          <div className="mt-8 glass-panel rounded-xl p-6 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">המסלול הבא</p>
              <h3 className="text-lg font-bold text-white">
                {nextPath.icon} {nextPath.title}
              </h3>
              <p className="text-sm text-slate-400">{nextPath.description}</p>
            </div>
            <Link
              href={`/academy/paths/${nextPath.slug}`}
              className="flex-shrink-0 flex items-center gap-1 text-neon-cyan font-bold text-sm hover:text-neon-teal transition-colors"
            >
              <span>התחל</span>
              <ArrowLeft size={16} />
            </Link>
          </div>
        )}

        {/* ── Back to Academy ────────────────────────────────────────── */}
        <div className="mt-8 text-center">
          <Link
            href="/academy"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors"
          >
            <ArrowRight size={14} />
            חזרה לאקדמיה
          </Link>
        </div>
      </div>
    </div>
  );
}
