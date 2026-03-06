import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import EditArticleClient from "./EditArticleClient";

export default async function EditArticlePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const admin = createAdminClient();
    const { data: article, error } = await admin
        .from("articles")
        .select("*")
        .eq("slug", slug)
        .single();

    if (error) {
        throw new Error(`Failed to load article: ${error.message}`);
    }

    if (!article) notFound();

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
