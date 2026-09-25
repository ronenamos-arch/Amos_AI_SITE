import { createAdminClient } from "@/lib/supabase/admin";

export interface DBArticleSummary {
    id: string;
    slug: string;
    title: string;
    meta_title: string | null;
    description: string;
    image_url: string;
    is_premium: boolean;
    published_at: string;
    tags: string[];
}

export interface DBArticle extends DBArticleSummary {
    content: string;
}

export async function getDBPosts(): Promise<DBArticleSummary[]> {
    const supabase = createAdminClient();
    const { data, error } = await supabase
        .from('articles')
        .select('id, slug, title, meta_title, description, image_url, is_premium, published_at, tags')
        .order('published_at', { ascending: false });

    if (error) {
        console.error("Error fetching articles from DB:", error);
        return [];
    }

    return data as DBArticleSummary[];
}

export async function getDBPostBySlug(slug: string): Promise<DBArticle | null> {
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
