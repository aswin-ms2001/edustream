import { Role } from '@/domain/user/entities/Role';
import { UserStatus } from '@/domain/user/enums/UserStatus';

export interface InstitutionAdminItemDto {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: UserStatus;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  hasPendingInvitation?: boolean;
}
