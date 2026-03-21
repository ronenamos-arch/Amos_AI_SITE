"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type ConsentStatus = "granted" | "denied";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

function updateGtagConsent(status: ConsentStatus) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: status,
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cookie-consent") as ConsentStatus | null;
    if (stored) {
      updateGtagConsent(stored);
    } else {
      setVisible(true);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem("cookie-consent", "granted");
    updateGtagConsent("granted");
    setVisible(false);
  }

  function handleDecline() {
    localStorage.setItem("cookie-consent", "denied");
    updateGtagConsent("denied");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      dir="rtl"
      className="fixed bottom-0 inset-x-0 z-50 bg-gray-900/95 backdrop-blur border-t border-white/10 px-4 py-4 sm:px-6"
      role="dialog"
      aria-label="הסכמה לעוגיות"
    >
      <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 text-sm text-gray-300 leading-relaxed">
          <span className="font-semibold text-white">אנו משתמשים בעוגיות</span>{" "}
          לצורך ניתוח תנועה באתר (Google Analytics) ושיפור חוויית המשתמש. לא נשתמש בעוגיות לפרסום.{" "}
          <Link
            href="/legal#cookies"
            className="text-teal-400 hover:text-teal-300 underline underline-offset-2 whitespace-nowrap"
          >
            מדיניות עוגיות
          </Link>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm rounded-lg border border-white/20 text-gray-300 hover:bg-white/10 transition-colors"
          >
            דחייה
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm rounded-lg bg-teal-500 hover:bg-teal-400 text-white font-semibold transition-colors"
          >
            אני מסכים
          </button>
        </div>
      </div>
    </div>
  );
}
