import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Clock, Calendar as CalendarIcon, Video, Mail, ArrowRight } from "lucide-react";
import { AddToCalendar } from "@/components/webinar/AddToCalendar";

export const metadata: Metadata = {
    title: {
        absolute: "ההרשמה לוובינר התקבלה בהצלחה! | רונן עמוס, CPA",
    },
    description: "פרטי ההרשמה לוובינר Claude בתוך האקסל אושרו בהצלחה.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function WebinarThanksPage() {
    return (
        <div
            dir="rtl"
            className="min-h-screen text-[#f3f6fb] selection:bg-[#4fd1c5] selection:text-[#06142e] flex flex-col justify-between"
            style={{
                fontFamily: "var(--font-heebo), sans-serif",
                background: "linear-gradient(170deg, #0d2554 0%, #071636 40%, #030b1e 100%)",
            }}
        >
            {/* Header */}
            <header className="max-w-[1160px] w-full mx-auto px-6 py-6 flex justify-between items-center">
                <Link
                    href="/"
                    className="font-extrabold tracking-[2px] text-[15px] text-[#4fd1c5] hover:opacity-90 transition-opacity"
                >
                    AI FINANCE TRANSFORMATION
                </Link>
                <Link
                    href="/webinar-claude-excel"
                    className="text-sm text-[#9fb0cc] hover:text-[#4fd1c5] transition-colors"
                >
                    חזרה לדף הוובינר
                </Link>
            </header>

            {/* Main Thank You Card */}
            <main className="max-w-[840px] w-full mx-auto px-6 py-10 flex-1 flex items-center">
                <div className="w-full bg-[#0f2147] border-2 border-[#4fd1c5] rounded-[32px] p-8 sm:p-12 text-center shadow-[0_0_60px_rgba(79,209,197,0.2)]">
                    {/* Glowing Check Icon */}
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[rgba(79,209,197,0.12)] border border-[rgba(79,209,197,0.4)] flex items-center justify-center shadow-[0_0_30px_rgba(79,209,197,0.35)]">
                        <CheckCircle2 className="w-10 h-10 text-[#4fd1c5]" />
                    </div>

                    <div className="inline-block bg-[rgba(79,209,197,0.15)] text-[#4fd1c5] text-sm font-bold px-4 py-1.5 rounded-full mb-3">
                        אישור תשלום והרשמה
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 text-white leading-tight">
                        ההרשמה התקבלה בהצלחה!
                    </h1>

                    <p className="text-lg sm:text-xl text-[#c7d3e8] max-w-xl mx-auto mb-8 leading-relaxed">
                        מקום בוובינר שוריין עבורך. חשבונית מס ואישור הרשמה מ-SmartBee נשלחו כעת לתיבת המייל שלך.
                    </p>

                    {/* Webinar Details Card */}
                    <div className="bg-[#071636] border border-[#2c4f8f] rounded-2xl p-6 sm:p-7 mb-8 text-right">
                        <div className="text-sm font-bold text-[#4a9cf0] mb-1">
                            פרטי המפגש
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-5">
                            Claude בתוך האקסל: 3 משימות FP&amp;A בלייב
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[#e3e8f2]">
                            <div className="flex items-center gap-3 bg-[#0f2147] p-3.5 rounded-xl border border-[#1e3a75]">
                                <CalendarIcon className="w-5 h-5 text-[#4fd1c5] shrink-0" />
                                <div>
                                    <div className="text-xs text-[#9fb0cc]">תאריך</div>
                                    <div className="font-bold text-sm sm:text-base">חמישי, 29.10.2026</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 bg-[#0f2147] p-3.5 rounded-xl border border-[#1e3a75]">
                                <Clock className="w-5 h-5 text-[#f2c94c] shrink-0" />
                                <div>
                                    <div className="text-xs text-[#9fb0cc]">שעה ומשך</div>
                                    <div className="font-bold text-sm sm:text-base">20:00 (60 דק׳)</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 bg-[#0f2147] p-3.5 rounded-xl border border-[#1e3a75]">
                                <Video className="w-5 h-5 text-[#8b7cf6] shrink-0" />
                                <div>
                                    <div className="text-xs text-[#9fb0cc]">מיקום</div>
                                    <div className="font-bold text-sm sm:text-base">Zoom (מקוון)</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Notice about email & link */}
                    <div className="flex items-start gap-3.5 bg-[rgba(74,156,240,0.1)] border border-[rgba(74,156,240,0.3)] rounded-2xl p-4 sm:p-5 mb-8 text-right text-sm sm:text-base text-[#c7d3e8]">
                        <Mail className="w-6 h-6 text-[#4a9cf0] shrink-0 mt-0.5" />
                        <div>
                            <span className="font-bold text-white">קישור ההצטרפות ל-Zoom:</span> נשלח למייל שלך ויישלח שוב כתזכורת בסמוך למועד המפגש. אם אינך מוצא/ת את ההודעה, מומלץ לבדוק גם בתיקיית קידומי מכירות (Promotions) או ספאם.
                        </div>
                    </div>

                    {/* Add to Calendar Section */}
                    <div className="mb-8">
                        <div className="text-sm font-semibold text-[#9fb0cc] mb-3">
                            שריינו את המועד ביומן כדי לא לפספס:
                        </div>
                        <AddToCalendar
                            title="Claude בתוך האקסל: 3 משימות FP&A בלייב | רונן עמוס"
                            description="וובינר מעשי לאנשי כספים: Budget vs Actuals, Revenue Forecast ו-Scenario Analysis עם Claude בתוך Excel, ובונוס Skill לדוחות Pivot. קישור ההצטרפות נשלח במייל."
                            location="Zoom (פרטי הצטרפות נשלחו במייל)"
                            startDate="20261029T180000Z"
                            endDate="20261029T190000Z"
                        />
                    </div>

                    {/* Home Link */}
                    <div className="pt-4 border-t border-[#1e3a75] flex justify-center">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-[#4fd1c5] font-bold hover:text-[#8ee6dd] transition-colors"
                        >
                            <span>מעבר לאתר AI Finance Transformation</span>
                            <ArrowRight className="w-4 h-4 rotate-180" />
                        </Link>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-[#162a55] py-6 text-center text-xs text-[#8c9fbe]">
                © 2026 AI Finance Transformation · רונן עמוס, רו&quot;ח
            </footer>
        </div>
    );
}
