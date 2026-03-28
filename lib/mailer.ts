/**
 * Plain server-side email utility — no "use server" directive.
 * Import this directly from route handlers and server actions alike.
 * lib/actions/email.ts re-exports these as "use server" actions for client use.
 */

import { getResend, EMAIL_FROM } from "@/lib/resend";
import { buildPurchaseConfirmationEmail } from "@/lib/emails/purchase-confirmation";
import { buildWelcomeEmail } from "@/lib/emails/welcome";
import { adminNotificationEmail } from "@/lib/emails/admin-notification";
import { scheduleEmailSequence } from "@/lib/email-sequence";

interface SendPurchaseEmailParams {
    to: string;
    planName: string;
    amount: number;
    orderId: string;
}

export async function sendPurchaseEmail({ to, planName, amount, orderId }: SendPurchaseEmailParams) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ronenamoscpa.co.il";

    try {
        const { data, error } = await getResend().emails.send({
            from: EMAIL_FROM,
            to,
            subject: `אישור תשלום — ${planName} | AI Finance`,
            html: buildPurchaseConfirmationEmail({ planName, amount, orderId, siteUrl }),
        });

        if (error) {
            console.error("Resend purchase email error:", error);
            return { success: false, error: error.message };
        }

        return { success: true, id: data?.id };
    } catch (err) {
        console.error("Failed to send purchase email:", err);
        return { success: false, error: String(err) };
    }
}

interface SendWelcomeEmailParams {
    to: string;
    type: "newsletter" | "registration";
    unsubscribeUrl?: string;
}

export async function sendWelcomeEmail({ to, type, unsubscribeUrl }: SendWelcomeEmailParams) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ronenamoscpa.co.il";
    const resolvedUnsubscribeUrl = unsubscribeUrl
        || `${siteUrl}/api/newsletter/unsubscribe?email=${Buffer.from(to).toString("base64")}`;

    try {
        const { data, error } = await getResend().emails.send({
            from: EMAIL_FROM,
            to,
            subject: "ברוך הבא ל-AI Finance 🎉",
            html: buildWelcomeEmail({ type, siteUrl, unsubscribeUrl: resolvedUnsubscribeUrl }),
        });

        if (error) {
            console.error("Resend welcome email error:", error);
            return { success: false, error: error.message };
        }

        // Schedule the 3 follow-up drip emails (fire-and-forget)
        if (data?.id) {
            scheduleEmailSequence({ to, unsubscribeUrl: resolvedUnsubscribeUrl, siteUrl }).catch(
                (err) => console.error("Email sequence scheduling failed:", err)
            );
        }

        return { success: true, id: data?.id };
    } catch (err) {
        console.error("Failed to send welcome email:", err);
        return { success: false, error: String(err) };
    }
}

interface SendAdminNotificationParams {
    eventType: string;
    userEmail: string;
    details: string;
}

export async function sendAdminNotification(params: SendAdminNotificationParams): Promise<void> {
    try {
        const { error } = await getResend().emails.send({
            from: EMAIL_FROM,
            to: "ronenamos@gmail.com",
            subject: `[Admin Alert] ${params.eventType}`,
            html: adminNotificationEmail(params),
        });

        if (error) {
            console.error("Resend admin notification error:", error);
        }
    } catch (err) {
        console.error("Failed to send admin notification:", err);
    }
}
