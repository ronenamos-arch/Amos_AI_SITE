import { createAdminClient } from "@/lib/supabase/admin";
import { GlassCard } from "@/components/ui/GlassCard";

const PAGE_SIZE = 25;

export default async function AdminContactsPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    const params = await searchParams;
    const page = Math.max(1, parseInt(params.page || "1", 10));
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const admin = createAdminClient();

    const { data: contacts, count } = await admin
        .from("contact_submissions")
        .select("id, name, email, subject, message, created_at", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(from, to);

    const totalPages = Math.ceil((count || 0) / PAGE_SIZE);

    return (
        <div className="pt-24 pb-16 min-h-screen">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8" dir="rtl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">פניות יצרו קשר</h1>
                    <span className="text-text-secondary text-sm">{count} הודעות סה״כ</span>
                </div>

                <div className="space-y-4">
                    {contacts?.map((c) => (
                        <GlassCard key={c.id} className="space-y-3">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="font-semibold">{c.name}</p>
                                    <p className="text-sm text-teal-400 font-mono">{c.email}</p>
                                </div>
                                <p className="text-xs text-text-muted whitespace-nowrap">
                                    {new Date(c.created_at).toLocaleDateString("he-IL", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </p>
                            </div>
                            <p className="text-sm font-medium text-text-secondary border-r-2 border-teal-400/40 pr-3">
                                {c.subject}
                            </p>
                            <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
                                {c.message}
                            </p>
                        </GlassCard>
                    ))}

                    {(!contacts || contacts.length === 0) && (
                        <GlassCard className="py-12 text-center text-text-muted">
                            אין פניות עדיין.
                        </GlassCard>
                    )}
                </div>

                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-3 mt-8">
                        {page > 1 && (
                            <a
                                href={`/admin/contacts?page=${page - 1}`}
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
                                href={`/admin/contacts?page=${page + 1}`}
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
