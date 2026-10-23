/**
 * HTML email template for bundle purchase confirmation.
 * Full 5 chapters with individual links, descriptions, materials, and WhatsApp community.
 */

interface BundlePurchaseEmailParams {
    name: string;
    accessUrl: string;
}

export function buildBundlePurchaseEmail({ name, accessUrl }: BundlePurchaseEmailParams): string {
    const hubUrl = accessUrl || "https://www.ronenamoscpa.co.il/claude-bundle";
    const displayName = name || "חבר יקר";
    const token = accessUrl.includes("/access/") ? accessUrl.split("/access/")[1]?.split("?")[0] : "";
    const tokenParam = token ? `?bundle_token=${token}` : "";

    return `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Claude לכספים — 5 הוובינרים המלאים והחומרים</title>
</head>
<body style="margin:0;padding:0;background-color:#0b0d10;font-family:'Heebo',Arial,Helvetica,sans-serif;color:#fafbfc;direction:rtl;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0b0d10;padding:40px 16px;">
        <tr>
            <td align="center">
                <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;max-width:640px;background-color:#12161a;border-radius:18px;border:1px solid rgba(255,255,255,0.08);overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,0.5);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="padding:36px 40px 24px;text-align:center;background:linear-gradient(180deg, rgba(184,196,90,0.14) 0%, rgba(18,22,26,0) 100%);border-bottom:1px solid rgba(184,196,90,0.25);">
                            <span style="display:inline-block;padding:4px 14px;border-radius:9999px;background-color:rgba(184,196,90,0.15);color:#d6e36a;font-size:12px;font-weight:bold;letter-spacing:1px;margin-bottom:12px;border:1px solid rgba(184,196,90,0.3);">
                                AI FINANCE TRANSFORMATION
                            </span>
                            <h1 style="margin:8px 0 0;font-size:26px;color:#ffffff;font-weight:800;line-height:1.3;">
                                באנדל Claude לרואי חשבון ומנהלי כספים
                            </h1>
                            <p style="margin:8px 0 0;font-size:15px;color:#c2cad2;">
                                5 הוובינרים המלאים · הקלטות, אקסלים, תבניות PPT, פרומפטים ו-Skills
                            </p>
                        </td>
                    </tr>

                    <!-- Body Intro -->
                    <tr>
                        <td style="padding:36px 40px 20px;">
                            <h2 style="margin:0 0 14px;font-size:20px;color:#ffffff;font-weight:bold;">
                                שלום ${displayName}, תודה רבה על הרכישה! 🎉
                            </h2>
                            <p style="margin:0 0 20px;font-size:15px;line-height:1.8;color:#c2cad2;">
                                הגישה המלאה לכל 5 הפרקים פתוחה עבורך לצמיתות. כל פרק כולל עמוד אינטראקטיבי ייעודי ובו <strong>הקלטת הווידאו המלאה (שעה)</strong>, <strong>פרומפטים פיננסיים להעתקה בלחיצה</strong>, ו<strong>קבצי תרגול מקוריים (Excel, PPTX, קבצי קוד ו-Skills)</strong> להורדה ישירה.
                            </p>

                            <!-- Hub Button -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0 32px;">
                                <tr>
                                    <td align="center">
                                        <a href="${hubUrl}" target="_blank" style="display:inline-block;padding:16px 36px;background-color:#b8c45a;color:#0b0d10;font-weight:bold;font-size:16px;text-decoration:none;border-radius:10px;box-shadow:0 4px 16px rgba(184,196,90,0.35);">
                                            כניסה לעמוד הבאנדל האישי שלך ←
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding-top:10px;">
                                        <span style="font-size:12px;color:#7a8694;">הקישור האישי שמור עבורך לצמיתות ללא הגבלת זמן</span>
                                    </td>
                                </tr>
                            </table>

                            <div style="border-top:1px solid rgba(255,255,255,0.08);margin:24px 0;"></div>

                            <h3 style="margin:0 0 16px;font-size:18px;color:#d6e36a;font-weight:bold;">
                                📚 גישה ישירה לכל אחד מ-5 הפרקים:
                            </h3>

                            <!-- Chapter 1 -->
                            <div style="background-color:#1a1f26;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:20px;margin-bottom:16px;">
                                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                                    <span style="font-size:12px;font-weight:bold;color:#b8c45a;background:rgba(184,196,90,0.12);padding:2px 8px;border-radius:6px;">פרק 1</span>
                                    <span style="font-size:12px;color:#7a8694;">60 דקות הדרכה</span>
                                </div>
                                <h4 style="margin:6px 0;font-size:16px;color:#ffffff;font-weight:bold;">
                                    Claude לרואי חשבון — סביבת העבודה החדשה של איש הכספים
                                </h4>
                                <p style="margin:0 0 14px;font-size:13px;color:#c2cad2;line-height:1.6;">
                                    היכרות מעמיקה עם Claude ככלי מרכזי: עבודה עם Projects, העלאת קבצים גדולים, Artifacts, תוסף כרום ושילוב ראשוני עם Excel.
                                </p>
                                <a href="https://www.ronenamoscpa.co.il/resources/webiners/claude-accountant${tokenParam}" target="_blank" style="display:inline-block;padding:9px 20px;background-color:rgba(184,196,90,0.15);color:#d6e36a;border:1px solid rgba(184,196,90,0.3);font-size:13px;font-weight:bold;text-decoration:none;border-radius:6px;">
                                    לצפייה ולהורדת חומרי פרק 1 ←
                                </a>
                            </div>

                            <!-- Chapter 2 -->
                            <div style="background-color:#1a1f26;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:20px;margin-bottom:16px;">
                                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                                    <span style="font-size:12px;font-weight:bold;color:#b8c45a;background:rgba(184,196,90,0.12);padding:2px 8px;border-radius:6px;">פרק 2</span>
                                    <span style="font-size:12px;color:#7a8694;">60 דקות הדרכה</span>
                                </div>
                                <h4 style="margin:6px 0;font-size:16px;color:#ffffff;font-weight:bold;">
                                    Claude לרואי חשבון עם Excel ו-PowerPoint — כמו שלא הכרתם
                                </h4>
                                <p style="margin:0 0 14px;font-size:13px;color:#c2cad2;line-height:1.6;">
                                    שילוב Claude עם Excel ו-PowerPoint: מעבר מ-GL גולמי לדוח דירקטוריון, ניתוח סטיות תקציב מול ביצוע והפקת תבניות שקפים מעוצבות.
                                </p>
                                <a href="https://www.ronenamoscpa.co.il/resources/webiners/Claude-excel-pp${tokenParam}" target="_blank" style="display:inline-block;padding:9px 20px;background-color:rgba(184,196,90,0.15);color:#d6e36a;border:1px solid rgba(184,196,90,0.3);font-size:13px;font-weight:bold;text-decoration:none;border-radius:6px;">
                                    לצפייה ולהורדת חומרי פרק 2 (כולל אקסל ו-PPT) ←
                                </a>
                            </div>

                            <!-- Chapter 3 -->
                            <div style="background-color:#1a1f26;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:20px;margin-bottom:16px;">
                                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                                    <span style="font-size:12px;font-weight:bold;color:#b8c45a;background:rgba(184,196,90,0.12);padding:2px 8px;border-radius:6px;">פרק 3</span>
                                    <span style="font-size:12px;color:#7a8694;">60 דקות הדרכה</span>
                                </div>
                                <h4 style="margin:6px 0;font-size:16px;color:#ffffff;font-weight:bold;">
                                    סביבת העבודה החדשה של רואי החשבון — Claude Live Artifacts
                                </h4>
                                <p style="margin:0 0 14px;font-size:13px;color:#c2cad2;line-height:1.6;">
                                    בניית דשבורדים אינטראקטיביים חיים, טבלאות ניהוליות וקוד ישירות מול העיניים בלייב, ללא צורך במתכנת או ידע מוקדם.
                                </p>
                                <a href="https://www.ronenamoscpa.co.il/resources/webiners/webinar-03-live-artifacts${tokenParam}" target="_blank" style="display:inline-block;padding:9px 20px;background-color:rgba(184,196,90,0.15);color:#d6e36a;border:1px solid rgba(184,196,90,0.3);font-size:13px;font-weight:bold;text-decoration:none;border-radius:6px;">
                                    לצפייה ולהורדת חומרי פרק 3 (Artifacts וקוד) ←
                                </a>
                            </div>

                            <!-- Chapter 4 -->
                            <div style="background-color:#1a1f26;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:20px;margin-bottom:16px;">
                                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                                    <span style="font-size:12px;font-weight:bold;color:#b8c45a;background:rgba(184,196,90,0.12);padding:2px 8px;border-radius:6px;">פרק 4</span>
                                    <span style="font-size:12px;color:#7a8694;">60 דקות הדרכה</span>
                                </div>
                                <h4 style="margin:6px 0;font-size:16px;color:#ffffff;font-weight:bold;">
                                    עבודה עם פרויקטים בקלוד — ארגן את העבודה שלך כמו מקצוען
                                </h4>
                                <p style="margin:0 0 14px;font-size:13px;color:#c2cad2;line-height:1.6;">
                                    הגדרת Projects ב-Claude: כתיבת הנחיות מערכת (System Prompts) קבועות, העלאת נהלים, תקנות וטפסים ארגוניים לזיכרון תמידי.
                                </p>
                                <a href="https://www.ronenamoscpa.co.il/resources/webiners/webinar-04-projects${tokenParam}" target="_blank" style="display:inline-block;padding:9px 20px;background-color:rgba(184,196,90,0.15);color:#d6e36a;border:1px solid rgba(184,196,90,0.3);font-size:13px;font-weight:bold;text-decoration:none;border-radius:6px;">
                                    לצפייה ולהורדת חומרי פרק 4 (הנחיות מערכת) ←
                                </a>
                            </div>

                            <!-- Chapter 5 -->
                            <div style="background-color:#1a1f26;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:20px;margin-bottom:24px;">
                                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                                    <span style="font-size:12px;font-weight:bold;color:#b8c45a;background:rgba(184,196,90,0.12);padding:2px 8px;border-radius:6px;">פרק 5</span>
                                    <span style="font-size:12px;color:#7a8694;">60 דקות הדרכה</span>
                                </div>
                                <h4 style="margin:6px 0;font-size:16px;color:#ffffff;font-weight:bold;">
                                    Claude Skills — בונים Skills שבאמת עובדים
                                </h4>
                                <p style="margin:0 0 14px;font-size:13px;color:#c2cad2;line-height:1.6;">
                                    בניית Skills מאפס ב-Claude: הפיכת משימות פיננסיות חוזרות (קריאת דוחות ספקים, התאמות, תזרים) לכלים קבועים עבורך ועבור הצוות.
                                </p>
                                <a href="https://www.ronenamoscpa.co.il/resources/webiners/webinar-05-skills${tokenParam}" target="_blank" style="display:inline-block;padding:9px 20px;background-color:rgba(184,196,90,0.15);color:#d6e36a;border:1px solid rgba(184,196,90,0.3);font-size:13px;font-weight:bold;text-decoration:none;border-radius:6px;">
                                    לצפייה ולהורדת חומרי פרק 5 (קבצי Skills מוכנים) ←
                                </a>
                            </div>

                            <!-- WhatsApp Community & Support -->
                            <div style="background:rgba(184,196,90,0.06);border:1px solid rgba(184,196,90,0.2);border-radius:12px;padding:20px;margin-bottom:20px;text-align:center;">
                                <p style="margin:0 0 10px;font-size:15px;color:#ffffff;font-weight:bold;">
                                    💬 הצטרפות לקהילת הווטסאפ של מנהלי הכספים וה-AI
                                </p>
                                <p style="margin:0 0 14px;font-size:13px;color:#c2cad2;">
                                    בואו לשאול שאלות, להתייעץ על מקרים מהשטח ולקבל עדכונים שוטפים.
                                </p>
                                <a href="https://chat.whatsapp.com/CS6dgqnK45Q9XAMqScNr6R" target="_blank" style="display:inline-block;padding:10px 24px;background-color:#25D366;color:#ffffff;font-size:13px;font-weight:bold;text-decoration:none;border-radius:8px;">
                                    הצטרפות לקבוצת ה-WhatsApp ←
                                </a>
                            </div>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding:28px 40px;text-align:center;border-top:1px solid rgba(255,255,255,0.08);background-color:#0e1116;">
                            <p style="margin:0 0 6px;font-size:14px;color:#ffffff;font-weight:bold;">
                                רונן עמוס, רו״ח
                            </p>
                            <p style="margin:0 0 12px;font-size:13px;color:#7a8694;">
                                מומחה ה-AI הפיננסי שלכם | AI Finance Transformation
                            </p>
                            <p style="margin:0;font-size:12px;color:#7a8694;line-height:1.6;">
                                מייל: <a href="mailto:ronenamos@gmail.com" style="color:#b8c45a;text-decoration:none;">ronenamos@gmail.com</a> · 
                                ווטסאפ: <a href="https://wa.me/972505500344" style="color:#b8c45a;text-decoration:none;">050-5500344</a> · 
                                אתר: <a href="https://www.ronenamoscpa.co.il" style="color:#b8c45a;text-decoration:none;">ronenamoscpa.co.il</a>
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
