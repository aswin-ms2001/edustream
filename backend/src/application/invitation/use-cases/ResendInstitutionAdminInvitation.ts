import { Invitation } from '@/domain/invitation/entities/Invitation';
import { UserStatus } from '@/domain/user/enums/UserStatus';
import type { IUserRepository } from '@/domain/user/repositories/IUserRepository';
import type { IInvitationRepository } from '@/domain/invitation/repositories/IInvitationRepository';
import type { ITokenHashService } from '@/application/port/services/ITokenHashService';
import type { IUuidGenerator } from '@/application/port/services/IUuidGenerator';
import type { ITransactionManager } from '@/application/port/services/ITransactionManager';
import type { IEmailService } from '@/application/email';
import type { ILogger } from '@/application/port/services/ILogger';
import { NotFoundError, ValidationError, EmailDeliveryError } from '@/application/errors';
import type { ResendInstitutionAdminInvitationDto } from '../dto/ResendInstitutionAdminInvitationDto';
import type { InvitationResultDto } from '../dto/InvitationResultDto';

export class ResendInstitutionAdminInvitation {
  constructor(
    private userRepository: IUserRepository,
    private invitationRepository: IInvitationRepository,
    private tokenHashService: ITokenHashService,
    private uuidGenerator: IUuidGenerator,
    private transactionManager: ITransactionManager,
    private emailService: IEmailService,
    private logger: ILogger
  ) {}

  async execute(dto: ResendInstitutionAdminInvitationDto): Promise<InvitationResultDto> {
    const user = await this.userRepository.findById(dto.userId);
    if (!user) {
      throw new NotFoundError(`User with id ${dto.userId} not found.`);
    }

    if (user.status !== UserStatus.PENDING_ACTIVATION) {
      throw new ValidationError(`User is not pending activation. Current status: ${user.status}`);
    }

    const invitationId = this.uuidGenerator.generate();
    const rawToken = this.uuidGenerator.generate();
    const tokenHash = this.tokenHashService.hash(rawToken);

    // Application calculates 24-hour expiration policy
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    let newInvitation: Invitation;

    // Database Transaction: Revoke prior pending + Create new Invitation
    await this.transactionManager.execute(async (context) => {
      await this.invitationRepository.revokeAllPendingForUser(user.id, context);
      const invitation = Invitation.create(invitationId, user.id, user.email, user.role, tokenHash, expiresAt);
      newInvitation = await this.invitationRepository.save(invitation, context);
    });

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const invitationLink = `${frontendUrl}/accept-invitation?token=${rawToken}`;
    const institutionName = dto.institutionName || 'your institution';

    // Post-Commit Email Dispatch
    let emailSent = true;
    let message = 'Invitation resent successfully.';

    try {
      await this.emailService.sendInstitutionAdminInvitation({
        to: user.email,
        recipientName: user.name,
        institutionName,
        invitationLink,
        expiresInHours: 24,
      });
    } catch (error) {
      if (error instanceof EmailDeliveryError) {
        emailSent = false;
        message = 'New invitation generated, but email failed to send.';
        this.logger.warn(`[INVITATION] Resend email dispatch failed for ${user.email}: ${error.message}`);
      } else {
        throw error;
      }
    }

    return {
      id: newInvitation!.id,
      userId: user.id,
      email: user.email,
      role: user.role,
      status: newInvitation!.status,
      expiresAt: newInvitation!.expiresAt,
      emailSent,
      message,
    };
  }
}
