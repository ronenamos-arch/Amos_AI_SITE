import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const VALID_KEYS = ["welcome", "day3", "day7", "day14"] as const;

export async function POST(request: NextRequest) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || user.email !== "ronenamos@gmail.com") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json() as { email?: string; content?: string };
    const { email, content } = body;

    if (!email || !content) {
        return NextResponse.json({ error: "Missing email or content" }, { status: 400 });
    }
    if (!VALID_KEYS.includes(email as typeof VALID_KEYS[number])) {
        return NextResponse.json({ error: "Unknown email type" }, { status: 400 });
    }

    const adminSupabase = createAdminClient();
    const { error } = await adminSupabase
        .from("email_templates")
        .upsert({ key: email, html: content, updated_at: new Date().toISOString() }, { onConflict: "key" });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || user.email !== "ronenamos@gmail.com") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const key = request.nextUrl.searchParams.get("email");
    if (!key || !VALID_KEYS.includes(key as typeof VALID_KEYS[number])) {
        return NextResponse.json({ error: "Unknown email type" }, { status: 400 });
    }

    const adminSupabase = createAdminClient();
    const { error } = await adminSupabase
        .from("email_templates")
        .delete()
        .eq("key", key);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
