"use client";

import { useState, useRef } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Loader2, CheckCircle2, ChevronDown } from "lucide-react";
import { updateContactStatus, saveContactNotes, replyToContact } from "@/lib/actions/contacts";

type Status = "new" | "in_progress" | "closed";

interface Contact {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    created_at: string;
    status: Status;
    notes: string | null;
    replied_at: string | null;
}

const STATUS_LABELS: Record<Status, string> = {
    new: "חדש",
    in_progress: "בטיפול",
    closed: "סגור",
};

const STATUS_COLORS: Record<Status, string> = {
    new: "bg-gray-500/20 text-gray-300 border-gray-500/30",
    in_progress: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    closed: "bg-teal-500/20 text-teal-300 border-teal-500/30",
};

export default function ContactCard({ contact }: { contact: Contact }) {
    const [status, setStatus] = useState<Status>(contact.status);
    const [statusOpen, setStatusOpen] = useState(false);
    const [updatingStatus, setUpdatingStatus] = useState(false);

    const [notes, setNotes] = useState(contact.notes ?? "");
    const [notesOpen, setNotesOpen] = useState(false);
    const [savingNotes, setSavingNotes] = useState(false);

    const [replyOpen, setReplyOpen] = useState(false);
    const [replySubject, setReplySubject] = useState(
        contact.subject.startsWith("Re:") ? contact.subject : `Re: ${contact.subject}`
    );
    const [replyBody, setReplyBody] = useState("");
    const [sending, setSending] = useState(false);
    const [repliedAt, setRepliedAt] = useState(contact.replied_at);
    const [replyError, setReplyError] = useState("");

    const handleStatusChange = async (newStatus: Status) => {
        setStatusOpen(false);
        if (newStatus === status) return;
        setUpdatingStatus(true);
        const res = await updateContactStatus(contact.id, newStatus);
        if (res.success) setStatus(newStatus);
        setUpdatingStatus(false);
    };

    const handleNotesBlur = async () => {
        if (notes === (contact.notes ?? "")) return;
        setSavingNotes(true);
        await saveContactNotes(contact.id, notes);
        setSavingNotes(false);
    };

    const handleReply = async () => {
        if (!replyBody.trim()) return;
        setSending(true);
        setReplyError("");
        const res = await replyToContact(
            contact.id,
            contact.email,
            contact.name,
            contact.subject,
            replyBody
        );
        if (res.success) {
            setRepliedAt(new Date().toISOString());
            setReplyOpen(false);
            setReplyBody("");
        } else {
            setReplyError(res.error || "שגיאה בשליחה");
        }
        setSending(false);
    };

    return (
        <GlassCard className="space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="font-semibold">{contact.name}</p>
                    <p className="text-sm text-teal-400 font-mono">{contact.email}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                    <p className="text-xs text-text-muted whitespace-nowrap">
                        {new Date(contact.created_at).toLocaleDateString("he-IL", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </p>
                    {/* Status pill */}
                    <div className="relative">
                        <button
                            onClick={() => setStatusOpen((v) => !v)}
                            disabled={updatingStatus}
                            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${STATUS_COLORS[status]}`}
                        >
                            {updatingStatus ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                                <ChevronDown className="h-3 w-3" />
                            )}
                            {STATUS_LABELS[status]}
                        </button>
                        {statusOpen && (
                            <div className="absolute left-0 top-full mt-1 z-10 bg-[#0f172a] border border-white/10 rounded-xl shadow-xl overflow-hidden min-w-[100px]">
                                {(["new", "in_progress", "closed"] as Status[]).map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => handleStatusChange(s)}
                                        className={`w-full text-right px-3 py-2 text-xs hover:bg-white/5 transition-colors ${s === status ? "text-teal-400" : "text-text-secondary"}`}
                                    >
                                        {STATUS_LABELS[s]}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Subject */}
            <p className="text-sm font-medium text-text-secondary border-r-2 border-teal-400/40 pr-3">
                {contact.subject}
            </p>

            {/* Message */}
            <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
                {contact.message}
            </p>

            {/* Actions row */}
            <div className="flex items-center gap-3 pt-1 border-t border-white/5">
                {/* Reply button — always shown; badge shows last reply date */}
                <button
                    onClick={() => setReplyOpen((v) => !v)}
                    className="text-xs text-text-secondary hover:text-teal-400 transition-colors flex items-center gap-1"
                >
                    ↩ השב
                </button>
                {repliedAt && (
                    <span className="flex items-center gap-1 text-xs text-teal-400/70">
                        <CheckCircle2 className="h-3 w-3" />
                        {new Date(repliedAt).toLocaleDateString("he-IL")}
                    </span>
                )}

                {/* Notes toggle */}
                <button
                    onClick={() => setNotesOpen((v) => !v)}
                    className="text-xs text-text-secondary hover:text-teal-400 transition-colors mr-auto"
                >
                    {notesOpen ? "סגור הערות" : "הוסף הערה"}
                    {savingNotes && <Loader2 className="inline h-3 w-3 animate-spin mr-1" />}
                </button>
            </div>

            {/* Reply form */}
            {replyOpen && (
                <div className="space-y-3 pt-2 border-t border-white/5">
                    <input
                        type="text"
                        value={replySubject}
                        onChange={(e) => setReplySubject(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-sm focus:outline-none focus:border-teal-400"
                        placeholder="נושא"
                    />
                    <textarea
                        value={replyBody}
                        onChange={(e) => setReplyBody(e.target.value)}
                        rows={5}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-sm focus:outline-none focus:border-teal-400 resize-none"
                        placeholder="כתוב את תשובתך כאן..."
                    />
                    {replyError && (
                        <p className="text-xs text-red-400">{replyError}</p>
                    )}
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={() => setReplyOpen(false)}
                            className="px-3 py-1.5 text-xs text-text-secondary hover:text-white transition-colors"
                        >
                            ביטול
                        </button>
                        <button
                            onClick={handleReply}
                            disabled={sending || !replyBody.trim()}
                            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-white text-xs font-medium transition-all disabled:opacity-50"
                        >
                            {sending ? <Loader2 className="h-3 w-3 animate-spin" /> : null}
                            שלח תשובה
                        </button>
                    </div>
                </div>
            )}

            {/* Notes field */}
            {notesOpen && (
                <div className="pt-2 border-t border-white/5">
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        onBlur={handleNotesBlur}
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-sm focus:outline-none focus:border-teal-400 resize-none"
                        placeholder="הערות פנימיות (לא נשלחות ללקוח)..."
                    />
                </div>
            )}
        </GlassCard>
    );
}
