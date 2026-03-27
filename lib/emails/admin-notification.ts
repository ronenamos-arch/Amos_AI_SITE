interface AdminNotificationParams {
    eventType: string;
    userEmail: string;
    details: string;
}

export function adminNotificationEmail({ eventType, userEmail, details }: AdminNotificationParams): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#0a0e17;font-family:Arial,Helvetica,sans-serif;color:#e0e0e0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0e17;padding:40px 20px;">
        <tr>
            <td align="center">
                <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background-color:#131825;border-radius:16px;border:1px solid rgba(255,255,255,0.06);overflow:hidden;">

                    <!-- Header -->
                    <tr>
                        <td style="padding:32px 40px 24px;text-align:center;border-bottom:1px solid rgba(45,212,191,0.2);">
                            <h1 style="margin:0;font-size:24px;color:#2dd4bf;font-weight:bold;letter-spacing:1px;">&#x1F514; ${eventType}</h1>
                            <p style="margin:8px 0 0;font-size:13px;color:#9ca3af;">ronenamoscpa.co.il admin alert</p>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding:40px;">

                            <!-- User Email -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:rgba(45,212,191,0.05);border-radius:12px;border:1px solid rgba(45,212,191,0.15);margin-bottom:28px;">
                                <tr>
                                    <td style="padding:20px;">
                                        <p style="margin:0 0 6px;font-size:12px;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">User</p>
                                        <p style="margin:0;font-size:16px;color:#ffffff;font-weight:bold;">${userEmail}</p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Details Block -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:rgba(255,255,255,0.02);border-radius:12px;border:1px solid rgba(255,255,255,0.06);margin-bottom:28px;">
                                <tr>
                                    <td style="padding:20px;">
                                        <p style="margin:0 0 12px;font-size:12px;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">Details</p>
                                        <pre style="margin:0;font-size:13px;color:#d1d5db;font-family:monospace;white-space:pre-wrap;word-break:break-word;line-height:1.7;">${details}</pre>
                                    </td>
                                </tr>
                            </table>

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding:24px 40px;text-align:center;border-top:1px solid rgba(255,255,255,0.06);">
                            <p style="margin:0;font-size:13px;color:#9ca3af;font-weight:bold;">
                                AI Finance Transformation
                            </p>
                            <p style="margin:4px 0 0;font-size:12px;color:#6b7280;">
                                ronenamoscpa.co.il admin alert
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>`.trim();
}
