import type { AppRole } from '@/types/role';

export type StudentStatus = 'ACTIVE' | 'SUSPENDED';
export type AuthProvider = 'LOCAL' | 'GOOGLE';

export interface StudentSummary {
  id: string;
  name: string;
  email: string;
  role: AppRole;
  status: StudentStatus;
  isVerified: boolean;
  authProvider: AuthProvider;
  createdAt?: string;
  updatedAt?: string;
}

export interface StudentDetails {
  id: string;
  name: string;
  email: string;
  role: AppRole;
  status: StudentStatus;
  isVerified: boolean;
  authProvider: AuthProvider;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginatedStudentsData {
  items: StudentSummary[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ListStudentsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: StudentStatus;
}
