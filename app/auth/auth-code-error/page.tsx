import type { Metadata } from "next";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { AlertCircle } from "lucide-react";

export const metadata: Metadata = {
    title: "הקישור אינו תקף | AI Finance",
    robots: { index: false, follow: false },
};

/**
 * Landing page for failed email links. Both /auth/callback and /auth/confirm
 * redirect here, and previously this route did not exist — a customer whose
 * login link had expired got a 404 with no way forward.
 */
export default function AuthCodeErrorPage() {
    return (
        <div className="flex min-h-screen items-center justify-center px-4 pt-32 pb-20">
            <div className="w-full max-w-md">
                <GlassCard className="p-8 text-center">
                    <AlertCircle className="mx-auto mb-5 h-10 w-10 text-red-400" aria-hidden />
                    <h1 className="mb-3 text-xl font-bold text-text-primary">הקישור אינו תקף יותר</h1>
                    <p className="mb-8 text-sm leading-relaxed text-text-secondary">
                        קישורי הכניסה תקפים לזמן מוגבל ולשימוש חד-פעמי. אפשר לבקש קישור חדש
                        בעמוד ההתחברות — הוא יישלח לאותה כתובת אימייל.
                    </p>
                    <div className="flex flex-col gap-3">
                        <Button href="/login" className="w-full">
                            שליחת קישור כניסה חדש
                        </Button>
                        <Button href="/contact" variant="ghost" className="w-full">
                            צריך עזרה? דברו איתנו
                        </Button>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}
