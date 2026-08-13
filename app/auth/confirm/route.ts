import { NextResponse } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

/**
 * Verifies email links that were generated on the server.
 *
 * This is deliberately separate from /auth/callback. That route runs the PKCE
 * `code` exchange, which only works for links the *browser* initiated — it
 * needs the code_verifier that supabase-js stashed client-side. Links minted by
 * `auth.admin.generateLink()` (the purchase email's one-click login) have no
 * such verifier, so they carry a `token_hash` and must go through verifyOtp
 * instead. Sending them to /auth/callback would fail every time.
 */
export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const tokenHash = searchParams.get("token_hash");
    const type = searchParams.get("type") as EmailOtpType | null;
    const next = searchParams.get("next") ?? "/dashboard";

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || origin;

    if (tokenHash && type) {
        const supabase = await createClient();
        const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
        if (!error) {
            return NextResponse.redirect(`${siteUrl}${next}`);
        }
        console.error("verifyOtp failed:", error.message);
    }

    return NextResponse.redirect(`${siteUrl}/auth/auth-code-error`);
}
