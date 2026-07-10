import { createClient } from "@/lib/supabase/server";

export async function getSubscriptionAccess() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    let subscriptionStatus = "free";
    let subscriptionEndDate: string | null = null;

    if (user) {
        const { data: profile } = await supabase
            .from("profiles")
            .select("subscription_status, subscription_end_date")
            .eq("id", user.id)
            .single();

        if (profile) {
            subscriptionStatus = profile.subscription_status;
            subscriptionEndDate = profile.subscription_end_date ?? null;
        }
    }

    const now = new Date();
    const endDate = subscriptionEndDate ? new Date(subscriptionEndDate) : null;
    const hasAccess =
        subscriptionStatus === "monthly" ||
        subscriptionStatus === "lifetime" ||
        (subscriptionStatus === "cancelled" && endDate !== null && endDate > now);

    return { user, hasAccess };
}
