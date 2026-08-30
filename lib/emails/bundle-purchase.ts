/**
 * HTML email template for bundle purchase confirmation.
 * Styled consistently with existing email templates (dark theme, cyan accents).
 */

interface BundlePurchaseEmailParams {
    name: string;
    accessUrl: string;
}

export function buildBundlePurchaseEmail({ name, accessUrl }: BundlePurchaseEmailParams): string {
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
                            <h1 style="margin:0;font-size:28px;color:#2dd4bf;font-weight:bold;letter-spacing:1px;">AI FINANCE</h1>
                            <p style="margin:8px 0 0;font-size:14px;color:#9ca3af;">Claude לכספים — 5 הוובינרים המלאים</p>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding:40px;">
                            <h2 style="margin:0 0 16px;font-size:22px;color:#ffffff;font-weight:bold;">הי ${name}, תודה על הרכישה! 🎉</h2>
                            <p style="margin:0 0 28px;font-size:16px;line-height:1.8;color:#d1d5db;">
                                הגישה ל-5 הוובינרים המלאים נפתחה. הקישור למטה מוביל אתכם ישירות לדף
                                הצפייה — שם תמצאו את כל ההקלטות, הפרומפטים והקבצים להורדה.
                            </p>

                            <!-- Primary CTA -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                                <tr>
                                    <td align="center">
                                        <a href="${accessUrl}" style="display:inline-block;padding:16px 40px;background-color:#2dd4bf;color:#0a0e17;font-weight:bold;font-size:16px;text-decoration:none;border-radius:9999px;">
                                            כניסה לוובינרים →
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding-top:12px;">
                                        <p style="margin:0;font-size:12px;color:#6b7280;">קישור אישי — שמרו אותו, הוא שלכם לצמיתות.</p>
                                    </td>
                                </tr>
                            </table>

                            <!-- What they got -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:rgba(45,212,191,0.05);border-radius:12px;border:1px solid rgba(45,212,191,0.15);margin-bottom:28px;">
                                <tr>
                                    <td style="padding:24px;">
                                        <p style="margin:0 0 14px;font-size:15px;font-weight:bold;color:#2dd4bf;">מה מחכה לכם בפנים</p>
                                        <p style="margin:0 0 10px;font-size:14px;color:#d1d5db;line-height:1.7;">📹 פרק 1 — Claude לרואי חשבון: סביבת העבודה החדשה</p>
                                        <p style="margin:0 0 10px;font-size:14px;color:#d1d5db;line-height:1.7;">📹 פרק 2 — Claude עם Excel ו-PowerPoint</p>
                                        <p style="margin:0 0 10px;font-size:14px;color:#d1d5db;line-height:1.7;">📹 פרק 3 — Claude Live Artifacts</p>
                                        <p style="margin:0 0 10px;font-size:14px;color:#d1d5db;line-height:1.7;">📹 פרק 4 — עבודה עם פרויקטים בקלוד</p>
                                        <p style="margin:0;font-size:14px;color:#d1d5db;line-height:1.7;">📹 פרק 5 — Claude Skills שבאמת עובדים</p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Tip -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:rgba(255,255,255,0.03);border-radius:12px;border:1px solid rgba(255,255,255,0.06);margin-bottom:28px;">
                                <tr>
                                    <td style="padding:24px;">
                                        <p style="margin:0 0 6px;font-size:15px;font-weight:bold;color:#ffffff;">💡 טיפ: מאיפה להתחיל?</p>
                                        <p style="margin:0;font-size:14px;color:#9ca3af;line-height:1.6;">
                                            אם אתם חדשים ב-Claude — התחילו מפרק 1 והתקדמו לפי הסדר.
                                            אם כבר עבדתם עם Claude — קפצו ישר לפרק 4 (Projects) או 5 (Skills).
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding:24px 40px;text-align:center;border-top:1px solid rgba(255,255,255,0.06);">
                            <p style="margin:0 0 6px;font-size:12px;color:#6b7280;">
                                שאלה? אפשר להשיב למייל הזה או לכתוב ב-<a href="https://wa.me/972505500344" style="color:#2dd4bf;text-decoration:none;">WhatsApp</a>
                            </p>
                            <p style="margin:0;font-size:13px;color:#9ca3af;font-weight:bold;">
                                רונן עמוס, רו״ח
                            </p>
                            <p style="margin:6px 0 0;font-size:12px;color:#6b7280;">
                                המרכז הישראלי ל-AI בכספים
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
