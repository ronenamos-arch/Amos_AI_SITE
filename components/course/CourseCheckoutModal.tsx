"use client";

import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Loader2, X, Shield, Sparkles, CheckCircle2 } from "lucide-react";

interface FormData {
    name: string;
    email: string;
    phone: string;
}

interface FormErrors {
    name?: string;
    email?: string;
}

function validateForm(data: FormData): FormErrors {
    const errors: FormErrors = {};
    if (!data.name.trim()) errors.name = "נא להזין שם מלא";
    if (!data.email.trim()) errors.email = "נא להזין כתובת אימייל";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
        errors.email = "כתובת אימייל לא תקינה";
    return errors;
}

export function CourseCheckoutModal({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const [mounted, setMounted] = useState(false);
    const [step, setStep] = useState<1 | 2>(1);
    const [form, setForm] = useState<FormData>({ name: "", email: "", phone: "" });
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitting, setSubmitting] = useState(false);
    const [purchaseId, setPurchaseId] = useState<string | null>(null);
    const [globalError, setGlobalError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const handleContinue = useCallback(async () => {
        const errs = validateForm(form);
        setErrors(errs);
        if (Object.keys(errs).length > 0) return;

        setSubmitting(true);
        setGlobalError(null);

        try {
            const res = await fetch("/api/course/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "שגיאה ביצירת ההזמנה");

            if (data.alreadyPaid) {
                // User already paid — redirect to course directly
                window.location.href = `/courses/ai-master-course?course_token=${data.accessToken}`;
                return;
            }

            setPurchaseId(data.purchaseId);
            setStep(2);
        } catch (err) {
            setGlobalError(err instanceof Error ? err.message : "שגיאה — נסו שנית");
        } finally {
            setSubmitting(false);
        }
    }, [form]);

    const isSandbox = process.env.NEXT_PUBLIC_PAYPAL_SANDBOX === "true";
    const clientId = isSandbox 
        ? process.env.NEXT_PUBLIC_PAYPAL_SANDBOX_CLIENT_ID 
        : process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

    if (!isOpen || !mounted) return null;

    const modalContent = (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn" dir="rtl">
            <div className="relative w-full max-w-lg rounded-3xl bg-space-950 border border-white/15 p-8 sm:p-10 shadow-2xl text-white overflow-hidden">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 left-6 text-white/50 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                    aria-label="סגור"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Header Badge */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-bold bg-teal-500/10 text-teal-400 border-teal-500/20 mb-3 uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>הצטרפות ל-AI Finance Master</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white">
                        {step === 1 ? "פרטי הרשמה וגישה" : "השלמת תשלום מאובטח"}
                    </h3>
                    <div className="mt-2 flex items-center justify-center gap-2 text-sm text-text-muted">
                        <span className="line-through">₪1,300</span>
                        <span className="text-teal-400 font-bold text-xl">₪599</span>
                        <span>בלבד · גישה לכל החיים</span>
                    </div>
                </div>

                {isSuccess ? (
                    <div className="py-12 text-center space-y-4">
                        <div className="w-16 h-16 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto text-teal-400 mb-4 animate-bounce-subtle">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <h4 className="text-2xl font-bold text-white">התשלום עבר בהצלחה! 🎉</h4>
                        <p className="text-text-secondary text-sm">
                            מייל עם פרטי הגישה נשלח אליכם. מעבירים אתכם לעמוד הקורס המלא...
                        </p>
                        <div className="w-8 h-8 border-3 border-teal-400 border-t-transparent rounded-full animate-spin mx-auto mt-4" />
                    </div>
                ) : step === 1 ? (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold mb-1.5 text-slate-200">
                                שם מלא <span className="text-teal-400">*</span>
                            </label>
                            <input
                                type="text"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                placeholder="למשל: ישראל ישראלי"
                                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-teal-400 transition-colors text-right"
                                autoComplete="name"
                            />
                            {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-1.5 text-slate-200">
                                כתובת אימייל (לקבלת הגישה) <span className="text-teal-400">*</span>
                            </label>
                            <input
                                type="email"
                                dir="ltr"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                placeholder="your@email.com"
                                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-teal-400 transition-colors text-right"
                                autoComplete="email"
                            />
                            {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-1.5 text-slate-200">
                                טלפון נייד (לוואטסאפ וליווי)
                            </label>
                            <input
                                type="tel"
                                dir="ltr"
                                value={form.phone}
                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                placeholder="050-0000000"
                                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-teal-400 transition-colors text-right"
                                autoComplete="tel"
                            />
                        </div>

                        {globalError && (
                            <p className="text-center text-sm text-rose-400 bg-rose-500/10 border border-rose-500/20 py-2 rounded-lg">
                                {globalError}
                            </p>
                        )}

                        <button
                            onClick={handleContinue}
                            disabled={submitting}
                            className="w-full py-4 mt-2 rounded-xl font-bold text-lg bg-gradient-to-r from-teal-500 to-royal-500 text-white hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-teal-500/25 flex items-center justify-center gap-2 cursor-pointer"
                        >
                            {submitting ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                "המשך לתשלום מאובטח — ₪599 ←"
                            )}
                        </button>

                        <div className="flex items-center justify-center gap-2 text-xs text-text-muted pt-2">
                            <Shield className="w-4 h-4 text-teal-400" />
                            <span>תשלום מאובטח בתקן SSL · גישה מיידית לכל החיים</span>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="text-center text-sm text-text-secondary mb-2">
                            שלום <strong className="text-white">{form.name}</strong>, השלימו את התשלום ב-PayPal:
                        </div>

                        {clientId ? (
                            <PayPalScriptProvider
                                options={{
                                    clientId,
                                    currency: "ILS",
                                    intent: "capture",
                                }}
                            >
                                <PayPalButtons
                                    style={{
                                        layout: "vertical",
                                        color: "gold",
                                        shape: "rect",
                                        label: "pay",
                                        height: 48,
                                    }}
                                    createOrder={async () => {
                                        const res = await fetch("/api/course/paypal-create", {
                                            method: "POST",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({ purchaseId }),
                                        });
                                        const data = await res.json();
                                        if (!res.ok) throw new Error(data.error || "שגיאה ביצירת הזמנה");
                                        return data.paypalOrderId;
                                    }}
                                    onApprove={async (data) => {
                                        try {
                                            const res = await fetch("/api/course/capture-order", {
                                                method: "POST",
                                                headers: { "Content-Type": "application/json" },
                                                body: JSON.stringify({
                                                    paypalOrderId: data.orderID,
                                                    purchaseId,
                                                }),
                                            });
                                            const result = await res.json();
                                            if (!res.ok) throw new Error(result.error || "שגיאה באישור התשלום");

                                            setIsSuccess(true);
                                            setTimeout(() => {
                                                window.location.href = result.redirectUrl || `/courses/ai-master-course?course_token=${result.accessToken}`;
                                            }, 2000);
                                        } catch (err) {
                                            setGlobalError(err instanceof Error ? err.message : "שגיאה בעיבוד התשלום");
                                        }
                                    }}
                                    onError={() => {
                                        setGlobalError("שגיאה בתשלום דרך PayPal — נסו שנית או פנו לתמיכה");
                                    }}
                                />
                            </PayPalScriptProvider>
                        ) : (
                            <div className="text-center py-6 text-sm text-text-muted">
                                טוען אמצעי תשלום...
                            </div>
                        )}

                        {globalError && (
                            <p className="text-center text-sm text-rose-400 bg-rose-500/10 border border-rose-500/20 py-2 rounded-lg">
                                {globalError}
                            </p>
                        )}

                        <button
                            onClick={() => setStep(1)}
                            className="text-xs text-text-muted hover:text-white mx-auto block underline underline-offset-4 pt-2 transition-colors"
                        >
                            חזרה לעריכת פרטים
                        </button>
                    </div>
                )}
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
