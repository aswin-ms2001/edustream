import type { InstitutionAdminItemDto } from './InstitutionAdminItemDto';

export interface PaginatedInstitutionAdminsDto {
  items: InstitutionAdminItemDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type { InstitutionAdminItemDto };
