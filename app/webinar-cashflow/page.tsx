"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, CheckCircle2, Loader2, Calendar, Clock, Video, Gift } from "lucide-react";
import { subscribeToNewsletter } from "@/lib/actions/newsletter";

const schema = z.object({
    email: z.string().email("כתובת אימייל לא תקינה"),
});

type FormValues = z.infer<typeof schema>;

export default function WebinarCashflowPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: FormValues) => {
        setIsSubmitting(true);
        setServerError(null);
        try {
            const result = await subscribeToNewsletter(data.email, "cashflow-webinar");
            if (!result.success) throw new Error(result.error);
            setIsSuccess(true);
            reset();
        } catch (err) {
            console.error("Webinar subscribe error:", err);
            setServerError("חלה שגיאה. נסה/י שוב מאוחר יותר.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-space-950 relative overflow-hidden">
            {/* Background glows */}
            <div
                className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
                style={{
                    background: "radial-gradient(circle, #22d3ee 0%, transparent 70%)",
                    animation: "pulse 8s ease-in-out infinite",
                }}
            />
            <div
                className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full opacity-15 pointer-events-none"
                style={{
                    background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
                    animation: "pulse 12s ease-in-out infinite",
                }}
            />

            <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 sm:py-24">

                {/* Live badge */}
                <div className="flex justify-center mb-8">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-red-500/15 text-red-400 border border-red-500/30 uppercase tracking-widest">
                        <span className="inline-block w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                        שידור חי — בכורה
                    </span>
                </div>

                {/* Main heading */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center leading-tight mb-6">
                    <span className="gradient-text">בניית תזרים מזומנים</span>
                    <br />
                    <span className="text-text-primary">ב-Claude + Excel</span>
                </h1>

                {/* Event details row */}
                <div className="flex flex-wrap justify-center gap-4 mb-10 text-sm text-text-secondary">
                    <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-neon-teal" />
                        יום שלישי, 24.3.2026
                    </span>
                    <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-neon-teal" />
                        19:15
                    </span>
                    <span className="flex items-center gap-2">
                        <Video className="h-4 w-4 text-neon-teal" />
                        שידור חינמי
                    </span>
                </div>

                {/* Two-column layout: image + form */}
                <div className="grid md:grid-cols-2 gap-10 items-start">

                    {/* Image placeholder */}
                    <div className="order-2 md:order-1">
                        {/* הכנס תמונה כאן */}
                        <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm aspect-[4/3] flex flex-col items-center justify-center text-text-muted">
                            <Video className="h-16 w-16 mb-3 text-neon-teal/40" />
                            <span className="text-sm">תמונת השידור</span>
                        </div>

                        {/* What you get */}
                        <div className="mt-6 space-y-3">
                            <p className="text-sm font-semibold text-text-secondary uppercase tracking-wider">מה תקבל/י בהרשמה:</p>
                            {[
                                "גישה לשידור החי",
                                "הפרומפטים המוכנים לשימוש",
                                "קובץ האקסל להורדה מיד אחרי",
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-3">
                                    <Gift className="h-4 w-4 text-neon-teal shrink-0" />
                                    <span className="text-sm text-text-secondary">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Registration card */}
                    <div className="order-1 md:order-2">
                        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8">

                            {isSuccess ? (
                                <div className="text-center py-6">
                                    <CheckCircle2 className="h-14 w-14 text-teal-400 mx-auto mb-4" />
                                    <h2 className="text-xl font-bold text-text-primary mb-2">נרשמת בהצלחה!</h2>
                                    <p className="text-sm text-text-secondary leading-relaxed">
                                        ניצור איתך קשר לפני השידור עם הלינק והפרומפטים.
                                        <br />
                                        תודה שהצטרפת — נתראה ב-24.3 👋
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-xl font-bold text-text-primary mb-1">הצטרף/י לשידור החי</h2>
                                    <p className="text-sm text-text-secondary mb-6 leading-relaxed">
                                        הצטרף/י לשידור הבכורה וקבל/י את הפרומפטים + קובץ האקסל המוכן — חינם.
                                    </p>

                                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                                        <div>
                                            <input
                                                {...register("email")}
                                                type="email"
                                                placeholder="כתובת האימייל שלך"
                                                dir="ltr"
                                                className={[
                                                    "w-full px-4 py-3 rounded-xl text-sm",
                                                    "bg-white/5 border border-white/10",
                                                    "text-text-primary placeholder:text-text-muted",
                                                    "focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400/50",
                                                    "transition-all duration-200",
                                                    errors.email ? "border-red-400/60 ring-1 ring-red-400/40" : "",
                                                ].join(" ")}
                                            />
                                            {errors.email && (
                                                <p className="text-xs text-red-400 mt-1.5">{errors.email.message}</p>
                                            )}
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className={[
                                                "w-full flex items-center justify-center gap-2",
                                                "px-6 py-3.5 rounded-xl font-semibold text-sm",
                                                "bg-gradient-to-l from-neon-teal to-neon-cyan text-space-950",
                                                "hover:scale-[1.02] active:scale-[0.98] transition-all duration-200",
                                                "shadow-lg shadow-teal-400/30 hover:shadow-xl hover:shadow-teal-400/40",
                                                "disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100",
                                            ].join(" ")}
                                        >
                                            {isSubmitting ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <>
                                                    <Mail className="h-4 w-4" />
                                                    שמור/י לי מקום
                                                </>
                                            )}
                                        </button>

                                        {serverError && (
                                            <p className="text-xs text-red-400 text-center">{serverError}</p>
                                        )}

                                        <p className="text-xs text-text-muted text-center mt-1">
                                            ללא ספאם. ניתן להסיר בכל עת.
                                        </p>
                                    </form>
                                </>
                            )}
                        </div>

                        {/* Urgency note */}
                        <p className="text-xs text-text-muted text-center mt-4">
                            מספר המקומות מוגבל — ההרשמה נסגרת ב-24.3.2026
                        </p>
                    </div>
                </div>

                {/* Description section */}
                <div className="mt-16 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 text-center">
                    <h3 className="text-lg font-bold text-text-primary mb-3">על מה נדבר בשידור?</h3>
                    <p className="text-text-secondary leading-relaxed max-w-2xl mx-auto text-sm">
                        נבנה יחד, צעד אחר צעד, מודל תזרים מזומנים מלא ב-Excel — עם עזרת Claude AI.
                        אתה מביא את העסק, Claude מביא את הלוגיקה, ואנחנו מחברים ביניהם.
                        בסוף השידור תקבל קובץ מוכן לשימוש + פרומפטים שתוכל לעשות בהם שימוש חוזר.
                    </p>
                </div>

            </div>
        </main>
    );
}
