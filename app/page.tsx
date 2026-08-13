import "./home.css";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowLeft, Check } from "lucide-react";
import { guides } from "@/lib/guides-data";
import { courses } from "@/lib/courses";
import { tools } from "@/lib/tools-data";
import { getAllPosts } from "@/lib/blog";
import { HeaderV2 } from "@/components/redesign/HeaderV2";
import { FooterV2 } from "@/components/redesign/FooterV2";
import { NewsletterV2 } from "@/components/redesign/NewsletterV2";
import { ResourceCarousel } from "@/components/redesign/ResourceCarousel";
import { TestimonialsV2 } from "@/components/redesign/TestimonialsV2";
import { FaqV2 } from "@/components/redesign/FaqV2";
import { SUBSCRIPTION_PRICE, SUBSCRIPTION_PERIOD } from "@/lib/paypal-subscribe";
import type { ResourceCard } from "@/lib/resource-cards";

/** Kept in one place so the hero, the closing CTA and the FAQ never disagree. */
const PRICE = SUBSCRIPTION_PRICE;
const PRICE_PERIOD = SUBSCRIPTION_PERIOD;

export const metadata: Metadata = {
    title: 'רונן עמוס | רו"ח ויועץ AI פיננסי – המרכז ל-AI בכספים',
    description:
        'רו"ח מוסמך עם מעל עשור ניסיון. מדריכים, פרומפטים ווובינרים מוקלטים שעוזרים לאנשי כספים לחסוך שעות עבודה עם AI, Power BI ואוטומציה פיננסית.',
    alternates: {
        canonical: "https://www.ronenamoscpa.co.il",
    },
    keywords: [
        "רואה חשבון",
        "יועץ AI",
        "Power BI",
        "אוטומציה פיננסית",
        "ייעוץ פיננסי",
        "בינה מלאכותית עסקים",
        "דשבורד פיננסי",
        'רו"ח דיגיטלי',
        "אוטומציה Excel",
    ],
    openGraph: {
        title: 'רונן עמוס | רו"ח ויועץ AI פיננסי',
        description:
            "מדריכים, פרומפטים ווובינרים מוקלטים לאנשי כספים — לחסוך שעות עבודה עם AI ואוטומציה פיננסית.",
        url: "https://www.ronenamoscpa.co.il",
        type: "website",
    },
};

export default function HomePage() {
    const subscribeUrl = "/api/subscribe";
    const posts = getAllPosts()
        .filter((p) => p.date)
        .sort((a, b) => (a.date < b.date ? 1 : -1))
        .slice(0, 3);
    const latestGuides = [...guides]
        .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
        .slice(0, 3);

    const membershipPerks = [
        { title: "וובינרים מוקלטים", desc: "הקלטות מעשיות של שעה+ עם דוגמאות אמיתיות" },
        { title: "חוברות Excel", desc: "קבצי עבודה עם פרומפטים ודוגמאות מוכנות" },
        { title: "אוטומציות", desc: "50 דרכים לאוטומציה של סגירת החודש" },
        { title: "מצגות PowerPoint", desc: "מצגות מקצועיות מוכנות לצוות ולהנהלה" },
        { title: "קבצים להורדה", desc: "תבניות, מבני פרומפטים וכלי עבודה" },
        { title: "קבוצת WhatsApp סגורה", desc: "מענה ישיר ממני ומהקהילה" },
    ];

    // PLACEHOLDER ARTWORK — add an `image` path per card and the gradient
    // placeholder is replaced automatically.
    const resourceCards: ResourceCard[] = [
        {
            href: "/skill-vault",
            category: "ספריית הפרומפטים",
            title: "ספריית הפרומפטים והסקילים",
            desc: "מאות פרומפטים מוכנים, אוטומציות לסגירת החודש וחוברות Excel עם דוגמאות עבודה.",
            image: "/images/card-prompts.png",
        },
        {
            href: "/guides",
            category: "מדריכים",
            title: "מעל 30 מדריכים פרקטיים",
            desc: "Claude, ChatGPT, Copilot, Power BI ו-NotebookLM — צעד־אחר־צעד לאנשי כספים.",
            image: "/images/card-guides.jpg",
        },
        {
            href: "/lessons",
            category: "וידאו",
            title: "שיעורים בלייב ווובינרים",
            desc: "מפגשים מוקלטים של שעה, עם מצגות, חוברות Excel וקבצים להורדה.",
            image: "/images/card-webinars.jpg",
        },
        {
            href: "/blog",
            category: "קריאה",
            title: "הבלוג",
            desc: "מאמרים, ניתוחים ועדכונים על AI לכספים בעברית.",
            image: "/images/card-blog.png",
        },
    ];

    return (
        <div className="rv2 min-h-[100dvh]">
            <HeaderV2 />

            {/* Hero — Right-aligned text, dashboard image on the left */}
            <section className="relative min-h-[95vh] flex items-center overflow-hidden py-16 lg:py-24 text-right">
                {/* Background Image (Same size & style as before, shifted to align dashboard screen) */}
                <img
                    src="/images/background-avatar.png"
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    style={{ objectPosition: 'center 35%' }}
                />
                {/* Dark overlay for readability (lighter to show the dashboard details) */}
                <div className="absolute inset-0 bg-gradient-to-b from-space-950/10 via-space-950/25 to-space-950/65 pointer-events-none" />

                {/* Dynamic Background Effects (Same as 3000) */}
                <div className="data-stream-bg" />
                <div className="absolute top-0 left-1/4 h-[600px] w-[600px] rounded-full bg-neon-cyan/10 blur-[140px] animate-pulse" style={{ animationDuration: '8s' }} />
                <div className="absolute bottom-0 right-1/4 h-[600px] w-[600px] rounded-full bg-royal-500/10 blur-[140px] animate-pulse" style={{ animationDuration: '12s' }} />

                <div className="rv2-container relative z-10 w-full grid lg:grid-cols-2 items-center gap-16">
                    {/* Right side: text and CTA */}
                    <div className="rv2-rise flex flex-col items-start text-right">
                        <div className="rv2-kicker mb-4 text-[0.9375rem] text-[var(--rv2-accent-strong)]">המרכז הישראלי ל-AI בכספים</div>

                        <h1 className="rv2-display text-[2.4rem] sm:text-[3.25rem] lg:text-[3.5rem] leading-tight text-white">
                            כל הידע, הכלים והיישומים של{" "}
                            <span className="text-[var(--rv2-accent-strong)]">AI</span>
                            <br />
                            בעולמות הפיננסים — במנוי אחד
                        </h1>

                        {/* Colored fonts beneath */}
                        <p className="mt-5 max-w-xl text-[1.2rem] text-[#cbd5e1] leading-relaxed">
                            מדריכים מעשיים, ספריית פרומפטים, וובינרים, קורסים קצרים לאנשי
                            כספים — כדי ש-<span dir="ltr">AI</span> יעבוד בשבילך ולא להיפך.
                        </p>

                        <ul className="mt-6 flex flex-col gap-2.5 text-[1.05rem] text-[#cbd5e1] leading-relaxed">
                            {[
                                <>סדנאות קצרות ל-<span dir="ltr">Excel + Gemini, Claude, Copilot</span> וכדומה</>,
                                <>מדריכים צעד אחר צעד לאוטומציה בדוחות</>,
                                <>תוכן בעברית, מותאם לרואי חשבון, אנליסטים, חשבי שכר ואנשי כספים</>,
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span aria-hidden className="mt-[0.45em] h-2 w-2 shrink-0 rounded-full bg-[var(--rv2-accent-strong)]" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Big luxury subscription button */}
                        <div className="mt-10 flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto">
                            <a
                                href={subscribeUrl}
                                className="rv2-btn rv2-btn-luxury text-xl px-9 py-4 shadow-2xl shadow-black/40"
                            >
                                רכוש מנוי Pro
                                <ArrowLeft size={20} className="mr-2" />
                            </a>

                            <Link href="/guides/copilot-cowork" className="rv2-btn rv2-btn-ghost text-base">
                                צפה במדריך לדוגמה
                            </Link>
                        </div>

                        {/* Price + risk reversal — the cost must never require a click to discover */}
                        <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.95rem] text-[var(--rv2-text-2)]">
                            <span>
                                <span dir="ltr" className="rv2-mono text-xl font-extrabold text-white">
                                    {PRICE}
                                </span>{" "}
                                {PRICE_PERIOD}
                            </span>
                            <span aria-hidden className="opacity-40">·</span>
                            <span>הצטרפות מיידית</span>
                            <span aria-hidden className="opacity-40">·</span>
                            <span>ביטול בכל רגע</span>
                            <span aria-hidden className="opacity-40">·</span>
                            <span>ללא התחייבות</span>
                        </p>

                        {/* Stats counters */}
                        <div className="mt-10 pt-8 border-t border-white/5 w-full">
                            <span className="rv2-mono flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.95rem] text-[var(--rv2-text-2)]">
                                {[
                                    ["30+", "מדריכים מעשיים"],
                                    ["100+", "ספריית פרומפטים וסקילים"],
                                    ["✓", "שיעורים חיים, מוקלטים כולל חוברות עבודה"],
                                ].map(([value, label], i) => (
                                    <span key={label} className="flex items-center gap-2">
                                        {i > 0 && <span aria-hidden className="opacity-40">·</span>}
                                        <span>
                                            <span dir="ltr" className="font-extrabold text-white text-[1.05rem]">{value}</span> <span className="text-[#94a3b8]">{label}</span>
                                        </span>
                                    </span>
                                ))}
                            </span>
                        </div>
                    </div>

                    {/* Left side empty placeholder to allow the background image dashboard to stand out */}
                    <div className="hidden lg:block w-full" />
                </div>
            </section>

            {/* Resource hub — carousel */}
            <section className="rv2-container py-14">
                <div className="mb-8">
                    <div className="rv2-kicker mb-2">מרכז המשאבים</div>
                    <h2 className="rv2-display text-3xl">מה תמצאו כאן</h2>
                    <p className="mt-3 max-w-2xl text-[var(--rv2-text-2)]">
                        ארבעה מסלולים, כולם באותו מקום — גללו בין הכרטיסים.
                    </p>
                </div>

                <ResourceCarousel cards={resourceCards} />
            </section>

            {/* Featured content */}
            <section className="rv2-container py-14">
                <div className="rv2-kicker mb-2">חדש באתר</div>
                <h2 className="rv2-display mb-8 text-3xl">המדריכים והמאמרים האחרונים</h2>
                <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
                    <div className="grid gap-4 sm:grid-cols-1">
                        {latestGuides.map((g, i) => (
                            <Link
                                key={g.slug}
                                href={`/guides/${g.slug}`}
                                className="rv2-surface flex items-center gap-5 p-5"
                                style={{
                                    background:
                                        g.isPremium && i < 2
                                            ? "rgba(56, 132, 224, 0.18)"
                                            : "rgba(15, 23, 42, 0.7)",
                                }}
                            >
                                {g.thumbnail && (
                                    <Image
                                        src={g.thumbnail}
                                        alt=""
                                        width={176}
                                        height={112}
                                        className="hidden h-28 w-44 shrink-0 rounded-lg object-cover sm:block"
                                    />
                                )}
                                <div className="min-w-0 flex-1">
                                    <div className="rv2-mono text-xs text-[#94a3b8]">
                                        מדריך · {g.category} · {g.duration}
                                    </div>
                                    <div className="mt-1 line-clamp-2 font-semibold text-white">{g.title}</div>
                                </div>
                                {g.isPremium && (
                                    <span className="rv2-mono shrink-0 self-start text-base font-extrabold text-[var(--rv2-accent-strong)]">
                                        פרימיום
                                    </span>
                                )}
                            </Link>
                        ))}
                    </div>
                    <div className="rv2-surface flex flex-col justify-between p-7 bg-[rgba(15,23,42,0.7)]">
                        <div>
                            <div className="rv2-kicker mb-3">מהבלוג</div>
                            <ul className="space-y-4">
                                {posts.map((p) => (
                                    <li key={p.slug}>
                                        <Link href={`/blog/${p.slug}`} className="rv2-link flex items-center gap-4">
                                            {p.image && (
                                                <Image
                                                    src={p.image}
                                                    alt=""
                                                    width={128}
                                                    height={80}
                                                    className="h-20 w-32 shrink-0 rounded-lg object-cover"
                                                />
                                            )}
                                            <span className="min-w-0">
                                                <span className="line-clamp-2 block font-medium text-white">
                                                    {p.title}
                                                </span>
                                                <span className="rv2-mono text-xs">{p.date}</span>
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Link
                            href="/blog"
                            className="mt-6 inline-flex items-center gap-1 text-sm text-[var(--rv2-accent-strong)]"
                        >
                            לכל המאמרים <ArrowLeft size={14} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Authority strip */}
            <section className="rv2-container py-14">
                <div className="rv2-surface grid items-center gap-10 p-8 lg:grid-cols-[1fr_1.6fr] lg:p-12">
                    <div className="order-2 lg:order-1">
                        <div className="rv2-kicker mb-3">מי מאחורי המרכז</div>
                        <h2 className="rv2-display text-3xl">רונן עמוס, רו&quot;ח</h2>
                        <p className="mt-4 text-[var(--rv2-text-2)]">
                            רואה חשבון עם יותר מעשור של ניסיון בעולמות הכספים, ובשנים
                            האחרונות מתמחה בחיבור בין <span dir="ltr">AI</span>, אוטומציה
                            ועבודת הכספים היומיומית.
                        </p>
                        <p className="mt-3 text-[var(--rv2-text-2)]">
                            הידע והתכנים באתר נבנים מתוך ניסיון מעשי בעבודה עם מחלקות כספים,
                            חשבונאות ו-<span dir="ltr">FP&amp;A</span> — במטרה לעזור לאנשי
                            כספים לא רק להכיר כלי <span dir="ltr">AI</span>, אלא להשתמש בהם
                            כדי לעבוד חכם, מהר ויעיל יותר.
                        </p>
                        <ul className="mt-5 space-y-2 text-sm">
                            {[
                                "רו״ח מוסמך · 10+ שנות ניסיון בעולמות הכספים",
                                "Data Analyst · Python לפיננסים",
                                "מלווה מחלקות כספים בהטמעת AI ואוטומציה",
                            ].map((item) => (
                                <li key={item} className="flex items-center gap-2 text-[var(--rv2-text-2)]">
                                    <Check size={16} className="shrink-0 text-[var(--rv2-accent-strong)]" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-7 flex items-center gap-5">
                            <Link href="/contact" className="rv2-btn rv2-btn-ghost text-sm">
                                לשיחת התאמה קצרה
                            </Link>
                            <Link href="/services" className="rv2-link text-sm underline underline-offset-4">
                                ייעוץ לארגונים
                            </Link>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2">
                        {/* Autoplay must start muted (browser policy); the controls
                            let visitors unmute to hear the spoken welcome. */}
                        <video
                            src="/videos/website-welcome.mp4"
                            poster="/videos/website-welcome-poster.jpg"
                            autoPlay
                            muted
                            loop
                            playsInline
                            controls
                            aria-label="רונן עמוס"
                            className="h-72 w-full rounded-xl object-cover lg:h-96"
                        />
                    </div>
                </div>
            </section>

            {/* Social proof → objections → the ask. Order matters: earn trust,
                clear doubts, then request the sale. */}
            <TestimonialsV2 />

            <FaqV2 />

            {/* Closing CTA — the page must ask for the subscription again after
                a full scroll, not hand the hottest traffic a free newsletter. */}
            <section className="rv2-container py-14">
                <div className="rv2-surface rv2-glow-card bg-[rgba(15,23,42,0.75)] p-10 text-center lg:p-14">
                    <h2 className="rv2-display mx-auto max-w-2xl text-3xl lg:text-4xl">
                        מוכנים להפסיק לחפש ולהתחיל לעבוד?
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-[var(--rv2-text-2)]">
                        מנוי אחד פותח את כל הספרייה — מדריכים, פרומפטים, סקילים, וובינרים מוקלטים
                        וחוברות Excel. הכל בעברית, הכל מהשטח.
                    </p>

                    <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <a href={subscribeUrl} className="rv2-btn rv2-btn-primary rv2-arrow text-base">
                            רכוש מנוי Pro
                            <ArrowLeft size={18} aria-hidden />
                        </a>
                        <Link href="/guides" className="rv2-btn rv2-btn-ghost text-base">
                            להתרשם מהתוכן הפתוח
                        </Link>
                    </div>

                    <p className="mt-6 text-sm text-[var(--rv2-text-2)]">
                        <span dir="ltr" className="rv2-mono font-extrabold text-white">{PRICE}</span>{" "}
                        {PRICE_PERIOD} · ביטול בכל עת · ללא התחייבות
                    </p>
                </div>
            </section>

            {/* Newsletter — secondary, for visitors not ready to subscribe */}
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
