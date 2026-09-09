"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export interface FAQItem {
    q: string;
    a: string;
}

export function CourseFAQ({ faqs }: { faqs: FAQItem[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div id="faq" className="mb-32">
            <div className="mx-auto max-w-4xl">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium bg-royal-500/10 text-royal-400 border-royal-500/20 mb-4">
                        <HelpCircle className="w-4 h-4" />
                        <span>שאלות ותשובות</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70">
                        שאלות נפוצות על הקורס
                    </h2>
                    <p className="mt-4 text-lg text-text-secondary">
                        כל מה שחשוב לדעת לפני שמצטרפים ל-AI Finance Master
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={index}
                                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-royal-500/30"
                            >
                                <button
                                    onClick={() => toggle(index)}
                                    className="w-full p-6 text-right flex items-center justify-between gap-4 font-bold text-lg text-white hover:text-royal-300 transition-colors"
                                    aria-expanded={isOpen}
                                >
                                    <span>{faq.q}</span>
                                    <ChevronDown
                                        className={`w-5 h-5 text-royal-400 shrink-0 transition-transform duration-300 ${
                                            isOpen ? "rotate-180 text-teal-400" : ""
                                        }`}
                                    />
                                </button>

                                {isOpen && (
                                    <div className="px-6 pb-6 pt-0 text-text-secondary leading-relaxed border-t border-white/5 pt-4 text-base">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
