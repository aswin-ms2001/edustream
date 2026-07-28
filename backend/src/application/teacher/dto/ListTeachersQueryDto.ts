import type { UserStatus } from '@/domain/user/enums/UserStatus';

export interface ListTeachersQueryDto {
  page?: number;
  limit?: number;
  search?: string;
  status?: UserStatus;
}
