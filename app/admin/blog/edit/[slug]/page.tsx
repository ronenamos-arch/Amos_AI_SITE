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
    const { data: article } = await admin
        .from("articles")
        .select("*")
        .eq("slug", slug)
        .single();

    if (!article) notFound();
    return <EditArticleClient article={article} />;
}
