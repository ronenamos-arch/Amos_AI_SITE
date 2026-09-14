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

function isTestOrAdminAccount(email: string | null | undefined): boolean {
    if (!email) return false;
    const lower = email.toLowerCase().trim();
    if (
        lower === "ronenamos@gmail.com" ||
        lower === "customer@example.com" ||
        lower === "ronenamos+subtest2@gmail.com" ||
        lower === "snir570@walla.com"
    ) {
        return true;
    }
    if (lower.includes("+test") || lower.includes("+subtest") || lower.endsWith("@example.com")) {
        return true;
    }
    return false;
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
    last_payment_date: string | null;
    last_payment_amount: number | null;
    recurring_amount: number;
    in_grace_period?: boolean;
    is_test?: boolean;
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

type UserPaymentSummary = {
    total: number;
    count: number;
    lastPaymentDate: string | null;
    lastPaymentAmount: number | null;
    recurringAmount: number;
};

function buildUserPaymentsMap(payments: any[]): Map<string, UserPaymentSummary> {
    const map = new Map<string, UserPaymentSummary>();

    // Sort payments descending by created_at
    const sorted = [...payments].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    sorted.forEach((p) => {
        if (!p.user_id) return;
        const amount = Number(p.amount) || 0;
        const current = map.get(p.user_id);

        if (!current) {
            // First payment seen (most recent)
            let recurring = amount;
            if (amount > 500) {
                // Annual / package payment like Dotan's 1009 ILS
                recurring = Math.round(amount / 12);
            } else if (amount === 0) {
                recurring = 100;
            }
            map.set(p.user_id, {
                total: amount,
                count: 1,
                lastPaymentDate: p.created_at || null,
                lastPaymentAmount: amount,
                recurringAmount: recurring,
            });
        } else {
            current.total += amount;
            current.count += 1;
        }
    });

    return map;
}

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

    const userPaymentsMap = buildUserPaymentsMap(payments);

    let calculatedMrr = 0;
    let monthlyCount = 0;
    let lifetimeCount = 0;
    let cancelledCount = 0;
    let paymentFailedCount = 0;
    let freeCount = 0;

    const atRiskList: SubscriptionProfile[] = [];

    profiles.forEach((profile) => {
        const isTest = isTestOrAdminAccount(profile.email);
        const status = profile.subscription_status || "free";
        const endDate = profile.subscription_end_date ? new Date(profile.subscription_end_date) : null;
        const isExpired = endDate !== null && endDate < now;
        const inGrace = status === "cancelled" && endDate !== null && endDate > now;

        const paymentsInfo = userPaymentsMap.get(profile.id) || {
            total: 0,
            count: 0,
            lastPaymentDate: null,
            lastPaymentAmount: null,
            recurringAmount: 100,
        };

        const mappedProfile: SubscriptionProfile = {
            ...profile,
            total_spent: paymentsInfo.total,
            payments_count: paymentsInfo.count,
            last_payment_date: paymentsInfo.lastPaymentDate,
            last_payment_amount: paymentsInfo.lastPaymentAmount,
            recurring_amount: paymentsInfo.recurringAmount,
            in_grace_period: inGrace,
            is_test: isTest,
        };

        // Skip test and admin accounts from production subscriber & revenue stats
        if (isTest) {
            return;
        }

        if (status === "monthly") {
            if (isExpired) {
                // If end date is in the past, subscription has expired
                cancelledCount++;
            } else {
                monthlyCount++;
                calculatedMrr += paymentsInfo.recurringAmount;
            }
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
    const mrr = calculatedMrr;
    const arr = mrr * 12;

    // Filter out test payments for revenue calculations
    const validPayments = payments.filter((p) => {
        const profile = profiles.find((pr) => pr.id === p.user_id);
        return !isTestOrAdminAccount(profile?.email);
    });

    const subRevenueAllTime = validPayments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
    const courseRevenueAllTime = courses.reduce((sum, c) => sum + (Number(c.amount) || 599), 0);
    const bundleRevenueAllTime = bundles.reduce((sum, b) => sum + 150, 0);
    const totalRevenueAllTime = subRevenueAllTime + courseRevenueAllTime + bundleRevenueAllTime;

    // This month revenue
    const thisMonthSub = validPayments
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
    const lastMonthSub = validPayments
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
        if (isTestOrAdminAccount(p.email)) return false;
        const isPaid = p.subscription_status === "monthly" || p.subscription_status === "lifetime";
        const date = new Date(p.created_at || p.updated_at);
        return isPaid && date >= startOfThisMonth;
    }).length;

    const newSubscribersLastMonth = profiles.filter((p) => {
        if (isTestOrAdminAccount(p.email)) return false;
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

    const userPaymentsMap = buildUserPaymentsMap(payments);

    return profiles.map((p) => {
        const isTest = isTestOrAdminAccount(p.email);
        const paymentsInfo = userPaymentsMap.get(p.id) || {
            total: 0,
            count: 0,
            lastPaymentDate: null,
            lastPaymentAmount: null,
            recurringAmount: 100,
        };
        const endDate = p.subscription_end_date ? new Date(p.subscription_end_date) : null;
        const inGrace = p.subscription_status === "cancelled" && endDate !== null && endDate > now;

        return {
            ...p,
            total_spent: paymentsInfo.total,
            payments_count: paymentsInfo.count,
            last_payment_date: paymentsInfo.lastPaymentDate,
            last_payment_amount: paymentsInfo.lastPaymentAmount,
            recurring_amount: paymentsInfo.recurringAmount,
            in_grace_period: inGrace,
            is_test: isTest,
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

// ----------------------------------------------------------------------------
// PayPal Live API Batch Synchronization
// ----------------------------------------------------------------------------
const PAYPAL_API_BASE = process.env.NEXT_PUBLIC_PAYPAL_SANDBOX === "true"
    ? "https://api-m.sandbox.paypal.com"
    : "https://api-m.paypal.com";

async function getPayPalAccessToken(): Promise<string> {
    const isSandbox = process.env.NEXT_PUBLIC_PAYPAL_SANDBOX === "true";
    const clientId = isSandbox
        ? process.env.NEXT_PUBLIC_PAYPAL_SANDBOX_CLIENT_ID
        : process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const secret = isSandbox
        ? process.env.PAYPAL_SANDBOX_SECRET_KEY
        : process.env.PAYPAL_SECRET_KEY;

    if (!clientId || !secret) {
        throw new Error("PayPal client credentials are not configured in environment.");
    }

    const res = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
        method: "POST",
        headers: {
            Authorization: `Basic ${Buffer.from(`${clientId}:${secret}`).toString("base64")}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
    });

    const data = await res.json();
    if (!data.access_token) {
        throw new Error(`PayPal auth failed: ${JSON.stringify(data)}`);
    }
    return data.access_token;
}

export type PayPalSyncResult = {
    totalChecked: number;
    updatedCount: number;
    details: Array<{
        email: string;
        paypalId: string;
        oldStatus: string;
        newStatus: string;
        nextBilling: string | null;
        lastPaymentAmount: number | null;
        lastPaymentTime: string | null;
        note?: string;
    }>;
};

export async function syncSubscribersWithPayPalLive(): Promise<PayPalSyncResult> {
    await verifyAdmin();
    const admin = createAdminClient();

    const token = await getPayPalAccessToken();

    // Fetch all profiles that have a paypal_subscription_id starting with 'I-'
    const { data: profiles, error: fetchErr } = await admin
        .from("profiles")
        .select("id, email, subscription_status, subscription_end_date, paypal_subscription_id")
        .not("paypal_subscription_id", "is", null);

    if (fetchErr || !profiles) {
        throw new Error(`Failed to load profiles for PayPal sync: ${fetchErr?.message}`);
    }

    const syncDetails: PayPalSyncResult["details"] = [];
    let updatedCount = 0;

    for (const profile of profiles) {
        const paypalId = profile.paypal_subscription_id?.trim();
        if (!paypalId || !paypalId.startsWith("I-")) {
            continue;
        }

        try {
            const res = await fetch(`${PAYPAL_API_BASE}/v1/billing/subscriptions/${paypalId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                console.warn(`PayPal sub query failed for ${profile.email} (${paypalId}): HTTP ${res.status}`);
                continue;
            }

            const paypalData = await res.json();
            const paypalStatus = paypalData.status; // ACTIVE, CANCELLED, SUSPENDED, EXPIRED
            const billingInfo = paypalData.billing_info;
            const lastPayment = billingInfo?.last_payment;
            const nextBillingTime = billingInfo?.next_billing_time;
            const failedCount = billingInfo?.failed_payments_count || 0;

            let determinedStatus = profile.subscription_status;

            if (paypalStatus === "CANCELLED" || paypalStatus === "EXPIRED") {
                determinedStatus = "cancelled";
            } else if (paypalStatus === "SUSPENDED" || failedCount > 0) {
                determinedStatus = "payment_failed";
            } else if (paypalStatus === "ACTIVE") {
                // If next billing time passed and no payment, could be payment failed
                const nextBillingDate = nextBillingTime ? new Date(nextBillingTime) : null;
                const now = new Date();
                if (nextBillingDate && nextBillingDate < now) {
                    determinedStatus = "payment_failed";
                } else {
                    determinedStatus = "monthly";
                }
            }

            const shouldUpdateStatus = determinedStatus !== profile.subscription_status;
            const shouldUpdateEndDate = nextBillingTime && nextBillingTime !== profile.subscription_end_date;

            if (shouldUpdateStatus || shouldUpdateEndDate) {
                const updatePayload: Record<string, any> = {
                    subscription_status: determinedStatus,
                    updated_at: new Date().toISOString(),
                };
                if (nextBillingTime) {
                    updatePayload.subscription_end_date = nextBillingTime;
                }

                await admin
                    .from("profiles")
                    .update(updatePayload)
                    .eq("id", profile.id);

                updatedCount++;
            }

            // Sync missing payment record if last_payment exists in PayPal
            if (lastPayment && lastPayment.amount?.value && lastPayment.time) {
                const payAmount = Number(lastPayment.amount.value);
                const payTime = lastPayment.time;

                const { data: existingPay } = await admin
                    .from("payment_records")
                    .select("id")
                    .eq("user_id", profile.id)
                    .eq("paypal_order_id", paypalId)
                    .maybeSingle();

                if (!existingPay) {
                    await admin.from("payment_records").insert({
                        user_id: profile.id,
                        amount: payAmount,
                        currency: lastPayment.amount.currency_code || "ILS",
                        paypal_order_id: paypalId,
                        status: "COMPLETED",
                        created_at: payTime,
                    });
                }
            }

            syncDetails.push({
                email: profile.email || "ללא אימייל",
                paypalId,
                oldStatus: profile.subscription_status,
                newStatus: determinedStatus,
                nextBilling: nextBillingTime || null,
                lastPaymentAmount: lastPayment ? Number(lastPayment.amount?.value) : null,
                lastPaymentTime: lastPayment?.time || null,
                note: shouldUpdateStatus ? `סטטוס עודכן ל-${determinedStatus}` : "מסונכרן ותקין",
            });
        } catch (err: any) {
            console.error(`Error syncing ${profile.email}:`, err);
        }
    }

    revalidatePath("/admin/subscriptions");
    revalidatePath("/admin");

    return {
        totalChecked: profiles.length,
        updatedCount,
        details: syncDetails,
    };
}
