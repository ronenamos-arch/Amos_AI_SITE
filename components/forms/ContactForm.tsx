"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

import { createClient } from "@/lib/supabase/client";

const contactFormSchema = z.object({
    name: z.string().min(2, "השם חייב להכיל לפחות 2 תווים"),
    email: z.string().email("כתובת אימייל לא תקינה"),
    phone: z.string().min(9, "מספר טלפון לא תקין").optional().or(z.literal("")),
    subject: z.string().min(5, "הנושא חייב להכיל לפחות 5 תווים"),
    message: z.string().min(10, "ההודעה חייבת להכיל לפחות 10 תווים"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const supabase = createClient();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactFormSchema),
    });

    const onSubmit = async (data: ContactFormValues) => {
        setIsSubmitting(true);
        try {
            const { error } = await supabase
                .from('contact_submissions')
                .insert([
                    {
                        name: data.name,
                        email: data.email,
                        phone: data.phone || null,
                        subject: data.subject,
                        message: data.message,
                    },
                ]);

            if (error) throw error;

            setIsSuccess(true);
            reset();
        } catch (error) {
            console.error("Submission error:", error);
            alert("חלה שגיאה בשליחת הטופס. אנא נסה שוב מאוחר יותר.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-wow">
                <CheckCircle2 className="h-16 w-16 text-teal-400 mb-6" />
                <h3 className="text-2xl font-bold text-text-primary mb-2">ההודעה נשלחה בהצלחה!</h3>
                <p className="text-text-secondary max-w-sm">
                    תודה שפנית אלי. אני אחזור אליך בהקדם האפשרי באימייל או בטלפון שציינת.
                </p>
                <Button
                    onClick={() => setIsSuccess(false)}
                    variant="ghost"
                    className="mt-8"
                >
                    שלח הודעה נוספת
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-text-muted mr-1">שם מלא *</label>
                    <Input
                        {...register("name")}
                        placeholder="ישראל ישראלי"
                        error={errors.name?.message}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-text-muted mr-1">אימייל *</label>
                    <Input
                        {...register("email")}
                        type="email"
                        placeholder="office@example.com"
                        error={errors.email?.message}
                    />
                </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-text-muted mr-1">טלפון (אופציונלי)</label>
                    <Input
                        {...register("phone")}
                        placeholder="050-1234567"
                        error={errors.phone?.message}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-text-muted mr-1">נושא הפנייה *</label>
                    <Input
                        {...register("subject")}
                        placeholder="ייעוץ בנושא AI / הטמעת מערכות"
                        error={errors.subject?.message}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-text-muted mr-1">הודעה *</label>
                <Textarea
                    {...register("message")}
                    placeholder="ספר לי קצת על האתגרים שלך..."
                    error={errors.message?.message}
                />
            </div>

            <Button
                type="submit"
                className="w-full sm:w-auto"
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                        שולח...
                    </>
                ) : (
                    <>
                        <Send className="ml-2 h-4 w-4" />
                        שלח הודעה
                    </>
                )}
            </Button>
        </form>
    );
}
