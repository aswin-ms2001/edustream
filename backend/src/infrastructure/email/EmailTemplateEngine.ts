import { renderBaseLayout } from './templates/baseLayout';
import { buildInstitutionAdminInvitationTemplate } from './templates/institutionAdminInvitation';
import type { InstitutionAdminInvitationEmailDto } from '@/application/email';

export class EmailTemplateEngine {
  static renderInstitutionAdminInvitation(data: InstitutionAdminInvitationEmailDto): { subject: string; html: string } {
    const { subject, innerHtml } = buildInstitutionAdminInvitationTemplate(data);
    const html = renderBaseLayout(innerHtml);
    return { subject, html };
  }
}
