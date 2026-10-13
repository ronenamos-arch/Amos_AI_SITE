"use client";

import { useEffect } from "react";
import { trackPurchase } from "@/lib/analytics";
import { trackMeta } from "@/lib/metaPixel";

const STORAGE_KEY = "thanks_purchase_tracked";

export function ThanksTracker() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) {
        return;
      }

      const consent = localStorage.getItem("cookie-consent") === "granted";
      if (!consent) return;

      // Track purchase event for generic successful order/subscription
      trackPurchase({
        transactionId: `order_${Date.now().toString(36)}`,
        value: 100,
        currency: "ILS",
        provider: "direct",
        items: [
          {
            item_name: "רכישה באתר AI Finance",
            price: 100,
            quantity: 1,
          },
        ],
      });

      trackMeta("Purchase", {
        value: 100,
        currency: "ILS",
        content_name: "ai_finance_purchase",
      });

      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Fallback for private browsing
    }
  }, []);

  return null;
}
