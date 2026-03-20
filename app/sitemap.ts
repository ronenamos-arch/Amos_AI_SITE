import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'
import { getDBPosts } from '@/lib/blog-supabase'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.ronenamoscpa.co.il'

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

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

    // Local markdown posts
    const localPosts = getAllPosts()
    const localPostEntries: MetadataRoute.Sitemap = localPosts.map((post) => {
        const postDate = post.date ? new Date(post.date) : new Date()
        const isRecent = postDate > thirtyDaysAgo
        const imageUrl = post.image
            ? post.image.startsWith('http')
                ? post.image
                : `${baseUrl}${post.image}`
            : undefined
        return {
            url: `${baseUrl}/blog/${encodeURIComponent(post.slug)}`,
            lastModified: postDate,
            changeFrequency: 'monthly' as const,
            priority: isRecent ? 0.8 : 0.6,
            ...(imageUrl && { images: [imageUrl] }),
        }
    })

    // DB posts from Supabase
    const dbPosts = await getDBPosts()
    const dbPostEntries: MetadataRoute.Sitemap = dbPosts.map((post) => {
        const postDate = post.published_at ? new Date(post.published_at) : new Date()
        const isRecent = postDate > thirtyDaysAgo
        return {
            url: `${baseUrl}/blog/${encodeURIComponent(post.slug)}`,
            lastModified: postDate,
            changeFrequency: 'monthly' as const,
            priority: isRecent ? 0.8 : 0.6,
            ...(post.image_url && { images: [post.image_url] }),
        }
    })

    // Deduplicate by slug (DB posts take precedence)
    const dbSlugs = new Set(dbPosts.map((p) => p.slug))
    const uniqueLocalEntries = localPostEntries.filter(
        (_, i) => !dbSlugs.has(localPosts[i].slug)
    )

    return [...staticPages, ...dbPostEntries, ...uniqueLocalEntries]
}
