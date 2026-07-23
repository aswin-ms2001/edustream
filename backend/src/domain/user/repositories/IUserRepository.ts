import type { User } from '@/domain/user/entities/User';
import type { Role } from '@/domain/user/entities/Role';

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  existsByRole(role: Role): Promise<boolean>;
  save(user: User): Promise<User>;
  update(id: string, userData: Partial<User>): Promise<User | null>;
}
