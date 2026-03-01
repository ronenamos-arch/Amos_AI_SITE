import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(req: NextRequest) {
    const emailBase64 = req.nextUrl.searchParams.get("email");

    if (!emailBase64) {
        return new NextResponse(buildPage("שגיאה", "קישור לא תקין."), {
            status: 400,
            headers: { "Content-Type": "text/html; charset=utf-8" },
        });
    }

    const email = Buffer.from(emailBase64, "base64").toString("utf-8");

    const adminSupabase = createAdminClient();
    const { error } = await adminSupabase
        .from("newsletter_subscribers")
        .update({ status: "unsubscribed", unsubscribed_at: new Date().toISOString() })
        .eq("email", email.toLowerCase().trim());

    if (error) {
        console.error("Unsubscribe error:", error);
        return new NextResponse(buildPage("שגיאה", "לא הצלחנו לעדכן. נסה שוב מאוחר יותר."), {
            status: 500,
            headers: { "Content-Type": "text/html; charset=utf-8" },
        });
    }

    return new NextResponse(
        buildPage("הוסרת בהצלחה", "הכתובת שלך הוסרה מרשימת התפוצה. לא תקבל עוד עדכונים."),
        { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
}

function buildPage(title: string, message: string): string {
    return `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | AI Finance</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0e17;font-family:Arial,Helvetica,sans-serif;color:#e0e0e0;display:flex;align-items:center;justify-content:center;min-height:100vh;">
    <div style="text-align:center;padding:40px;max-width:400px;">
        <h1 style="color:#2dd4bf;font-size:24px;margin-bottom:16px;">${title}</h1>
        <p style="color:#9ca3af;font-size:16px;line-height:1.6;">${message}</p>
        <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://amos-ai-site.vercel.app"}" style="display:inline-block;margin-top:24px;padding:12px 28px;background-color:#2dd4bf;color:#0a0e17;font-weight:bold;text-decoration:none;border-radius:9999px;">חזרה לאתר</a>
    </div>
</body>
</html>`.trim();
}
