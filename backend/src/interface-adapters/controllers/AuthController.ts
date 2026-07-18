import type { Request, Response } from 'express';
import { RegisterUser } from '@/application/user/use-cases/RegisterUser';
import { VerifyOTP } from '@/application/user/use-cases/VerifyOTP';
import { LoginUser } from '@/application/user/use-cases/LoginUser';
import { GoogleLogin } from '@/application/user/use-cases/GoogleLogin';
import { RefreshTokens } from '@/application/user/use-cases/RefreshTokens';
import { LogoutUser } from '@/application/user/use-cases/LogoutUser';
import type { ILogger } from '@/application/port/services/ILogger';

export class AuthController {
  constructor(
    private registerUser: RegisterUser,
    private verifyOTP: VerifyOTP,
    private loginUser: LoginUser,
    private googleLogin: GoogleLogin,
    private refreshTokens: RefreshTokens,
    private logoutUser: LogoutUser,
    private logger: ILogger
  ) {}

  async register(req: Request, res: Response) {
    try {
      this.logger.info('Registering user payload', req.body);
      const message = await this.registerUser.execute(req.body);
      res.status(201).json({ success: true, message });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  async verifyOtp(req: Request, res: Response) {
    try {
      const { email, otp } = req.body;
      await this.verifyOTP.execute(email, otp);
      res.status(200).json({ success: true, message: 'OTP verified successfully' });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await this.loginUser.execute(email, password);
      
      this.setCookies(res, result.accessToken, result.refreshToken);
      res.status(200).json({ success: true, user: result.user });
    } catch (error: any) {
      res.status(401).json({ success: false, error: error.message });
    }
  }

  async googleAuth(req: Request, res: Response) {
    try {
      const { idToken } = req.body;
      const result = await this.googleLogin.execute(idToken);
      
      this.setCookies(res, result.accessToken, result.refreshToken);
      res.status(200).json({ success: true, user: result.user });
    } catch (error: any) {
      res.status(401).json({ success: false, error: error.message });
    }
  }

  async refresh(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies?.refreshToken;
      if (!refreshToken) throw new Error('No refresh token provided');

      const result = await this.refreshTokens.execute(refreshToken);
      
      this.setCookies(res, result.accessToken, result.refreshToken);
      res.status(200).json({ success: true, user: result.user });
    } catch (error: any) {
      res.status(401).json({ success: false, error: error.message });
    }
  }

  async logout(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies?.refreshToken;
      await this.logoutUser.execute(refreshToken);
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      res.status(200).json({ success: true, message: 'Logged out successfully' });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
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
