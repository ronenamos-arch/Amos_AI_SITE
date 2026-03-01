import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY is not set — emails will not be sent");
}

export const resend = new Resend(process.env.RESEND_API_KEY);

// Change this once you verify your own domain in Resend
export const EMAIL_FROM = process.env.RESEND_FROM_EMAIL || "AI Finance <onboarding@resend.dev>";
