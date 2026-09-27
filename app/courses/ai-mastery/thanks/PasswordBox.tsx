"use client";

import { useState } from "react";
import { KeyRound, Copy, Check } from "lucide-react";

interface PasswordBoxProps {
    password?: string;
}

export function PasswordBox({ password = "masterai2" }: PasswordBoxProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    return (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/15 via-amber-500/5 to-transparent border border-amber-500/30 text-center relative overflow-hidden shadow-lg shadow-amber-500/5">
            <div className="flex items-center justify-center gap-2 mb-2 text-amber-400">
                <KeyRound className="w-5 h-5 animate-bounce-subtle" />
                <span className="font-bold text-sm tracking-wide uppercase">סיסמת הגישה לשיעורים ב-Gamma</span>
            </div>

            <p className="text-xs sm:text-sm text-text-secondary mb-4">
                הזינו סיסמה זו בעת כניסה לשיעורים המוגנים בקישור הקורס:
            </p>

            <div className="inline-flex items-center gap-3 bg-space-950/90 border-2 border-dashed border-amber-400/60 rounded-xl px-5 py-3 shadow-inner">
                <span className="font-mono text-2xl sm:text-3xl font-black text-amber-300 tracking-widest select-all">
                    {password}
                </span>

                <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-bold rounded-lg bg-amber-400 hover:bg-amber-300 text-space-950 transition-all duration-200 active:scale-95 shadow-sm"
                    title="העתק סיסמה"
                >
                    {copied ? (
                        <>
                            <Check className="w-4 h-4 text-emerald-800" />
                            <span>הועתק!</span>
                        </>
                    ) : (
                        <>
                            <Copy className="w-4 h-4" />
                            <span>העתק</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
