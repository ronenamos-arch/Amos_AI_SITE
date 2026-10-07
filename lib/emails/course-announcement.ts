export interface CourseAnnouncementEmailParams {
  name?: string;
  courseTitle: string;
  courseSubtitle: string;
  courseSlug: string;
  courseDuration: string;
  lessonsCount: number;
  highlightText: string;
  guides?: {
    title: string;
    description: string;
    slug: string;
    category?: string;
  }[];
  siteUrl?: string;
  unsubscribeUrl?: string;
}

export function buildCourseAnnouncementEmail({
  name = "חבר/ת מנוי Pro",
  courseTitle,
  courseSubtitle,
  courseSlug,
  courseDuration,
  lessonsCount = 8,
  highlightText,
  guides = [],
  siteUrl = "https://www.ronenamoscpa.co.il",
  unsubscribeUrl = "#",
}: CourseAnnouncementEmailParams): string {
  const coursePlayerUrl = `${siteUrl}/courses/${courseSlug}/learn`;

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
                            <div style="display:inline-block;padding:5px 16px;background:rgba(45,212,191,0.15);border:1px solid rgba(45,212,191,0.35);border-radius:9999px;color:#2dd4bf;font-size:13px;font-weight:bold;margin-bottom:12px;">
                                🎓 קורס חדש פתוח עבורך ב-Pro
                            </div>
                            <h1 style="margin:0;font-size:26px;color:#ffffff;font-weight:900;letter-spacing:-0.5px;">AI FINANCE TRANSFORMATION</h1>
                            <p style="margin:8px 0 0;font-size:14px;color:#94a3b8;">הדרכות פרימיום, ספריות ידע וכלים לאנשי כספים</p>
                        </td>
                    </tr>

                    <!-- Body Content -->
                    <tr>
                        <td style="padding:36px 36px 28px;">
                            <h2 style="margin:0 0 16px;font-size:20px;color:#ffffff;font-weight:bold;">היי ${name},</h2>
                            <p style="margin:0 0 20px;font-size:15px;line-height:1.8;color:#cbd5e1;">
                                רציתי לעדכן אותך שהקורס <strong>"${courseTitle}"</strong> הוטמע כעת במלואו באתר, והגישה אליו <strong>פתוחה עבורך ללא כל עלות נוספת</strong> כחלק ממנוי ה-Pro שלך.
                            </p>

                            <!-- Course Featured Box -->
                            <div style="margin:24px 0 32px;background:linear-gradient(135deg, rgba(45,212,191,0.08) 0%, rgba(59,130,246,0.05) 100%);border-radius:16px;border:1px solid rgba(45,212,191,0.3);padding:24px;text-align:right;">
                                <div style="display:inline-block;padding:3px 10px;background:#2dd4bf;color:#0a0e17;border-radius:6px;font-size:11px;font-weight:bold;margin-bottom:10px;">
                                    ${lessonsCount} שיעורים מעשיים • ${courseDuration}
                                </div>
                                <h3 style="margin:0 0 8px;font-size:22px;color:#ffffff;font-weight:bold;">${courseTitle}</h3>
                                <p style="margin:0 0 16px;font-size:14px;color:#94a3b8;line-height:1.6;">${courseSubtitle}</p>
                                
                                <p style="margin:0 0 20px;font-size:14px;color:#e2e8f0;line-height:1.7;">
                                    ${highlightText}
                                </p>

                                <div style="text-align:center;">
                                    <a href="${coursePlayerUrl}" style="display:inline-block;padding:14px 32px;background:linear-gradient(90deg, #2dd4bf 0%, #38bdf8 100%);color:#0a0e17;font-weight:bold;font-size:16px;text-decoration:none;border-radius:12px;box-shadow:0 4px 14px rgba(45,212,191,0.3);">
                                        🚀 כניסה ישירה לנגן הקורס באתר
                                    </a>
                                </div>
                            </div>

                            ${guides.length > 0 ? `
                            <!-- Recommended Guides Section -->
                            <div style="margin-bottom:28px;">
                                <h3 style="margin:0 0 16px;font-size:17px;color:#2dd4bf;font-weight:bold;">📚 2 מדריכים מומלצים שנבחרו במיוחד להדרכה זו:</h3>
                                
                                ${guides.map(g => `
                                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.03);border-radius:12px;border:1px solid rgba(255,255,255,0.06);margin-bottom:12px;">
                                    <tr>
                                        <td style="padding:16px 20px;">
                                            <p style="margin:0 0 4px;font-size:15px;font-weight:bold;color:#ffffff;">📖 ${g.title}</p>
                                            <p style="margin:0 0 10px;font-size:13px;color:#94a3b8;line-height:1.6;">${g.description}</p>
                                            <a href="${siteUrl}/guides/${g.slug}" style="color:#2dd4bf;font-size:13px;font-weight:bold;text-decoration:none;">
                                                לפתיחת המדריך המלא ←
                                            </a>
                                        </td>
                                    </tr>
                                </table>
                                `).join("")}
                            </div>
                            ` : ""}

                            <p style="margin:24px 0 0;font-size:14px;color:#94a3b8;line-height:1.7;">
                                יש לך שאלות או בקשות להדרכות נוספות? אני זמין תמיד במייל חוזר או ב-WhatsApp.
                            </p>
                            
                            <p style="margin:16px 0 0;font-size:14px;color:#ffffff;font-weight:bold;">
                                בהצלחה בלמידה,<br>
                                רונן עמוס, רו"ח
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td dir="rtl" style="padding:24px 40px;text-align:center;border-top:1px solid rgba(255,255,255,0.06);direction:rtl;">
                            <p style="margin:0;font-size:12px;color:#6b7280;">
                                קיבלת מייל זה מכיוון שאתה רשום ל-AI Finance Pro באתר <a href="${siteUrl}" style="color:#2dd4bf;text-decoration:none;">ronenamoscpa.co.il</a>
                            </p>
                            <p style="margin:8px 0 0;font-size:11px;">
                                <a href="${unsubscribeUrl}" style="color:#6b7280;text-decoration:underline;">הסרה מרשימת התפוצה</a>
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
