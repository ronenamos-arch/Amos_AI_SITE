import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    if (process.env.NODE_ENV !== "development") {
        return NextResponse.json({ error: "Dev login is only available in development" }, { status: 403 });
    }

    const { searchParams, origin } = new URL(request.url);
    const email = searchParams.get("email") || "ronenamos@gmail.com";
    const next = searchParams.get("next") || "/dashboard";

    try {
        const adminSupabase = createAdminClient();
        const { data: linkData, error: linkError } = await adminSupabase.auth.admin.generateLink({
            type: "magiclink",
            email,
        });

        if (linkError || !linkData?.properties?.hashed_token) {
            return NextResponse.json({ error: linkError?.message || "Failed to generate token" }, { status: 500 });
        }

        const supabase = await createClient();
        const { error: verifyError } = await supabase.auth.verifyOtp({
            token_hash: linkData.properties.hashed_token,
            type: "magiclink",
        });

        if (verifyError) {
            return NextResponse.json({ error: verifyError.message }, { status: 500 });
        }

        return NextResponse.redirect(`${origin}${next}`);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
