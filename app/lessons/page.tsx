import "../home.css";
import type { Metadata } from "next";
import { HeaderV2 } from "@/components/redesign/HeaderV2";
import { FooterV2 } from "@/components/redesign/FooterV2";
import { NewsletterV2 } from "@/components/redesign/NewsletterV2";
import { lessons, lessonTopics, totalLessonMinutes, totalMaterials } from "@/lib/lessons-data";
import { LessonLibrary } from "./LessonLibrary";

export const metadata: Metadata = {
    title: "שיעורים בלייב ווובינרים | רונן עמוס",
    description:
        "ספריית השיעורים המוקלטים: מפגשים של שעה על Claude, Excel, אוטומציה ו-FP&A, עם מצגות, חוברות וקבצים להורדה.",
    robots: { index: false, follow: false },
};

export default function LessonsPage() {
    const hours = Math.round(totalLessonMinutes / 60);

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

            <section className="rv2-container py-14 lg:py-20">
                <LessonLibrary lessons={lessons} topics={lessonTopics} />
            </section>

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
