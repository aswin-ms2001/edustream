import type { Response, NextFunction } from 'express';
import type { AuthRequest } from '@/interface-adapters/middlewares/authMiddleware';
import type { ListStudents } from '@/application/student/use-cases/ListStudents';
import type { GetStudentDetails } from '@/application/student/use-cases/GetStudentDetails';
import type { SuspendStudent } from '@/application/student/use-cases/SuspendStudent';
import type { UnsuspendStudent } from '@/application/student/use-cases/UnsuspendStudent';
import { UserStatus } from '@/domain/user/enums/UserStatus';
import type { ListStudentsQueryDto } from '@/application/student/dto/ListStudentsQueryDto';

export class StudentController {
  constructor(
    private listStudentsUseCase: ListStudents,
    private getStudentDetailsUseCase: GetStudentDetails,
    private suspendStudentUseCase: SuspendStudent,
    private unsuspendStudentUseCase: UnsuspendStudent
  ) {}

  listStudents = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const queryDto: ListStudentsQueryDto = {};
      if (req.query.page) queryDto.page = parseInt(req.query.page as string, 10);
      if (req.query.limit) queryDto.limit = parseInt(req.query.limit as string, 10);
      if (req.query.search) queryDto.search = req.query.search as string;
      if (req.query.status) queryDto.status = req.query.status as UserStatus;

      const result = await this.listStudentsUseCase.execute(queryDto);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  getStudentDetails = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.params.id as string;
      const result = await this.getStudentDetailsUseCase.execute(userId);
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  suspendStudent = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const adminUserId = req.user!.userId;
      const targetUserId = req.params.id as string;
      const result = await this.suspendStudentUseCase.execute(adminUserId, targetUserId);
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  unsuspendStudent = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const adminUserId = req.user!.userId;
      const targetUserId = req.params.id as string;
      const result = await this.unsuspendStudentUseCase.execute(adminUserId, targetUserId);
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}
