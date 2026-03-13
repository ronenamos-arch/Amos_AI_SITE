import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, parseMarkdown } from "@/lib/blog";
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

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="pt-24 pb-16">
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="teal">
                {tag}
              </Badge>
            ))}
            {post.premium && <Badge variant="royal">Premium</Badge>}
          </div>
          <h1 className="text-3xl font-bold sm:text-4xl">{post.title}</h1>
          <p className="mt-4 text-lg text-text-secondary">{post.description}</p>
          <p className="mt-2 text-sm text-text-muted">
            {new Date(post.date).toLocaleDateString("he-IL", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Content */}
        <div
          className="prose prose-invert max-w-none text-text-secondary prose-headings:text-text-primary prose-a:text-teal-400 prose-strong:text-text-primary prose-img:rounded-xl prose-img:mx-auto"
          dangerouslySetInnerHTML={{ __html: parseMarkdown(post.content) }}
        />

        {/* CTA */}
        <div className="mt-12 rounded-2xl bg-gradient-to-br from-teal-400/10 to-royal-500/10 p-8 text-center">
          <h2 className="text-xl font-bold">רוצה לשמוע עוד?</h2>
          <p className="mt-2 text-text-secondary">
            הזמן פגישת ייעוץ חינמית או הירשם לניוזלטר.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Button href="/contact" size="sm">
              ייעוץ חינם
            </Button>
            <Button href="/blog" variant="ghost" size="sm">
              חזרה לבלוג
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
}
