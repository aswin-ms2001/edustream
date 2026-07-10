import { MongoUserRepository } from '@/infrastructure/database/mongodb/repositories/MongoUserRepository';
import { OTPRepository } from '@/application/user/use-cases/OTPRepository';
import { RedisCacheService } from '@/infrastructure/services/RedisCacheService';

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
import { BcryptPasswordHasher } from '@/infrastructure/security/BcryptPasswordHasher';

// Singleton Redis Client
export const redisClient = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: 1,
  showFriendlyErrorStack: true
});

redisClient.on('error', (err) => {
  console.error('Redis connection failed:', err);
});

// Services / Caching
const cacheService = new RedisCacheService(redisClient);

// Repositories
const userRepository = new MongoUserRepository();
const otpRepository = new OTPRepository(cacheService);

// Services
const tokenService = new JwtServiceImpl(env.JWT_ACCESS_SECRET, env.JWT_REFRESH_SECRET);
const googleAuthService = new GoogleAuthServiceImpl(env.GOOGLE_CLIENT_ID);
const passwordHasher = new BcryptPasswordHasher();

// Use Cases
const registerUser = new RegisterUser(userRepository, otpRepository,passwordHasher);
const verifyOTP = new VerifyOTP(userRepository, otpRepository);
const loginUser = new LoginUser(userRepository, tokenService,passwordHasher);
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

