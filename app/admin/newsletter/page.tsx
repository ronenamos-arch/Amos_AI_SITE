"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Send, Loader2, Users, CheckCircle2, Eye, X, ChevronDown, ChevronUp, Calendar, RefreshCw } from "lucide-react";
import RichTextEditor from "@/components/admin/RichTextEditor";
import {
    sendNewsletter, sendTestNewsletter,
    getSubscriberCount, getSubscribers, getSubscriberSources, getNewsletterHistory,
    scheduleNewsletter, getScheduledNewsletters, cancelScheduledNewsletter,
    bulkSyncToResend,
} from "@/lib/actions/newsletter";
import { buildNewsletterEmail } from "@/lib/emails/newsletter";

type Subscriber = { email: string; source: string; subscribed_at: string };
type SourceInfo = { source: string; count: number };
type SendRecord = { id: string; subject: string; sent_at: string; recipient_count: number; failed_count: number; sources: string[] | null };
type ScheduledRecord = { id: string; subject: string; scheduled_for: string; status: string; sources: string[] | null; recipient_count: number | null; failed_count: number | null; error_message: string | null };

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
    const [sources, setSources] = useState<SourceInfo[]>([]);
    const [selectedSources, setSelectedSources] = useState<string[]>([]);
    const [filteredCount, setFilteredCount] = useState<number | null>(null);
    const [history, setHistory] = useState<SendRecord[]>([]);

    // Scheduling state
    const [scheduleMode, setScheduleMode] = useState(false);
    const [scheduledFor, setScheduledFor] = useState("");
    const [scheduling, setScheduling] = useState(false);
    const [scheduleSuccess, setScheduleSuccess] = useState(false);
    const [scheduledItems, setScheduledItems] = useState<ScheduledRecord[]>([]);
    const [cancellingId, setCancellingId] = useState<string | null>(null);

    // Resend bulk sync state
    const [syncingResend, setSyncingResend] = useState(false);
    const [syncResult, setSyncResult] = useState<{ synced: number; failed: number; total: number } | null>(null);

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ronenamoscpa.co.il";

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
        getSubscriberSources().then((data) => {
            setSources(data);
            setSelectedSources(data.map((s) => s.source));
        });
        getNewsletterHistory().then((data) => setHistory(data as SendRecord[]));
        getScheduledNewsletters().then((data) => setScheduledItems(data as ScheduledRecord[]));
    }, []);

    // Update filtered count when selection changes
    useEffect(() => {
        if (sources.length === 0) return;
        const allSelected = selectedSources.length === sources.length;
        if (allSelected) {
            setFilteredCount(subscriberCount);
        } else if (selectedSources.length === 0) {
            setFilteredCount(0);
        } else {
            const count = sources
                .filter((s) => selectedSources.includes(s.source))
                .reduce((sum, s) => sum + s.count, 0);
            setFilteredCount(count);
        }
    }, [selectedSources, sources, subscriberCount]);

    const toggleSource = (source: string) => {
        setSelectedSources((prev) =>
            prev.includes(source) ? prev.filter((s) => s !== source) : [...prev, source]
        );
    };

    const toggleAll = () => {
        if (selectedSources.length === sources.length) {
            setSelectedSources([]);
        } else {
            setSelectedSources(sources.map((s) => s.source));
        }
    };

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

        const targetCount = filteredCount ?? subscriberCount ?? 0;
        const confirmed = window.confirm(
            `את/ה עומד/ת לשלוח ניוזלטר ל-${targetCount} נרשמים. להמשיך?`
        );
        if (!confirmed) return;

        try {
            setSending(true);
            setError("");
            setResult(null);

            const sourcesToSend = selectedSources.length === sources.length ? undefined : selectedSources;
            const res = await sendNewsletter(subject, bodyHtml, sourcesToSend);

            if (!res.success) {
                throw new Error(res.error || "שליחה נכשלה");
            }

            setResult({ sent: res.sent || 0, failed: res.failed || 0 });
            setSubject("");
            setBodyHtml("");
            getNewsletterHistory().then((data) => setHistory(data as SendRecord[]));
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "חלה שגיאה בשליחה";
            console.error("Newsletter send error:", err);
            setError(msg);
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
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "חלה שגיאה בשליחת הבדיקה";
            setError(msg);
        } finally {
            setTestSending(false);
        }
    };

    const handleSchedule = async () => {
        if (!subject.trim() || !bodyHtml.trim()) {
            setError("נא למלא נושא ותוכן");
            return;
        }
        if (!scheduledFor) {
            setError("נא לבחור תאריך ושעה לשליחה");
            return;
        }
        const scheduledDate = new Date(scheduledFor);
        if (scheduledDate <= new Date()) {
            setError("יש לבחור תאריך עתידי");
            return;
        }

        try {
            setScheduling(true);
            setError("");
            const sourcesToSend = selectedSources.length === sources.length ? undefined : selectedSources;
            const res = await scheduleNewsletter(subject, bodyHtml, scheduledDate.toISOString(), sourcesToSend);

            if (!res.success) throw new Error(res.error || "שמירת תזמון נכשלה");

            setScheduleSuccess(true);
            setScheduleMode(false);
            setScheduledFor("");
            setTimeout(() => setScheduleSuccess(false), 5000);

            // Refresh scheduled list
            getScheduledNewsletters().then((data) => setScheduledItems(data as ScheduledRecord[]));
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "חלה שגיאה בשמירת התזמון";
            setError(msg);
        } finally {
            setScheduling(false);
        }
    };

    const handleCancelScheduled = async (id: string) => {
        const confirmed = window.confirm("לבטל את השליחה המתוזמנת?");
        if (!confirmed) return;
        setCancellingId(id);
        await cancelScheduledNewsletter(id);
        getScheduledNewsletters().then((data) => setScheduledItems(data as ScheduledRecord[]));
        setCancellingId(null);
    };

    const handleBulkSync = async () => {
        const confirmed = window.confirm("לסנכרן את כל המנויים לרשימת Resend? פעולה זו תוסיף את כל המנויים מ-Supabase ל-Resend Audience.");
        if (!confirmed) return;
        setSyncingResend(true);
        setSyncResult(null);
        const res = await bulkSyncToResend();
        if (res.success) {
            setSyncResult({ synced: res.synced ?? 0, failed: res.failed ?? 0, total: res.total ?? 0 });
        } else {
            setError(res.error || "סנכרון Resend נכשל");
        }
        setSyncingResend(false);
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

    const targetCount = filteredCount ?? subscriberCount ?? 0;
    const pendingScheduled = scheduledItems.filter((s) => s.status === "pending");

    return (
        <div className="pt-24 pb-16 min-h-screen">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">שליחת ניוזלטר</h1>
                    <div className="flex items-center gap-3 flex-wrap justify-end">
                        {subscriberCount !== null && (
                            <>
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
                            </>
                        )}
                        {/* Resend bulk sync button */}
                        <button
                            onClick={handleBulkSync}
                            disabled={syncingResend}
                            title="סנכרן מנויים קיימים ל-Resend Audience"
                            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-purple-400/30 text-purple-400 hover:bg-purple-400/10 transition-colors disabled:opacity-40"
                        >
                            {syncingResend ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
                            סנכרן Resend
                        </button>
                        <a
                            href="/api/admin/export-contacts"
                            download
                            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-teal-400/30 text-teal-400 hover:bg-teal-400/10 transition-colors"
                            title="ייצוא כל אנשי הקשר"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            ייצוא CSV
                            <span className="text-[10px] text-text-secondary">מנויים · משתמשים · פניות</span>
                        </a>
                    </div>
                </div>

                {/* Resend sync result */}
                {syncResult && (
                    <div className="mb-4 p-3 bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-xl text-sm text-center" dir="rtl">
                        סנכרון Resend הושלם: {syncResult.synced} מנויים סונכרנו
                        {syncResult.failed > 0 && <span className="text-red-400"> ({syncResult.failed} נכשלו)</span>}
                        {" "}מתוך {syncResult.total}
                    </div>
                )}

                {/* Source filter pills */}
                {sources.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 mb-6" dir="rtl">
                        <span className="text-xs text-text-muted">סינון לפי מקור:</span>
                        <button
                            onClick={toggleAll}
                            className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                                selectedSources.length === sources.length
                                    ? "bg-teal-500/20 border-teal-400 text-teal-300"
                                    : "bg-white/5 border-white/10 text-text-secondary hover:border-teal-400/50"
                            }`}
                        >
                            הכל ({subscriberCount})
                        </button>
                        {sources.map((s) => (
                            <button
                                key={s.source}
                                onClick={() => toggleSource(s.source)}
                                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                                    selectedSources.includes(s.source)
                                        ? "bg-teal-500/20 border-teal-400 text-teal-300"
                                        : "bg-white/5 border-white/10 text-text-secondary hover:border-teal-400/50"
                                }`}
                            >
                                {s.source} ({s.count})
                            </button>
                        ))}
                    </div>
                )}

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

                {scheduleSuccess && (
                    <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl text-center font-medium flex items-center justify-center gap-3" dir="rtl">
                        <Calendar className="h-5 w-5" />
                        <span>הניוזלטר תוזמן לשליחה בהצלחה</span>
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

                    {/* Schedule date picker (shown when schedule mode is active) */}
                    {scheduleMode && (
                        <GlassCard className="border border-blue-400/20 bg-blue-500/5">
                            <div className="flex items-center gap-3">
                                <Calendar className="h-4 w-4 text-blue-400 shrink-0" />
                                <label className="text-sm font-medium text-blue-300">תאריך ושעת שליחה</label>
                                <input
                                    type="datetime-local"
                                    value={scheduledFor}
                                    onChange={(e) => setScheduledFor(e.target.value)}
                                    min={new Date(Date.now() + 60000).toISOString().slice(0, 16)}
                                    className="flex-1 bg-white/5 border border-blue-400/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 transition-all text-left"
                                    dir="ltr"
                                />
                            </div>
                        </GlassCard>
                    )}

                    <div className="flex justify-end items-center gap-3 flex-wrap">
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

                        {/* Schedule toggle */}
                        <button
                            onClick={() => { setScheduleMode((v) => !v); setError(""); }}
                            className={`flex items-center gap-2 px-5 py-3 rounded-xl border transition-all ${
                                scheduleMode
                                    ? "border-blue-400 text-blue-400 bg-blue-500/10"
                                    : "border-white/10 text-text-secondary hover:border-blue-400/50 hover:text-blue-400"
                            }`}
                        >
                            <Calendar className="h-4 w-4" />
                            תזמן שליחה
                        </button>

                        {/* Scheduled save button (only visible in schedule mode) */}
                        {scheduleMode ? (
                            <button
                                onClick={handleSchedule}
                                disabled={scheduling || !subject.trim() || !bodyHtml.trim() || !scheduledFor}
                                className="flex items-center gap-2 px-8 py-3 rounded-xl bg-blue-500/20 border border-blue-400 text-blue-300 font-semibold hover:bg-blue-500/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                {scheduling ? <Loader2 className="h-4 w-4 animate-spin" /> : <Calendar className="h-4 w-4" />}
                                שמור תזמון
                            </button>
                        ) : (
                            /* Main send button */
                            <Button
                                onClick={handleSend}
                                disabled={sending || !subject.trim() || !bodyHtml.trim() || selectedSources.length === 0}
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
                                        שלח ל-{targetCount} נרשמים
                                    </>
                                )}
                            </Button>
                        )}
                    </div>
                </div>

                {/* Scheduled newsletters section */}
                {scheduledItems.length > 0 && (
                    <div className="mt-10" dir="rtl">
                        <h2 className="text-lg font-bold mb-4 text-blue-300 flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            שליחות מתוזמנות
                            {pendingScheduled.length > 0 && (
                                <span className="text-xs bg-blue-500/20 border border-blue-400/30 text-blue-400 px-2 py-0.5 rounded-full">
                                    {pendingScheduled.length} ממתינות
                                </span>
                            )}
                        </h2>
                        <GlassCard className="overflow-hidden p-0 border border-blue-400/10">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-white/10 text-text-secondary">
                                        <th className="text-right py-3 px-4 font-medium">נושא</th>
                                        <th className="text-right py-3 px-4 font-medium">מתוזמן ל</th>
                                        <th className="text-right py-3 px-4 font-medium">סטטוס</th>
                                        <th className="text-right py-3 px-4 font-medium">מקורות</th>
                                        <th className="py-3 px-4"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {scheduledItems.map((s) => (
                                        <tr key={s.id} className="border-b border-white/5 last:border-0 hover:bg-white/3">
                                            <td className="py-3 px-4 font-medium max-w-[200px] truncate">{s.subject}</td>
                                            <td className="py-3 px-4 text-text-secondary whitespace-nowrap" dir="ltr">
                                                {new Date(s.scheduled_for).toLocaleDateString("he-IL", {
                                                    day: "numeric", month: "short", year: "numeric",
                                                    hour: "2-digit", minute: "2-digit",
                                                })}
                                            </td>
                                            <td className="py-3 px-4">
                                                {s.status === "pending" && <span className="text-blue-400 text-xs bg-blue-500/10 px-2 py-0.5 rounded-full">ממתין</span>}
                                                {s.status === "sending" && <span className="text-yellow-400 text-xs bg-yellow-500/10 px-2 py-0.5 rounded-full">שולח...</span>}
                                                {s.status === "sent" && <span className="text-teal-400 text-xs bg-teal-500/10 px-2 py-0.5 rounded-full">נשלח ✓ ({s.recipient_count})</span>}
                                                {s.status === "failed" && <span className="text-red-400 text-xs bg-red-500/10 px-2 py-0.5 rounded-full" title={s.error_message ?? ""}>נכשל</span>}
                                                {s.status === "cancelled" && <span className="text-text-muted text-xs bg-white/5 px-2 py-0.5 rounded-full">בוטל</span>}
                                            </td>
                                            <td className="py-3 px-4 text-text-muted text-xs">
                                                {s.sources ? s.sources.join(", ") : "הכל"}
                                            </td>
                                            <td className="py-3 px-4">
                                                {s.status === "pending" && (
                                                    <button
                                                        onClick={() => handleCancelScheduled(s.id)}
                                                        disabled={cancellingId === s.id}
                                                        className="text-xs text-red-400/60 hover:text-red-400 transition-colors flex items-center gap-1"
                                                    >
                                                        {cancellingId === s.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <X className="h-3 w-3" />}
                                                        בטל
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </GlassCard>
                    </div>
                )}

                {/* Send history */}
                {history.length === 0 && (
                    <p className="mt-8 text-xs text-text-muted text-center" dir="rtl">
                        היסטוריית שליחות תופיע כאן לאחר שליחה ראשונה
                    </p>
                )}
                {history.length > 0 && (
                    <div className="mt-10" dir="rtl">
                        <h2 className="text-lg font-bold mb-4 text-text-secondary">היסטוריית שליחות</h2>
                        <GlassCard className="overflow-hidden p-0">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-white/10 text-text-secondary">
                                        <th className="text-right py-3 px-4 font-medium">נושא</th>
                                        <th className="text-right py-3 px-4 font-medium">תאריך</th>
                                        <th className="text-right py-3 px-4 font-medium">נשלח</th>
                                        <th className="text-right py-3 px-4 font-medium">מקורות</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.map((h) => (
                                        <tr key={h.id} className="border-b border-white/5 last:border-0 hover:bg-white/3">
                                            <td className="py-3 px-4 font-medium">{h.subject}</td>
                                            <td className="py-3 px-4 text-text-secondary whitespace-nowrap">
                                                {new Date(h.sent_at).toLocaleDateString("he-IL", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className="text-teal-400 font-medium">{h.recipient_count}</span>
                                                {h.failed_count > 0 && (
                                                    <span className="text-red-400 text-xs mr-1">({h.failed_count} נכשלו)</span>
                                                )}
                                            </td>
                                            <td className="py-3 px-4 text-text-muted text-xs">
                                                {h.sources ? h.sources.join(", ") : "הכל"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </GlassCard>
                    </div>
                )}
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
