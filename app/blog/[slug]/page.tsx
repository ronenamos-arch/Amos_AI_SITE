import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, parseMarkdown, linkify, BlogPost } from "@/lib/blog";
import { getDBPostBySlug } from "@/lib/blog-supabase";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const canonicalUrl = `https://www.ronenamoscpa.co.il/blog/${encodeURIComponent(decodedSlug)}`;

  // Try DB first
  const dbPost = await getDBPostBySlug(decodedSlug);
  if (dbPost) {
    return {
      title: dbPost.title,
      description: dbPost.description,
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: dbPost.title,
        description: dbPost.description,
        type: "article",
        locale: "he_IL",
        url: canonicalUrl,
        ...(dbPost.image_url && {
          images: [{ url: dbPost.image_url, alt: dbPost.title }],
        }),
      },
    };
  }

  const post = getPostBySlug(slug);
  if (!post) return { title: "מאמר לא נמצא" };

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      locale: "he_IL",
      url: canonicalUrl,
      ...(post.image && {
        images: [
          {
            url: post.image.startsWith("http")
              ? post.image
              : `https://www.ronenamoscpa.co.il${post.image}`,
            alt: post.title,
          },
        ],
      }),
    },
  };
}

import { createClient } from "@/lib/supabase/server";
import { Paywall } from "@/components/blog/Paywall";
import { ShareButtons } from "@/components/blog/ShareButtons";
import RelatedPosts from "@/components/blog/RelatedPosts";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // Decode in case the slug contains URL-encoded characters (e.g. Hebrew)
  const decodedSlug = decodeURIComponent(slug);
  let post: BlogPost | null = null;
  let isDBPost = false;

  // Try DB first
  const dbPost = await getDBPostBySlug(decodedSlug);
  if (dbPost) {
    post = {
      slug: dbPost.slug,
      title: dbPost.title,
      description: dbPost.description,
      content: dbPost.content,
      date: dbPost.published_at,
      tags: dbPost.tags,
      image: dbPost.image_url,
      premium: dbPost.is_premium
    };
    isDBPost = true;
  } else {
    post = getPostBySlug(decodedSlug) || null;
  }

  if (!post) {
    notFound();
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let subscriptionStatus = 'free';
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('subscription_status')
      .eq('id', user.id)
      .single();

    if (profile) {
      subscriptionStatus = profile.subscription_status;
    }
  }

  // If post is premium, check if user has access
  const hasAccess = !post.premium || subscriptionStatus === 'monthly' || subscriptionStatus === 'lifetime';
  const isLocked = post.premium && !hasAccess;

  // Show only first paragraph for locked posts
  // For DB posts (HTML), we look for first <p> or split by \n
  const displayContent = isLocked
    ? (isDBPost ? post.content.split('</p>')[0] + '</p>' : post.content.split('\n\n')[0])
    : post.content;

  const rawHtml = (isDBPost && !isLocked)
    ? displayContent
    : parseMarkdown(displayContent);
  const contentHtml = linkify(rawHtml);

  const postUrl = `https://www.ronenamoscpa.co.il/blog/${encodeURIComponent(post.slug)}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: 'רונן עמוס',
      url: 'https://www.ronenamoscpa.co.il',
    },
    publisher: {
      '@type': 'Organization',
      name: 'רונן עמוס - רו"ח ויועץ טכנולוגי פיננסי',
      url: 'https://www.ronenamoscpa.co.il',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    ...(post.image && { image: post.image.startsWith('http') ? post.image : `https://www.ronenamoscpa.co.il${post.image}` }),
    ...(post.tags.length > 0 && { keywords: post.tags.join(', ') }),
    inLanguage: 'he',
    speakable: {
      '@type': 'SpeakableSpecification',
      xpath: [
        '/html/head/title',
        "//article//h1",
        "//article//p[1]",
      ],
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'בית', item: 'https://www.ronenamoscpa.co.il' },
      { '@type': 'ListItem', position: 2, name: 'בלוג', item: 'https://www.ronenamoscpa.co.il/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: postUrl },
    ],
  };

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
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 focus:outline-none">
        {/* Header */}
        <div className="mb-8 border-b border-white/5 pb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 break-words">
            {post.title}
          </h1>
          {/* Author + date byline — important for E-E-A-T and AI citability */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-4 text-sm text-text-muted">
            <span>מאת <span className="text-teal-400 font-medium">רונן עמוס, רו&quot;ח</span></span>
            {post.date && (
              <time dateTime={post.date} className="text-text-muted">
                {new Date(post.date).toLocaleDateString('he-IL', { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
            )}
          </div>
          <p className="text-xl text-text-secondary leading-relaxed">
            {post.description}
          </p>
        </div>

        {/* Content */}
        <div
          className={`prose prose-invert max-w-none text-text-secondary prose-headings:text-text-primary prose-a:text-teal-400 prose-strong:text-text-primary prose-img:rounded-xl prose-img:mx-auto prose-img:max-w-full prose-pre:overflow-x-auto break-words overflow-x-hidden ${isLocked ? 'overflow-hidden max-h-[400px] mask-fade-bottom' : ''}`}
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {/* Share Buttons */}
        <ShareButtons
          title={post.title}
          url={`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`}
        />

        {/* Footer Tags */}
        {!isLocked && post.tags.length > 0 && (
          <div className="mt-16 pt-8 border-t border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-bold text-text-muted uppercase tracking-widest">תגיות:</span>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="teal" className="px-3 py-1 hover:bg-teal-500/20 transition-colors cursor-default">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {!isLocked && (
          <RelatedPosts currentSlug={post.slug} tags={post.tags} />
        )}

        {isLocked ? (
          <Paywall />
        ) : (
          /* CTA */
          <div className="mt-12 rounded-2xl bg-gradient-to-br from-teal-400/10 to-royal-500/10 p-8 text-center border border-white/5">
            <h2 className="text-xl font-bold">רוצה לשמוע עוד?</h2>
            <p className="mt-2 text-text-secondary">
              הזמן פגישת ייעוץ חינמית או הירשם לניוזלטר כדי לקבל עוד תכנים כאלו.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Button href="/contact" size="sm">
                ייעוץ חינם
              </Button>
              <Button href="/blog" variant="ghost" size="sm">
                חזרה לבלוג
              </Button>
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
