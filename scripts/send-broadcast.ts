
import { getResend, EMAIL_FROM } from '../lib/resend';
import { buildNewsletterEmail } from '../lib/emails/newsletter';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function run() {
    const subject = 'העיכוב של 10 שניות שהורג החלטות';
    const contentPath = path.resolve(process.cwd(), 'newsletter-32.html');
    const audienceId = process.env.RESEND_AUDIENCE_ID || '4c3b4ceb-c5dc-4eba-9d29-62fb8b26956a';
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ronenamoscpa.co.il';

    if (!fs.existsSync(contentPath)) {
        console.error('Error: newsletter-32.html not found');
        return;
    }

    const content = fs.readFileSync(contentPath, 'utf8');
    
    // Extract the content-body section
    const bodyStartTag = '<div class="content-body">';
    const bodyEndTag = '<!-- High Visibility CTAs Section -->';
    
    const startIndex = content.indexOf(bodyStartTag);
    const endIndex = content.indexOf(bodyEndTag);
    
    let bodyHtml = '';
    if (startIndex !== -1 && endIndex !== -1) {
        bodyHtml = content.substring(startIndex + bodyStartTag.length, endIndex).trim();
        if (bodyHtml.endsWith('</div>')) {
            bodyHtml = bodyHtml.substring(0, bodyHtml.lastIndexOf('</div>')).trim();
        }
    } else {
        bodyHtml = content;
    }

    // Wrap in our standard template (buildNewsletterEmail handles the wrappers)
    const finalHtml = buildNewsletterEmail({ 
        bodyHtml, 
        siteUrl, 
        unsubscribeUrl: '{{{RESEND_UNSUBSCRIBE_URL}}}' 
    });

    console.log(`🚀 Starting Resend Broadcast to audience: ${audienceId}`);
    console.log(`Subject: ${subject}`);

    try {
        const resend = getResend();
        const { data, error } = await resend.broadcasts.create({
            segmentId: audienceId, // In v4 SDK, segmentId is used for Audience ID
            from: EMAIL_FROM,
            subject: subject,
            html: finalHtml,
            send: true, // Send immediately
        });

        if (error) {
            console.error('\n❌ ERROR creating Resend Broadcast:', error);
        } else {
            console.log('\n✅ SUCCESS: Broadcast triggered!');
            console.log('Broadcast ID:', data?.id);
        }
    } catch (error) {
        console.error('\n🔥 CRITICAL ERROR during broadcast send:', error);
    }
}

run();
