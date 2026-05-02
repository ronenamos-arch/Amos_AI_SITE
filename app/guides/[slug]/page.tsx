import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getGuideBySlug, getRelatedGuides, getAllGuides } from '@/lib/guides-data';
import { GuideCard } from '@/components/guides/GuideCard';
import { NewsletterForm } from '@/components/forms/NewsletterForm';

const BASE_URL = 'https://www.ronenamoscpa.co.il';

function getEmbedUrl(gammaUrl: string): string {
  // https://gamma.app/docs/<id> → https://gamma.app/embed/<id>
  const id = gammaUrl.split('/').pop() ?? '';
  return `https://gamma.app/embed/${id}`;
}

export async function generateStaticParams() {
  return getAllGuides()
    .filter((g) => g.gammaUrl !== '#')
    .map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return { title: 'מדריך לא נמצא' };

  const canonicalUrl = `${BASE_URL}/guides/${guide.slug}`;
  const ogImage = guide.thumbnail
    ? guide.thumbnail.startsWith('http')
      ? guide.thumbnail
      : `${BASE_URL}${guide.thumbnail}`
    : `${BASE_URL}/og-default.png`;

  return {
    title: { absolute: `${guide.title} | רונן עמוס` },
    description: guide.description,
    keywords: guide.tags,
    alternates: { canonical: canonicalUrl },
    robots: { index: true, follow: true },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: canonicalUrl,
      type: 'article',
      locale: 'he_IL',
      images: [{ url: ogImage, alt: guide.title }],
    },
  };
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const related = getRelatedGuides(slug);
  const guideUrl = `${BASE_URL}/guides/${guide.slug}`;
  const embedUrl = getEmbedUrl(guide.gammaUrl);

  const ogImage = guide.thumbnail
    ? guide.thumbnail.startsWith('http')
      ? guide.thumbnail
      : `${BASE_URL}${guide.thumbnail}`
    : undefined;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    datePublished: guide.publishedAt,
    dateModified: guide.publishedAt,
    author: {
      '@type': 'Person',
      name: 'רונן עמוס',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'רונן עמוס - רו"ח ויועץ טכנולוגי פיננסי',
      url: BASE_URL,
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': guideUrl },
    ...(ogImage && { image: ogImage }),
    ...(guide.tags.length > 0 && { keywords: guide.tags.join(', ') }),
    inLanguage: 'he',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'בית', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'מדריכים', item: `${BASE_URL}/guides` },
      { '@type': 'ListItem', position: 3, name: guide.category, item: `${BASE_URL}/guides` },
      { '@type': 'ListItem', position: 4, name: guide.title, item: guideUrl },
    ],
  };

  const publishedDate = new Date(guide.publishedAt).toLocaleDateString('he-IL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="pt-24 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-slate-500" aria-label="breadcrumb">
          <Link href="/" className="hover:text-slate-300 transition-colors">בית</Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-slate-300 transition-colors">מדריכים</Link>
          <span>/</span>
          <span className="text-slate-400">{guide.category}</span>
          <span>/</span>
          <span className="text-slate-300 truncate max-w-[200px]">{guide.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-10 border-b border-white/5 pb-8">
          <h1 className="text-3xl sm:text-4xl font-black leading-tight mb-5 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
            {guide.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
            <span
              className="px-3 py-1 rounded-full text-[12px] font-bold"
              style={{ background: 'rgba(34,211,238,0.15)', color: '#22d3ee', border: '1px solid rgba(34,211,238,0.3)' }}
            >
              {guide.category}
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-400">{guide.duration} קריאה</span>
            <span className="text-slate-500">·</span>
            <time dateTime={guide.publishedAt} className="text-slate-400">
              {publishedDate}
            </time>
            {guide.isPremium && (
              <>
                <span className="text-slate-500">·</span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-royal-400 text-space-950">
                  פרימיום
                </span>
              </>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {guide.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2 py-0.5 rounded font-medium"
                style={{ backgroundColor: 'rgba(34,211,238,0.08)', color: '#67e8f9' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Description */}
        <p className="text-lg text-slate-300 leading-relaxed mb-10">
          {guide.longDescription ?? guide.description}
        </p>

        {/* Gamma embed */}
        <div className="mb-4">
          <div
            className="relative w-full rounded-xl overflow-hidden glass-panel"
            style={{ paddingTop: '75%' /* 4:3 — taller embed */ }}
          >
            <iframe
              src={embedUrl}
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              title={guide.title}
            />
          </div>
          <div className="mt-3 text-left">
            <a
              href={guide.gammaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-500 hover:text-neon-cyan transition-colors inline-flex items-center gap-1"
            >
              <span>פתח את המדריך ב-Gamma</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        {/* Thumbnail fallback for og/share — visually hidden but helps crawlers */}
        {guide.thumbnail && (
          <div className="sr-only">
            <Image src={guide.thumbnail} alt={guide.title} width={800} height={450} />
          </div>
        )}

        {/* Newsletter CTA */}
        <section className="mt-16 glass-panel rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 text-right">
          <div className="flex-grow text-center md:text-right">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
              קבל מדריך חדש כל שבוע
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              מצטרפים לרשימה — מקבלים מדריך מעשי חדש על AI בכספים כל שבוע, ישירות למייל.
            </p>
          </div>
          <div className="w-full md:w-auto">
            <NewsletterForm source={`guide-${guide.slug}`} variant="inline" />
          </div>
        </section>

        {/* Pricing CTA */}
        <section
          className="mt-6 glass-panel rounded-xl p-6 relative overflow-hidden"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 0%, rgba(45,212,191,0.15), transparent 60%)' }}
        >
          <h3 className="text-white font-bold text-lg mb-2">רוצה גישה מלאה?</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            מנוי פרימיום פותח את כל הבלוג, ה-Skill Vault והמדריכים המתקדמים.
          </p>
          <Link
            href="/pricing"
            className="inline-block bg-gradient-to-l from-neon-cyan to-neon-teal text-space-950 font-bold text-sm px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
          >
            שדרג עכשיו
          </Link>
        </section>

        {/* Related guides */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl font-bold text-white mb-6">מדריכים נוספים שאולי יעניינו אותך</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((g) => (
                <GuideCard key={g.slug} guide={g} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
