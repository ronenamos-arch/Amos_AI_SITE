import "./preview.css";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowLeft, Check } from "lucide-react";
import { guides } from "@/lib/guides-data";
import { courses } from "@/lib/courses";
import { tools } from "@/lib/tools-data";
import { getAllPosts } from "@/lib/blog";
import prompts from "@/content/prompts.json";
import { HeaderV2 } from "@/components/redesign/HeaderV2";
import { FooterV2 } from "@/components/redesign/FooterV2";
import { NewsletterV2 } from "@/components/redesign/NewsletterV2";

export const metadata: Metadata = {
    title: "תצוגה מקדימה — המרכז ל-AI בכספים | רונן עמוס",
    robots: { index: false, follow: false },
};

export default function PreviewHomePage() {
    const posts = getAllPosts()
        .filter((p) => p.date)
        .sort((a, b) => (a.date < b.date ? 1 : -1))
        .slice(0, 3);
    const latestGuides = [...guides]
        .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
        .slice(0, 3);
    const promptCount = (prompts as unknown[]).length;
    void promptCount;

    const hubCards = [
        {
            href: "/skill-vault",
            title: "Skill Vault",
            count: "200+ פריטים",
            desc: "הכספת המקצועית: מאות פרומפטים מוכנים, 50 דרכים לאוטומציה של סגירת החודש, מבני פרומפטים, חוברות Excel עם דוגמאות עבודה — הכל מוכן לשימוש.",
            big: true,
            image: "/images/hub/skill-vault.png" as string | null,
        },
        {
            href: "/guides",
            title: "מדריכים מעשיים",
            count: `${guides.length} מדריכים`,
            desc: "Claude, ChatGPT, Copilot, Power BI ו-NotebookLM — צעד־אחר־צעד לאנשי כספים.",
            big: false,
            image: latestGuides[0]?.thumbnail ?? null,
        },
        {
            href: "/courses",
            title: "קורסים",
            count: `${courses.length} קורסים`,
            desc: "מהיסודות ועד AI Finance Master — למידה בקצב שלכם.",
            big: false,
            image: courses[0]?.image ?? null,
        },
        {
            href: "/tools",
            title: "מדריך כלים",
            count: `${tools.length}+ כלים`,
            desc: "FP&A, אוטומציה, ERP ו-Fintech — מה שווה את הזמן שלכם.",
            big: false,
            image: "/images/hub/tools.png" as string | null,
        },
        {
            href: "/blog",
            title: "בלוג",
            count: "מאמרים שוטפים",
            desc: "ניתוחים, זרימות עבודה וחדשות AI לכספים — בעברית.",
            big: true,
            image: posts[0]?.image || null,
        },
    ];

    return (
        <div className="rv2 min-h-[100dvh]">
            <HeaderV2 />

            {/* Hero — asymmetric split */}
            <section className="rv2-container grid items-center gap-12 py-16 lg:grid-cols-[1.2fr_1fr] lg:py-24">
                <div className="rv2-rise">
                    <div className="rv2-kicker mb-4">המרכז הישראלי ל-AI בכספים</div>
                    <h1 className="rv2-display text-4xl sm:text-5xl lg:text-[3.4rem]">
                        כל מה שאיש כספים צריך
                        <br />
                        כדי לעבוד עם <span className="rv2-gold-text">AI</span> — במקום אחד
                    </h1>
                    <p className="mt-5 max-w-xl text-lg text-[var(--rv2-text-2)]">
                        מדריכים, מאות פרומפטים, וובינרים מוקלטים, חוברות Excel, קורסים
                        וכלים — הכל נבנה על ידי רו&quot;ח עם ניסיון של 10+ שנים בשטח.
                        בלי באזוורדים — רק מה שעובד.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center gap-5">
                        <Link href="/guides" className="rv2-btn rv2-btn-primary text-base">
                            לגלות את המשאבים
                            <ArrowLeft size={18} />
                        </Link>
                        <Link href="/pricing" className="rv2-link text-sm underline underline-offset-4">
                            מנוי פרימיום — ₪100 לחודש
                        </Link>
                    </div>
                </div>

                <div className="rv2-rise rv2-rise-2 grid grid-cols-2 gap-4">
                    {[
                        { value: "200+", label: "פרומפטים, אוטומציות וחוברות Excel ב-Skill Vault" },
                        { value: `${guides.length}`, label: "מדריכים מעשיים" },
                        { value: `${courses.length}`, label: "קורסים מלאים" },
                        { value: "10+", label: "שנות ניסיון רו״ח" },
                    ].map((s, i) => (
                        <div
                            key={s.label}
                            className={`rv2-surface p-6 ${i === 0 ? "col-span-2" : ""}`}
                        >
                            <div className="rv2-mono text-3xl font-bold text-[var(--rv2-accent-strong)]">
                                {s.value}
                            </div>
                            <div className="mt-1 text-sm text-[var(--rv2-text-2)]">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Resource hub — asymmetric bento */}
            <section className="rv2-container py-14">
                <div className="mb-8 flex items-end justify-between">
                    <div>
                        <div className="rv2-kicker mb-2">מרכז המשאבים</div>
                        <h2 className="rv2-display text-3xl">מה תמצאו כאן</h2>
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-6">
                    {hubCards.map((c) => (
                        <Link
                            key={c.href}
                            href={c.href}
                            className={`rv2-surface group overflow-hidden p-7 ${c.big ? "md:col-span-3" : "md:col-span-2"}`}
                        >
                            {c.image ? (
                                <div className="relative -mx-7 -mt-7 mb-5 h-36 overflow-hidden border-b border-[var(--rv2-border)]">
                                    <Image
                                        src={c.image}
                                        alt=""
                                        fill
                                        sizes="(min-width: 768px) 50vw, 100vw"
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                            ) : (
                                <div className="relative -mx-7 -mt-7 mb-5 h-36 border-b border-[var(--rv2-border)] bg-[rgba(212,175,55,0.06)]" />
                            )}
                            <div className="flex items-baseline gap-3">
                                <h3 className="text-xl font-bold">{c.title}</h3>
                                <span className="rv2-mono text-xs text-[var(--rv2-text-2)]">{c.count}</span>
                            </div>
                            <p className="mt-2 text-sm text-[var(--rv2-text-2)]">{c.desc}</p>
                            <span className="mt-4 inline-flex items-center gap-1 text-sm text-[var(--rv2-accent-strong)] opacity-0 transition-opacity group-hover:opacity-100">
                                לצפייה <ArrowLeft size={14} />
                            </span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Featured content */}
            <section className="rv2-container py-14">
                <div className="rv2-kicker mb-2">חדש באתר</div>
                <h2 className="rv2-display mb-8 text-3xl">המדריכים והמאמרים האחרונים</h2>
                <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
                    <div className="grid gap-4 sm:grid-cols-1">
                        {latestGuides.map((g) => (
                            <Link
                                key={g.slug}
                                href={`/guides/${g.slug}`}
                                className="rv2-surface flex items-center gap-5 p-5"
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
                                <div className="min-w-0">
                                    <div className="rv2-mono text-xs text-[var(--rv2-text-2)]">
                                        מדריך · {g.category} · {g.duration}
                                        {g.isPremium && (
                                            <span className="mr-2 text-[var(--rv2-accent-strong)]">פרימיום</span>
                                        )}
                                    </div>
                                    <div className="mt-1 line-clamp-2 font-semibold">{g.title}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="rv2-surface flex flex-col justify-between p-7">
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
                                                <span className="line-clamp-2 block font-medium text-[var(--rv2-text)]">
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
                            רואה חשבון עם ניסיון של יותר מעשור במחלקות כספים, ומומחה ליישום
                            AI, Power BI ואוטומציה בעולמות הפיננסים. כל מדריך, פרומפט וקורס
                            כאן נבנה מתוך עבודה אמיתית מול צוותי כספים בישראל.
                        </p>
                        <ul className="mt-5 space-y-2 text-sm">
                            {[
                                "רו״ח מוסמך · 10+ שנות ניסיון",
                                "Power BI Data Analyst · Python לפיננסים",
                                "מלווה מחלקות כספים בהטמעת AI ואוטומציה",
                            ].map((item) => (
                                <li key={item} className="flex items-center gap-2 text-[var(--rv2-text-2)]">
                                    <Check size={16} className="shrink-0 text-[var(--rv2-accent-strong)]" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-7 flex items-center gap-5">
                            <Link href="/about" className="rv2-btn rv2-btn-ghost text-sm">
                                להכיר אותי
                            </Link>
                            <Link href="/services" className="rv2-link text-sm underline underline-offset-4">
                                ייעוץ לארגונים
                            </Link>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2">
                        <Image
                            src="/images/avatar-hero-2.jpg"
                            alt="רונן עמוס"
                            width={520}
                            height={420}
                            className="h-72 w-full rounded-xl object-cover lg:h-96"
                        />
                    </div>
                </div>
            </section>

            {/* Membership pitch */}
            <section className="rv2-container py-14">
                <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
                    <div className="p-2 lg:p-6">
                        <div className="rv2-kicker mb-3">קהילת הפרימיום</div>
                        <h2 className="rv2-display text-3xl">
                            כל התוכן. כל הכלים.
                            <br />
                            <span className="rv2-gold-text">₪100 לחודש.</span>
                        </h2>
                        <p className="mt-4 text-[var(--rv2-text-2)]">
                            חברי הקהילה מקבלים גישה מלאה ל-Skill Vault — מאות פרומפטים,
                            אוטומציות וחוברות Excel — הקלטות וובינרים מעשיים של שעה ומעלה,
                            וקבוצת WhatsApp פעילה עם מענה ישיר ממני.
                        </p>
                        <Link href="/pricing" className="rv2-btn rv2-btn-primary mt-7 text-base">
                            להצטרפות לקהילה
                            <ArrowLeft size={18} />
                        </Link>
                    </div>
                    <div className="rv2-surface rv2-glow-card p-8">
                        <div className="mb-2 flex items-baseline justify-between gap-4">
                            <div className="text-2xl font-extrabold text-[var(--rv2-accent-strong)]">
                                מה מקבלים בפרימיום — <span className="rv2-gold-text">₪100/חודש</span>
                            </div>
                        </div>
                        <p className="mb-6 text-sm text-[var(--rv2-text-2)]">
                            גישה מלאה לכל המשאבים באתר — להורדה ולשימוש מיידי בעבודה.
                        </p>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {[
                                { title: "אוטומציות", desc: "50 דרכים לאוטומציה של סגירת החודש" },
                                { title: "וובינרים מוקלטים", desc: "הקלטות מעשיות של שעה+ עם דוגמאות אמיתיות" },
                                { title: "חוברות Excel", desc: "קבצי עבודה עם פרומפטים ודוגמאות מוכנות" },
                                { title: "מצגות PowerPoint", desc: "מצגות מקצועיות מוכנות לצוות ולהנהלה" },
                                { title: "קבצים להורדה", desc: "תבניות, מבני פרומפטים וכלי עבודה" },
                                { title: "קבוצת WhatsApp סגורה", desc: "מענה ישיר ממני ומהקהילה" },
                            ].map((f) => (
                                <div
                                    key={f.title}
                                    className="rounded-xl border border-[var(--rv2-border)] bg-[var(--rv2-box)] p-4"
                                >
                                    <div className="font-bold text-white">{f.title}</div>
                                    <div className="mt-0.5 text-sm text-[var(--rv2-text-2)]">{f.desc}</div>
                                </div>
                            ))}
                        </div>
                        <div className="rv2-divider mt-6 pt-4 text-sm text-[var(--rv2-text-2)]">
                            <span className="font-bold text-[var(--rv2-text)]">חינם — לכולם:</span>{" "}
                            מאמרים פתוחים בבלוג · ניוזלטר שבועי · מדריכים פתוחים נבחרים · מדריך הכלים המלא
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
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
