import { NextResponse } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

const BOT_USER_AGENTS = [
    "whatsapp",
    "facebookexternalhit",
    "slackbot",
    "twitterbot",
    "linkedinbot",
    "telegrambot",
    "discordbot",
    "skypeuripreview",
    "bingbot",
    "googlebot",
    "proofpoint",
    "safebrowsing",
    "mailtrim",
    "mimecast",
    "trendmicro",
    "barracuda",
    "avast",
    "kaspersky",
    "symantec",
    "mcafee",
    "bitdefender",
    "spider",
    "crawler",
];

function isBotOrPrefetch(request: Request): boolean {
    // 1. Check prefetch / preview request headers
    const purpose = request.headers.get("purpose")?.toLowerCase();
    const secPurpose = request.headers.get("sec-purpose")?.toLowerCase();
    const xPurpose = request.headers.get("x-purpose")?.toLowerCase();
    const xMoz = request.headers.get("x-moz")?.toLowerCase();

    if (
        purpose === "prefetch" ||
        purpose === "preview" ||
        secPurpose === "prefetch" ||
        secPurpose === "preview" ||
        xPurpose === "preview" ||
        xMoz === "prefetch"
    ) {
        return true;
    }

    // 2. Check User-Agent against known scanners and preview crawlers
    const ua = request.headers.get("user-agent")?.toLowerCase() || "";
    if (BOT_USER_AGENTS.some((bot) => ua.includes(bot))) {
        return true;
    }

    return false;
}

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

    // If request comes from an automated preview bot or prefetch scanner,
    // return a 200 OK preview page WITHOUT consuming the single-use OTP token.
    if (isBotOrPrefetch(request)) {
        return new NextResponse(
            `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="utf-8">
  <title>AI Finance Login</title>
  <meta name="robots" content="noindex, nofollow">
</head>
<body style="font-family:sans-serif;text-align:center;padding:50px;">
  <h2>קישור התחברות אישי</h2>
  <p>לכניסה יש לפתוח את הקישור בדפדפן.</p>
</body>
</html>`,
            {
                status: 200,
                headers: {
                    "Content-Type": "text/html; charset=utf-8",
                    "Cache-Control": "no-store, no-cache, must-revalidate",
                },
            }
        );
    }

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

