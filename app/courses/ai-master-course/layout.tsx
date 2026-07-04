import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { NoCourseAccess } from "./NoCourseAccess";

export const dynamic = "force-dynamic";

export default async function CourseMasterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login?next=/courses/ai-master-course");
    }

    const { data: access } = await supabase
        .from("course_access")
        .select("has_access")
        .eq("user_id", user.id)
        .maybeSingle();

    if (!access?.has_access) {
        return <NoCourseAccess />;
    }

    return <>{children}</>;
}
