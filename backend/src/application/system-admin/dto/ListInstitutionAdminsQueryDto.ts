import { UserStatus } from '@/domain/user/enums/UserStatus';

export interface ListInstitutionAdminsQueryDto {
  page?: number;
  limit?: number;
  search?: string;
  status?: UserStatus;
}
