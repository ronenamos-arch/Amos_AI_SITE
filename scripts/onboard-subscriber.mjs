import path from "path";
import fs from "fs";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

// Load env FIRST
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    for (const line of envContent.split("\n")) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const eqIdx = trimmed.indexOf("=");
        if (eqIdx !== -1) {
            const key = trimmed.slice(0, eqIdx).trim();
            let val = trimmed.slice(eqIdx + 1).trim();
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
                val = val.slice(1, -1);
            }
            process.env[key] = val;
        }
    }
}

const SUBSCRIBER_EMAIL = "weizer78@gmail.com";
const AMOUNT = 100;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ronenamoscpa.co.il";
const EMAIL_FROM = process.env.RESEND_FROM_EMAIL || "AI Finance <noreply@amosbudget.com>";
const ORDER_ID = "Smartbee-" + Date.now().toString().slice(-6);

function buildPurchaseEmail({ planName, amount, orderId, siteUrl, loginUrl }) {
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

async function main() {
    console.log("=================================================");
    console.log(`Processing onboarding flow for: ${SUBSCRIBER_EMAIL}`);
    console.log(`Sender: ${EMAIL_FROM}`);
    console.log("=================================================");

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
        throw new Error("Missing Supabase credentials in .env.local");
    }

    const adminSupabase = createClient(supabaseUrl, serviceRoleKey);
    const resend = new Resend(resendApiKey);

    // 1. Check or Create Auth User
    console.log("\n[1/6] Checking Supabase Auth user...");
    const { data: usersData, error: listErr } = await adminSupabase.auth.admin.listUsers();
    if (listErr) {
        console.error("Error listing users:", listErr);
        throw listErr;
    }

    let user = usersData.users.find((u) => u.email?.toLowerCase() === SUBSCRIBER_EMAIL.toLowerCase());
    let userId;

    if (user) {
        userId = user.id;
        console.log(`Found existing auth user: ${userId}`);
    } else {
        const tempPassword = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const { data: newUser, error: createErr } = await adminSupabase.auth.admin.createUser({
            email: SUBSCRIBER_EMAIL,
            password: tempPassword,
            email_confirm: true,
        });

        if (createErr || !newUser.user) {
            console.error("Error creating auth user:", createErr);
            throw createErr;
        }

        userId = newUser.user.id;
        console.log(`Created new auth user: ${userId}`);
    }

    // 2. Update / Upsert Profile
    console.log("\n[2/6] Updating profile in Supabase...");
    const now = new Date();
    const endDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();

    const profileData = {
        id: userId,
        email: SUBSCRIBER_EMAIL,
        subscription_status: "monthly",
        subscription_end_date: endDate,
        updated_at: now.toISOString(),
    };

    const { error: profileErr } = await adminSupabase.from("profiles").upsert(profileData);
    if (profileErr) {
        console.error("Error upserting profile:", profileErr);
        throw profileErr;
    }
    console.log(`Profile updated: status=monthly, end_date=${endDate}`);

    // 3. Record Payment
    console.log("\n[3/6] Checking / Recording payment record...");
    const { data: existingPayment } = await adminSupabase
        .from("payment_records")
        .select("id")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

    if (existingPayment) {
        console.log(`Payment record already exists for user: ${existingPayment.id}`);
    } else {
        const { data: newPay, error: payErr } = await adminSupabase
            .from("payment_records")
            .insert({
                user_id: userId,
                amount: AMOUNT,
                currency: "ILS",
                paypal_order_id: ORDER_ID,
                status: "COMPLETED",
                created_at: now.toISOString(),
            })
            .select("id")
            .single();

        if (payErr) {
            console.warn("Payment insert warning:", payErr.message);
        } else {
            console.log(`Payment record created: ${newPay?.id} (${ORDER_ID})`);
        }
    }

    // 4. Newsletter Subscribers & Resend Audience Sync
    console.log("\n[4/6] Ensuring active status in newsletter_subscribers & Resend audience...");
    const { error: subErr } = await adminSupabase.from("newsletter_subscribers").upsert(
        {
            email: SUBSCRIBER_EMAIL,
            source: "smartbee-subscription",
            status: "active",
            subscribed_at: now.toISOString(),
        },
        { onConflict: "email" }
    );
    if (subErr) {
        console.warn("Newsletter subscribers upsert warning:", subErr.message);
    } else {
        console.log("Added/updated in newsletter_subscribers table");
    }

    const audienceId = process.env.RESEND_AUDIENCE_ID;
    if (audienceId) {
        try {
            await resend.contacts.create({
                audienceId,
                email: SUBSCRIBER_EMAIL,
                unsubscribed: false,
            });
            console.log("Synced contact to Resend Audience");
        } catch (resendContactErr) {
            console.warn("Resend contact sync warning:", resendContactErr?.message || resendContactErr);
        }
    }

    // 5. Generate Magic Login Link
    console.log("\n[5/6] Generating magic login link...");
    let loginUrl = null;
    try {
        const { data: linkData, error: linkErr } = await adminSupabase.auth.admin.generateLink({
            type: "magiclink",
            email: SUBSCRIBER_EMAIL,
        });

        if (!linkErr && linkData?.properties?.hashed_token) {
            loginUrl = `${SITE_URL}/auth/confirm?token_hash=${linkData.properties.hashed_token}&type=magiclink&next=%2Fdashboard`;
            console.log(`Generated 1-click magic link: ${loginUrl}`);
        } else {
            console.warn("Could not generate token link:", linkErr?.message);
        }
    } catch (linkEx) {
        console.warn("Exception generating magic link:", linkEx);
    }

    // 6. Send Welcome & Purchase Email via Resend
    console.log("\n[6/6] Sending Welcome Purchase Email via Resend...");
    const emailHtml = buildPurchaseEmail({
        planName: "מנוי חודשי גמיש",
        amount: AMOUNT,
        orderId: ORDER_ID,
        siteUrl: SITE_URL,
        loginUrl,
    });

    const sendRes = await resend.emails.send({
        from: EMAIL_FROM,
        to: SUBSCRIBER_EMAIL,
        subject: "ברוכים הבאים — המנוי שלכם פעיל | AI Finance",
        html: emailHtml,
    });

    if (sendRes.error) {
        console.error("❌ Resend email send error:", sendRes.error);
    } else {
        console.log(`✅ Welcome purchase email successfully sent to ${SUBSCRIBER_EMAIL} (Resend ID: ${sendRes.data?.id})`);
    }

    // Admin Notification
    try {
        await resend.emails.send({
            from: EMAIL_FROM,
            to: "ronenamos@gmail.com",
            subject: "[Admin Alert] New Monthly Subscriber (Smartbee)",
            html: `<div dir="rtl" style="font-family:sans-serif;padding:20px;">
                <h2>מנוי חודשי חדש הופעל ידנית / Smartbee 🎉</h2>
                <p><strong>אימייל:</strong> ${SUBSCRIBER_EMAIL}</p>
                <p><strong>סכום:</strong> ₪${AMOUNT}</p>
                <p><strong>מזהה:</strong> ${ORDER_ID}</p>
                <p><strong>תוקף מנוי:</strong> ${endDate}</p>
            </div>`,
        });
        console.log("✅ Admin notification sent to ronenamos@gmail.com");
    } catch (adminErr) {
        console.warn("Admin notification warning:", adminErr);
    }

    console.log("\n=================================================");
    console.log("🎉 Full subscriber onboarding completed successfully!");
    console.log("=================================================");
}

main().catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
});
