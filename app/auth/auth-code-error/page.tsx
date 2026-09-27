import type { Metadata } from "next";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { AlertCircle, Chrome, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
    title: "הקישור אינו תקף | AI Finance",
    robots: { index: false, follow: false },
};

/**
 * Landing page for failed email links. Both /auth/callback and /auth/confirm
 * redirect here, providing multiple immediate paths to login without frustration.
 */
export default function AuthCodeErrorPage() {
    return (
        <div className="flex min-h-screen items-center justify-center px-4 pt-32 pb-20">
            <div className="w-full max-w-md">
                <GlassCard className="p-8 text-center">
                    <AlertCircle className="mx-auto mb-5 h-12 w-12 text-amber-400" aria-hidden />
                    <h1 className="mb-3 text-xl font-bold text-text-primary">הקישור אינו תקף או שפג תוקפו</h1>
                    <p className="mb-6 text-sm leading-relaxed text-text-secondary">
                        קישורי הכניסה למייל הם חד-פעמיים ולעתים נסרקים מראש ע&quot;י מנגנוני אבטחה ארגוניים.
                        באפשרותכם להיכנס בקלות באחת מהדרכים הבאות:
                    </p>

                    <div className="flex flex-col gap-3">
                        <Button href="/login" className="w-full gap-2">
                            <Chrome className="h-4 w-4" />
                            התחברות באמצעות Google / אימייל
                        </Button>

                        <a
                            href="https://wa.me/972544706511?text=%D7%94%D7%99%20%D7%A8%D7%95%D7%A0%D7%9F%2C%20%D7%A0%D7%AA%D7%A7%D7%9C%D7%AA%D7%99%20%D7%91%D7%91%D7%A2%D7%99%D7%94%20%D7%91%D7%9B%D7%A0%D7%99%D7%A1%D7%94%20%D7%9C%D7%90%D7%AA%D7%A8"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                        >
                            <MessageCircle className="h-4 w-4" />
                            פנייה מהירה לתמיכה בוואטסאפ
                        </a>

                        <Button href="/contact" variant="ghost" className="w-full text-xs text-text-muted">
                            פנייה בטופס יצירת קשר
                        </Button>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}

