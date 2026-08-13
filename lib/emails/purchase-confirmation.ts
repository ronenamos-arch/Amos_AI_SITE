interface PurchaseEmailParams {
  planName: string;
  amount: number;
  orderId: string;
  siteUrl: string;
  /** One-click login link minted by the PayPal webhook. */
  loginUrl?: string | null;
}

export function buildPurchaseConfirmationEmail({ planName, amount, orderId, siteUrl, loginUrl }: PurchaseEmailParams): string {
  // Subscribers created by the webhook never chose a password, so the primary
  // CTA has to be the one-click link. Fall back to /login (which now offers a
  // magic link) if the link could not be generated.
  const primaryHref = loginUrl || `${siteUrl}/login`;
  const primaryLabel = loginUrl ? "כניסה לספרייה →" : "כניסה לאזור האישי →";

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
                            <h1 style="margin:0;font-size:28px;color:#2dd4bf;font-weight:bold;letter-spacing:1px;">AI FINANCE</h1>
                            <p style="margin:8px 0 0;font-size:14px;color:#9ca3af;">המרכז הישראלי ל-AI בכספים</p>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding:40px;">
                            <h2 style="margin:0 0 16px;font-size:22px;color:#ffffff;font-weight:bold;">המנוי שלכם פעיל 🎉</h2>
                            <p style="margin:0 0 28px;font-size:16px;line-height:1.8;color:#d1d5db;">
                                תודה שהצטרפתם. מרגע זה כל התוכן המקצועי באתר פתוח בפניכם — בלי הגבלה
                                ובלי תוספת תשלום. הכפתור למטה מכניס אתכם ישירות, בלי סיסמה.
                            </p>

                            <!-- Primary CTA -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                                <tr>
                                    <td align="center">
                                        <a href="${primaryHref}" style="display:inline-block;padding:16px 40px;background-color:#2dd4bf;color:#0a0e17;font-weight:bold;font-size:16px;text-decoration:none;border-radius:9999px;">
                                            ${primaryLabel}
                                        </a>
                                    </td>
                                </tr>
                                ${loginUrl ? `
                                <tr>
                                    <td align="center" style="padding-top:12px;">
                                        <p style="margin:0;font-size:12px;color:#6b7280;">הקישור אישי, חד-פעמי ותקף לזמן מוגבל. אחר כך תוכלו להיכנס תמיד דרך עמוד ההתחברות.</p>
                                    </td>
                                </tr>` : ''}
                            </table>

                            <!-- What the subscription unlocks -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:rgba(45,212,191,0.05);border-radius:12px;border:1px solid rgba(45,212,191,0.15);margin-bottom:28px;">
                                <tr>
                                    <td style="padding:24px;">
                                        <p style="margin:0 0 14px;font-size:15px;font-weight:bold;color:#2dd4bf;">מה נפתח לכם עכשיו</p>
                                        <p style="margin:0 0 10px;font-size:14px;color:#d1d5db;line-height:1.7;">✅ כל המדריכים המתקדמים — כולל אלה שהיו נעולים</p>
                                        <p style="margin:0 0 10px;font-size:14px;color:#d1d5db;line-height:1.7;">✅ ספריית הפרומפטים והסקילים — 100+ פרומפטים מוכנים לעבודה פיננסית</p>
                                        <p style="margin:0 0 10px;font-size:14px;color:#d1d5db;line-height:1.7;">✅ כל הוובינרים המוקלטים, בכל זמן</p>
                                        <p style="margin:0 0 10px;font-size:14px;color:#d1d5db;line-height:1.7;">✅ חוברות Excel ותבניות להורדה</p>
                                        <p style="margin:0;font-size:14px;color:#d1d5db;line-height:1.7;">✅ תוכן חדש שנכנס לספרייה — כלול במנוי, בלי תשלום נוסף</p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Suggested starting point -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:rgba(255,255,255,0.03);border-radius:12px;border:1px solid rgba(255,255,255,0.06);margin-bottom:28px;">
                                <tr>
                                    <td style="padding:24px;">
                                        <p style="margin:0 0 6px;font-size:15px;font-weight:bold;color:#ffffff;">💡 לא בטוחים מאיפה להתחיל?</p>
                                        <p style="margin:0 0 16px;font-size:14px;color:#9ca3af;line-height:1.6;">
                                            רוב המנויים מתחילים מספריית הפרומפטים — משם רואים תוצאה כבר בעבודה של אותו יום.
                                        </p>
                                        <a href="${siteUrl}/skill-vault" style="display:inline-block;padding:12px 24px;background-color:rgba(45,212,191,0.08);border:1px solid rgba(45,212,191,0.25);border-radius:10px;text-decoration:none;color:#2dd4bf;font-size:14px;font-weight:bold;">
                                            לספריית הפרומפטים
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <!-- Order Details Summary -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:rgba(255,255,255,0.02);border-radius:12px;border:1px solid rgba(255,255,255,0.06);margin-bottom:8px;">
                                <tr>
                                    <td style="padding:20px;">
                                        <p style="margin:0 0 12px;font-size:13px;font-weight:bold;color:#9ca3af;">פרטי הרכישה:</p>
                                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td style="padding:6px 0;font-size:14px;color:#9ca3af;">מנוי:</td>
                                                <td style="padding:6px 0;font-size:14px;color:#ffffff;text-align:left;"><bdi>${planName}</bdi></td>
                                            </tr>
                                            <tr>
                                                <td style="padding:6px 0;font-size:14px;color:#9ca3af;">סכום:</td>
                                                <td style="padding:6px 0;font-size:14px;color:#ffffff;text-align:left;"><bdi>₪${amount}</bdi></td>
                                            </tr>
                                            <tr>
                                                <td style="padding:6px 0;font-size:14px;color:#9ca3af;">מזהה הזמנה:</td>
                                                <td style="padding:6px 0;font-size:12px;color:#ffffff;text-align:left;font-family:monospace;"><bdi>${orderId}</bdi></td>
                                            </tr>
                                        </table>
                                        <p style="margin:14px 0 0;font-size:12px;color:#6b7280;line-height:1.6;">
                                            החיוב מתחדש אוטומטית מדי חודש. אפשר לבטל בכל עת ישירות מחשבון ה-PayPal שלכם,
                                            והגישה נשארת פתוחה עד סוף התקופה ששולמה.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding:24px 40px;text-align:center;border-top:1px solid rgba(255,255,255,0.06);">
                            <p style="margin:0 0 6px;font-size:12px;color:#6b7280;">
                                שאלה? אפשר להשיב למייל הזה או לכתוב ב-<a href="https://wa.me/972505500344" style="color:#2dd4bf;text-decoration:none;">WhatsApp</a>
                            </p>
                            <p style="margin:0;font-size:13px;color:#9ca3af;font-weight:bold;">
                                רונן עמוס, רו״ח
                            </p>
                            <p style="margin:6px 0 0;font-size:12px;color:#6b7280;">
                                המרכז הישראלי ל-AI בכספים
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
