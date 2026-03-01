interface PurchaseEmailParams {
    planName: string; // "Monthly Flexible" or "Lifetime PRO"
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
                            <p style="margin:8px 0 0;font-size:14px;color:#9ca3af;">אישור תשלום</p>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding:40px;">
                            <h2 style="margin:0 0 16px;font-size:22px;color:#ffffff;">תודה על הצטרפותך!</h2>
                            <p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:#d1d5db;">
                                התשלום שלך התקבל בהצלחה. הגישה לתכני הפרימיום פעילה עכשיו.
                            </p>

                            <!-- Order Details -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:rgba(255,255,255,0.03);border-radius:12px;border:1px solid rgba(255,255,255,0.06);margin-bottom:32px;">
                                <tr>
                                    <td style="padding:20px;">
                                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td style="padding:8px 0;font-size:14px;color:#9ca3af;">מנוי:</td>
                                                <td style="padding:8px 0;font-size:14px;color:#ffffff;text-align:left;">${planName}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding:8px 0;font-size:14px;color:#9ca3af;">סכום:</td>
                                                <td style="padding:8px 0;font-size:14px;color:#ffffff;text-align:left;">₪${amount}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding:8px 0;font-size:14px;color:#9ca3af;">מזהה הזמנה:</td>
                                                <td style="padding:8px 0;font-size:14px;color:#ffffff;text-align:left;font-family:monospace;font-size:12px;">${orderId}</td>
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
                            <p style="margin:0;font-size:12px;color:#6b7280;">
                                יש שאלה? דבר איתי ב-<a href="https://wa.me/972505500344" style="color:#2dd4bf;text-decoration:none;">WhatsApp</a>
                            </p>
                            <p style="margin:8px 0 0;font-size:11px;color:#4b5563;">
                                AI Finance &mdash; Ronen Amos CPA
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
