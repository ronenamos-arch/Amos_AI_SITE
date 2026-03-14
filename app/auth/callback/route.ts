import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendWelcomeEmail } from "@/lib/mailer";

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
            // Send welcome email for brand-new users (created in the last 10 minutes)
            const { data: { user } } = await supabase.auth.getUser();
            if (user?.email && user.created_at) {
                const ageMs = Date.now() - new Date(user.created_at).getTime();
                if (ageMs < 600_000) {
                    await sendWelcomeEmail({ to: user.email, type: "registration" }).catch((err) =>
                        console.error("Welcome email failed (registration):", err)
                    );
                }
            }
            return NextResponse.redirect(`${siteUrl}${next}`);
        }
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(`${siteUrl}/auth/auth-code-error`);
}
