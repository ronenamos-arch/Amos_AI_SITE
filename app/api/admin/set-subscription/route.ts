import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(req: NextRequest) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || user.email !== "ronenamos@gmail.com") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const targetUserId = searchParams.get("userId") || user.id;
    const status = searchParams.get("status") || "monthly";

    if (!["free", "monthly", "lifetime"].includes(status)) {
        return NextResponse.json({ error: "Invalid status. Use: free, monthly, or lifetime" }, { status: 400 });
    }

    const admin = createAdminClient();
    const { error } = await admin
        .from("profiles")
        .update({ subscription_status: status, updated_at: new Date().toISOString() })
        .eq("id", targetUserId);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, userId: targetUserId, status });
}
