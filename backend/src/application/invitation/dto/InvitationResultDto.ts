import { Role } from '@/domain/user/entities/Role';
import { InvitationStatus } from '@/domain/invitation/enums/InvitationStatus';

export interface InvitationResultDto {
  id: string;
  userId: string;
  email: string;
  role: Role;
  status: InvitationStatus;
  expiresAt: Date;
  emailSent?: boolean;
  message?: string;
}
