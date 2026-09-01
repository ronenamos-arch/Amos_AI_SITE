import type { Metadata } from 'next';
import { getSubscriptionAccess } from '@/lib/subscription-access';
import { getUserProgress } from '@/lib/actions/progress';
import { topicClusters, getClustersByTier } from '@/lib/academy-data';
import { learningPaths, getPathsByTier } from '@/lib/learning-paths-data';
import { AcademyHero } from '@/components/academy/AcademyHero';
import { LearningPathCard } from '@/components/academy/LearningPathCard';
import { TopicCluster } from '@/components/academy/TopicCluster';
import { NewsletterForm } from '@/components/forms/NewsletterForm';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: { absolute: 'האקדמיה — AI Finance Academy | רונן עמוס' },
  description:
    'מדריכים, וובינרים, כלים אינטראקטיביים ופרומפטים מוכנים — הכל מאורגן במסלולי למידה מובנים לאנשי כספים',
  alternates: { canonical: 'https://www.ronenamoscpa.co.il/academy' },
  keywords: [
    'Academy AI Finance',
    'למידת AI לכספים',
    'מסלולי למידה AI',
    'Claude לאנשי כספים',
    'ChatGPT לרואי חשבון',
    'אוטומציה פיננסית',
    'דשבורדים פיננסיים',
  ],
  openGraph: {
    title: 'האקדמיה — AI Finance Academy',
    description: 'מסלולי למידה מובנים, מדריכים, וובינרים וכלים לאנשי כספים',
    url: 'https://www.ronenamoscpa.co.il/academy',
    type: 'website',
  },
};

export default async function AcademyPage() {
  const { user, hasAccess } = await getSubscriptionAccess();
  const progressRecords = user ? await getUserProgress() : [];

  // Create a fast lookup Set of completed keys ("contentType:slug")
  const completedKeys = new Set(
    progressRecords
      .filter((r) => r.status === 'completed')
      .map((r) => `${r.contentType}:${r.contentSlug}`)
  );

  // Helper to count completed steps in a given learning path
  const getCompletedCountForPath = (pathSlug: string) => {
    const pathObj = learningPaths.find((p) => p.slug === pathSlug);
    if (!pathObj) return 0;
    return pathObj.steps.filter((s) => completedKeys.has(`${s.contentType}:${s.slug}`)).length;
  };

  // Get user display name for the hero
  let userName: string | null = null;
  if (user) {
    userName =
      (user.user_metadata?.display_name as string) ||
      (user.user_metadata?.full_name as string) ||
      null;
  }

  // Group paths by tier for display
  const foundationPaths = getPathsByTier('beginner');
  const corePaths = getPathsByTier('intermediate');
  const masteryPaths = getPathsByTier('advanced');

  return (
    <div className="pt-16 relative">
      {/* Subtle background glow */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 70% 20%, rgba(34,211,238,0.04), transparent 60%), radial-gradient(ellipse 50% 50% at 20% 80%, rgba(99,102,241,0.03), transparent 60%)',
          }}
        />
      </div>

      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: 'AI Finance Academy',
            description: 'מסלולי למידה מובנים על AI בכספים — מדריכים, וובינרים, כלים ופרומפטים',
            provider: {
              '@type': 'Organization',
              name: 'Ronen Amos CPA',
              url: 'https://www.ronenamoscpa.co.il',
            },
            url: 'https://www.ronenamoscpa.co.il/academy',
            inLanguage: 'he',
          }),
        }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <div className="relative z-10">
        <AcademyHero hasAccess={hasAccess} userName={userName} />
      </div>

      {/* ── Learning Paths ───────────────────────────────────────────── */}
      <section id="paths" className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">מסלולי למידה</h2>
          <p className="text-sm text-slate-400">
            בחר מסלול מובנה שמוביל אותך צעד אחר צעד — מיסודות ועד מומחיות
          </p>
        </div>

        {/* Tier: Foundation */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: '#22d3ee' }}
            />
            <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: '#22d3ee' }}>
              יסודות
            </h3>
            <div className="flex-grow h-px bg-white/[0.06]" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {foundationPaths.map((path) => (
              <LearningPathCard 
                key={path.slug} 
                path={path} 
                hasAccess={hasAccess}
                completedCount={getCompletedCountForPath(path.slug)} 
              />
            ))}
          </div>
        </div>

        {/* Tier: Core Skills */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: '#60a5fa' }}
            />
            <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: '#60a5fa' }}>
              מיומנויות ליבה
            </h3>
            <div className="flex-grow h-px bg-white/[0.06]" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {corePaths.map((path) => (
              <LearningPathCard 
                key={path.slug} 
                path={path} 
                hasAccess={hasAccess}
                completedCount={getCompletedCountForPath(path.slug)} 
              />
            ))}
          </div>
        </div>

        {/* Tier: Mastery */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: '#a78bfa' }}
            />
            <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: '#a78bfa' }}>
              מומחיות
            </h3>
            <div className="flex-grow h-px bg-white/[0.06]" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {masteryPaths.map((path) => (
              <LearningPathCard 
                key={path.slug} 
                path={path} 
                hasAccess={hasAccess}
                completedCount={getCompletedCountForPath(path.slug)} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Browse by Topic ──────────────────────────────────────────── */}
      <section className="relative z-10 border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">עיון לפי נושא</h2>
            <p className="text-sm text-slate-400">
              מעדיף לגלוש חופשי? כל התכנים מאורגנים לפי תחום — לחץ על נושא כדי לפתוח
            </p>
          </div>

          {topicClusters.map((cluster, index) => (
            <TopicCluster
              key={cluster.slug}
              cluster={cluster}
              hasAccess={hasAccess}
              defaultOpen={index === 0}
            />
          ))}
        </div>
      </section>

      {/* ── Newsletter CTA ───────────────────────────────────────────── */}
      <section
        className="relative z-10 border-t border-white/[0.06]"
        style={{
          background: 'linear-gradient(180deg, transparent, rgba(15,23,42,0.6))',
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="glass-panel rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 text-right">
            <div className="flex-grow text-center md:text-right">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                קבל תוכן חדש כל שבוע
              </h2>
              <p className="text-base max-w-xl" style={{ color: '#94a3b8' }}>
                הצטרף לניוזלטר — מדריכים, פרומפטים וטיפים מעשיים על AI בכספים, ישירות למייל.
              </p>
            </div>
            <div className="w-full md:w-auto">
              <NewsletterForm source="academy" variant="inline" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
