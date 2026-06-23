import type { User } from '@/domain/user/entities/User';

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<User>;
  update(id: string, userData: Partial<User>): Promise<User | null>;
}
