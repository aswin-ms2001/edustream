import type { TeacherInvitationEmailDto } from '@/application/email/dto/TeacherInvitationEmailDto';

export interface EmailRenderResult {
  subject: string;
  html: string;
  text: string;
}

export function renderTeacherInvitationEmail(data: TeacherInvitationEmailDto): EmailRenderResult {
  const subject = `You've been invited as a Teacher on EduStream`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; }
          .header { background-color: #0f172a; color: #ffffff; padding: 24px; text-align: center; border-radius: 6px 6px 0 0; }
          .content { padding: 24px; background-color: #ffffff; }
          .button { display: inline-block; padding: 12px 24px; background-color: #2563eb; color: #ffffff !important; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
          .footer { text-align: center; padding: 16px; font-size: 12px; color: #64748b; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>EduStream Learning Platform</h2>
          </div>
          <div class="content">
            <p>Hello <strong>${data.recipientName}</strong>,</p>
            <p>You have been invited to join <strong>EduStream</strong> as a <strong>Teacher</strong>.</p>
            <p>Please click the button below to accept your invitation and create your password:</p>
            <div style="text-align: center;">
              <a href="${data.invitationLink}" class="button" target="_blank">Accept Teacher Invitation</a>
            </div>
            <p>This invitation link will expire in <strong>${data.expiresInHours} hours</strong>.</p>
            <p>If you did not expect this invitation, please ignore this email.</p>
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} EduStream. All rights reserved.
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `Hello ${data.recipientName},\n\nYou have been invited to join EduStream as a Teacher.\n\nPlease accept your invitation by visiting the following link:\n${data.invitationLink}\n\nThis link will expire in ${data.expiresInHours} hours.`;

  return { subject, html, text };
}
