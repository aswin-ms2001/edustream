import type { Role } from '@/domain/user/entities/Role';
import type { UserStatus } from '@/domain/user/enums/UserStatus';

export interface TeacherItemDto {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: UserStatus;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  hasPendingInvitation?: boolean;
}
