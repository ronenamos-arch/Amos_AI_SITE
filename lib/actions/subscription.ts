"use server";

import { createClient } from "@/lib/supabase/server";

export async function updateUserSubscription(status: 'monthly' | 'lifetime', orderId: string, amount: number) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User must be logged in to update subscription");
    }

    // 1. Record the payment
    const { error: paymentError } = await supabase
        .from('payment_records')
        .insert({
            user_id: user.id,
            amount: amount,
            paypal_order_id: orderId,
            status: 'COMPLETED'
        });

    if (paymentError) {
        console.error("Error recording payment:", paymentError);
        // We continue anyway to try and update the profile, but this should be logged
    }

    // 2. Update the profile status (upsert handles missing profile rows)
    const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
            id: user.id,
            email: user.email,
            subscription_status: status,
            updated_at: new Date().toISOString()
        });

    if (profileError) {
        throw new Error("Failed to update user profile");
    }

    return { success: true };
}
