import type { Request, Response, NextFunction } from 'express';
import type { ITokenService } from '@/domain/user/repositories/ITokenService';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

export const authMiddleware = (tokenService: ITokenService) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      // Allow token in cookie or authorization header
      const token = req.cookies?.accessToken || req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        return res.status(401).json({ success: false, error: 'Access denied. No token provided.' });
      }

      const decoded = tokenService.verifyAccessToken(token);
      req.user = decoded;
      next();
    } catch (error: any) {
      res.status(401).json({ success: false, error: 'Invalid or expired access token' });
    }
  };
};
