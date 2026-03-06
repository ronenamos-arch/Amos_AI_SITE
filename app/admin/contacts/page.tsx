import { createAdminClient } from "@/lib/supabase/admin";
import ContactCard from "@/components/admin/ContactCard";

const PAGE_SIZE = 25;

const STATUS_TABS = [
    { key: "", label: "כולם" },
    { key: "new", label: "חדש" },
    { key: "in_progress", label: "בטיפול" },
    { key: "closed", label: "סגור" },
] as const;

export default async function AdminContactsPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; status?: string }>;
}) {
    const params = await searchParams;
    const page = Math.max(1, parseInt(params.page || "1", 10));
    const statusFilter = params.status || "";
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const admin = createAdminClient();

    // Get counts per status for tab badges
    const { data: allContacts } = await admin
        .from("contact_submissions")
        .select("status");

    const statusCounts: Record<string, number> = { "": allContacts?.length ?? 0 };
    for (const row of allContacts ?? []) {
        const s = row.status || "new";
        statusCounts[s] = (statusCounts[s] || 0) + 1;
    }

    // Fetch page with optional status filter
    let query = admin
        .from("contact_submissions")
        .select("id, name, email, subject, message, created_at, status, notes, replied_at", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(from, to);

    if (statusFilter) {
        query = query.eq("status", statusFilter);
    }

    const { data: contacts, count } = await query;

    const totalPages = Math.ceil((count || 0) / PAGE_SIZE);

    return (
        <div className="pt-24 pb-16 min-h-screen">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8" dir="rtl">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">פניות יצרו קשר</h1>
                    <span className="text-text-secondary text-sm">{allContacts?.length ?? 0} הודעות סה״כ</span>
                </div>

                {/* Status filter tabs */}
                <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
                    {STATUS_TABS.map((tab) => {
                        const isActive = statusFilter === tab.key;
                        const cnt = statusCounts[tab.key] ?? 0;
                        const href = tab.key
                            ? `/admin/contacts?status=${tab.key}`
                            : `/admin/contacts`;
                        return (
                            <a
                                key={tab.key}
                                href={href}
                                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                    isActive
                                        ? "bg-teal-500/20 text-teal-300 border border-teal-400/30"
                                        : "text-text-secondary hover:text-white border border-transparent hover:border-white/10"
                                }`}
                            >
                                {tab.label}
                                <span className="mr-1.5 text-xs opacity-60">({cnt})</span>
                            </a>
                        );
                    })}
                </div>

                <div className="space-y-4">
                    {contacts?.map((c) => (
                        <ContactCard
                            key={c.id}
                            contact={{
                                id: c.id,
                                name: c.name,
                                email: c.email,
                                subject: c.subject,
                                message: c.message,
                                created_at: c.created_at,
                                status: (c.status as "new" | "in_progress" | "closed") || "new",
                                notes: c.notes,
                                replied_at: c.replied_at,
                            }}
                        />
                    ))}

                    {(!contacts || contacts.length === 0) && (
                        <div className="py-12 text-center text-text-muted">
                            אין פניות בקטגוריה זו.
                        </div>
                    )}
                </div>

                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-3 mt-8">
                        {page > 1 && (
                            <a
                                href={`/admin/contacts?page=${page - 1}${statusFilter ? `&status=${statusFilter}` : ""}`}
                                className="px-4 py-2 text-sm border border-white/10 rounded-lg hover:border-teal-400/50 hover:text-teal-400 transition-colors"
                            >
                                הקודם
                            </a>
                        )}
                        <span className="text-text-muted text-sm">
                            עמוד {page} מתוך {totalPages}
                        </span>
                        {page < totalPages && (
                            <a
                                href={`/admin/contacts?page=${page + 1}${statusFilter ? `&status=${statusFilter}` : ""}`}
                                className="px-4 py-2 text-sm border border-white/10 rounded-lg hover:border-teal-400/50 hover:text-teal-400 transition-colors"
                            >
                                הבא
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
