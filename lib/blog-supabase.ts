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
        .limit(1);

    if (error) {
        console.error("Error fetching article by slug:", error);
        return null;
    }

    if (!data || data.length === 0) return null;

    return data[0] as DBArticle;
}
