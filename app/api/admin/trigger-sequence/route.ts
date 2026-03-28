import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { scheduleEmailSequence } from "@/lib/email-sequence";

export async function POST(request: NextRequest) {
    // Admin only
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || user.email !== "ronenamos@gmail.com") {
        return new NextResponse("Forbidden", { status: 403 });
    }

    const body = await request.json().catch(() => null);
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : null;

    if (!email || !email.includes("@")) {
        return NextResponse.json({ success: false, error: "כתובת מייל לא תקינה" }, { status: 400 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ronenamoscpa.co.il";
    const unsubscribeUrl = `${siteUrl}/api/newsletter/unsubscribe?email=${Buffer.from(email).toString("base64")}`;

    try {
        await scheduleEmailSequence({ to: email, unsubscribeUrl, siteUrl });
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("trigger-sequence error:", err);
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}
