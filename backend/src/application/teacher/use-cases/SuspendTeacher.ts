import { Role } from '@/domain/user/entities/Role';
import type { IUserRepository } from '@/domain/user/repositories/IUserRepository';
import type { ISessionRepository } from '@/domain/session/repositories/ISessionRepository';
import type { ITransactionManager } from '@/application/port/services/ITransactionManager';
import type { ILogger } from '@/application/port/services/ILogger';
import { NotFoundError, ValidationError } from '@/application/errors';
import type { TeacherItemDto } from '../dto/TeacherItemDto';

export class SuspendTeacher {
  constructor(
    private userRepository: IUserRepository,
    private sessionRepository: ISessionRepository,
    private transactionManager: ITransactionManager,
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
    user.suspend();

    // Database Transaction: Save suspended status + Revoke all active sessions
    await this.transactionManager.execute(async (context) => {
      await this.userRepository.update(user.id, {
        status: user.status,
        updatedAt: user.updatedAt,
      }, context);

      await this.sessionRepository.revokeAllByUserId(user.id, context);
    });

    // Post-Commit Audit Log
    this.logger.info('[INSTITUTION_ADMIN_AUDIT] Action: SUSPEND_TEACHER', {
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
