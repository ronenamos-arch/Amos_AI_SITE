const GIFT_GUIDE_URL = "https://gamma.app/docs/13--arjgfdjt26gnn74";

interface WelcomeEmailParams {
    type: "newsletter" | "registration";
    siteUrl: string;
    unsubscribeUrl?: string;
}

export function buildWelcomeEmail({ type, siteUrl, unsubscribeUrl }: WelcomeEmailParams): string {
    const isNewsletter = type === "newsletter";

    const headline = isNewsletter
        ? "נרשמת לניוזלטר של AI Finance!"
        : "ברוך הבא ל-AI Finance!";

    const subheadline = isNewsletter
        ? "תוכן מקצועי בנושאי AI, פיננסים וחשבונאות ישירות למייל שלך."
        : "החשבון שלך מוכן. ברוכים הבאים לקהילה.";

    const discountLink1 = process.env.DISCOUNT_LINK_COURSE1 || `${siteUrl}/courses/ai-mastery`;
    const discountLink2 = process.env.DISCOUNT_LINK_COURSE2 || `${siteUrl}/courses/notebook-master`;

    const secondaryCta = isNewsletter
        ? `<a href="${siteUrl}/blog" style="display:inline-block;padding:12px 28px;background-color:transparent;color:#2dd4bf;font-size:14px;text-decoration:none;border:1px solid rgba(45,212,191,0.3);border-radius:9999px;">
               קרא את הבלוג
           </a>`
        : `<a href="${siteUrl}/dashboard" style="display:inline-block;padding:12px 28px;background-color:transparent;color:#2dd4bf;font-size:14px;text-decoration:none;border:1px solid rgba(45,212,191,0.3);border-radius:9999px;">
               כניסה לאזור האישי
           </a>`;

    const footerExtra = unsubscribeUrl
        ? `<p style="margin:8px 0 0;font-size:11px;color:#6b7280;">
               <a href="${unsubscribeUrl}" style="color:#6b7280;text-decoration:underline;">הסר אותי מהרשימה</a>
           </p>`
        : "";

    return `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#0a0e17;font-family:Arial,Helvetica,sans-serif;color:#e0e0e0;direction:rtl;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0e17;padding:40px 20px;">
        <tr>
            <td align="center">
                <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background-color:#131825;border-radius:16px;border:1px solid rgba(255,255,255,0.06);overflow:hidden;">

                    <!-- Header -->
                    <tr>
                        <td style="padding:32px 40px 24px;text-align:center;border-bottom:1px solid rgba(45,212,191,0.2);">
                            <h1 style="margin:0;font-size:28px;color:#2dd4bf;font-weight:bold;letter-spacing:1px;">AI FINANCE TRANSFORMATION</h1>
                            <p style="margin:8px 0 0;font-size:14px;color:#9ca3af;">${subheadline}</p>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding:40px;">
                            <h2 style="margin:0 0 16px;font-size:22px;color:#ffffff;font-weight:bold;">${headline} 🎉</h2>

                            <!-- Gift Guide hero section -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:rgba(45,212,191,0.05);border-radius:12px;border:1px solid rgba(45,212,191,0.25);margin-bottom:24px;">
                                <tr>
                                    <td style="padding:24px;text-align:center;">
                                        <p style="margin:0 0 6px;font-size:20px;font-weight:bold;color:#ffffff;">קיבלת מתנה ממני 🎁</p>
                                        <p style="margin:0 0 18px;font-size:14px;color:#9ca3af;line-height:1.7;">
                                            מדריך מעשי: איך לבנות מודל תזרים מזומנים ל-13 שבועות עם Claude — צעד אחר צעד
                                        </p>
                                        <a href="${GIFT_GUIDE_URL}" style="display:inline-block;padding:13px 28px;background-color:#2dd4bf;color:#0a0e17;font-weight:bold;font-size:15px;text-decoration:none;border-radius:9999px;">
                                            פתח את המדריך
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <!-- What's included / coming up -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:rgba(255,255,255,0.02);border-radius:12px;border:1px solid rgba(255,255,255,0.06);margin-bottom:24px;">
                                <tr>
                                    <td style="padding:20px 24px;">
                                        <p style="margin:0 0 12px;font-size:14px;font-weight:bold;color:#2dd4bf;">מה עוד מחכה לך:</p>
                                        <p style="margin:0 0 8px;font-size:14px;color:#d1d5db;line-height:1.7;">🤖 ניוזלטר שבועי — טיפים AI לאנשי פיננסים</p>
                                        <p style="margin:0 0 8px;font-size:14px;color:#d1d5db;line-height:1.7;">📖 מאמרים ומדריכים מקצועיים בחינם</p>
                                        <p style="margin:0;font-size:14px;color:#d1d5db;line-height:1.7;">🎓 קורסים מעמיקים לחשבונאי העתיד</p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Discount course links -->
                            <p style="margin:0 0 14px;font-size:14px;font-weight:bold;color:#ffffff;">ומיידית — הנחה בלעדית על הקורסים שלי:</p>
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                                <tr>
                                    <td style="padding-bottom:10px;">
                                        <a href="${discountLink1}" style="display:block;padding:14px 20px;background-color:rgba(45,212,191,0.08);border:1px solid rgba(45,212,191,0.2);border-radius:10px;text-decoration:none;">
                                            <span style="display:block;font-size:14px;font-weight:bold;color:#2dd4bf;">🤖 AI Finance Mastery — עם הנחה</span>
                                            <span style="display:block;font-size:12px;color:#9ca3af;margin-top:4px;">הפוך לחשבונאי שמשתמש ב-AI בפועל</span>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href="${discountLink2}" style="display:block;padding:14px 20px;background-color:rgba(45,212,191,0.08);border:1px solid rgba(45,212,191,0.2);border-radius:10px;text-decoration:none;">
                                            <span style="display:block;font-size:14px;font-weight:bold;color:#2dd4bf;">📓 NotebookLM Master — עם הנחה</span>
                                            <span style="display:block;font-size:12px;color:#9ca3af;margin-top:4px;">כלי ה-AI הכי חזק לאנשי פיננסים</span>
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <!-- Secondary CTA -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center">
                                        ${secondaryCta}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding:24px 40px;text-align:center;border-top:1px solid rgba(255,255,255,0.06);">
                            <p style="margin:0 0 6px;font-size:12px;color:#6b7280;">
                                יש שאלה? דבר איתי ב-<a href="https://wa.me/972505500344" style="color:#2dd4bf;text-decoration:none;">WhatsApp</a>
                            </p>
                            <p style="margin:0;font-size:13px;color:#9ca3af;font-weight:bold;">
                                AI Finance Transformation
                            </p>
                            <p style="margin:4px 0 0;font-size:12px;color:#6b7280;">
                                רונן עמוס, רואה חשבון
                            </p>
                            ${footerExtra}
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>`.trim();
}
