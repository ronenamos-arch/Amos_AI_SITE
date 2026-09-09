/**
 * POST /api/course/create-order
 *
 * Validates buyer info and creates a pending purchase record in course_purchases.
 * Returns { purchaseId } for PayPal checkout.
 */

import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, phone } = body;

        // Validate required fields
        if (!name?.trim()) {
            return NextResponse.json({ error: "שם מלא הוא שדה חובה" }, { status: 400 });
        }
        if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ error: "כתובת אימייל לא תקינה" }, { status: 400 });
        }

        const supabase = createAdminClient();

        // Check if this email already has a paid purchase
        const { data: existing } = await supabase
            .from("course_purchases")
            .select("id, access_token, status")
            .eq("email", email.trim().toLowerCase())
            .eq("status", "paid")
            .maybeSingle();

        if (existing) {
            return NextResponse.json({
                purchaseId: existing.id,
                alreadyPaid: true,
                accessToken: existing.access_token,
            });
        }

        // Create pending purchase record
        const { data, error } = await supabase
            .from("course_purchases")
            .insert({
                name: name.trim(),
                email: email.trim().toLowerCase(),
                phone: phone?.trim() || null,
                status: "pending",
                amount: 599,
                currency: "ILS",
            })
            .select("id")
            .single();

        if (error) {
            console.error("Failed to create course purchase:", error);
            return NextResponse.json({ purchaseId: "course-order-" + Date.now() });
        }

        return NextResponse.json({ purchaseId: data.id });
    } catch (err) {
        console.error("course create-order error:", err);
        return NextResponse.json({ error: "שגיאת שרת" }, { status: 500 });
    }
}
