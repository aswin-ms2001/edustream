import type { AppRole } from '@/types/role';

export type SystemAdminUserStatus = 'ACTIVE' | 'PENDING_ACTIVATION' | 'SUSPENDED';

export interface InstitutionAdmin {
  id: string;
  name: string;
  email: string;
  role: AppRole;
  status: SystemAdminUserStatus;
  createdAt?: string;
  updatedAt?: string;
  hasPendingInvitation?: boolean;
}

export interface PaginatedInstitutionAdminsData {
  items: InstitutionAdmin[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ListInstitutionAdminsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: SystemAdminUserStatus;
}

export interface InviteInstitutionAdminRequest {
  name: string;
  email: string;
}

export interface InvitationResultResponse {
  id: string;
  userId: string;
  email: string;
  role: AppRole;
  status: string;
  expiresAt: string;
  emailSent?: boolean;
  message?: string;
}
