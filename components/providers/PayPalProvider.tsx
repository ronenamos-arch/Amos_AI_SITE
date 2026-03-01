"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ReactNode } from "react";

interface PayPalProviderProps {
    children: ReactNode;
}

export function PayPalProvider({ children }: PayPalProviderProps) {
    const isSandbox = process.env.NEXT_PUBLIC_PAYPAL_SANDBOX === 'true';
    const clientId = isSandbox
        ? process.env.NEXT_PUBLIC_PAYPAL_SANDBOX_CLIENT_ID
        : process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

    if (!clientId) {
        console.error("PayPal Client ID is missing");
        return <>{children}</>;
    }

    return (
        <PayPalScriptProvider
            options={{
                clientId: clientId.trim(),
                currency: "ILS",
                vault: true,
            }}
        >
            {children}
        </PayPalScriptProvider>
    );
}
