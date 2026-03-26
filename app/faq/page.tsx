"use client";

import type { Metadata } from "next";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";

// Metadata must be in a server component — moved to layout or defined statically.
// For client components, export metadata from a sibling layout.tsx instead.

const faqs = [
    {
        q: "מה זה ייעוץ AI פיננסי ולמה עסקים צריכים אותו?",
        a: "ייעוץ AI פיננסי משלב כלי בינה מלאכותית עם ניהול כספים כדי לחסוך זמן, לזהות שגיאות ולהפיק תובנות מהירות יותר. עסקים שמשתמשים בו חוסכים בממוצע 15–20 שעות עבודה שבועיות ומקצרים את סגירת חודש מ-10 ימים ל-3 ימים.",
    },
    {
        q: "כמה עולה ייעוץ פיננסי עם רונן עמוס?",
        a: "המחיר תלוי בהיקף העבודה ובצרכים הספציפיים של העסק. פגישת ייעוץ ראשונה היא חינמית לחלוטין — ללא התחייבות. בפגישה נבין יחד מה נדרש ונציע הצעה מותאמת אישית.",
    },
    {
        q: "מה ההבדל בין רואה חשבון רגיל לרו\"ח שמתמחה ב-AI?",
        a: "רואה חשבון רגיל מתמקד בציות מס ודיווח. רו\"ח שמתמחה ב-AI מוסיף על כך יכולת לנתח נתונים בזמן אמת, לבנות דשבורדים פיננסיים אוטומטיים ולהפיק תובנות עסקיות שמניעות החלטות — לא רק לדווח על מה שכבר קרה.",
    },
    {
        q: "כמה זמן לוקח ללמוד Power BI לאנשי כספים?",
        a: "רוב אנשי הכספים מגיעים לרמה פרקטית ב-10–15 שעות לימוד ממוקד. הקורס שלנו בנוי לאנשי כספים ורואי חשבון — לא לאנשי IT — ומתמקד בדשבורדים פיננסיים וניתוח תקציב מול ביצוע.",
    },
    {
        q: "האם AI יכול לעזור עם הגשות מס הכנסה בישראל?",
        a: "AI יכול לסייע בארגון מסמכים, זיהוי הוצאות מוכרות, בדיקת עקביות נתונים והכנת טיוטות. עם זאת, ההגשה הסופית לרשות המסים חייבת לעבור רו\"ח מוסמך שמוודא ציות לתקנות הישראליות.",
    },
    {
        q: "מה כולל ייעוץ ראשוני חינמי?",
        a: "בפגישת הייעוץ הראשונה (כ-30–45 דקות) נסקור את האתגרים הפיננסיים שלך, נזהה הזדמנויות לחיסכון בזמן ובעלויות, ונבדוק אם יש כלים שיכולים להתאים לעסק שלך. בסוף הפגישה תקבל תמונה ברורה של הצעדים הבאים — גם אם לא נמשיך יחד.",
    },
    {
        q: "האם אתה עובד עם סטארטאפים או גם עם עסקים מבוססים?",
        a: "אני עובד עם שניהם. לסטארטאפים אני מציע ליווי CFO פרטי — בניית מודלים פיננסיים, מעקב KPI ודוחות למשקיעים. לעסקים מבוססים אני מתמקד בייעול תהליכים, אוטומציה ופתרונות BI.",
    },
    {
        q: "מה זה NotebookLM ואיך הוא עוזר לרואי חשבון?",
        a: "NotebookLM הוא כלי AI של גוגל שמאפשר לטעון מסמכים פיננסיים — חוזים, דוחות, חקיקה — ולשאול שאלות בשפה טבעית. רואי חשבון משתמשים בו לניתוח מהיר של חוזים, ביקורת ומחקר מס.",
    },
    {
        q: "האם ניתן לקבל ייעוץ מרחוק (לא פנים אל פנים)?",
        a: "כן. רוב הייעוצים שלנו מתקיימים בזום או בשיחת וידאו. לקוחות מכל הארץ — תל אביב, ירושלים, חיפה, באר שבע — מקבלים שירות מלא ללא צורך בנסיעה.",
    },
    {
        q: "מה זה ASC 606 ו-IFRS 15 ולמה זה חשוב לחברות ישראליות?",
        a: "ASC 606 (תקן אמריקאי) ו-IFRS 15 (תקן בינלאומי) הם כללי הכרת הכנסות שחברות טכנולוגיה וסטארטאפים צריכים לעמוד בהם — במיוחד כשמגייסים השקעות מחו\"ל או מתכננים IPO. אני מתמחה ביישום שני התקנים.",
    },
    {
        q: "כמה זמן לוקח לבנות דשבורד CFO עם Power BI?",
        a: "דשבורד CFO בסיסי עם מדדי KPI, תזרים מזומנים ותקציב מול ביצוע ניתן לבנות תוך 3–5 ימי עבודה. דשבורד מלא עם חיבור ל-ERP ואוטומציה של עדכונים לוקח 2–4 שבועות בהתאם למורכבות הנתונים.",
    },
    {
        q: "האם אתה יכול לעזור לנו להטמיע ERP כמו NetSuite?",
        a: "כן. אני מלווה חברות בכל תהליך הטמעת ERP — מבחירת המערכת, מיפוי תהליכים, הגדרת תהליכי עבודה וחיבור ל-BI. אני עובד עם NetSuite, Priority וכלי ERP נוספים.",
    },
    {
        q: "האם ניתן לאוטומט תהליכי כספים בלי להחליף מערכות קיימות?",
        a: "לרוב — כן. כלים כמו n8n, Zapier ו-Make מאפשרים לחבר מערכות קיימות (אקסל, QuickBooks, ERP) ולהפוך תהליכים חוזרים לאוטומטיים — ייצוא דוחות, שליחת אישורים, התראות חריגים — ללא פיתוח מותאם.",
    },
    {
        q: "מה ההבדל בין הקורסים שלך לקורסי Excel/BI רגילים?",
        a: "הקורסים שלי נבנו במיוחד לאנשי כספים ורואי חשבון — לא לאנשי IT. כל דוגמה, תרגיל ופרויקט קשורים לדוחות כספיים, תקציב, ביקורת ומדדי CFO. אין קורסים כלליים — רק פתרונות שישר לתפקיד שלך.",
    },
    {
        q: "איך אני יודע אם העסק שלי צריך ייעוץ AI עכשיו?",
        a: "אם אתה מוצא את עצמך מבלה יותר מ-3 שעות שבועיות על עדכון דוחות ידני, מעתיק נתונים בין מערכות, או מחכה יותר מ-5 ימים לסגירת חודש — יש כנראה הזדמנות ברורה לחסוך זמן ועלויות עם AI.",
    },
];

function FaqItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
    return (
        <div className="border border-white/8 rounded-xl overflow-hidden">
            <button
                className="w-full text-right px-6 py-4 flex items-start justify-between gap-4 hover:bg-white/5 transition-colors"
                onClick={onToggle}
                aria-expanded={isOpen}
            >
                <span className="font-semibold text-base leading-snug">{q}</span>
                {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-teal-400 shrink-0 mt-0.5" />
                ) : (
                    <ChevronDown className="h-5 w-5 text-text-muted shrink-0 mt-0.5" />
                )}
            </button>
            {isOpen && (
                <div className="px-6 pb-5 text-text-secondary leading-relaxed text-sm">
                    {a}
                </div>
            )}
        </div>
    );
}

export default function FaqPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map(({ q, a }) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: {
                "@type": "Answer",
                text: a,
            },
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <div className="pt-28 pb-20" dir="rtl">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-4">שאלות נפוצות</h1>
                        <p className="text-text-secondary text-lg max-w-xl mx-auto">
                            תשובות ישירות על ייעוץ פיננסי, AI, Power BI וקורסים — כדי שתגיע לשיחה מוכן.
                        </p>
                    </div>

                    <GlassCard className="p-2 mb-12">
                        <div className="divide-y divide-white/5">
                            {faqs.map((faq, i) => (
                                <FaqItem
                                    key={i}
                                    q={faq.q}
                                    a={faq.a}
                                    isOpen={openIndex === i}
                                    onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                                />
                            ))}
                        </div>
                    </GlassCard>

                    <div className="text-center">
                        <p className="text-text-secondary mb-6">
                            לא מצאת את התשובה שחיפשת? דבר איתי ישירות.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button href="/contact" size="lg">
                                פגישת ייעוץ חינמית
                            </Button>
                            <Button href="/services" variant="secondary" size="lg">
                                הכר את השירותים
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
