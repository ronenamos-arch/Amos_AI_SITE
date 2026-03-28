interface DripDay14Params {
    siteUrl: string;
    unsubscribeUrl: string;
}

export function buildDripDay14Email({ siteUrl, unsubscribeUrl }: DripDay14Params): string {
    const link1 = "https://www.paypal.com/ncp/payment/RNWU6D5DZHMHQ";
    const link2 = "https://www.paypal.com/ncp/payment/AADF6XSF3UAVY";

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
                            <p style="margin:8px 0 0;font-size:14px;color:#9ca3af;">הצעה אחרונה — תוקף מוגבל</p>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding:40px;">
                            <h2 style="margin:0 0 16px;font-size:22px;color:#ffffff;font-weight:bold;">ההנחה שלך מחכה — נשאר לך עוד 48 שעות ⏰</h2>
                            <p style="margin:0 0 24px;font-size:16px;line-height:1.8;color:#d1d5db;">
                                לפני שבועיים הצטרפת ל-AI Finance. שלחתי לך מדריך לתזרים מזומנים, פרומפטים מעשיים, וסיפורים של רואי חשבון שכבר עושים את זה.
                            </p>
                            <p style="margin:0 0 28px;font-size:16px;line-height:1.8;color:#d1d5db;">
                                אם הגיע הזמן לצלול עמוק — הנה ההנחה הבלעדית שהבטחתי:
                            </p>

                            <!-- Discount highlight box -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:rgba(45,212,191,0.08);border-radius:12px;border:2px solid rgba(45,212,191,0.35);margin-bottom:28px;">
                                <tr>
                                    <td style="padding:24px;text-align:center;">
                                        <p style="margin:0 0 6px;font-size:28px;font-weight:bold;color:#2dd4bf;">15% הנחה</p>
                                        <p style="margin:0;font-size:14px;color:#9ca3af;">על כל אחד מהקורסים — בתוקף 48 שעות בלבד</p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Course cards with discount links -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                                <tr>
                                    <td style="padding-bottom:12px;">
                                        <a href="${link1}" style="display:block;padding:20px 24px;background-color:rgba(45,212,191,0.08);border:1px solid rgba(45,212,191,0.25);border-radius:12px;text-decoration:none;">
                                            <span style="display:block;font-size:16px;font-weight:bold;color:#2dd4bf;">🤖 AI Finance Mastery — 15% הנחה</span>
                                            <span style="display:block;font-size:13px;color:#9ca3af;margin-top:6px;line-height:1.6;">הפוך לחשבונאי שמשתמש ב-AI בפועל. לחץ לרכישה עם ההנחה.</span>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href="${link2}" style="display:block;padding:20px 24px;background-color:rgba(45,212,191,0.08);border:1px solid rgba(45,212,191,0.25);border-radius:12px;text-decoration:none;">
                                            <span style="display:block;font-size:16px;font-weight:bold;color:#2dd4bf;">📓 NotebookLM Master — 15% הנחה</span>
                                            <span style="display:block;font-size:13px;color:#9ca3af;margin-top:6px;line-height:1.6;">כלי ה-AI הכי חזק לאנשי פיננסים. לחץ לרכישה עם ההנחה.</span>
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center" style="padding-bottom:16px;">
                                        <a href="${siteUrl}/courses" style="display:inline-block;padding:14px 32px;background-color:#2dd4bf;color:#0a0e17;font-weight:bold;font-size:16px;text-decoration:none;border-radius:9999px;">
                                            השתמש בהנחה עכשיו
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin:0;font-size:14px;line-height:1.8;color:#6b7280;text-align:center;">
                                יש שאלות לפני שאתה מחליט? פשוט ענה למייל הזה — אני קורא הכל.
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding:24px 40px;text-align:center;border-top:1px solid rgba(255,255,255,0.06);">
                            <p style="margin:0 0 6px;font-size:12px;color:#6b7280;">
                                יש שאלה? דבר איתי ב-<a href="https://chat.whatsapp.com/CS6dgqnK45Q9XAMqScNr6R" style="color:#2dd4bf;text-decoration:none;">WhatsApp</a>
                            </p>
                            <p style="margin:0;font-size:13px;color:#9ca3af;font-weight:bold;">
                                AI Finance Transformation
                            </p>
                            <p style="margin:4px 0 0;font-size:12px;color:#6b7280;">
                                רונן עמוס, רואה חשבון
                            </p>
                            <p style="margin:8px 0 0;font-size:11px;color:#6b7280;">
                                <a href="${unsubscribeUrl}" style="color:#6b7280;text-decoration:underline;">הסר אותי מהרשימה</a>
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
