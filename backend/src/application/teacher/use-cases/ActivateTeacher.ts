import { Role } from '@/domain/user/entities/Role';
import type { IUserRepository } from '@/domain/user/repositories/IUserRepository';
import type { ILogger } from '@/application/port/services/ILogger';
import { NotFoundError, ValidationError } from '@/application/errors';
import type { TeacherItemDto } from '../dto/TeacherItemDto';

export class ActivateTeacher {
  constructor(
    private userRepository: IUserRepository,
    private logger: ILogger
  ) {}

  async execute(adminUserId: string, targetUserId: string): Promise<TeacherItemDto> {
    const user = await this.userRepository.findById(targetUserId);
    if (!user) {
      throw new NotFoundError(`Teacher with id ${targetUserId} not found.`);
    }

    if (user.role !== Role.TEACHER) {
      throw new ValidationError(`User with id ${targetUserId} is not a Teacher.`);
    }

    // Rich domain aggregate state transition
    user.activate();

    const updatedUser = await this.userRepository.update(user.id, {
      status: user.status,
      updatedAt: user.updatedAt,
    });

    this.logger.info('[INSTITUTION_ADMIN_AUDIT] Action: ACTIVATE_TEACHER', {
      adminUserId,
      targetUserId: user.id,
    });

    const finalUser = updatedUser || user;

    return {
      id: finalUser.id,
      name: finalUser.name,
      email: finalUser.email,
      role: finalUser.role,
      status: finalUser.status,
      createdAt: finalUser.createdAt,
      updatedAt: finalUser.updatedAt,
    };
  }
}
