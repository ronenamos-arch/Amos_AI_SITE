/**
 * HTML email template for AI Finance Master course purchase confirmation.
 */

interface CoursePurchaseEmailParams {
    name: string;
    accessUrl: string;
}

export function buildCoursePurchaseEmail({ name, accessUrl }: CoursePurchaseEmailParams): string {
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
                            <h1 style="margin:0;font-size:28px;color:#2dd4bf;font-weight:bold;letter-spacing:1px;">AI FINANCE MASTER</h1>
                            <p style="margin:8px 0 0;font-size:14px;color:#9ca3af;">קורס AI לרואי חשבון ומנהלי כספים — הגישה שלכם פתוחה</p>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding:40px;">
                            <h2 style="margin:0 0 16px;font-size:22px;color:#ffffff;font-weight:bold;">הי ${name}, ברוכים הבאים לתוכנית! 🎉</h2>
                            <p style="margin:0 0 28px;font-size:16px;line-height:1.8;color:#d1d5db;">
                                התשלום על סך ₪599 נקלט בהצלחה, והגישה המלאה לכל תכני הקורס פתוחה עבורכם לכל החיים.
                                לחצו על הכפתור למטה כדי להיכנס ישירות לכל 16 המודולים, חומרי התרגול וספריית ה-Skills.
                            </p>

                            <!-- Primary CTA -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                                <tr>
                                    <td align="center">
                                        <a href="${accessUrl}" style="display:inline-block;padding:18px 44px;background-color:#2dd4bf;color:#0a0e17;font-weight:bold;font-size:17px;text-decoration:none;border-radius:9999px;box-shadow:0 4px 20px rgba(45,212,191,0.3);">
                                            כניסה מיידית לקורס המלא →
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding-top:12px;">
                                        <p style="margin:0;font-size:12px;color:#6b7280;">קישור אישי ומאובטח — שמרו את המייל הזה לגישה עתידית.</p>
                                    </td>
                                </tr>
                            </table>

                            <!-- What you get -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:rgba(45,212,191,0.05);border-radius:12px;border:1px solid rgba(45,212,191,0.15);margin-bottom:28px;">
                                <tr>
                                    <td style="padding:24px;">
                                        <p style="margin:0 0 14px;font-size:15px;font-weight:bold;color:#2dd4bf;">מה כוללת הגישה שלכם:</p>
                                        <p style="margin:0 0 10px;font-size:14px;color:#d1d5db;line-height:1.7;">📚 16 מודולים מעשיים מלאים (מבסיס ועד Capstone דשבורד CFO)</p>
                                        <p style="margin:0 0 10px;font-size:14px;color:#d1d5db;line-height:1.7;">⚡ 200+ Prompts פיננסיים מוכנים להעתקה-הדבקה</p>
                                        <p style="margin:0 0 10px;font-size:14px;color:#d1d5db;line-height:1.7;">🛠️ 30+ Skills מוכנות להורדה: Variance, MBR, ERP Cleaner ועוד</p>
                                        <p style="margin:0 0 10px;font-size:14px;color:#d1d5db;line-height:1.7;">🎥 5 שעות הקלטות וובינרים חיים עם מנהלי כספים</p>
                                        <p style="margin:0;font-size:14px;color:#d1d5db;line-height:1.7;">💼 קבצי תרגול וחוברות עבודה עם נתוני TechFlow אמיתיים</p>
                                    </td>
                                </tr>
                            </table>

                            <!-- WhatsApp Community -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:rgba(37,211,102,0.06);border-radius:12px;border:1px solid rgba(37,211,102,0.2);margin-bottom:28px;">
                                <tr>
                                    <td style="padding:20px;text-align:center;">
                                        <p style="margin:0 0 8px;font-size:15px;font-weight:bold;color:#25d366;">💬 קהילת הוואטסאפ הבלעדית</p>
                                        <p style="margin:0 0 14px;font-size:13px;color:#d1d5db;">הצטרפו לקבוצה הסגורה לשאלות, התייעצויות ועדכוני AI שוטפים:</p>
                                        <a href="https://chat.whatsapp.com/CS6dgqnK45Q9XAMqScNr6R" style="display:inline-block;padding:10px 24px;background-color:#25d366;color:#ffffff;font-weight:bold;font-size:14px;text-decoration:none;border-radius:8px;">
                                            הצטרפות לקבוצת הוואטסאפ
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
                                שאלות? מוזמנים להשיב למייל זה או ליצור קשר ב-<a href="https://wa.me/972505500344" style="color:#2dd4bf;text-decoration:none;">WhatsApp: 050-5500344</a>
                            </p>
                            <p style="margin:0;font-size:13px;color:#9ca3af;font-weight:bold;">
                                רונן עמוס, CPA
                            </p>
                            <p style="margin:6px 0 0;font-size:12px;color:#6b7280;">
                                AI Finance Transformation — ronenamoscpa.co.il
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
