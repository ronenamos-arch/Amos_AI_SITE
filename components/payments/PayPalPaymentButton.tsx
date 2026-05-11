"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useState, useEffect } from "react";
import { updateUserSubscription, createGuestPayment } from "@/lib/actions/subscription";
import { createClient } from "@/lib/supabase/client";

interface PayPalPaymentButtonProps {
    amount: string;
    onSuccess?: (details: any) => void;
    planId?: string; // For subscriptions
    subscriptionType?: 'monthly' | 'lifetime';
}

export function PayPalPaymentButton({ amount, onSuccess, planId, subscriptionType }: PayPalPaymentButtonProps) {
    const [{ isPending }] = usePayPalScriptReducer();
    const [error, setError] = useState<string | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);

    useEffect(() => {
        const supabase = createClient();
        supabase.auth.getUser().then(({ data: { user } }) => {
            setIsLoggedIn(!!user);
            setUserEmail(user?.email || null);
        });
    }, []);

    if (isLoggedIn === null || isPending || isUpdating) return (
        <div className="h-12 w-full flex items-center justify-center bg-white/5 rounded-xl">
            <div className="animate-spin h-5 w-5 border-2 border-teal-400 border-t-transparent rounded-full" />
            <span className="mr-3 text-sm text-text-muted">מעדכן נתונים...</span>
        </div>
    );

    // Handle placeholder Plan ID for development
    if (planId === "P-NOT-SET-YET") {
        return (
            <div className="p-4 border border-dashed border-teal-500/30 rounded-xl bg-teal-500/5 text-center">
                <p className="text-sm text-text-secondary">
                    אנא הגדר Plan ID ב-PayPal Developer להפעלת המנוי.
                </p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md mx-auto">
            {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg text-center font-medium">
                    {error}
                </div>
            )}

            <PayPalButtons
                style={{
                    layout: "vertical",
                    color: "blue",
                    shape: "pill",
                    label: planId ? "subscribe" : "pay",
                }}
                createOrder={
                    planId
                        ? undefined
                        : (data, actions) => {
                            return actions.order.create({
                                intent: "CAPTURE",
                                purchase_units: [
                                    {
                                        amount: {
                                            currency_code: "ILS",
                                            value: amount,
                                        },
                                    },
                                ],
                            });
                        }
                }
                createSubscription={
                    planId
                        ? (data, actions) => {
                            return actions.subscription.create({
                                plan_id: planId,
                            });
                        }
                        : undefined
                }
                onApprove={async (data, actions) => {
                    try {
                        setIsUpdating(true);
                        let orderId = "";
                        let details: any = null;
                        let payerEmail = userEmail;

                        if (planId) {
                            orderId = data.subscriptionID || data.orderID || "";
                            details = data;
                        } else if (actions.order) {
                            details = await actions.order.capture();
                            orderId = details.id;
                        }

                        // For subscription payments, try to get payer email from PayPal details
                        if (!payerEmail && details?.payer?.email_address) {
                            payerEmail = details.payer.email_address;
                        }

                        // If logged in: update subscription for authenticated user
                        if (isLoggedIn && subscriptionType) {
                            await updateUserSubscription(subscriptionType, orderId, parseFloat(amount));
                        }
                        // If guest: record payment with email, webhook will handle user creation
                        else if (!isLoggedIn && subscriptionType && payerEmail) {
                            await createGuestPayment(payerEmail, orderId, parseFloat(amount), subscriptionType);
                        }

                        if (onSuccess) onSuccess(details);

                        // Redirect to thank-you page
                        window.location.href = '/thanks';
                    } catch (err: any) {
                        console.error("Payment approval error:", err);
                        setError("התשלום הצליח אך חלה שגיאה בעדכון הפרופיל. פנה לתמיכה.");
                    } finally {
                        setIsUpdating(false);
                    }
                }}
                onError={(err) => {
                    console.error("PayPal Error:", err);
                    setError("חלה שגיאה בתהליך התשלום. אנא נסה שוב.");
                }}
            />
        </div>
    );
}
