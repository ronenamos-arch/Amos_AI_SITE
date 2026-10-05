import type { Metadata } from "next";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import {
  CheckCircle2,
  Crown,
  Sparkles,
  BookOpen,
  Mail,
  LogIn,
  ArrowRight,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";
import { ThanksProTracker } from "./ThanksProTracker";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "תודה על ההצטרפות ל-AI FINANCE PRO! | רונן עמוס",
  description: "תודה על הצטרפותך למנוי AI FINANCE PRO. הגישה שלך לתכנים פתוחה.",
  robots: { index: false, follow: false },
};

export default function ThanksProPage() {
  return (
    <div className="relative min-h-screen bg-space-950 text-white overflow-hidden font-primary pt-24 pb-20">
      <ThanksProTracker />

      {/* Ambient Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[45%] h-[45%] bg-teal-600/20 blur-[140px] rounded-full" />
        <div className="absolute bottom-[10%] left-[-5%] w-[40%] h-[40%] bg-royal-500/15 blur-[130px] rounded-full" />
        <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] bg-amber-500/10 blur-[150px] rounded-full" />
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <GlassCard className="p-8 sm:p-12 text-center border-t-4 border-teal-400 relative overflow-hidden bg-space-900/80 backdrop-blur-xl shadow-2xl">
          {/* Top Icon & Badge */}
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-teal-400/15 border border-teal-400/30 text-teal-400">
            <CheckCircle2 className="h-10 w-10 text-teal-400 animate-pulse" />
          </div>

          <Badge
            variant="teal"
            className="mb-4 block mx-auto w-fit px-4 py-1 text-sm tracking-wide bg-teal-500/15 text-teal-300 border-teal-500/30"
          >
            המנוי הופעל בהצלחה 🎉
          </Badge>

          <h1 className="text-3xl sm:text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/70 leading-tight">
            תודה על הצטרפותך ל-AI FINANCE PRO!
          </h1>

          <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl mx-auto mb-8">
            התשלום עבר בהצלחה. חשבונית מס / קבלה דיגיטלית חתומה נשלחה כעת ישירות לתיבת המייל שלך מ-SmartBee.
          </p>

          {/* Email notice box */}
          <div className="mb-8 p-5 rounded-2xl bg-teal-500/10 border border-teal-500/25 text-right flex items-start gap-4">
            <Mail className="w-6 h-6 text-teal-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm sm:text-base leading-relaxed text-text-secondary">
              <strong className="text-white block mb-1">✉️ אישור התשלום וחשבונית המס נשלחו למייל:</strong>
              בדוק את תיבת הדוא״ל שלך. לא מצאת את ההודעה? בדוק גם בתיקיית הספאם (Spam) או קידומי המכירות (Promotions).
            </div>
          </div>

          {/* Step-by-Step Access Instructions */}
          <div className="text-right mb-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-400" />
              <span>איך ניגשים לכל התכנים?</span>
            </h2>

            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 flex items-start gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-400/15 text-teal-300 font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-white text-base mb-1">התחברות לאתר</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    התחבר עם אותה כתובת אימייל שהזנת בעת הרכישה ב-SmartBee (או צור חשבון חדש באותו המייל). המערכת תסנכרן את הרשאת ה-PRO שלך אוטומטית.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-white/5 border border-white/5 flex items-start gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-royal-400/15 text-royal-300 font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-white text-base mb-1">כניסה למאגר ה-Skill Vault והמדריכים</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    כל הפרומפטים לפיננסים, כלי האוטומציה, סדנאות ה-AI ומאמרי הפרימיום בבלוג פתוחים עבורך באופן מלא.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-white/5 border border-white/5 flex items-start gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-400/15 text-amber-300 font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-white text-base mb-1">תמיכה ועדכונים שוטפים</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    כל חודש מתווספים תכנים, פרומפטים ומדריכים חדשים. לכל שאלה מקצועית או טכנית — אני זמין עבורך ישירות.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 my-8">
            <Link
              href="/skill-vault"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 text-base font-bold bg-gradient-to-r from-teal-400 via-teal-500 to-royal-500 text-space-950 rounded-xl shadow-lg shadow-teal-500/20 hover:shadow-teal-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Sparkles className="w-5 h-5 text-space-950" />
              <span>כניסה ל-Skill Vault</span>
            </Link>

            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 text-base font-bold bg-white/10 hover:bg-white/15 text-white border border-white/10 rounded-xl transition-all"
            >
              <LogIn className="w-5 h-5 text-teal-400" />
              <span>התחבר לחשבון</span>
            </Link>

            <Link
              href="/guides"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-4 text-base font-medium text-text-secondary hover:text-white transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              <span>לכל המדריכים</span>
            </Link>
          </div>

          {/* WhatsApp Support Box */}
          <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-right mb-8">
            <div className="flex items-center gap-3 mb-2">
              <MessageCircle className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-white text-base">צריך סיוע או שיש לך שאלה?</h3>
            </div>
            <p className="text-sm text-text-secondary mb-3 leading-relaxed">
              אני זמין בוואטסאפ לכל שאלה לגבי השימוש בכלים, גישה או ייעוץ:
            </p>
            <a
              href="https://wa.me/972505500344"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold transition-colors"
            >
              <span>פנייה ישירה לרונן ב-WhatsApp</span>
              <ArrowRight className="w-4 h-4 rotate-180" />
            </a>
          </div>

          {/* Back link */}
          <div className="pt-6 border-t border-white/10 text-sm text-text-muted">
            <Link href="/" className="text-teal-400 hover:text-teal-300 transition-colors">
              ← חזרה לאתר הראשי (ronenamoscpa.co.il)
            </Link>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
