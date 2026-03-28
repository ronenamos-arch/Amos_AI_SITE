import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { buildWelcomeEmail } from "@/lib/emails/welcome";
import { buildDripDay3Email } from "@/lib/emails/drip-day3";
import { buildDripDay7Email } from "@/lib/emails/drip-day7";
import { buildDripDay14Email } from "@/lib/emails/drip-day14";

const SITE_URL = "https://www.ronenamoscpa.co.il";
const UNSUBSCRIBE_URL = "https://www.ronenamoscpa.co.il/unsubscribe?token=preview";

export async function GET(request: NextRequest) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || user.email !== "ronenamos@gmail.com") {
        return new NextResponse("Forbidden", { status: 403 });
    }

    const email = request.nextUrl.searchParams.get("email");
    let html: string;

    switch (email) {
        case "welcome":
            html = buildWelcomeEmail({ type: "newsletter", siteUrl: SITE_URL, unsubscribeUrl: UNSUBSCRIBE_URL });
            break;
        case "day3":
            html = buildDripDay3Email({ siteUrl: SITE_URL, unsubscribeUrl: UNSUBSCRIBE_URL });
            break;
        case "day7":
            html = buildDripDay7Email({ siteUrl: SITE_URL, unsubscribeUrl: UNSUBSCRIBE_URL });
            break;
        case "day14":
            html = buildDripDay14Email({ siteUrl: SITE_URL, unsubscribeUrl: UNSUBSCRIBE_URL });
            break;
        default:
            return new NextResponse("Unknown email type", { status: 400 });
    }

    return new NextResponse(html, {
        headers: { "Content-Type": "text/html; charset=utf-8" },
    });
}
