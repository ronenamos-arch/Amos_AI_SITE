import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { sendCoursePurchaseEmail, sendAdminNotification } from "@/lib/mailer";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    const email = req.nextUrl.searchParams.get("email") || "ronenamos@gmail.com";
    const name = req.nextUrl.searchParams.get("name") || "רונן עמוס (בדיקה)";
    const phone = req.nextUrl.searchParams.get("phone") || "050-5500344";

    const supabase = createAdminClient();
    const { data: purchase } = await supabase
        .from("course_purchases")
        .insert({
            email,
            name,
            phone,
            status: "paid",
            paid_at: new Date().toISOString(),
            paypal_order_id: "TEST-" + Date.now(),
            amount: 599.00,
            currency: "ILS",
        })
        .select("access_token, email, name, id")
        .maybeSingle();

    const token = purchase?.access_token || ("test-token-" + Date.now());

    sendCoursePurchaseEmail({
        to: email,
        name,
        accessToken: token,
    }).catch((err) => console.error("Test email failed:", err));

    sendAdminNotification({
        eventType: "Test Course Purchase Flow",
        userEmail: email,
        details: `${name} ביצע בדיקת זרימת רכישה מלאה לקורס.`,
    }).catch(() => {});

    const siteUrl = process.env.NODE_ENV === "development" 
        ? "http://localhost:3000" 
        : (process.env.NEXT_PUBLIC_SITE_URL || "https://www.ronenamoscpa.co.il");
    const redirectUrl = new URL(`/courses/ai-master-course?course_token=${token}`, siteUrl);
    const response = NextResponse.redirect(redirectUrl);

    response.cookies.set("course_master_token", token, {
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
        httpOnly: false,
        sameSite: "lax",
    });

    return response;
}
