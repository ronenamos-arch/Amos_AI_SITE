import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SMARTBEE_CONFIG } from "@/lib/smartbee-config";

const SMARTBEE_PAY_URL =
    SMARTBEE_CONFIG.products.excelWebinar?.url ||
    "https://smartbee.co.il/public-pages/?redirect-path=pay/6add37d2453941eb6ea96eef";

export const metadata: Metadata = {
    title: {
        absolute: "Claude ב-Excel: 3 משימות FP&A בלייב | רונן עמוס, CPA",
    },
    description:
        "וובינר מעשי לאנשי כספים: ניתוח סטיות, תחזית הכנסות וניתוח תרחישים עם Claude בתוך Excel, ובונוס Skill לדוחות Pivot. שריינו מקום ב-30 ₪ בלבד.",
    alternates: {
        canonical: "https://www.ronenamoscpa.co.il/webinar-claude-excel",
    },
    openGraph: {
        title: "Claude ב-Excel: 3 משימות FP&A בלייב",
        description:
            "וובינר מעשי של 60 דקות ב-Zoom לאנשי כספים: Budget vs Actuals, Revenue Forecast ו-Scenario Analysis עם Claude בתוך Excel, ובונוס Skill לדוחות Pivot.",
        url: "https://www.ronenamoscpa.co.il/webinar-claude-excel",
        siteName: "רונן עמוס | AI Finance Transformation",
        locale: "he_IL",
        type: "website",
        images: [
            {
                url: "/images/webinar/ronen-hero.jpg",
                width: 1024,
                height: 1024,
                alt: "רונן עמוס, רואה חשבון",
            },
        ],
    },
};

export default function WebinarClaudeExcelPage() {
    return (
        <div
            dir="rtl"
            className="min-h-screen text-[#f3f6fb] selection:bg-[#4fd1c5] selection:text-[#06142e]"
            style={{
                fontFamily: "var(--font-heebo), sans-serif",
                background: "linear-gradient(170deg, #0d2554 0%, #071636 40%, #030b1e 100%)",
            }}
        >
            {/* Header */}
            <header className="max-w-[1160px] mx-auto px-6 py-6 flex justify-between items-center flex-wrap gap-4">
                <Link
                    href="/"
                    className="font-extrabold tracking-[2px] text-[15px] text-[#4fd1c5] hover:opacity-90 transition-opacity"
                >
                    AI FINANCE TRANSFORMATION
                </Link>
                <a
                    href={SMARTBEE_PAY_URL}
                    className="bg-[#4fd1c5] text-[#06142e] font-extrabold px-6 py-3 rounded-full text-base transition-all duration-200 hover:bg-[#8ee6dd] hover:shadow-[0_0_25px_rgba(79,209,197,0.5)] active:scale-95"
                >
                    שריינו מקום · 30 ₪
                </a>
            </header>

            {/* Hero Section */}
            <section className="max-w-[1160px] mx-auto px-6 pt-10 pb-20 flex flex-wrap gap-12 items-center">
                <div className="flex-[999_1_520px] min-w-0 flex flex-col gap-6">
                    <div className="inline-flex self-start items-center gap-2.5 bg-[rgba(79,209,197,0.12)] border border-[rgba(79,209,197,0.4)] text-[#4fd1c5] px-4 py-2 rounded-full text-[15px] font-bold">
                        <span>וובינר מעשי לאנשי כספים · 60 דקות · Zoom</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-[58px] font-black leading-[1.14] tracking-tight">
                        <span className="block">
                            <span className="text-[#4a9cf0]">Claude</span> בתוך האקסל
                        </span>
                        <span className="block">3 משימות FP&amp;A בלייב</span>
                    </h1>

                    <p className="text-lg sm:text-xl text-[#c7d3e8] leading-[1.7]">
                        תלמדו להגדיר את Claude נכון בתוך האקסל ולהפעיל אותו על ניתוח סטיות,
                        תחזית הכנסות וניתוח תרחישים – ובונוס: Skill שהופך טבלה גולמית לדוח Pivot.
                    </p>

                    <div className="flex flex-wrap gap-3 text-[17px] text-[#e3e8f2]">
                        <span className="bg-[#0f2147] border border-[#2c4f8f] px-4 py-2.5 rounded-xl font-medium">
                            יום חמישי, 29.10
                        </span>
                        <span className="bg-[#0f2147] border border-[#2c4f8f] px-4 py-2.5 rounded-xl font-medium">
                            20:00
                        </span>
                        <span className="bg-[#0f2147] border border-[#2c4f8f] px-4 py-2.5 rounded-xl font-medium">
                            3 דמואים + Skill בונוס
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-4 items-center pt-2">
                        <a
                            href={SMARTBEE_PAY_URL}
                            className="bg-[#4fd1c5] text-[#06142e] font-black px-9 py-4.5 rounded-full text-xl shadow-[0_0_40px_rgba(79,209,197,0.45)] transition-all duration-200 hover:bg-[#8ee6dd] hover:shadow-[0_0_55px_rgba(79,209,197,0.65)] hover:scale-[1.02] active:scale-95 text-center"
                        >
                            אני רוצה להצטרף – 30 ₪
                        </a>
                        <span className="text-base text-[#9fb0cc]">כולל הקלטה, מצגת, חוברת תרגילים ו-Skill</span>
                    </div>
                </div>

                <div className="flex-1 min-w-[280px] max-w-[420px] mx-auto flex justify-center">
                    <div className="relative w-full aspect-square max-h-[460px]">
                        <Image
                            src="/images/webinar/ronen-hero.jpg"
                            alt="רונן עמוס, רואה חשבון"
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 420px"
                            className="object-cover rounded-[32px] border-2 border-[#3b6cc0] shadow-[0_0_60px_rgba(74,156,240,0.35)]"
                        />
                    </div>
                </div>
            </section>

            {/* Section: מכירים את זה? */}
            <section className="max-w-[1160px] mx-auto px-6 py-12 sm:py-16">
                <h2 className="text-2xl sm:text-4xl font-extrabold mb-8 text-[#f3f6fb]">
                    מכירים את זה?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="bg-[#0f2147] border border-[#f28b6c] rounded-[22px] p-7 flex flex-col transition-transform duration-200 hover:-translate-y-1">
                        <div className="text-4xl sm:text-[44px] font-black text-[#f28b6c] mb-2 leading-none">
                            שעות
                        </div>
                        <p className="text-base sm:text-lg text-[#d6e0f0] leading-relaxed">
                            על תחזיות, ניתוח סטיות ודוחות Pivot – עבודה ידנית שחוזרת כל חודש
                        </p>
                    </div>
                    <div className="bg-[#0f2147] border border-[#8b7cf6] rounded-[22px] p-7 flex flex-col transition-transform duration-200 hover:-translate-y-1">
                        <div className="text-4xl sm:text-[44px] font-black text-[#8b7cf6] mb-2 leading-none">
                            ?
                        </div>
                        <p className="text-base sm:text-lg text-[#d6e0f0] leading-relaxed">
                            לא בטוחים שאפשר לסמוך על AI עם מספרים – ומה הוא עושה לנוסחאות שלכם
                        </p>
                    </div>
                    <div className="bg-[#0f2147] border border-[#f2c94c] rounded-[22px] p-7 flex flex-col transition-transform duration-200 hover:-translate-y-1">
                        <div className="text-4xl sm:text-[44px] font-black text-[#f2c94c] mb-2 leading-none">
                            0
                        </div>
                        <p className="text-base sm:text-lg text-[#d6e0f0] leading-relaxed">
                            שיטה מסודרת להפעיל את Claude בתוך האקסל, בלי לנחש מה לכתוב לו
                        </p>
                    </div>
                </div>
            </section>

            {/* Section: מה נעשה ביחד */}
            <section className="max-w-[1160px] mx-auto px-6 py-12 sm:py-16">
                <h2 className="text-2xl sm:text-4xl font-extrabold mb-2.5 text-[#f3f6fb]">
                    מה נעשה ביחד
                </h2>
                <p className="text-base sm:text-lg text-[#9fb0cc] mb-8">
                    קודם מגדירים את Claude נכון – ואז שלוש משימות FP&amp;A בלייב, ובונוס Skill
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="bg-[rgba(15,33,71,0.9)] border-2 border-[#4a9cf0] rounded-[24px] p-8 flex flex-col gap-3 shadow-[0_4px_24px_rgba(74,156,240,0.15)] transition-transform duration-200 hover:-translate-y-1">
                        <div className="text-[15px] font-extrabold text-[#4a9cf0]">
                            דמו 1 · Budget vs Actuals
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white">
                            ניתוח סטיות תקציב מול ביצוע
                        </h3>
                        <p className="text-[16px] sm:text-[17px] leading-relaxed text-[#c7d3e8]">
                            הסטיות המרכזיות, הסבר ל-EBITDA וסימון חריגות – עם הפניה לתא בכל מספר
                        </p>
                    </div>
                    <div className="bg-[rgba(15,33,71,0.9)] border-2 border-[#4fd1c5] rounded-[24px] p-8 flex flex-col gap-3 shadow-[0_4px_24px_rgba(79,209,197,0.15)] transition-transform duration-200 hover:-translate-y-1">
                        <div className="text-[15px] font-extrabold text-[#4fd1c5]">
                            דמו 2 · Revenue Forecast
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white">
                            תחזית הכנסות ל-12 חודשים
                        </h3>
                        <p className="text-[16px] sm:text-[17px] leading-relaxed text-[#c7d3e8]">
                            תחזית מההנחות וההיסטוריה בנוסחאות חיות, ושינוי הנחה בלחיצה
                        </p>
                    </div>
                    <div className="bg-[rgba(15,33,71,0.9)] border-2 border-[#8b7cf6] rounded-[24px] p-8 flex flex-col gap-3 shadow-[0_4px_24px_rgba(139,124,246,0.15)] transition-transform duration-200 hover:-translate-y-1">
                        <div className="text-[15px] font-extrabold text-[#8b7cf6]">
                            דמו 3 · Scenario Analysis
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white">
                            ניתוח תרחישים Bear / Base / Bull
                        </h3>
                        <p className="text-[16px] sm:text-[17px] leading-relaxed text-[#c7d3e8]">
                            P&amp;L לשלושה תרחישים והשוואה מוכנה לדירקטוריון
                        </p>
                    </div>
                    <div className="bg-[rgba(15,33,71,0.9)] border-2 border-[#f2c94c] rounded-[24px] p-8 flex flex-col gap-3 shadow-[0_4px_24px_rgba(242,201,76,0.15)] transition-transform duration-200 hover:-translate-y-1">
                        <div className="text-[15px] font-extrabold text-[#f2c94c]">
                            בונוס · Pivot Report Builder Skill
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white">
                            מטבלה גולמית לדוח Pivot
                        </h3>
                        <p className="text-[16px] sm:text-[17px] leading-relaxed text-[#c7d3e8]">
                            בדיקת נתונים, Pivot שמתרענן ותובנות – מתוך Skill שתקבלו לשימוש שלכם
                        </p>
                    </div>
                </div>
            </section>

            {/* Section: מה מקבלים ולמי זה מתאים */}
            <section className="max-w-[1160px] mx-auto px-6 py-12 sm:py-16 flex flex-wrap gap-8">
                <div className="flex-[999_1_520px] min-w-0 bg-[#0b2a2c] border border-[#4fd1c5] rounded-[28px] p-8 sm:p-9 shadow-[0_0_40px_rgba(79,209,197,0.12)]">
                    <h2 className="text-2xl sm:text-3xl font-extrabold mb-5 text-[#4fd1c5]">
                        מה מקבלים במייל אחרי הוובינר
                    </h2>
                    <ul className="space-y-3 pr-5 text-lg sm:text-[19px] text-[#e3e8f2] list-disc marker:text-[#4fd1c5] leading-relaxed">
                        <li>הקלטה מלאה לצפייה חוזרת</li>
                        <li>המצגת</li>
                        <li>חוברת תרגילים ב-Excel עם כל הדוגמאות והפרומפטים</li>
                        <li>Skill: Pivot Report Builder</li>
                    </ul>
                </div>

                <div className="flex-1 min-w-[280px] bg-[#0f2147] border border-[#2c4f8f] rounded-[28px] p-8 sm:p-9 flex flex-col justify-center">
                    <h2 className="text-2xl sm:text-3xl font-extrabold mb-5 text-[#f3f6fb]">
                        למי זה מתאים
                    </h2>
                    <p className="text-lg sm:text-[19px] text-[#c7d3e8] leading-[1.85]">
                        CFO, קונטרולרים, אנשי FP&amp;A ואנליסטים שעובדים באקסל כל יום – גם בלי רקע טכנולוגי.
                    </p>
                </div>
            </section>

            {/* Section: מי מעביר */}
            <section className="max-w-[1160px] mx-auto px-6 py-12 sm:py-16">
                <div className="flex flex-wrap gap-8 items-center bg-[rgba(15,33,71,0.7)] border-2 border-[#3b6cc0] rounded-[32px] p-8 sm:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
                    <div className="relative w-36 h-36 sm:w-40 sm:h-40 shrink-0 mx-auto sm:mx-0">
                        <Image
                            src="/images/webinar/ronen-headshot.jpg"
                            alt="רונן עמוס"
                            fill
                            sizes="160px"
                            className="object-cover object-top rounded-full border-4 border-[#4a9cf0] shadow-[0_0_30px_rgba(74,156,240,0.4)]"
                        />
                    </div>
                    <div className="flex-[999_1_400px] min-w-0 text-center sm:text-right">
                        <div className="text-base text-[#4fd1c5] font-bold">מי מעביר</div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold my-2 text-white">
                            רונן עמוס, CPA
                        </h2>
                        <p className="text-base sm:text-lg text-[#c7d3e8] leading-[1.7]">
                            רואה חשבון עם יותר מ-10 שנות ניסיון בעולם הפיננסי. מלווה מחלקות כספים בהטמעת AI ומנהל קהילה של יותר מ-1,000 אנשי כספים.
                        </p>
                    </div>
                </div>
            </section>

            {/* Section: שאלות נפוצות */}
            <section className="max-w-[1160px] mx-auto px-6 py-12 sm:py-16">
                <h2 className="text-2xl sm:text-4xl font-extrabold mb-6 text-[#f3f6fb]">
                    שאלות נפוצות
                </h2>
                <div className="flex flex-col gap-3.5">
                    <div className="bg-[#0f2147] border border-[#1e3a75] rounded-[18px] p-6">
                        <h3 className="text-lg sm:text-xl font-bold mb-2 text-white">
                            צריך מנוי בתשלום ל-Claude?
                        </h3>
                        <p className="text-base sm:text-[17px] text-[#c7d3e8] leading-relaxed">
                            כדי לתרגל בעצמכם – כן: Claude in Excel זמין במנויי Pro, Max, Team ו-Enterprise. אפשר גם רק לצפות ולתרגל אחר כך.
                        </p>
                    </div>

                    <div className="bg-[#0f2147] border border-[#1e3a75] rounded-[18px] p-6">
                        <h3 className="text-lg sm:text-xl font-bold mb-2 text-white">
                            לא אוכל להגיע בזמן אמת
                        </h3>
                        <p className="text-base sm:text-[17px] text-[#c7d3e8] leading-relaxed">
                            כל הנרשמים מקבלים במייל את ההקלטה, המצגת, חוברת התרגילים וה-Skill.
                        </p>
                    </div>

                    <div className="bg-[#0f2147] border border-[#1e3a75] rounded-[18px] p-6">
                        <h3 className="text-lg sm:text-xl font-bold mb-2 text-white">
                            אני לא טכנולוגי – זה בשבילי?
                        </h3>
                        <p className="text-base sm:text-[17px] text-[#c7d3e8] leading-relaxed">
                            כן. הכל בשפה עסקית, צעד אחרי צעד, על קבצים מעולם הכספים.
                        </p>
                    </div>
                </div>
            </section>

            {/* Section: רישום סופי */}
            <section id="register" className="max-w-[1160px] mx-auto px-6 pt-12 pb-24">
                <div
                    className="text-center border-2 border-[#4fd1c5] rounded-[36px] py-14 px-6 sm:px-12 shadow-[0_0_60px_rgba(79,209,197,0.25)]"
                    style={{
                        background:
                            "radial-gradient(ellipse at 50% 0%, #1a4aa0 0%, #0a1f4d 70%)",
                    }}
                >
                    <h2 className="text-3xl sm:text-5xl font-black mb-3 text-white">
                        השעה הבאה שלכם שווה יותר מ-30 ₪
                    </h2>
                    <p className="text-lg sm:text-xl text-[#c7d3e8] mb-8">
                        יום חמישי, 29.10 · 20:00 · Zoom · מספר המקומות מוגבל
                    </p>
                    <a
                        href={SMARTBEE_PAY_URL}
                        className="inline-block bg-[#4fd1c5] text-[#06142e] font-black px-11 py-5 rounded-full text-xl sm:text-2xl shadow-[0_0_40px_rgba(79,209,197,0.45)] transition-all duration-200 hover:bg-[#8ee6dd] hover:shadow-[0_0_55px_rgba(79,209,197,0.65)] hover:scale-[1.03] active:scale-95"
                    >
                        שריינו מקום – 30 ₪
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-[#162a55] py-8 text-center text-sm text-[#8c9fbe]">
                <div className="max-w-[1160px] mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <span>© 2026 AI Finance Transformation · רונן עמוס, רו&quot;ח</span>
                    <div className="flex gap-6">
                        <Link href="/legal" className="hover:text-[#4fd1c5] transition-colors">
                            תנאי שימוש ופרטיות
                        </Link>
                        <Link href="/" className="hover:text-[#4fd1c5] transition-colors">
                            דף הבית
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
