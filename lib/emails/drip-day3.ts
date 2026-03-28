interface DripDay3Params {
    siteUrl: string;
    unsubscribeUrl: string;
}

export function buildDripDay3Email({ siteUrl, unsubscribeUrl }: DripDay3Params): string {
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
                            <h2 style="margin:0 0 16px;font-size:22px;color:#ffffff;font-weight:bold;">3 פרומפטים שתוכל להשתמש בהם עוד היום 🤖</h2>
                            <p style="margin:0 0 24px;font-size:16px;line-height:1.8;color:#d1d5db;">
                                כשמתחילים עם AI בעבודת החשבונאות, הפרומפט הנכון שווה שעות עבודה. הנה שלושה שמשנים את הכל:
                            </p>

                            <!-- Prompt 1 -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:rgba(45,212,191,0.05);border-radius:12px;border:1px solid rgba(45,212,191,0.15);margin-bottom:16px;">
                                <tr>
                                    <td style="padding:20px 24px;">
                                        <p style="margin:0 0 8px;font-size:14px;font-weight:bold;color:#2dd4bf;">📊 1. ניתוח דוח כספי</p>
                                        <p style="margin:0;font-size:13px;color:#d1d5db;line-height:1.7;font-family:monospace;background-color:rgba(0,0,0,0.2);padding:12px;border-radius:8px;direction:rtl;">
                                            "נתח את הדוח הכספי הבא. זהה: מגמות חריגות בהכנסות, יחסים פיננסיים מרכזיים, ונקודות תשומת לב לדיון עם הלקוח. סגנון: קצר, ממוקד, בעברית."
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Prompt 2 -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:rgba(45,212,191,0.05);border-radius:12px;border:1px solid rgba(45,212,191,0.15);margin-bottom:16px;">
                                <tr>
                                    <td style="padding:20px 24px;">
                                        <p style="margin:0 0 8px;font-size:14px;font-weight:bold;color:#2dd4bf;">💬 2. הסבר ללקוח</p>
                                        <p style="margin:0;font-size:13px;color:#d1d5db;line-height:1.7;font-family:monospace;background-color:rgba(0,0,0,0.2);padding:12px;border-radius:8px;direction:rtl;">
                                            "תרגם את הסעיף החשבונאי הבא לשפה שלקוח ללא רקע פיננסי יבין. השתמש בדוגמה מחיי היומיום."
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Prompt 3 -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:rgba(45,212,191,0.05);border-radius:12px;border:1px solid rgba(45,212,191,0.15);margin-bottom:28px;">
                                <tr>
                                    <td style="padding:20px 24px;">
                                        <p style="margin:0 0 8px;font-size:14px;font-weight:bold;color:#2dd4bf;">🔍 3. בדיקת עקביות ושגיאות</p>
                                        <p style="margin:0;font-size:13px;color:#d1d5db;line-height:1.7;font-family:monospace;background-color:rgba(0,0,0,0.2);padding:12px;border-radius:8px;direction:rtl;">
                                            "בדוק את הנתונים הבאים לאי-עקביות: סכומים שנראים חריגים, תנאים סותרים, שגיאות הגיוניות. דווח על ממצאים בעברית בנקודות."
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin:0 0 28px;font-size:15px;line-height:1.8;color:#d1d5db;">
                                אלה רק ההתחלה. בבלוג יש עוד עשרות פרומפטים ומדריכים מעשיים לאנשי פיננסים.
                            </p>

                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center">
                                        <a href="${siteUrl}/blog" style="display:inline-block;padding:14px 32px;background-color:#2dd4bf;color:#0a0e17;font-weight:bold;font-size:16px;text-decoration:none;border-radius:9999px;">
                                            עוד כלים בבלוג
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
