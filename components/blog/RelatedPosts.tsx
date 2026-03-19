import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { getDBPosts } from "@/lib/blog-supabase";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";

interface Props {
  currentSlug: string;
  tags: string[];
}

export default async function RelatedPosts({ currentSlug, tags }: Props) {
  if (tags.length === 0) return null;

  const [localPosts, dbPostsRaw] = await Promise.all([
    Promise.resolve(getAllPosts()),
    getDBPosts(),
  ]);

  const dbPosts = dbPostsRaw.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    date: p.published_at,
    tags: p.tags,
    image: p.image_url,
  }));

  const allPosts = [...dbPosts, ...localPosts];
  const deduped = Array.from(new Map(allPosts.map((p) => [p.slug, p])).values());

  const related = deduped
    .filter(
      (p) =>
        p.slug !== currentSlug &&
        p.tags.some((t) => tags.includes(t))
    )
    .sort(
      (a, b) =>
        p_tagScore(b.tags, tags) - p_tagScore(a.tags, tags) ||
        new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="mt-16 pt-8 border-t border-white/5">
      <h2 className="mb-6 text-lg font-bold">פוסטים קשורים</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <GlassCard className="h-full flex flex-col border-white/5 group-hover:border-teal-400/30 transition-all duration-300 !p-4">
              {post.image && (
                <div className="mb-3 aspect-video w-full overflow-hidden rounded-lg">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="mb-2 flex flex-wrap gap-1">
                {post.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="teal">
                    {tag}
                  </Badge>
                ))}
              </div>
              <p className="text-sm font-semibold leading-snug group-hover:text-teal-400 transition-colors">
                {post.title}
              </p>
            </GlassCard>
          </Link>
        ))}
      </div>
    </div>
  );
}

function p_tagScore(postTags: string[], targetTags: string[]): number {
  return postTags.filter((t) => targetTags.includes(t)).length;
}
