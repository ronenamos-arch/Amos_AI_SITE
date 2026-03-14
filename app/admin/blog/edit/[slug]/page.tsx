import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import EditArticleClient from "./EditArticleClient";

export default async function EditArticlePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);
    const admin = createAdminClient();
    const { data: article, error } = await admin
        .from("articles")
        .select("*")
        .eq("slug", decodedSlug)
        .single();

    if (error || !article) {
        return (
            <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-8 max-w-lg text-center space-y-2">
                    <p className="font-bold text-lg">שגיאה בטעינת המאמר</p>
                    <p className="text-sm font-mono">{error?.message || "Article not found"}</p>
                    <p className="text-xs text-red-400/70">slug: {decodedSlug}</p>
                </div>
            </div>
        );
    }

    return (
        <EditArticleClient
            article={{
                ...article,
                content: article.content ?? "",
                title: article.title ?? "",
                description: article.description ?? "",
                image_url: article.image_url ?? "",
                tags: article.tags ?? [],
            }}
        />
    );
}
