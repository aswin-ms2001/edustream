import type { Response, NextFunction } from 'express';
import type { AuthRequest } from '@/interface-adapters/middlewares/authMiddleware';
import type { InviteInstitutionAdmin } from '@/application/invitation/use-cases/InviteInstitutionAdmin';
import type { ResendInstitutionAdminInvitation } from '@/application/invitation/use-cases/ResendInstitutionAdminInvitation';
import type { ListInstitutionAdmins } from '@/application/system-admin/use-cases/ListInstitutionAdmins';
import type { GetInstitutionAdminDetails } from '@/application/system-admin/use-cases/GetInstitutionAdminDetails';
import type { UpdateInstitutionAdminName } from '@/application/system-admin/use-cases/UpdateInstitutionAdminName';
import type { SuspendInstitutionAdmin } from '@/application/system-admin/use-cases/SuspendInstitutionAdmin';
import type { ActivateInstitutionAdmin } from '@/application/system-admin/use-cases/ActivateInstitutionAdmin';
import { UserStatus } from '@/domain/user/enums/UserStatus';
import type { ListInstitutionAdminsQueryDto } from '@/application/system-admin/dto/ListInstitutionAdminsQueryDto';

export class SystemAdminController {
  constructor(
    private inviteInstitutionAdminUseCase: InviteInstitutionAdmin,
    private resendInstitutionAdminInvitationUseCase: ResendInstitutionAdminInvitation,
    private listInstitutionAdminsUseCase: ListInstitutionAdmins,
    private getInstitutionAdminDetailsUseCase: GetInstitutionAdminDetails,
    private updateInstitutionAdminNameUseCase: UpdateInstitutionAdminName,
    private suspendInstitutionAdminUseCase: SuspendInstitutionAdmin,
    private activateInstitutionAdminUseCase: ActivateInstitutionAdmin
  ) {}

  inviteInstitutionAdmin = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.inviteInstitutionAdminUseCase.execute({
        name: req.body.name,
        email: req.body.email,
        institutionName: req.body.institutionName,
      });
      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  resendInstitutionAdminInvitation = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = (req.params.id || req.params.userId) as string;
      const result = await this.resendInstitutionAdminInvitationUseCase.execute({
        userId,
        institutionName: req.body.institutionName,
      });
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  listInstitutionAdmins = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const queryDto: ListInstitutionAdminsQueryDto = {};
      if (req.query.page) queryDto.page = parseInt(req.query.page as string, 10);
      if (req.query.limit) queryDto.limit = parseInt(req.query.limit as string, 10);
      if (req.query.search) queryDto.search = req.query.search as string;
      if (req.query.status) queryDto.status = req.query.status as UserStatus;

      const result = await this.listInstitutionAdminsUseCase.execute(queryDto);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  getInstitutionAdminDetails = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.params.id as string;
      const result = await this.getInstitutionAdminDetailsUseCase.execute(userId);
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  updateInstitutionAdminName = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const adminUserId = req.user!.userId;
      const userId = req.params.id as string;
      const result = await this.updateInstitutionAdminNameUseCase.execute(adminUserId, {
        userId,
        name: req.body.name,
      });
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  suspendInstitutionAdmin = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const adminUserId = req.user!.userId;
      const targetUserId = req.params.id as string;
      const result = await this.suspendInstitutionAdminUseCase.execute(adminUserId, targetUserId);
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  activateInstitutionAdmin = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const adminUserId = req.user!.userId;
      const targetUserId = req.params.id as string;
      const result = await this.activateInstitutionAdminUseCase.execute(adminUserId, targetUserId);
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}
