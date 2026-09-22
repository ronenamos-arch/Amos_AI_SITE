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
                    className="absolute top-full right-0 mt-2 w-64 rounded-xl overflow-hidden z-50 shadow-2xl"
                    style={{
                        background: "#080D1A",
                        border: "1px solid rgba(255, 255, 255, 0.16)",
                        boxShadow: "0 20px 40px -10px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.08)",
                    }}
                >
                    <div className="py-1">
                        {resources.map((resource) => (
                            <Link
                                key={resource.slug}
                                href={`/resources/${resource.slug}`}
                                onClick={() => setOpen(false)}
                                className="block px-4 py-3 text-sm font-medium transition-colors hover:text-cyan-300 hover:bg-slate-800/80"
                                style={{ color: "#F1F5F9" }}
                            >
                                {resource.title}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
