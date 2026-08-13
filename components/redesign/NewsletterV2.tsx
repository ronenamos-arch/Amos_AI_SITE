"use client";

import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

export function NewsletterV2() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setStatus("error");
            return;
        }
        setStatus("loading");
        try {
            const { subscribeToNewsletter } = await import("@/lib/actions/newsletter");
            const res = await subscribeToNewsletter(email, "home");
            setStatus(res?.success === false ? "error" : "success");
        } catch {
            setStatus("error");
        }
    }

    if (status === "success") {
        return (
            <div className="flex items-center gap-2 text-[var(--rv2-accent-strong)]">
                <CheckCircle2 size={20} />
                <span>נרשמת בהצלחה — המדריך הראשון כבר בדרך אליך.</span>
            </div>
        );
    }

    return (
        <form onSubmit={onSubmit} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <input
                type="email"
                dir="ltr"
                className="rv2-input"
                placeholder="you@company.co.il"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="אימייל"
                required
            />
            <button type="submit" className="rv2-btn rv2-btn-primary" disabled={status === "loading"}>
                {status === "loading" ? <Loader2 size={18} className="animate-spin" /> : "הרשמה חינם"}
            </button>
            {status === "error" && (
                <p className="text-sm text-red-400 sm:hidden">משהו השתבש — נסו שוב.</p>
            )}
        </form>
    );
}
