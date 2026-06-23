import { Router, type Router as RouterType } from 'express';
import { authController } from '@/main/factories/authFactory';

const authRouter: RouterType = Router();

authRouter.post('/register', authController.register.bind(authController));
authRouter.post('/verify-otp', authController.verifyOtp.bind(authController));
authRouter.post('/login', authController.login.bind(authController));
authRouter.post('/google-login', authController.googleAuth.bind(authController));
authRouter.post('/refresh', authController.refresh.bind(authController));
authRouter.post('/logout', authController.logout.bind(authController));

export default authRouter;
