import Image from "next/image";
import { Quote } from "lucide-react";
import { testimonials } from "@/lib/testimonials";

/**
 * Social proof for the subscription page.
 *
 * Only non-placeholder entries from `lib/testimonials.ts` are rendered — any
 * placeholder row exists to prompt Ronen for more quotes and must never reach
 * the page. A single available quote renders as one featured pull-quote rather
 * than a lonely card in an empty grid.
 */
export function TestimonialsV2() {
    const real = testimonials.filter((t) => !t.placeholder);
    if (real.length === 0) return null;

    const featured = real.length === 1;

    return (
        <section className="rv2-container py-14">
            <div className="mb-8">
                <div className="rv2-kicker mb-2">מה אומרים</div>
                <h2 className="rv2-display text-3xl">אנשי כספים שכבר עובדים אחרת</h2>
            </div>

            <div className={featured ? "grid" : "grid items-start gap-5 md:grid-cols-2 lg:grid-cols-3"}>
                {real.map((t) => (
                    <figure
                        key={t.name}
                        className={`rv2-surface flex h-full flex-col bg-[rgba(15,23,42,0.7)] ${
                            featured ? "p-8 lg:p-12" : "p-7"
                        }`}
                    >
                        <Quote
                            size={featured ? 40 : 28}
                            aria-hidden
                            className="mb-4 shrink-0 text-[var(--rv2-accent-strong)] opacity-70"
                        />
                        <blockquote
                            className={`flex-1 text-[var(--rv2-text)] ${
                                featured
                                    ? "rv2-display text-xl leading-relaxed lg:text-2xl"
                                    : "leading-relaxed"
                            }`}
                        >
                            &ldquo;{t.text}&rdquo;
                        </blockquote>

                        <figcaption className="mt-6 flex items-center gap-3 border-t border-white/5 pt-4 text-sm">
                            {t.image ? (
                                <Image
                                    src={t.image}
                                    alt={t.name}
                                    width={44}
                                    height={44}
                                    className="h-11 w-11 shrink-0 rounded-full object-cover"
                                    style={{ objectPosition: "center 20%" }}
                                />
                            ) : (
                                <span
                                    aria-hidden
                                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--rv2-border)] bg-[var(--rv2-tint)] text-sm font-bold text-[var(--rv2-accent-strong)]"
                                >
                                    {t.name
                                        .split(" ")
                                        .map((w) => w[0])
                                        .slice(0, 2)
                                        .join("")}
                                </span>
                            )}
                            <span className="min-w-0">
                                <span className="block font-semibold text-white">{t.name}</span>
                                <span className="rv2-mono text-xs text-[var(--rv2-text-2)]">
                                    {[t.title, t.company].filter(Boolean).join(" · ")}
                                </span>
                            </span>
                        </figcaption>
                    </figure>
                ))}
            </div>
        </section>
    );
}
