"use client";

import { MessageCircle, Mail, Sparkles, Users } from "lucide-react";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export function VaultCTA() {
  return (
    <section className="my-16 rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/80 to-space-950 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl shadow-black/40" dir="rtl">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" /> הישאר מעודכן
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
          קבל <span className="bg-gradient-to-l from-cyan-400 via-teal-300 to-cyan-200 bg-clip-text text-transparent">פרומפטים חדשים</span> ותובנות שבועיות
        </h2>
        <p className="text-sm sm:text-base text-slate-300">
          הצטרף למאות אנשי פיננסים ורואי חשבון שכבר מייעלים את העבודה היומיומית עם AI.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* WhatsApp Community Card */}
        <div className="flex flex-col justify-between rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-6 sm:p-8 backdrop-blur-xl hover:border-emerald-500/40 transition-all">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <MessageCircle className="w-6 h-6" />
              </div>
              <span className="flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-300">
                <Users className="w-3 h-3" /> +200 חברים
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">קהילת WhatsApp השקטה</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              טיפים יומיים, פרומפטים חדשים ועדכוני רגולציה מ-AI Finance — ללא ספאם או הודעות מיותרות.
            </p>
          </div>
          <a
            href="https://chat.whatsapp.com/CS6dgqnK45Q9XAMqScNr6R?mode=gi_t"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 text-center"
          >
            <span>הצטרף לקבוצת WhatsApp ←</span>
          </a>
        </div>

        {/* Newsletter Card */}
        <div className="flex flex-col justify-between rounded-2xl border border-cyan-500/20 bg-cyan-950/20 p-6 sm:p-8 backdrop-blur-xl hover:border-cyan-500/40 transition-all">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <Mail className="w-6 h-6" />
              </div>
              <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-xs font-bold text-cyan-300">
                מהדורה שבועית
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">הניוזלטר השבועי</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              מדריכים מעמיקים, ניתוחי שוק ושיטות עבודה חדשות ישירות לתיבת המייל שלך — פעם בשבוע.
            </p>
          </div>
          <div className="w-full">
            <NewsletterForm source="skill-vault-cta" />
          </div>
        </div>
      </div>
    </section>
  );
}
