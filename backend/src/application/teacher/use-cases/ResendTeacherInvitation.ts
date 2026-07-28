import { Role } from '@/domain/user/entities/Role';
import { UserStatus } from '@/domain/user/enums/UserStatus';
import { Invitation } from '@/domain/invitation/entities/Invitation';
import type { IUserRepository } from '@/domain/user/repositories/IUserRepository';
import type { IInvitationRepository } from '@/domain/invitation/repositories/IInvitationRepository';
import type { ITokenHashService } from '@/application/port/services/ITokenHashService';
import type { IUuidGenerator } from '@/application/port/services/IUuidGenerator';
import type { ITransactionManager } from '@/application/port/services/ITransactionManager';
import type { IEmailService } from '@/application/email';
import type { ILogger } from '@/application/port/services/ILogger';
import { NotFoundError, ValidationError, EmailDeliveryError } from '@/application/errors';
import type { InvitationResultDto } from '@/application/invitation/dto/InvitationResultDto';

export class ResendTeacherInvitation {
  constructor(
    private userRepository: IUserRepository,
    private invitationRepository: IInvitationRepository,
    private tokenHashService: ITokenHashService,
    private uuidGenerator: IUuidGenerator,
    private transactionManager: ITransactionManager,
    private emailService: IEmailService,
    private logger: ILogger
  ) {}

  async execute(userId: string): Promise<InvitationResultDto> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError(`Teacher with id ${userId} not found.`);
    }

    if (user.role !== Role.TEACHER) {
      throw new ValidationError(`User with id ${userId} is not a Teacher.`);
    }

    if (user.status !== UserStatus.PENDING_ACTIVATION) {
      throw new ValidationError(`Cannot resend invitation for account with status ${user.status}. Account must be in PENDING_ACTIVATION status.`);
    }

    const invitationId = this.uuidGenerator.generate();
    const rawToken = this.uuidGenerator.generate();
    const tokenHash = this.tokenHashService.hash(rawToken);

    // Application calculates 24-hour expiration policy
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    let createdInvitation: Invitation;

    // Database Transaction: Revoke previous pending invitations + Create new Invitation
    await this.transactionManager.execute(async (context) => {
      await this.invitationRepository.revokeAllPendingForUser(user.id, context);

      const invitation = Invitation.create(invitationId, user.id, user.email, Role.TEACHER, tokenHash, expiresAt);
      createdInvitation = await this.invitationRepository.save(invitation, context);
    });

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const invitationLink = `${frontendUrl}/accept-invitation?token=${rawToken}`;

    // Post-Commit Email Dispatch (Out-of-Transaction)
    let emailSent = true;
    let message = 'Teacher invitation re-sent successfully.';

    try {
      await this.emailService.sendTeacherInvitation({
        to: user.email,
        recipientName: user.name,
        invitationLink,
        expiresInHours: 24,
      });
    } catch (error) {
      if (error instanceof EmailDeliveryError) {
        emailSent = false;
        message = 'Teacher invitation created, but email failed to send. You can try resending later.';
        this.logger.warn(`[INVITATION] Post-commit email dispatch failed for ${user.email}: ${error.message}`);
      } else {
        throw error;
      }
    }

    return {
      id: createdInvitation!.id,
      userId: user.id,
      email: user.email,
      role: user.role,
      status: createdInvitation!.status,
      expiresAt: createdInvitation!.expiresAt,
      emailSent,
      message,
    };
  }
}
