import type { InstitutionAdminInvitationEmailDto } from '../dto/InstitutionAdminInvitationEmailDto';

export interface IEmailService {
  sendInstitutionAdminInvitation(data: InstitutionAdminInvitationEmailDto): Promise<void>;
}
