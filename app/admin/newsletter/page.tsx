"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Send, Loader2, Users, CheckCircle2, Eye, X, ChevronDown, ChevronUp } from "lucide-react";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { sendNewsletter, sendTestNewsletter, getSubscriberCount, getSubscribers } from "@/lib/actions/newsletter";
import { buildNewsletterEmail } from "@/lib/emails/newsletter";

type Subscriber = { email: string; source: string; subscribed_at: string };

export default function AdminNewsletterPage() {
    const [subject, setSubject] = useState("");
    const [bodyHtml, setBodyHtml] = useState("");
    const [subscriberCount, setSubscriberCount] = useState<number | null>(null);
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [showSubscribers, setShowSubscribers] = useState(false);
    const [loadingSubscribers, setLoadingSubscribers] = useState(false);
    const [sending, setSending] = useState(false);
    const [testSending, setTestSending] = useState(false);
    const [testSent, setTestSent] = useState(false);
    const [result, setResult] = useState<{ sent: number; failed: number } | null>(null);
    const [error, setError] = useState("");
    const [previewOpen, setPreviewOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://amos-ai-site.vercel.app";

    useEffect(() => {
        const supabase = createClient();
        if (process.env.NODE_ENV === "development") {
            setIsAdmin(true);
        } else {
            supabase.auth.getUser().then(({ data: { user } }) => {
                setIsAdmin(user?.email === "ronenamos@gmail.com");
            });
        }
        getSubscriberCount().then(setSubscriberCount);
    }, []);

    const handleToggleSubscribers = async () => {
        if (!showSubscribers && subscribers.length === 0) {
            setLoadingSubscribers(true);
            const data = await getSubscribers();
            setSubscribers(data as Subscriber[]);
            setLoadingSubscribers(false);
        }
        setShowSubscribers((v) => !v);
    };

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

    const handleTestSend = async () => {
        if (!subject.trim() || !bodyHtml.trim()) {
            setError("נא למלא נושא ותוכן");
            return;
        }
        try {
            setTestSending(true);
            setError("");
            const res = await sendTestNewsletter(subject, bodyHtml);
            if (!res.success) throw new Error(res.error || "שליחה נכשלה");
            setTestSent(true);
            setTimeout(() => setTestSent(false), 4000);
        } catch (err: any) {
            setError(err.message || "חלה שגיאה בשליחת הבדיקה");
        } finally {
            setTestSending(false);
        }
    };

    const previewHtml = bodyHtml
        ? buildNewsletterEmail({ bodyHtml, siteUrl, unsubscribeUrl: "#" })
        : "";

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
                    <h1 className="text-3xl font-bold">שליחת ניוזלטר</h1>
                    {subscriberCount !== null && (
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 text-text-secondary text-sm">
                                <Users className="h-4 w-4 text-teal-400" />
                                <span>{subscriberCount} נרשמים פעילים</span>
                            </div>
                            <button
                                onClick={handleToggleSubscribers}
                                className="text-xs text-teal-400 hover:text-teal-300 transition-colors flex items-center gap-1"
                            >
                                {showSubscribers ? <><ChevronUp className="h-3 w-3" /> הסתר רשימה</> : <><ChevronDown className="h-3 w-3" /> הצג רשימה</>}
                            </button>
                        </div>
                    )}
                </div>

                {/* Subscriber list panel */}
                {showSubscribers && (
                    <GlassCard className="mb-6 overflow-hidden">
                        {loadingSubscribers ? (
                            <div className="flex justify-center py-6">
                                <Loader2 className="h-5 w-5 animate-spin text-teal-400" />
                            </div>
                        ) : (
                            <div className="overflow-x-auto" dir="rtl">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-white/10 text-text-secondary">
                                            <th className="text-right py-2 px-3 font-medium">אימייל</th>
                                            <th className="text-right py-2 px-3 font-medium">מקור</th>
                                            <th className="text-right py-2 px-3 font-medium">תאריך הצטרפות</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {subscribers.map((s) => (
                                            <tr key={s.email} className="border-b border-white/5 hover:bg-white/3">
                                                <td className="py-2 px-3 font-mono text-xs">{s.email}</td>
                                                <td className="py-2 px-3 text-text-secondary">{s.source}</td>
                                                <td className="py-2 px-3 text-text-secondary">
                                                    {new Date(s.subscribed_at).toLocaleDateString("he-IL")}
                                                </td>
                                            </tr>
                                        ))}
                                        {subscribers.length === 0 && (
                                            <tr>
                                                <td colSpan={3} className="py-6 text-center text-text-muted">אין נרשמים פעילים</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </GlassCard>
                )}

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

                    <div className="flex justify-end items-center gap-3">
                        {/* Preview button */}
                        <button
                            onClick={() => setPreviewOpen(true)}
                            disabled={!bodyHtml.trim()}
                            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 hover:border-teal-400/50 text-text-secondary hover:text-teal-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <Eye className="h-4 w-4" />
                            תצוגה מקדימה
                        </button>

                        {/* Test send button */}
                        <button
                            onClick={handleTestSend}
                            disabled={testSending || !subject.trim() || !bodyHtml.trim()}
                            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 hover:border-teal-400/50 text-text-secondary hover:text-teal-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            {testSending ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : testSent ? (
                                <CheckCircle2 className="h-4 w-4 text-teal-400" />
                            ) : (
                                <Send className="h-4 w-4" />
                            )}
                            {testSent ? "✓ נשלח אליך" : "שלח אליי בלבד"}
                        </button>

                        {/* Main send button */}
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

            {/* Preview modal */}
            {previewOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={() => setPreviewOpen(false)}
                    />
                    <div className="relative z-10 w-full max-w-2xl bg-[#0a0e17] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
                            <span className="text-sm font-medium text-text-secondary">תצוגה מקדימה: {subject || "(ללא נושא)"}</span>
                            <button
                                onClick={() => setPreviewOpen(false)}
                                className="p-1 hover:bg-white/10 rounded-lg transition-colors text-text-secondary hover:text-white"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <iframe
                            srcDoc={previewHtml}
                            className="w-full h-[70vh] border-0"
                            title="Newsletter preview"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
