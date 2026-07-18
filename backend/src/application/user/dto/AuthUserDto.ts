import type { Role } from '@/domain/user/entities/Role';

export interface AuthUserDto {
  id: string;
  name: string;
  email: string;
  role: Role;
}
