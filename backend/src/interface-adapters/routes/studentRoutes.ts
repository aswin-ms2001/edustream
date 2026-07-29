import { Router } from 'express';
import type { StudentController } from '@/interface-adapters/controllers/StudentController';
import type { ITokenService } from '@/domain/user/repositories/ITokenService';
import { authMiddleware } from '@/interface-adapters/middlewares/authMiddleware';
import { requireRole } from '@/interface-adapters/middlewares/rbacMiddleware';
import { Role } from '@/domain/user/entities/Role';

export const createStudentRouter = (
  studentController: StudentController,
  tokenService: ITokenService
): Router => {
  const router = Router();
  const authenticate = authMiddleware(tokenService);

  // All endpoints require INSTITUTION_ADMIN authentication
  router.use(authenticate, requireRole([Role.INSTITUTION_ADMIN]));

  router.get('/', studentController.listStudents);
  router.get('/:id', studentController.getStudentDetails);
  router.patch('/:id/suspend', studentController.suspendStudent);
  router.patch('/:id/unsuspend', studentController.unsuspendStudent);

  return router;
};
