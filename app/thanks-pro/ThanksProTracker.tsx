"use client";

import { useEffect } from "react";
import { trackMeta } from "@/lib/metaPixel";
import { trackPurchase } from "@/lib/analytics";

const STORAGE_KEY = "meta_pixel_subscribe_pro_tracked";

export function ThanksProTracker() {
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;
    let attempts = 0;

    const attemptTrack = () => {
      try {
        if (sessionStorage.getItem(STORAGE_KEY)) {
          if (intervalId) clearInterval(intervalId);
          return true;
        }

        const consent = localStorage.getItem("cookie-consent") === "granted";
        if (!consent) return false;

        // Send GA4 Purchase event for SmartBee Pro Monthly subscription
        trackPurchase({
          transactionId: `sb_pro_${Date.now().toString(36)}`,
          value: 100,
          currency: "ILS",
          provider: "smartbee",
          items: [
            {
              item_name: "מנוי חודשי AI Finance Pro",
              price: 100,
              quantity: 1,
              item_category: "subscription",
            },
          ],
        });

        if (typeof window !== "undefined" && typeof window.fbq === "function") {
          // Send Meta Pixel Subscribe standard event with no PII
          trackMeta("Subscribe", {
            value: 100,
            currency: "ILS",
            content_name: "pro_monthly",
          });
        }

        sessionStorage.setItem(STORAGE_KEY, "1");
        if (intervalId) clearInterval(intervalId);
        return true;
      } catch {
        // Fallback for private browsing
      }
      return false;
    };

    const success = attemptTrack();

    if (!success) {
      intervalId = setInterval(() => {
        attempts++;
        if (attemptTrack() || attempts > 25) {
          if (intervalId) clearInterval(intervalId);
        }
      }, 200);
    }

    const handleConsentChange = () => {
      attemptTrack();
    };

    window.addEventListener("cookie-consent-change", handleConsentChange);

    return () => {
      if (intervalId) clearInterval(intervalId);
      window.removeEventListener("cookie-consent-change", handleConsentChange);
    };
  }, []);

  return null;
}
