import { Router } from 'express';
import type { InvitationController } from '@/interface-adapters/controllers/InvitationController';
import type { ITokenService } from '@/domain/user/repositories/ITokenService';
import { authMiddleware } from '@/interface-adapters/middlewares/authMiddleware';
import { requireRole } from '@/interface-adapters/middlewares/rbacMiddleware';
import { Role } from '@/domain/user/entities/Role';

export const createInvitationRouter = (
  invitationController: InvitationController,
  tokenService: ITokenService
): Router => {
  const router = Router();
  const authenticate = authMiddleware(tokenService);

  // System Admin protected routes
  router.post(
    '/invite-institution-admin',
    authenticate,
    requireRole([Role.SYSTEM_ADMIN]),
    invitationController.inviteInstitutionAdmin
  );

  router.post(
    '/resend-institution-admin/:userId',
    authenticate,
    requireRole([Role.SYSTEM_ADMIN]),
    invitationController.resendInstitutionAdminInvitation
  );

  // Public invitation routes
  router.get('/verify-token', invitationController.verifyInvitationToken);
  router.post('/accept', invitationController.acceptInvitation);

  return router;
};
