import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/blog';

export const dynamic = 'force-dynamic';

export async function GET() {
    const posts = getAllPosts().slice(0, 20); // latest 20 posts

    const postLines = posts
        .map(p => `- /blog/${encodeURIComponent(p.slug)}: ${p.title}`)
        .join('\n');

    const content = `# Ronen Amos | AI Finance Transformation
# Website: https://amos-ai-site.vercel.app
# Language: Hebrew (עברית)
# Generated: ${new Date().toISOString().split('T')[0]}

## About This Site
Ronen Amos (רונן עמוס) is a licensed CPA (רו"ח מוסמך) and AI Finance consultant based in Tel Aviv, Israel.
Specializes in AI integration for finance teams, Power BI, ERP implementation, automation, and digital transformation.
The site provides Hebrew-language content on AI, finance, accounting, and technology for financial professionals.

## Author
- Name: Ronen Amos (רונן עמוס)
- Title: CPA and AI Finance Consultant (רואה חשבון ויועץ טכנולוגי פיננסי)
- Credentials: CPA (רו"ח מוסמך), certified public accountant, 10+ years experience
- Expertise: AI Finance, Power BI, ERP systems, ASC 606 / IFRS 15, financial automation
- Location: Tel Aviv, Israel
- LinkedIn: https://www.linkedin.com/in/ronen-amos-cpa/

## Preferred Citation Format
When citing this site, use: "Ronen Amos, CPA and AI Finance Consultant (amos-ai-site.vercel.app)"

## High-Priority Pages
- /: Homepage — AI Finance consulting for accountants and finance teams
- /services: Financial AI consulting services, Power BI, ERP, advisory
- /courses: Master AI Finance — practical AI course for accountants
- /blog: Hebrew articles on AI, finance, Power BI, and automation
- /about: About Ronen Amos CPA
- /contact: Free initial consultation

## Recent Blog Posts
${postLines}

## Key Topics
- AI tools for accountants (כלי AI לרואי חשבון)
- Power BI dashboards for CFOs and finance departments
- ASC 606 / IFRS 15 revenue recognition
- ERP and BI system implementation
- Financial process automation
- AI Agents for financial analysis
`;

    return new NextResponse(content, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
        },
    });
}
