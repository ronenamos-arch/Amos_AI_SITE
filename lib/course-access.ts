import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { cookies } from "next/headers";
import { checkProfileAccess } from "@/lib/subscription-access";

export interface CourseAccessResult {
  hasAccess: boolean;
  isPro: boolean;
  isPurchased: boolean;
  isAdmin: boolean;
  isDev: boolean;
  userEmail: string | null;
  userId: string | null;
  reason: "admin" | "pro_subscription" | "direct_purchase" | "dev_mode" | "no_access";
}

export async function checkCourseAccess(courseSlug: string): Promise<CourseAccessResult> {
  const isDev = process.env.NODE_ENV === "development";

  // Check auth user
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userEmail = user?.email?.toLowerCase().trim() || null;
  const userId = user?.id || null;

  // 1. Admin check
  if (userEmail === "ronenamos@gmail.com") {
    return {
      hasAccess: true,
      isPro: true,
      isPurchased: true,
      isAdmin: true,
      isDev,
      userEmail,
      userId,
      reason: "admin",
    };
  }

  // 2. Check Pro Subscription status (monthly, lifetime, grace period)
  let isPro = false;
  if (userId) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("subscription_status, subscription_end_date")
      .eq("id", userId)
      .maybeSingle();

    if (profile && checkProfileAccess(profile)) {
      isPro = true;
    }
  }

  // Basic courses (ai-mastery, notebook-master) are included in Pro!
  const isBasicCourse = courseSlug === "ai-mastery" || courseSlug === "notebook-master";
  if (isPro && isBasicCourse) {
    return {
      hasAccess: true,
      isPro: true,
      isPurchased: false,
      isAdmin: false,
      isDev,
      userEmail,
      userId,
      reason: "pro_subscription",
    };
  }

  // 3. Check direct course purchases by user email
  let isPurchased = false;
  if (userEmail) {
    const adminSupabase = createAdminClient();
    const { data: purchases } = await adminSupabase
      .from("course_purchases")
      .select("id, status")
      .eq("email", userEmail)
      .in("status", ["paid", "completed"])
      .limit(1);

    if (purchases && purchases.length > 0) {
      isPurchased = true;
      return {
        hasAccess: true,
        isPro,
        isPurchased: true,
        isAdmin: false,
        isDev,
        userEmail,
        userId,
        reason: "direct_purchase",
      };
    }
  }

  // 4. Check cookie token for direct access
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get(`course_token_${courseSlug}`)?.value || cookieStore.get("course_master_token")?.value;
  if (tokenCookie) {
    const adminSupabase = createAdminClient();
    const { data: tokenPurchase } = await adminSupabase
      .from("course_purchases")
      .select("id, status")
      .eq("access_token", tokenCookie)
      .eq("status", "paid")
      .maybeSingle();

    if (tokenPurchase) {
      return {
        hasAccess: true,
        isPro,
        isPurchased: true,
        isAdmin: false,
        isDev,
        userEmail,
        userId,
        reason: "direct_purchase",
      };
    }
  }

  // In development mode, provide access for seamless previewing
  if (isDev) {
    return {
      hasAccess: true,
      isPro,
      isPurchased,
      isAdmin: false,
      isDev: true,
      userEmail,
      userId,
      reason: "dev_mode",
    };
  }

  return {
    hasAccess: false,
    isPro: false,
    isPurchased: false,
    isAdmin: false,
    isDev: false,
    userEmail,
    userId,
    reason: "no_access",
  };
}
