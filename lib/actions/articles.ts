"use server";

import { createAdminClient } from "@/lib/supabase/admin";

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

    return { success: true };
}
