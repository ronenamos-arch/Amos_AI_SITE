"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
    getSubscriptionOverview,
    getSubscribersList,
    SubscriptionOverviewData,
    SubscriptionProfile,
} from "@/lib/actions/admin-subscriptions";
import { SubscriptionStatsCards } from "@/components/admin/SubscriptionStatsCards";
import { ChurnAlertsBanner } from "@/components/admin/ChurnAlertsBanner";
import { SubscriptionsTable } from "@/components/admin/SubscriptionsTable";
import { RefreshCw, CreditCard, ShieldAlert } from "lucide-react";

export default function SubscriptionsAdminPage() {
    const [overview, setOverview] = useState<SubscriptionOverviewData | null>(null);
    const [subscribers, setSubscribers] = useState<SubscriptionProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadData = useCallback(async (isSilent = false) => {
        try {
            if (!isSilent) setLoading(true);
            else setRefreshing(true);
            setError(null);

            const [overviewData, subscribersData] = await Promise.all([
                getSubscriptionOverview(),
                getSubscribersList(),
            ]);

            setOverview(overviewData);
            setSubscribers(subscribersData);
        } catch (err: any) {
            console.error("Failed to load subscription data:", err);
            setError(err.message || "שגיאה בטעינת נתוני המנויים");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10" dir="rtl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                        <CreditCard className="h-7 w-7" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-extrabold text-white tracking-tight">
                            דשבורד מנויים והכנסות
                        </h1>
                        <p className="text-sm text-text-muted mt-0.5">
                            שליטה במנויים, מעקב MRR, הכנסות מכל המוצרים וניתוח שיעור נטישה (Churn)
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => loadData(true)}
                        disabled={refreshing || loading}
                        className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-white border border-white/10 transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                        <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin text-teal-400" : ""}`} />
                        <span>רענן נתונים</span>
                    </button>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
                    <ShieldAlert className="h-5 w-5 shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            {/* Loading Skeleton */}
            {loading && !overview ? (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="h-28 rounded-2xl bg-white/5 animate-pulse" />
                        ))}
                    </div>
                    <div className="h-96 rounded-2xl bg-white/5 animate-pulse" />
                </div>
            ) : overview ? (
                <div className="space-y-8">
                    {/* Financial Stats & MRR Cards */}
                    <SubscriptionStatsCards data={overview} />

                    {/* Churn & Retention Alerts Banner */}
                    <ChurnAlertsBanner
                        atRiskSubscribers={overview.atRiskSubscribers}
                        onExtended={() => loadData(true)}
                    />

                    {/* Interactive Subscribers Management Table */}
                    <div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                            <div>
                                <h2 className="text-xl font-bold text-white">רשימת מנויים ומשתמשים</h2>
                                <p className="text-xs text-text-muted mt-0.5">
                                    <span className="text-teal-400 font-semibold">{subscribers.length} משתמשים רשומים לאתר</span>
                                    {" · "}
                                    <span className="text-blue-400 font-semibold">{overview.newsletterSubscribersCount} נרשמי ניוזלטר</span>
                                    {" (לרשימת התפוצה המלאה עבור אל "}
                                    <Link href="/admin/newsletter" className="underline hover:text-white text-blue-300">ניהול ניוזלטר</Link>
                                    {")"}
                                </p>
                            </div>
                        </div>
                        <SubscriptionsTable
                            subscribers={subscribers}
                            onRefresh={() => loadData(true)}
                        />
                    </div>
                </div>
            ) : null}
        </div>
    );
}
