import path from "path";
import fs from "fs";

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

async function run() {
    // Dynamic import to ensure process.env is populated before modules evaluate constants like EMAIL_FROM
    const { createAdminClient } = await import("../lib/supabase/admin");
    const { sendPurchaseEmail: sendPurchaseConfirmationEmail, sendAdminNotification } = await import("../lib/mailer");
    const { getResend, EMAIL_FROM } = await import("../lib/resend");

    const SUBSCRIBER_EMAIL = "gurwicz.olga@cloudinary.com";
    const SUBSCRIBER_NAME = "אולגה גורביץ";
    const PAYPAL_SUB_ID = "I-0Y3ASA7EWU86";
    const AMOUNT = 100;
    const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ronenamoscpa.co.il";

    console.log("=================================================");
    console.log(`Processing full subscriber flow for: ${SUBSCRIBER_NAME} <${SUBSCRIBER_EMAIL}>`);
    console.log(`PayPal Subscription ID: ${PAYPAL_SUB_ID}`);
    console.log(`Using Sender: ${EMAIL_FROM}`);
    console.log("=================================================");

    const adminSupabase = createAdminClient();

    // 1. Check or Create Auth User
    console.log("\n[1/6] Checking Supabase Auth user...");
    const { data: usersData, error: listErr } = await adminSupabase.auth.admin.listUsers();
    if (listErr) {
        console.error("Error listing users:", listErr);
        throw listErr;
    }

    let user = usersData.users.find((u) => u.email?.toLowerCase() === SUBSCRIBER_EMAIL.toLowerCase());
    let userId: string;

    if (user) {
        userId = user.id;
        console.log(`Found existing auth user: ${userId}`);
    } else {
        const tempPassword = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const { data: newUser, error: createErr } = await adminSupabase.auth.admin.createUser({
            email: SUBSCRIBER_EMAIL,
            password: tempPassword,
            email_confirm: true,
            user_metadata: {
                full_name: SUBSCRIBER_NAME,
            },
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

    const profileData: any = {
        id: userId,
        email: SUBSCRIBER_EMAIL,
        subscription_status: "monthly",
        paypal_subscription_id: PAYPAL_SUB_ID,
        subscription_end_date: endDate,
        updated_at: now.toISOString(),
    };

    const { error: profileErr } = await adminSupabase.from("profiles").upsert(profileData);
    if (profileErr) {
        console.error("Error upserting profile:", profileErr);
        throw profileErr;
    }
    console.log(`Profile updated: status=monthly, end_date=${endDate}, paypal_sub_id=${PAYPAL_SUB_ID}`);

    // 3. Record Payment
    console.log("\n[3/6] Checking / Recording payment record...");
    const { data: existingPayment } = await adminSupabase
        .from("payment_records")
        .select("id")
        .eq("paypal_order_id", PAYPAL_SUB_ID)
        .maybeSingle();

    if (existingPayment) {
        console.log(`Payment record already exists: ${existingPayment.id}`);
    } else {
        const { data: newPay, error: payErr } = await adminSupabase
            .from("payment_records")
            .insert({
                user_id: userId,
                amount: AMOUNT,
                currency: "ILS",
                paypal_order_id: PAYPAL_SUB_ID,
                status: "COMPLETED",
                created_at: now.toISOString(),
            })
            .select("id")
            .single();

        if (payErr) {
            console.warn("Payment insert error (non-fatal):", payErr.message);
        } else {
            console.log(`Payment record created: ${newPay?.id}`);
        }
    }

    // 4. Newsletter Subscribers & Resend Audience Sync
    console.log("\n[4/6] Ensuring active status in newsletter_subscribers & Resend audience...");
    const { error: subErr } = await adminSupabase.from("newsletter_subscribers").upsert(
        {
            email: SUBSCRIBER_EMAIL,
            source: "subscription",
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
            const resend = getResend();
            await resend.contacts.create({
                audienceId,
                email: SUBSCRIBER_EMAIL,
                firstName: SUBSCRIBER_NAME.split(" ")[0] || "אולגה",
                lastName: SUBSCRIBER_NAME.split(" ").slice(1).join(" ") || "גורביץ",
                unsubscribed: false,
            });
            console.log("Synced contact to Resend Audience");
        } catch (resendContactErr: any) {
            console.warn("Resend contact sync warning:", resendContactErr?.message || resendContactErr);
        }
    }

    // 5. Generate Magic Login Link
    console.log("\n[5/6] Generating magic login link...");
    let loginUrl: string | null = null;
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

    // 6. Send Purchase Confirmation Email & Admin Notification
    console.log("\n[6/6] Sending Purchase Confirmation & Admin Notification emails...");
    const emailResult = await sendPurchaseConfirmationEmail({
        to: SUBSCRIBER_EMAIL,
        planName: "מנוי חודשי גמיש",
        amount: AMOUNT,
        orderId: PAYPAL_SUB_ID,
        loginUrl,
    });

    if (emailResult.success) {
        console.log(`✅ Purchase confirmation email successfully sent to ${SUBSCRIBER_EMAIL} (Email ID: ${emailResult.id})`);
    } else {
        console.error(`❌ Failed to send confirmation email:`, emailResult.error);
    }

    await sendAdminNotification({
        eventType: "New Monthly Subscriber",
        userEmail: SUBSCRIBER_EMAIL,
        details: `Name: ${SUBSCRIBER_NAME}\nEmail: ${SUBSCRIBER_EMAIL}\nSubscription ID: ${PAYPAL_SUB_ID}\nPlan: Monthly - AI FINANCE Premium (₪${AMOUNT}/mo)\nAccess until: ${endDate}`,
    });
    console.log(`✅ Admin notification alert sent to ronenamos@gmail.com`);

    console.log("\n=================================================");
    console.log("🎉 Full subscriber flow completed successfully!");
    console.log("=================================================");
}

run().catch((err) => {
    console.error("Fatal error during processing:", err);
    process.exit(1);
});
