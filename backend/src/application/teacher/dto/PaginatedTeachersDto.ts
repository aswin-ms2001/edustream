import type { TeacherItemDto } from './TeacherItemDto';

export interface PaginatedTeachersDto {
  items: TeacherItemDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type { TeacherItemDto };
