import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { checkProfileAccess } from "@/lib/subscription-access";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const supabase = await createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({
                isLoggedIn: false,
                isSubscriber: false,
                displayName: null,
            });
        }

        const email = user.email ? user.email.toLowerCase().trim() : "";
        const isAdmin = email === "ronenamos@gmail.com";
        const displayName =
            user.user_metadata?.full_name ??
            user.user_metadata?.name ??
            email.split("@")[0] ??
            null;

        if (isAdmin) {
            return NextResponse.json({
                isLoggedIn: true,
                isSubscriber: true,
                displayName,
            });
        }

        const adminSupabase = createAdminClient();

        // 1. Check profile subscription
        const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .maybeSingle();

        if (checkProfileAccess(profile)) {
            return NextResponse.json({
                isLoggedIn: true,
                isSubscriber: true,
                displayName,
            });
        }

        // 2. Check course_access
        const { data: access } = await adminSupabase
            .from("course_access")
            .select("has_access")
            .or(`user_id.eq.${user.id},email.eq.${email}`)
            .maybeSingle();

        if (access?.has_access) {
            return NextResponse.json({
                isLoggedIn: true,
                isSubscriber: true,
                displayName,
            });
        }

        // 3. Check course_purchases
        const { data: coursePurchases } = await adminSupabase
            .from("course_purchases")
            .select("id")
            .eq("email", email)
            .in("status", ["paid", "completed"])
            .limit(1);

        if (coursePurchases && coursePurchases.length > 0) {
            return NextResponse.json({
                isLoggedIn: true,
                isSubscriber: true,
                displayName,
            });
        }

        // 4. Check bundle_purchases
        const { data: bundlePurchases } = await adminSupabase
            .from("bundle_purchases")
            .select("id")
            .eq("email", email)
            .in("status", ["paid", "completed"])
            .limit(1);

        if (bundlePurchases && bundlePurchases.length > 0) {
            return NextResponse.json({
                isLoggedIn: true,
                isSubscriber: true,
                displayName,
            });
        }

        // 5. Check payment_records
        const { data: payments } = await adminSupabase
            .from("payment_records")
            .select("id")
            .eq("user_id", user.id)
            .in("status", ["paid", "completed", "COMPLETED"])
            .limit(1);

        if (payments && payments.length > 0) {
            return NextResponse.json({
                isLoggedIn: true,
                isSubscriber: true,
                displayName,
            });
        }

        return NextResponse.json({
            isLoggedIn: true,
            isSubscriber: false,
            displayName,
        });
    } catch (err: any) {
        console.error("Error in /api/user/access-status:", err);
        return NextResponse.json({
            isLoggedIn: false,
            isSubscriber: false,
            displayName: null,
        });
    }
}
