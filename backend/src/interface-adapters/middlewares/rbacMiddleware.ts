import { Response, NextFunction } from 'express';
import { AuthRequest } from '@/interface-adapters/middlewares/authMiddleware';

export const requireRole = (allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Authentication required' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ success: false, error: 'Access forbidden: Insufficient permissions' });
    }

    next();
  };
};
