import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: '/private/',
            },
            // Tier 1: AI search crawlers (ChatGPT, Claude, Perplexity)
            { userAgent: 'GPTBot', allow: '/' },
            { userAgent: 'ChatGPT-User', allow: '/' },
            { userAgent: 'OAI-SearchBot', allow: '/' },
            { userAgent: 'PerplexityBot', allow: '/' },
            { userAgent: 'ClaudeBot', allow: '/' },
            { userAgent: 'Anthropic-AI', allow: '/' },
            // Tier 2: Broad AI ecosystem (Gemini, Apple Intelligence, Meta AI)
            { userAgent: 'Google-Extended', allow: '/' },
            { userAgent: 'Googlebot-Extended', allow: '/' },
            { userAgent: 'GoogleOther', allow: '/' },
            { userAgent: 'Applebot-Extended', allow: '/' },
            { userAgent: 'Amazonbot', allow: '/' },
            { userAgent: 'FacebookBot', allow: '/' },
            // Tier 3: Training crawlers
            { userAgent: 'cohere-ai', allow: '/' },
            { userAgent: 'CCBot', allow: '/' },
            { userAgent: 'YouBot', allow: '/' },
            // Block aggressive crawlers with low value
            { userAgent: 'Bytespider', disallow: '/' },
        ],
        sitemap: 'https://www.ronenamoscpa.co.il/sitemap.xml',
    }
}
