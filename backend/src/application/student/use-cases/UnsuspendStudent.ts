import { Role } from '@/domain/user/entities/Role';
import { UserStatus } from '@/domain/user/enums/UserStatus';
import type { IUserRepository } from '@/domain/user/repositories/IUserRepository';
import type { ILogger } from '@/application/port/services/ILogger';
import { NotFoundError, ValidationError } from '@/application/errors';
import type { StudentDetailsDto } from '../dto/StudentDetailsDto';

export class UnsuspendStudent {
  constructor(
    private userRepository: IUserRepository,
    private logger: ILogger
  ) {}

  async execute(adminUserId: string, targetUserId: string): Promise<StudentDetailsDto> {
    const user = await this.userRepository.findById(targetUserId);
    if (!user || user.role !== Role.STUDENT) {
      throw new NotFoundError(`Student with id ${targetUserId} not found.`);
    }

    if (user.status !== UserStatus.SUSPENDED) {
      throw new ValidationError(`Cannot unsuspend student with status ${user.status}. Account must be in SUSPENDED status.`);
    }

    // Rich domain aggregate state transition (restore ACTIVE status)
    user.activate();

    const updatedUser = await this.userRepository.update(user.id, {
      status: user.status,
      updatedAt: user.updatedAt,
    });

    // Post-Commit Audit Log
    this.logger.info('[INSTITUTION_ADMIN_AUDIT] Action: UNSUSPEND_STUDENT', {
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
      isVerified: finalUser.isVerified,
      authProvider: finalUser.googleId ? 'GOOGLE' : 'LOCAL',
      createdAt: finalUser.createdAt,
      updatedAt: finalUser.updatedAt,
    };
  }
}
