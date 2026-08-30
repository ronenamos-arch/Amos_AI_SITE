import "./bundle-sales.css";
import Image from "next/image";
import {
    Clock,
    CheckCircle2,
    Shield,
    Play,
    FileText,
    Sparkles,
    Table2,
    Presentation,
    Code2,
    ChevronDown,
    Star,
    Users,
    Zap,
    ArrowLeft,
} from "lucide-react";
import { bundleChapters, bundleConfig, totalBundleMinutes, totalBundleMaterials } from "@/lib/bundle-data";
import { BundleCheckout } from "@/components/bundle/BundleCheckout";

/* ── Material icon map ─────────────────────────────────────── */
const MAT_ICON: Record<string, typeof Table2> = {
    workbook: Table2,
    prompts: FileText,
    skills: Sparkles,
    deck: Presentation,
    code: Code2,
};

/* ── FAQ Data ──────────────────────────────────────────────── */
const faqs = [
    {
        q: "למי החבילה הזו מתאימה?",
        a: "לרואי חשבון, מנהלי כספים, CFOs, בוקרים וכל מי שעובד עם נתונים פיננסיים ורוצה להשתמש ב-Claude כסביבת עבודה יומיומית.",
    },
    {
        q: "לכמה זמן הגישה?",
        a: "גישה לצמיתות. אחרי הרכישה תקבלו קישור אישי שפועל תמיד — בלי הגבלת זמן.",
    },
    {
        q: "צריך ידע טכני מוקדם?",
        a: "לא. הסדרה מתחילה מהבסיס ומתקדמת בהדרגה. מספיק לדעת לעבוד עם Excel.",
    },
    {
        q: "מה הפורמט של החומרים?",
        a: "כל פרק כולל הקלטת וידאו מלאה + דף מלווה עם פרומפטים, חוברות Excel, תבניות PowerPoint, Skills מוכנים וקוד — הכל להורדה.",
    },
    {
        q: "אפשר לשלם בתשלומים?",
        a: "המחיר הוא ₪150 חד פעמי בלבד — זה כבר מחיר מוזל במיוחד. התשלום מתבצע דרך PayPal בצורה מאובטחת.",
    },
    {
        q: "מה אם יש לי שאלות אחרי הרכישה?",
        a: "אפשר לשלוח מייל ל-ronenamos@gmail.com או הודעת WhatsApp ל-050-5500344 — אשמח לעזור.",
    },
];

export default function BundleSalesPage() {
    const hours = Math.round(totalBundleMinutes / 60);

    return (
        <>
            {/* ═══════ HERO ═══════ */}
            <section className="bundle-hero rv2-container py-20 lg:py-28">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="rv2-kicker mb-5 animate-fade-in">
                        סדרת וובינרים מוקלטים
                    </div>
                    <h1 className="rv2-display text-4xl sm:text-5xl lg:text-6xl animate-slide-up">
                        <span className="rv2-gold-text">{bundleConfig.name}</span>
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--rv2-text-2)] animate-slide-up-delay">
                        {hours} שעות של עבודה חיה על המסך, {totalBundleMaterials} קבצים
                        להורדה — פרומפטים, חוברות Excel, מצגות, Skills וקוד. מהבסיס ועד
                        בניית מערכת עבודה שלמה ב-Claude.
                    </p>

                    {/* Quick stats */}
                    <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 animate-fade-in-delay">
                        {[
                            { icon: Play, label: "5 פרקים", sub: "שעה כל אחד" },
                            { icon: FileText, label: `${totalBundleMaterials}+ קבצים`, sub: "להורדה" },
                            { icon: Sparkles, label: "Skills מוכנים", sub: "להפעלה מיידית" },
                            { icon: Shield, label: "גישה לצמיתות", sub: "ללא הגבלת זמן" },
                        ].map((s, i) => (
                            <div
                                key={i}
                                className="rv2-surface flex flex-col items-center p-5 text-center"
                            >
                                <s.icon
                                    size={24}
                                    className="mb-2 text-[var(--rv2-accent)]"
                                />
                                <div className="text-sm font-bold">{s.label}</div>
                                <div className="text-xs text-[var(--rv2-text-2)]">{s.sub}</div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center animate-slide-up-delay">
                        <a
                            href="#pricing"
                            className="rv2-btn rv2-btn-primary px-8 py-3 text-lg"
                        >
                            לרכישה — ₪{bundleConfig.price}
                            <ArrowLeft size={18} className="rv2-arrow" />
                        </a>
                        <a
                            href="#chapters"
                            className="rv2-link text-sm underline underline-offset-4"
                        >
                            מה בפנים? ↓
                        </a>
                    </div>
                </div>
            </section>

            {/* ═══════ SOCIAL PROOF BAR ═══════ */}
            <section className="rv2-container pb-12">
                <div className="rv2-surface flex flex-wrap items-center justify-center gap-6 px-6 py-5 text-sm text-[var(--rv2-text-2)] sm:gap-10">
                    <div className="flex items-center gap-2">
                        <Users size={16} className="text-[var(--rv2-accent)]" />
                        אנשי כספים מובילים כבר למדו
                    </div>
                    <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                                key={i}
                                size={14}
                                className="fill-[var(--rv2-accent)] text-[var(--rv2-accent)]"
                            />
                        ))}
                        <span className="mr-1">5.0</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Shield size={16} className="text-[var(--rv2-accent)]" />
                        תשלום מאובטח SSL
                    </div>
                </div>
            </section>

            {/* ═══════ WHO IS THIS FOR ═══════ */}
            <section className="rv2-container py-14 lg:py-20">
                <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2">
                    <div>
                        <div className="rv2-kicker mb-3">למי זה?</div>
                        <h2 className="rv2-display text-3xl lg:text-4xl">
                            בנוי לאנשי כספים שרוצים{" "}
                            <span className="rv2-gold-text">יתרון אמיתי</span>
                        </h2>
                        <p className="mt-4 text-[var(--rv2-text-2)]">
                            הסדרה מיועדת למי שעובד עם נתונים פיננסיים כל יום ורוצה לקצר תהליכים,
                            לבנות דוחות אוטומטיים ולהפוך את Claude לכלי עבודה מרכזי.
                        </p>
                    </div>
                    <div className="rv2-surface p-8">
                        <ul className="space-y-4">
                            {[
                                "רואי חשבון שרוצים לעבוד מהר יותר",
                                "מנהלי כספים ו-CFOs שמחפשים אוטומציה",
                                "בוקרים ומנהלי חשבונות",
                                "מנתחי נתונים פיננסיים",
                                "כל מי שעובד עם Excel ו-PowerPoint בכספים",
                            ].map((item, i) => (
                                <li
                                    key={i}
                                    className="flex items-start gap-3 text-[var(--rv2-text)]"
                                >
                                    <CheckCircle2
                                        size={18}
                                        className="mt-0.5 shrink-0 text-[var(--rv2-accent)]"
                                    />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* ═══════ 5 CHAPTERS ═══════ */}
            <section id="chapters" className="rv2-container py-14 lg:py-20">
                <div className="mb-10 text-center">
                    <div className="rv2-kicker mb-3">מה בפנים</div>
                    <h2 className="rv2-display text-3xl lg:text-4xl">
                        5 פרקים, 5 שעות, מערכת עבודה שלמה
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-[var(--rv2-text-2)]">
                        כל פרק בנוי סביב נושא מרכזי — מהבסיס של Claude ועד בניית Skills
                        מותאמים אישית. כולל הקלטה מלאה, פרומפטים וקבצים להורדה.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {bundleChapters.map((ch) => (
                        <article
                            key={ch.slug}
                            className="rv2-surface rv2-surface-hover flex flex-col overflow-hidden"
                        >
                            {/* Poster gradient header with image */}
                            <div
                                className="bundle-chapter-poster relative flex items-end p-5"
                                style={
                                    {
                                        "--ch-hue": `${ch.chapterNumber * 55}`,
                                    } as React.CSSProperties
                                }
                            >
                                {ch.imageUrl && (
                                    <div className="absolute inset-0 z-0 opacity-70">
                                        <Image
                                            src={ch.imageUrl}
                                            alt={ch.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-0" />
                                <span className="rv2-mono relative z-10 text-6xl font-black text-white/70 drop-shadow-lg">
                                    {ch.chapterNumber}
                                </span>
                                <span className="bundle-chapter-badge relative z-10">
                                    <Clock size={13} />
                                    <span dir="ltr">{ch.minutes}</span> דק׳
                                </span>
                            </div>

                            <div className="flex flex-1 flex-col p-6">
                                <div className="rv2-kicker mb-1 text-xs">
                                    פרק {ch.chapterNumber} · {ch.date}
                                </div>
                                <h3 className="mt-1 text-lg font-bold leading-snug">
                                    {ch.title}
                                </h3>
                                <p className="mt-2 flex-1 text-sm text-[var(--rv2-text-2)]">
                                    {ch.description}
                                </p>

                                {/* Materials */}
                                <ul className="rv2-divider mt-4 flex flex-wrap gap-x-4 gap-y-2 pt-4 text-xs text-[var(--rv2-text-2)]">
                                    {ch.materials.map((m) => {
                                        const Icon = MAT_ICON[m.kind] || FileText;
                                        return (
                                            <li
                                                key={m.label}
                                                className="flex items-center gap-1.5"
                                            >
                                                <Icon
                                                    size={14}
                                                    className="text-[var(--rv2-accent)]"
                                                />
                                                {m.label}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </article>
                    ))}

                    {/* Summary card */}
                    <article className="rv2-surface rv2-glow-card flex flex-col items-center justify-center p-8 text-center md:col-span-2 lg:col-span-1">
                        <Zap size={32} className="mb-4 text-[var(--rv2-accent)]" />
                        <h3 className="rv2-display text-xl">הכל בחבילה אחת</h3>
                        <p className="mt-3 text-sm text-[var(--rv2-text-2)]">
                            5 שעות הקלטה, {totalBundleMaterials}+ קבצים, גישה לצמיתות — במחיר
                            חד פעמי.
                        </p>
                        <a
                            href="#pricing"
                            className="rv2-btn rv2-btn-primary mt-6 text-sm"
                        >
                            לרכישה
                            <ArrowLeft size={16} className="rv2-arrow" />
                        </a>
                    </article>
                </div>
            </section>

            {/* ═══════ ABOUT INSTRUCTOR ═══════ */}
            <section className="rv2-container py-14 lg:py-20">
                <div className="rv2-surface mx-auto flex max-w-3xl flex-col items-center gap-8 p-10 text-center lg:flex-row lg:text-right">
                    <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-2 border-[var(--rv2-border-strong)]">
                        <Image
                            src="/avatar-f.png"
                            alt="רונן עמוס רו״ח"
                            fill
                            className="object-cover"
                            sizes="112px"
                        />
                    </div>
                    <div>
                        <div className="rv2-kicker mb-2">המרצה</div>
                        <h2 className="rv2-display text-2xl">רונן עמוס, רו״ח</h2>
                        <p className="mt-3 text-sm text-[var(--rv2-text-2)]">
                            רואה חשבון מוסמך ויועץ AI פיננסי. מלווה חברות וארגונים בהטמעת
                            טכנולוגיות AI בכספים — Claude, Power BI ואוטומציה. מנחה את סדרת
                            הוובינרים ״Claude לרואי חשבון״ ומרצה בהכשרות ארגוניות בכל הארץ.
                        </p>
                    </div>
                </div>
            </section>

            {/* ═══════ PRICING ═══════ */}
            <section id="pricing" className="rv2-container py-14 lg:py-24">
                <div className="mx-auto max-w-xl">
                    <div className="bundle-pricing-glow rv2-surface rv2-glow-card overflow-hidden p-10 text-center lg:p-14">
                        <div className="rv2-kicker mb-4">מחיר השקה</div>

                        {/* Price */}
                        <div className="flex items-center justify-center gap-3">
                            <span className="text-lg text-[var(--rv2-text-2)] line-through">
                                ₪{bundleConfig.originalPrice}
                            </span>
                            <span className="rv2-display text-6xl text-[var(--rv2-accent)] sm:text-7xl">
                                {bundleConfig.price}
                            </span>
                            <span className="text-2xl font-bold">₪</span>
                        </div>
                        <p className="mt-2 text-sm text-[var(--rv2-accent)]">
                            תשלום חד פעמי · גישה לצמיתות
                        </p>

                        {/* What's included */}
                        <div className="rv2-divider mt-8 space-y-3 pt-8 text-right">
                            {[
                                "5 וובינרים מוקלטים (שעה כל אחד)",
                                "פרומפטים מוכנים לכל פרק",
                                "חוברות Excel ותבניות PowerPoint",
                                "Skills מוכנים ל-Claude",
                                "גישה לצמיתות — בלי מנוי חודשי",
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3"
                                >
                                    <CheckCircle2
                                        size={16}
                                        className="shrink-0 text-[var(--rv2-accent)]"
                                    />
                                    <span className="text-sm">{item}</span>
                                </div>
                            ))}
                        </div>

                        {/* Checkout form */}
                        <div className="mt-10">
                            <BundleCheckout />
                        </div>

                        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[var(--rv2-text-2)]">
                            <Shield size={14} />
                            תשלום מאובטח SSL דרך PayPal
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════ FAQ ═══════ */}
            <section className="rv2-container py-14 lg:py-20">
                <div className="mx-auto max-w-2xl">
                    <h2 className="rv2-display mb-8 text-center text-3xl">
                        שאלות נפוצות
                    </h2>
                    <div className="space-y-3">
                        {faqs.map((faq, i) => (
                            <details key={i} className="rv2-surface group">
                                <summary className="flex cursor-pointer items-center justify-between p-5 text-sm font-bold">
                                    {faq.q}
                                    <ChevronDown
                                        size={18}
                                        className="shrink-0 text-[var(--rv2-accent)] transition-transform group-open:rotate-180"
                                    />
                                </summary>
                                <div className="px-5 pb-5 text-sm text-[var(--rv2-text-2)]">
                                    {faq.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ FINAL CTA ═══════ */}
            <section className="rv2-container pb-20">
                <div className="rv2-surface rv2-glow-card mx-auto max-w-2xl p-10 text-center lg:p-14">
                    <h2 className="rv2-display text-2xl lg:text-3xl">
                        מוכנים להתחיל לעבוד עם Claude?
                    </h2>
                    <p className="mx-auto mt-4 max-w-lg text-[var(--rv2-text-2)]">
                        5 שעות של עבודה מעשית, עם כל החומרים — במחיר של ארוחה עסקית.
                    </p>
                    <a
                        href="#pricing"
                        className="rv2-btn rv2-btn-primary mt-8 px-8 py-3 text-lg"
                    >
                        לרכישה — ₪{bundleConfig.price}
                        <ArrowLeft size={18} className="rv2-arrow" />
                    </a>
                </div>
            </section>

        </>
    );
}
