import { createAdminClient } from "@/lib/supabase/admin";

export interface DBArticle {
    id: string;
    slug: string;
    title: string;
    description: string;
    content: string;
    image_url: string;
    is_premium: boolean;
    published_at: string;
    tags: string[];
}

export async function getDBPosts() {
    const supabase = createAdminClient();
    const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('published_at', { ascending: false });

    if (error) {
        console.error("Error fetching articles from DB:", error);
        return [];
    }

    return data as DBArticle[];
}

export async function getDBPostBySlug(slug: string) {
    const supabase = createAdminClient();
    const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) {
        console.error("Error fetching article by slug:", error);
        return null;
    }

    return data as DBArticle;
}
