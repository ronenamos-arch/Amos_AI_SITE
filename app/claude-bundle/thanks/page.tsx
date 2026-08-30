/**
 * Bundle purchase thank-you page.
 * Shows confirmation message and links to the access page.
 */
import { CheckCircle2, Mail, ArrowLeft } from "lucide-react";

export default async function BundleThanksPage({
    searchParams,
}: {
    searchParams: Promise<{ token?: string }>;
}) {
    const params = await searchParams;
    const token = params.token;

    return (
        <section className="rv2-container flex min-h-[80dvh] items-center justify-center py-20">
            <div className="rv2-surface rv2-glow-card mx-auto max-w-lg p-10 text-center lg:p-14">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--rv2-accent)]/10 border border-[var(--rv2-accent)]/30">
                    <CheckCircle2
                        size={40}
                        className="text-[var(--rv2-accent)]"
                    />
                </div>

                <h1 className="rv2-display text-3xl">תודה על הרכישה! 🎉</h1>

                <p className="mt-4 text-[var(--rv2-text-2)]">
                    הגישה לחמשת הוובינרים נפתחה. שלחנו לכם מייל עם קישור
                    אישי לצפייה — בדקו את תיבת הדואר.
                </p>

                <div className="rv2-surface mt-6 flex items-center gap-3 p-4 text-right text-sm">
                    <Mail size={20} className="shrink-0 text-[var(--rv2-accent)]" />
                    <span className="text-[var(--rv2-text-2)]">
                        לא קיבלתם? בדקו בתיקיית הספאם, או צרו קשר ב-
                        <a
                            href="mailto:ronenamos@gmail.com"
                            className="rv2-link"
                        >
                            ronenamos@gmail.com
                        </a>
                    </span>
                </div>

                {token && (
                    <a
                        href={`/claude-bundle/access/${token}`}
                        className="rv2-btn rv2-btn-primary mt-8 px-8 py-3"
                    >
                        כניסה לוובינרים
                        <ArrowLeft size={16} className="rv2-arrow" />
                    </a>
                )}

                <p className="mt-6 text-xs text-[var(--rv2-text-2)]">
                    שמרו את הקישור — הוא שלכם לצמיתות.
                </p>
            </div>
        </section>
    );
}
