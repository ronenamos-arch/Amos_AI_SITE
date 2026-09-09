"use client";

import { useState } from "react";
import { CourseCheckoutModal } from "./CourseCheckoutModal";

export function CourseBuyButton({
    text = "הצטרף ל-AI Finance Master — ₪599",
    className = "",
    variant = "primary"
}: {
    text?: string;
    className?: string;
    variant?: "primary" | "floating" | "hero" | "pricing";
}) {
    const [isOpen, setIsOpen] = useState(false);

    let defaultClass = "inline-block bg-gradient-to-r from-teal-500 to-royal-500 hover:scale-105 text-white font-bold py-3.5 px-8 rounded-xl text-base transition-all shadow-lg shadow-teal-500/25 cursor-pointer";
    
    if (variant === "floating") {
        defaultClass = "shadow-2xl shadow-teal-500/50 px-8 py-5 text-lg font-bold bg-gradient-to-r from-teal-500 to-royal-500 hover:scale-105 transition-transform inline-block text-white rounded-2xl cursor-pointer border border-teal-400/30";
    } else if (variant === "hero") {
        defaultClass = "inline-block bg-gradient-to-r from-teal-500 to-royal-600 hover:scale-105 text-white font-black py-4 px-10 rounded-2xl text-lg transition-all shadow-xl shadow-teal-500/30 cursor-pointer border border-teal-400/30";
    } else if (variant === "pricing") {
        defaultClass = "inline-block bg-teal-400 hover:bg-teal-300 text-space-950 font-black py-4 px-12 rounded-2xl text-lg transition-all shadow-xl shadow-teal-500/30 hover:scale-105 cursor-pointer";
    }

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className={className || defaultClass}
            >
                {text}
            </button>
            <CourseCheckoutModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}
