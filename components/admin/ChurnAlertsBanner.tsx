"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SubscriptionProfile, extendSubscription } from "@/lib/actions/admin-subscriptions";
import { AlertTriangle, Mail, Clock, RefreshCw, CheckCircle2 } from "lucide-react";

export function ChurnAlertsBanner({
    atRiskSubscribers,
    onExtended,
}: {
    atRiskSubscribers: SubscriptionProfile[];
    onExtended?: () => void;
}) {
    const [extendingId, setExtendingId] = useState<string | null>(null);
    const [extendedMap, setExtendedMap] = useState<Record<string, boolean>>({});

    if (!atRiskSubscribers || atRiskSubscribers.length === 0) {
        return null;
    }

    const handleQuickExtend = async (userId: string) => {
        try {
            setExtendingId(userId);
            await extendSubscription(userId, 7); // +7 days
            setExtendedMap((prev) => ({ ...prev, [userId]: true }));
            if (onExtended) onExtended();
        } catch (err) {
            console.error("Failed to extend subscription:", err);
            alert("שגיאה בהארכת המנוי");
        } finally {
            setExtendingId(null);
        }
    };

    return (
        <GlassCard className="p-5 border-amber-500/30 bg-amber-500/5">
            <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 mt-0.5">
                    <AlertTriangle className="h-5 w-5" />
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-amber-300">
                            מנויים בסיכון נטישה / דורשים טיפול ({atRiskSubscribers.length})
                        </h4>
                        <span className="text-xs text-amber-400/80 bg-amber-500/10 px-2 py-0.5 rounded-full">
                            תשלומים שנכשלו ותקופות גרייס
                        </span>
                    </div>
                    <p className="text-xs text-text-muted mt-1">
                        משתמשים אלו חוו כשל בתשלום או ביטלו את החידוש אך עדיין נמצאים בתוך תקופת הגישה. פנייה יזומה עשויה לשמר אותם.
                    </p>

                    <div className="mt-4 divide-y divide-white/5 space-y-2">
                        {atRiskSubscribers.slice(0, 5).map((user) => {
                            const isExtended = extendedMap[user.id];
                            const isPaymentFailed = user.subscription_status === "payment_failed";

                            const daysLeft = user.subscription_end_date
                                ? Math.max(
                                      0,
                                      Math.ceil(
                                          (new Date(user.subscription_end_date).getTime() - Date.now()) /
                                              (1000 * 60 * 60 * 24)
                                      )
                                  )
                                : 0;

                            return (
                                <div
                                    key={user.id}
                                    className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                                >
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`px-2 py-0.5 rounded font-medium ${
                                                isPaymentFailed
                                                    ? "bg-red-500/10 text-red-400"
                                                    : "bg-amber-500/10 text-amber-300"
                                            }`}
                                        >
                                            {isPaymentFailed ? "כשל תשלום" : `בוטל (נותרו ${daysLeft} ימים)`}
                                        </span>
                                        <span className="text-white font-medium">{user.email || "ללא אימייל"}</span>
                                        {user.total_spent > 0 && (
                                            <span className="text-text-muted">
                                                (שילם עד כה: ₪{user.total_spent.toLocaleString()})
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {user.email && (
                                            <a
                                                href={`mailto:${user.email}?subject=${encodeURIComponent(
                                                    "רונן עמוס - עדכון לגבי המנוי שלך ב-AI Finance"
                                                )}&body=${encodeURIComponent(
                                                    `שלום,\n\nראיתי שיש עדכון לגבי המנוי שלך באתר AI Finance Transformation.\nרציתי לבדוק אם אוכל לעזור לך באופן אישי או להציע הטבה להמשך הגישה.\n\nבברכה,\nרונן עמוס`
                                                )}`}
                                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 hover:bg-white/15 text-white transition-colors"
                                            >
                                                <Mail className="h-3 w-3" />
                                                שלח מייל שימור
                                            </a>
                                        )}

                                        {isExtended ? (
                                            <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                                                <CheckCircle2 className="h-3.5 w-3.5" />
                                                הוארך בשבוע
                                            </span>
                                        ) : (
                                            <button
                                                onClick={() => handleQuickExtend(user.id)}
                                                disabled={extendingId === user.id}
                                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 transition-colors disabled:opacity-50"
                                            >
                                                {extendingId === user.id ? (
                                                    <RefreshCw className="h-3 w-3 animate-spin" />
                                                ) : (
                                                    <Clock className="h-3 w-3" />
                                                )}
                                                הארך ב-7 ימים
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </GlassCard>
    );
}
