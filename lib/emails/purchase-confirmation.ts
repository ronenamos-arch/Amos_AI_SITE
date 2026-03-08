interface PurchaseEmailParams {
    planName: string;
    amount: number;
    orderId: string;
    siteUrl: string;
}

export function buildPurchaseConfirmationEmail({ planName, amount, orderId, siteUrl }: PurchaseEmailParams): string {
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
                            <h1 style="margin:0;font-size:28px;color:#2dd4bf;">AI FINANCE</h1>
                            <p style="margin:8px 0 0;font-size:14px;color:#9ca3af;">ברוכים הבאים לפרימיום</p>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding:40px;">
                            <h2 style="margin:0 0 16px;font-size:22px;color:#ffffff;">תודה על הרישום! 🎉</h2>
                            <p style="margin:0 0 24px;font-size:16px;line-height:1.8;color:#d1d5db;">
                                יש לך עכשיו גישה מלאה לכל המאמרים בפרימיום, כולל מדריכים מעשיים בנושאי AI, פיננסים וחשבונאות.
                            </p>

                            <!-- What you get -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:rgba(45,212,191,0.05);border-radius:12px;border:1px solid rgba(45,212,191,0.15);margin-bottom:28px;">
                                <tr>
                                    <td style="padding:24px;">
                                        <p style="margin:0 0 14px;font-size:15px;font-weight:bold;color:#2dd4bf;">מה כלול במנוי שלך:</p>
                                        <p style="margin:0 0 10px;font-size:14px;color:#d1d5db;line-height:1.7;">✅ גישה מלאה לכל מאמרי הפרימיום והמדריכים</p>
                                        <p style="margin:0 0 10px;font-size:14px;color:#d1d5db;line-height:1.7;">✅ ניוזלטר שבועי ישלח אליך ישירות למייל</p>
                                        <p style="margin:0;font-size:14px;color:#d1d5db;line-height:1.7;">✅ הנחה בלעדית של 15% על הקורסים שלי (פרטים למטה)</p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Courses discount -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:rgba(255,255,255,0.03);border-radius:12px;border:1px solid rgba(255,255,255,0.06);margin-bottom:28px;">
                                <tr>
                                    <td style="padding:24px;">
                                        <p style="margin:0 0 6px;font-size:15px;font-weight:bold;color:#ffffff;">🎓 הנחה של 15% על הקורסים</p>
                                        <p style="margin:0 0 18px;font-size:14px;color:#9ca3af;line-height:1.6;">
                                            כמנוי פרימיום, מגיעה לך הנחה של 15% על שני הקורסים הבאים.<br>
                                            <strong style="color:#2dd4bf;">קוד הקופון / קישור ההנחה ישלח אליך במייל נפרד בקרוב.</strong>
                                        </p>
                                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td style="padding-bottom:12px;">
                                                    <a href="${siteUrl}/courses/ai-mastery" style="display:block;padding:14px 20px;background-color:rgba(45,212,191,0.08);border:1px solid rgba(45,212,191,0.25);border-radius:10px;text-decoration:none;">
                                                        <span style="display:block;font-size:15px;font-weight:bold;color:#2dd4bf;">🤖 Master AI</span>
                                                        <span style="display:block;font-size:13px;color:#9ca3af;margin-top:4px;">AI Finance Mastery — הפוך לחשבונאי של העתיד</span>
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <a href="${siteUrl}/courses/notebook-master" style="display:block;padding:14px 20px;background-color:rgba(45,212,191,0.08);border:1px solid rgba(45,212,191,0.25);border-radius:10px;text-decoration:none;">
                                                        <span style="display:block;font-size:15px;font-weight:bold;color:#2dd4bf;">📓 Notebook LM Master</span>
                                                        <span style="display:block;font-size:13px;color:#9ca3af;margin-top:4px;">Mastering NotebookLM — קורס מעשי לאנשי פיננסים</span>
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Order Details -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:rgba(255,255,255,0.02);border-radius:12px;border:1px solid rgba(255,255,255,0.06);margin-bottom:32px;">
                                <tr>
                                    <td style="padding:20px;">
                                        <p style="margin:0 0 12px;font-size:13px;font-weight:bold;color:#9ca3af;">פרטי הרכישה:</p>
                                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td style="padding:6px 0;font-size:14px;color:#9ca3af;">מנוי:</td>
                                                <td style="padding:6px 0;font-size:14px;color:#ffffff;text-align:left;">${planName}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding:6px 0;font-size:14px;color:#9ca3af;">סכום:</td>
                                                <td style="padding:6px 0;font-size:14px;color:#ffffff;text-align:left;">₪${amount}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding:6px 0;font-size:14px;color:#9ca3af;">מזהה הזמנה:</td>
                                                <td style="padding:6px 0;font-size:12px;color:#ffffff;text-align:left;font-family:monospace;">${orderId}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- CTA Buttons -->
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
                                            גלוש בבלוג הפרימיום
                                        </a>
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
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>`.trim();
}
