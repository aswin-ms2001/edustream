import { Role } from '@/domain/user/entities/Role';
import { UserStatus } from '@/domain/user/enums/UserStatus';
import type { IUserRepository } from '@/domain/user/repositories/IUserRepository';
import type { IInvitationRepository } from '@/domain/invitation/repositories/IInvitationRepository';
import { NotFoundError, ValidationError } from '@/application/errors';
import type { TeacherItemDto } from '../dto/TeacherItemDto';

export class GetTeacherDetails {
  constructor(
    private userRepository: IUserRepository,
    private invitationRepository: IInvitationRepository
  ) {}

  async execute(userId: string): Promise<TeacherItemDto> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError(`Teacher with id ${userId} not found.`);
    }

    if (user.role !== Role.TEACHER) {
      throw new ValidationError(`User with id ${userId} is not a Teacher.`);
    }

    let hasPendingInvitation = false;
    if (user.status === UserStatus.PENDING_ACTIVATION) {
      const activeInv = await this.invitationRepository.findActiveByUserId(user.id);
      hasPendingInvitation = !!activeInv;
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      hasPendingInvitation,
    };
  }
}
