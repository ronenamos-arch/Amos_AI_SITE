import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NoCourseAccess } from "./NoCourseAccess";

export const dynamic = "force-dynamic";

export default async function CourseMasterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // In development mode, always allow full access for local testing and review
    if (process.env.NODE_ENV === "development") {
        return <>{children}</>;
    }

    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("course_master_token")?.value;

    // Check token access from cookie first
    if (tokenCookie) {
        const adminSupabase = createAdminClient();
        const { data: purchase } = await adminSupabase
            .from("course_purchases")
            .select("id, status")
            .eq("access_token", tokenCookie)
            .eq("status", "paid")
            .maybeSingle();

        if (purchase) {
            return <>{children}</>;
        }
    }

    // Check Supabase Auth user
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        // Admin user always has access
        if (user.email === "ronenamos@gmail.com") {
            return <>{children}</>;
        }

        const { data: access } = await supabase
            .from("course_access")
            .select("has_access")
            .eq("user_id", user.id)
            .maybeSingle();

        if (access?.has_access) {
            return <>{children}</>;
        }

        // Check profile subscription status
        const { data: profile } = await supabase
            .from("profiles")
            .select("subscription_status")
            .eq("id", user.id)
            .maybeSingle();

        if (profile?.subscription_status === "lifetime" || profile?.subscription_status === "monthly") {
            return <>{children}</>;
        }
    }

    return <NoCourseAccess />;
}

