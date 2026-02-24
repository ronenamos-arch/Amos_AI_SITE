import type { Metadata } from "next";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckCircle2, PlayCircle, FileText, Globe, Zap, Shield, Infinity, Clock, Sparkles } from "lucide-react";
import { PayPalProvider } from "@/components/providers/PayPalProvider";
import { PayPalPaymentButton } from "@/components/payments/PayPalPaymentButton";

export const metadata: Metadata = {
    title: "AI FINANCE Mastery: הפוך לחשבונאי של העתיד",
    description: "קורס מקיף של 8 שיעורים: ChatGPT לפיננסים וחשבונאות ארגונית. לימוד מעשי עם 100+ פרומפטים מוכנים.",
};

const syllabus = [
    {
        lesson: 1,
        title: "מבוא לעולם ה-AI Finance",
        description: "כלים, ציפיות ומטרות. הכרת סביבת העבודה וכלי ה-AI המובילים בשוק.",
    },
    {
        lesson: 2,
        title: "מאסטר פרומפטים פיננסיים",
        description: "עקרונות ChatGPT ומסגרות פרומפט (Frameworks) מנצחות לעולם הכספים.",
    },
    {
        lesson: 3,
        title: "כתיבה עסקית ודיווח מהיר",
        description: "בניית דוחות, מיילים ומסמכים מקצועיים בשבריר מהזמן הרגיל.",
    },
    {
        lesson: 4,
        title: "Brainstorming ואסטרטגיה",
        description: "שימוש ב-AI לפתרון בעיות מורכבות וחדשנות באתגרים פיננסיים.",
    },
    {
        lesson: 5,
        title: "Data Analysis & Automation",
        description: "ניתוח נתונים מורכבים מהיר ואוטומציה של תהליכים פיננסיים חוזרים.",
    },
    {
        lesson: 6,
        title: "פתרון בעיות טכניות ו-IT",
        description: "קבלת עזרה מיידית, פתרון תקלות טכניות וכתיבת נוסחאות מורכבות.",
    },
    {
        lesson: 7,
        title: "מודלים מתקדמים ו-Multi-modal",
        description: "שימוש ביכולות הקול, התמונה והווידאו של דור ה-AI החדש.",
    },
    {
        lesson: 8,
        title: "עתיד המקצוע והכנה לדיגיטל",
        description: "מגמות עתידיות, התפתחויות צפויות ובניית תוכנית עבודה אישית.",
    },
];

const includes = [
    "ספריית Notion עם 100+ פרומפטים לרואי חשבון ו-CFOs",
    "חוברות תרגול מלאות לכל שיעור",
    "כלי תרגום מהיר אנגלית-עברית ייעודי",
    "גישה לקהילת AI ופיננסים סגורה",
    "תעודת סיום רשמית",
];

export default function AIMasteryPage() {
    return (
        <PayPalProvider>
            <div className="relative min-h-screen bg-space-950 text-white overflow-hidden font-primary">
                {/* Background Gradients */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                    <div className="absolute top-[-10%] right-[-10%] w-[45%] h-[45%] bg-teal-600/20 blur-[130px] rounded-full" />
                    <div className="absolute bottom-[10%] left-[-5%] w-[35%] h-[35%] bg-royal-500/10 blur-[110px] rounded-full" />
                </div>

                {/* Floating CTA */}
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-bounce-subtle">
                    <Button
                        href="#pricing"
                        size="lg"
                        className="shadow-2xl shadow-teal-500/40 px-8 py-6 text-lg font-bold bg-gradient-to-r from-teal-500 to-royal-500 border-none hover:scale-105 transition-transform"
                    >
                        הפוך ל-AI Master - הירשם עכשיו
                    </Button>
                </div>

                <div className="pt-24 pb-32">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {/* Hero Section */}
                        <div className="mb-24 text-center">
                            <Badge variant="teal" className="mb-6 px-4 py-1.5 text-sm uppercase tracking-widest bg-teal-500/10 text-teal-400 border-teal-500/20">Certified Program 2026</Badge>
                            <h1 className="text-5xl font-black sm:text-7xl lg:text-8xl mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 leading-tight">
                                AI FINANCE <span className="text-royal-400">Mastery</span>
                            </h1>
                            <h2 className="text-2xl font-bold text-teal-400 mb-8 tracking-widest uppercase">
                                מהפיכת ה-ChatGPT בעולם החשבונאות והכספים
                            </h2>
                            <p className="mx-auto max-w-3xl text-xl text-text-secondary leading-relaxed mb-12">
                                הצטרף לקורס המקיף ביותר בישראל המלמד אנשי פיננסים איך לרתום את עוצמת ה-Generative AI
                                לחיסכון של שעות עבודה, שיפור הדיוק והובלה טכנולוגית בארגון.
                            </p>
                            <div className="flex flex-wrap justify-center gap-6 items-center">
                                <div className="min-w-[200px]">
                                    <PayPalPaymentButton amount="300" subscriptionType="lifetime" />
                                </div>
                                <Button size="lg" variant="ghost" href="#curriculum" className="px-10 py-7 text-xl border-white/10 hover:bg-white/5 h-fit">
                                    הסילבוס המלא
                                </Button>
                            </div>
                        </div>

                        {/* Quick Stats Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
                            {[
                                { icon: Clock, label: "8 שיעורים", sub: "פרקטיקה נטו" },
                                { icon: Sparkles, label: "100+ פרומפטים", sub: "להעתק-הדבק" },
                                { icon: FileText, label: "Notion Library", sub: "ספריית ידע מלאה" },
                                { icon: Infinity, label: "גישה לכל החיים", sub: "לכל התכנים" }
                            ].map((stat, i) => (
                                <GlassCard key={i} className="flex flex-col items-center p-6 text-center border-white/5">
                                    <stat.icon className="w-8 h-8 text-royal-400 mb-3" />
                                    <div className="text-xl font-bold leading-tight">{stat.label}</div>
                                    <div className="text-xs text-text-muted mt-1">{stat.sub}</div>
                                </GlassCard>
                            ))}
                        </div>

                        {/* Value Props */}
                        <div className="mb-24 grid lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 italic italic">למה זה קריטי עבורך?</h2>
                                <ul className="space-y-4">
                                    {[
                                        "חיסכון של 5-10 שעות עבודה שבועיות על משימות רוטיניות",
                                        "יכולת ניתוח דאטה מהירה ללא צורך בידע בתכנות",
                                        "שיפור דרמטי באיכות הכתיבה העסקית והתקשורת הניהולית",
                                        "בידול מקצועי משמעותי בשוק העבודה המשתנה"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-text-secondary">
                                            <CheckCircle2 className="w-5 h-5 text-royal-400 mt-1 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <GlassCard className="p-8 border-royal-500/20 bg-royal-500/5">
                                <h2 className="text-3xl font-bold text-royal-400 mb-6 font-primary uppercase tracking-tight">מה תקבל בתוכנית?</h2>
                                <ul className="space-y-4">
                                    {includes.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-white">
                                            <div className="h-2 w-2 rounded-full bg-teal-400 mt-2 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </GlassCard>
                        </div>

                        {/* Visual Syllabus Image */}
                        <div id="curriculum-image" className="mb-32">
                            <SectionHeading
                                title="תוכנית ההכשרה"
                                subtitle="ממבוא ועד אוטומציות מתקדמות - הכל תחת קורת גג אחת"
                                gradient
                            />
                            <div className="relative group p-1">
                                <div className="absolute -inset-1 bg-gradient-to-r from-royal-500 to-teal-500 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                                <div className="relative bg-space-950 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                                    <img
                                        src="/images/courses/ai-mastery-syllabus.png"
                                        alt="AI Mastery Syllabus"
                                        className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Curriculum Grid */}
                        <div id="curriculum" className="mb-32">
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                                {syllabus.map((item) => (
                                    <div
                                        key={item.lesson}
                                        className="group p-6 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-royal-500/30 transition-all duration-300"
                                    >
                                        <div className="mb-4 text-royal-400 font-black text-2xl opacity-50 group-hover:opacity-100 transition-opacity">Module {item.lesson}</div>
                                        <h3 className="text-xl font-bold mb-3 group-hover:text-royal-300 transition-colors">{item.title}</h3>
                                        <p className="text-sm text-text-secondary leading-relaxed mb-4">
                                            {item.description}
                                        </p>
                                        <div className="flex gap-2 opacity-30 group-hover:opacity-100 transition-opacity">
                                            <PlayCircle className="w-5 h-5 text-teal-400" />
                                            <FileText className="w-5 h-5 text-royal-400" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Bonus Lifetime Card */}
                        <div className="mb-32">
                            <GlassCard className="p-10 border-teal-500/20 bg-teal-500/5 overflow-hidden relative">
                                <div className="absolute bottom-[-10%] left-[-5%] w-72 h-72 bg-teal-500/10 blur-3xl -z-10" />
                                <div className="grid lg:grid-cols-2 gap-10 items-center">
                                    <div className="order-2 lg:order-1">
                                        <Badge variant="teal" className="mb-4">Special Bonus</Badge>
                                        <h2 className="text-4xl font-bold mb-6 italic italic text-white leading-tight">בונוס בלעדי: גישה למוח של רונן</h2>
                                        <div className="space-y-8">
                                            <div className="flex gap-5">
                                                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-teal-500/20 flex items-center justify-center">
                                                    <Globe className="w-7 h-7 text-teal-400" />
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-bold">ספריית התוכן והבלוג המתעדכן</h4>
                                                    <p className="text-text-secondary mt-1">גישה מלאה לכל המדריכים, הכלים והמאמרים הסגורים שלי לכל החיים.</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-5">
                                                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-royal-500/20 flex items-center justify-center">
                                                    <Zap className="w-7 h-7 text-royal-400" />
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-bold">עדכונים שוטפים ב-AI</h4>
                                                    <p className="text-text-secondary mt-1">התחום משתנה כל שבוע. כשתכונות חדשות יוצאות - הקורס מתעדכן ואתה מקבל הכל בחינם.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="order-1 lg:order-2">
                                        <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 relative group shadow-2xl">
                                            <div
                                                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                                                style={{
                                                    backgroundImage: 'url("/images/lifetime-access.png")',
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-space-950/40 backdrop-blur-[1px]" />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="text-center p-8 relative z-10">
                                                    <Infinity className="w-20 h-20 text-teal-400 mx-auto mb-6 animate-pulse" />
                                                    <div className="text-4xl font-black text-white tracking-tighter">LIFETIME</div>
                                                    <div className="text-teal-400 font-bold mt-2 tracking-widest uppercase">Full Access</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </GlassCard>
                        </div>

                        {/* Pricing Section */}
                        <div id="pricing" className="mb-32 text-center">
                            <Badge variant="royal" className="mb-4 px-4 py-1">Limited Time Launch Offer</Badge>
                            <SectionHeading title="השקעה חד פעמית בקריירה שלך" subtitle="הפוך לנכס אסטרטגי עבור הארגון שלך" gradient />

                            <div className="mx-auto max-w-xl relative mt-12">
                                <div className="absolute -inset-6 bg-gradient-to-r from-royal-500/30 to-teal-500/30 rounded-[3.5rem] blur-2xl animate-pulse"></div>
                                <GlassCard className="p-12 border-white/10 relative bg-white/5 backdrop-blur-2xl overflow-hidden price-glow">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-royal-500/10 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2" />

                                    <div className="text-xl font-bold text-text-muted mb-4">מחיר הקורס המלא</div>
                                    <div className="flex justify-center items-end gap-3 mb-10">
                                        <span className="text-8xl font-black text-white leading-none">300</span>
                                        <span className="text-3xl font-bold text-teal-400 mb-2">₪</span>
                                    </div>

                                    <ul className="text-right space-y-5 mb-12 max-w-xs mx-auto">
                                        {[
                                            "8 מודולים של למידה מעשית",
                                            "100+ פרומפטים פיננסיים להורדה",
                                            "Notion Master Library",
                                            "גישה לכל החיים כולל עדכונים",
                                            "תמיכה אישית במייל"
                                        ].map((item, i) => (
                                            <li key={i} className="flex gap-4 justify-end items-center text-lg">
                                                <span className="text-text-secondary">{item}</span>
                                                <CheckCircle2 className="w-6 h-6 text-teal-400 flex-shrink-0" />
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-4">
                                        <PayPalPaymentButton amount="300" subscriptionType="lifetime" />
                                    </div>

                                    <div className="mt-8 flex items-center justify-center gap-2 text-text-muted text-sm font-medium">
                                        <Shield className="w-4 h-4 text-teal-500" />
                                        SSL Secured Checkout | Lifetime Access
                                    </div>
                                </GlassCard>
                            </div>
                        </div>

                        {/* Final CTA Footer */}
                        <div className="text-center mb-3">
                            <p className="text-text-muted">
                                יש לך שאלות? מוזמן ליצור קשר ב- <a href="mailto:ronenamos@gmail.com" className="text-teal-400 hover:underline">ronenamos@gmail.com</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </PayPalProvider>
    );
}
