import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, parseMarkdown, BlogPost } from "@/lib/blog";
import { getDBPostBySlug } from "@/lib/blog-supabase";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

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

  // Try DB first
  const dbPost = await getDBPostBySlug(slug);
  if (dbPost) {
    return {
      title: dbPost.title,
      description: dbPost.description,
      openGraph: {
        title: dbPost.title,
        description: dbPost.description,
        type: "article",
        locale: "he_IL",
        ...(dbPost.image_url && { images: [dbPost.image_url] }),
      },
    };
  }

  const post = getPostBySlug(slug);
  if (!post) return { title: "מאמר לא נמצא" };

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      locale: "he_IL",
    },
  };
}

import { createClient } from "@/lib/supabase/server";
import { Paywall } from "@/components/blog/Paywall";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let post: BlogPost | null = null;
  let isDBPost = false;

  // Try DB first
  const dbPost = await getDBPostBySlug(slug);
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
    post = getPostBySlug(slug) || null;
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

  const contentHtml = (isDBPost && !isLocked)
    ? displayContent
    : parseMarkdown(displayContent);

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
      url: 'https://amos-ai-site.vercel.app',
    },
    publisher: {
      '@type': 'Organization',
      name: 'רונן עמוס - רו"ח ויועץ טכנולוגי פיננסי',
      url: 'https://amos-ai-site.vercel.app',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://amos-ai-site.vercel.app/blog/${encodeURIComponent(post.slug)}`,
    },
    ...(post.image && { image: post.image.startsWith('http') ? post.image : `https://amos-ai-site.vercel.app${post.image}` }),
    ...(post.tags.length > 0 && { keywords: post.tags.join(', ') }),
    inLanguage: 'he',
  };

  return (
    <div className="pt-24 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 focus:outline-none">
        {/* Header */}
        <div className="mb-8 border-b border-white/5 pb-8">
          <h1 className="text-4xl font-black sm:text-5xl leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
            {post.title}
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed">
            {post.description}
          </p>
        </div>

        {/* Content */}
        <div
          className={`prose prose-invert max-w-none text-text-secondary prose-headings:text-text-primary prose-a:text-teal-400 prose-strong:text-text-primary prose-img:rounded-xl prose-img:mx-auto ${isLocked ? 'overflow-hidden max-h-[400px] mask-fade-bottom' : ''}`}
          dangerouslySetInnerHTML={{ __html: contentHtml }}
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
