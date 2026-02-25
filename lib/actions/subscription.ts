"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function updateUserSubscription(status: 'monthly' | 'lifetime', orderId: string, amount: number) {
    // Auth check — uses session cookies to verify identity
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User must be logged in to update subscription");
    }

    // DB writes — uses service role key, bypasses RLS
    const adminSupabase = createAdminClient();

    // 1. Record the payment
    const { error: paymentError } = await adminSupabase
        .from('payment_records')
        .insert({
            user_id: user.id,
            amount: amount,
            paypal_order_id: orderId,
            status: 'COMPLETED'
        });

    if (paymentError) {
        console.error("Error recording payment:", paymentError);
    }

    // 2. Activate subscription
    const { error: profileError } = await adminSupabase
        .from('profiles')
        .update({
            subscription_status: status,
            updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

    if (profileError) {
        throw new Error(`Profile update failed: ${profileError.message}`);
    }

    return { success: true };
}
