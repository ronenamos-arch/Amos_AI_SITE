
import { getResend } from '../lib/resend';
import { buildNewsletterEmail } from '../lib/emails/newsletter';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function run() {
    const templateName = 'newsletter-32-delay-10-seconds';
    const subject = 'העיכוב של 10 שניות שהורג החלטות';
    const contentPath = path.resolve(process.cwd(), 'newsletter-32.html');
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

    // Wrap in our standard premium template
    const finalHtml = buildNewsletterEmail({ 
        bodyHtml, 
        siteUrl, 
        unsubscribeUrl: '{{{RESEND_UNSUBSCRIBE_URL}}}' 
    });

    console.log(`🚀 Creating Resend Template: ${templateName}`);

    try {
        const resend = getResend();
        
        // Templates API might be slightly different depending on SDK version
        // Using the create method
        const { data, error } = await resend.templates.create({
            name: templateName,
            subject: subject,
            html: finalHtml
        });

        if (error) {
            console.error('\n❌ ERROR creating Resend Template:', error);
            // Some versions might use different property names or nested structures
            if ((error as any).message?.includes('not found')) {
                console.log('Note: If "templates" is not available on this SDK version, you may need to update the resend package.');
            }
        } else {
            console.log('\n✅ SUCCESS: Template created in Resend!');
            console.log('Template ID:', data?.id);
            console.log('\nYou can now see this in your Resend Dashboard under "Templates".');
        }
    } catch (error) {
        console.error('\n🔥 CRITICAL ERROR during template creation:', error);
    }
}

run();
