"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Mail, CheckCircle2, Loader2 } from "lucide-react";
import { subscribeToNewsletter } from "@/lib/actions/newsletter";

const schema = z.object({
    email: z.string().email("כתובת אימייל לא תקינה"),
});

type FormValues = z.infer<typeof schema>;

interface NewsletterFormProps {
    source?: string;
    variant?: "inline" | "card";
}

export function NewsletterForm({ source = "footer", variant = "inline" }: NewsletterFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
        setError(null);
        try {
            const result = await subscribeToNewsletter(data.email, source);
            if (!result.success) throw new Error(result.error);
            setIsSuccess(true);
            reset();
        } catch (err) {
            console.error("Newsletter subscribe error:", err);
            setError("חלה שגיאה. נסה שוב מאוחר יותר.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="flex items-center gap-3 py-3 text-teal-400">
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                <span className="text-sm font-medium">נרשמת בהצלחה! נשלח לך עדכונים למייל.</span>
            </div>
        );
    }

    const formContent = (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3 w-full">
            <div className="flex-grow">
                <Input
                    {...register("email")}
                    type="email"
                    placeholder="הכנס את כתובת האימייל שלך"
                    error={errors.email?.message}
                />
            </div>
            <Button
                type="submit"
                disabled={isSubmitting}
                className="shrink-0 sm:w-auto w-full"
            >
                {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    <>
                        <Mail className="ml-2 h-4 w-4" />
                        הרשמה
                    </>
                )}
            </Button>
            {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
        </form>
    );

    if (variant === "card") {
        return (
            <GlassCard className="text-center p-8 border-teal-400/20">
                <Mail className="h-8 w-8 text-teal-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">קבלו עדכונים ישירות למייל</h3>
                <p className="text-sm text-text-secondary mb-6">
                    טיפים, מדריכים ותובנות על AI וכספים — פעם בשבוע, בלי ספאם.
                </p>
                {formContent}
            </GlassCard>
        );
    }

    return formContent;
}
