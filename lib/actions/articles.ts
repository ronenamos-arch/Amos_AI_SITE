"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

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
    // Auth check — admin only
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || user.email !== "ronenamos@gmail.com") {
        return { success: false, error: "Unauthorized" };
    }

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
