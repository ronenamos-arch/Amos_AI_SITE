import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { buildWelcomeEmail } from "@/lib/emails/welcome";
import { buildDripDay3Email } from "@/lib/emails/drip-day3";
import { buildDripDay7Email } from "@/lib/emails/drip-day7";
import { buildDripDay14Email } from "@/lib/emails/drip-day14";

const SITE_URL = "https://www.ronenamoscpa.co.il";
const UNSUBSCRIBE_URL = "https://www.ronenamoscpa.co.il/unsubscribe?token=preview";

const VALID_KEYS = ["welcome", "day3", "day7", "day14"] as const;
type EmailKey = typeof VALID_KEYS[number];

function buildDefault(key: EmailKey): string {
    switch (key) {
        case "welcome": return buildWelcomeEmail({ type: "newsletter", siteUrl: SITE_URL, unsubscribeUrl: UNSUBSCRIBE_URL });
        case "day3":    return buildDripDay3Email({ siteUrl: SITE_URL, unsubscribeUrl: UNSUBSCRIBE_URL });
        case "day7":    return buildDripDay7Email({ siteUrl: SITE_URL, unsubscribeUrl: UNSUBSCRIBE_URL });
        case "day14":   return buildDripDay14Email({ siteUrl: SITE_URL, unsubscribeUrl: UNSUBSCRIBE_URL });
    }
}

export async function GET(request: NextRequest) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || user.email !== "ronenamos@gmail.com") {
        return new NextResponse("Forbidden", { status: 403 });
    }

    const key = request.nextUrl.searchParams.get("email") as EmailKey | null;
    if (!key || !VALID_KEYS.includes(key)) {
        return new NextResponse("Unknown email type", { status: 400 });
    }

    const adminSupabase = createAdminClient();
    const { data } = await adminSupabase
        .from("email_templates")
        .select("html")
        .eq("key", key)
        .maybeSingle();

    const html = data?.html ?? buildDefault(key);

    return new NextResponse(html, {
        headers: { "Content-Type": "text/html; charset=utf-8" },
    });
}
