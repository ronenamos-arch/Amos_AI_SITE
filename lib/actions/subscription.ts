"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendPurchaseEmail as sendPurchaseConfirmationEmail } from "@/lib/mailer";

const PLAN_LABELS: Record<string, string> = {
    monthly: "Monthly Flexible — ₪10/חודש",
    lifetime: "Lifetime PRO — תשלום חד-פעמי",
};

export async function updateUserSubscription(status: 'monthly' | 'lifetime', orderId: string, amount: number) {
    // Auth check — uses session cookies to verify identity
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User must be logged in to update subscription");
    }

    // DB writes — uses service role key, bypasses RLS
    const adminSupabase = createAdminClient();

    // 1. Record the payment (non-blocking — duplicate from webhook is fine)
    try {
        const { error: paymentError } = await adminSupabase
            .from('payment_records')
            .insert({
                user_id: user.id,
                amount: amount,
                paypal_order_id: orderId,
                status: 'COMPLETED'
            });

        if (paymentError) {
            console.error("payment_records insert failed (likely duplicate from webhook):", paymentError);
        }
    } catch (e) {
        console.error("payment_records insert threw (likely duplicate from webhook):", e);
    }

    // 2. Activate subscription (always runs regardless of payment_records result)
    const { error: profileError } = await adminSupabase
        .from('profiles')
        .upsert({
            id: user.id,
            subscription_status: status,
            updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

    if (profileError) {
        console.error("Profile upsert error:", JSON.stringify(profileError));
        throw new Error(`Profile update failed: ${profileError.message}`);
    }

    // 3. Send confirmation email (non-blocking — don't fail the purchase if email fails)
    if (user.email) {
        sendPurchaseConfirmationEmail({
            to: user.email,
            planName: PLAN_LABELS[status] || status,
            amount,
            orderId,
        }).catch((err) => console.error("Email send failed (non-blocking):", err));
    }

    return { success: true };
}
