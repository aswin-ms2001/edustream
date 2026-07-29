import { Role } from '@/domain/user/entities/Role';
import type { UserStatus } from '@/domain/user/enums/UserStatus';
import type { IUserRepository } from '@/domain/user/repositories/IUserRepository';
import type { ListStudentsQueryDto } from '../dto/ListStudentsQueryDto';
import type { PaginatedStudentsDto } from '../dto/PaginatedStudentsDto';
import type { StudentSummaryDto } from '../dto/StudentSummaryDto';

export class ListStudents {
  constructor(private userRepository: IUserRepository) {}

  async execute(dto: ListStudentsQueryDto): Promise<PaginatedStudentsDto> {
    const page = Math.max(1, dto.page || 1);
    const limit = Math.max(1, Math.min(100, dto.limit || 10));

    const queryOptions: { page: number; limit: number; search?: string; status?: UserStatus } = {
      page,
      limit,
    };
    if (dto.search) queryOptions.search = dto.search;
    if (dto.status) queryOptions.status = dto.status;

    const { users, total } = await this.userRepository.findAllByRole(Role.STUDENT, queryOptions);

    const items: StudentSummaryDto[] = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      isVerified: user.isVerified,
      authProvider: user.googleId ? 'GOOGLE' : 'LOCAL',
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));

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
