import "../home.css";
import type { Metadata } from "next";
import { HeaderV2 } from "@/components/redesign/HeaderV2";
import { FooterV2 } from "@/components/redesign/FooterV2";
import { NewsletterV2 } from "@/components/redesign/NewsletterV2";
import Image from "next/image";
import Link from "next/link";
import { Lock, Sparkles, Video, Clock, FolderDown } from "lucide-react";
import { lessons, lessonTopics, totalLessonMinutes, totalMaterials } from "@/lib/lessons-data";
import { LessonLibrary } from "./LessonLibrary";
import { LessonsHero } from "./LessonsHero";
import { getSubscriptionAccess } from "@/lib/subscription-access";
import { SMARTBEE_CONFIG } from "@/lib/smartbee-config";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "הדרכות לייב ווובינרים | הקלטות לצפייה | רונן עמוס",
    description:
        "ספריית השיעורים המוקלטים: מפגשים של שעה על Claude, Excel, אוטומציה ו-FP&A, עם מצגות, חוברות וקבצים להורדה.",
    robots: { index: false, follow: false },
};

export default async function LessonsPage() {
    const hours = Math.round(totalLessonMinutes / 60);
    const { user, hasAccess: subscriptionAccess } = await getSubscriptionAccess();
    const isDev = process.env.NODE_ENV === "development";
    const hasAccess = isDev || subscriptionAccess;

    return (
        <div className="rv2 min-h-[100dvh] relative overflow-hidden">
            {/* Ambient Lighting Orbs */}
            <div className="pointer-events-none absolute -top-24 right-1/4 h-[420px] w-[420px] rounded-full bg-amber-500/15 blur-[130px]" />
            <div className="pointer-events-none absolute top-36 left-10 h-[500px] w-[500px] rounded-full bg-cyan-500/15 blur-[150px]" />
            <div className="pointer-events-none absolute top-1/2 right-12 h-[600px] w-[600px] rounded-full bg-amber-400/10 blur-[170px]" />
            <div className="pointer-events-none absolute bottom-1/4 left-1/3 h-[500px] w-[500px] rounded-full bg-cyan-400/10 blur-[160px]" />

            <HeaderV2 />

            <LessonsHero
                lessonsCount={lessons.length}
                hours={hours}
                totalMaterials={totalMaterials}
            />

            {hasAccess ? (
                <section className="rv2-container py-14 lg:py-20">
                    <LessonLibrary lessons={lessons} topics={lessonTopics} />
                </section>
            ) : (
                /* The webinar library is a paid perk: no recordings or materials
                   are rendered for non-subscribers, only the pitch. */
                <section className="rv2-container py-14 lg:py-20">
                    <div className="rv2-surface rv2-glow-card mx-auto max-w-2xl p-10 text-center lg:p-14">
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[var(--rv2-border-strong)] bg-[var(--rv2-surface-2)]">
                            <Lock size={26} className="text-[var(--rv2-accent)]" />
                        </div>
                        <h2 className="rv2-display text-2xl lg:text-3xl">
                            ספריית הוובינרים פתוחה למנויים בלבד
                        </h2>
                        <p className="mx-auto mt-4 max-w-lg text-[var(--rv2-text-2)]">
                            מנוי אחד פותח את כל ההקלטות, המצגות, חוברות ה-Excel והקבצים להורדה —
                            יחד עם כל המדריכים וספריית הפרומפטים.
                        </p>
                        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <a
                                href={SMARTBEE_CONFIG.products.monthlySubscription.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rv2-btn rv2-btn-primary px-7 py-3"
                            >
                                רכוש מנוי
                            </a>
                            {!user && (
                                <Link href="/login" className="rv2-link text-sm underline underline-offset-4">
                                    כבר מנויים? התחברו
                                </Link>
                            )}
                        </div>
                    </div>
                </section>
            )}

            <section className="rv2-container py-14">
                <div className="rv2-surface flex flex-col items-start gap-6 p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">
                    <div>
                        <h2 className="rv2-display text-2xl">ניוזלטר AI לכספים</h2>
                        <p className="mt-2 text-sm text-[var(--rv2-text-2)]">
                            פעם בשבוע: מדריך, פרומפט או כלי אחד שחוסך לכם שעות. בלי ספאם.
                        </p>
                    </div>
                    <NewsletterV2 />
                </div>
            </section>

            <FooterV2 />
        </div>
    );
}
