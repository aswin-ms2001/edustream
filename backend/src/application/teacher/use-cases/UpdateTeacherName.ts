import { Role } from '@/domain/user/entities/Role';
import type { IUserRepository } from '@/domain/user/repositories/IUserRepository';
import type { ILogger } from '@/application/port/services/ILogger';
import { NotFoundError, ValidationError } from '@/application/errors';
import type { UpdateTeacherNameDto } from '../dto/UpdateTeacherNameDto';
import type { TeacherItemDto } from '../dto/TeacherItemDto';

export class UpdateTeacherName {
  constructor(
    private userRepository: IUserRepository,
    private logger: ILogger
  ) {}

  async execute(adminUserId: string, dto: UpdateTeacherNameDto): Promise<TeacherItemDto> {
    const user = await this.userRepository.findById(dto.userId);
    if (!user) {
      throw new NotFoundError(`Teacher with id ${dto.userId} not found.`);
    }

    if (user.role !== Role.TEACHER) {
      throw new ValidationError(`User with id ${dto.userId} is not a Teacher.`);
    }

    // Rich domain aggregate state transition
    user.changeName(dto.name);

    const updatedUser = await this.userRepository.update(user.id, {
      name: user.name,
      updatedAt: user.updatedAt,
    });

    this.logger.info('[INSTITUTION_ADMIN_AUDIT] Action: UPDATE_TEACHER_NAME', {
      adminUserId,
      targetUserId: user.id,
      newName: user.name,
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
