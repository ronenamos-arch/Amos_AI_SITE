import { createAdminClient } from "@/lib/supabase/admin";
import { GlassCard } from "@/components/ui/GlassCard";
import { format } from "date-fns";
import { he } from "date-fns/locale";

export default async function BundlePurchasesPage() {
    const admin = createAdminClient();

    // Fetch all bundle purchases, ordered by latest
    const { data: purchases, error } = await admin
        .from("bundle_purchases")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching purchases:", error);
    }

    const paidCount = purchases?.filter(p => p.status === "paid").length || 0;
    const revenue = paidCount * 150; // bundle is 150 ILS

    return (
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10" dir="rtl">
            <h1 className="text-3xl font-bold mb-8 text-white">רכישות באנדל Claude</h1>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <GlassCard className="p-6">
                    <p className="text-sm text-text-muted">סה״כ רוכשים ששילמו</p>
                    <p className="text-3xl font-bold text-teal-400 mt-2">{paidCount}</p>
                </GlassCard>
                <GlassCard className="p-6">
                    <p className="text-sm text-text-muted">הכנסות מבאנדל</p>
                    <p className="text-3xl font-bold text-teal-400 mt-2">₪{revenue.toLocaleString()}</p>
                </GlassCard>
                <GlassCard className="p-6">
                    <p className="text-sm text-text-muted">כלל הניסיונות (כולל נטישות)</p>
                    <p className="text-3xl font-bold text-white mt-2">{purchases?.length || 0}</p>
                </GlassCard>
            </div>

            <GlassCard className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-right text-text-secondary">
                        <thead className="text-xs text-text-muted uppercase bg-white/5 border-b border-white/10">
                            <tr>
                                <th className="px-6 py-4 font-medium">תאריך</th>
                                <th className="px-6 py-4 font-medium">שם הלקוח</th>
                                <th className="px-6 py-4 font-medium">אימייל</th>
                                <th className="px-6 py-4 font-medium">טלפון</th>
                                <th className="px-6 py-4 font-medium">סטטוס</th>
                                <th className="px-6 py-4 font-medium">PayPal ID</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {purchases?.map((p) => (
                                <tr key={p.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {format(new Date(p.created_at), "dd/MM/yyyy HH:mm", { locale: he })}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-white">
                                        {p.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {p.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {p.phone || "-"}
                                    </td>
                                    <td className="px-6 py-4">
                                        {p.status === "paid" ? (
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-teal-400/10 text-teal-400">
                                                שולם
                                            </span>
                                        ) : p.status === "pending" ? (
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-400/10 text-yellow-400">
                                                ממתין
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-400/10 text-red-400">
                                                בוטל
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 font-mono text-xs">
                                        {p.paypal_order_id || "-"}
                                    </td>
                                </tr>
                            ))}
                            {(!purchases || purchases.length === 0) && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-text-muted">
                                        אין עדיין רכישות.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </GlassCard>
        </div>
    );
}
