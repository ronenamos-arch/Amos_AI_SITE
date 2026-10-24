"use client";

import { Calendar, Download, ExternalLink } from "lucide-react";

interface AddToCalendarProps {
    title: string;
    description: string;
    location: string;
    startDate: string; // ISO string or UTC format: 20261022T170000Z
    endDate: string;   // 20261022T180000Z
}

export function AddToCalendar({
    title,
    description,
    location,
    startDate,
    endDate,
}: AddToCalendarProps) {
    const handleDownloadICS = () => {
        const icsContent = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "PRODID:-//Ronen Amos CPA//Webinar Excel//HE",
            "CALSCALE:GREGORIAN",
            "METHOD:PUBLISH",
            "BEGIN:VEVENT",
            `SUMMARY:${title}`,
            `DESCRIPTION:${description.replace(/\n/g, "\\n")}`,
            `LOCATION:${location}`,
            `DTSTART:${startDate}`,
            `DTEND:${endDate}`,
            "STATUS:CONFIRMED",
            "SEQUENCE:0",
            "BEGIN:VALARM",
            "TRIGGER:-PT30M",
            "ACTION:DISPLAY",
            "DESCRIPTION:תזכורת: וובינר עם רונן עמוס",
            "END:VALARM",
            "END:VEVENT",
            "END:VCALENDAR",
        ].join("\r\n");

        const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute("download", "webinar-ronen-amos.ics");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
        title
    )}&dates=${startDate}/${endDate}&details=${encodeURIComponent(
        description
    )}&location=${encodeURIComponent(location)}`;

    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
            <button
                type="button"
                onClick={handleDownloadICS}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#4fd1c5] text-[#06142e] font-black px-6 py-3.5 rounded-full text-base transition-all duration-200 hover:bg-[#8ee6dd] hover:shadow-[0_0_25px_rgba(79,209,197,0.5)] active:scale-95"
            >
                <Download className="w-5 h-5" />
                <span>הורד קובץ יומן (.ics)</span>
            </button>

            <a
                href={googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#0f2147] border border-[#3b6cc0] text-[#f3f6fb] font-bold px-6 py-3.5 rounded-full text-base transition-all duration-200 hover:bg-[#19356e] hover:border-[#4a9cf0] active:scale-95"
            >
                <Calendar className="w-5 h-5 text-[#4a9cf0]" />
                <span>הוסף ל-Google Calendar</span>
                <ExternalLink className="w-4 h-4 text-[#9fb0cc]" />
            </a>
        </div>
    );
}
