import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'
import { getDBPosts } from '@/lib/blog-supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://amos-ai-site.vercel.app'

    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/training`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/course`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
    ]

    // Local markdown posts
    const localPosts = getAllPosts()
    const localPostEntries: MetadataRoute.Sitemap = localPosts.map((post) => ({
        url: `${baseUrl}/blog/${encodeURIComponent(post.slug)}`,
        lastModified: post.date ? new Date(post.date) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
    }))

    // DB posts from Supabase
    const dbPosts = await getDBPosts()
    const dbPostEntries: MetadataRoute.Sitemap = dbPosts.map((post) => ({
        url: `${baseUrl}/blog/${encodeURIComponent(post.slug)}`,
        lastModified: post.published_at ? new Date(post.published_at) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
    }))

    // Deduplicate by slug (DB posts take precedence)
    const dbSlugs = new Set(dbPosts.map((p) => p.slug))
    const uniqueLocalEntries = localPostEntries.filter(
        (_, i) => !dbSlugs.has(localPosts[i].slug)
    )

    return [...staticPages, ...dbPostEntries, ...uniqueLocalEntries]
}
