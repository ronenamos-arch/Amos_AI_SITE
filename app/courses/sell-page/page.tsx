import type { Metadata } from "next";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckCircle2, PlayCircle, FileText, Zap, Infinity, Clock, Shield, Sparkles, Globe, Video } from "lucide-react";

export const metadata: Metadata = {
    title: "AI Finance Master: קורס מתקדם לאוטומציה של מחלקת הכספים",
    description: "קורס מתקדם בעברית: הפוך את מחלקת הכספים למכונת אוטומציה עם Claude AI. 8 מודולים בעמקות, אוטומציה של דוחות, ניתוח נתונים ו-AI Agents פיננסיים.",
};

const modules = [
    {
        num: 1,
        title: "Claude ושלושת המודלים — מאיפה מתחילים",
        description: "הבנת ההבדל בין Haiku, Sonnet ו-Opus, מתי להשתמש בכל מודל, ואיך נכנסים לעבוד עם Claude כאיש כספים — בלי רקע טכנולוגי.",
    },
    {
        num: 2,
        title: "מסגרת PRICE — Prompts שעובדים בפועל",
        description: "השיטה המובנית לכתיבת Prompts פיננסיים: Purpose, Role, Instructions, Context, Examples. הבסיס שמתחת לכל שאר הקורס.",
    },
    {
        num: 3,
        title: "Artifacts — דשבורד CFO ב-Prompt אחד",
        description: "בניית דשבורדים אינטראקטיביים חיים ישירות מהצ'אט: כרטיסי KPI עם RAG, גרפים, Waterfall — מוכן למצגת דירקטוריון.",
    },
    {
        num: 4,
        title: "Skills & Projects — הזיכרון המוסדי שלך",
        description: "שמירת Prompts חוזרים כ-Skills שכל הצוות משתמש בהם, ובניית Projects עם הקשר קבוע — כך Claude זוכר את החברה שלך לאורך כל השנה.",
    },
    {
        num: 5,
        title: "Connectors — Claude מחובר למערכות שלך",
        description: "חיבור Claude ל-Google Drive, Slack, ERP וכלים נוספים. מנתונים שיושבים בפוקדרים — לניתוח חי בלי העתק-הדבק.",
    },
    {
        num: 6,
        title: "Claude ב-Excel וב-PowerPoint",
        description: "ישירות מתוך הכלים שאתה עובד בהם כל יום: Variance Commentary על טווח מסומן ב-Excel, ו-Board Pack מלא עם Speaker Notes ב-PowerPoint.",
    },
    {
        num: 7,
        title: "סגירת חודש מקצה לקצה + 102 Use Cases",
        description: "תהליך סגירה שלם ב-6 שלבים — מ-GL גולמי ועד Board Pack — ומאגר של 102 Use Cases פיננסיים מוכנים לשימוש מיידי.",
    },
    {
        num: 8,
        title: "Capstone: דשבורד CFO + ספריית Skills מוכנה",
        description: "פרויקט הסיום: דשבורד דירקטוריון אינטראקטיבי מלא ב-Prompt אחד. בונוס: ספריית Skills פיננסיים מוכנים להורדה והפעלה מיידית.",
    },
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
    return (
        <div className="relative min-h-screen bg-space-950 text-white overflow-hidden font-primary">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-10%] right-[-10%] w-[45%] h-[45%] bg-teal-600/20 blur-[130px] rounded-full" />
                <div className="absolute bottom-[10%] left-[-5%] w-[35%] h-[35%] bg-royal-500/10 blur-[110px] rounded-full" />
            </div>

            {/* Floating CTA */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-bounce-subtle">
                <a
                    href="https://www.paypal.com/ncp/payment/YK86AVAKZL7YG"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shadow-2xl shadow-teal-500/40 px-8 py-6 text-lg font-bold bg-gradient-to-r from-teal-500 to-royal-500 hover:scale-105 transition-transform inline-block text-white rounded-lg"
                >
                    הצטרף ל-AI Finance Master — ₪999
                </a>
            </div>

            <div className="pt-24 pb-32">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Hero Section */}
                    <div className="mb-24 text-center">
                        <Badge variant="teal" className="mb-6 px-4 py-1.5 text-sm uppercase tracking-widest bg-teal-500/10 text-teal-400 border-teal-500/20">Certified Advanced Program 2026</Badge>
                        <h1 className="text-5xl font-black sm:text-7xl lg:text-8xl mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 leading-tight">
                            AI Finance <span className="text-royal-400">Master</span>
                        </h1>
                        <p className="mx-auto max-w-3xl text-xl text-text-secondary leading-relaxed mb-12">
                            קורס מתקדם בעברית המלמד מנהלי כספים וCFOs איך לשלוט ב-Claude לאוטומציה מלאה, ניתוח מתקדם ו-AI Agents פיננסיים.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6 items-center">
                            <div className="min-w-[200px]">
                                <a
                                    href="https://www.paypal.com/ncp/payment/YK86AVAKZL7YG"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
                                >
                                    רכוש גישה עכשיו — ₪999
                                </a>
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
                    <div className="mb-24 grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6 border border-white/10 rounded-2xl p-8">
                            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 italic">למה זה קריטי לך?</h2>
                            <ul className="space-y-4">
                                {benefits.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-text-secondary">
                                        <CheckCircle2 className="w-5 h-5 text-royal-400 mt-1 flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <GlassCard className="p-8 border-royal-500/20 bg-royal-500/5">
                            <h2 className="text-3xl font-bold text-royal-400 mb-6 font-primary uppercase tracking-tight">מה תקבל?</h2>
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

                    {/* Curriculum Grid */}
                    <div id="curriculum" className="mb-32">
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {modules.map((item) => (
                                <div
                                    key={item.num}
                                    className="group p-6 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-royal-500/30 transition-all duration-300"
                                >
                                    <div className="mb-4 text-royal-400 font-black text-2xl opacity-50 group-hover:opacity-100 transition-opacity">Module {item.num}</div>
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

                    {/* Full-Width "More Inside" Banner */}
                    <div className="mb-32">
                        <div className="group relative w-full overflow-hidden rounded-3xl p-1">
                            <div className="absolute -inset-1 bg-gradient-to-r from-royal-500 to-teal-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-700"></div>
                            <div className="relative bg-space-950 rounded-3xl overflow-hidden border border-white/10 p-12 md:p-16 group-hover:scale-[1.02] transition-transform duration-500">
                                <div className="space-y-6">
                                    <div className="text-center">
                                        <div className="text-teal-400 font-black text-4xl md:text-5xl mb-4">ועוד הרבה בפנים</div>
                                        <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">מה שאתה באמת מקבל</h3>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-10">
                                        <div className="flex gap-4">
                                            <div className="flex-shrink-0">
                                                <PlayCircle className="w-8 h-8 text-teal-400 mt-1" />
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold text-white mb-2">הקלטות וובינרים חיים</h4>
                                                <p className="text-text-secondary">5 וובינרים שנערכו עם מנהלי כספים בשטח — כל שעה מלאה ב-Claude המשימות הפיננסיות שלך.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="flex-shrink-0">
                                                <FileText className="w-8 h-8 text-royal-400 mt-1" />
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold text-white mb-2">ספריית Prompts מלאה</h4>
                                                <p className="text-text-secondary">200+ Prompts פיננסיים מוכנים — העתקה ישירה וברא לעבודה שלך בלי צורך לכתוב שום דבר.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="flex-shrink-0">
                                                <Sparkles className="w-8 h-8 text-teal-400 mt-1" />
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold text-white mb-2">ספריית Skills פיננסיים</h4>
                                                <p className="text-text-secondary">30+ Skills מוכנות: Variance Analysis, MBR, ERP Cleaner, Board Pack Builder — הורדה והפעלה מיידית.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="flex-shrink-0">
                                                <Shield className="w-8 h-8 text-royal-400 mt-1" />
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold text-white mb-2">חוברות עבודה וקבצי תרגול</h4>
                                                <p className="text-text-secondary">עשרות תרגילים עם נתוני TechFlow אמיתיים — practice עם מקרים אמיתיים של סגירת חודש.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


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
                                        <span className="text-7xl md:text-8xl font-black text-teal-400">999</span>
                                        <span className="text-3xl font-bold text-white">₪</span>
                                    </div>
                                    <p className="text-sm text-teal-400 font-medium">מחיר השקה — זמן מוגבל</p>
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
                                    <a
                                        href="https://www.paypal.com/ncp/payment/YK86AVAKZL7YG"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block bg-teal-500 hover:bg-teal-400 text-space-950 font-bold py-4 px-12 rounded-lg text-lg transition-colors shadow-lg shadow-teal-500/30"
                                    >
                                        אני רוצה את החבילה — ₪999
                                    </a>
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
