import "../home.css";
import type { Metadata } from "next";
import { HeaderV2 } from "@/components/redesign/HeaderV2";
import { FooterV2 } from "@/components/redesign/FooterV2";
import { NewsletterV2 } from "@/components/redesign/NewsletterV2";
import Link from "next/link";
import { Lock } from "lucide-react";
import { lessons, lessonTopics, totalLessonMinutes, totalMaterials } from "@/lib/lessons-data";
import { LessonLibrary } from "./LessonLibrary";
import { getSubscriptionAccess } from "@/lib/subscription-access";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "שיעורים בלייב ווובינרים | רונן עמוס",
    description:
        "ספריית השיעורים המוקלטים: מפגשים של שעה על Claude, Excel, אוטומציה ו-FP&A, עם מצגות, חוברות וקבצים להורדה.",
    robots: { index: false, follow: false },
};

export default async function LessonsPage() {
    const hours = Math.round(totalLessonMinutes / 60);
    const { user, hasAccess } = await getSubscriptionAccess();

    return (
        <div className="rv2 min-h-[100dvh]">
            <HeaderV2 />

            <section className="rv2-container py-16 lg:py-20">
                <div className="rv2-rise max-w-3xl">
                    <div className="rv2-kicker mb-4">הספרייה</div>
                    <h1 className="rv2-display text-4xl sm:text-5xl lg:text-[3.2rem]">
                        שיעורים בלייב ווובינרים
                    </h1>
                    <p className="mt-5 text-lg text-[var(--rv2-text-2)]">
                        <span dir="ltr">{lessons.length}</span> מפגשים מוקלטים,{" "}
                        <span dir="ltr">{hours}</span> שעות של עבודה על המסך, ו-
                        <span dir="ltr">{totalMaterials}</span> קבצים להורדה — חוברות Excel,
                        פרומפטים, מצגות וקוד. כל שיעור נבנה סביב בעיה אמיתית מהעבודה השוטפת
                        של אנשי כספים.
                    </p>
                </div>
            </section>

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
                            <a href="/api/subscribe" className="rv2-btn rv2-btn-primary px-7 py-3">
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
