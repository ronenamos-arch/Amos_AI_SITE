"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { SubscriptionProfile, updateSubscriberStatus } from "@/lib/actions/admin-subscriptions";
import { X, Calendar, ShieldCheck, RefreshCw, Plus } from "lucide-react";

export function EditSubscriptionModal({
    user,
    isOpen,
    onClose,
    onSuccess,
}: {
    user: SubscriptionProfile | null;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}) {
    if (!isOpen || !user) return null;

    const [status, setStatus] = useState<string>(user.subscription_status || "free");
    const [endDate, setEndDate] = useState<string>(
        user.subscription_end_date ? user.subscription_end_date.split("T")[0] : ""
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleAddDays = (days: number) => {
        const base = endDate ? new Date(endDate) : new Date();
        const future = new Date(base.getTime() + days * 24 * 60 * 60 * 1000);
        setEndDate(future.toISOString().split("T")[0]);
        if (status === "free" || status === "cancelled") {
            setStatus("monthly");
        }
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            setError("");

            const formattedEndDate = status === "lifetime"
                ? null
                : endDate
                ? new Date(endDate).toISOString()
                : null;

            await updateSubscriberStatus(user.id, {
                status,
                subscription_end_date: formattedEndDate,
            });

            onSuccess();
            onClose();
        } catch (err: any) {
            setError(err.message || "שגיאה בעדכון המנוי");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" dir="rtl">
            <GlassCard className="w-full max-w-lg p-6 relative border-white/20 shadow-2xl">
                <button
                    onClick={onClose}
                    className="absolute top-4 left-4 p-1.5 rounded-lg text-text-muted hover:text-white hover:bg-white/10 transition-colors"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="flex items-center gap-2 mb-4">
                    <ShieldCheck className="h-5 w-5 text-teal-400" />
                    <h3 className="text-lg font-bold text-white">עריכת מנוי משתמש</h3>
                </div>

                <div className="p-3 mb-5 rounded-lg bg-white/5 border border-white/10 text-xs">
                    <p className="text-text-muted">אימייל: <span className="text-white font-medium">{user.email || "ללא אימייל"}</span></p>
                    <p className="text-text-muted mt-1">מזהה משתמש: <span className="text-white font-mono">{user.id}</span></p>
                    {user.paypal_subscription_id && (
                        <p className="text-text-muted mt-1">PayPal ID: <span className="text-teal-400 font-mono">{user.paypal_subscription_id}</span></p>
                    )}
                </div>

                {error && (
                    <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-text-secondary mb-1.5">
                            סטטוס מנוי
                        </label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full rounded-lg bg-[#0f172a] border border-white/15 px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-400"
                        >
                            <option value="monthly">חודשי (Monthly PRO - ₪100)</option>
                            <option value="lifetime">לכל החיים (Lifetime PRO)</option>
                            <option value="cancelled">בוטל (Cancelled / Grace Period)</option>
                            <option value="payment_failed">כשל בתשלום (Payment Failed)</option>
                            <option value="free">חינמי (Free - ללא גישה למנוי)</option>
                        </select>
                    </div>

                    {status !== "lifetime" && (
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="block text-xs font-medium text-text-secondary">
                                    תאריך סיום תקופת הגישה
                                </label>
                                <span className="text-[11px] text-text-muted">תקופת חסד / חידוש</span>
                            </div>

                            <div className="flex items-center gap-2 mb-2">
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="flex-1 rounded-lg bg-[#0f172a] border border-white/15 px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-400"
                                />
                                {endDate && (
                                    <button
                                        type="button"
                                        onClick={() => setEndDate("")}
                                        className="text-xs text-text-muted hover:text-white px-2 py-1"
                                    >
                                        איפוס
                                    </button>
                                )}
                            </div>

                            {/* Quick Add Days */}
                            <div className="flex items-center gap-1.5">
                                <span className="text-[11px] text-text-muted">הארכה מהירה:</span>
                                <button
                                    type="button"
                                    onClick={() => handleAddDays(7)}
                                    className="px-2 py-0.5 text-xs rounded bg-white/10 hover:bg-white/15 text-white transition-colors flex items-center gap-1"
                                >
                                    <Plus className="h-2.5 w-2.5" /> 7 ימים
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleAddDays(14)}
                                    className="px-2 py-0.5 text-xs rounded bg-white/10 hover:bg-white/15 text-white transition-colors flex items-center gap-1"
                                >
                                    <Plus className="h-2.5 w-2.5" /> 14 ימים
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleAddDays(30)}
                                    className="px-2 py-0.5 text-xs rounded bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 transition-colors flex items-center gap-1"
                                >
                                    <Plus className="h-2.5 w-2.5" /> 30 ימים
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-6 flex items-center justify-end gap-3 border-t border-white/10 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-xs font-medium text-text-muted hover:text-white transition-colors"
                    >
                        ביטול
                    </button>
                    <Button
                        onClick={handleSave}
                        disabled={loading}
                        className="px-5 py-2 text-xs font-semibold bg-teal-500 hover:bg-teal-400 text-black flex items-center gap-2"
                    >
                        {loading ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : null}
                        שמור שינויים
                    </Button>
                </div>
            </GlassCard>
        </div>
    );
}
