import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { GlassCard } from "@/components/ui/GlassCard";
import { FileText, Mail, MessageSquare, PlaySquare, CreditCard, GraduationCap } from "lucide-react";

async function getCounts() {
    const admin = createAdminClient();

    const [articlesRes, subscribersRes, contactsRes, bundlesRes, coursesRes, profilesRes] = await Promise.all([
        admin.from("articles").select("*", { count: "exact", head: true }),
        admin.from("newsletter_subscribers").select("*", { count: "exact", head: true }).eq("status", "active"),
        admin.from("contact_submissions").select("*", { count: "exact", head: true }),
        admin.from("bundle_purchases").select("*", { count: "exact", head: true }).eq("status", "paid"),
        admin.from("course_purchases").select("*", { count: "exact", head: true }).eq("status", "paid"),
        admin.from("profiles").select("subscription_status"),
    ]);

    const profiles = profilesRes.data || [];
    const activeMonthly = profiles.filter((p) => p.subscription_status === "monthly").length;
    const activeLifetime = profiles.filter((p) => p.subscription_status === "lifetime").length;
    const activeSubscribers = activeMonthly + activeLifetime;
    const mrr = activeMonthly * 100;

    return {
        articles: articlesRes.count ?? 0,
        subscribers: subscribersRes.count ?? 0,
        contacts: contactsRes.count ?? 0,
        bundles: bundlesRes.count ?? 0,
        courses: coursesRes.count ?? 0,
        activeSubscribers,
        mrr,
    };
}

export default async function AdminHomePage() {
    const counts = await getCounts();

    const cards = [
        {
            href: "/admin/subscriptions",
            icon: CreditCard,
            label: "דשבורד מנויים והכנסות",
            count: counts.activeSubscribers,
            unit: `מנויים פעילים (MRR ₪${counts.mrr.toLocaleString()})`,
            color: "text-emerald-400",
        },
        {
            href: "/admin/bundle-purchases",
            icon: PlaySquare,
            label: "מכירות באנדל",
            count: counts.bundles,
            unit: "רוכשים",
            color: "text-yellow-400",
        },
        {
            href: "/admin/blog",
            icon: FileText,
            label: "ניהול בלוג",
            count: counts.articles,
            unit: "מאמרים",
            color: "text-teal-400",
        },
        {
            href: "/admin/newsletter",
            icon: Mail,
            label: "ניוזלטר",
            count: counts.subscribers,
            unit: "נרשמים פעילים",
            color: "text-blue-400",
        },
        {
            href: "/admin/contacts",
            icon: MessageSquare,
            label: "פניות",
            count: counts.contacts,
            unit: "הודעות",
            color: "text-purple-400",
        },
    ];

    return (
        <div className="pt-24 pb-16 min-h-screen">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8" dir="rtl">
                <h1 className="text-3xl font-bold mb-8">לוח ניהול</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {cards.map(({ href, icon: Icon, label, count, unit, color }) => (
                        <Link key={href} href={href} className="block group">
                            <GlassCard className="h-full transition-all group-hover:border-white/20">
                                <div className="flex flex-col gap-4">
                                    <div className={`${color} w-fit`}>
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold">{count}</p>
                                        <p className="text-sm text-text-muted mt-0.5">{unit}</p>
                                    </div>
                                    <p className="text-sm font-medium text-text-secondary group-hover:text-white transition-colors">
                                        {label} ←
                                    </p>
                                </div>
                            </GlassCard>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
