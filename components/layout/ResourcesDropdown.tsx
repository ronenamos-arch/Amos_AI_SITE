"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { resources } from "@/lib/resources-data";

export function ResourcesDropdown() {
    const [open, setOpen] = useState(false);
    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    function openNow() {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        setOpen(true);
    }

    function closeSoon() {
        closeTimer.current = setTimeout(() => setOpen(false), 150);
    }

    return (
        <div
            className="relative"
            onMouseEnter={openNow}
            onMouseLeave={closeSoon}
        >
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-teal-400"
                aria-expanded={open}
                aria-haspopup="true"
            >
                משאבים
                <ChevronDown className="h-4 w-4" />
            </button>

            {open && (
                <div
                    className="absolute top-full right-0 mt-2 w-64 rounded-xl overflow-hidden z-50"
                    style={{
                        background: "rgba(2, 6, 23, 0.98)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(255,255,255,0.08)",
                    }}
                >
                    {resources.map((resource) => (
                        <Link
                            key={resource.slug}
                            href={`/resources/${resource.slug}`}
                            onClick={() => setOpen(false)}
                            className="flex items-center justify-between gap-2 px-4 py-3 text-sm transition-colors hover:text-teal-400 hover:bg-white/5"
                            style={{ color: "#e2e8f0" }}
                        >
                            <span>{resource.title}</span>
                            {resource.free && (
                                <span className="text-xs font-semibold text-teal-400 border border-teal-400/40 rounded-full px-2 py-0.5">
                                    חינם
                                </span>
                            )}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
