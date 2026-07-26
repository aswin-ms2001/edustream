import { Role } from '@/domain/user/entities/Role';
import type { IUserRepository } from '@/domain/user/repositories/IUserRepository';
import type { ILogger } from '@/application/port/services/ILogger';
import { NotFoundError, ValidationError } from '@/application/errors';
import type { InstitutionAdminItemDto } from '../dto/InstitutionAdminItemDto';

export class ActivateInstitutionAdmin {
  constructor(
    private userRepository: IUserRepository,
    private logger: ILogger
  ) {}

  async execute(adminUserId: string, targetUserId: string): Promise<InstitutionAdminItemDto> {
    const user = await this.userRepository.findById(targetUserId);
    if (!user) {
      throw new NotFoundError(`User with id ${targetUserId} not found.`);
    }

    if (user.role !== Role.INSTITUTION_ADMIN) {
      throw new ValidationError(`User with id ${targetUserId} is not an Institution Admin.`);
    }

    // Rich domain aggregate state transition
    user.activate();

    const updatedUser = await this.userRepository.update(user.id, {
      status: user.status,
      updatedAt: user.updatedAt,
    });

    this.logger.info('[SYSTEM_ADMIN_AUDIT] Action: ACTIVATE_INSTITUTION_ADMIN', {
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
