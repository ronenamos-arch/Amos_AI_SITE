import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

function escapeCsvField(value: string | null | undefined): string {
    const str = value ?? "";
    if (str.includes(",") || str.includes('"') || str.includes("\n")) {
        return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
}

function buildCsvRow(fields: (string | null | undefined)[]): string {
    return fields.map(escapeCsvField).join(",");
}

export async function GET() {
    // Auth: admin only
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || user.email !== "ronenamos@gmail.com") {
        return new NextResponse("Forbidden", { status: 403 });
    }

    const adminSupabase = createAdminClient();
    const rows: string[] = [];

    // Header row
    rows.push(buildCsvRow(["type", "email", "name", "source", "status", "subscription_status", "date", "notes"]));

    // 1. Newsletter subscribers
    const { data: subscribers } = await adminSupabase
        .from("newsletter_subscribers")
        .select("email, source, status, subscribed_at")
        .order("subscribed_at", { ascending: false });

    for (const s of subscribers ?? []) {
        rows.push(buildCsvRow([
            "newsletter",
            s.email,
            "",
            s.source ?? "",
            s.status ?? "active",
            "",
            s.subscribed_at ? new Date(s.subscribed_at).toISOString().split("T")[0] : "",
            "",
        ]));
    }

    // 2. Registered users (profiles + auth.users for created_at)
    const { data: profiles } = await adminSupabase
        .from("profiles")
        .select("email, subscription_status, updated_at")
        .order("updated_at", { ascending: false });

    // Fetch auth users to get created_at (paginated, up to 1000)
    const { data: authUsersData } = await adminSupabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
    const authUserMap = new Map<string, string>();
    for (const u of authUsersData?.users ?? []) {
        if (u.email) authUserMap.set(u.email, u.created_at);
    }

    for (const p of profiles ?? []) {
        const createdAt = authUserMap.get(p.email ?? "") ?? p.updated_at ?? "";
        rows.push(buildCsvRow([
            "user",
            p.email ?? "",
            "",
            "",
            "registered",
            p.subscription_status ?? "free",
            createdAt ? new Date(createdAt).toISOString().split("T")[0] : "",
            "",
        ]));
    }

    // 3. Contact form submissions
    const { data: contacts } = await adminSupabase
        .from("contact_submissions")
        .select("name, email, message, status, created_at")
        .order("created_at", { ascending: false });

    for (const c of contacts ?? []) {
        rows.push(buildCsvRow([
            "contact",
            c.email ?? "",
            c.name ?? "",
            "",
            c.status ?? "new",
            "",
            c.created_at ? new Date(c.created_at).toISOString().split("T")[0] : "",
            c.message ?? "",
        ]));
    }

    const today = new Date().toISOString().split("T")[0];
    const csv = "\uFEFF" + rows.join("\r\n"); // UTF-8 BOM for Excel Hebrew support

    return new NextResponse(csv, {
        status: 200,
        headers: {
            "Content-Type": "text/csv; charset=utf-8",
            "Content-Disposition": `attachment; filename="contacts-${today}.csv"`,
        },
    });
}
