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
        const { data: access } = await supabase
            .from("course_access")
            .select("has_access")
            .eq("user_id", user.id)
            .maybeSingle();

        if (access?.has_access) {
            return <>{children}</>;
        }
    }

    return <NoCourseAccess />;
}

