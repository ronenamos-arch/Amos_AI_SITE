"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import type { ResourceCard } from "@/lib/resource-cards";

/** Deterministic per-card gradient angle so placeholders differ but never shuffle. */
function cardAngle(key: string) {
    let hash = 0;
    for (const ch of key) hash = (hash * 31 + ch.charCodeAt(0)) % 360;
    return hash;
}

export function ResourceCarousel({ cards }: { cards: ResourceCard[] }) {
    const trackRef = useRef<HTMLUListElement>(null);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);
    const [index, setIndex] = useState(0);

    // scrollLeft is negative in RTL on spec-compliant engines, positive on others.
    // Working in absolute distance keeps the maths identical in both.
    const syncEdges = useCallback(() => {
        const el = trackRef.current;
        if (!el) return;
        const distance = Math.abs(el.scrollLeft);
        const max = el.scrollWidth - el.clientWidth;
        setAtStart(distance < 8);
        setAtEnd(distance > max - 8);
        const step = el.scrollWidth / Math.max(cards.length, 1);
        setIndex(Math.min(cards.length - 1, Math.round(distance / step)));
    }, [cards.length]);

    useEffect(() => {
        const el = trackRef.current;
        if (!el) return;
        syncEdges();
        el.addEventListener("scroll", syncEdges, { passive: true });
        window.addEventListener("resize", syncEdges);
        return () => {
            el.removeEventListener("scroll", syncEdges);
            window.removeEventListener("resize", syncEdges);
        };
    }, [syncEdges]);

    const page = (direction: 1 | -1) => {
        const el = trackRef.current;
        if (!el) return;
        const card = el.querySelector("li");
        const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
        // In RTL the visual "next" direction is decreasing scrollLeft.
        el.scrollBy({ left: -direction * step, behavior: "smooth" });
    };

    const scrollToCard = (i: number) => {
        const el = trackRef.current;
        if (!el) return;
        const card = el.querySelectorAll("li")[i] as HTMLElement | undefined;
        card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    };

    /** Pointer-tracked spotlight — the card lights where the cursor is. */
    const trackSpotlight = (e: React.PointerEvent<HTMLAnchorElement>) => {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--px", `${((e.clientX - rect.left) / rect.width) * 100}%`);
        el.style.setProperty("--py", `${((e.clientY - rect.top) / rect.height) * 100}%`);
    };

    return (
        <div className="rv2-carousel">
            <ul ref={trackRef} className="rv2-carousel-track" tabIndex={-1}>
                {cards.map((card, i) => (
                    <li key={card.href}>
                        <Link
                            href={card.href}
                            className="rv2-carousel-card"
                            onPointerMove={trackSpotlight}
                        >
                            <span className="rv2-carousel-media">
                                {card.image ? (
                                    <Image
                                        src={card.image}
                                        alt=""
                                        fill
                                        sizes="(max-width: 640px) 90vw, 420px"
                                        className="rv2-carousel-img"
                                    />
                                ) : (
                                    <span
                                        aria-hidden
                                        className="rv2-carousel-placeholder"
                                        style={
                                            {
                                                "--angle": `${cardAngle(card.href)}deg`,
                                            } as React.CSSProperties
                                        }
                                    >
                                        <span dir="ltr" className="rv2-mono">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                    </span>
                                )}
                            </span>

                            <span className="rv2-carousel-body">
                                <span className="rv2-carousel-cat">{card.category}</span>
                                <span className="rv2-carousel-title">{card.title}</span>
                                <span className="rv2-carousel-desc">{card.desc}</span>
                                <span className="rv2-carousel-more">
                                    לפרטים
                                    <ArrowLeft size={16} className="rv2-arrow" />
                                </span>
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="rv2-carousel-controls">
                <div className="rv2-carousel-dots">
                    {cards.map((card, i) => (
                        <button
                            key={card.href}
                            type="button"
                            className={`rv2-carousel-dot${i === index ? " is-active" : ""}`}
                            aria-label={`מעבר ל${card.title}`}
                            aria-current={i === index}
                            onClick={() => scrollToCard(i)}
                        />
                    ))}
                </div>

                <div className="flex gap-2">
                    <button
                        type="button"
                        className="rv2-carousel-nav"
                        aria-label="הקודם"
                        disabled={atStart}
                        onClick={() => page(-1)}
                    >
                        <ArrowRight size={18} />
                    </button>
                    <button
                        type="button"
                        className="rv2-carousel-nav"
                        aria-label="הבא"
                        disabled={atEnd}
                        onClick={() => page(1)}
                    >
                        <ArrowLeft size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
