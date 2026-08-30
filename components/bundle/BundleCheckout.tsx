"use client";

import { useState, useCallback } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Loader2 } from "lucide-react";

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
    if (!data.email.trim()) errors.email = "נא להזין אימייל";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
        errors.email = "כתובת אימייל לא תקינה";
    return errors;
}

export function BundleCheckout() {
    const [step, setStep] = useState<1 | 2>(1);
    const [form, setForm] = useState<FormData>({ name: "", email: "", phone: "" });
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitting, setSubmitting] = useState(false);
    const [purchaseId, setPurchaseId] = useState<string | null>(null);
    const [globalError, setGlobalError] = useState<string | null>(null);

    const handleContinue = useCallback(async () => {
        const errs = validateForm(form);
        setErrors(errs);
        if (Object.keys(errs).length > 0) return;

        setSubmitting(true);
        setGlobalError(null);

        try {
            const res = await fetch("/api/bundle/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "שגיאה ביצירת ההזמנה");

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

    return (
        <div className="text-right">
            {/* Step indicator */}
            <div className="mb-6 flex items-center justify-center gap-3">
                <span className={`bundle-step-dot ${step >= 1 ? "is-active" : ""}`} />
                <div className="h-px w-8 bg-[var(--rv2-border)]" />
                <span className={`bundle-step-dot ${step >= 2 ? "is-active" : ""}`} />
            </div>

            {step === 1 && (
                <div className="space-y-4">
                    <div className="text-center text-sm text-[var(--rv2-text-2)] mb-4">
                        הזינו פרטים לקבלת גישה
                    </div>

                    {/* Name */}
                    <div>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="שם מלא"
                            className="bundle-form-input"
                            autoComplete="name"
                        />
                        {errors.name && <p className="bundle-form-error">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <input
                            type="email"
                            dir="ltr"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="email@example.com"
                            className="bundle-form-input"
                            autoComplete="email"
                        />
                        {errors.email && <p className="bundle-form-error">{errors.email}</p>}
                    </div>

                    {/* Phone (optional) */}
                    <div>
                        <input
                            type="tel"
                            dir="ltr"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            placeholder="טלפון (אופציונלי)"
                            className="bundle-form-input"
                            autoComplete="tel"
                        />
                    </div>

                    {globalError && (
                        <p className="text-center text-sm text-red-400">{globalError}</p>
                    )}

                    <button
                        onClick={handleContinue}
                        disabled={submitting}
                        className="rv2-btn rv2-btn-primary w-full py-3"
                    >
                        {submitting ? (
                            <Loader2 size={18} className="animate-spin" />
                        ) : (
                            "המשך לתשלום"
                        )}
                    </button>
                </div>
            )}

            {step === 2 && clientId && (
                <div className="space-y-4">
                    <div className="text-center text-sm text-[var(--rv2-text-2)] mb-4">
                        👋 {form.name}, השלימו את התשלום דרך PayPal
                    </div>

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
                                color: "blue",
                                shape: "rect",
                                label: "pay",
                                height: 50,
                            }}
                            createOrder={async () => {
                                // The order was already created in step 1 and stored
                                // as a purchase record. Now create the actual PayPal order.
                                const res = await fetch("/api/bundle/paypal-create", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ purchaseId }),
                                });
                                const data = await res.json();
                                if (!res.ok)
                                    throw new Error(data.error || "PayPal order creation failed");
                                return data.paypalOrderId;
                            }}
                            onApprove={async (data) => {
                                try {
                                    const res = await fetch("/api/bundle/capture-order", {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({
                                            paypalOrderId: data.orderID,
                                            purchaseId,
                                        }),
                                    });
                                    const result = await res.json();
                                    if (!res.ok)
                                        throw new Error(
                                            result.error || "Payment capture failed"
                                        );

                                    // Redirect to thanks page with token
                                    window.location.href = `/claude-bundle/thanks?token=${result.accessToken}`;
                                } catch (err) {
                                    setGlobalError(
                                        err instanceof Error
                                            ? err.message
                                            : "שגיאה בעיבוד התשלום — נסו שנית"
                                    );
                                }
                            }}
                            onError={() => {
                                setGlobalError("שגיאה בתשלום — נסו שנית או צרו קשר");
                            }}
                        />
                    </PayPalScriptProvider>

                    {globalError && (
                        <p className="text-center text-sm text-red-400">{globalError}</p>
                    )}

                    <button
                        onClick={() => setStep(1)}
                        className="rv2-link mx-auto block text-xs underline underline-offset-4"
                    >
                        חזרה לעריכת פרטים
                    </button>
                </div>
            )}
        </div>
    );
}
