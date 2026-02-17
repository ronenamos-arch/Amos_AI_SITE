import type { Metadata } from "next";
import { GlassCard } from "@/components/ui/GlassCard";

export const metadata: Metadata = {
    title: "מדיניות פרטיות ותנאי שימוש | AI FINANCE",
    description: "תנאי השימוש ומדיניות הפרטיות של אתר רונן עמוס - AI FINANCE, בהתאם לחוק הגנת הפרטיות ותיקון 13א.",
};

export default function LegalPage() {
    return (
        <div className="pt-24 pb-16">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <GlassCard className="p-8 md:p-12">
                    <h1 className="text-3xl font-bold mb-8 text-center gradient-text">תנאי שימוש ומדיניות פרטיות</h1>

                    <div className="prose prose-invert max-w-none space-y-8 text-text-secondary leading-relaxed text-right" dir="rtl">
                        <section>
                            <h2 className="text-xl font-bold text-text-primary mb-4 border-b border-white/10 pb-2">1. כללי</h2>
                            <p>
                                ברוכים הבאים לאתר AI FINANCE (להלן: "האתר") בניהולו של רונן עמוס (להלן: "מפעיל האתר"). השימוש באתר כפוף לתנאים המפורטים להלן. גלישה באתר או הרשמה לשירותיו מהווה הסכמה לתנאים אלו.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-text-primary mb-4 border-b border-white/10 pb-2">2. הסכמה לקבלת דברי פרסומת (תיקון 13א לחוק התקשורת)</h2>
                            <p>
                                בהתאם לתיקון 13א לחוק התקשורת (בזק ושידורים), התשמ"ב-1982, המשתמש מאשר במפורש כי בעת השארת פרטיו באתר או הרשמה לשירות, הוא מסכים לקבל מהאתר דברי פרסומת, עדכונים, תכנים מקצועיים והצעות שיווקיות באמצעות דואר אלקטרוני, מסרונים (SMS) או וואטסאפ.
                            </p>
                            <p className="font-bold text-teal-400">
                                זכות הסרה: המשתמש רשאי בכל עת לבקש את הסרתו מרשימת התפוצה באמצעות לחיצה על קישור ה"הסרה" המופיע בתחתית הודעות המייל או על ידי שליחת הודעה למפעיל האתר.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-text-primary mb-4 border-b border-white/10 pb-2">3. מדיניות פרטיות והגנת מידע</h2>
                            <p>
                                מפעיל האתר מכבד את פרטיות המשתמשים. המידע שנאסף (כגון שם, מייל, ופרטי הרשמה) משמש למתן השירותים באתר, שיפור חוויית המשתמש ודיווח מקצועי. המידע נשמר במאגרי מידע מאובטחים (Supabase) ולא יועבר לצד ג' ללא הסכמת המשתמש, למעט במקרים הנדרשים על פי דין.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-text-primary mb-4 border-b border-white/10 pb-2">4. שירותי פרימיום ורכישות</h2>
                            <p>
                                הגישה לתכני פרימיום מותנית בתשלום כפי שמוגדר בדף המחירון. התשלום מבוצע באמצעות PayPal. לאחר ביצוע התשלום, הגישה למשתמש תאושר ידנית או אוטומטית על פי נהלי האתר.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-text-primary mb-4 border-b border-white/10 pb-2">5. הגבלת אחריות</h2>
                            <p>
                                התכנים באתר, לרבות המדריכים ופרומפטים ל-AI, הינם למטרות לימודיות והעשרה בלבד ואינם מהווים ייעוץ משפטי, חשבונאי או מסורי מחייב. השימוש בבינה מלאכותית דורש בקרה אנושית ומקצועית.
                            </p>
                        </section>

                        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm">
                            עודכן לאחרונה: פברואר 2026
                        </div>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}
