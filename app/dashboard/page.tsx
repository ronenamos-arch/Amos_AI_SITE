import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
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
    Crown
} from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    // Fetch profile data
    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    const isPremium = profile?.subscription_status === 'monthly' || profile?.subscription_status === 'lifetime';

    return (
        <div className="pt-24 pb-16 min-h-screen">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Link href="/" className="text-text-muted hover:text-teal-400 transition-colors">
                                <ArrowLeft className="h-5 w-5" />
                            </Link>
                            <h1 className="text-4xl font-bold">האזור האישי</h1>
                        </div>
                        <p className="text-text-secondary">ברוך הבא, {user.email}</p>
                    </div>

                    <div className="flex gap-4">
                        {isPremium ? (
                            <Badge variant="royal" className="px-4 py-2 text-sm">
                                <Crown className="h-4 w-4 ml-2" /> מנוי PRO פעיל
                            </Badge>
                        ) : (
                            <Badge variant="muted" className="px-4 py-2 text-sm font-medium">
                                משתמש רשום (חינם)
                            </Badge>
                        )}
                    </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Main Content Side */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Membership Card */}
                        <GlassCard className="p-8 border-t-2 border-teal-400/30">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-12 w-12 rounded-xl bg-teal-400/10 flex items-center justify-center border border-teal-400/20">
                                    <Zap className="h-6 w-6 text-teal-400" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold">סטטוס המנוי שלך</h2>
                                    <p className="text-sm text-text-secondary">נהל את הגישה שלך לתכנים</p>
                                </div>
                            </div>

                            {isPremium ? (
                                <div className="space-y-4">
                                    <p className="text-text-primary">יש לך גישה מלאה לכל התכנים באתר! תהנה מהמדריכים, הפרומפטים והקורסים הבלעדיים.</p>
                                    <div className="pt-4 flex gap-4">
                                        <Button href="/blog">עבור לבלוג הפרימיום</Button>
                                        <Button variant="ghost" href="/courses">צפה בקורסים שלי</Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <p className="text-text-secondary">כרגע אתה רשום למסלול החינמי. שדרג ל-PRO כדי לפתוח את כל המדריכים המקצועיים והפרומפטים לחשבונאים.</p>
                                    <div className="pt-4">
                                        <Button href="/pricing" variant="primary">שדרג עכשיו ל-PRO</Button>
                                    </div>
                                </div>
                            )}
                        </GlassCard>

                        {/* Recent Activity / Content Recommendations */}
                        <div className="grid gap-6 md:grid-cols-2">
                            <GlassCard className="p-6" hover={true}>
                                <div className="flex items-center gap-3 mb-4">
                                    <BookOpen className="h-5 w-5 text-teal-400" />
                                    <h3 className="font-bold">תכנים מומלצים</h3>
                                </div>
                                <ul className="space-y-3">
                                    <li>
                                        <Link href="/blog" className="text-sm text-text-secondary hover:text-teal-400 transition-colors block border-b border-white/5 pb-2">
                                            איך להטמיע את NotebookLM בביקורת
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/blog" className="text-sm text-text-secondary hover:text-teal-400 transition-colors block border-b border-white/5 pb-2">
                                            5 פרומפטים לניתוח דוחות כספיים
                                        </Link>
                                    </li>
                                </ul>
                            </GlassCard>

                            <GlassCard className="p-6" hover={true}>
                                <div className="flex items-center gap-3 mb-4">
                                    <Trophy className="h-5 w-5 text-royal-400" />
                                    <h3 className="font-bold">ההתקדמות שלי</h3>
                                </div>
                                <div className="text-center py-4">
                                    <p className="text-xs text-text-muted mb-2">טרם התחלת קורסים פעילים</p>
                                    <Button href="/courses" variant="ghost" size="sm">מצא קורס</Button>
                                </div>
                            </GlassCard>
                        </div>
                    </div>

                    {/* Sidebar Area */}
                    <div className="space-y-8">
                        <GlassCard className="p-6">
                            <h3 className="font-bold mb-6 flex items-center gap-2">
                                <Settings className="h-5 w-5 text-text-muted" />
                                ניהול חשבון
                            </h3>
                            <nav className="space-y-2">
                                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/5 text-sm text-text-secondary transition-colors">
                                    <div className="flex items-center gap-3">
                                        <User className="h-4 w-4" />
                                        עדכון פרטים
                                    </div>
                                </button>
                                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/5 text-sm text-text-secondary transition-colors">
                                    <div className="flex items-center gap-3">
                                        <CreditCard className="h-4 w-4" />
                                        היסטוריית תשלומים
                                    </div>
                                </button>
                                <form action="/auth/signout" method="post">
                                    <button type="submit" className="w-full text-right p-3 rounded-lg hover:bg-red-500/10 text-sm text-red-400 transition-colors">
                                        התנתק מהמערכת
                                    </button>
                                </form>
                            </nav>
                        </GlassCard>

                        <GlassCard className="p-6 bg-royal-500/5 border-royal-500/20">
                            <h3 className="font-bold mb-4">צריך עזרה?</h3>
                            <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                                נתקלת בבעיה בגישה לתכנים? רוצה לשאול על פרויקט אוטומציה?
                            </p>
                            <Button href="/contact" variant="ghost" className="w-full text-sm">פנה לתמיכה בוואטסאפ</Button>
                        </GlassCard>
                    </div>
                </div>
            </div>
        </div>
    );
}
