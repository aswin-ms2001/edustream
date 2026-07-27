import type { AppRole } from '@/types/role';

export type InvitationDomainStatus = 'PENDING' | 'ACCEPTED' | 'REVOKED';

export interface InvitationResult {
  id: string;
  userId: string;
  email: string;
  role: AppRole;
  status: InvitationDomainStatus;
  expiresAt: string;
  emailSent?: boolean;
  message?: string;
}

export interface AcceptInvitationRequest {
  token: string;
  password: string;
}
