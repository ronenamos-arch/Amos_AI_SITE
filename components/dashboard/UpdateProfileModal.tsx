"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { X, User, Phone, Mail, Lock, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface UpdateProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData: {
        id: string;
        email: string;
        fullName?: string;
        phone?: string;
    };
    onUpdated?: (fullName: string, phone: string) => void;
}

export function UpdateProfileModal({ isOpen, onClose, initialData, onUpdated }: UpdateProfileModalProps) {
    const [fullName, setFullName] = useState(initialData.fullName || "");
    const [phone, setPhone] = useState(initialData.phone || "");
    const [loading, setLoading] = useState(false);
    const [resetEmailSent, setResetEmailSent] = useState(false);
    const [resetLoading, setResetLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const supabase = createClient();

            // 1. Update Auth user metadata
            const { error: authError } = await supabase.auth.updateUser({
                data: {
                    full_name: fullName.trim(),
                    phone: phone.trim(),
                },
            });

            if (authError) throw authError;

            setMessage({ type: "success", text: "הפרטים עודכנו בהצלחה במערכת!" });
            if (onUpdated) {
                onUpdated(fullName.trim(), phone.trim());
            }

            setTimeout(() => {
                onClose();
            }, 1500);
        } catch (err: any) {
            console.error("Error updating profile:", err);
            setMessage({ type: "error", text: err.message || "אירעה שגיאה בעדכון הפרטים" });
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordReset = async () => {
        setResetLoading(true);
        setMessage(null);
        try {
            const supabase = createClient();
            const { error } = await supabase.auth.resetPasswordForEmail(initialData.email, {
                redirectTo: `${window.location.origin}/dashboard`,
            });
            if (error) throw error;
            setResetEmailSent(true);
            setMessage({ type: "success", text: `קישור לאיפוס סיסמה נשלח אל ${initialData.email}` });
        } catch (err: any) {
            console.error("Error sending reset password:", err);
            setMessage({ type: "error", text: err.message || "שגיאה בשליחת קישור לאיפוס סיסמה" });
        } finally {
            setResetLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-lg rounded-2xl bg-space-950 border border-white/10 p-6 md:p-8 shadow-2xl text-right">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 left-4 p-2 text-text-muted hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-xl bg-teal-400/10 flex items-center justify-center border border-teal-400/20 text-teal-400">
                        <User className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">עדכון פרטים אישיים</h2>
                        <p className="text-xs text-text-secondary">נהל את שמך, מספר הטלפון והסיסמה</p>
                    </div>
                </div>

                {message && (
                    <div
                        className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm ${
                            message.type === "success"
                                ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                                : "bg-red-500/10 border border-red-500/20 text-red-400"
                        }`}
                    >
                        {message.type === "success" ? (
                            <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                        ) : (
                            <AlertCircle className="h-5 w-5 flex-shrink-0" />
                        )}
                        <span>{message.text}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email (Read only) */}
                    <div>
                        <label className="block text-xs font-semibold text-text-muted mb-1.5">כתובת אימייל (לקריאה בלבד)</label>
                        <div className="relative">
                            <input
                                type="email"
                                value={initialData.email}
                                disabled
                                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-text-muted cursor-not-allowed pl-10 text-right"
                                dir="ltr"
                            />
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-text-muted" />
                        </div>
                    </div>

                    {/* Full Name */}
                    <div>
                        <label className="block text-xs font-semibold text-text-secondary mb-1.5">שם מלא</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="לדוגמה: ישראל ישראלי"
                                className="w-full rounded-xl bg-space-900 border border-white/15 px-4 py-2.5 text-sm text-white focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400 transition-all text-right"
                            />
                            <User className="absolute left-3 top-3 h-4 w-4 text-text-muted" />
                        </div>
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-xs font-semibold text-text-secondary mb-1.5">מספר טלפון</label>
                        <div className="relative">
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="לדוגמה: 050-1234567"
                                className="w-full rounded-xl bg-space-900 border border-white/15 px-4 py-2.5 text-sm text-white focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400 transition-all text-right"
                                dir="ltr"
                            />
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-text-muted" />
                        </div>
                    </div>

                    {/* Password reset section */}
                    <div className="pt-2 border-t border-white/10 mt-6">
                        <div className="flex items-center justify-between py-2">
                            <div>
                                <p className="text-sm font-semibold text-white">איפוס סיסמה</p>
                                <p className="text-xs text-text-muted">שליחת קישור מאובטח לאיפוס סיסמה לאימייל שלך</p>
                            </div>
                            <button
                                type="button"
                                onClick={handlePasswordReset}
                                disabled={resetLoading || resetEmailSent}
                                className="px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-medium text-teal-400 transition-colors flex items-center gap-1.5 disabled:opacity-50"
                            >
                                {resetLoading ? (
                                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                ) : (
                                    <Lock className="h-3.5 w-3.5" />
                                )}
                                {resetEmailSent ? "נשלח מייל" : "שלח קישור"}
                            </button>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="pt-6 flex gap-3 justify-end border-t border-white/10">
                        <Button type="button" variant="ghost" onClick={onClose} disabled={loading}>
                            ביטול
                        </Button>
                        <Button type="submit" variant="primary" disabled={loading}>
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    שומר...
                                </span>
                            ) : (
                                "שמור שינויים"
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
