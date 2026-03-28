/**
 * Email drip sequence scheduler.
 * Schedules 3 follow-up emails (Day +3, +7, +14) using Resend's scheduledAt.
 * No "use server" — import directly from route handlers and mailer.ts.
 */

import { getResend, EMAIL_FROM } from "@/lib/resend";
import { buildDripDay3Email } from "@/lib/emails/drip-day3";
import { buildDripDay7Email } from "@/lib/emails/drip-day7";
import { buildDripDay14Email } from "@/lib/emails/drip-day14";

interface ScheduleSequenceParams {
    to: string;
    unsubscribeUrl: string;
    siteUrl: string;
}

function daysFromNow(days: number): string {
    return new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
}

export async function scheduleEmailSequence({ to, unsubscribeUrl, siteUrl }: ScheduleSequenceParams): Promise<void> {
    const resend = getResend();

    const emails = [
        {
            subject: "3 פרומפטים שישנו את העבודה שלך עכשיו 🤖",
            html: buildDripDay3Email({ siteUrl, unsubscribeUrl }),
            scheduledAt: daysFromNow(3),
        },
        {
            subject: "איך רואי חשבון בישראל משתמשים ב-AI בפועל",
            html: buildDripDay7Email({ siteUrl, unsubscribeUrl }),
            scheduledAt: daysFromNow(7),
        },
        {
            subject: "15% הנחה על הקורסים — נשאר לך עוד 48 שעות",
            html: buildDripDay14Email({ siteUrl, unsubscribeUrl }),
            scheduledAt: daysFromNow(14),
        },
    ];

    const results = await Promise.allSettled(
        emails.map((email) =>
            resend.emails.send({
                from: EMAIL_FROM,
                to,
                subject: email.subject,
                html: email.html,
                scheduledAt: email.scheduledAt,
            })
        )
    );

    results.forEach((result, index) => {
        if (result.status === "rejected") {
            console.error(`Email sequence Day ${[3, 7, 14][index]} failed for ${to}:`, result.reason);
        } else if (result.value.error) {
            console.error(`Email sequence Day ${[3, 7, 14][index]} Resend error for ${to}:`, result.value.error);
        }
    });
}
