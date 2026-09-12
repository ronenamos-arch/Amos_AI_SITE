"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { grantManualSubscription } from "@/lib/actions/admin-subscriptions";
import { X, UserPlus, RefreshCw, Sparkles } from "lucide-react";

export function ManualGrantSubscriptionModal({
    isOpen,
    onClose,
    onSuccess,
}: {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}) {
    if (!isOpen) return null;

    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"monthly" | "lifetime">("monthly");
    const [durationDays, setDurationDays] = useState<number>(30);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGrant = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !email.includes("@")) {
            setError("אנא הזן כתובת אימייל תקינה");
            return;
        }

        try {
            setLoading(true);
            setError("");

            await grantManualSubscription(email, status, durationDays);

            setEmail("");
            onSuccess();
            onClose();
        } catch (err: any) {
            setError(err.message || "שגיאה בהענקת המנוי");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" dir="rtl">
            <GlassCard className="w-full max-w-md p-6 relative border-white/20 shadow-2xl">
                <button
                    onClick={onClose}
                    className="absolute top-4 left-4 p-1.5 rounded-lg text-text-muted hover:text-white hover:bg-white/10 transition-colors"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400">
                        <UserPlus className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">הענקת מנוי ידני</h3>
                        <p className="text-xs text-text-muted">ללקוחות VIP, סליקה ידנית או שיתופי פעולה</p>
                    </div>
                </div>

                {error && (
                    <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                        {error}
                    </div>
                )}

                <form onSubmit={handleGrant} className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-text-secondary mb-1.5">
                            כתובת אימייל של הלקוח
                        </label>
                        <input
                            type="email"
                            required
                            placeholder="customer@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-lg bg-[#0f172a] border border-white/15 px-3 py-2 text-sm text-white placeholder-text-muted focus:outline-none focus:border-teal-400"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-text-secondary mb-1.5">
                            סוג המנוי
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                type="button"
                                onClick={() => setStatus("monthly")}
                                className={`p-3 rounded-lg text-xs font-medium border text-center transition-all ${
                                    status === "monthly"
                                        ? "bg-teal-500/20 border-teal-400 text-white shadow-sm"
                                        : "bg-white/5 border-white/10 text-text-secondary hover:text-white"
                                }`}
                            >
                                מנוי מוגבל בזמן
                            </button>
                            <button
                                type="button"
                                onClick={() => setStatus("lifetime")}
                                className={`p-3 rounded-lg text-xs font-medium border text-center transition-all ${
                                    status === "lifetime"
                                        ? "bg-purple-500/20 border-purple-400 text-white shadow-sm"
                                        : "bg-white/5 border-white/10 text-text-secondary hover:text-white"
                                }`}
                            >
                                מנוי לכל החיים (Lifetime)
                            </button>
                        </div>
                    </div>

                    {status === "monthly" && (
                        <div>
                            <label className="block text-xs font-medium text-text-secondary mb-1.5">
                                משך המנוי
                            </label>
                            <select
                                value={durationDays}
                                onChange={(e) => setDurationDays(Number(e.target.value))}
                                className="w-full rounded-lg bg-[#0f172a] border border-white/15 px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-400"
                            >
                                <option value={30}>חודש אחד (30 ימים)</option>
                                <option value={60}>חודשיים (60 ימים)</option>
                                <option value={90}>3 חודשים (90 ימים)</option>
                                <option value={180}>חצי שנה (180 ימים)</option>
                                <option value={365}>שנה שלמה (365 ימים)</option>
                            </select>
                        </div>
                    )}

                    <div className="mt-6 flex items-center justify-end gap-3 border-t border-white/10 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-xs font-medium text-text-muted hover:text-white transition-colors"
                        >
                            ביטול
                        </button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="px-5 py-2 text-xs font-semibold bg-teal-500 hover:bg-teal-400 text-black flex items-center gap-2"
                        >
                            {loading ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
                            הענק גישה עכשיו
                        </Button>
                    </div>
                </form>
            </GlassCard>
        </div>
    );
}
