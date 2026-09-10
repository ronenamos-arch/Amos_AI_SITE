"use client";

import { useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";

interface CopyBundleLinkButtonProps {
    accessToken: string;
}

export function CopyBundleLinkButton({ accessToken }: CopyBundleLinkButtonProps) {
    const [copied, setCopied] = useState(false);
    const link = `https://www.ronenamoscpa.co.il/claude-bundle/access/${accessToken}`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(link);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md bg-teal-500/10 text-teal-400 hover:bg-teal-500/20 border border-teal-500/30 transition-colors"
                title="העתק קישור גישה"
            >
                {copied ? (
                    <>
                        <Check size={12} className="text-emerald-400" />
                        <span className="text-emerald-400">הועתק!</span>
                    </>
                ) : (
                    <>
                        <Copy size={12} />
                        <span>העתק קישור</span>
                    </>
                )}
            </button>
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 text-text-muted hover:text-white transition-colors"
                title="פתח קישור גישה"
            >
                <ExternalLink size={14} />
            </a>
        </div>
    );
}
