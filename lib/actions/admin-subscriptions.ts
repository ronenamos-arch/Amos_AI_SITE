"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

async function verifyAdmin() {
    if (process.env.NODE_ENV === "development") {
        return true;
    }
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || user.email !== "ronenamos@gmail.com") {
        throw new Error("Unauthorized: Admin access required");
    }
    return true;
}

export type SubscriptionProfile = {
    id: string;
    email: string | null;
    subscription_status: string;
    subscription_end_date: string | null;
    paypal_subscription_id: string | null;
    created_at?: string | null;
    updated_at: string | null;
    total_spent: number;
    payments_count: number;
    in_grace_period?: boolean;
};

export type SubscriptionOverviewData = {
    mrr: number;
    arr: number;
    activeSubscribersCount: number;
    monthlySubscribersCount: number;
    lifetimeSubscribersCount: number;
    cancelledCount: number;
    paymentFailedCount: number;
    freeUsersCount: number;
    totalUsersCount: number;
    newsletterSubscribersCount: number;
    // Revenue metrics
    totalRevenueAllTime: number;
    thisMonthRevenue: number;
    lastMonthRevenue: number;
    revenueGrowthPercent: number;
    revenueBreakdown: {
        subscriptions: number;
        courses: number;
        bundles: number;
    };
    // Growth & Churn
    newSubscribersThisMonth: number;
    newSubscribersLastMonth: number;
    churnRatePercent: number;
    // At risk list
    atRiskSubscribers: SubscriptionProfile[];
};

export async function getSubscriptionOverview(): Promise<SubscriptionOverviewData> {
    await verifyAdmin();
    const admin = createAdminClient();

    const now = new Date();
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);

    const [profilesRes, paymentsRes, coursesRes, bundlesRes, newsletterRes] = await Promise.all([
        admin.from("profiles").select("*"),
        admin.from("payment_records").select("*"),
        admin.from("course_purchases").select("*").eq("status", "paid"),
        admin.from("bundle_purchases").select("*").eq("status", "paid"),
        admin.from("newsletter_subscribers").select("*", { count: "exact", head: true }).eq("status", "active"),
    ]);

    const profiles = profilesRes.data || [];
    const payments = paymentsRes.data || [];
    const courses = coursesRes.data || [];
    const bundles = bundlesRes.data || [];
    const newsletterSubscribersCount = newsletterRes.count ?? 0;

    // Map payments to user profiles
    const userPaymentsMap = new Map<string, { total: number; count: number }>();
    payments.forEach((p) => {
        if (p.user_id) {
            const current = userPaymentsMap.get(p.user_id) || { total: 0, count: 0 };
            userPaymentsMap.set(p.user_id, {
                total: current.total + (Number(p.amount) || 0),
                count: current.count + 1,
            });
        }
    });

    let monthlyCount = 0;
    let lifetimeCount = 0;
    let cancelledCount = 0;
    let paymentFailedCount = 0;
    let freeCount = 0;

    const atRiskList: SubscriptionProfile[] = [];

    profiles.forEach((profile) => {
        const status = profile.subscription_status || "free";
        const endDate = profile.subscription_end_date ? new Date(profile.subscription_end_date) : null;
        const inGrace = status === "cancelled" && endDate !== null && endDate > now;

        const paymentsInfo = userPaymentsMap.get(profile.id) || { total: 0, count: 0 };
        const mappedProfile: SubscriptionProfile = {
            ...profile,
            total_spent: paymentsInfo.total,
            payments_count: paymentsInfo.count,
            in_grace_period: inGrace,
        };

        if (status === "monthly") {
            monthlyCount++;
        } else if (status === "lifetime") {
            lifetimeCount++;
        } else if (status === "cancelled") {
            cancelledCount++;
            if (inGrace) {
                atRiskList.push(mappedProfile);
            }
        } else if (status === "payment_failed") {
            paymentFailedCount++;
            atRiskList.push(mappedProfile);
        } else {
            freeCount++;
        }
    });

    const activeSubscribersCount = monthlyCount + lifetimeCount;
    const mrr = monthlyCount * 100; // Monthly plan is ₪100/mo
    const arr = mrr * 12;

    // Revenue calculations
    const subRevenueAllTime = payments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
    const courseRevenueAllTime = courses.reduce((sum, c) => sum + (Number(c.amount) || 599), 0);
    const bundleRevenueAllTime = bundles.reduce((sum, b) => sum + 150, 0);
    const totalRevenueAllTime = subRevenueAllTime + courseRevenueAllTime + bundleRevenueAllTime;

    // This month revenue
    const thisMonthSub = payments
        .filter((p) => new Date(p.created_at) >= startOfThisMonth)
        .reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
    const thisMonthCourses = courses
        .filter((c) => new Date(c.paid_at || c.created_at) >= startOfThisMonth)
        .reduce((sum, c) => sum + (Number(c.amount) || 599), 0);
    const thisMonthBundles = bundles
        .filter((b) => new Date(b.created_at) >= startOfThisMonth)
        .reduce((sum, b) => sum + 150, 0);
    const thisMonthRevenue = thisMonthSub + thisMonthCourses + thisMonthBundles;

    // Last month revenue
    const lastMonthSub = payments
        .filter((p) => {
            const d = new Date(p.created_at);
            return d >= startOfLastMonth && d <= endOfLastMonth;
        })
        .reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
    const lastMonthCourses = courses
        .filter((c) => {
            const d = new Date(c.paid_at || c.created_at);
            return d >= startOfLastMonth && d <= endOfLastMonth;
        })
        .reduce((sum, c) => sum + (Number(c.amount) || 599), 0);
    const lastMonthBundles = bundles
        .filter((b) => {
            const d = new Date(b.created_at);
            return d >= startOfLastMonth && d <= endOfLastMonth;
        })
        .reduce((sum, b) => sum + 150, 0);
    const lastMonthRevenue = lastMonthSub + lastMonthCourses + lastMonthBundles;

    const revenueGrowthPercent = lastMonthRevenue > 0
        ? Math.round(((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100)
        : thisMonthRevenue > 0 ? 100 : 0;

    // New subscribers this month
    const newSubscribersThisMonth = profiles.filter((p) => {
        const isPaid = p.subscription_status === "monthly" || p.subscription_status === "lifetime";
        const date = new Date(p.created_at || p.updated_at);
        return isPaid && date >= startOfThisMonth;
    }).length;

    const newSubscribersLastMonth = profiles.filter((p) => {
        const isPaid = p.subscription_status === "monthly" || p.subscription_status === "lifetime";
        const date = new Date(p.created_at || p.updated_at);
        return isPaid && date >= startOfLastMonth && date <= endOfLastMonth;
    }).length;

    // Churn rate calculation
    const totalPotential = activeSubscribersCount + cancelledCount;
    const churnRatePercent = totalPotential > 0
        ? Math.round((cancelledCount / totalPotential) * 100 * 10) / 10
        : 0;

    return {
        mrr,
        arr,
        activeSubscribersCount,
        monthlySubscribersCount: monthlyCount,
        lifetimeSubscribersCount: lifetimeCount,
        cancelledCount,
        paymentFailedCount,
        freeUsersCount: freeCount,
        totalUsersCount: profiles.length,
        newsletterSubscribersCount,
        totalRevenueAllTime,
        thisMonthRevenue,
        lastMonthRevenue,
        revenueGrowthPercent,
        revenueBreakdown: {
            subscriptions: subRevenueAllTime,
            courses: courseRevenueAllTime,
            bundles: bundleRevenueAllTime,
        },
        newSubscribersThisMonth,
        newSubscribersLastMonth,
        churnRatePercent,
        atRiskSubscribers: atRiskList,
    };
}

export async function getSubscribersList(): Promise<SubscriptionProfile[]> {
    await verifyAdmin();
    const admin = createAdminClient();
    const now = new Date();

    const [profilesRes, paymentsRes] = await Promise.all([
        admin.from("profiles").select("*").order("updated_at", { ascending: false }),
        admin.from("payment_records").select("*"),
    ]);

    const profiles = profilesRes.data || [];
    const payments = paymentsRes.data || [];

    const userPaymentsMap = new Map<string, { total: number; count: number }>();
    payments.forEach((p) => {
        if (p.user_id) {
            const current = userPaymentsMap.get(p.user_id) || { total: 0, count: 0 };
            userPaymentsMap.set(p.user_id, {
                total: current.total + (Number(p.amount) || 0),
                count: current.count + 1,
            });
        }
    });

    return profiles.map((p) => {
        const paymentsInfo = userPaymentsMap.get(p.id) || { total: 0, count: 0 };
        const endDate = p.subscription_end_date ? new Date(p.subscription_end_date) : null;
        const inGrace = p.subscription_status === "cancelled" && endDate !== null && endDate > now;

        return {
            ...p,
            total_spent: paymentsInfo.total,
            payments_count: paymentsInfo.count,
            in_grace_period: inGrace,
        };
    });
}

export async function updateSubscriberStatus(
    userId: string,
    data: {
        status: string;
        subscription_end_date?: string | null;
    }
) {
    await verifyAdmin();
    const admin = createAdminClient();

    const updatePayload: Record<string, any> = {
        subscription_status: data.status,
        updated_at: new Date().toISOString(),
    };

    if (data.subscription_end_date !== undefined) {
        updatePayload.subscription_end_date = data.subscription_end_date;
    }

    const { error } = await admin
        .from("profiles")
        .update(updatePayload)
        .eq("id", userId);

    if (error) {
        throw new Error(`Failed to update subscriber: ${error.message}`);
    }

    revalidatePath("/admin/subscriptions");
    revalidatePath("/admin");
    return { success: true };
}

export async function extendSubscription(userId: string, additionalDays: number) {
    await verifyAdmin();
    const admin = createAdminClient();

    const { data: profile, error: fetchErr } = await admin
        .from("profiles")
        .select("subscription_end_date, subscription_status")
        .eq("id", userId)
        .single();

    if (fetchErr || !profile) {
        throw new Error("User profile not found");
    }

    const now = new Date();
    const currentEnd = profile.subscription_end_date ? new Date(profile.subscription_end_date) : now;
    const baseDate = currentEnd > now ? currentEnd : now;
    const newEnd = new Date(baseDate.getTime() + additionalDays * 24 * 60 * 60 * 1000);

    const { error: updateErr } = await admin
        .from("profiles")
        .update({
            subscription_status: profile.subscription_status === "lifetime" ? "lifetime" : "monthly",
            subscription_end_date: newEnd.toISOString(),
            updated_at: new Date().toISOString(),
        })
        .eq("id", userId);

    if (updateErr) {
        throw new Error(`Failed to extend subscription: ${updateErr.message}`);
    }

    revalidatePath("/admin/subscriptions");
    revalidatePath("/admin");
    return { success: true, newEndDate: newEnd.toISOString() };
}

export async function grantManualSubscription(
    email: string,
    status: "monthly" | "lifetime",
    durationDays: number = 30
) {
    await verifyAdmin();
    const admin = createAdminClient();
    const trimmedEmail = email.trim().toLowerCase();

    // Check if profile exists by email
    const { data: existingProfile } = await admin
        .from("profiles")
        .select("id")
        .eq("email", trimmedEmail)
        .maybeSingle();

    let targetUserId = existingProfile?.id;

    if (!targetUserId) {
        // Try looking up in auth.users
        const { data: usersData } = await admin.auth.admin.listUsers();
        const existingAuthUser = usersData.users.find(
            (u) => u.email?.toLowerCase() === trimmedEmail
        );

        if (existingAuthUser) {
            targetUserId = existingAuthUser.id;
        } else {
            // Create user in auth
            const { data: newUser, error: createErr } = await admin.auth.admin.createUser({
                email: trimmedEmail,
                email_confirm: true,
            });
            if (createErr || !newUser.user) {
                throw new Error(`Failed to create user account: ${createErr?.message}`);
            }
            targetUserId = newUser.user.id;
        }
    }

    const now = new Date();
    const endDate = status === "monthly"
        ? new Date(now.getTime() + durationDays * 24 * 60 * 60 * 1000).toISOString()
        : null;

    const { error: upsertErr } = await admin
        .from("profiles")
        .upsert({
            id: targetUserId,
            email: trimmedEmail,
            subscription_status: status,
            subscription_end_date: endDate,
            updated_at: new Date().toISOString(),
        });

    if (upsertErr) {
        throw new Error(`Failed to grant subscription: ${upsertErr.message}`);
    }

    revalidatePath("/admin/subscriptions");
    revalidatePath("/admin");
    return { success: true, userId: targetUserId };
}
