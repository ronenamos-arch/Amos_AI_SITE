"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
    ArrowLeft,
    Clock,
    Code2,
    FileText,
    Gift,
    Play,
    Presentation,
    Sparkles,
    Table2,
} from "lucide-react";
import type { Lesson, MaterialKind } from "@/lib/lessons-data";

const MATERIAL_ICON: Record<MaterialKind, typeof Table2> = {
    workbook: Table2,
    prompts: FileText,
    skills: Sparkles,
    deck: Presentation,
    bonus: Gift,
    code: Code2,
    pdf: FileText,
};

/** Off-site webinar pages open in a new tab; on-site ones stay in place. */
function linkTarget(lesson: Lesson) {
    return lesson.external ? { target: "_blank", rel: "noopener noreferrer" } : {};
}

/** Deterministic per-lesson artwork — the thumbnails are not shot yet. */
function posterAngle(slug: string) {
    let hash = 0;
    for (const ch of slug) hash = (hash * 31 + ch.charCodeAt(0)) % 360;
    return hash;
}

export function LessonLibrary({ lessons, topics }: { lessons: Lesson[]; topics: string[] }) {
    const [active, setActive] = useState(topics[0]);

    const visible = useMemo(
        () => (active === topics[0] ? lessons : lessons.filter((l) => l.topic === active)),
        [active, lessons, topics],
    );

    return (
        <>
            <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="סינון לפי נושא">
                {topics.map((topic) => (
                    <button
                        key={topic}
                        type="button"
                        onClick={() => setActive(topic)}
                        aria-pressed={active === topic}
                        className={`rv2-filter ${active === topic ? "is-active" : ""}`}
                    >
                        {topic}
                    </button>
                ))}
            </div>

            {visible.length === 0 ? (
                <p className="rv2-surface p-8 text-center text-[var(--rv2-text-2)]">
                    אין עדיין שיעורים בנושא הזה. נסו קטגוריה אחרת.
                </p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {visible.map((lesson) => (
                        <article key={lesson.slug} className="rv2-lesson-card flex flex-col overflow-hidden group">
                            <div
                                className="rv2-poster"
                                style={{ "--angle": `${posterAngle(lesson.slug)}deg` } as React.CSSProperties}
                            >
                                {/* Hero art is collected per-slug under public/images/lessons. */}
                                <Image
                                    src={`/images/lessons/${lesson.slug}.png`}
                                    alt={lesson.title}
                                    fill
                                    sizes="(min-width: 1280px) 380px, (min-width: 768px) 45vw, 90vw"
                                    className="rv2-poster-img transition-transform duration-500 group-hover:scale-105"
                                />
                                <span className="rv2-poster-topic">{lesson.topic}</span>
                                <a
                                    href={lesson.href}
                                    {...linkTarget(lesson)}
                                    className="rv2-play"
                                    aria-label={`צפייה בשיעור: ${lesson.title}`}
                                >
                                    <Play size={20} fill="currentColor" />
                                </a>
                                <span className="rv2-duration">
                                    <Clock size={13} />
                                    <span dir="ltr">{lesson.minutes}</span> דק׳
                                </span>
                            </div>

                            <div className="flex flex-1 flex-col p-6">
                                <div className="rv2-mono text-xs font-semibold text-amber-300/90">
                                    {lesson.context}
                                </div>
                                <h2 className="mt-2 text-lg font-bold leading-snug text-white group-hover:text-amber-200 transition-colors duration-200">
                                    {lesson.title}
                                </h2>
                                <p className="mt-2 flex-1 text-sm text-[var(--rv2-text-2)] leading-relaxed">
                                    {lesson.description}
                                </p>

                                <ul className="rv2-divider mt-5 flex flex-wrap gap-x-4 gap-y-2 pt-4 text-xs text-[var(--rv2-text-2)] border-t border-amber-400/15">
                                    {lesson.materials.map((m) => {
                                        const Icon = MATERIAL_ICON[m.kind];
                                        return (
                                            <li key={m.label} className="flex items-center gap-1.5">
                                                <Icon size={14} className="text-amber-400" />
                                                <span>{m.label}</span>
                                            </li>
                                        );
                                    })}
                                </ul>

                                <div className="mt-5 flex items-center justify-between gap-4">
                                    <a
                                        href={lesson.href}
                                        {...linkTarget(lesson)}
                                        className="rv2-btn rv2-btn-primary text-sm shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                                    >
                                        לדף הוובינר
                                        <ArrowLeft size={16} className="rv2-arrow" />
                                    </a>
                                    <div className="flex gap-4 text-sm">
                                        <a
                                            href={lesson.href}
                                            {...linkTarget(lesson)}
                                            className="rv2-link underline-offset-4 hover:underline"
                                        >
                                            קבצים
                                        </a>
                                        <a
                                            href={lesson.href}
                                            {...linkTarget(lesson)}
                                            className="rv2-link underline-offset-4 hover:underline"
                                        >
                                            פרומפטים
                                        </a>
                                    </div>
                                </div>

                                <p className="mt-3 flex items-center gap-1.5 text-xs text-[var(--rv2-text-2)]">
                                    <Play size={11} fill="currentColor" className="shrink-0" />
                                    ההקלטה המלאה בתחתית דף הוובינר
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </>
    );
}
