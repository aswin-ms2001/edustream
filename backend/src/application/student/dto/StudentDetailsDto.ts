import type { Role } from '@/domain/user/entities/Role';
import type { UserStatus } from '@/domain/user/enums/UserStatus';

export interface StudentDetailsDto {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: UserStatus;
  isVerified: boolean;
  authProvider: 'LOCAL' | 'GOOGLE';
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}
