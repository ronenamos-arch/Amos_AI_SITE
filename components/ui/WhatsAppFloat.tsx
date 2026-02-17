"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppFloat() {
    const phoneNumber = "972505500344"; // Correct format for international WhatsApp link
    const message = encodeURIComponent("שלום רונן, הגעתי דרך האתר ואשמח להתייעץ איתך בנוגע ל-");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-[#25D366]/40 active:scale-95 group"
            aria-label="צור קשר בוואטסאפ"
        >
            <MessageCircle className="h-7 w-7 fill-current" />

            {/* Tooltip */}
            <span className="absolute right-full mr-4 whitespace-nowrap rounded-lg bg-space-900 border border-white/10 px-3 py-1.5 text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none">
                דבר איתי בוואטסאפ
            </span>

            {/* Ping rings animation */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 -z-10" />
        </a>
    );
}
