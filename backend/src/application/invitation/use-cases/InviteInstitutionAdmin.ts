import { User } from '@/domain/user/entities/User';
import { Role } from '@/domain/user/entities/Role';
import { Invitation } from '@/domain/invitation/entities/Invitation';
import type { IUserRepository } from '@/domain/user/repositories/IUserRepository';
import type { IInvitationRepository } from '@/domain/invitation/repositories/IInvitationRepository';
import type { ITokenHashService } from '@/application/port/services/ITokenHashService';
import type { IUuidGenerator } from '@/application/port/services/IUuidGenerator';
import type { ITransactionManager } from '@/application/port/services/ITransactionManager';
import type { IEmailService } from '@/application/email';
import type { ILogger } from '@/application/port/services/ILogger';
import { ConflictError, EmailDeliveryError } from '@/application/errors';
import type { InviteInstitutionAdminDto } from '../dto/InviteInstitutionAdminDto';
import type { InvitationResultDto } from '../dto/InvitationResultDto';
import { env } from '@/infrastructure/config/env';

export class InviteInstitutionAdmin {
  constructor(
    private userRepository: IUserRepository,
    private invitationRepository: IInvitationRepository,
    private tokenHashService: ITokenHashService,
    private uuidGenerator: IUuidGenerator,
    private transactionManager: ITransactionManager,
    private emailService: IEmailService,
    private logger: ILogger
  ) {}

  async execute(dto: InviteInstitutionAdminDto): Promise<InvitationResultDto> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictError(`A user with email ${dto.email} already exists.`);
    }

    const userId = this.uuidGenerator.generate();
    const invitationId = this.uuidGenerator.generate();
    const rawToken = this.uuidGenerator.generate();
    const tokenHash = this.tokenHashService.hash(rawToken);

    // Application calculates 24-hour expiration policy
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    let createdUser: User;
    let createdInvitation: Invitation;

    // Database Transaction: User [PENDING_ACTIVATION] + Invitation [PENDING]
    await this.transactionManager.execute(async (context) => {
      const pendingUser = User.createPendingInstitutionAdmin(userId, dto.name, dto.email);
      createdUser = await this.userRepository.save(pendingUser, context);

      await this.invitationRepository.revokeAllPendingForUser(userId, context);

      const invitation = Invitation.create(invitationId, userId, dto.email, Role.INSTITUTION_ADMIN, tokenHash, expiresAt);
      createdInvitation = await this.invitationRepository.save(invitation, context);
    });

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const invitationLink = `${frontendUrl}/accept-invitation?token=${rawToken}`;

    // Post-Commit Email Dispatch (Out-of-Transaction)
    let emailSent = true;
    let message = 'Institution Admin invitation created and email sent successfully.';

    try {
      await this.emailService.sendInstitutionAdminInvitation({
        to: dto.email,
        recipientName: dto.name,
        institutionName: dto.institutionName,
        invitationLink,
        expiresInHours: 24,
      });
    } catch (error) {
      if (error instanceof EmailDeliveryError) {
        emailSent = false;
        message = 'Institution Admin account created, but invitation email failed to send. You can resend it from the dashboard.';
        this.logger.warn(`[INVITATION] Post-commit email dispatch failed for ${dto.email}: ${error.message}`);
      } else {
        throw error;
      }
    }

    return {
      id: createdInvitation!.id,
      userId: createdUser!.id,
      email: createdUser!.email,
      role: createdUser!.role,
      status: createdInvitation!.status,
      expiresAt: createdInvitation!.expiresAt,
      emailSent,
      message,
    };
  }
}
