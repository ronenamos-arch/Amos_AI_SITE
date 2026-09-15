import { NextResponse } from "next/server";
import { SMARTBEE_CONFIG } from "@/lib/smartbee-config";

/**
 * Redirects directly to SmartBee's hosted subscription page for AI Finance Pro (₪100 / month).
 */
export const dynamic = "force-dynamic";

export async function GET() {
    return NextResponse.redirect(SMARTBEE_CONFIG.products.monthlySubscription.url, 302);
}
