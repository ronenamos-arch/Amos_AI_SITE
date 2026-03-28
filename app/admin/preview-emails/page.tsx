"use client";

import { useState, useEffect, useCallback } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { RefreshCw, Save, AlertTriangle } from "lucide-react";

type EmailKey = "welcome" | "day3" | "day7" | "day14";

const TABS: { key: EmailKey; label: string }[] = [
    { key: "welcome", label: "ברוך הבא" },
    { key: "day3", label: "יום 3" },
    { key: "day7", label: "יום 7" },
    { key: "day14", label: "יום 14" },
];

export default function PreviewEmailsPage() {
    const [selected, setSelected] = useState<EmailKey>("welcome");
    const [source, setSource] = useState("");
    const [iframeKey, setIframeKey] = useState(0);
    const [saving, setSaving] = useState(false);
    const [saveResult, setSaveResult] = useState<{ ok: boolean; message: string } | null>(null);
    const [loadingSource, setLoadingSource] = useState(false);

    const fetchSource = useCallback(async (email: EmailKey) => {
        setLoadingSource(true);
        setSaveResult(null);
        try {
            const res = await fetch(`/api/admin/get-email-source?email=${email}`);
            const data = await res.json() as { source?: string };
            setSource(data.source ?? "");
        } catch {
            setSource("// Error loading source");
        } finally {
            setLoadingSource(false);
        }
    }, []);

    useEffect(() => {
        fetchSource(selected);
    }, [selected, fetchSource]);

    const handleTabChange = (key: EmailKey) => {
        setSelected(key);
        setIframeKey(k => k + 1);
    };

    const handleSave = async () => {
        setSaving(true);
        setSaveResult(null);
        try {
            const res = await fetch("/api/admin/save-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: selected, content: source }),
            });
            const data = await res.json() as { success?: boolean; error?: string };
            if (data.success) {
                setSaveResult({ ok: true, message: "נשמר בהצלחה" });
                setIframeKey(k => k + 1);
            } else {
                setSaveResult({ ok: false, message: data.error ?? "שגיאה בשמירה" });
            }
        } catch {
            setSaveResult({ ok: false, message: "שגיאת רשת" });
        } finally {
            setSaving(false);
        }
    };

    const reloadPreview = () => setIframeKey(k => k + 1);

    return (
        <div className="min-h-screen p-6" dir="rtl">
            <h1 className="text-2xl font-bold text-white mb-6">תצוגה מקדימה של אימיילים</h1>

            {/* Tab bar */}
            <div className="flex gap-2 mb-6 border-b border-slate-700 pb-2">
                {TABS.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => handleTabChange(tab.key)}
                        className={`px-5 py-2 rounded-t-lg text-sm font-medium transition-colors ${
                            selected === tab.key
                                ? "bg-teal-500/20 text-teal-400 border border-teal-500/40"
                                : "text-slate-400 hover:text-white hover:bg-slate-800"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Main panels */}
            <div className="flex gap-4" style={{ height: "calc(100vh - 200px)" }}>
                {/* Left: iframe preview (60%) */}
                <GlassCard className="flex-[3] flex flex-col !p-0 overflow-hidden" hover={false}>
                    <div className="flex items-center justify-between px-4 py-2 border-b border-slate-700">
                        <span className="text-sm text-slate-400">תצוגה מקדימה</span>
                        <button
                            onClick={reloadPreview}
                            className="flex items-center gap-1 text-xs text-teal-400 hover:text-teal-300 transition-colors"
                        >
                            <RefreshCw size={14} />
                            רענן
                        </button>
                    </div>
                    <iframe
                        key={iframeKey}
                        src={`/api/admin/preview-email?email=${selected}`}
                        className="flex-1 w-full bg-white"
                        title="Email Preview"
                    />
                </GlassCard>

                {/* Right: source editor (40%) */}
                <GlassCard className="flex-[2] flex flex-col !p-0 overflow-hidden" hover={false}>
                    <div className="flex items-center justify-between px-4 py-2 border-b border-slate-700">
                        <span className="text-sm text-slate-400">קוד המקור</span>
                        {loadingSource && <span className="text-xs text-slate-500">טוען...</span>}
                    </div>
                    <textarea
                        value={source}
                        onChange={e => setSource(e.target.value)}
                        className="flex-1 w-full bg-transparent text-slate-200 text-xs font-mono p-4 resize-none focus:outline-none leading-5"
                        spellCheck={false}
                        dir="ltr"
                    />
                    <div className="px-4 py-3 border-t border-slate-700 flex flex-col gap-2">
                        <div className="flex items-center gap-1 text-xs text-amber-400">
                            <AlertTriangle size={12} />
                            שמירה תכתוב ישירות לקוד — בדוק לפני שמירה
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="flex items-center gap-1 px-4 py-1.5 bg-teal-500/20 border border-teal-500/40 text-teal-400 hover:bg-teal-500/30 text-sm rounded-lg transition-colors disabled:opacity-50"
                            >
                                <Save size={14} />
                                {saving ? "שומר..." : "שמור"}
                            </button>
                            <button
                                onClick={reloadPreview}
                                className="flex items-center gap-1 px-4 py-1.5 bg-slate-700/50 border border-slate-600 text-slate-300 hover:bg-slate-700 text-sm rounded-lg transition-colors"
                            >
                                <RefreshCw size={14} />
                                רענן תצוגה
                            </button>
                        </div>
                        {saveResult && (
                            <span className={`text-xs ${saveResult.ok ? "text-teal-400" : "text-red-400"}`}>
                                {saveResult.message}
                            </span>
                        )}
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}
