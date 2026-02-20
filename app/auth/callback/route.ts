import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    // if "next" is in search params, use it as the redirection URL after successful connection
    const next = searchParams.get("next") ?? "/";

    // Use NEXT_PUBLIC_SITE_URL if available (production), otherwise fall back to origin (local dev)
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || origin;

    if (code) {
        const supabase = await createClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
            return NextResponse.redirect(`${siteUrl}${next}`);
        }
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(`${siteUrl}/auth/auth-code-error`);
}
