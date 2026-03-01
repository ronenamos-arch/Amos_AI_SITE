"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Send, Loader2, Users, CheckCircle2, ArrowLeft } from "lucide-react";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { sendNewsletter, getSubscriberCount } from "@/lib/actions/newsletter";

export default function AdminNewsletterPage() {
    const [subject, setSubject] = useState("");
    const [bodyHtml, setBodyHtml] = useState("");
    const [subscriberCount, setSubscriberCount] = useState<number | null>(null);
    const [sending, setSending] = useState(false);
    const [result, setResult] = useState<{ sent: number; failed: number } | null>(null);
    const [error, setError] = useState("");
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

    useEffect(() => {
        const supabase = createClient();
        supabase.auth.getUser().then(({ data: { user } }) => {
            setIsAdmin(user?.email === "ronenamos@gmail.com");
        });
        getSubscriberCount().then(setSubscriberCount);
    }, []);

    const handleSend = async () => {
        if (!subject.trim() || !bodyHtml.trim()) {
            setError("נא למלא נושא ותוכן");
            return;
        }

        const confirmed = window.confirm(
            `את/ה עומד/ת לשלוח ניוזלטר ל-${subscriberCount} נרשמים. להמשיך?`
        );
        if (!confirmed) return;

        try {
            setSending(true);
            setError("");
            setResult(null);

            const res = await sendNewsletter(subject, bodyHtml);

            if (!res.success) {
                throw new Error(res.error || "שליחה נכשלה");
            }

            setResult({ sent: res.sent || 0, failed: res.failed || 0 });
            setSubject("");
            setBodyHtml("");
        } catch (err: any) {
            console.error("Newsletter send error:", err);
            setError(err.message || "חלה שגיאה בשליחה");
        } finally {
            setSending(false);
        }
    };

    if (isAdmin === null) {
        return (
            <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-teal-400" />
            </div>
        );
    }

    if (!isAdmin) {
        return (
            <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
                <GlassCard className="text-center p-12">
                    <h1 className="text-2xl font-bold mb-4">אין גישה</h1>
                    <p className="text-text-secondary">עמוד זה זמין למנהלים בלבד.</p>
                </GlassCard>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-16 min-h-screen">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        <a href="/admin/blog" className="p-2 hover:bg-white/5 rounded-full transition-colors text-text-secondary">
                            <ArrowLeft className="h-6 w-6" />
                        </a>
                        <h1 className="text-3xl font-bold">שליחת ניוזלטר</h1>
                    </div>
                    {subscriberCount !== null && (
                        <div className="flex items-center gap-2 text-text-secondary text-sm">
                            <Users className="h-4 w-4 text-teal-400" />
                            <span>{subscriberCount} נרשמים פעילים</span>
                        </div>
                    )}
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-center font-medium">
                        {error}
                    </div>
                )}

                {result && (
                    <div className="mb-6 p-4 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-xl text-center font-medium flex items-center justify-center gap-3">
                        <CheckCircle2 className="h-5 w-5" />
                        <span>נשלח בהצלחה ל-{result.sent} נרשמים{result.failed > 0 ? ` (${result.failed} נכשלו)` : ""}</span>
                    </div>
                )}

                <div className="space-y-6" dir="rtl">
                    <GlassCard className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold mb-2 text-teal-400">נושא המייל *</label>
                            <input
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-teal-400 text-xl font-bold transition-all"
                                placeholder="למשל: 3 טיפים לשימוש ב-AI במחלקת הכספים"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2 text-teal-400">תוכן הניוזלטר *</label>
                            <RichTextEditor value={bodyHtml} onChange={setBodyHtml} />
                        </div>
                    </GlassCard>

                    <div className="flex justify-end">
                        <Button
                            onClick={handleSend}
                            disabled={sending || !subject.trim() || !bodyHtml.trim()}
                            className="px-10 py-4 text-lg"
                        >
                            {sending ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin ml-2" />
                                    שולח...
                                </>
                            ) : (
                                <>
                                    <Send className="h-5 w-5 ml-2" />
                                    שלח ל-{subscriberCount || 0} נרשמים
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
