import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { getDBPosts } from "@/lib/blog-supabase";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "בלוג",
  description:
    "מאמרים על AI בכספים, Power BI, אוטומציות Excel, ASC 606 וחשבונאות מודרנית.",
};

export default async function BlogPage() {
  const filePosts = getAllPosts();
  const dbPostsRaw = await getDBPosts();

  // Convert DB posts to common format
  const dbPosts = dbPostsRaw.map(post => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.published_at,
    tags: post.tags,
    image: post.image_url,
    premium: post.is_premium
  }));

  // Merge and sort by date
  const posts = [...filePosts, ...dbPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const tags = Array.from(new Set([...getAllTags(), ...dbPosts.flatMap(p => p.tags)]));

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="בלוג"
          subtitle="מאמרים, מדריכים ותובנות על AI, אוטומציה וחדשנות בעולם הכספים"
          gradient
        />

        {/* Posts grid */}
        {posts.length > 0 ? (
          <>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                  <GlassCard className="h-full flex flex-col border-white/5 group-hover:border-teal-400/30 transition-all duration-500 overflow-hidden !p-0">
                    <div className="p-6 pb-0">
                      <div className="mb-4 flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="teal">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <h2 className="mb-4 text-xl font-bold leading-tight group-hover:text-teal-400 transition-colors">
                        {post.title}
                      </h2>
                    </div>

                    {post.image && (
                      <div className="relative aspect-video w-full overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-space-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    )}

                    <div className="p-6 pt-4 flex-grow flex flex-col">
                      <p className="mb-6 text-sm text-text-secondary line-clamp-3 leading-relaxed">
                        {post.description}
                      </p>
                      <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center text-xs text-text-muted">
                        <span>
                          {new Date(post.date).toLocaleDateString("he-IL", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                        {post.premium && <Badge variant="royal">Premium</Badge>}
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              ))}
            </div>

            {/* Tags moved to bottom */}
            {tags.length > 0 && (
              <div className="mt-20">
                <p className="mb-6 text-center text-sm font-medium text-text-muted">חיפוש לפי נושאים:</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="muted" className="hover:bg-teal-400/20 hover:text-teal-400 cursor-pointer transition-colors px-4 py-2">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <GlassCard hover={false} className="text-center">
            <p className="text-text-secondary">
              מאמרים חדשים בקרוב. הירשם לניוזלטר כדי לקבל עדכונים.
            </p>
          </GlassCard>
        )}
      </div>
    </div>
  );
}
