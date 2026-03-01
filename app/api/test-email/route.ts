import { NextResponse } from "next/server";
import { resend, EMAIL_FROM } from "@/lib/resend";
import { buildPurchaseConfirmationEmail } from "@/lib/emails/purchase-confirmation";

// TEMPORARY — delete this file after testing
export async function GET() {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://amos-ai-site.vercel.app";

    const { data, error } = await resend.emails.send({
        from: EMAIL_FROM,
        to: "ronenamos@gmail.com",
        subject: "TEST — אישור תשלום | AI Finance",
        html: buildPurchaseConfirmationEmail({
            planName: "Lifetime PRO — תשלום חד-פעמי",
            amount: 199,
            orderId: "TEST-ORDER-123456",
            siteUrl,
        }),
    });

    if (error) {
        return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, emailId: data?.id });
}
