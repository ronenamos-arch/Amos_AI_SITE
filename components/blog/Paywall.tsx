import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Lock, Sparkles, CheckCircle2, ArrowLeft } from "lucide-react";
import { SMARTBEE_CONFIG } from "@/lib/smartbee-config";

interface PaywallProps {
    title?: string;
    description?: string;
    features?: string[];
    priceText?: string;
    checkoutUrl?: string;
}

export function Paywall({
    title = "המשך המאמר פתוח בלעדית למנויי AI Finance Pro",
    description = "הצטרפו לקהילת ה-Pro כדי לפתוח את המשך המאמר, את כל ספריות הפרומפטים והקוד, ואת מאגר הסקילים המלא למחלקות כספים.",
    features = [
        "גישה מיידית לכל מאמרי ומדריכי הפרימיום הבלעדיים באתר",
        "ספריית ה-Skill Vault: פרומפטים וסקילים פיננסיים בדוקים (Excel, ERP, FP&A)",
        "גישה ישירה לקורסי ההכשרה המלאים (AI Mastery & NotebookLM)",
        "תבניות קוד, סקריפטים לאוטומציה פיננסית ואינטגרציות AI ל-GL",
        "ביטול עצמי בכל עת בלחיצת כפתור — ללא שום התחייבות"
    ],
    priceText = "100 ₪ / חודש בלבד",
    checkoutUrl = SMARTBEE_CONFIG.products.monthlySubscription.url
}: PaywallProps) {
    return (
        <div className="relative mt-8">
            {/* Fade overlay for content above */}
            <div className="absolute -top-32 left-0 right-0 h-32 bg-gradient-to-t from-[#070b14] via-[#070b14]/90 to-transparent z-10 pointer-events-none" />

            <GlassCard className="relative z-20 p-8 sm:p-10 text-center border-t-2 border-teal-500/50 shadow-2xl shadow-teal-500/10 bg-slate-900/90 backdrop-blur-xl">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-teal-500/10 border border-teal-500/30">
                    <Lock className="h-7 w-7 text-teal-400" />
                </div>

                <div className="inline-block px-3 py-1 mb-3 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-bold tracking-wide">
                    AI FINANCE PRO • גישת פרימיום
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold mb-3 flex items-center justify-center gap-2 text-white">
                    {title}
                    <Sparkles className="h-6 w-6 text-teal-400 shrink-0" />
                </h2>

                <p className="text-text-secondary mb-6 max-w-xl mx-auto leading-relaxed text-sm sm:text-base">
                    {description}
                </p>

                {/* Hormozi Value Stack Checklist */}
                {features.length > 0 && (
                    <div className="my-6 max-w-lg mx-auto bg-slate-950/60 border border-slate-800 rounded-xl p-5 text-right">
                        <div className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-3">
                            מה מחכה לך בפנים:
                        </div>
                        <ul className="space-y-2.5 text-sm text-slate-200">
                            {features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-2.5">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                                    <span className="leading-snug">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Pricing & CTA Buttons */}
                <div className="mt-8 flex flex-col items-center justify-center gap-3">
                    <div className="text-xs text-slate-400 mb-1">
                        השקעה של <span className="font-bold text-white text-sm">{priceText}</span> • גישה מלאה מיידית
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                        <Button 
                            href={checkoutUrl} 
                            size="lg" 
                            className="w-full sm:w-auto min-w-[240px] bg-gradient-to-r from-teal-500 to-sky-500 hover:from-teal-400 hover:to-sky-400 text-white font-bold shadow-lg shadow-teal-500/25 flex items-center justify-center gap-2"
                        >
                            <span>הצטרף ל-Pro ופתח את המאמר</span>
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <Button href="/login" variant="ghost" size="lg" className="w-full sm:w-auto text-slate-300 hover:text-white border border-slate-800">
                            כבר מנוי? התחבר כאן
                        </Button>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-400 mt-4">
                        <span>✓ פתיחה מיידית של כל החומרים</span>
                        <span>•</span>
                        <span>✓ סליקה מאובטחת</span>
                        <span>•</span>
                        <span>✓ ביטול בכל עת</span>
                    </div>
                </div>
            </GlassCard>
        </div>
    );
}
