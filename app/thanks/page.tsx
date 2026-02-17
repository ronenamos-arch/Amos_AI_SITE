import type { Metadata } from "next";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, ArrowRight, BookOpen, Crown } from "lucide-react";

export const metadata: Metadata = {
    title: "תודה רבה! | AI FINANCE",
    description: "תודה על הצטרפותך לקהילת AI FINANCE PRO. הגישה שלך תאושר בהקדם.",
};

export default function ThankYouPage() {
    return (
        <div className="pt-24 pb-16 min-h-[80vh] flex items-center">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <GlassCard className="p-8 md:p-12 text-center border-t-4 border-teal-400">
                    <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-teal-400/10">
                        <CheckCircle2 className="h-10 w-10 text-teal-400 animate-wow" />
                    </div>

                    <h1 className="text-4xl font-bold mb-4">תודה על הצטרפותך!</h1>
                    <p className="text-xl text-text-secondary mb-8 leading-relaxed">
                        התשלום התקבל בהצלחה ב-PayPal. <br />
                        אנחנו מבצעים כעת סנכרון של החשבון שלך.
                    </p>

                    <div className="grid gap-6 md:grid-cols-2 mb-10 text-right" dir="rtl">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                            <div className="flex items-center gap-3 mb-2">
                                <Crown className="h-5 w-5 text-royal-400" />
                                <h3 className="font-bold">מה קורה עכשיו?</h3>
                            </div>
                            <p className="text-sm text-text-secondary">
                                המערכת תשלח לך אישור למייל. הגישה לתכני הפרימיום תפתח תוך דקות ספורות (במקסימום עד שעה).
                            </p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                            <div className="flex items-center gap-3 mb-2">
                                <BookOpen className="h-5 w-5 text-teal-400" />
                                <h3 className="font-bold">לאן כדאי להיכנס?</h3>
                            </div>
                            <p className="text-sm text-text-secondary">
                                אנחנו ממליצים להתחיל מהמדריך "הטמעת AI בביקורת" שנמצא בבלוג הפרימיום.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button href="/dashboard" size="lg" className="w-full sm:w-auto">
                            עבור לאזור האישי
                        </Button>
                        <Button href="/blog" variant="secondary" size="lg" className="w-full sm:w-auto">
                            גלוש בבלוג
                            <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                        </Button>
                    </div>

                    <p className="mt-12 text-xs text-text-muted">
                        יש לך שאלה דחופה? אני כאן בשבילך גם ב- <a href="https://wa.me/972505500344" className="text-teal-400 hover:underline">WhatsApp</a>
                    </p>
                </GlassCard>
            </div>
        </div>
    );
}
