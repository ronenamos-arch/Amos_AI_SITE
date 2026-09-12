import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function GET() {
    if (process.env.NODE_ENV !== "development") {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user || user.email !== "ronenamos@gmail.com") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }
    }

    const admin = createAdminClient();

    const [profilesRes, paymentsRes] = await Promise.all([
        admin.from("profiles").select("*").order("created_at", { ascending: false }),
        admin.from("payment_records").select("*"),
    ]);

    const profiles = profilesRes.data || [];
    const payments = paymentsRes.data || [];

    const userPaymentsMap = new Map<string, { total: number; count: number }>();
    payments.forEach((p) => {
        if (p.user_id) {
            const current = userPaymentsMap.get(p.user_id) || { total: 0, count: 0 };
            userPaymentsMap.set(p.user_id, {
                total: current.total + (Number(p.amount) || 0),
                count: current.count + 1,
            });
        }
    });

    // Translate statuses to Hebrew for Excel
    const statusLabels: Record<string, string> = {
        monthly: "חודשי פעיל",
        lifetime: "לכל החיים (Lifetime)",
        cancelled: "בוטל / תקופת חסד",
        payment_failed: "תשלום נכשל",
        free: "חינמי",
    };

    const rows = [
        [
            "מזהה משתמש (ID)",
            "אימייל",
            "סטטוס מנוי",
            "תאריך סיום / חידוש",
            "סך הכל שולם (₪)",
            "מספר תשלומים",
            "PayPal Subscription ID",
            "תאריך עדכון אחרון",
        ],
    ];

    profiles.forEach((p) => {
        const payInfo = userPaymentsMap.get(p.id) || { total: 0, count: 0 };
        rows.push([
            p.id,
            p.email || "",
            statusLabels[p.subscription_status] || p.subscription_status || "חינמי",
            p.subscription_end_date ? new Date(p.subscription_end_date).toISOString().split("T")[0] : "",
            payInfo.total.toString(),
            payInfo.count.toString(),
            p.paypal_subscription_id || "",
            p.updated_at ? new Date(p.updated_at).toISOString().split("T")[0] : "",
        ]);
    });

    const csvContent = "\uFEFF" + rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\r\n");

    const dateStr = new Date().toISOString().split("T")[0];
    return new NextResponse(csvContent, {
        headers: {
            "Content-Type": "text/csv; charset=utf-8",
            "Content-Disposition": `attachment; filename="subscribers-${dateStr}.csv"`,
        },
    });
}
