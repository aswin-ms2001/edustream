import { Router } from 'express';
import type { TeacherController } from '@/interface-adapters/controllers/TeacherController';
import type { ITokenService } from '@/domain/user/repositories/ITokenService';
import { authMiddleware } from '@/interface-adapters/middlewares/authMiddleware';
import { requireRole } from '@/interface-adapters/middlewares/rbacMiddleware';
import { Role } from '@/domain/user/entities/Role';

export const createTeacherRouter = (
  teacherController: TeacherController,
  tokenService: ITokenService
): Router => {
  const router = Router();
  const authenticate = authMiddleware(tokenService);

  // All endpoints require INSTITUTION_ADMIN authentication
  router.use(authenticate, requireRole([Role.INSTITUTION_ADMIN]));

  router.post('/invite', teacherController.inviteTeacher);
  router.get('/', teacherController.listTeachers);
  router.get('/:id', teacherController.getTeacherDetails);
  router.patch('/:id/name', teacherController.updateTeacherName);
  router.post('/:id/suspend', teacherController.suspendTeacher);
  router.post('/:id/activate', teacherController.activateTeacher);
  router.post('/:id/resend-invitation', teacherController.resendTeacherInvitation);

  return router;
};
