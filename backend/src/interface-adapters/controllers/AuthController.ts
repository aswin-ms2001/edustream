import type { Request, Response, NextFunction } from 'express';
import { RegisterUser } from '@/application/user/use-cases/RegisterUser';
import { VerifyOTP } from '@/application/user/use-cases/VerifyOTP';
import { LoginUser } from '@/application/user/use-cases/LoginUser';
import { GoogleLogin } from '@/application/user/use-cases/GoogleLogin';
import { RefreshTokens } from '@/application/user/use-cases/RefreshTokens';
import { LogoutUser } from '@/application/user/use-cases/LogoutUser';
import { AuthenticationError } from '@/application/errors';

export class AuthController {
  constructor(
    private registerUser: RegisterUser,
    private verifyOTP: VerifyOTP,
    private loginUser: LoginUser,
    private googleLogin: GoogleLogin,
    private refreshTokens: RefreshTokens,
    private logoutUser: LogoutUser
  ) {}

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const message = await this.registerUser.execute(req.body);
      res.status(201).json({ success: true, message });
    } catch (error) {
      next(error);
    }
  }

  async verifyOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, otp } = req.body;
      await this.verifyOTP.execute(email, otp);
      res.status(200).json({ success: true, message: 'OTP verified successfully' });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const result = await this.loginUser.execute(email, password);
      
      this.setCookies(res, result.accessToken, result.refreshToken);
      res.status(200).json({ success: true, user: result.user });
    } catch (error) {
      next(error);
    }
  }

  async googleAuth(req: Request, res: Response, next: NextFunction) {
    try {
      const { idToken } = req.body;
      const result = await this.googleLogin.execute(idToken);
      
      this.setCookies(res, result.accessToken, result.refreshToken);
      res.status(200).json({ success: true, user: result.user });
    } catch (error) {
      next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies?.refreshToken;
      if (!refreshToken) throw new AuthenticationError('No refresh token provided');

      const result = await this.refreshTokens.execute(refreshToken);
      
      this.setCookies(res, result.accessToken, result.refreshToken);
      res.status(200).json({ success: true, user: result.user });
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies?.refreshToken;
      await this.logoutUser.execute(refreshToken);
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      res.status(200).json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
      next(error);
    }
  }

  private setCookies(res: Response, accessToken: string, refreshToken: string) {
    const isProduction = process.env.NODE_ENV === 'production';
    
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000 // 15 mins
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
  }
}
