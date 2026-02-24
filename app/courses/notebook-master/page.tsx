import type { Metadata } from "next";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckCircle2, PlayCircle, FileText, Globe, Zap, Shield, TrendingUp, Clock, Infinity } from "lucide-react";
import { PayPalProvider } from "@/components/providers/PayPalProvider";
import { PayPalPaymentButton } from "@/components/payments/PayPalPaymentButton";

export const metadata: Metadata = {
    title: "Mastering NotebookLM: קורס מעשי לאנשי פיננסים",
    description: "מהפיכת ה-AI בפיננסים: קורס של 8 שיעורים על NotebookLM להכנה לדירקטוריון, Deep Research ומצוינות רגולטורית.",
};

const syllabus = [
    {
        lesson: 1,
        title: "יסודות ה-Grounded AI",
        description: "איך NotebookLM עובד ולמה הוא שונה מכל AI אחר שפגשתם.",
    },
    {
        lesson: 2,
        title: "ניהול מקורות ידע",
        description: "סנכרון דוחות 10-K, תקני IFRS ומסמכים פנים ארגוניים ללא חשש להזיות.",
    },
    {
        lesson: 3,
        title: "הכנה לדירקטוריון ב-10 דקות",
        description: "בניית סיכומי מנהלים ומצגות מורכבות המבוססות על נתוני אמת בלבד.",
    },
    {
        lesson: 4,
        title: "Deep Research פיננסי",
        description: "הצלבת אלפי דפי נתונים לשאלות אסטרטגיות בשניות.",
    },
    {
        lesson: 5,
        title: "מצוינות רגולטורית",
        description: "שימוש ב-AI לבקרת ציות וזיהוי פערים בתהליכים חשבונאיים.",
    },
    {
        lesson: 6,
        title: "בניית זיכרון ארגוני",
        description: "הפיכת ידע שנצבר בשיחות ומסמכים לנכס דיגיטלי נגיש.",
    },
    {
        lesson: 7,
        title: "אוטומציה של תובנות",
        description: "בניית מחברות (Notebooks) חכמות שמתעדכנות בזמן אמת.",
    },
    {
        lesson: 8,
        title: "פרויקט סיום: ה-Notebook האישי",
        description: "בניית מערכת של 3 מחברות חכמות המותאמות אישית לצרכים שלך.",
    },
];

export default function NotebookMasterPage() {
    return (
        <PayPalProvider>
            <div className="relative min-h-screen bg-space-950 text-white overflow-hidden font-primary">
                {/* Background Gradients */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-royal-600/20 blur-[120px] rounded-full" />
                    <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-teal-500/10 blur-[100px] rounded-full" />
                </div>

                {/* Floating CTA */}
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-bounce-subtle">
                    <Button
                        href="#pricing"
                        size="lg"
                        className="shadow-2xl shadow-teal-500/40 px-8 py-6 text-lg font-bold bg-gradient-to-r from-teal-500 to-royal-500 border-none hover:scale-105 transition-transform"
                    >
                        הבטח את מקומך - 300₪ בלבד
                    </Button>
                </div>

                <div className="pt-24 pb-32">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {/* Hero Section */}
                        <div className="mb-24 text-center">
                            <Badge variant="royal" className="mb-6 px-4 py-1.5 text-sm uppercase tracking-widest">Masterclass 2026</Badge>
                            <h1 className="text-5xl font-black sm:text-7xl lg:text-8xl mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 leading-tight">
                                Mastering <span className="text-teal-400">NotebookLM</span>
                            </h1>
                            <h2 className="text-2xl font-bold text-royal-400 mb-8 tracking-widest uppercase">
                                הכלי העוצמתי ביותר לאנשי פיננסים בעידן ה-AI
                            </h2>
                            <p className="mx-auto max-w-3xl text-xl text-text-secondary leading-relaxed mb-12">
                                תפסיק להיאבק בערימת דוחות ונתונים. למד איך להפוך את NotebookLM למוח הפיננסי השני שלך -
                                ניתוח דוחות, הכנה לדירקטוריון ו-Deep Research ב-100% דיוק.
                            </p>
                            <div className="flex flex-wrap justify-center gap-6 items-center">
                                <div className="min-w-[200px]">
                                    <PayPalPaymentButton amount="300" subscriptionType="lifetime" />
                                </div>
                                <Button size="lg" variant="ghost" href="#curriculum" className="px-10 py-7 text-xl border-white/10 hover:bg-white/5 h-fit">
                                    מה לומדים?
                                </Button>
                            </div>
                        </div>

                        {/* Stats/Quick Info */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
                            {[
                                { icon: Clock, label: "8 שיעורים", sub: "מקיפים ומקצועיים" },
                                { icon: PlayCircle, label: "8 סרטוני הדרכה", sub: "צעד אחר צעד" },
                                { icon: FileText, label: "8 מצגות", sub: "סיכומי שיעור להורדה" },
                                { icon: Infinity, label: "גישה לכל החיים", sub: "כולל עדכונים" }
                            ].map((stat, i) => (
                                <GlassCard key={i} className="flex flex-col items-center p-6 text-center border-white/5">
                                    <stat.icon className="w-8 h-8 text-teal-400 mb-3" />
                                    <div className="text-xl font-bold leading-tight">{stat.label}</div>
                                    <div className="text-xs text-text-muted mt-1">{stat.sub}</div>
                                </GlassCard>
                            ))}
                        </div>

                        {/* Problem/Solution */}
                        <div className="mb-24 grid lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">הבעיה עם AI רגיל בפיננסים</h2>
                                <ul className="space-y-4">
                                    {[
                                        "הזיות (Hallucinations) שמייצרות נתונים שגויים",
                                        "חוסר יכולת להתבסס על מקורות המידע הספציפיים שלך",
                                        "קושי בניתוח מסמכי PDF כבדים ומורכבים",
                                        "סיכון רגולטורי בדיווח נתונים לא מדויקים"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-text-secondary">
                                            <span className="text-red-400 mt-1">✕</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <GlassCard className="p-8 border-teal-500/20 bg-teal-500/5">
                                <h2 className="text-3xl font-bold text-teal-400 mb-6 font-primary">הפתרון: Grounded AI</h2>
                                <p className="text-text-secondary mb-6">
                                    NotebookLM הוא לא ChatGPT. הוא כלי שלוקח את המקורות **שלך** (IFRS, 10-K, דוחות פנימיים)
                                    ומשתמש בהם כבסיס הבלעדי לתשובות שלו.
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        "אפס הזיות - כל תשובה מגובה במקור ספציפי",
                                        "ניתוח עומק של אלפי דפים בשניות",
                                        "יצירת זיכרון ארגוני נגיש וחכם",
                                        "חיסכון של עשרות שעות עבודה בחודש"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-white">
                                            <CheckCircle2 className="w-5 h-5 text-teal-400 mt-1" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </GlassCard>
                        </div>

                        {/* Visual Syllabus Placeholder */}
                        <div className="mb-32">
                            <SectionHeading
                                title="תוכנית המאסטר-קלאס"
                                subtitle="מסלול מובנה של 8 שלבים שיהפכו אותך למומחה NotebookLM"
                                gradient
                            />
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-royal-500 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                                <div className="relative bg-space-950 rounded-[2rem] overflow-hidden border border-white/10">
                                    <img
                                        src="/images/courses/notebook-master-syllabus.png"
                                        alt="Notebook Master Syllabus"
                                        className="w-full h-auto"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Main Curriculum Grid */}
                        <div id="curriculum" className="mb-32">
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                                {syllabus.map((item) => (
                                    <div
                                        key={item.lesson}
                                        className="group p-6 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-teal-500/30 transition-all duration-300"
                                    >
                                        <div className="mb-4 text-teal-400 font-black text-2xl opacity-50 group-hover:opacity-100 transition-opacity">0{item.lesson}</div>
                                        <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                        <p className="text-sm text-text-secondary leading-relaxed mb-4">
                                            {item.description}
                                        </p>
                                        <div className="flex gap-2 opacity-40">
                                            <PlayCircle className="w-4 h-4" />
                                            <FileText className="w-4 h-4" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Bonus Section */}
                        <div className="mb-32">
                            <GlassCard className="p-10 border-royal-500/20 bg-royal-500/5 overflow-hidden relative">
                                <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-royal-500/20 blur-3xl -z-10" />
                                <div className="grid lg:grid-cols-2 gap-10 items-center">
                                    <div>
                                        <Badge variant="royal" className="mb-4">Value Addition</Badge>
                                        <h2 className="text-4xl font-bold mb-6 italic italic">בונוס בלעדי לרוכשים</h2>
                                        <div className="space-y-6">
                                            <div className="flex gap-4">
                                                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-royal-500/20 flex items-center justify-center">
                                                    <Globe className="w-6 h-6 text-royal-400" />
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-bold">גישה לכל החיים לבלוג ולמדריכים</h4>
                                                    <p className="text-text-secondary italic">הבלוג המתעדכן שלי עם כל הכלים הכי חדשים בעולם ה-AI לאנשי כספים.</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-4">
                                                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-teal-500/20 flex items-center justify-center">
                                                    <Zap className="w-6 h-6 text-teal-400" />
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-bold">עדכוני קורס ללא תשלום</h4>
                                                    <p className="text-text-secondary italic">עולם ה-AI זז מהר. הקורס מתעדכן ואתה מקבל הכל בחינם.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden lg:block relative group">
                                        <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 relative shadow-2xl">
                                            {/* Background Image */}
                                            <div
                                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                                style={{
                                                    backgroundImage: 'url("/images/lifetime-access.png")',
                                                }}
                                            />

                                            {/* Dark Overlay for readability */}
                                            <div className="absolute inset-0 bg-space-950/40 backdrop-blur-[1px] group-hover:bg-space-950/20 transition-all duration-500" />

                                            {/* Content Overlay */}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="text-center p-8 relative z-10 transition-transform duration-500 group-hover:scale-110">
                                                    <Infinity className="w-16 h-16 text-teal-400 mx-auto mb-4 animate-pulse" />
                                                    <div className="text-3xl font-black text-white tracking-tighter shadow-2xl">LIFETIME ACCESS</div>
                                                    <div className="text-teal-300 font-bold mt-2 tracking-widest uppercase text-sm">No Monthly Fees</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </GlassCard>
                        </div>

                        {/* Pricing Section */}
                        <div id="pricing" className="mb-32 text-center">
                            <SectionHeading title="השקעה בעתיד המקצועי שלך" subtitle="מחיר השקה מיוחד - זמן מוגבל" gradient />
                            <div className="mx-auto max-w-lg relative">
                                <div className="absolute -inset-4 bg-gradient-to-r from-teal-500/20 to-royal-500/20 rounded-[3rem] blur-xl"></div>
                                <GlassCard className="p-12 border-teal-500/40 relative">
                                    <div className="text-sm uppercase tracking-widest text-text-muted mb-4 font-bold">הצטרף עכשיו ב-</div>
                                    <div className="flex justify-center items-end gap-2 mb-8">
                                        <span className="text-7xl font-black text-white">300</span>
                                        <span className="text-2xl font-bold text-teal-400 mb-2">₪</span>
                                    </div>
                                    <ul className="text-right space-y-4 mb-10 max-w-xs mx-auto">
                                        {[
                                            "8 שיעורים מלאים (וידאו + PPT)",
                                            "פרויקט סיום מעשי",
                                            "גישה לכל החיים לבלוג",
                                            "מדריכי AI מתעדכנים",
                                            "תמיכה מקצועית במייל"
                                        ].map((item, i) => (
                                            <li key={i} className="flex gap-3 justify-end items-center">
                                                <span className="text-text-secondary">{item}</span>
                                                <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0" />
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-4">
                                        <PayPalPaymentButton amount="300" subscriptionType="lifetime" />
                                    </div>
                                    <div className="mt-6 flex items-center justify-center gap-2 text-text-muted text-sm">
                                        <Shield className="w-4 h-4" />
                                        רכישה מאובטחת תחת SSL
                                    </div>
                                </GlassCard>
                            </div>
                        </div>

                        {/* FAQ Quick Section */}
                        <div className="max-w-3xl mx-auto mb-32">
                            <h2 className="text-3xl font-bold text-center mb-12 italic italic">שאלות נפוצות</h2>
                            <div className="space-y-4">
                                {[
                                    { q: "למי הקורס מיועד?", a: "הקורס נבנה במיוחד עבור רואי חשבון, מנהלי כספים, אנליסטים וכל מי שעובד עם דוחות פיננסיים מורכבים." },
                                    { q: "האם צריך ידע טכני קודם?", a: "ממש לא. אנחנו מתחילים מהבסיס ומגיעים לרמות המתקדמות ביותר צעד אחר צעד." },
                                    { q: "איך מקבלים את הגישה לבלוג?", a: "מיד לאחר הרכישה תקבל הרשאת כניסה מיוחדת לכל התכנים המקצועיים בבלוג למשך כל החיים." }
                                ].map((faq, i) => (
                                    <details key={i} className="group border-b border-white/10 pb-4 cursor-pointer">
                                        <summary className="text-lg font-bold flex justify-between items-center list-none">
                                            {faq.q}
                                            <span className="group-open:rotate-180 transition-transform">↓</span>
                                        </summary>
                                        <p className="mt-4 text-text-secondary leading-relaxed">{faq.a}</p>
                                    </details>
                                ))}
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
