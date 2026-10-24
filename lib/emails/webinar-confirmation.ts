/**
 * HTML email template for Webinar registration confirmation.
 * Styled consistently with existing email templates (dark theme, cyan/teal accents).
 */

interface WebinarConfirmationEmailParams {
    name: string;
    siteUrl: string;
}

export function buildWebinarConfirmationEmail({
    name,
    siteUrl,
}: WebinarConfirmationEmailParams): string {
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
        "Claude בתוך האקסל: 3 משימות FP&A בלייב | רונן עמוס"
    )}&dates=20261029T180000Z/20261029T190000Z&details=${encodeURIComponent(
        "וובינר מעשי לאנשי כספים: Budget vs Actuals, Revenue Forecast ו-Scenario Analysis עם Claude בתוך Excel, ובונוס Skill לדוחות Pivot.\nקישור ההצטרפות יישלח במייל."
    )}&location=${encodeURIComponent("Zoom (פרטי הצטרפות נשלחו במייל)")}`;

    return `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#071636;font-family:Arial,Helvetica,sans-serif;color:#e0e0e0;direction:rtl;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#071636;padding:40px 20px;">
        <tr>
            <td align="center">
                <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background-color:#0f2147;border-radius:18px;border:1px solid #2c4f8f;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.4);">

                    <!-- Header -->
                    <tr>
                        <td style="padding:32px 40px 24px;text-align:center;border-bottom:1px solid rgba(79,209,197,0.25);background:linear-gradient(180deg,#0d2554 0%,#0f2147 100%);">
                            <h1 style="margin:0;font-size:24px;color:#4fd1c5;font-weight:900;letter-spacing:2px;">AI FINANCE TRANSFORMATION</h1>
                            <p style="margin:8px 0 0;font-size:14px;color:#9fb0cc;">אישור הרשמה לוובינר מעשי</p>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding:36px 40px;">
                            <h2 style="margin:0 0 16px;font-size:22px;color:#ffffff;font-weight:bold;">שלום ${name}, מקומך שוריין! 🎉</h2>
                            <p style="margin:0 0 24px;font-size:16px;line-height:1.8;color:#c7d3e8;">
                                תודה על הרשמתך לוובינר <strong>"Claude בתוך האקסל: 3 משימות FP&amp;A בלייב"</strong>.
                                התשלום נקלט בהצלחה ופרטי ההרשמה שמורים במערכת.
                            </p>

                            <!-- Webinar Details Box -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#071636;border-radius:14px;border:1px solid #3b6cc0;margin-bottom:28px;">
                                <tr>
                                    <td style="padding:22px 24px;">
                                        <div style="font-size:13px;color:#4a9cf0;font-weight:bold;margin-bottom:6px;">מועד הוובינר</div>
                                        <div style="font-size:17px;color:#ffffff;font-weight:bold;margin-bottom:12px;">📅 יום חמישי, 29 באוקטובר 2026</div>
                                        <div style="font-size:15px;color:#e3e8f2;margin-bottom:6px;">⏰ שעה: <strong>20:00 (שעון ישראל)</strong> · משך: 60 דקות</div>
                                        <div style="font-size:15px;color:#e3e8f2;margin-bottom:6px;">💻 מיקום: <strong>Zoom (מקוון)</strong></div>
                                        <div style="font-size:13px;color:#9fb0cc;margin-top:10px;line-height:1.6;">
                                            * קישור ה-Zoom המדויק יישלח אליך למייל זה יום לפני האירוע ושוב כשעה לפני תחילת המפגש.
                                        </div>
                                    </td>
                                </tr>
                            </table>

                            <!-- Add to Calendar CTA -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                                <tr>
                                    <td align="center">
                                        <a href="${googleCalendarUrl}" target="_blank" style="display:inline-block;padding:14px 36px;background-color:#4fd1c5;color:#06142e;font-weight:900;font-size:16px;text-decoration:none;border-radius:9999px;box-shadow:0 0 25px rgba(79,209,197,0.4);">
                                            שריינו ביומן Google Calendar →
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <!-- What we'll cover -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:rgba(79,209,197,0.06);border-radius:12px;border:1px solid rgba(79,209,197,0.2);margin-bottom:28px;">
                                <tr>
                                    <td style="padding:20px 24px;">
                                        <p style="margin:0 0 10px;font-size:15px;font-weight:bold;color:#4fd1c5;">מה מחכה לנו במפגש:</p>
                                        <p style="margin:0 0 8px;font-size:14px;color:#d1d5db;line-height:1.6;">🔹 <strong>דמו 1:</strong> ניתוח סטיות תקציב מול ביצוע (Budget vs Actuals)</p>
                                        <p style="margin:0 0 8px;font-size:14px;color:#d1d5db;line-height:1.6;">🔹 <strong>דמו 2:</strong> תחזית הכנסות ל-12 חודשים (Revenue Forecast)</p>
                                        <p style="margin:0 0 8px;font-size:14px;color:#d1d5db;line-height:1.6;">🔹 <strong>דמו 3:</strong> ניתוח תרחישים Bear / Base / Bull (Scenario Analysis)</p>
                                        <p style="margin:0 0 8px;font-size:14px;color:#d1d5db;line-height:1.6;">🔹 <strong>בונוס:</strong> Skill שהופך טבלה גולמית לדוח Pivot</p>
                                        <p style="margin:0;font-size:13px;color:#9fb0cc;line-height:1.6;">* כל הנרשמים מקבלים במייל את ההקלטה המלאה, המצגת, חוברת התרגילים וה-Skill.</p>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin:0 0 8px;font-size:15px;color:#c7d3e8;line-height:1.7;">
                                נתראה בוובינר!
                            </p>
                            <p style="margin:0;font-size:15px;font-weight:bold;color:#ffffff;">
                                רונן עמוס, רו"ח (CPA)<br>
                                <span style="font-size:13px;font-weight:normal;color:#9fb0cc;">AI Finance Transformation</span>
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding:20px 40px;text-align:center;border-top:1px solid #162a55;background-color:#071636;">
                            <p style="margin:0;font-size:12px;color:#6b7280;">
                                הודעה זו נשלחה בעקבות רכישת כרטיס לוובינר באתר <a href="${siteUrl}" style="color:#4fd1c5;text-decoration:none;">ronenamoscpa.co.il</a>.
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
