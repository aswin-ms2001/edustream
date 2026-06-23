import { MongoUserRepository } from '@/infrastructure/database/repositories/MongoUserRepository';
import { RedisOTPRepository } from '@/infrastructure/services/RedisOTPRepository';
import { JwtServiceImpl } from '@/infrastructure/auth/JwtServiceImpl';
import { GoogleAuthServiceImpl } from '@/infrastructure/services/GoogleAuthServiceImpl';
import { RegisterUser } from '@/application/user/use-cases/RegisterUser';
import { VerifyOTP } from '@/application/user/use-cases/VerifyOTP';
import { LoginUser } from '@/application/user/use-cases/LoginUser';
import { GoogleLogin } from '@/application/user/use-cases/GoogleLogin';
import { RefreshTokens } from '@/application/user/use-cases/RefreshTokens';
import { AuthController } from '@/interface-adapters/controllers/AuthController';
import { env } from '@/infrastructure/config/env';
import Redis from 'ioredis';

// Singleton Redis Client
export const redisClient = new Redis(env.REDIS_URL);

// Repositories
const userRepository = new MongoUserRepository();
const otpRepository = new RedisOTPRepository(redisClient);

// Services
const tokenService = new JwtServiceImpl(env.JWT_ACCESS_SECRET, env.JWT_REFRESH_SECRET);
const googleAuthService = new GoogleAuthServiceImpl(env.GOOGLE_CLIENT_ID);

// Use Cases
const registerUser = new RegisterUser(userRepository, otpRepository);
const verifyOTP = new VerifyOTP(userRepository, otpRepository);
const loginUser = new LoginUser(userRepository, tokenService);
const googleLogin = new GoogleLogin(userRepository, googleAuthService, tokenService);
const refreshTokens = new RefreshTokens(userRepository, tokenService);

// Controller
export const authController = new AuthController(
  registerUser,
  verifyOTP,
  loginUser,
  googleLogin,
  refreshTokens
);
