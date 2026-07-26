import { Role } from '@/domain/user/entities/Role';
import type { IUserRepository } from '@/domain/user/repositories/IUserRepository';
import type { ISessionRepository } from '@/domain/session/repositories/ISessionRepository';
import type { ITransactionManager } from '@/application/port/services/ITransactionManager';
import type { ILogger } from '@/application/port/services/ILogger';
import { NotFoundError, ValidationError } from '@/application/errors';
import type { InstitutionAdminItemDto } from '../dto/InstitutionAdminItemDto';

export class SuspendInstitutionAdmin {
  constructor(
    private userRepository: IUserRepository,
    private sessionRepository: ISessionRepository,
    private transactionManager: ITransactionManager,
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
    user.suspend();

    // Database Transaction: Save suspended status + Revoke all active sessions
    await this.transactionManager.execute(async (context) => {
      await this.userRepository.update(user.id, {
        status: user.status,
        updatedAt: user.updatedAt,
      }, context);

      await this.sessionRepository.revokeAllByUserId(user.id, context);
    });

    this.logger.info('[SYSTEM_ADMIN_AUDIT] Action: SUSPEND_INSTITUTION_ADMIN', {
      adminUserId,
      targetUserId: user.id,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
