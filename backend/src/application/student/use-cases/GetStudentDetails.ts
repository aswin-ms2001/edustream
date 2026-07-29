import { Role } from '@/domain/user/entities/Role';
import type { IUserRepository } from '@/domain/user/repositories/IUserRepository';
import { NotFoundError } from '@/application/errors';
import type { StudentDetailsDto } from '../dto/StudentDetailsDto';

export class GetStudentDetails {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string): Promise<StudentDetailsDto> {
    const user = await this.userRepository.findById(userId);
    if (!user || user.role !== Role.STUDENT) {
      throw new NotFoundError(`Student with id ${userId} not found.`);
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      isVerified: user.isVerified,
      authProvider: user.googleId ? 'GOOGLE' : 'LOCAL',
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
