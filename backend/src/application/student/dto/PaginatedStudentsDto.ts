import type { StudentSummaryDto } from './StudentSummaryDto';

export interface PaginatedStudentsDto {
  items: StudentSummaryDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type { StudentSummaryDto };
