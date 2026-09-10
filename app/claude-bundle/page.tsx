import "./bundle-sales.css";
import Image from "next/image";
import Link from "next/link";
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
    Layers,
    TrendingUp,
    MessageCircle,
    ExternalLink,
    GraduationCap,
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

/* ── Extended FAQ Data ─────────────────────────────────────── */
const faqs = [
    {
        q: "למי הבאנדל הזה מתאים?",
        a: "לרואי חשבון, מנהלי כספים, CFOs, חשבים, בוקרים, מנהלי חשבונות וכל איש מקצוע פיננסי שעובד עם דוחות, אקסלים ונתונים ורוצה להפוך את Claude לסביבת עבודה פרודוקטיבית יומיומית.",
    },
    {
        q: "במה Claude עדיף על ChatGPT לרואי חשבון ומנהלי כספים?",
        a: "Claude מצטיין בדיוק חישובי גבוה במיוחד, ניתוח קבצי ענק (עד 200,000 תווים בהקשר אחד ללא קיצוץ), תמיכה מובנית ב-Artifacts אינטראקטיביים (דשבורדים וטבלאות חיות), וסביבת Projects המאפשרת שמירת נהלי חשבונאות וסכמות קבועות.",
    },
    {
        q: "לכמה זמן הגישה פתוחה?",
        a: "גישה לכל החיים (Lifetime Access). מיד לאחר הרכישה תקבלו קישור אישי מאובטח שנשמר תמיד — ללא דמי מנוי וללא הגבלת זמן.",
    },
    {
        q: "צריך ידע טכני או ניסיון קודם ב-AI?",
        a: "ממש לא. הסדרה מתחילה מהיסודות ומדגימה הכל צעד-אחר-צעד ישירות על המסך. מספיק להכיר עבודה בסיסית ב-Excel.",
    },
    {
        q: "מה הפורמט של החומרים ואיך מורידים אותם?",
        a: "כל פרק כולל דף צפייה אישי עם הקלטת הווידאו המלאה (שעה), פרומפטים מועתקים בלחיצה אחת, קבצי Excel להורדה ישירה, תבניות PowerPoint וקבצי Skills מוכנים לשימוש.",
    },
    {
        q: "האם החומרים מתאימים גם לגרסה החינמית של Claude?",
        a: "כן. כל הפרומפטים ושיטות העבודה פועלים במלואם גם בגרסה החינמית. עם זאת, לצורך שימוש ב-Projects מומלץ מנוי Claude Pro.",
    },
    {
        q: "איך מתבצע התשלום והאם הוא מאובטח?",
        a: "התשלום הוא חד-פעמי בסך ₪150 בלבד, ומבוצע בצורה מאובטחת בתקן SSL מחמיר דרך PayPal.",
    },
    {
        q: "מה ההבדל בין הבאנדל לבין קורס AI Finance Master המלא?",
        a: "הבאנדל כולל 5 וובינרים ממוקדים (5 שעות) להטמעה מיידית של Claude. קורס AI Finance Master הוא תוכנית הדגל המקיפה (16 מודולים, 200+ Prompts, פרויקט Capstone וליווי). הבאנדל הוא כרטיס הכניסה המושלם והמהיר ביותר להתחיל.",
    },
];

export default function BundleSalesPage() {
    const hours = Math.round(totalBundleMinutes / 60);

    return (
        <>
            {/* ═══════ HERO ═══════ */}
            <section className="bundle-hero rv2-container py-20 lg:py-28">
                <div className="mx-auto max-w-4xl text-center">
                    <div className="rv2-kicker mb-5 animate-fade-in inline-flex items-center gap-2">
                        <Sparkles size={16} className="text-[var(--rv2-accent)]" />
                        <span>סדרת הוובינרים המעשית המובילה בישראל · רונן עמוס, CPA</span>
                    </div>

                    <h1 className="rv2-display text-4xl sm:text-5xl lg:text-6xl animate-slide-up leading-tight">
                        באנדל Claude לרואי חשבון ומנהלי כספים
                    </h1>

                    <p className="mx-auto mt-6 max-w-3xl text-xl text-[var(--rv2-accent-strong)] font-semibold leading-snug">
                        5 וובינרים מוקלטים מלאים · 30+ תבניות פרומפטים פיננסיים · חוברות Excel ו-Skills להורדה
                    </p>

                    <p className="mx-auto mt-4 max-w-2xl text-base text-[var(--rv2-text-2)] animate-slide-up-delay leading-relaxed">
                        {hours} שעות של עבודה מעשית חיה על המסך: מניקוי נתוני ERP ב-30 דקות במקום 3 ימים,
                        דרך חיבור ל-Excel ו-PowerPoint, ועד בניית דשבורדים אינטראקטיביים לדירקטוריון ב-Claude Artifacts.
                    </p>

                    {/* GEO Quick Summary Box (AI Search Engine Extractable) - Light & High Contrast */}
                    <div className="mt-8 mx-auto max-w-2xl rounded-2xl bg-gradient-to-br from-white via-slate-50 to-amber-50/50 border-2 border-amber-300/80 p-6 sm:p-7 text-right shadow-2xl relative overflow-hidden">
                        <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-black bg-amber-100 text-amber-900 border border-amber-300 mb-3 uppercase tracking-wider">
                            <Layers size={13} className="text-amber-800" />
                            <span>תקציר מנהלים // מה כוללת החבילה</span>
                        </div>
                        <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                            <strong className="text-slate-950 font-bold">תכולה מלאה:</strong> 5 שעות הדרכה מוקלטות (5 פרקים מלאים), קבצי תרגול Excel, תבניות מצגות PowerPoint,
                            ספריית Skills להטמעה ב-Claude Projects, ו-30+ פרומפטים מובנים לרואי חשבון, CFOs, כלכלנים וחשבים.
                        </p>
                        <div className="mt-3 pt-3 border-t border-amber-200/80 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm font-bold text-slate-900">
                            <span>⚡ מחיר: ₪150 חד-פעמי</span>
                            <span>🔒 גישה: מיידית לכל החיים</span>
                            <span>📚 כולל את כל חומרי ההורדה</span>
                        </div>
                    </div>

                    {/* Luxurious 4 Stats Grid */}
                    <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 animate-fade-in-delay">
                        {[
                            { icon: Play, label: "5 פרקים", sub: "שעה כל אחד" },
                            { icon: FileText, label: `${totalBundleMaterials}+ קבצים`, sub: "להורדה מיידית" },
                            { icon: Sparkles, label: "Skills מוכנים", sub: "להפעלה ב-Claude" },
                            { icon: Shield, label: "גישה לצמיתות", sub: "בלי מנוי חודשי" },
                        ].map((s, i) => (
                            <div
                                key={i}
                                className="relative group p-5 flex flex-col items-center text-center rounded-2xl bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-transparent backdrop-blur-xl border border-teal-400/40 shadow-[0_4px_25px_rgba(45,212,191,0.12)] hover:shadow-[0_8px_35px_rgba(251,191,36,0.25)] hover:border-amber-300/80 hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-teal-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-400/30 flex items-center justify-center mb-3 shadow-inner group-hover:scale-110 group-hover:border-amber-400/50 transition-transform">
                                    <s.icon
                                        size={24}
                                        className="text-[var(--rv2-accent)] group-hover:text-amber-300 transition-colors"
                                    />
                                </div>
                                <div className="text-base font-black text-white group-hover:text-amber-200 transition-colors">{s.label}</div>
                                <div className="text-xs text-slate-300 mt-0.5">{s.sub}</div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center animate-slide-up-delay">
                        <a
                            href="#pricing"
                            className="rv2-btn rv2-btn-primary px-10 py-4 text-lg font-bold shadow-xl shadow-teal-500/20"
                        >
                            לרכישת הבאנדל — ₪{bundleConfig.price} בלבד
                            <ArrowLeft size={18} className="rv2-arrow" />
                        </a>
                        <a
                            href="#preview-gallery"
                            className="rv2-link text-sm underline underline-offset-4 flex items-center gap-1.5"
                        >
                            הצצה למה שתבנו בוובינרים ↓
                        </a>
                    </div>
                </div>
            </section>

            {/* ═══════ SOCIAL PROOF BAR ═══════ */}
            <section className="rv2-container pb-12">
                <div className="rv2-surface flex flex-wrap items-center justify-center gap-6 px-6 py-5 text-sm text-[var(--rv2-text-2)] sm:gap-10 rounded-2xl border border-[var(--rv2-border)]">
                    <div className="flex items-center gap-2 font-medium">
                        <Users size={16} className="text-[var(--rv2-accent)]" />
                        מעל 200+ רואי חשבון ומנהלי כספים כבר צפו
                    </div>
                    <div className="flex items-center gap-1 font-bold text-white">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                                key={i}
                                size={15}
                                className="fill-[var(--rv2-accent)] text-[var(--rv2-accent)]"
                            />
                        ))}
                        <span className="mr-1">5.0 דירוג משתתפים</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Shield size={16} className="text-[var(--rv2-accent)]" />
                        תשלום מאובטח SSL דרך PayPal
                    </div>
                </div>
            </section>

            {/* ═══════ VISUAL LIVE PREVIEW GALLERY (WHAT YOU BUILD) ═══════ */}
            <section id="preview-gallery" className="rv2-container py-14 lg:py-20">
                <div className="mx-auto max-w-3xl text-center mb-12">
                    <div className="rv2-kicker mb-3">הצצה חיה מתוך הוובינרים</div>
                    <h2 className="rv2-display text-3xl lg:text-4xl">
                        לא תיאוריה — <span className="rv2-gold-text">תוצרים אמיתיים</span> שנבנים מול העיניים
                    </h2>
                    <p className="mt-4 text-[var(--rv2-text-2)]">
                        בכל וובינר אנחנו פותחים את המסך ובונים יחד מערכות עבודה שלמות ב-Claude. הנה טעימה ממה שתקבלו:
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
                    {/* Preview 1: FP&A Analytics Hub Dashboard */}
                    <div className="rv2-surface rounded-3xl p-6 border border-[var(--rv2-border-strong)] flex flex-col overflow-hidden shadow-2xl group hover:border-[var(--rv2-accent)] transition-all">
                        <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/10 mb-6 bg-black/40">
                            <Image
                                src="/images/bundle/fpa-analytics-hub.jpg"
                                alt="דשבורד CFO ו-FP&A חי שנבנה ב-Claude Live Artifacts"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[var(--rv2-accent)] border border-white/10">
                                פרק 3 · Live Artifact
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">
                            דשבורד CFO ו-FP&A אינטראקטיבי
                        </h3>
                        <p className="text-sm text-[var(--rv2-text-2)] leading-relaxed flex-1">
                            בניית דשבורד שלם ב-Claude Artifacts עם 4 כרטיסי KPI (Revenue, Gross Margin, EBITDA, Cash Runway),
                            גרף שונות Waterfall Bridge וטבלת P&L Variance מתעדכנת בזמן אמת.
                        </p>
                    </div>

                    {/* Preview 2: Data Cleaning Before & After */}
                    <div className="rv2-surface rounded-3xl p-6 border border-[var(--rv2-border-strong)] flex flex-col overflow-hidden shadow-2xl group hover:border-[var(--rv2-accent)] transition-all">
                        <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/10 mb-6 bg-black/40">
                            <Image
                                src="/images/bundle/data-cleaning-before-after.png"
                                alt="ניקוי נתוני ERP ואקסל עם קלוד — לפני ואחרי"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[var(--rv2-accent)] border border-white/10">
                                פרק 2 · Excel & Automation
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">
                            ניקוי נתונים: מכאוס של 3 ימים ל-30 דקות
                        </h3>
                        <p className="text-sm text-[var(--rv2-text-2)] leading-relaxed flex-1">
                            הפיכת קובצי GL גולמיים עם נוסחאות שבורות והערות ידניות לסכמת נתונים אחידה ונקייה.
                            כולל תבניות פרומפטים מדויקות להורדה.
                        </p>
                    </div>
                </div>
            </section>

            {/* ═══════ VERIFIED WHATSAPP & COMMUNITY TESTIMONIALS ═══════ */}
            <section className="rv2-container py-14 lg:py-20">
                <div className="mx-auto max-w-3xl text-center mb-12">
                    <div className="rv2-kicker mb-3 flex items-center justify-center gap-1.5">
                        <MessageCircle size={16} className="text-[#25d366]" />
                        <span>משובים אמיתיים מהשטח</span>
                    </div>
                    <h2 className="rv2-display text-3xl lg:text-4xl">
                        מה אומרים אנשי כספים <span className="rv2-gold-text">שכבר צפו ויישמו</span>
                    </h2>
                    <p className="mt-4 text-[var(--rv2-text-2)]">
                        הודעות וואטסאפ ותגובות אמיתיות שהתקבלו מרואי חשבון ומנהלי כספים בקהילה שלנו:
                    </p>
                </div>

                {/* WhatsApp Screenshots Grid */}
                <div className="grid gap-6 sm:grid-cols-3 max-w-5xl mx-auto mb-12">
                    {[
                        {
                            img: "/images/bundle/whatsapp-feedback-1.jpg",
                            quote: "״חייבת לציין שתוכן שאתה מעביר הוא מדהים ומקצועי״",
                            role: "רואת חשבון",
                        },
                        {
                            img: "/images/bundle/whatsapp-feedback-2.jpg",
                            quote: "״אני ממש נהנה ללמוד מהקבוצה שלך ומהפוסטים. רוצה להזמין עוד חברים במשרד לקהילה״",
                            role: "חשב ומנהל כספים",
                        },
                        {
                            img: "/images/bundle/whatsapp-feedback-3.jpg",
                            quote: "״תודה רבה על הוובינר! כיצד מתחברים לקבוצה שלך?״",
                            role: "מנהל כספים בחברה",
                        },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="rv2-surface rounded-3xl p-5 border border-[var(--rv2-border-strong)] flex flex-col items-center text-center shadow-xl hover:border-[#25d366]/40 transition-all"
                        >
                            <div className="relative w-full h-44 rounded-xl overflow-hidden border border-white/10 mb-4 bg-black/20">
                                <Image
                                    src={item.img}
                                    alt="משוב וואטסאפ על וובינר Claude"
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 640px) 100vw, 33vw"
                                />
                            </div>
                            <div className="flex items-center gap-1 mb-2 text-[var(--rv2-accent)]">
                                {Array.from({ length: 5 }).map((_, s) => (
                                    <Star key={s} size={13} className="fill-[var(--rv2-accent)]" />
                                ))}
                            </div>
                            <p className="text-sm font-semibold text-white italic mb-2">
                                {item.quote}
                            </p>
                            <span className="text-xs text-[var(--rv2-text-2)] font-mono">{item.role}</span>
                        </div>
                    ))}
                </div>

                {/* Live Chat Quotes Bar */}
                <div className="rv2-surface rounded-2xl p-6 border border-white/10 max-w-4xl mx-auto grid sm:grid-cols-3 gap-4 text-center">
                    <div className="p-3 border-b sm:border-b-0 sm:border-l border-white/10">
                        <p className="text-sm font-bold text-white">״נראה מדהים לחלוטין!״</p>
                        <span className="text-xs text-[var(--rv2-text-2)]">גבריאל, משתתף בשידור חי</span>
                    </div>
                    <div className="p-3 border-b sm:border-b-0 sm:border-l border-white/10">
                        <p className="text-sm font-bold text-white">״תודה, היה סופר מעניין ומועיל!״</p>
                        <span className="text-xs text-[var(--rv2-text-2)]">יפה א., משתתפת בשידור חי</span>
                    </div>
                    <div className="p-3">
                        <p className="text-sm font-bold text-white">״היה ממש מלמד ומקצועי!״</p>
                        <span className="text-xs text-[var(--rv2-text-2)]">קרן ש., משתתפת בשידור חי</span>
                    </div>
                </div>
            </section>

            {/* ═══════ WHO IS THIS FOR ═══════ */}
            <section className="rv2-container py-14 lg:py-20">
                <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2">
                    <div>
                        <div className="rv2-kicker mb-3">למי זה מתאים?</div>
                        <h2 className="rv2-display text-3xl lg:text-4xl">
                            בנוי בדיוק לאנשי כספים שרוצים{" "}
                            <span className="rv2-gold-text">יתרון תחרותי אמיתי</span>
                        </h2>
                        <p className="mt-4 text-[var(--rv2-text-2)] leading-relaxed">
                            הסדרה תוכננה במיוחד למי שעובד עם דוחות כספיים, מאזנים, תקציבים ו-GL כל יום ורוצה
                            לקצר שעות של עבודה סיזיפית, לייצר דוחות אוטומטיים ולהוביל את הארגון עם AI.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-white via-slate-50 to-indigo-50/40 p-8 sm:p-10 rounded-3xl border-2 border-slate-200 text-slate-900 shadow-2xl">
                        <div className="text-xs font-black text-teal-800 uppercase tracking-wider mb-4 bg-teal-100 border border-teal-200 px-3.5 py-1 rounded-full w-fit">
                            קהל היעד המרכזי
                        </div>
                        <ul className="space-y-4">
                            {[
                                "רואי חשבון ויועצים שרוצים לקצר זמני ניתוח וביקורת",
                                "כלכלנים ואנליסטים פיננסיים (Financial Economists & Analysts)",
                                "מנהלי כספים, CFOs וחשבים שמחפשים אוטומציה של סגירת חודש",
                                "אנליסטים פיננסיים (FP&A) שרוצים לבנות דשבורדים אינטראקטיביים",
                                "בוקרים ומנהלי חשבונות שרוצים לנקות נתוני ERP בלי כאבי ראש",
                                "כל מי שעובד עם Excel ו-PowerPoint ורוצה להפיק מהם פי 10",
                            ].map((item, i) => (
                                <li
                                    key={i}
                                    className="flex items-start gap-3 text-slate-800 font-medium text-base"
                                >
                                    <CheckCircle2
                                        size={20}
                                        className="mt-0.5 shrink-0 text-teal-600"
                                    />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* ═══════ 5 CHAPTERS ═══════ */}
            <section id="chapters" className="rv2-container py-14 lg:py-20">
                <div className="mb-12 text-center">
                    <div className="rv2-kicker mb-3">מה בפנים</div>
                    <h2 className="rv2-display text-3xl lg:text-4xl">
                        5 פרקים, 5 שעות, מערכת עבודה שלמה
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-[var(--rv2-text-2)]">
                        כל פרק בנוי סביב נושא מרכזי — מהבסיס של Claude ועד בניית Skills ו-Artifacts מותאמים אישית.
                        כולל הקלטת וידאו מלאה, פרומפטים וקבצים להורדה.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {bundleChapters.map((ch) => (
                        <article
                            key={ch.slug}
                            className="rv2-surface rv2-surface-hover flex flex-col overflow-hidden rounded-3xl border border-[var(--rv2-border)]"
                        >
                            {/* Poster gradient header with image */}
                            <div
                                className="bundle-chapter-poster relative flex items-end p-5 h-44"
                                style={
                                    {
                                        "--ch-hue": `${ch.chapterNumber * 55}`,
                                    } as React.CSSProperties
                                }
                            >
                                {ch.imageUrl && (
                                    <div className="absolute inset-0 z-0 opacity-80">
                                        <Image
                                            src={ch.imageUrl}
                                            alt={ch.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent z-0" />
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
                                <h3 className="mt-1 text-lg font-bold leading-snug text-white">
                                    {ch.title}
                                </h3>
                                <p className="mt-2 flex-1 text-sm text-[var(--rv2-text-2)] leading-relaxed">
                                    {ch.description}
                                </p>

                                {/* Materials */}
                                <ul className="rv2-divider mt-4 flex flex-wrap gap-2 pt-4 text-xs">
                                    {ch.materials.map((m) => {
                                        const Icon = MAT_ICON[m.kind] || FileText;
                                        return (
                                            <li
                                                key={m.label}
                                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-200"
                                            >
                                                <Icon
                                                    size={13}
                                                    className="text-[var(--rv2-accent)]"
                                                />
                                                <span>{m.label}</span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </article>
                    ))}

                    {/* Summary card */}
                    <article className="rv2-surface rv2-glow-card flex flex-col items-center justify-center p-8 text-center md:col-span-2 lg:col-span-1 rounded-3xl border border-[var(--rv2-accent)]/30">
                        <Zap size={36} className="mb-4 text-[var(--rv2-accent)]" />
                        <h3 className="rv2-display text-xl">הכל בחבילה אחת</h3>
                        <p className="mt-3 text-sm text-[var(--rv2-text-2)]">
                            5 שעות הקלטה, {totalBundleMaterials}+ קבצים, גישה לצמיתות — במחיר
                            חד-פעמי של ₪150.
                        </p>
                        <a
                            href="#pricing"
                            className="rv2-btn rv2-btn-primary mt-6 text-sm font-bold"
                        >
                            לרכישה עכשיו
                            <ArrowLeft size={16} className="rv2-arrow" />
                        </a>
                    </article>
                </div>
            </section>

            {/* ═══════ ABOUT INSTRUCTOR ═══════ */}
            <section className="rv2-container py-14 lg:py-20">
                <div className="rv2-surface mx-auto flex max-w-3xl flex-col items-center gap-8 p-10 text-center lg:flex-row lg:text-right rounded-3xl border border-[var(--rv2-border)]">
                    <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-2 border-[var(--rv2-border-strong)]">
                        <Image
                            src="/avatar-f.png"
                            alt="רונן עמוס, CPA"
                            fill
                            className="object-cover"
                            sizes="112px"
                        />
                    </div>
                    <div>
                        <div className="rv2-kicker mb-2">המרצה והמנחה</div>
                        <h2 className="rv2-display text-2xl text-white">רונן עמוס, רו״ח (CPA)</h2>
                        <p className="mt-3 text-sm text-[var(--rv2-text-2)] leading-relaxed">
                            רואה חשבון מוסמך, מומחה ויועץ AI למחלקות כספים וארגונים. מוביל תהליכי טרנספורמציה דיגיטלית,
                            אוטומציה פיננסית, והטמעת Claude, Power BI ו-Custom Agents במחלקות כספים בכל רחבי הארץ.
                        </p>
                    </div>
                </div>
            </section>

            {/* ═══════ UPSELL / CROSS-LINK TO MASTER COURSE ═══════ */}
            <section className="rv2-container py-6">
                <div className="mx-auto max-w-4xl rounded-3xl p-8 bg-gradient-to-r from-teal-950/40 via-space-900 to-royal-950/40 border border-teal-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 border border-teal-500/30">
                            <GraduationCap size={26} />
                        </div>
                        <div>
                            <div className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-1">
                                תוכנית הדגל המלאה
                            </div>
                            <h3 className="text-lg sm:text-xl font-black text-white">
                                רוצים ליווי מקיף, 16 מודולים ופרויקט Capstone מלא?
                            </h3>
                            <p className="text-sm text-text-muted mt-1">
                                הכירו את קורס <strong>AI Finance Master</strong> — ההכשרה המעמיקה ביותר לרואי חשבון ומנהלי כספים (כולל כל הוובינרים שבבאנדל).
                            </p>
                        </div>
                    </div>
                    <Link
                        href="/courses/sell-page"
                        className="whitespace-nowrap px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all flex items-center gap-2"
                    >
                        לפרטים על הקורס המלא ←
                    </Link>
                </div>
            </section>

            {/* ═══════ PRICING ═══════ */}
            <section id="pricing" className="rv2-container py-14 lg:py-24">
                <div className="mx-auto max-w-xl">
                    <div className="bundle-pricing-glow rv2-surface rv2-glow-card overflow-hidden p-10 text-center lg:p-14 rounded-3xl border border-[var(--rv2-accent)]/40 shadow-2xl">
                        <div className="rv2-kicker mb-4">מחיר מיוחד · גישה מלאה</div>

                        {/* Price */}
                        <div className="flex items-center justify-center gap-3">
                            <span className="text-lg text-[var(--rv2-text-2)] line-through">
                                ₪{bundleConfig.originalPrice}
                            </span>
                            <span className="rv2-display text-6xl text-[var(--rv2-accent)] sm:text-7xl">
                                {bundleConfig.price}
                            </span>
                            <span className="text-2xl font-bold text-white">₪</span>
                        </div>
                        <p className="mt-2 text-sm text-[var(--rv2-accent)] font-medium">
                            תשלום חד-פעמי · גישה מיידית לצמיתות
                        </p>

                        {/* What's included */}
                        <div className="rv2-divider mt-8 space-y-3 pt-8 text-right">
                            {[
                                "5 וובינרים מוקלטים מלאים (שעה כל אחד)",
                                "30+ פרומפטים פיננסיים מוכנים להעתקה-הדבקה",
                                "חוברות Excel ותרגילים מעשיים להורדה",
                                "תבניות PowerPoint מוכנות למצגות הנהלה",
                                "Skills מוכנים להטמעה ב-Claude Projects",
                                "גישה לצמיתות — ללא דמי מנוי חודשיים",
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3"
                                >
                                    <CheckCircle2
                                        size={16}
                                        className="shrink-0 text-[var(--rv2-accent)]"
                                    />
                                    <span className="text-sm text-slate-200">{item}</span>
                                </div>
                            ))}
                        </div>

                        {/* Checkout form */}
                        <div className="mt-10">
                            <BundleCheckout />
                        </div>

                        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[var(--rv2-text-2)]">
                            <Shield size={14} className="text-[var(--rv2-accent)]" />
                            תשלום מאובטח SSL דרך PayPal
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════ FAQ ═══════ */}
            <section className="rv2-container py-14 lg:py-20">
                <div className="mx-auto max-w-3xl">
                    <div className="text-center mb-10">
                        <div className="rv2-kicker mb-3">שאלות ותשובות</div>
                        <h2 className="rv2-display text-3xl lg:text-4xl">
                            כל מה שחשוב לדעת לפני שמצטרפים
                        </h2>
                    </div>

                    <div className="space-y-3">
                        {faqs.map((faq, i) => (
                            <details key={i} className="rv2-surface group rounded-2xl border border-[var(--rv2-border)]">
                                <summary className="flex cursor-pointer items-center justify-between p-5 text-sm font-bold text-white">
                                    {faq.q}
                                    <ChevronDown
                                        size={18}
                                        className="shrink-0 text-[var(--rv2-accent)] transition-transform group-open:rotate-180"
                                    />
                                </summary>
                                <div className="px-5 pb-5 text-sm text-[var(--rv2-text-2)] leading-relaxed border-t border-white/5 pt-3">
                                    {faq.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ FINAL CTA ═══════ */}
            <section className="rv2-container pb-20">
                <div className="rv2-surface rv2-glow-card mx-auto max-w-2xl p-10 text-center lg:p-14 rounded-3xl border border-[var(--rv2-border-strong)]">
                    <h2 className="rv2-display text-2xl lg:text-3xl">
                        מוכנים להפוך את Claude למנוע העבודה שלכם?
                    </h2>
                    <p className="mx-auto mt-4 max-w-lg text-[var(--rv2-text-2)] leading-relaxed">
                        5 שעות של עבודה מעשית, 30+ תבניות ו-Skills — במחיר סמלי של ₪150.
                    </p>
                    <a
                        href="#pricing"
                        className="rv2-btn rv2-btn-primary mt-8 px-10 py-4 text-lg font-bold shadow-xl shadow-teal-500/20"
                    >
                        לרכישת הבאנדל — ₪{bundleConfig.price}
                        <ArrowLeft size={18} className="rv2-arrow" />
                    </a>
                </div>
            </section>
        </>
    );
}
