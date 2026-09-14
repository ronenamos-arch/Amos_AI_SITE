import { createClient } from "@/lib/supabase/server";

export function checkProfileAccess(profile: { subscription_status?: string | null; subscription_end_date?: string | null } | null): boolean {
    if (!profile) return false;
    const status = profile.subscription_status || "free";
    const now = new Date();
    const endDate = profile.subscription_end_date ? new Date(profile.subscription_end_date) : null;

    if (status === "lifetime") return true;

    // Monthly: if an explicit end date exists, it must not be in the past
    if (status === "monthly") {
        return endDate === null || endDate > now;
    }

    // Cancelled: retains access until subscription_end_date (grace period)
    if (status === "cancelled") {
        return endDate !== null && endDate > now;
    }

    return false;
}

export async function getSubscriptionAccess() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    let profile: { subscription_status?: string | null; subscription_end_date?: string | null } | null = null;

    if (user) {
        const { data } = await supabase
            .from("profiles")
            .select("subscription_status, subscription_end_date")
            .eq("id", user.id)
            .single();

        if (data) {
            profile = data;
        }
    }

    const hasAccess = checkProfileAccess(profile);
    return { user, hasAccess };
}
