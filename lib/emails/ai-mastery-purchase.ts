/**
 * HTML email template for "AI לכספים: המדריך למתחילים" course purchase confirmation.
 * Course URL: https://gamma.app/docs/ChatGPT--wrvbq68o6zujsmt
 * Password: masterai2
 */

interface AiMasteryPurchaseEmailParams {
    name: string;
    courseUrl?: string;
    password?: string;
}

export function buildAiMasteryPurchaseEmail({
    name,
    courseUrl = "https://gamma.app/docs/ChatGPT--wrvbq68o6zujsmt",
    password = "masterai2",
}: AiMasteryPurchaseEmailParams): string {
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
                <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background-color:#131825;border-radius:16px;border:1px solid rgba(255,255,255,0.08);overflow:hidden;">

                    <!-- Header -->
                    <tr>
                        <td style="padding:36px 40px 24px;text-align:center;border-bottom:1px solid rgba(45,212,191,0.2);background:linear-gradient(180deg, #182032 0%, #131825 100%);">
                            <h1 style="margin:0;font-size:26px;color:#2dd4bf;font-weight:bold;letter-spacing:1px;">AI FINANCE TRANSFORMATION</h1>
                            <p style="margin:8px 0 0;font-size:15px;color:#cbd5e1;font-weight:500;">AI לכספים: המדריך למתחילים — פרטי הגישה והסיסמה שלך 🎓</p>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding:36px 36px 28px;">
                            <h2 style="margin:0 0 16px;font-size:22px;color:#ffffff;font-weight:bold;">היי ${name}, תודה רבה וברוכה הבאה! 🎉</h2>
                            <p style="margin:0 0 24px;font-size:16px;line-height:1.8;color:#d1d5db;">
                                שמח מאוד שהצטרפת לקורס <strong>"AI לכספים: המדריך למתחילים"</strong>. התשלום נקלט בהצלחה, והגישה לכל 8 השיעורים וחוברת התרגילים פתוחה עבורך לכל החיים.
                            </p>

                            <!-- Password Box -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg, rgba(234,179,8,0.12) 0%, rgba(202,138,4,0.05) 100%);border-radius:14px;border:1px solid rgba(234,179,8,0.35);margin-bottom:28px;">
                                <tr>
                                    <td style="padding:22px;text-align:center;">
                                        <p style="margin:0 0 8px;font-size:14px;font-weight:bold;color:#facc15;text-transform:uppercase;letter-spacing:0.5px;">🔑 סיסמת הגישה לשיעורים:</p>
                                        <div style="display:inline-block;background:#0a0e17;border:1px dashed #facc15;padding:10px 24px;border-radius:8px;font-family:Consolas,Monaco,monospace;font-size:22px;font-weight:bold;color:#fef08a;letter-spacing:2px;">
                                            ${password}
                                        </div>
                                        <p style="margin:10px 0 0;font-size:13px;color:#cbd5e1;">הזינו סיסמה זו בעת פתיחת השיעורים המוגנים בקישור למטה.</p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Primary CTA Button -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:10px 0 28px;">
                                <tr>
                                    <td align="center">
                                        <a href="${courseUrl}" style="display:inline-block;padding:18px 44px;background:linear-gradient(135deg, #2dd4bf 0%, #0d9488 100%);color:#0a0e17;font-weight:bold;font-size:17px;text-decoration:none;border-radius:9999px;box-shadow:0 4px 20px rgba(45,212,191,0.35);">
                                            🚀 כניסה לקורס ב-Gamma ←
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding-top:12px;">
                                        <p style="margin:0;font-size:12px;color:#94a3b8;">קישור קבוע ומאובטח — שמרו את המייל הזה לגישה מהירה בכל עת.</p>
                                    </td>
                                </tr>
                            </table>

                            <!-- What's Included Box -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:rgba(45,212,191,0.04);border-radius:12px;border:1px solid rgba(45,212,191,0.18);margin-bottom:28px;">
                                <tr>
                                    <td style="padding:22px;">
                                        <p style="margin:0 0 14px;font-size:16px;font-weight:bold;color:#2dd4bf;">מה כוללת הגישה שלך:</p>
                                        <p style="margin:0 0 10px;font-size:14px;color:#e2e8f0;line-height:1.7;">📚 <strong>8 שיעורים מעשיים מקיפים</strong> — מבוא לעולם ה-AI Finance, עבודה עם ChatGPT ו-Claude, ניתוח דאטה ואוטומציות</p>
                                        <p style="margin:0 0 10px;font-size:14px;color:#e2e8f0;line-height:1.7;">📝 <strong>חוברות תרגול מלאות</strong> — תרגילים מודרכים לכל שלב בעבודה השוטפת</p>
                                        <p style="margin:0 0 10px;font-size:14px;color:#e2e8f0;line-height:1.7;">⚡ <strong>מאגר 100+ פרומפטים פיננסיים</strong> — להעתקה-הדבקה מהירה</p>
                                        <p style="margin:0;font-size:14px;color:#e2e8f0;line-height:1.7;">♾️ <strong>גישה לכל החיים</strong> לכל חומרי הלמידה והעדכונים</p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Main Website & WhatsApp Community -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:rgba(37,211,102,0.06);border-radius:12px;border:1px solid rgba(37,211,102,0.22);margin-bottom:28px;">
                                <tr>
                                    <td style="padding:20px;text-align:center;">
                                        <p style="margin:0 0 8px;font-size:15px;font-weight:bold;color:#25d366;">💬 קהילת הוואטסאפ הסגורה לאנשי פיננסים</p>
                                        <p style="margin:0 0 14px;font-size:13px;color:#cbd5e1;line-height:1.6;">מזמין אותך להצטרף לקבוצה השקטה שלנו לעדכונים, תובנות מעשיות ושאלות שוטפות:</p>
                                        <a href="https://chat.whatsapp.com/F1Y1Q35QIZ3L6rcrXuEnNN" style="display:inline-block;padding:10px 26px;background-color:#25d366;color:#ffffff;font-weight:bold;font-size:14px;text-decoration:none;border-radius:8px;">
                                            הצטרפות לקבוצת הוואטסאפ ←
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <!-- Personal Support Note -->
                            <div style="background-color:rgba(255,255,255,0.03);border-radius:10px;padding:16px 20px;margin-bottom:10px;border-left:3px solid #2dd4bf;">
                                <p style="margin:0;font-size:14px;color:#cbd5e1;line-height:1.7;">
                                    אני כאן לכל שאלה או עזרה טכנית במהלך הלמידה. אפשר להשיב ישירות למייל זה או לפנות בוואטסאפ האישי שלי. בהצלחה רבה!
                                </p>
                            </div>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding:24px 40px;text-align:center;border-top:1px solid rgba(255,255,255,0.08);background-color:#0d111a;">
                            <p style="margin:0 0 6px;font-size:13px;color:#94a3b8;">
                                שאלות? דברו איתי ישירות ב-<a href="https://wa.me/972505500344" style="color:#2dd4bf;text-decoration:none;font-weight:bold;">WhatsApp: 050-5500344</a>
                            </p>
                            <p style="margin:10px 0 2px;font-size:14px;color:#e2e8f0;font-weight:bold;">
                                רונן עמוס, CPA
                            </p>
                            <p style="margin:0;font-size:12px;color:#64748b;">
                                אתר הבית: <a href="https://www.ronenamoscpa.co.il" style="color:#2dd4bf;text-decoration:none;font-weight:bold;">ronenamoscpa.co.il</a>
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `.trim();
}
