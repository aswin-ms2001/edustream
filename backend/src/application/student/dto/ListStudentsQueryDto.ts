import type { UserStatus } from '@/domain/user/enums/UserStatus';

export interface ListStudentsQueryDto {
  page?: number;
  limit?: number;
  search?: string;
  status?: UserStatus;
}
