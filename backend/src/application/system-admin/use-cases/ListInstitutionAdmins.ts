import { Role } from '@/domain/user/entities/Role';
import { UserStatus } from '@/domain/user/enums/UserStatus';
import type { IUserRepository } from '@/domain/user/repositories/IUserRepository';
import type { IInvitationRepository } from '@/domain/invitation/repositories/IInvitationRepository';
import type { ListInstitutionAdminsQueryDto } from '../dto/ListInstitutionAdminsQueryDto';
import type { PaginatedInstitutionAdminsDto, InstitutionAdminItemDto } from '../dto/PaginatedInstitutionAdminsDto';

export class ListInstitutionAdmins {
  constructor(
    private userRepository: IUserRepository,
    private invitationRepository: IInvitationRepository
  ) {}

  async execute(dto: ListInstitutionAdminsQueryDto): Promise<PaginatedInstitutionAdminsDto> {
    const page = Math.max(1, dto.page || 1);
    const limit = Math.max(1, Math.min(100, dto.limit || 10));

    const queryOptions: { page: number; limit: number; search?: string; status?: UserStatus } = {
      page,
      limit,
    };
    if (dto.search) queryOptions.search = dto.search;
    if (dto.status) queryOptions.status = dto.status;

    const { users, total } = await this.userRepository.findAllByRole(Role.INSTITUTION_ADMIN, queryOptions);

    const items: InstitutionAdminItemDto[] = await Promise.all(
      users.map(async (user) => {
        let hasPendingInvitation = false;
        if (user.status === UserStatus.PENDING_ACTIVATION) {
          const activeInv = await this.invitationRepository.findActiveByUserId(user.id);
          hasPendingInvitation = !!activeInv;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          hasPendingInvitation,
        };
      })
    );

    const totalPages = Math.ceil(total / limit) || 1;

    return {
      items,
      total,
      page,
      limit,
      totalPages,
    };
  }
}
