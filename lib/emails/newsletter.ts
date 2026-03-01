interface NewsletterEmailParams {
    bodyHtml: string;
    siteUrl: string;
    unsubscribeUrl: string;
}

export function buildNewsletterEmail({ bodyHtml, siteUrl, unsubscribeUrl }: NewsletterEmailParams): string {
    return `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#0a0e17;font-family:Arial,Helvetica,sans-serif;color:#e0e0e0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0e17;padding:40px 20px;">
        <tr>
            <td align="center">
                <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#131825;border-radius:16px;border:1px solid rgba(255,255,255,0.06);overflow:hidden;">

                    <!-- Header -->
                    <tr>
                        <td style="padding:32px 40px 24px;text-align:center;border-bottom:1px solid rgba(45,212,191,0.2);">
                            <a href="${siteUrl}" style="text-decoration:none;">
                                <h1 style="margin:0;font-size:28px;color:#2dd4bf;">AI FINANCE</h1>
                            </a>
                            <p style="margin:8px 0 0;font-size:14px;color:#9ca3af;">ניוזלטר</p>
                        </td>
                    </tr>

                    <!-- Body Content -->
                    <tr>
                        <td style="padding:40px;font-size:16px;line-height:1.8;color:#d1d5db;">
                            ${bodyHtml}
                        </td>
                    </tr>

                    <!-- CTA -->
                    <tr>
                        <td style="padding:0 40px 32px;text-align:center;">
                            <a href="${siteUrl}/blog" style="display:inline-block;padding:14px 32px;background-color:#2dd4bf;color:#0a0e17;font-weight:bold;font-size:16px;text-decoration:none;border-radius:9999px;">
                                קרא עוד בבלוג
                            </a>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding:24px 40px;text-align:center;border-top:1px solid rgba(255,255,255,0.06);">
                            <p style="margin:0;font-size:12px;color:#6b7280;">
                                יש שאלה? דבר איתי ב-<a href="https://wa.me/972505500344" style="color:#2dd4bf;text-decoration:none;">WhatsApp</a>
                            </p>
                            <p style="margin:12px 0 0;font-size:11px;color:#4b5563;">
                                AI Finance &mdash; Ronen Amos CPA
                            </p>
                            <p style="margin:8px 0 0;font-size:11px;">
                                <a href="${unsubscribeUrl}" style="color:#6b7280;text-decoration:underline;">הסרה מרשימת התפוצה</a>
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>`.trim();
}
