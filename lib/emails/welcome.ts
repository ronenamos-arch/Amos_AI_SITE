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

    const bodyContent = isNewsletter
        ? `
            <p style="margin:0 0 24px;font-size:16px;line-height:1.8;color:#d1d5db;">
                הצטרפת לרשימת הניוזלטר של AI Finance. כל שבוע תקבל ישירות למייל תכנים מעשיים בנושאי:
            </p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:rgba(45,212,191,0.05);border-radius:12px;border:1px solid rgba(45,212,191,0.15);margin-bottom:28px;">
                <tr>
                    <td style="padding:24px;">
                        <p style="margin:0 0 10px;font-size:14px;color:#d1d5db;line-height:1.7;">🤖 שימוש ב-AI לניהול פיננסי ולחשבונאות</p>
                        <p style="margin:0 0 10px;font-size:14px;color:#d1d5db;line-height:1.7;">📊 ניתוחים פיננסיים מעשיים וכלים חשבונאיים</p>
                        <p style="margin:0;font-size:14px;color:#d1d5db;line-height:1.7;">📓 טיפים ומדריכים למקצוענים בתחום הכספים</p>
                    </td>
                </tr>
            </table>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                    <td align="center" style="padding-bottom:12px;">
                        <a href="${siteUrl}/blog" style="display:inline-block;padding:14px 32px;background-color:#2dd4bf;color:#0a0e17;font-weight:bold;font-size:16px;text-decoration:none;border-radius:9999px;">
                            קרא את הבלוג
                        </a>
                    </td>
                </tr>
            </table>
        `
        : `
            <p style="margin:0 0 24px;font-size:16px;line-height:1.8;color:#d1d5db;">
                נרשמת בהצלחה ל-AI Finance — הפלטפורמה שמשלבת בינה מלאכותית עם ידע פיננסי וחשבונאי מקצועי.
            </p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:rgba(45,212,191,0.05);border-radius:12px;border:1px solid rgba(45,212,191,0.15);margin-bottom:28px;">
                <tr>
                    <td style="padding:24px;">
                        <p style="margin:0 0 6px;font-size:15px;font-weight:bold;color:#2dd4bf;">מה מחכה לך:</p>
                        <p style="margin:0 0 10px;font-size:14px;color:#d1d5db;line-height:1.7;">📖 מאמרים חינמיים בנושאי AI, פיננסים וחשבונאות</p>
                        <p style="margin:0 0 10px;font-size:14px;color:#d1d5db;line-height:1.7;">🔒 גישה לתוכן פרימיום עם מנוי (מדריכים מעשיים + כלים)</p>
                        <p style="margin:0;font-size:14px;color:#d1d5db;line-height:1.7;">📬 ניוזלטר שבועי ישירות למייל</p>
                    </td>
                </tr>
            </table>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                    <td align="center" style="padding-bottom:12px;">
                        <a href="${siteUrl}/dashboard" style="display:inline-block;padding:14px 32px;background-color:#2dd4bf;color:#0a0e17;font-weight:bold;font-size:16px;text-decoration:none;border-radius:9999px;">
                            כניסה לאזור האישי
                        </a>
                    </td>
                </tr>
                <tr>
                    <td align="center">
                        <a href="${siteUrl}/blog" style="display:inline-block;padding:12px 28px;background-color:transparent;color:#2dd4bf;font-size:14px;text-decoration:none;border:1px solid rgba(45,212,191,0.3);border-radius:9999px;">
                            גלוש בבלוג
                        </a>
                    </td>
                </tr>
            </table>
        `;

    const footerExtra = isNewsletter && unsubscribeUrl
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
                <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#131825;border-radius:16px;border:1px solid rgba(255,255,255,0.06);overflow:hidden;">

                    <!-- Header -->
                    <tr>
                        <td style="padding:32px 40px 24px;text-align:center;border-bottom:1px solid rgba(45,212,191,0.2);">
                            <h1 style="margin:0;font-size:28px;color:#2dd4bf;font-weight:bold;letter-spacing:1px;">AI FINANCE</h1>
                            <p style="margin:8px 0 0;font-size:14px;color:#9ca3af;">${subheadline}</p>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding:40px;">
                            <h2 style="margin:0 0 16px;font-size:22px;color:#ffffff;font-weight:bold;">${headline} 🎉</h2>
                            ${bodyContent}
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
