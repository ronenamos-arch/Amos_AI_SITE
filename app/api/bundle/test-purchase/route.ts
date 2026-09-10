import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { sendBundlePurchaseEmail, sendAdminNotification } from "@/lib/mailer";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { purchaseId, email, name, phone } = body;

        const targetEmail = (email || "ronenamos@gmail.com").trim().toLowerCase();
        const targetName = name || "רונן עמוס (בדיקה)";
        const targetPhone = phone || "050-5500344";

        const supabase = createAdminClient();

        let token = "test-token-" + Date.now();

        if (purchaseId) {
            const { data: updated } = await supabase
                .from("bundle_purchases")
                .update({
                    status: "paid",
                    paid_at: new Date().toISOString(),
                    paypal_order_id: "TEST-LOCAL-" + Date.now(),
                })
                .eq("id", purchaseId)
                .select("access_token, email, name")
                .maybeSingle();

            if (updated?.access_token) {
                token = updated.access_token;
            }
        } else {
            const { data: inserted } = await supabase
                .from("bundle_purchases")
                .insert({
                    email: targetEmail,
                    name: targetName,
                    phone: targetPhone,
                    status: "paid",
                    paid_at: new Date().toISOString(),
                    paypal_order_id: "TEST-LOCAL-" + Date.now(),
                    amount: 150,
                    currency: "ILS",
                })
                .select("access_token, email, name")
                .maybeSingle();

            if (inserted?.access_token) {
                token = inserted.access_token;
            }
        }

        // Send confirmation email
        sendBundlePurchaseEmail({
            to: targetEmail,
            name: targetName,
            accessToken: token,
        }).catch((err) => console.error("Test bundle email failed:", err));

        sendAdminNotification({
            eventType: "Test Bundle Purchase Flow",
            userEmail: targetEmail,
            details: `${targetName} ביצע בדיקת רכישה לחבילת הוובינרים.`,
        }).catch(() => {});

        return NextResponse.json({
            success: true,
            accessToken: token,
        });
    } catch (err: any) {
        console.error("Bundle test purchase error:", err);
        return NextResponse.json(
            { error: err.message || "Failed to process test purchase" },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    const email = req.nextUrl.searchParams.get("email") || "ronenamos@gmail.com";
    const name = req.nextUrl.searchParams.get("name") || "רונן עמוס (בדיקה)";
    const phone = req.nextUrl.searchParams.get("phone") || "050-5500344";

    const supabase = createAdminClient();
    const { data: purchase } = await supabase
        .from("bundle_purchases")
        .insert({
            email,
            name,
            phone,
            status: "paid",
            paid_at: new Date().toISOString(),
            paypal_order_id: "TEST-" + Date.now(),
            amount: 150.00,
            currency: "ILS",
        })
        .select("access_token, email, name, id")
        .maybeSingle();

    const token = purchase?.access_token || ("test-token-" + Date.now());

    sendBundlePurchaseEmail({
        to: email,
        name,
        accessToken: token,
    }).catch((err) => console.error("Test bundle email failed:", err));

    sendAdminNotification({
        eventType: "Test Bundle Purchase Flow",
        userEmail: email,
        details: `${name} ביצע בדיקת זרימת רכישה מלאה לחבילת הוובינרים.`,
    }).catch(() => {});

    const siteUrl = process.env.NODE_ENV === "development" 
        ? "http://localhost:3000" 
        : (process.env.NEXT_PUBLIC_SITE_URL || "https://www.ronenamoscpa.co.il");
    const redirectUrl = new URL(`/claude-bundle/thanks?token=${token}`, siteUrl);
    const response = NextResponse.redirect(redirectUrl);

    return response;
}
