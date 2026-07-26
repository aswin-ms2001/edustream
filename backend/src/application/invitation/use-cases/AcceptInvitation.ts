import type { IUserRepository } from '@/domain/user/repositories/IUserRepository';
import type { IInvitationRepository } from '@/domain/invitation/repositories/IInvitationRepository';
import type { ITokenHashService } from '@/application/port/services/ITokenHashService';
import type { IPasswordHasher } from '@/application/port/services/IPasswordHasher';
import type { ITransactionManager } from '@/application/port/services/ITransactionManager';
import { NotFoundError } from '@/application/errors';
import type { AcceptInvitationDto } from '../dto/AcceptInvitationDto';
import type { InvitationResultDto } from '../dto/InvitationResultDto';

export class AcceptInvitation {
  constructor(
    private userRepository: IUserRepository,
    private invitationRepository: IInvitationRepository,
    private tokenHashService: ITokenHashService,
    private passwordHasher: IPasswordHasher,
    private transactionManager: ITransactionManager
  ) {}

  async execute(dto: AcceptInvitationDto): Promise<InvitationResultDto> {
    const tokenHash = this.tokenHashService.hash(dto.token);
    const invitation = await this.invitationRepository.findByTokenHash(tokenHash);

    if (!invitation) {
      throw new NotFoundError('Invitation token not found.');
    }

    // Domain invariant check
    invitation.accept();

    const user = await this.userRepository.findById(invitation.userId);
    if (!user) {
      throw new NotFoundError(`Associated user not found.`);
    }

    const passwordHash = await this.passwordHasher.hash(dto.password);
    user.password = passwordHash;
    user.activate();

    // Database Transaction: Save accepted invitation + Save activated user with password
    await this.transactionManager.execute(async (context) => {
      await this.invitationRepository.update(invitation.id, {
        status: invitation.status,
        acceptedAt: invitation.acceptedAt,
        updatedAt: invitation.updatedAt,
      }, context);

      await this.userRepository.update(user.id, {
        password: user.password,
        status: user.status,
        updatedAt: new Date(),
      }, context);
    });

    return {
      id: invitation.id,
      userId: user.id,
      email: user.email,
      role: user.role,
      status: invitation.status,
      expiresAt: invitation.expiresAt,
      message: 'Invitation accepted successfully. You can now log in.',
    };
  }
}
