"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, X, CheckCircle2, Loader2 } from "lucide-react";
import { subscribeToNewsletter } from "@/lib/actions/newsletter";

const schema = z.object({
    email: z.string().email("אימייל לא תקין"),
});
type FormValues = z.infer<typeof schema>;

export function StickyNewsletterBar() {
    const [visible, setVisible] = useState(false);
    const [dismissed, setDismissed] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        if (sessionStorage.getItem("newsletter-bar-dismissed")) {
            setDismissed(true);
            return;
        }
        const handleScroll = () => {
            const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
            if (scrolled > 0.4) setVisible(true);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const dismiss = () => {
        setDismissed(true);
        sessionStorage.setItem("newsletter-bar-dismissed", "1");
    };

    const onSubmit = async (data: FormValues) => {
        setIsSubmitting(true);
        try {
            const result = await subscribeToNewsletter(data.email, "sticky-bar");
            if (!result.success) throw new Error(result.error);
            setIsSuccess(true);
            setTimeout(dismiss, 2500);
        } catch {
            // silently fail — user can use the inline form
        } finally {
            setIsSubmitting(false);
        }
    };

    if (dismissed || !visible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden animate-in slide-in-from-bottom duration-300">
            <div className="glass border-t border-teal-400/20 px-4 py-3">
                <button
                    onClick={dismiss}
                    className="absolute top-2 left-2 p-1 text-text-muted hover:text-white"
                    aria-label="סגור"
                >
                    <X className="h-4 w-4" />
                </button>

                {isSuccess ? (
                    <div className="flex items-center justify-center gap-2 text-teal-400 py-1">
                        <CheckCircle2 className="h-4 w-4" />
                        <span className="text-sm font-medium">נרשמת בהצלחה!</span>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
                        <p className="text-xs text-text-secondary text-center">
                            <Mail className="inline h-3 w-3 ml-1 text-teal-400" />
                            טיפים על AI וכספים — פעם בשבוע, בלי ספאם
                        </p>
                        <div className="flex gap-2">
                            <input
                                {...register("email")}
                                type="email"
                                placeholder="כתובת אימייל"
                                className="flex-1 min-w-0 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-teal-400/50"
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="shrink-0 rounded-lg bg-teal-500 hover:bg-teal-400 text-white text-sm font-medium px-4 py-2 transition-colors disabled:opacity-60"
                            >
                                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "הרשמה"}
                            </button>
                        </div>
                        {errors.email && (
                            <p className="text-xs text-red-400 text-center">{errors.email.message}</p>
                        )}
                    </form>
                )}
            </div>
        </div>
    );
}
