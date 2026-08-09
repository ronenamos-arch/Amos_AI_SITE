import type { Metadata } from "next";
import { getAllGuides } from "@/lib/guides-data";
import { GuidesGrid } from "@/components/guides/GuidesGrid";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { HeroVideoBlock } from "@/components/sections/HeroVideoBlock";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: { absolute: "מדריכים AI לחשבונאים — Claude, ChatGPT, אוטומציה" },
    description:
        "למדו כיצד משתמשים בClaude וChatGPT לאוטומציה בחשבונאות. 5 מדריכים חינמיים על AI, עיבוד נתונים, דוחות כספיים, וחסכון 21 שעות בשבוע.",
    alternates: { canonical: "https://www.ronenamoscpa.co.il/guides" },
    keywords: [
        "מדריכי AI",
        "Claude לאנשי כספים",
        "ChatGPT לרואי חשבון",
        "אוטומציה פיננסית",
        "AI בחשבונאות",
        "מדריכים פיננסיים",
        "AI לCPA",
        "סוכני AI",
        "אוטומציה בתכנית הוצאות",
    ],
    openGraph: {
        title: "מדריכים AI לחשבונאים — Claude, ChatGPT, אוטומציה",
        description:
            "למדו כיצד משתמשים בClaude וChatGPT לאוטומציה בחשבונאות.",
        url: "https://www.ronenamoscpa.co.il/guides",
        type: "website",
    },
};

export default async function GuidesPage() {
    const guides = getAllGuides();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": ["Article", "FAQPage"],
        headline: "מדריכים מעשיים לשימוש ב-AI בחשבונאות",
        alternativeHeadline: "Practical Guides to AI for Accountants & Finance Professionals",
        description: "5 free guides teaching Claude, ChatGPT, automation frameworks for Israeli CPAs and accountants",
        author: {
            "@type": "Person",
            name: "Ronen Amos",
            title: "CPA & AI Automation Expert",
            url: "https://www.ronenamoscpa.co.il/",
            sameAs: [
                "https://www.linkedin.com/in/ronenamoscpa",
                "https://github.com/ronenamos",
            ],
        },
        datePublished: "2025-01-15",
        dateModified: "2026-05-01",
        publisher: {
            "@type": "Organization",
            name: "Ronen Amos CPA",
            logo: {
                "@type": "ImageObject",
                url: "https://www.ronenamoscpa.co.il/logo.png",
            },
        },
        mainEntityOfPage: "https://www.ronenamoscpa.co.il/guides",
        mainEntity: [
            {
                "@type": "Question",
                name: "Which is better for accounting—Claude or ChatGPT?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Claude excels at document analysis, spotting discrepancies in large datasets, and drafting sensitive communications (memos, client correspondence). ChatGPT is stronger for rapid data transformation and report generation. Most firms use both: Claude for quality, ChatGPT for speed.",
                },
            },
            {
                "@type": "Question",
                name: "How much time will AI actually save my firm?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Accountants report saving 50–80% of processing time on data entry and bank reconciliation tasks (Intuit 2025). Finance teams using AI tools save an average of 21 hours per week on routine work (BILL 2026). These hours typically shift to advisory work and client relationships—higher-margin work.",
                },
            },
            {
                "@type": "Question",
                name: "Do I need coding skills to use Claude for automation?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. Claude Code (included in these guides) lets you build Python and Excel automations without writing a single line yourself. If you can describe the task, Claude builds it.",
                },
            },
            {
                "@type": "Question",
                name: "Is my firm too small for AI automation?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "46% of accountants using AI work in firms of all sizes (Intuit 2025). The smallest wins—invoice categorization, expense matching, draft report generation—require no infrastructure changes and pay off immediately.",
                },
            },
        ],
    };

    return (
        <div className="pt-16 relative">
            {/* Finance-themed backdrop for the whole library page, dimmed so copy stays legible.
                Mirrors the treatment on /guides/[slug]. */}
            <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70"
                    style={{ backgroundImage: "url('/images/guides-page-bg.webp')" }}
                />
                <div className="absolute inset-0 bg-space-950/60" />
            </div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <section className="relative z-10 overflow-hidden border-b border-white/[0.06]">
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel mb-6">
                                <span
                                    className="text-xs font-medium"
                                    style={{ color: "#2dd4bf" }}
                                >
                                    📚 ספרייה מתעדכנת
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight">
                                <span className="text-white">
                                    המדריכים שמלמדים אנשי כספים
                                </span>
                                <br />
                                <span className="text-white">
                                    לעבוד חכם יותר –
                                </span>{" "}
                                <span className="gradient-text">עם AI</span>
                            </h1>

                            <p
                                className="text-base md:text-lg mb-8 leading-relaxed"
                                style={{ color: "#cbd5e1" }}
                            >
                                ספרייה של מדריכים מעשיים על Claude, ChatGPT,
                                אוטומציה ומחלקות כספים מבוססות-AI. בלי תיאוריה
                                — רק צעדים שאתה יכול ליישם השבוע.
                            </p>

                            <div
                                className="flex flex-wrap gap-6 text-sm"
                                style={{ color: "#94a3b8" }}
                            >
                                <div className="flex items-center gap-2">
                                    <span
                                        className="text-lg"
                                        style={{ color: "#2dd4bf" }}
                                    >
                                        ●
                                    </span>
                                    {guides.length} מדריכים
                                </div>
                                <div className="flex items-center gap-2">
                                    <span
                                        className="text-lg"
                                        style={{ color: "#22d3ee" }}
                                    >
                                        ●
                                    </span>
                                    7 קטגוריות
                                </div>
                            </div>
                        </div>

                        <HeroVideoBlock />
                    </div>
                </div>
            </section>

            <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <GuidesGrid guides={guides} />
            </section>

            <section
                className="relative z-10 border-t border-white/[0.06]"
                style={{
                    background:
                        "linear-gradient(180deg, transparent, rgba(15,23,42,0.6))",
                }}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                    <div className="glass-panel rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 text-right">
                        <div className="flex-grow text-center md:text-right">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                                קבל מדריך חדש כל שבוע
                            </h2>
                            <p
                                className="text-base max-w-xl"
                                style={{ color: "#94a3b8" }}
                            >
                                מצטרפים לרשימה — מקבלים מדריך מעשי חדש על AI
                                בכספים כל שבוע, ישירות למייל.
                            </p>
                        </div>
                        <div className="w-full md:w-auto">
                            <NewsletterForm source="guides" variant="inline" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
