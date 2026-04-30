import type { Metadata } from "next";
import { getAllGuides } from "@/lib/guides-data";
import { GuidesGrid } from "@/components/guides/GuidesGrid";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: { absolute: "מדריכי AI לאנשי כספים | רונן עמוס CPA" },
    description:
        "ספריית מדריכים מעשיים על Claude, ChatGPT, אוטומציה ו-AI לצוותי כספים. צעדים פרקטיים שתוכל ליישם השבוע — ללא תיאוריה.",
    alternates: { canonical: "https://www.ronenamoscpa.co.il/guides" },
    keywords: [
        "מדריכי AI",
        "Claude לאנשי כספים",
        "ChatGPT לרואי חשבון",
        "אוטומציה פיננסית",
        "Power BI מדריך",
        "Excel AI",
        "מדריכים פיננסיים",
        "AI לCFO",
        "סוכני AI",
    ],
    openGraph: {
        title: "מדריכי AI לאנשי כספים | רונן עמוס",
        description:
            "ספריית מדריכים מעשיים על Claude, ChatGPT ואוטומציה לצוותי כספים.",
        url: "https://www.ronenamoscpa.co.il/guides",
        type: "website",
    },
};

export default async function GuidesPage() {
    const guides = getAllGuides();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "מדריכי AI לאנשי כספים",
        description:
            "ספריית מדריכים מעשיים על AI, Claude, ChatGPT ואוטומציה לצוותי כספים",
        numberOfItems: guides.length,
        itemListElement: guides.map((g, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: g.title,
            description: g.description,
            url:
                g.gammaUrl !== "#"
                    ? g.gammaUrl
                    : `https://www.ronenamoscpa.co.il/guides`,
        })),
    };

    return (
        <div className="pt-16">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <section className="relative overflow-hidden border-b border-white/[0.06]">
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        background:
                            "radial-gradient(ellipse at top left, #1e1b4b 0%, transparent 50%)",
                    }}
                />

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

                        <div className="relative hidden lg:block">
                            <div
                                className="absolute -inset-4 opacity-40 blur-3xl"
                                style={{
                                    background:
                                        "radial-gradient(ellipse, #22d3ee 0%, #3b82f6 40%, transparent 70%)",
                                }}
                            />

                            <div
                                className="relative glass-panel rounded-xl overflow-hidden shadow-2xl"
                                style={{
                                    background:
                                        "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(2,6,23,0.95))",
                                }}
                            >
                                <div
                                    className="px-4 py-3 flex items-center justify-between border-b"
                                    style={{
                                        borderColor: "rgba(255,255,255,0.08)",
                                        background: "rgba(15,23,42,0.6)",
                                    }}
                                    dir="ltr"
                                >
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-7 h-7 rounded-full"
                                            style={{
                                                background:
                                                    "linear-gradient(135deg, #8b5cf6, #ec4899)",
                                            }}
                                        />
                                        <div>
                                            <div className="text-xs font-bold text-white leading-tight">
                                                Finance Dashboard
                                            </div>
                                            <div
                                                className="text-[9px]"
                                                style={{ color: "#94a3b8" }}
                                            >
                                                Modern KPI + trends view
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div
                                            className="px-2 py-1 rounded text-[9px] font-medium"
                                            style={{
                                                background:
                                                    "rgba(255,255,255,0.05)",
                                                color: "#cbd5e1",
                                            }}
                                        >
                                            All
                                        </div>
                                        <div
                                            className="px-2 py-1 rounded text-[9px] font-medium"
                                            style={{
                                                background:
                                                    "linear-gradient(135deg, #22d3ee, #2dd4bf)",
                                                color: "#020617",
                                            }}
                                        >
                                            Export
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-4 gap-2 p-3" dir="ltr">
                                    <div
                                        className="rounded-lg p-2.5"
                                        style={{
                                            background: "rgba(34,211,238,0.08)",
                                            border: "1px solid rgba(34,211,238,0.2)",
                                        }}
                                    >
                                        <div
                                            className="text-[8px] font-bold uppercase tracking-wider"
                                            style={{ color: "#67e8f9" }}
                                        >
                                            Revenue
                                        </div>
                                        <div className="text-sm font-bold text-white mt-1">
                                            $297K
                                        </div>
                                        <div className="text-[8px] text-emerald-400">
                                            +1.6% MoM
                                        </div>
                                    </div>
                                    <div
                                        className="rounded-lg p-2.5"
                                        style={{
                                            background: "rgba(45,212,191,0.08)",
                                            border: "1px solid rgba(45,212,191,0.2)",
                                        }}
                                    >
                                        <div
                                            className="text-[8px] font-bold uppercase tracking-wider"
                                            style={{ color: "#5eead4" }}
                                        >
                                            ARR
                                        </div>
                                        <div className="text-sm font-bold text-white mt-1">
                                            $295K
                                        </div>
                                        <div className="text-[8px] text-emerald-400">
                                            +3.6%
                                        </div>
                                    </div>
                                    <div
                                        className="rounded-lg p-2.5"
                                        style={{
                                            background: "rgba(59,130,246,0.08)",
                                            border: "1px solid rgba(59,130,246,0.2)",
                                        }}
                                    >
                                        <div
                                            className="text-[8px] font-bold uppercase tracking-wider"
                                            style={{ color: "#93c5fd" }}
                                        >
                                            Profit
                                        </div>
                                        <div className="text-sm font-bold text-white mt-1">
                                            $88K
                                        </div>
                                        <div
                                            className="text-[8px]"
                                            style={{ color: "#94a3b8" }}
                                        >
                                            Net 29.8%
                                        </div>
                                    </div>
                                    <div
                                        className="rounded-lg p-2.5"
                                        style={{
                                            background: "rgba(168,85,247,0.08)",
                                            border: "1px solid rgba(168,85,247,0.2)",
                                        }}
                                    >
                                        <div
                                            className="text-[8px] font-bold uppercase tracking-wider"
                                            style={{ color: "#c4b5fd" }}
                                        >
                                            Customers
                                        </div>
                                        <div className="text-sm font-bold text-white mt-1">
                                            3,168
                                        </div>
                                        <div className="text-[8px] text-amber-400">
                                            Churn 2.8%
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="grid grid-cols-2 gap-2 px-3 pb-3"
                                    dir="ltr"
                                >
                                    <div
                                        className="rounded-lg p-3"
                                        style={{
                                            background: "rgba(255,255,255,0.03)",
                                            border: "1px solid rgba(255,255,255,0.06)",
                                        }}
                                    >
                                        <div className="text-[9px] font-semibold text-white mb-2">
                                            Revenue & ARR
                                        </div>
                                        <svg viewBox="0 0 120 50" className="w-full h-12">
                                            <defs>
                                                <linearGradient
                                                    id="g1"
                                                    x1="0%"
                                                    y1="0%"
                                                    x2="0%"
                                                    y2="100%"
                                                >
                                                    <stop
                                                        offset="0%"
                                                        stopColor="#22d3ee"
                                                        stopOpacity="0.4"
                                                    />
                                                    <stop
                                                        offset="100%"
                                                        stopColor="#22d3ee"
                                                        stopOpacity="0"
                                                    />
                                                </linearGradient>
                                            </defs>
                                            <path
                                                d="M0,40 L15,38 L30,32 L45,28 L60,25 L75,20 L90,15 L105,10 L120,8 L120,50 L0,50 Z"
                                                fill="url(#g1)"
                                            />
                                            <path
                                                d="M0,40 L15,38 L30,32 L45,28 L60,25 L75,20 L90,15 L105,10 L120,8"
                                                fill="none"
                                                stroke="#22d3ee"
                                                strokeWidth="1.5"
                                            />
                                            <path
                                                d="M0,42 L15,41 L30,38 L45,36 L60,33 L75,30 L90,27 L105,24 L120,22"
                                                fill="none"
                                                stroke="#ec4899"
                                                strokeWidth="1"
                                                strokeDasharray="2,1"
                                            />
                                        </svg>
                                    </div>
                                    <div
                                        className="rounded-lg p-3"
                                        style={{
                                            background: "rgba(255,255,255,0.03)",
                                            border: "1px solid rgba(255,255,255,0.06)",
                                        }}
                                    >
                                        <div className="text-[9px] font-semibold text-white mb-2">
                                            Margins
                                        </div>
                                        <svg viewBox="0 0 120 50" className="w-full h-12">
                                            <path
                                                d="M0,15 L15,17 L30,14 L45,16 L60,13 L75,15 L90,12 L105,14 L120,11"
                                                fill="none"
                                                stroke="#2dd4bf"
                                                strokeWidth="1.5"
                                            />
                                            <path
                                                d="M0,32 L15,33 L30,30 L45,32 L60,28 L75,30 L90,27 L105,29 L120,26"
                                                fill="none"
                                                stroke="#f59e0b"
                                                strokeWidth="1.5"
                                            />
                                        </svg>
                                    </div>
                                </div>

                                <div
                                    className="grid grid-cols-3 gap-2 px-3 pb-3"
                                    dir="ltr"
                                >
                                    <div
                                        className="rounded-lg p-2"
                                        style={{
                                            background: "rgba(255,255,255,0.03)",
                                            border: "1px solid rgba(255,255,255,0.06)",
                                        }}
                                    >
                                        <div className="text-[8px] font-semibold text-white mb-1">
                                            Expense Mix
                                        </div>
                                        <svg viewBox="0 0 60 30" className="w-full h-8">
                                            <rect x="2" y="10" width="4" height="18" fill="#3b82f6" opacity="0.7" />
                                            <rect x="9" y="8" width="4" height="20" fill="#ec4899" opacity="0.7" />
                                            <rect x="16" y="12" width="4" height="16" fill="#3b82f6" opacity="0.7" />
                                            <rect x="23" y="6" width="4" height="22" fill="#ec4899" opacity="0.7" />
                                            <rect x="30" y="9" width="4" height="19" fill="#3b82f6" opacity="0.7" />
                                            <rect x="37" y="11" width="4" height="17" fill="#ec4899" opacity="0.7" />
                                            <rect x="44" y="7" width="4" height="21" fill="#3b82f6" opacity="0.7" />
                                            <rect x="51" y="13" width="4" height="15" fill="#ec4899" opacity="0.7" />
                                        </svg>
                                    </div>
                                    <div
                                        className="rounded-lg p-2"
                                        style={{
                                            background: "rgba(255,255,255,0.03)",
                                            border: "1px solid rgba(255,255,255,0.06)",
                                        }}
                                    >
                                        <div className="text-[8px] font-semibold text-white mb-1">
                                            Customer Flow
                                        </div>
                                        <svg viewBox="0 0 60 30" className="w-full h-8">
                                            <path
                                                d="M0,20 L10,15 L20,18 L30,12 L40,16 L50,8 L60,11"
                                                fill="none"
                                                stroke="#22d3ee"
                                                strokeWidth="1"
                                            />
                                            <path
                                                d="M0,25 L10,24 L20,26 L30,23 L40,25 L50,22 L60,24"
                                                fill="none"
                                                stroke="#ec4899"
                                                strokeWidth="1"
                                            />
                                        </svg>
                                    </div>
                                    <div
                                        className="rounded-lg p-2"
                                        style={{
                                            background: "rgba(255,255,255,0.03)",
                                            border: "1px solid rgba(255,255,255,0.06)",
                                        }}
                                    >
                                        <div className="text-[8px] font-semibold text-white mb-1">
                                            Unit Economics
                                        </div>
                                        <svg viewBox="0 0 60 30" className="w-full h-8">
                                            <rect x="2" y="14" width="3" height="14" fill="#22d3ee" opacity="0.6" />
                                            <rect x="7" y="10" width="3" height="18" fill="#22d3ee" opacity="0.6" />
                                            <rect x="12" y="12" width="3" height="16" fill="#22d3ee" opacity="0.6" />
                                            <rect x="17" y="8" width="3" height="20" fill="#22d3ee" opacity="0.6" />
                                            <rect x="22" y="11" width="3" height="17" fill="#22d3ee" opacity="0.6" />
                                            <rect x="27" y="6" width="3" height="22" fill="#22d3ee" opacity="0.6" />
                                            <rect x="32" y="9" width="3" height="19" fill="#22d3ee" opacity="0.6" />
                                            <rect x="37" y="13" width="3" height="15" fill="#22d3ee" opacity="0.6" />
                                            <rect x="42" y="7" width="3" height="21" fill="#22d3ee" opacity="0.6" />
                                            <rect x="47" y="10" width="3" height="18" fill="#22d3ee" opacity="0.6" />
                                            <rect x="52" y="5" width="3" height="23" fill="#22d3ee" opacity="0.6" />
                                            <rect x="57" y="8" width="3" height="20" fill="#22d3ee" opacity="0.6" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <GuidesGrid guides={guides} />
            </section>

            <section
                className="border-t border-white/[0.06]"
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
