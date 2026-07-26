import type { IInvitationRepository } from '@/domain/invitation/repositories/IInvitationRepository';
import type { ITokenHashService } from '@/application/port/services/ITokenHashService';
import { NotFoundError } from '@/application/errors';
import type { VerifyInvitationTokenDto } from '../dto/VerifyInvitationTokenDto';
import type { InvitationResultDto } from '../dto/InvitationResultDto';

export class VerifyInvitationToken {
  constructor(
    private invitationRepository: IInvitationRepository,
    private tokenHashService: ITokenHashService
  ) {}

  async execute(dto: VerifyInvitationTokenDto): Promise<InvitationResultDto> {
    const tokenHash = this.tokenHashService.hash(dto.token);
    const invitation = await this.invitationRepository.findByTokenHash(tokenHash);

    if (!invitation) {
      throw new NotFoundError('Invitation token not found.');
    }

    // Enforces invariants (throws BusinessRuleViolationError if ACCEPTED, REVOKED, or EXPIRED)
    invitation.ensureCanBeAccepted();

    return {
      id: invitation.id,
      userId: invitation.userId,
      email: invitation.email,
      role: invitation.role,
      status: invitation.status,
      expiresAt: invitation.expiresAt,
    };
  }
}
