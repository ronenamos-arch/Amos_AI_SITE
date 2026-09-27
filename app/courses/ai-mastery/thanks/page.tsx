import type { Metadata } from "next";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle2, ExternalLink, Mail, KeyRound, Sparkles, BookOpen, FileSpreadsheet, ArrowLeft, MessageCircle } from "lucide-react";
import { PasswordBox } from "./PasswordBox";

export const metadata: Metadata = {
    title: "תודה על הרכישה! | AI לכספים: המדריך למתחילים",
    description: "תודה על רכישת הקורס. הנה פרטי הגישה הישירים, סיסמת השיעורים וקישור הכניסה.",
    robots: { index: false, follow: false },
};

export default function AiMasteryThanksPage() {
    const courseUrl = "https://gamma.app/docs/ChatGPT--wrvbq68o6zujsmt";
    const password = "masterai2";

    return (
        <div className="relative min-h-screen bg-space-950 text-white overflow-hidden font-primary pt-24 pb-20">
            {/* Ambient Background Lighting */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-10%] right-[-10%] w-[45%] h-[45%] bg-teal-600/20 blur-[140px] rounded-full" />
                <div className="absolute bottom-[10%] left-[-5%] w-[40%] h-[40%] bg-royal-500/15 blur-[130px] rounded-full" />
                <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] bg-amber-500/10 blur-[150px] rounded-full" />
            </div>

            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                {/* Main Card */}
                <GlassCard className="p-8 sm:p-12 text-center border-t-4 border-teal-400 relative overflow-hidden bg-space-900/80 backdrop-blur-xl shadow-2xl">
                    {/* Top Icon & Badge */}
                    <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-teal-400/15 border border-teal-400/30 text-teal-400">
                        <CheckCircle2 className="h-10 w-10 text-teal-400 animate-pulse" />
                    </div>

                    <Badge variant="teal" className="mb-4 block mx-auto w-fit px-4 py-1 text-sm tracking-wide bg-teal-500/15 text-teal-300 border-teal-500/30">
                        הרכישה הושלמה בהצלחה 🎉
                    </Badge>

                    <h1 className="text-3xl sm:text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/70 leading-tight">
                        תודה על הצטרפותך!
                    </h1>

                    <h2 className="text-xl sm:text-2xl font-bold text-teal-400 mb-6">
                        AI לכספים: המדריך למתחילים
                    </h2>

                    <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl mx-auto mb-8">
                        שמחים מאוד שהצטרפת לתוכנית! הגישה המלאה לכל 8 השיעורים, חוברות התרגול וספריית הפרומפטים פתוחה עבורך לכל החיים.
                    </p>

                    {/* Important Email Alert Box */}
                    <div className="mb-8 p-5 rounded-2xl bg-teal-500/10 border border-teal-500/25 text-right flex items-start gap-4">
                        <Mail className="w-6 h-6 text-teal-400 flex-shrink-0 mt-0.5" />
                        <div className="text-sm sm:text-base leading-relaxed text-text-secondary">
                            <strong className="text-white block mb-1">✉️ נשלח אליך מייל תודה עם כל הפרטים:</strong>
                            שלחנו לתיבת המייל שלך את קישור הגישה, הסיסמה וחשבונית המס. <br />
                            <span className="text-teal-300 font-medium">לא מצאת את המייל? אנא בדוק גם בתיקיית הספאם (Spam) או קידומי המכירות (Promotions).</span>
                        </div>
                    </div>

                    {/* Password Box */}
                    <PasswordBox password={password} />

                    {/* Primary CTA Button to Gamma */}
                    <div className="my-8">
                        <a
                            href={courseUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-5 text-xl font-bold bg-gradient-to-r from-teal-400 via-teal-500 to-royal-500 text-space-950 rounded-2xl shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
                        >
                            <span>🚀 כניסה לקורס ב-Gamma</span>
                            <ExternalLink className="w-6 h-6 text-space-950" />
                        </a>
                        <p className="mt-3 text-xs text-text-muted">
                            נפתח בחלון חדש • הזינו את הסיסמה <span className="font-mono text-amber-300 font-bold">{password}</span> בעת הכניסה
                        </p>
                    </div>

                    {/* What's Inside Grid */}
                    <div className="grid gap-4 sm:grid-cols-3 my-10 text-right">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between">
                            <div className="flex items-center gap-2 mb-2 text-teal-400">
                                <BookOpen className="w-5 h-5" />
                                <span className="font-bold text-white text-sm">8 שיעורים מעשיים</span>
                            </div>
                            <p className="text-xs text-text-secondary">
                                מודולים מובנים מ-0 ועד ניתוח דאטה ואוטומציות פיננסיות.
                            </p>
                        </div>

                        <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between">
                            <div className="flex items-center gap-2 mb-2 text-royal-400">
                                <FileSpreadsheet className="w-5 h-5" />
                                <span className="font-bold text-white text-sm">חוברות תרגול מלאות</span>
                            </div>
                            <p className="text-xs text-text-secondary">
                                תרגילים מודרכים ודוגמאות אמת ליישום יומיומי מיידי.
                            </p>
                        </div>

                        <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between">
                            <div className="flex items-center gap-2 mb-2 text-amber-400">
                                <Sparkles className="w-5 h-5" />
                                <span className="font-bold text-white text-sm">100+ פרומפטים</span>
                            </div>
                            <p className="text-xs text-text-secondary">
                                ספריית פרומפטים מוכנים להעתקה-הדבקה ישירה לכספים.
                            </p>
                        </div>
                    </div>

                    {/* Community & Support */}
                    <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 text-right mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <MessageCircle className="w-6 h-6 text-emerald-400" />
                            <h3 className="font-bold text-white text-base">קהילת הוואטסאפ הסגורה לאנשי פיננסים</h3>
                        </div>
                        <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                            רוצה להתייעץ, לשאול שאלות ולקבל עדכונים שוטפים? הצטרף לקבוצה השקטה שלנו:
                        </p>
                        <a
                            href="https://chat.whatsapp.com/F1Y1Q35QIZ3L6rcrXuEnNN"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold transition-colors"
                        >
                            <span>הצטרפות לקבוצת ה-WhatsApp</span>
                            <ArrowLeft className="w-4 h-4" />
                        </a>
                    </div>

                    {/* Bottom Navigation Links */}
                    <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text-secondary">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 font-medium transition-colors"
                        >
                            <span>← חזרה לאתר הראשי (ronenamoscpa.co.il)</span>
                        </Link>

                        <a
                            href="https://wa.me/972505500344"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-text-muted hover:text-white transition-colors"
                        >
                            צריך עזרה? דבר איתי בוואטסאפ: <span className="text-teal-400 underline">050-5500344</span>
                        </a>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}
