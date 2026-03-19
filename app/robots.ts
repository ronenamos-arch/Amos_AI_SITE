import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: '/private/',
            },
            // Explicit AI crawler permissions for GEO visibility
            { userAgent: 'GPTBot', allow: '/' },
            { userAgent: 'ChatGPT-User', allow: '/' },
            { userAgent: 'OAI-SearchBot', allow: '/' },
            { userAgent: 'PerplexityBot', allow: '/' },
            { userAgent: 'ClaudeBot', allow: '/' },
            { userAgent: 'Anthropic-AI', allow: '/' },
            { userAgent: 'Google-Extended', allow: '/' },
            { userAgent: 'Googlebot-Extended', allow: '/' },
            { userAgent: 'Applebot-Extended', allow: '/' },
            { userAgent: 'cohere-ai', allow: '/' },
            { userAgent: 'YouBot', allow: '/' },
        ],
        sitemap: 'https://amos-ai-site.vercel.app/sitemap.xml',
    }
}
