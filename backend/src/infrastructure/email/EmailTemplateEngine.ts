import { renderBaseLayout } from './templates/baseLayout';
import { buildInstitutionAdminInvitationTemplate } from './templates/institutionAdminInvitation';
import { renderTeacherInvitationEmail } from './templates/teacherInvitation';
import type { InstitutionAdminInvitationEmailDto, TeacherInvitationEmailDto } from '@/application/email';

export class EmailTemplateEngine {
  static renderInstitutionAdminInvitation(data: InstitutionAdminInvitationEmailDto): { subject: string; html: string } {
    const { subject, innerHtml } = buildInstitutionAdminInvitationTemplate(data);
    const html = renderBaseLayout(innerHtml);
    return { subject, html };
  }

  static renderTeacherInvitation(data: TeacherInvitationEmailDto): { subject: string; html: string } {
    const { subject, html } = renderTeacherInvitationEmail(data);
    return { subject, html };
  }
}
