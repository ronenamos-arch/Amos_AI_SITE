"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { SubscriptionOverviewData } from "@/lib/actions/admin-subscriptions";
import { DollarSign, TrendingUp, Users, UserMinus, UserPlus, Layers } from "lucide-react";

export function SubscriptionStatsCards({ data }: { data: SubscriptionOverviewData }) {
    const cards = [
        {
            title: "MRR (הכנסה חודשית קבועה)",
            value: `₪${data.mrr.toLocaleString()}`,
            subtitle: `ARR שנתי חזוי: ₪${data.arr.toLocaleString()}`,
            icon: DollarSign,
            color: "text-emerald-400",
            borderColor: "border-emerald-500/20",
            bgGlow: "bg-emerald-500/10",
        },
        {
            title: "סך הכנסות (כל המוצרים)",
            value: `₪${data.totalRevenueAllTime.toLocaleString()}`,
            subtitle: `החודש: ₪${data.thisMonthRevenue.toLocaleString()} (${data.revenueGrowthPercent >= 0 ? `+${data.revenueGrowthPercent}%` : `${data.revenueGrowthPercent}%`})`,
            icon: TrendingUp,
            color: "text-teal-400",
            borderColor: "border-teal-500/20",
            bgGlow: "bg-teal-500/10",
        },
        {
            title: "מנויים פעילים",
            value: data.activeSubscribersCount,
            subtitle: `${data.monthlySubscribersCount} חודשי | ${data.lifetimeSubscribersCount} לכל החיים`,
            icon: Users,
            color: "text-cyan-400",
            borderColor: "border-cyan-500/20",
            bgGlow: "bg-cyan-500/10",
        },
        {
            title: "שיעור נטישה (Churn)",
            value: `${data.churnRatePercent}%`,
            subtitle: `${data.cancelledCount} ביטולים | ${data.paymentFailedCount} תשלומים שנכשלו`,
            icon: UserMinus,
            color: data.churnRatePercent > 5 ? "text-amber-400" : "text-emerald-400",
            borderColor: data.churnRatePercent > 5 ? "border-amber-500/20" : "border-emerald-500/20",
            bgGlow: data.churnRatePercent > 5 ? "bg-amber-500/10" : "bg-emerald-500/10",
        },
        {
            title: "לקוחות חדשים החודש",
            value: data.newSubscribersThisMonth,
            subtitle: `חודש שעבר: ${data.newSubscribersLastMonth}`,
            icon: UserPlus,
            color: "text-purple-400",
            borderColor: "border-purple-500/20",
            bgGlow: "bg-purple-500/10",
        },
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {cards.map((card, idx) => {
                    const Icon = card.icon;
                    return (
                        <GlassCard
                            key={idx}
                            className={`p-5 relative overflow-hidden transition-all duration-300 hover:border-white/20 ${card.borderColor}`}
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-xs font-medium text-text-muted">{card.title}</p>
                                    <p className="text-2xl font-extrabold text-white mt-2 tracking-tight">
                                        {card.value}
                                    </p>
                                    <p className="text-xs text-text-secondary mt-1.5 font-mono">
                                        {card.subtitle}
                                    </p>
                                </div>
                                <div className={`p-2.5 rounded-xl ${card.bgGlow} ${card.color}`}>
                                    <Icon className="h-5 w-5" />
                                </div>
                            </div>
                        </GlassCard>
                    );
                })}
            </div>

            {/* Revenue breakdown by channel */}
            <GlassCard className="p-5 border-white/10">
                <div className="flex items-center gap-2 mb-3">
                    <Layers className="h-4 w-4 text-teal-400" />
                    <h3 className="text-sm font-semibold text-white">פילוח הכנסות לפי מוצר (מצטבר)</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex justify-between items-center">
                        <span className="text-text-muted">מנויי תוכן PRO (חודשי/לכל החיים)</span>
                        <span className="font-bold text-white text-sm">
                            ₪{data.revenueBreakdown.subscriptions.toLocaleString()}
                        </span>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex justify-between items-center">
                        <span className="text-text-muted">קורס AI Master (₪599)</span>
                        <span className="font-bold text-teal-400 text-sm">
                            ₪{data.revenueBreakdown.courses.toLocaleString()}
                        </span>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex justify-between items-center">
                        <span className="text-text-muted">באנדל פרומפטים Claude (₪150)</span>
                        <span className="font-bold text-yellow-400 text-sm">
                            ₪{data.revenueBreakdown.bundles.toLocaleString()}
                        </span>
                    </div>
                </div>
            </GlassCard>
        </div>
    );
}
