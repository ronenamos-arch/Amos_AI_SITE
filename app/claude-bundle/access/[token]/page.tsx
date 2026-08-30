/**
 * Token-gated member access page for the Claude bundle.
 * Validates the access token against bundle_purchases and renders the 5-chapter hub.
 */

import { notFound } from "next/navigation";
import Image from "next/image";
import { createAdminClient } from "@/lib/supabase-admin";
import {
    bundleChapters,
    bundleConfig,
    totalBundleMinutes,
} from "@/lib/bundle-data";
import {
    Clock,
    Play,
    FileText,
    Sparkles,
    Table2,
    Presentation,
    Code2,
    ArrowLeft,
    Download,
    ExternalLink,
} from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: { absolute: "Claude לכספים — אזור צפייה אישי" },
    robots: { index: false, follow: false },
};

const MAT_ICON: Record<string, typeof Table2> = {
    workbook: Table2,
    prompts: FileText,
    skills: Sparkles,
    deck: Presentation,
    code: Code2,
};

export default async function BundleAccessPage({
    params,
}: {
    params: Promise<{ token: string }>;
}) {
    const { token } = await params;

    // Validate token
    const supabase = createAdminClient();
    const { data: purchase } = await supabase
        .from("bundle_purchases")
        .select("id, name, email, status")
        .eq("access_token", token)
        .eq("status", "paid")
        .maybeSingle();

    if (!purchase) {
        notFound();
    }

    const hours = Math.round(totalBundleMinutes / 60);
    const firstName = purchase.name.split(" ")[0];

    return (
        <>
            {/* Welcome header */}
            <section className="rv2-container py-16 lg:py-20">
                <div className="rv2-rise max-w-3xl">
                    <div className="rv2-kicker mb-4">
                        👋 שלום {firstName}
                    </div>
                    <h1 className="rv2-display text-3xl sm:text-4xl lg:text-5xl">
                        {bundleConfig.name}
                    </h1>
                    <p className="mt-4 text-[var(--rv2-text-2)]">
                        {hours} שעות של וובינרים מוקלטים, עם כל החומרים להורדה.
                        בחרו פרק והתחילו לצפות.
                    </p>
                </div>
            </section>

            {/* Chapter cards */}
            <section className="rv2-container pb-20">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {bundleChapters.map((ch) => (
                        <article
                            key={ch.slug}
                            className="rv2-surface rv2-surface-hover flex flex-col overflow-hidden"
                        >
                            {/* Poster gradient header with image */}
                            <div
                                className="relative flex items-end p-5"
                                style={{
                                    minHeight: "120px",
                                    background: `linear-gradient(135deg, hsl(${180 + ch.chapterNumber * 55} 70% 14%) 0%, hsl(${190 + ch.chapterNumber * 55} 60% 8%) 100%)`,
                                }}
                            >
                                {ch.imageUrl && (
                                    <div className="absolute inset-0 z-0 opacity-70">
                                        <Image
                                            src={ch.imageUrl}
                                            alt={ch.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-0" />
                                <span className="rv2-mono relative z-10 text-5xl font-black text-white/70 drop-shadow-lg">
                                    {ch.chapterNumber}
                                </span>
                                <span className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-[var(--rv2-accent-strong)] backdrop-blur-sm">
                                    <Clock size={12} />
                                    <span dir="ltr">{ch.minutes}</span> דק׳
                                </span>
                            </div>

                            <div className="flex flex-1 flex-col p-6">
                                <div className="rv2-kicker mb-1 text-xs">
                                    פרק {ch.chapterNumber} · {ch.date}
                                </div>
                                <h2 className="mt-1 text-lg font-bold leading-snug">
                                    {ch.title}
                                </h2>
                                <p className="mt-2 flex-1 text-sm text-[var(--rv2-text-2)]">
                                    {ch.description}
                                </p>

                                {/* Materials */}
                                <ul className="rv2-divider mt-4 flex flex-wrap gap-x-4 gap-y-2 pt-4 text-xs text-[var(--rv2-text-2)]">
                                    {ch.materials.map((m) => {
                                        const Icon = MAT_ICON[m.kind] || FileText;
                                        return (
                                            <li
                                                key={m.label}
                                                className="flex items-center gap-1.5"
                                            >
                                                <Icon
                                                    size={14}
                                                    className="text-[var(--rv2-accent)]"
                                                />
                                                {m.label}
                                            </li>
                                        );
                                    })}
                                </ul>

                                {/* CTA */}
                                <a
                                    href={ch.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rv2-btn rv2-btn-primary mt-5 text-sm"
                                >
                                    <Play size={16} fill="currentColor" />
                                    צפייה + חומרים
                                    <ExternalLink size={14} />
                                </a>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Help */}
                <div className="rv2-surface mt-10 flex flex-col items-center gap-4 p-8 text-center sm:flex-row sm:text-right">
                    <div className="flex-1">
                        <p className="text-sm font-bold">צריכים עזרה?</p>
                        <p className="text-sm text-[var(--rv2-text-2)]">
                            שלחו מייל ל-
                            <a href="mailto:ronenamos@gmail.com" className="rv2-link">
                                ronenamos@gmail.com
                            </a>
                            {" "}או WhatsApp ל-
                            <a href="https://wa.me/972505500344" className="rv2-link">
                                050-5500344
                            </a>
                        </p>
                    </div>
                    <p className="text-xs text-[var(--rv2-text-2)]">
                        שמרו את הקישור לדף הזה — הגישה שלכם לצמיתות.
                    </p>
                </div>
            </section>

        </>
    );
}
