"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { resend, EMAIL_FROM } from "@/lib/resend";

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
              <p style="margin:0;color:#2dd4bf;font-size:20px;font-weight:bold;">AI Finance — רועי עמוס רו"ח</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;color:#1e293b;font-size:15px;line-height:1.7;direction:rtl;text-align:right;">
              <p style="margin:0 0 16px;">שלום ${toName},</p>
              ${replyBody.split("\n").map(line => `<p style="margin:0 0 12px;">${line || "&nbsp;"}</p>`).join("")}
              <p style="margin:24px 0 0;padding-top:16px;border-top:1px solid #e2e8f0;color:#64748b;font-size:13px;">
                רועי עמוס, רו"ח<br/>
                AI Finance
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

        const { error } = await resend.emails.send({
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
