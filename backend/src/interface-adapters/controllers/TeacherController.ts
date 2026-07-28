import type { Response, NextFunction } from 'express';
import type { AuthRequest } from '@/interface-adapters/middlewares/authMiddleware';
import type { InviteTeacher } from '@/application/teacher/use-cases/InviteTeacher';
import type { ListTeachers } from '@/application/teacher/use-cases/ListTeachers';
import type { GetTeacherDetails } from '@/application/teacher/use-cases/GetTeacherDetails';
import type { UpdateTeacherName } from '@/application/teacher/use-cases/UpdateTeacherName';
import type { SuspendTeacher } from '@/application/teacher/use-cases/SuspendTeacher';
import type { ActivateTeacher } from '@/application/teacher/use-cases/ActivateTeacher';
import type { ResendTeacherInvitation } from '@/application/teacher/use-cases/ResendTeacherInvitation';
import { UserStatus } from '@/domain/user/enums/UserStatus';
import type { ListTeachersQueryDto } from '@/application/teacher/dto/ListTeachersQueryDto';

export class TeacherController {
  constructor(
    private inviteTeacherUseCase: InviteTeacher,
    private listTeachersUseCase: ListTeachers,
    private getTeacherDetailsUseCase: GetTeacherDetails,
    private updateTeacherNameUseCase: UpdateTeacherName,
    private suspendTeacherUseCase: SuspendTeacher,
    private activateTeacherUseCase: ActivateTeacher,
    private resendTeacherInvitationUseCase: ResendTeacherInvitation
  ) {}

  inviteTeacher = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.inviteTeacherUseCase.execute({
        name: req.body.name,
        email: req.body.email,
      });
      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  listTeachers = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const queryDto: ListTeachersQueryDto = {};
      if (req.query.page) queryDto.page = parseInt(req.query.page as string, 10);
      if (req.query.limit) queryDto.limit = parseInt(req.query.limit as string, 10);
      if (req.query.search) queryDto.search = req.query.search as string;
      if (req.query.status) queryDto.status = req.query.status as UserStatus;

      const result = await this.listTeachersUseCase.execute(queryDto);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  getTeacherDetails = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.params.id as string;
      const result = await this.getTeacherDetailsUseCase.execute(userId);
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  updateTeacherName = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const adminUserId = req.user!.userId;
      const userId = req.params.id as string;
      const result = await this.updateTeacherNameUseCase.execute(adminUserId, {
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

  suspendTeacher = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const adminUserId = req.user!.userId;
      const targetUserId = req.params.id as string;
      const result = await this.suspendTeacherUseCase.execute(adminUserId, targetUserId);
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  activateTeacher = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const adminUserId = req.user!.userId;
      const targetUserId = req.params.id as string;
      const result = await this.activateTeacherUseCase.execute(adminUserId, targetUserId);
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  resendTeacherInvitation = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.params.id as string;
      const result = await this.resendTeacherInvitationUseCase.execute(userId);
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}
