"use client";

import { X, CreditCard, ExternalLink, Receipt, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface PaymentItem {
    id: string;
    title: string;
    amount: number;
    currency: string;
    status: "paid" | "completed" | "pending" | "failed";
    date: string;
    provider?: string;
    invoiceUrl?: string | null;
    invoiceNumber?: string | null;
}

interface PaymentHistoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    payments: PaymentItem[];
}

export function PaymentHistoryModal({ isOpen, onClose, payments }: PaymentHistoryModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl bg-space-950 border border-white/10 p-6 md:p-8 shadow-2xl text-right overflow-hidden">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 left-4 p-2 text-text-muted hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-xl bg-teal-400/10 flex items-center justify-center border border-teal-400/20 text-teal-400">
                        <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">היסטוריית תשלומים וקבלות</h2>
                        <p className="text-xs text-text-secondary">ריכוז כל הרכישות, המנויים והחשבוניות שלך</p>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto pr-1 space-y-3 custom-scrollbar">
                    {payments.length === 0 ? (
                        <div className="py-12 text-center border border-dashed border-white/10 rounded-xl bg-white/[0.02]">
                            <Receipt className="h-10 w-10 text-text-muted mx-auto mb-3 opacity-40" />
                            <p className="text-sm font-medium text-white mb-1">לא נמצאו רשומות תשלום</p>
                            <p className="text-xs text-text-muted">
                                כאשר תבצע רכישת קורס או מנוי, כל הקבלות והחשבוניות יופיעו כאן.
                            </p>
                        </div>
                    ) : (
                        payments.map((payment) => {
                            const isSuccess = payment.status === "paid" || payment.status === "completed";
                            return (
                                <div
                                    key={payment.id}
                                    className="p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                                >
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-sm font-bold text-white">{payment.title}</h3>
                                            {isSuccess ? (
                                                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                                                    <CheckCircle2 className="h-3 w-3" />
                                                    שולם
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                                                    <Clock className="h-3 w-3" />
                                                    בהמתנה
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-3 text-xs text-text-muted">
                                            <span>{new Date(payment.date).toLocaleDateString("he-IL")}</span>
                                            {payment.provider && (
                                                <>
                                                    <span>•</span>
                                                    <span>ספק: {payment.provider}</span>
                                                </>
                                            )}
                                            {payment.invoiceNumber && (
                                                <>
                                                    <span>•</span>
                                                    <span>חשבונית #{payment.invoiceNumber}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-white/5">
                                        <div className="text-left font-mono font-bold text-base text-white">
                                            {payment.currency === "ILS" ? "₪" : payment.currency}
                                            {payment.amount.toLocaleString()}
                                        </div>

                                        {payment.invoiceUrl ? (
                                            <a
                                                href={payment.invoiceUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-teal-400/30 bg-teal-400/10 hover:bg-teal-400/20 text-xs font-semibold text-teal-300 transition-colors"
                                            >
                                                <span>הורד חשבונית</span>
                                                <ExternalLink className="h-3.5 w-3.5" />
                                            </a>
                                        ) : (
                                            <span className="text-[11px] text-text-muted italic">קבלה נשלחה במייל</span>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                <div className="pt-6 border-t border-white/10 mt-4 flex justify-between items-center text-xs text-text-muted">
                    <span>שאלות בנוגע לחשבוניות? צור קשר עם שירות הלקוחות</span>
                    <Button variant="ghost" size="sm" onClick={onClose}>
                        סגור
                    </Button>
                </div>
            </div>
        </div>
    );
}
