"use client";

import { useState, useMemo } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { SubscriptionProfile, extendSubscription } from "@/lib/actions/admin-subscriptions";
import { EditSubscriptionModal } from "./EditSubscriptionModal";
import { ManualGrantSubscriptionModal } from "./ManualGrantSubscriptionModal";
import {
    Search,
    Copy,
    Check,
    Download,
    UserPlus,
    Edit2,
    Clock,
    Mail,
    RefreshCw,
    ExternalLink,
} from "lucide-react";

type FilterTab = "all" | "active" | "monthly" | "lifetime" | "cancelled" | "payment_failed" | "free";

export function SubscriptionsTable({
    subscribers: initialSubscribers,
    onRefresh,
}: {
    subscribers: SubscriptionProfile[];
    onRefresh: () => void;
}) {
    const [subscribers, setSubscribers] = useState(initialSubscribers);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTab, setSelectedTab] = useState<FilterTab>("all");

    // Modals
    const [editingUser, setEditingUser] = useState<SubscriptionProfile | null>(null);
    const [isGrantModalOpen, setIsGrantModalOpen] = useState(false);

    // Copy state
    const [copiedEmails, setCopiedEmails] = useState(false);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [extendingId, setExtendingId] = useState<string | null>(null);

    // Keep state in sync if prop changes
    useMemo(() => {
        setSubscribers(initialSubscribers);
    }, [initialSubscribers]);

    const filteredSubscribers = useMemo(() => {
        return subscribers.filter((sub) => {
            const status = sub.subscription_status || "free";
            const email = (sub.email || "").toLowerCase();
            const paypalId = (sub.paypal_subscription_id || "").toLowerCase();
            const query = searchQuery.toLowerCase().trim();

            const matchesSearch =
                !query || email.includes(query) || paypalId.includes(query);

            if (!matchesSearch) return false;

            if (selectedTab === "all") return true;
            if (selectedTab === "active") return status === "monthly" || status === "lifetime";
            if (selectedTab === "monthly") return status === "monthly";
            if (selectedTab === "lifetime") return status === "lifetime";
            if (selectedTab === "cancelled") return status === "cancelled";
            if (selectedTab === "payment_failed") return status === "payment_failed";
            if (selectedTab === "free") return status === "free" || !status;

            return true;
        });
    }, [subscribers, searchQuery, selectedTab]);

    const handleCopyAllEmails = () => {
        const emails = filteredSubscribers
            .map((s) => s.email)
            .filter(Boolean)
            .join(", ");

        if (!emails) return;

        navigator.clipboard.writeText(emails);
        setCopiedEmails(true);
        setTimeout(() => setCopiedEmails(false), 2500);
    };

    const handleCopyText = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleQuickExtend30 = async (userId: string) => {
        try {
            setExtendingId(userId);
            await extendSubscription(userId, 30);
            onRefresh();
        } catch (err) {
            console.error("Failed to extend:", err);
            alert("שגיאה בהארכת המנוי");
        } finally {
            setExtendingId(null);
        }
    };

    const tabs: { id: FilterTab; label: string; count: number }[] = [
        {
            id: "all",
            label: "כל המשתמשים הרשומים",
            count: subscribers.length,
        },
        {
            id: "active",
            label: "משלמים פעילים",
            count: subscribers.filter((s) => s.subscription_status === "monthly" || s.subscription_status === "lifetime").length,
        },
        {
            id: "monthly",
            label: "חודשי",
            count: subscribers.filter((s) => s.subscription_status === "monthly").length,
        },
        {
            id: "lifetime",
            label: "לכל החיים",
            count: subscribers.filter((s) => s.subscription_status === "lifetime").length,
        },
        {
            id: "cancelled",
            label: "בוטלו / בגרייס",
            count: subscribers.filter((s) => s.subscription_status === "cancelled").length,
        },
        {
            id: "payment_failed",
            label: "תשלום נכשל",
            count: subscribers.filter((s) => s.subscription_status === "payment_failed").length,
        },
        {
            id: "free",
            label: "חינמי",
            count: subscribers.filter((s) => s.subscription_status === "free" || !s.subscription_status).length,
        },
    ];

    const getStatusBadge = (status: string, inGrace?: boolean) => {
        switch (status) {
            case "monthly":
                return (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                        חודשי פעיל (₪100)
                    </span>
                );
            case "lifetime":
                return (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-purple-400/10 text-purple-300 border border-purple-400/20">
                        לכל החיים (Lifetime)
                    </span>
                );
            case "cancelled":
                return (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-amber-400/10 text-amber-400 border border-amber-400/20">
                        {inGrace ? "בוטל (בתקופת חסד)" : "בוטל"}
                    </span>
                );
            case "payment_failed":
                return (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-red-400/10 text-red-400 border border-red-400/20">
                        תשלום נכשל
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-white/5 text-text-muted border border-white/10">
                        חינמי
                    </span>
                );
        }
    };

    return (
        <div className="space-y-4" dir="rtl">
            {/* Top Toolbar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                    <input
                        type="text"
                        placeholder="חיפוש לפי אימייל או מזהה PayPal..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-3 pr-9 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-text-muted focus:outline-none focus:border-teal-400 transition-colors"
                    />
                </div>

                {/* Productivity Action Buttons */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleCopyAllEmails}
                        className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-white border border-white/10 transition-colors flex items-center gap-1.5"
                        title="העתק את כל האימיילים בסינון הנוכחי"
                    >
                        {copiedEmails ? (
                            <>
                                <Check className="h-3.5 w-3.5 text-emerald-400" />
                                <span className="text-emerald-400 font-semibold">הועתקו {filteredSubscribers.length} מיילים!</span>
                            </>
                        ) : (
                            <>
                                <Copy className="h-3.5 w-3.5 text-text-muted" />
                                <span>העתק מיילים מפולחים ({filteredSubscribers.length})</span>
                            </>
                        )}
                    </button>

                    <a
                        href="/api/admin/export-subscribers"
                        download
                        className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-white border border-white/10 transition-colors flex items-center gap-1.5"
                        title="ייצוא קובץ Excel / CSV"
                    >
                        <Download className="h-3.5 w-3.5 text-text-muted" />
                        <span>ייצוא CSV</span>
                    </a>

                    <Button
                        onClick={() => setIsGrantModalOpen(true)}
                        className="px-3.5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-black text-xs font-semibold flex items-center gap-1.5"
                    >
                        <UserPlus className="h-3.5 w-3.5" />
                        <span>הענק מנוי ידני</span>
                    </Button>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 border-b border-white/10 scrollbar-none">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setSelectedTab(tab.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                            selectedTab === tab.id
                                ? "bg-white/15 text-white shadow-sm"
                                : "text-text-muted hover:text-white hover:bg-white/5"
                        }`}
                    >
                        <span>{tab.label}</span>
                        <span
                            className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                                selectedTab === tab.id
                                    ? "bg-teal-400/20 text-teal-300 font-bold"
                                    : "bg-white/5 text-text-muted"
                            }`}
                        >
                            {tab.count}
                        </span>
                    </button>
                ))}
            </div>

            {/* Table Container */}
            <GlassCard className="overflow-hidden border-white/10">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-right text-text-secondary">
                        <thead className="text-xs text-text-muted uppercase bg-white/5 border-b border-white/10">
                            <tr>
                                <th className="px-5 py-3.5 font-medium">לקוח / אימייל</th>
                                <th className="px-5 py-3.5 font-medium">תוכנית</th>
                                <th className="px-5 py-3.5 font-medium">סיום תקופה / חידוש</th>
                                <th className="px-5 py-3.5 font-medium">סך תשלומים</th>
                                <th className="px-5 py-3.5 font-medium">PayPal ID</th>
                                <th className="px-5 py-3.5 font-medium text-left">פעולות</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredSubscribers.map((sub) => {
                                const daysLeft = sub.subscription_end_date
                                    ? Math.ceil(
                                          (new Date(sub.subscription_end_date).getTime() - Date.now()) /
                                              (1000 * 60 * 60 * 24)
                                      )
                                    : null;

                                return (
                                    <tr key={sub.id} className="hover:bg-white/5 transition-colors">
                                        {/* User / Email */}
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold text-white">
                                                    {sub.email || "ללא כתובת אימייל"}
                                                </span>
                                                {sub.email && (
                                                    <a
                                                        href={`mailto:${sub.email}`}
                                                        className="text-text-muted hover:text-teal-400 transition-colors"
                                                        title="שלח מייל"
                                                    >
                                                        <Mail className="h-3.5 w-3.5" />
                                                    </a>
                                                )}
                                            </div>
                                            <span className="text-[11px] text-text-muted font-mono block mt-0.5">
                                                ID: {sub.id.substring(0, 8)}...
                                            </span>
                                        </td>

                                        {/* Plan Status */}
                                        <td className="px-5 py-4">
                                            {getStatusBadge(sub.subscription_status, sub.in_grace_period)}
                                        </td>

                                        {/* End Date / Renewal */}
                                        <td className="px-5 py-4 text-xs whitespace-nowrap">
                                            {sub.subscription_status === "lifetime" ? (
                                                <span className="text-purple-300 font-medium">גישה קבועה ללא הגבלה</span>
                                            ) : sub.subscription_end_date ? (
                                                <div>
                                                    <span className="text-white font-mono">
                                                        {new Intl.DateTimeFormat("he-IL", {
                                                            day: "2-digit",
                                                            month: "2-digit",
                                                            year: "numeric",
                                                        }).format(new Date(sub.subscription_end_date))}
                                                    </span>
                                                    {daysLeft !== null && (
                                                        <span
                                                            className={`block text-[11px] mt-0.5 ${
                                                                daysLeft > 7
                                                                    ? "text-emerald-400"
                                                                    : daysLeft > 0
                                                                    ? "text-amber-400"
                                                                    : "text-red-400"
                                                            }`}
                                                        >
                                                            {daysLeft > 0 ? `נותרו עוד ${daysLeft} ימים` : "פג תוקף"}
                                                        </span>
                                                    )}
                                                </div>
                                            ) : (
                                                <span className="text-text-muted">-</span>
                                            )}
                                        </td>

                                        {/* Total Spent / LTV */}
                                        <td className="px-5 py-4 text-xs">
                                            <span className="font-bold text-white">
                                                ₪{sub.total_spent.toLocaleString()}
                                            </span>
                                            {sub.payments_count > 0 && (
                                                <span className="text-text-muted block text-[11px]">
                                                    ({sub.payments_count} תשלומים)
                                                </span>
                                            )}
                                        </td>

                                        {/* PayPal ID */}
                                        <td className="px-5 py-4 text-xs font-mono">
                                            {sub.paypal_subscription_id ? (
                                                <button
                                                    onClick={() =>
                                                        handleCopyText(
                                                            sub.paypal_subscription_id!,
                                                            sub.id + "-paypal"
                                                        )
                                                    }
                                                    className="inline-flex items-center gap-1 text-teal-400/90 hover:text-teal-300 transition-colors"
                                                    title="לחץ להעתקת מזהה מנוי PayPal"
                                                >
                                                    <span>{sub.paypal_subscription_id}</span>
                                                    {copiedId === sub.id + "-paypal" ? (
                                                        <Check className="h-3 w-3 text-emerald-400" />
                                                    ) : (
                                                        <Copy className="h-3 w-3 text-text-muted" />
                                                    )}
                                                </button>
                                            ) : (
                                                <span className="text-text-muted">-</span>
                                            )}
                                        </td>

                                        {/* Actions */}
                                        <td className="px-5 py-4 text-left">
                                            <div className="flex items-center justify-end gap-1.5">
                                                {sub.subscription_status === "monthly" && (
                                                    <button
                                                        onClick={() => handleQuickExtend30(sub.id)}
                                                        disabled={extendingId === sub.id}
                                                        className="px-2.5 py-1 rounded bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 text-xs transition-colors flex items-center gap-1 disabled:opacity-50"
                                                        title="הארך ב-30 יום"
                                                    >
                                                        {extendingId === sub.id ? (
                                                            <RefreshCw className="h-3 w-3 animate-spin" />
                                                        ) : (
                                                            <Clock className="h-3 w-3" />
                                                        )}
                                                        +30 יום
                                                    </button>
                                                )}

                                                <button
                                                    onClick={() => setEditingUser(sub)}
                                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-text-muted hover:text-white transition-colors"
                                                    title="ערוך מנוי"
                                                >
                                                    <Edit2 className="h-3.5 w-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}

                            {filteredSubscribers.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-5 py-10 text-center text-text-muted">
                                        לא נמצאו מנויים התואמים לסינון הנוכחי.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </GlassCard>

            {/* Modals */}
            <EditSubscriptionModal
                user={editingUser}
                isOpen={!!editingUser}
                onClose={() => setEditingUser(null)}
                onSuccess={onRefresh}
            />

            <ManualGrantSubscriptionModal
                isOpen={isGrantModalOpen}
                onClose={() => setIsGrantModalOpen(false)}
                onSuccess={onRefresh}
            />
        </div>
    );
}
