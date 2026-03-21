"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { pingIndexNow } from "@/lib/indexnow";

// Auth is enforced by middleware — /admin/* requires ronenamos@gmail.com
export async function updateArticle(
    slug: string,
    fields: {
        title: string;
        description: string;
        content: string;
        image_url: string;
        is_premium: boolean;
        tags: string[];
    }
) {
    const admin = createAdminClient();
    const { error } = await admin
        .from("articles")
        .update(fields)
        .eq("slug", slug);

    if (error) {
        console.error("Update article error:", error);
        return { success: false, error: error.message };
    }

    pingIndexNow(slug).catch(() => {});
    return { success: true };
}

export async function createArticle(fields: {
    slug: string;
    title: string;
    description: string;
    content: string;
    image_url: string;
    is_premium: boolean;
    tags: string[];
    author_id: string;
}) {
    const admin = createAdminClient();
    const { error } = await admin.from("articles").insert({
        ...fields,
        published_at: new Date().toISOString(),
    });

    if (error) {
        console.error("Create article error:", error);
        return { success: false, error: error.message };
    }

    pingIndexNow(fields.slug).catch(() => {});
    return { success: true };
}
