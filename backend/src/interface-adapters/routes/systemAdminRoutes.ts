import { Router } from 'express';
import type { SystemAdminController } from '@/interface-adapters/controllers/SystemAdminController';
import type { ITokenService } from '@/domain/user/repositories/ITokenService';
import { authMiddleware } from '@/interface-adapters/middlewares/authMiddleware';
import { requireRole } from '@/interface-adapters/middlewares/rbacMiddleware';
import { Role } from '@/domain/user/entities/Role';

export const createSystemAdminRouter = (
  systemAdminController: SystemAdminController,
  tokenService: ITokenService
): Router => {
  const router = Router();
  const authenticate = authMiddleware(tokenService);

  // All endpoints require SYSTEM_ADMIN authentication
  router.use(authenticate, requireRole([Role.SYSTEM_ADMIN]));

  router.post('/institution-admins/invite', systemAdminController.inviteInstitutionAdmin);
  router.post('/institution-admins/:id/resend-invitation', systemAdminController.resendInstitutionAdminInvitation);
  router.get('/institution-admins', systemAdminController.listInstitutionAdmins);
  router.get('/institution-admins/:id', systemAdminController.getInstitutionAdminDetails);
  router.patch('/institution-admins/:id/name', systemAdminController.updateInstitutionAdminName);
  router.post('/institution-admins/:id/suspend', systemAdminController.suspendInstitutionAdmin);
  router.post('/institution-admins/:id/activate', systemAdminController.activateInstitutionAdmin);

  return router;
};
