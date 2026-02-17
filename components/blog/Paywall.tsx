import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Lock, Sparkles } from "lucide-react";

interface PaywallProps {
    title?: string;
    description?: string;
}

export function Paywall({
    title = "תוכן הפרימיום נעול",
    description = "הצטרף לקהילת ה-AI FINANCE שלנו כדי לקבל גישה למדריכים בלעדיים, פרומפטים מוכנים וניתוחי עומק."
}: PaywallProps) {
    return (
        <div className="relative mt-8">
            {/* Fade overlay for content above */}
            <div className="absolute -top-32 left-0 right-0 h-32 bg-gradient-to-t from-space-950 to-transparent z-10" />

            <GlassCard className="relative z-20 p-10 text-center border-t-2 border-royal-500/50 shadow-2xl shadow-royal-500/10">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-royal-500/10 border border-royal-500/20">
                    <Lock className="h-8 w-8 text-royal-400" />
                </div>

                <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
                    {title}
                    <Sparkles className="h-5 w-5 text-teal-400" />
                </h2>

                <p className="text-text-secondary mb-8 max-w-md mx-auto leading-relaxed">
                    {description}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button href="/login" size="lg" className="w-full sm:w-auto min-w-[200px]">
                        התחבר לקבלת גישה
                    </Button>
                    <Button href="/pricing" variant="ghost" size="lg" className="w-full sm:w-auto">
                        למד על מסלולי הפרימיום
                    </Button>
                </div>

                <p className="mt-8 text-xs text-text-muted">
                    כבר רשום? <a href="/login" className="text-teal-400 hover:underline">היכנס כאן</a>
                </p>
            </GlassCard>
        </div>
    );
}
