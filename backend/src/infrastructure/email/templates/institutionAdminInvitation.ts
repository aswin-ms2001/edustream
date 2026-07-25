import type { InstitutionAdminInvitationEmailDto } from '@/application/email';

export function buildInstitutionAdminInvitationTemplate(data: InstitutionAdminInvitationEmailDto): { subject: string; innerHtml: string } {
  const subject = `Invitation to manage ${data.institutionName} on EduStream`;
  const innerHtml = `
    <h2 style="color: #0f172a; margin-top: 0;">Welcome, ${data.recipientName}!</h2>
    <p style="color: #334155; line-height: 1.6;">
      You have been appointed as the Institution Administrator for <strong>${data.institutionName}</strong>.
    </p>
    <p style="color: #334155; line-height: 1.6;">
      Please click the button below to set up your account password. This invitation link is valid for <strong>${data.expiresInHours} hours</strong>.
    </p>
    <div style="margin: 32px 0; text-align: center;">
      <a href="${data.invitationLink}" class="button" style="color: #ffffff;">Accept Invitation & Activate Account</a>
    </div>
    <p style="color: #64748b; font-size: 14px;">
      If you did not expect this invitation, you may safely ignore this email.
    </p>
  `;
  return { subject, innerHtml };
}
