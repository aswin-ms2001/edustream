import { Role } from '@/domain/user/entities/Role';
import type { IUserRepository } from '@/domain/user/repositories/IUserRepository';
import type { ILogger } from '@/application/port/services/ILogger';
import { NotFoundError, ValidationError } from '@/application/errors';
import type { UpdateInstitutionAdminNameDto } from '../dto/UpdateInstitutionAdminNameDto';
import type { InstitutionAdminItemDto } from '../dto/InstitutionAdminItemDto';

export class UpdateInstitutionAdminName {
  constructor(
    private userRepository: IUserRepository,
    private logger: ILogger
  ) {}

  async execute(adminUserId: string, dto: UpdateInstitutionAdminNameDto): Promise<InstitutionAdminItemDto> {
    const user = await this.userRepository.findById(dto.userId);
    if (!user) {
      throw new NotFoundError(`User with id ${dto.userId} not found.`);
    }

    if (user.role !== Role.INSTITUTION_ADMIN) {
      throw new ValidationError(`User with id ${dto.userId} is not an Institution Admin.`);
    }

    // Rich domain aggregate state transition with early return optimization
    user.changeName(dto.name);

    const updatedUser = await this.userRepository.update(user.id, {
      name: user.name,
      updatedAt: user.updatedAt,
    });

    this.logger.info('[SYSTEM_ADMIN_AUDIT] Action: UPDATE_INSTITUTION_ADMIN_NAME', {
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
