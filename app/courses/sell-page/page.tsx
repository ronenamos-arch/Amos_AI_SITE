import type { Metadata } from "next";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CourseFAQ } from "@/components/sections/CourseFAQ";
import { CourseCurriculum } from "@/components/sections/CourseCurriculum";
import { CourseBuyButton } from "@/components/course/CourseBuyButton";
import { CheckCircle2, PlayCircle, FileText, Zap, Infinity, Clock, Shield, Sparkles, Globe, Video } from "lucide-react";

export const metadata: Metadata = {
    title: "AI לרואי חשבון קורס מעשי | AI Finance Master לאוטומציה פיננסית | רונן עמוס",
    description: "קורס AI לרואי חשבון, מנהלי כספים ו-CFOs. שלטו ב-Claude לאוטומציה של סגירת חודש, ניתוח חריגים, דשבורדים אינטראקטיביים וספריית 30+ Skills פיננסיים.",
    keywords: [
        "AI לרואי חשבון קורס",
        "קורס AI לרואי חשבון",
        "קורס AI למנהלי כספים",
        "Claude לכספים",
        "אוטומציה פיננסית",
        "AI Finance Master",
        "סגירת חודש AI",
        "רונן עמוס"
    ],
    openGraph: {
        title: "AI לרואי חשבון קורס מעשי | AI Finance Master",
        description: "קורס מתקדם בעברית: הפכו את מחלקת הכספים למכונת אוטומציה עם Claude AI. 16 מודולים, 200+ Prompts וספריית Skills פיננסיים.",
        type: "website",
        locale: "he_IL",
        url: "https://www.ronenamoscpa.co.il/courses/sell-page",
    }
};

const courseFAQs = [
    {
        q: "למי מתאים קורס AI לרואי חשבון ומנהלי כספים?",
        a: "הקורס מיועד לרואי חשבון, מנהלי כספים (CFOs), חשבים (Controllers), אנשי FP&A, מנהלי חשבונות ויועצי מס שרוצים להטמיע כלי AI מתקדמים (בדגש על Claude) בעבודתם השוטפת, לקצר דרמטית זמני עבודה ולהוביל טכנולוגית בארגון."
    },
    {
        q: "האם צריך ידע מוקדם בבינה מלאכותית או רקע בתכנות?",
        a: "בכלל לא. הקורס נבנה במיוחד עבור אנשי כספים ללא שום רקע טכנולוגי. אנחנו לומדים מהיסוד את מתודולוגיית ה-PRICE לכתיבת פרומפטים פיננסיים מדויקים, עבודה עם Claude Projects, חיבור למערכות קיימות ושימוש ב-Skills מוכנים מראש."
    },
    {
        q: "איך הקורס עוזר לי בפועל בסגירת חודש ובדוחות כספיים?",
        a: "הקורס כולל מודול ייעודי לסגירת חודש מקצה לקצה ב-6 שלבים — מניתוח GL גולמי, איתור חריגות (Variance Analysis) תוך דקות, ועד הפקת נרטיב עסקי ודשבורד CFO אינטראקטיבי מוכן לדירקטוריון ב-Prompt אחד."
    },
    {
        q: "מה כוללת ספריית ה-Prompts וה-Skills הפיננסיים?",
        a: "אתם מקבלים גישה ישירה ליותר מ-200 פרומפטים פיננסיים מוכנים להעתקה-הדבקה ו-30+ Skills מוכנים להורדה: ניתוח חריגים, הכנת MBR, ניקוי נתוני ERP, בניית Board Pack ועוד — חסכון של עשרות שעות פיתוח עצמאי."
    },
    {
        q: "האם הנתונים הפיננסיים שלי מאובטחים ושומרים על סודיות?",
        a: "בהחלט. הקורס שם דגש מרכזי על אבטחת מידע ופרטיות נתונים פיננסיים (Privacy & Governance), כולל שיטות מעשיות לעבודה מאובטחת, נטרול מידע רגיש (Anonymization/Data Masking) והגדרות אבטחה נכונות בכלי AI."
    },
    {
        q: "לכמה זמן יש לי גישה לקורס, לסילבוס ולהקלטות הוובינרים?",
        a: "הגישה היא לכל החיים (Lifetime Access)! אתם מקבלים גישה מלאה לכל 16 המודולים, לכל חומרי התרגול ונתוני TechFlow, להקלטות 5 הוובינרים המלאים ולכל עדכון עתידי של התכנים."
    }
];

const benefits = [
    "חיסכון של 40+ שעות עבודה חודשיות לכל איש כספים",
    "סגירת חודש מקצה לקצה — מ-GL גולמי ועד Board Pack בלחיצה",
    "דשבורדים ודוחות אוטומטיים שמוכנים לדירקטוריון",
    "יתרון תחרותי: להיות איש הכספים שמוביל את ה-AI בארגון"
];

const includes = [
    "16 מודולים מלאים עם סרטוני הדגמה מעשיים",
    "200+ Prompts פיננסיים מוכנים לשימוש מיידי",
    "ספריית Skills מוכנות להורדה — Variance, MBR, ERP Cleaner ועוד",
    "הקלטות וובינרים חיים מהשטח",
    "עשרות תרגילים עם נתוני TechFlow אמיתיים",
];

export default function AIFinanceMasterPage() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Course",
                "name": "קורס AI לרואי חשבון ומנהלי כספים: AI Finance Master",
                "description": "הקורס המקיף בישראל ללימוד AI ו-Claude לרואי חשבון, יועצי מס, CFOs וחשבים לאוטומציה מלאה של מחלקת הכספים.",
                "provider": {
                    "@type": "Person",
                    "name": "רונן עמוס",
                    "jobTitle": "רואה חשבון ויועץ טכנולוגי פיננסי",
                    "url": "https://www.ronenamoscpa.co.il"
                },
                "offers": {
                    "@type": "Offer",
                    "price": "599",
                    "priceCurrency": "ILS",
                    "availability": "https://schema.org/InStock",
                    "url": "https://www.ronenamoscpa.co.il/courses/sell-page"
                }
            },
            {
                "@type": "FAQPage",
                "mainEntity": courseFAQs.map(faq => ({
                    "@type": "Question",
                    "name": faq.q,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": faq.a
                    }
                }))
            }
        ]
    };

    return (
        <div className="relative min-h-screen bg-space-950 text-white overflow-hidden font-primary">
            {/* Schema.org Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-10%] right-[-10%] w-[45%] h-[45%] bg-teal-600/20 blur-[130px] rounded-full" />
                <div className="absolute bottom-[10%] left-[-5%] w-[35%] h-[35%] bg-royal-500/10 blur-[110px] rounded-full" />
            </div>

            {/* Floating CTA */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-bounce-subtle">
                <CourseBuyButton
                    variant="floating"
                    text="הצטרף ל-AI Finance Master — ₪599"
                />
            </div>

            <div className="pt-24 pb-32">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Hero Section */}
                    <div className="mb-24 text-center">
                        <Badge variant="teal" className="mb-6 px-4 py-1.5 text-sm uppercase tracking-widest bg-teal-500/10 text-teal-400 border-teal-500/20">
                            התוכנית המעשית המובילה בישראל · רונן עמוס, CPA
                        </Badge>
                        <h1 className="text-4xl font-black sm:text-6xl lg:text-7xl mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70 leading-tight">
                            קורס AI לרואי חשבון ומנהלי כספים
                        </h1>
                        <p className="mx-auto max-w-3xl text-2xl font-bold text-royal-300 leading-snug mb-4">
                            AI Finance Master — שליטה מלאה ב-Claude לאוטומציה של מחלקת הכספים
                        </p>
                        <p className="mx-auto max-w-3xl text-lg text-text-secondary leading-relaxed mb-12">
                            סגירת חודש מהירה, ניתוח חריגים ב-15 דקות, בניית דשבורדים לדירקטוריון ב-Prompt אחד וספריית 30+ Skills מוכנים להורדה.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6 items-center">
                            <div className="min-w-[200px]">
                                <CourseBuyButton
                                    variant="hero"
                                    text="רכוש גישה עכשיו — ₪599"
                                />
                            </div>
                            <Button size="lg" variant="ghost" href="#curriculum" className="px-10 py-7 text-xl border-white/10 hover:bg-white/5 h-fit">
                                הסילבוס המלא
                            </Button>
                        </div>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
                        {[
                            { icon: Clock, label: "16 מודולים", sub: "מעשיים לחלוטין" },
                            { icon: Zap, label: "200+ Prompts", sub: "מוכנים לשימוש" },
                            { icon: Sparkles, label: "ספריית Skills", sub: "להורדה והפעלה" },
                            { icon: Video, label: "5 וובינרים", sub: "שעה כל וובינר על Claude" }
                        ].map((stat, i) => (
                            <GlassCard key={i} className="flex flex-col items-center p-6 text-center border-white/5">
                                <stat.icon className="w-8 h-8 text-royal-400 mb-3" />
                                <div className="text-xl font-bold leading-tight">{stat.label}</div>
                                <div className="text-xs text-text-muted mt-1">{stat.sub}</div>
                            </GlassCard>
                        ))}
                    </div>

                    {/* Value Props */}
                    <div className="mb-24 grid lg:grid-cols-2 gap-8 items-stretch">
                        <div className="space-y-6 bg-gradient-to-br from-slate-50 via-white to-slate-100 border border-slate-200/80 rounded-3xl p-8 md:p-10 shadow-2xl text-slate-900">
                            <div className="inline-block bg-teal-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                ערך עסקי מוכח
                            </div>
                            <h2 className="text-3xl font-black text-slate-950 leading-tight">
                                למה זה קריטי לך?
                            </h2>
                            <ul className="space-y-4">
                                {benefits.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3.5 text-slate-800 text-base md:text-lg font-medium">
                                        <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center shrink-0 mt-0.5">
                                            <CheckCircle2 className="w-4 h-4 text-teal-700" />
                                        </div>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-6 bg-gradient-to-br from-royal-950/80 via-space-900 to-space-950 border border-royal-500/30 rounded-3xl p-8 md:p-10 shadow-2xl text-white flex flex-col justify-between">
                            <div>
                                <div className="inline-block bg-royal-500/20 text-royal-300 border border-royal-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                                    תכולת התוכנית
                                </div>
                                <h2 className="text-3xl font-black text-white mb-6">
                                    מה תקבל בחבילה?
                                </h2>
                                <ul className="space-y-4">
                                    {includes.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3.5 text-slate-200 text-base md:text-lg font-medium">
                                            <div className="h-2.5 w-2.5 rounded-full bg-teal-400 mt-2 flex-shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Syllabus Image */}
                    <div id="curriculum-image" className="mb-32">
                        <SectionHeading
                            title="תוכנית ההכשרה"
                            subtitle="16 מודולים מעשיים: מהבסיס ועד Capstone מלא — דשבורד CFO אינטראקטיבי שתבנה בעצמך ב-Prompt אחד"
                            gradient
                        />
                        <div className="relative group p-1 mx-auto max-w-2xl">
                            <div className="absolute -inset-1 bg-gradient-to-r from-royal-500 to-teal-500 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                            <div className="relative bg-space-950 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                                <img
                                    src="/course-assets/ai-master-course/images/Sylbus-ai-master-claude.png"
                                    alt="AI Finance Master Syllabus"
                                    className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Interactive 16-Module Curriculum */}
                    <CourseCurriculum />

                    {/* Full-Width "More Inside" Banner - Light & Accessible */}
                    <div className="mb-32">
                        <div className="relative w-full rounded-3xl p-1 bg-gradient-to-r from-teal-500/40 via-royal-500/40 to-teal-500/40 shadow-2xl">
                            <div className="relative bg-gradient-to-br from-white via-slate-50 to-slate-100 rounded-[1.4rem] p-10 md:p-16 border border-slate-200 text-slate-900 shadow-inner">
                                <div className="space-y-6">
                                    <div className="text-center max-w-2xl mx-auto">
                                        <div className="inline-block bg-teal-100 text-teal-800 border border-teal-200 px-4 py-1.5 rounded-full text-sm font-extrabold uppercase tracking-wider mb-3">
                                            בונוסים ותכנים נוספים
                                        </div>
                                        <div className="text-teal-700 font-black text-3xl md:text-4xl mb-2">ועוד הרבה בפנים</div>
                                        <h3 className="text-2xl md:text-3xl font-black text-slate-950">מה שאתה באמת מקבל בכלים ופרקטיקה</h3>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-10">
                                        <div className="flex gap-4 p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                            <div className="w-12 h-12 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-md">
                                                <PlayCircle className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold text-slate-900 mb-2">הקלטות וובינרים חיים</h4>
                                                <p className="text-slate-700 text-sm md:text-base leading-relaxed">5 וובינרים שנערכו עם מנהלי כספים בשטח — כל שעה מלאה ב-Claude למשימות הפיננסיות שלך.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                            <div className="w-12 h-12 rounded-xl bg-royal-600 text-white flex items-center justify-center shrink-0 shadow-md">
                                                <FileText className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold text-slate-900 mb-2">ספריית Prompts מלאה</h4>
                                                <p className="text-slate-700 text-sm md:text-base leading-relaxed">200+ Prompts פיננסיים מוכנים — העתקה ישירה וישר לעבודה שלך בלי צורך לכתוב שום דבר מאפס.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                            <div className="w-12 h-12 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-md">
                                                <Sparkles className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold text-slate-900 mb-2">ספריית Skills פיננסיים</h4>
                                                <p className="text-slate-700 text-sm md:text-base leading-relaxed">30+ Skills מוכנות: Variance Analysis, MBR, ERP Cleaner, Board Pack Builder — הורדה והפעלה מיידית.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                            <div className="w-12 h-12 rounded-xl bg-royal-600 text-white flex items-center justify-center shrink-0 shadow-md">
                                                <Shield className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold text-slate-900 mb-2">חוברות עבודה וקבצי תרגול</h4>
                                                <p className="text-slate-700 text-sm md:text-base leading-relaxed">עשרות תרגילים עם נתוני TechFlow אמיתיים — תרגול מעשי על מקרים אמיתיים של סגירת חודש.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Course FAQ Section */}
                    <CourseFAQ faqs={courseFAQs} />

                    {/* Value Breakdown Pricing */}
                    <div id="pricing" className="mb-32">
                        <div className="mx-auto max-w-3xl relative">
                            <div className="absolute -inset-6 bg-gradient-to-r from-royal-500/30 to-teal-500/30 rounded-[3.5rem] blur-2xl animate-pulse"></div>
                            <GlassCard className="p-12 border-white/10 relative bg-white/5 backdrop-blur-2xl overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-royal-500/10 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2" />

                                {/* Big Price at Top */}
                                <div className="text-center mb-12">
                                    <div className="flex justify-center items-center gap-3 mb-6">
                                        <span className="text-sm text-text-muted line-through">₪1,300</span>
                                        <span className="text-gray-600">/</span>
                                        <span className="text-7xl md:text-8xl font-black text-teal-400">599</span>
                                        <span className="text-3xl font-bold text-white">₪</span>
                                    </div>
                                    <p className="text-sm text-teal-400 font-medium">מחיר מיוחד לזמן מוגבל · גישה לכל החיים</p>
                                </div>

                                {/* Header */}
                                <div className="text-center mb-10 py-6 border-y border-white/10">
                                    <div className="text-sm text-text-muted mb-3">// כמה זה שווה באמת //</div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white">מה תקבל בחבילה</h2>
                                </div>

                                {/* What They Get - No Prices */}
                                <div className="space-y-4 mb-10">
                                    {[
                                        "16 מודולים מלאים עם סרטוני הדגמה מעשיים",
                                        "200+ Prompts פיננסיים מוכנים לשימוש מיידי",
                                        "ספריית Skills פיננסיים להורדה (30+)",
                                        "הקלטות 5 וובינרים חיים על Claude",
                                        "עשרות תרגילים עם נתוני TechFlow אמיתיים"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 py-3">
                                            <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0" />
                                            <span className="text-white">{item}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA Button */}
                                <div className="text-center">
                                    <CourseBuyButton
                                        variant="pricing"
                                        text="אני רוצה את החבילה — ₪599 בלבד"
                                    />
                                </div>

                                <div className="text-center text-text-muted text-sm mt-8">
                                    <Shield className="w-4 h-4 inline-block mr-2 text-teal-500" />
                                    SSL Secured Checkout | Lifetime Access
                                </div>
                            </GlassCard>
                        </div>
                    </div>

                    {/* Footer CTA */}
                    <div className="text-center mb-6">
                        <p className="text-text-muted mb-6">
                            שאלות? <a href="mailto:ronenamos@gmail.com" className="text-teal-400 hover:underline">צור קשר עם רונן</a>
                        </p>
                        <p className="text-text-muted text-sm leading-relaxed max-w-4xl mx-auto">
                            16 מודולים מעשיים | סגירת חודש אוטומטית | דשבורד CFO חי | Artifacts & Skills | Claude ב-Excel וב-PowerPoint
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
