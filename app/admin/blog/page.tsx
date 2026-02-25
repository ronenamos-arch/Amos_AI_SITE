import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Pencil, Plus } from "lucide-react";

export default async function AdminBlogListPage() {
    const admin = createAdminClient();
    const { data: articles } = await admin
        .from("articles")
        .select("slug, title, is_premium, published_at")
        .order("published_at", { ascending: false });

    return (
        <div className="pt-24 pb-16 min-h-screen">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">ניהול מאמרים</h1>
                    <Button href="/admin/blog/new">
                        <Plus className="h-4 w-4 ml-2" /> כתבה חדשה
                    </Button>
                </div>
                <GlassCard className="divide-y divide-white/5">
                    {articles?.map(article => (
                        <div key={article.slug} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                            <div>
                                <p className="font-medium">{article.title}</p>
                                <p className="text-xs text-text-muted font-mono">{article.slug}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <Badge variant={article.is_premium ? "royal" : "muted"}>
                                    {article.is_premium ? "Premium" : "חינמי"}
                                </Badge>
                                <Link
                                    href={`/admin/blog/edit/${article.slug}`}
                                    className="p-2 hover:bg-white/5 rounded-lg transition-colors text-text-secondary hover:text-teal-400"
                                >
                                    <Pencil className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    ))}
                    {(!articles || articles.length === 0) && (
                        <p className="py-8 text-center text-text-muted">אין מאמרים עדיין.</p>
                    )}
                </GlassCard>
            </div>
        </div>
    );
}
