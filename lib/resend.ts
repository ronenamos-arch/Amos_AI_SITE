import { Resend } from "resend";

let _resend: Resend | null = null;

export function getResend(): Resend {
    if (!_resend) {
        if (!process.env.RESEND_API_KEY) {
            console.warn("RESEND_API_KEY is not set — emails will not be sent");
        }
        _resend = new Resend(process.env.RESEND_API_KEY);
    }
    return _resend;
}

// Change this once you verify your own domain in Resend
export const EMAIL_FROM = process.env.RESEND_FROM_EMAIL || "AI Finance <onboarding@resend.dev>";

// Sync a subscriber to Resend Contacts/Audience.
// Set unsubscribed=true to mark them as opted out.
// No-op if RESEND_AUDIENCE_ID is not configured.
export async function syncToResendAudience(email: string, unsubscribed: boolean): Promise<void> {
    const audienceId = process.env.RESEND_AUDIENCE_ID;
    if (!audienceId) return;

    const resend = getResend();
    await resend.contacts.create({ audienceId, email, unsubscribed });
}
