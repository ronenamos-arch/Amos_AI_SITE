"use client";

import { useState } from "react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
    User,
    Settings,
    CreditCard,
    BookOpen,
    Trophy,
    Zap,
    ArrowLeft,
    Crown,
    PlayCircle,
    CheckCircle2,
    Lock,
    ExternalLink,
    Sparkles,
    FileCode,
    Video,
    Compass,
    MessageCircleQuestion,
    ChevronLeft
} from "lucide-react";
import { UpdateProfileModal } from "./UpdateProfileModal";
import { PaymentHistoryModal, type PaymentItem } from "./PaymentHistoryModal";
import { SMARTBEE_CONFIG } from "@/lib/smartbee-config";

export type { PaymentItem };

export interface CourseAccessItem {
    id: string;
    slug: string;
    title: string;
    description: string;
    price: string;
    level: string;
    duration: string;
    image: string;
    href: string;
    unlockedHref: string;
    isUnlocked: boolean;
    unlockedLabel: string;
}

export interface RecentArticleItem {
    slug: string;
    title: string;
    description: string;
    date: string;
    is_premium?: boolean;
    tags?: string[];
}

export interface GuideItem {
    slug: string;
    title: string;
    description: string;
    category: string;
}

interface DashboardClientProps {
    user: {
        id: string;
        email: string;
        fullName?: string;
        phone?: string;
    };
    isPremium: boolean;
    subscriptionStatus: string;
    subscriptionEndDate?: string | null;
    courses: CourseAccessItem[];
    payments: PaymentItem[];
    recentArticles: RecentArticleItem[];
    featuredGuides: GuideItem[];
}

export function DashboardClient({
    user,
    isPremium,
    subscriptionStatus,
    subscriptionEndDate,
    courses,
    payments,
    recentArticles,
    featuredGuides,
}: DashboardClientProps) {
    const [profileModalOpen, setProfileModalOpen] = useState(false);
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    const [userData, setUserData] = useState({
        fullName: user.fullName || "",
        phone: user.phone || "",
    });

    const unlockedCoursesCount = courses.filter((c) => c.isUnlocked).length;

    const handleProfileUpdated = (newFullName: string, newPhone: string) => {
        setUserData({ fullName: newFullName, phone: newPhone });
    };

    const displayName = userData.fullName || user.email.split("@")[0];

    return (
        <div className="pt-24 pb-20 min-h-screen text-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header Profile Bar */}
                <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-muted hover:text-teal-400 transition-colors"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                <span>חזרה לדף הבית</span>
                            </Link>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-black tracking-tight flex items-center gap-3">
                            <span>האזור האישי</span>
                            <span className="text-xl sm:text-2xl font-normal text-text-muted">|</span>
                            <span className="text-xl sm:text-2xl font-bold gradient-text">{displayName}</span>
                        </h1>
                        <p className="text-sm text-text-secondary mt-1">{user.email}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        {isPremium ? (
                            <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-teal-500/20 border border-teal-400/40 rounded-xl px-4 py-2.5 shadow-lg shadow-teal-950/40">
                                <Crown className="h-5 w-5 text-amber-400" />
                                <div>
                                    <div className="text-xs font-bold text-white">מנוי PRO פעיל</div>
                                    <div className="text-[10px] text-teal-300">
                                        {subscriptionStatus === "lifetime"
                                            ? "גישה לכל החיים"
                                            : subscriptionEndDate
                                            ? `בתוקף עד ${new Date(subscriptionEndDate).toLocaleDateString("he-IL")}`
                                            : "מנוי חודשי גמיש"}
                                    </div>
                                </div>
                            </div>
                        ) : unlockedCoursesCount > 0 ? (
                            <div className="flex items-center gap-2 bg-teal-500/10 border border-teal-400/30 rounded-xl px-4 py-2.5">
                                <Trophy className="h-5 w-5 text-teal-400" />
                                <div>
                                    <div className="text-xs font-bold text-white">בוגר קורסים רשום</div>
                                    <div className="text-[10px] text-teal-300">{unlockedCoursesCount} קורסים פתוחים ללמידה</div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Badge variant="muted" className="px-3.5 py-1.5 text-xs font-medium">
                                    משתמש רשום (מסלול חינם)
                                </Badge>
                                <a
                                    href={SMARTBEE_CONFIG.products.monthlySubscription.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rv2-btn rv2-btn-primary text-xs px-4 py-2 shadow-lg shadow-teal-500/20"
                                >
                                    שדרג ל-PRO
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Main Content (2 cols) */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* Pro Subscriber Exclusive Course Launcher */}
                        {isPremium && (
                            <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-500/15 via-royal-500/10 to-teal-500/5 border border-teal-400/40 relative overflow-hidden shadow-lg shadow-teal-950/30">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <Badge variant="teal" className="text-xs">הטבת Pro פרימיום 👑</Badge>
                                            <span className="text-xs text-teal-300 font-medium">פתוח לצפייה ללא הגבלה</span>
                                        </div>
                                        <h3 className="text-lg font-black text-white">
                                            הקורסים הבלעדיים שלך מוכנים ללמידה
                                        </h3>
                                        <p className="text-xs text-text-secondary mt-0.5">
                                            בחר קורס וכנס ישירות לנגן האינטראקטיבי:
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-2.5 w-full sm:w-auto">
                                        <Link
                                            href="/courses/notebook-master/learn"
                                            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-space-950 font-bold text-xs shadow-md shadow-teal-500/20 transition-all hover:scale-[1.02]"
                                        >
                                            <PlayCircle className="w-4 h-4" />
                                            <span>Mastering NotebookLM</span>
                                        </Link>
                                        <Link
                                            href="/courses/ai-mastery/learn"
                                            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-royal-500 hover:bg-royal-400 text-white font-bold text-xs shadow-md shadow-royal-500/20 transition-all hover:scale-[1.02]"
                                        >
                                            <PlayCircle className="w-4 h-4" />
                                            <span>AI לכספים למתחילים</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Section 1: My Courses & Access */}
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="h-9 w-9 rounded-xl bg-teal-400/10 flex items-center justify-center border border-teal-400/20 text-teal-400">
                                        <PlayCircle className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">הקורסים וההכשרות שלי</h2>
                                        <p className="text-xs text-text-secondary">
                                            גישה ישירה לחומרי הלמידה, הנגן והתרגולים
                                        </p>
                                    </div>
                                </div>
                                <span className="text-xs text-text-muted font-medium">
                                    {unlockedCoursesCount} מתוך {courses.length} זמינים
                                </span>
                            </div>

                            <div className="grid gap-6 sm:grid-cols-2">
                                {courses.map((course) => (
                                    <div
                                        key={course.id}
                                        className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
                                            course.isUnlocked
                                                ? "bg-space-900/90 border-teal-500/40 shadow-lg shadow-teal-950/50 hover:border-teal-400"
                                                : "bg-space-950/60 border-white/10 hover:border-white/20 opacity-80 hover:opacity-100"
                                        }`}
                                    >
                                        <div>
                                            {/* Image */}
                                            <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-white/10">
                                                <img
                                                    src={course.image}
                                                    alt={course.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-space-950 via-space-950/30 to-transparent" />

                                                <div className="absolute top-3 right-3 flex gap-2">
                                                    {course.isUnlocked ? (
                                                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300 bg-emerald-950/90 border border-emerald-500/40 px-2.5 py-1 rounded-lg backdrop-blur-sm">
                                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                                            נרכש ופתוח ללמידה
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-text-muted bg-space-950/80 border border-white/10 px-2.5 py-1 rounded-lg backdrop-blur-sm">
                                                            <Lock className="h-3.5 w-3.5" />
                                                            {course.price}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Body */}
                                            <div className="p-5">
                                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">
                                                    {course.title}
                                                </h3>
                                                <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed mb-4">
                                                    {course.description}
                                                </p>
                                                <div className="flex items-center gap-3 text-[11px] text-text-muted">
                                                    <span>רמה: {course.level}</span>
                                                    <span>•</span>
                                                    <span>{course.duration}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* CTA Footer */}
                                        <div className="p-5 pt-0 mt-auto">
                                            {course.isUnlocked ? (
                                                <Link
                                                    href={course.unlockedHref}
                                                    className="w-full py-2.5 px-4 rounded-xl bg-teal-400 text-space-950 hover:bg-teal-300 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-teal-500/20"
                                                >
                                                    <PlayCircle className="h-4 w-4" />
                                                    <span>{course.unlockedLabel}</span>
                                                    <ChevronLeft className="h-4 w-4" />
                                                </Link>
                                            ) : (
                                                <Link
                                                    href={course.href}
                                                    className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-medium text-xs flex items-center justify-center gap-2 transition-all"
                                                >
                                                    <span>לפרטים והרשמה ({course.price})</span>
                                                    <ChevronLeft className="h-3.5 w-3.5" />
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Section 2: Quick Access Hub / Benefits */}
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-9 w-9 rounded-xl bg-royal-500/10 flex items-center justify-center border border-royal-500/20 text-royal-400">
                                    <Sparkles className="h-5 w-5" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">משאבים וספריות תוכן</h2>
                                    <p className="text-xs text-text-secondary">
                                        גישה מהירה לכל הנכסים, הפרומפטים והמדריכים באתר
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <Link
                                    href="/skill-vault"
                                    className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-teal-400/40 transition-all flex items-start gap-4 group"
                                >
                                    <div className="h-10 w-10 rounded-xl bg-teal-400/10 flex items-center justify-center border border-teal-400/20 text-teal-400 flex-shrink-0 group-hover:scale-110 transition-transform">
                                        <FileCode className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-white group-hover:text-teal-400 transition-colors">
                                            ספריית הפרומפטים (Skill Vault)
                                        </h3>
                                        <p className="text-xs text-text-secondary mt-1">
                                            100+ פרומפטים וסקילים מוכנים לביקורת, ניתוח דוחות ואוטומציה.
                                        </p>
                                    </div>
                                </Link>

                                <Link
                                    href="/lessons"
                                    className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-royal-400/40 transition-all flex items-start gap-4 group"
                                >
                                    <div className="h-10 w-10 rounded-xl bg-royal-400/10 flex items-center justify-center border border-royal-400/20 text-royal-400 flex-shrink-0 group-hover:scale-110 transition-transform">
                                        <Video className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-white group-hover:text-royal-400 transition-colors">
                                            ספריית הוובינרים והשיעורים
                                        </h3>
                                        <p className="text-xs text-text-secondary mt-1">
                                            הקלטות מלאות, קובצי תרגול, חוברות Excel ומצגות להורדה.
                                        </p>
                                    </div>
                                </Link>

                                <Link
                                    href="/guides"
                                    className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-teal-400/40 transition-all flex items-start gap-4 group"
                                >
                                    <div className="h-10 w-10 rounded-xl bg-cyan-400/10 flex items-center justify-center border border-cyan-400/20 text-cyan-400 flex-shrink-0 group-hover:scale-110 transition-transform">
                                        <Compass className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                                            ספריית המדריכים המעשיים
                                        </h3>
                                        <p className="text-xs text-text-secondary mt-1">
                                            מדריכי Gamma אינטראקטיביים ל-ChatGPT, Power BI, Python ו-ERP.
                                        </p>
                                    </div>
                                </Link>

                                <Link
                                    href="/tools"
                                    className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-amber-400/40 transition-all flex items-start gap-4 group"
                                >
                                    <div className="h-10 w-10 rounded-xl bg-amber-400/10 flex items-center justify-center border border-amber-400/20 text-amber-400 flex-shrink-0 group-hover:scale-110 transition-transform">
                                        <Zap className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                                            כלים ומחשבונים פיננסיים
                                        </h3>
                                        <p className="text-xs text-text-secondary mt-1">
                                            כלים מותאמים לחישוב ROI של אוטומציה ואנליזה תקציבית.
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* Section 3: Dynamic Recent Content */}
                        <div className="grid gap-6 md:grid-cols-2">
                            {/* Latest Blog Articles */}
                            <GlassCard className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2.5">
                                        <BookOpen className="h-5 w-5 text-teal-400" />
                                        <h3 className="font-bold text-white">מאמרים אחרונים בבלוג</h3>
                                    </div>
                                    <Link href="/blog" className="text-xs text-teal-400 hover:underline">
                                        לכל המאמרים ←
                                    </Link>
                                </div>
                                <div className="space-y-3">
                                    {recentArticles.slice(0, 3).map((article) => (
                                        <Link
                                            key={article.slug}
                                            href={`/blog/${article.slug}`}
                                            className="block p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 transition-all group"
                                        >
                                            <div className="flex items-center justify-between gap-2 mb-1">
                                                <h4 className="text-xs font-bold text-white group-hover:text-teal-400 transition-colors line-clamp-1">
                                                    {article.title}
                                                </h4>
                                                <span className="text-[10px] text-text-muted flex-shrink-0">
                                                    {article.date}
                                                </span>
                                            </div>
                                            <p className="text-[11px] text-text-secondary line-clamp-1">
                                                {article.description}
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            </GlassCard>

                            {/* Featured Guides */}
                            <GlassCard className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2.5">
                                        <Compass className="h-5 w-5 text-royal-400" />
                                        <h3 className="font-bold text-white">מדריכים מומלצים</h3>
                                    </div>
                                    <Link href="/guides" className="text-xs text-royal-400 hover:underline">
                                        לכל המדריכים ←
                                    </Link>
                                </div>
                                <div className="space-y-3">
                                    {featuredGuides.slice(0, 3).map((guide) => (
                                        <Link
                                            key={guide.slug}
                                            href={`/guides/${guide.slug}`}
                                            className="block p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 transition-all group"
                                        >
                                            <div className="flex items-center justify-between gap-2 mb-1">
                                                <h4 className="text-xs font-bold text-white group-hover:text-royal-400 transition-colors line-clamp-1">
                                                    {guide.title}
                                                </h4>
                                                <span className="text-[10px] text-teal-400 bg-teal-400/10 px-1.5 py-0.5 rounded border border-teal-400/20">
                                                    {guide.category}
                                                </span>
                                            </div>
                                            <p className="text-[11px] text-text-secondary line-clamp-1">
                                                {guide.description}
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            </GlassCard>
                        </div>
                    </div>

                    {/* Sidebar Side (1 col) */}
                    <div className="space-y-6">
                        {/* Account Settings */}
                        <GlassCard className="p-6">
                            <h3 className="font-bold mb-5 flex items-center gap-2 text-white">
                                <Settings className="h-5 w-5 text-teal-400" />
                                <span>ניהול חשבון והגדרות</span>
                            </h3>

                            <div className="space-y-2">
                                <button
                                    onClick={() => setProfileModalOpen(true)}
                                    className="w-full flex items-center justify-between p-3.5 rounded-xl hover:bg-white/5 text-sm text-text-secondary hover:text-white transition-all border border-transparent hover:border-white/10 text-right group"
                                >
                                    <div className="flex items-center gap-3">
                                        <User className="h-4 w-4 text-teal-400 group-hover:scale-110 transition-transform" />
                                        <span>עדכון פרטים וסיסמה</span>
                                    </div>
                                    <ChevronLeft className="h-4 w-4 text-text-muted" />
                                </button>

                                <button
                                    onClick={() => setPaymentModalOpen(true)}
                                    className="w-full flex items-center justify-between p-3.5 rounded-xl hover:bg-white/5 text-sm text-text-secondary hover:text-white transition-all border border-transparent hover:border-white/10 text-right group"
                                >
                                    <div className="flex items-center gap-3">
                                        <CreditCard className="h-4 w-4 text-royal-400 group-hover:scale-110 transition-transform" />
                                        <span>היסטוריית תשלומים וקבלות</span>
                                    </div>
                                    {payments.length > 0 && (
                                        <span className="text-[11px] font-bold text-teal-400 bg-teal-400/10 px-2 py-0.5 rounded-full border border-teal-400/20">
                                            {payments.length}
                                        </span>
                                    )}
                                </button>

                                <form action="/auth/signout" method="post" className="pt-2">
                                    <button
                                        type="submit"
                                        className="w-full text-right p-3.5 rounded-xl hover:bg-red-500/10 text-sm text-red-400 hover:text-red-300 transition-colors"
                                    >
                                        התנתק מהמערכת
                                    </button>
                                </form>
                            </div>
                        </GlassCard>

                        {/* Direct Support / VIP Concierge */}
                        <GlassCard className="p-6 bg-gradient-to-b from-teal-500/10 to-space-950 border-teal-500/30">
                            <div className="flex items-center gap-3 mb-3">
                                <MessageCircleQuestion className="h-6 w-6 text-teal-400" />
                                <h3 className="font-bold text-white text-base">צריך עזרה או ייעוץ?</h3>
                            </div>
                            <p className="text-xs text-text-secondary mb-5 leading-relaxed">
                                נתקלת בבעיה בגישה לתכנים? רוצה להתייעץ על פרויקט אוטומציה או הכשרה לארגון שלך?
                            </p>
                            <a
                                href="https://wa.me/972505500344"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-950/50"
                            >
                                <span>פנה אלי ישירות בוואטסאפ</span>
                                <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                        </GlassCard>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <UpdateProfileModal
                isOpen={profileModalOpen}
                onClose={() => setProfileModalOpen(false)}
                initialData={{
                    id: user.id,
                    email: user.email,
                    fullName: userData.fullName,
                    phone: userData.phone,
                }}
                onUpdated={handleProfileUpdated}
            />

            <PaymentHistoryModal
                isOpen={paymentModalOpen}
                onClose={() => setPaymentModalOpen(false)}
                payments={payments}
            />
        </div>
    );
}
