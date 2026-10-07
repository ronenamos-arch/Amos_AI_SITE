/**
 * HTML email template for active paying members update.
 * Covers: Site upgrades (Skills Vault, Lessons Library, Guides) + 2 latest blog posts.
 */

interface PayingMembersUpdateEmailParams {
    name?: string;
    siteUrl?: string;
}

export function buildPayingMembersUpdateEmail({
    name = "חבר/ת קהילת הפרימיום",
    siteUrl = "https://www.ronenamoscpa.co.il",
}: PayingMembersUpdateEmailParams): string {
    return `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#0a0e17;font-family:Arial,Helvetica,sans-serif;color:#e2e8f0;direction:rtl;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0e17;padding:40px 16px;">
        <tr>
            <td align="center">
                <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;max-width:620px;background-color:#131825;border-radius:18px;border:1px solid rgba(255,255,255,0.08);overflow:hidden;box-shadow:0 12px 40px rgba(0,0,0,0.5);">

                    <!-- Header -->
                    <tr>
                        <td style="padding:36px 40px 24px;text-align:center;border-bottom:1px solid rgba(45,212,191,0.2);background:linear-gradient(180deg, #182032 0%, #131825 100%);">
                            <div style="display:inline-block;padding:4px 14px;background:rgba(45,212,191,0.12);border:1px solid rgba(45,212,191,0.3);border-radius:9999px;color:#2dd4bf;font-size:12px;font-weight:bold;margin-bottom:12px;letter-spacing:0.5px;">
                                ✨ עדכון פרימיום בלעדי לחברי הקהילה
                            </div>
                            <h1 style="margin:0;font-size:26px;color:#ffffff;font-weight:900;letter-spacing:-0.5px;">AI FINANCE TRANSFORMATION</h1>
                            <p style="margin:8px 0 0;font-size:14px;color:#94a3b8;">השדרוגים החדשים באתר + 2 מדריכי עומק שאתם חייבים להכיר</p>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding:36px 36px 28px;">
                            <h2 style="margin:0 0 16px;font-size:20px;color:#ffffff;font-weight:bold;">היי ${name},</h2>
                            <p style="margin:0 0 24px;font-size:15px;line-height:1.8;color:#cbd5e1;">
                                רציתי לעצור רגע ולשתף אתכם בשדרוגים הגדולים שעלו לאחרונה באתר, ובשני מדריכי עומק חדשים שיעזרו לכם לקחת את השימוש ב-AI במחלקת הכספים לרמה הבאה.
                                כחברי פרימיום, כל התכנים, הכלים והספריות פתוחים עבורכם ללא הגבלה.
                            </p>

                            <!-- SECTION 1: What's New in the Platform -->
                            <div style="margin-bottom:32px;">
                                <div style="display:flex;align-items:center;gap:8px;margin-bottom:16px;">
                                    <h3 style="margin:0;font-size:18px;color:#2dd4bf;font-weight:bold;">🚀 מה שודרג באזור האישי ובאתר?</h3>
                                </div>

                                <!-- Feature 1: Skill Vault -->
                                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.03);border-radius:12px;border:1px solid rgba(255,255,255,0.06);margin-bottom:12px;">
                                    <tr>
                                        <td style="padding:18px 20px;">
                                            <p style="margin:0 0 6px;font-size:15px;font-weight:bold;color:#ffffff;">🛠️ כספת ה-Skills והפרומפטים המשודרגת (Skill Vault)</p>
                                            <p style="margin:0 0 10px;font-size:13px;color:#94a3b8;line-height:1.6;">
                                                ספרייה אינטראקטיבית עם עשרות פרומפטים מוכנים להעתקה-הדבקה: סגירת חודש, ניתוחי Variance, מודלי FP&A ומודול ייעודי לניקוי דאטה פיננסי.
                                            </p>
                                            <a href="${siteUrl}/skill-vault" style="color:#2dd4bf;font-size:13px;font-weight:bold;text-decoration:none;">
                                                לכניסה לכספת הפרומפטים ←
                                            </a>
                                        </td>
                                    </tr>
                                </table>

                                <!-- Feature 2: Lessons Library -->
                                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.03);border-radius:12px;border:1px solid rgba(255,255,255,0.06);margin-bottom:12px;">
                                    <tr>
                                        <td style="padding:18px 20px;">
                                            <p style="margin:0 0 6px;font-size:15px;font-weight:bold;color:#ffffff;">🎬 ספריית ההדרכות וההקלטות המלאות (/lessons)</p>
                                            <p style="margin:0 0 10px;font-size:13px;color:#94a3b8;line-height:1.6;">
                                                מפגשים מוקלטים של שעה מלאה על Claude, Excel ואוטומציות, כולל מצגות להורדה, קבצי אקסל וחוברות עבודה.
                                            </p>
                                            <a href="${siteUrl}/lessons" style="color:#2dd4bf;font-size:13px;font-weight:bold;text-decoration:none;">
                                                לצפייה בהקלטות השיעורים ←
                                            </a>
                                        </td>
                                    </tr>
                                </table>

                                <!-- Feature 3: Interactive Guides -->
                                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.03);border-radius:12px;border:1px solid rgba(255,255,255,0.06);margin-bottom:12px;">
                                    <tr>
                                        <td style="padding:18px 20px;">
                                            <p style="margin:0 0 6px;font-size:15px;font-weight:bold;color:#ffffff;">📖 ספריית המדריכים האינטראקטיביים (/guides)</p>
                                            <p style="margin:0 0 10px;font-size:13px;color:#94a3b8;line-height:1.6;">
                                                מדריכים ויזואליים מבוססי Gamma לצפייה ולמידה נוחה של תהליכי עבודה מתקדמים.
                                            </p>
                                            <a href="${siteUrl}/guides" style="color:#2dd4bf;font-size:13px;font-weight:bold;text-decoration:none;">
                                                לספריית המדריכים ←
                                            </a>
                                        </td>
                                    </tr>
                                </table>
                            </div>

                            <!-- SECTION 2: Two Latest Articles -->
                            <div style="margin-bottom:32px;">
                                <h3 style="margin:0 0 16px;font-size:18px;color:#38bdf8;font-weight:bold;">📚 2 המאמרים החדשים בבלוג ששווה לקרוא:</h3>

                                <!-- Article 1 -->
                                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:rgba(56,189,248,0.04);border-radius:14px;border:1px solid rgba(56,189,248,0.2);margin-bottom:16px;">
                                    <tr>
                                        <td style="padding:22px;">
                                            <div style="font-size:11px;color:#38bdf8;font-weight:bold;margin-bottom:6px;text-transform:uppercase;">📌 מדריך אבטחה ומתודולוגיה</div>
                                            <h4 style="margin:0 0 8px;font-size:16px;color:#ffffff;line-height:1.5;">
                                                למה מנהל כספים חכם מסרב לחבר את ה-AI ישירות למייל (ושיטת 3 השלבים שכן עובדת)
                                            </h4>
                                            <p style="margin:0 0 14px;font-size:13px;color:#cbd5e1;line-height:1.7;">
                                                חיבור ישיר של כלי AI לתיבת הדואר של ה-CFO חושף את הארגון להזרקות פרומפטים, שריפת טוקנים ופלט מטעה. במאמר תלמדו איך ליישם את מתודולוגיית Shop, Prep, Cook לאוטומציה פיננסית מדויקת, בטוחה וחסכונית.
                                            </p>
                                            <a href="${siteUrl}/blog/cfo-ai-inbox-architecture-mistakes" style="display:inline-block;padding:8px 20px;background:#38bdf8;color:#0a0e17;font-weight:bold;font-size:13px;text-decoration:none;border-radius:6px;">
                                                קרא את המאמר המלא ←
                                            </a>
                                        </td>
                                    </tr>
                                </table>

                                <!-- Article 2 -->
                                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:rgba(168,85,247,0.04);border-radius:14px;border:1px solid rgba(168,85,247,0.2);margin-bottom:16px;">
                                    <tr>
                                        <td style="padding:22px;">
                                            <div style="font-size:11px;color:#c084fc;font-weight:bold;margin-bottom:6px;text-transform:uppercase;">🎯 מדריך דיוק ובקרה</div>
                                            <h4 style="margin:0 0 8px;font-size:16px;color:#ffffff;line-height:1.5;">
                                                מדריך מתקדם ל-Evals: איך לחשוף (ולתקן) כשלים חבויים במודלים ובסוכני AI פיננסיים
                                            </h4>
                                            <p style="margin:0 0 14px;font-size:13px;color:#cbd5e1;line-height:1.7;">
                                                למה 90% מצוותי ה-AI קופצים ישר למדדים ומודדים את הדברים הלא נכונים? מדריך מעשי לגילוי שגיאות (Error Discovery), מיפוי Traces, התמודדות עם Criteria Drift ובניית מערך הערכה אמין לסוכני AI פיננסיים.
                                            </p>
                                            <a href="${siteUrl}/blog/advanced-ai-evals-error-discovery" style="display:inline-block;padding:8px 20px;background:#c084fc;color:#0a0e17;font-weight:bold;font-size:13px;text-decoration:none;border-radius:6px;">
                                                קרא את המאמר המלא ←
                                            </a>
                                        </td>
                                    </tr>
                                </table>
                            </div>

                            <!-- CTA Button: Go to Dashboard -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0;">
                                <tr>
                                    <td align="center">
                                        <a href="${siteUrl}/dashboard" style="display:inline-block;padding:16px 42px;background:linear-gradient(135deg, #2dd4bf 0%, #0d9488 100%);color:#0a0e17;font-weight:bold;font-size:16px;text-decoration:none;border-radius:9999px;box-shadow:0 4px 20px rgba(45,212,191,0.35);">
                                            ⚡ כניסה לאזור האישי ולכל התכנים ←
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <!-- WhatsApp Community Reminder -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:rgba(37,211,102,0.06);border-radius:12px;border:1px solid rgba(37,211,102,0.22);margin-bottom:24px;">
                                <tr>
                                    <td style="padding:18px;text-align:center;">
                                        <p style="margin:0 0 6px;font-size:14px;font-weight:bold;color:#25d366;">💬 קהילת הוואטסאפ הסגורה שלנו</p>
                                        <p style="margin:0 0 12px;font-size:13px;color:#cbd5e1;">עדכונים שוטפים, פרומפטים שבועיים ודיונים מקצועיים שקטים:</p>
                                        <a href="https://chat.whatsapp.com/F1Y1Q35QIZ3L6rcrXuEnNN" style="display:inline-block;padding:8px 22px;background-color:#25d366;color:#ffffff;font-weight:bold;font-size:13px;text-decoration:none;border-radius:8px;">
                                            הצטרפות לקבוצת הוואטסאפ
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding:24px 40px;text-align:center;border-top:1px solid rgba(255,255,255,0.08);background-color:#0d111a;">
                            <p style="margin:0 0 6px;font-size:13px;color:#94a3b8;">
                                שאלות או רעיונות? אפשר להשיב ישירות למייל זה או לכתוב לי ב-<a href="https://wa.me/972505500344" style="color:#2dd4bf;text-decoration:none;font-weight:bold;">WhatsApp: 050-5500344</a>
                            </p>
                            <p style="margin:10px 0 2px;font-size:14px;color:#e2e8f0;font-weight:bold;">
                                רונן עמוס, CPA
                            </p>
                            <p style="margin:0;font-size:12px;color:#64748b;">
                                AI Finance Transformation — <a href="${siteUrl}" style="color:#64748b;text-decoration:none;">ronenamoscpa.co.il</a>
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
