import type { InstitutionAdminInvitationEmailDto } from '../dto/InstitutionAdminInvitationEmailDto';
import type { TeacherInvitationEmailDto } from '../dto/TeacherInvitationEmailDto';

export interface IEmailService {
  sendInstitutionAdminInvitation(data: InstitutionAdminInvitationEmailDto): Promise<void>;
  sendTeacherInvitation(data: TeacherInvitationEmailDto): Promise<void>;
}
