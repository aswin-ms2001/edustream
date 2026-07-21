import type { Response, NextFunction } from 'express';
import type { AuthRequest } from '@/interface-adapters/middlewares/authMiddleware';
import { AuthenticationError, AuthorizationError } from '@/application/errors';

export const requireRole = (allowedRoles: string[]) => {
  return (req: AuthRequest, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AuthenticationError('Authentication required'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new AuthorizationError('Access forbidden: Insufficient permissions'));
    }

    next();
  };
};
