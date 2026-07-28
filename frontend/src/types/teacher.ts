import type { AppRole } from '@/types/role';

export type TeacherStatus = 'ACTIVE' | 'PENDING_ACTIVATION' | 'SUSPENDED';

export interface Teacher {
  id: string;
  name: string;
  email: string;
  role: AppRole;
  status: TeacherStatus;
  createdAt?: string;
  updatedAt?: string;
  hasPendingInvitation?: boolean;
}

export interface PaginatedTeachersData {
  items: Teacher[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ListTeachersParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: TeacherStatus;
}

export interface InviteTeacherRequest {
  name: string;
  email: string;
}
