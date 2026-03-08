import { NextResponse } from "next/server";
import { sendPurchaseConfirmationEmail } from "@/lib/actions/email";

// Simple test endpoint — remove after testing
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");

    if (secret !== process.env.TEST_EMAIL_SECRET && secret !== "test-amos-2024") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const to = searchParams.get("to") || "ronenamos@gmail.com";

    const result = await sendPurchaseConfirmationEmail({
        to,
        planName: "פרימיום חודשי",
        amount: 49,
        orderId: "TEST-ORDER-001",
    });

    return NextResponse.json(result);
}
