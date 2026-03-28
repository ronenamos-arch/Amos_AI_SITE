interface DripDay7Params {
    siteUrl: string;
    unsubscribeUrl: string;
}

export function buildDripDay7Email({ siteUrl, unsubscribeUrl }: DripDay7Params): string {
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
                            <p style="margin:8px 0 0;font-size:14px;color:#9ca3af;">כלים מעשיים לאנשי פיננסים וחשבונאות</p>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding:40px;">
                            <h2 style="margin:0 0 16px;font-size:22px;color:#ffffff;font-weight:bold;">איך רואי חשבון בישראל משתמשים ב-AI בפועל</h2>
                            <p style="margin:0 0 24px;font-size:16px;line-height:1.8;color:#d1d5db;">
                                בשנה האחרונה הכשרתי עשרות אנשי פיננסים לעבוד עם AI. הנה מה שכתבו לי:
                            </p>

                            <!-- Testimonials -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                                <tr>
                                    <td style="padding-bottom:12px;">
                                        <img src="${siteUrl}/Testimonials/Linkedin%20message.png" alt="המלצה מ-Tilda Barliya PhD" width="520" style="width:100%;max-width:520px;border-radius:12px;display:block;" />
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-bottom:12px;">
                                        <img src="${siteUrl}/Testimonials/Linkedin%20recm%201.png" alt="המלצה מ-Nimrod Langmass, CEO @ Lynx" width="520" style="width:100%;max-width:520px;border-radius:12px;display:block;" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <img src="${siteUrl}/Testimonials/Linkedin%20recm%202.png" alt="המשך המלצה מ-Nimrod Langmass" width="520" style="width:100%;max-width:520px;border-radius:12px;display:block;" />
                                    </td>
                                </tr>
                            </table>

                            <p style="margin:0 0 24px;font-size:15px;line-height:1.8;color:#d1d5db;">
                                רוצה להגיע לאותן תוצאות? יש לי שני קורסים מעשיים שנועדו בדיוק לזה:
                            </p>

                            <!-- Course cards -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                                <tr>
                                    <td style="padding-bottom:12px;">
                                        <a href="https://www.paypal.com/ncp/payment/RNWU6D5DZHMHQ" style="display:block;padding:20px 24px;background-color:rgba(45,212,191,0.08);border:1px solid rgba(45,212,191,0.25);border-radius:12px;text-decoration:none;">
                                            <span style="display:block;font-size:16px;font-weight:bold;color:#2dd4bf;">🤖 AI Finance Mastery</span>
                                            <span style="display:block;font-size:13px;color:#9ca3af;margin-top:6px;line-height:1.6;">הפוך לחשבונאי שמשתמש ב-AI בפועל. מ-Claude ועד ChatGPT — מדריך מלא לאנשי פיננסים.</span>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href="https://www.paypal.com/ncp/payment/AADF6XSF3UAVY" style="display:block;padding:20px 24px;background-color:rgba(45,212,191,0.08);border:1px solid rgba(45,212,191,0.25);border-radius:12px;text-decoration:none;">
                                            <span style="display:block;font-size:16px;font-weight:bold;color:#2dd4bf;">📓 NotebookLM Master</span>
                                            <span style="display:block;font-size:13px;color:#9ca3af;margin-top:6px;line-height:1.6;">כלי ה-AI הכי חזק שאנשי פיננסים לא מכירים. קורס מעשי ב-5 מפגשים.</span>
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center">
                                        <a href="${siteUrl}/courses" style="display:inline-block;padding:14px 32px;background-color:#2dd4bf;color:#0a0e17;font-weight:bold;font-size:16px;text-decoration:none;border-radius:9999px;">
                                            ספר לי על הקורסים
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
