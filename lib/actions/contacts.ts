"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getResend, EMAIL_FROM } from "@/lib/resend";

async function requireAdmin() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || user.email !== "ronenamos@gmail.com") {
        throw new Error("Unauthorized");
    }
}

export async function updateContactStatus(id: string, status: "new" | "in_progress" | "closed") {
    try {
        await requireAdmin();
        const admin = createAdminClient();
        const { error } = await admin
            .from("contact_submissions")
            .update({ status })
            .eq("id", id);
        if (error) throw error;
        return { success: true };
    } catch (err: any) {
        return { success: false, error: err.message };
    }
}

export async function saveContactNotes(id: string, notes: string) {
    try {
        await requireAdmin();
        const admin = createAdminClient();
        const { error } = await admin
            .from("contact_submissions")
            .update({ notes })
            .eq("id", id);
        if (error) throw error;
        return { success: true };
    } catch (err: any) {
        return { success: false, error: err.message };
    }
}

export async function replyToContact(
    id: string,
    toEmail: string,
    toName: string,
    originalSubject: string,
    replyBody: string
) {
    try {
        await requireAdmin();

        const replySubject = originalSubject.startsWith("Re:")
            ? originalSubject
            : `Re: ${originalSubject}`;

        const html = `<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
          <tr>
            <td style="background:#0f172a;padding:24px 32px;">
              <p style="margin:0;color:#2dd4bf;font-size:20px;font-weight:bold;">AI Finance Transformation</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;color:#1e293b;font-size:15px;line-height:1.7;direction:rtl;text-align:right;">
              <p style="margin:0 0 16px;">שלום ${toName},</p>
              ${replyBody.split("\n").map(line => `<p style="margin:0 0 12px;">${line || "&nbsp;"}</p>`).join("")}
              <p style="margin:24px 0 0;padding-top:16px;border-top:1px solid #e2e8f0;color:#64748b;font-size:13px;">
                רונן עמוס, רו"ח<br/>
                AI Finance Transformation
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

        const { error } = await getResend().emails.send({
            from: EMAIL_FROM,
            to: toEmail,
            subject: replySubject,
            html,
        });

        if (error) throw error;

        const admin = createAdminClient();
        await admin
            .from("contact_submissions")
            .update({ replied_at: new Date().toISOString() })
            .eq("id", id);

        return { success: true };
    } catch (err: any) {
        return { success: false, error: err.message };
    }
}

export async function submitContactForm(data: {
    name: string;
    email: string;
    phone?: string | null;
    subject: string;
    message: string;
}) {
    try {
        const admin = createAdminClient();
        const { error: dbError } = await admin
            .from("contact_submissions")
            .insert([
                {
                    name: data.name,
                    email: data.email,
                    phone: data.phone || null,
                    subject: data.subject,
                    message: data.message,
                    status: "new",
                },
            ]);

        if (dbError) throw dbError;

        // Send admin email notification to ronenamos@gmail.com
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ronenamoscpa.co.il";
        const adminUrl = `${siteUrl}/admin/contacts`;

        const html = `<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background-color:#0a0e17;font-family:Arial,Helvetica,sans-serif;color:#e0e0e0;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0e17;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background-color:#131825;border-radius:16px;border:1px solid rgba(255,255,255,0.08);overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.5);">
          
          <!-- Header -->
          <tr>
            <td style="background:#0f172a;padding:24px 32px;border-bottom:1px solid rgba(45,212,191,0.2);text-align:right;">
              <h1 style="margin:0;font-size:20px;color:#2dd4bf;font-weight:bold;">📩 פנייה חדשה מטופס יצירת קשר באתר</h1>
              <p style="margin:6px 0 0;font-size:13px;color:#9ca3af;">התקבלה פנייה חדשה ב-ronenamoscpa.co.il</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:32px;direction:rtl;text-align:right;">
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;background-color:rgba(255,255,255,0.03);border-radius:12px;border:1px solid rgba(255,255,255,0.06);padding:16px;">
                <tr>
                  <td style="padding:8px 12px;color:#9ca3af;font-size:14px;width:120px;">👤 <strong>שם השולח:</strong></td>
                  <td style="padding:8px 12px;color:#ffffff;font-size:15px;font-weight:bold;">${data.name}</td>
                </tr>
                <tr>
                  <td style="padding:8px 12px;color:#9ca3af;font-size:14px;">📧 <strong>אימייל:</strong></td>
                  <td style="padding:8px 12px;color:#2dd4bf;font-size:15px;"><a href="mailto:${data.email}" style="color:#2dd4bf;text-decoration:none;">${data.email}</a></td>
                </tr>
                <tr>
                  <td style="padding:8px 12px;color:#9ca3af;font-size:14px;">📞 <strong>טלפון:</strong></td>
                  <td style="padding:8px 12px;color:#ffffff;font-size:15px;">${data.phone || "לא צוין"}</td>
                </tr>
                <tr>
                  <td style="padding:8px 12px;color:#9ca3af;font-size:14px;">📌 <strong>נושא:</strong></td>
                  <td style="padding:8px 12px;color:#ffffff;font-size:15px;font-weight:bold;">${data.subject}</td>
                </tr>
              </table>

              <div style="margin-bottom:28px;">
                <p style="margin:0 0 8px;font-size:14px;color:#9ca3af;font-weight:bold;">💬 תוכן ההודעה:</p>
                <div style="background:#1e293b;border-radius:8px;padding:16px;color:#f1f5f9;font-size:15px;line-height:1.7;white-space:pre-wrap;border:1px solid rgba(255,255,255,0.1);">${data.message}</div>
              </div>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding:12px 0;">
                    <a href="${adminUrl}" style="background-color:#2dd4bf;color:#0a0e17;font-weight:bold;font-size:15px;padding:12px 28px;border-radius:8px;text-decoration:none;display:inline-block;">
                      מעבר לניהול פניות בדשבורד &larr;
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px;text-align:center;border-top:1px solid rgba(255,255,255,0.06);background:#0f172a;">
              <p style="margin:0;font-size:12px;color:#64748b;">AI Finance Transformation &bull; Ronen Amos CPA</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

        await getResend().emails.send({
            from: EMAIL_FROM,
            to: "ronenamos@gmail.com",
            replyTo: data.email,
            subject: `[פנייה חדשה באתר] ${data.subject} - ${data.name}`,
            html,
        }).catch((err) => {
            console.error("Failed to send contact admin email alert:", err);
        });

        return { success: true };
    } catch (err: any) {
        console.error("submitContactForm error:", err);
        return { success: false, error: err.message };
    }
}
