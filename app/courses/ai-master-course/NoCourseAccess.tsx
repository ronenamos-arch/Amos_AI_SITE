import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Lock } from "lucide-react";

export function NoCourseAccess() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-20">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-royal-500/10 border border-royal-500/20 mb-6">
                        <Lock className="w-8 h-8 text-royal-400" />
                    </div>
                    <SectionHeading
                        title="אין לך גישה לקורס"
                        subtitle="כדי לגשת לתוכן המלא, עליך לרכוש את הקורס"
                        gradient
                    />
                </div>

                <GlassCard className="p-8 text-center">
                    <p className="text-text-secondary mb-8">
                        הקורס "AI Finance Master" זמין רק למשתמשים שרכשו אותו. אנא בחר בתוכנית שמתאימה לך להלן.
                    </p>

                    <a
                        href="/courses/sell-page"
                        className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
                    >
                        עבור לעמוד הקורס
                    </a>

                    <p className="text-xs text-text-muted mt-6">
                        אם כבר רכשת, אנא צור קשר עם התמיכה שלנו
                    </p>
                </GlassCard>
            </div>
        </div>
    );
}
