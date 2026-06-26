import { MongoUserRepository } from '@/infrastructure/database/mongodb/repositories/MongoUserRepository';
import { RedisOTPRepository } from '@/infrastructure/services/RedisOTPRepository';
import { InMemoryOTPRepository } from '@/infrastructure/services/InMemoryOTPRepository';
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
let useRedis = true;
export const redisClient = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: 1,
  showFriendlyErrorStack: true
});

redisClient.on('error', (err) => {
  if (useRedis) {
    console.warn('Redis connection failed. Falling back to InMemoryOTPRepository.');
    useRedis = false;
  }
});

// Repositories
const userRepository = new MongoUserRepository();
const redisOtpRepository = new RedisOTPRepository(redisClient);
const inMemoryOtpRepository = new InMemoryOTPRepository();

const otpRepository = {
  async saveOTP(email: string, otp: string, ttlSeconds: number): Promise<void> {
    if (useRedis && redisClient.status === 'ready') {
      try {
        await redisOtpRepository.saveOTP(email, otp, ttlSeconds);
        return;
      } catch (err) {
        console.warn('Redis saveOTP failed, falling back to InMemoryOTPRepository.');
      }
    }
    await inMemoryOtpRepository.saveOTP(email, otp, ttlSeconds);
  },
  async getOTP(email: string): Promise<string | null> {
    if (useRedis && redisClient.status === 'ready') {
      try {
        return await redisOtpRepository.getOTP(email);
      } catch (err) {
        console.warn('Redis getOTP failed, falling back to InMemoryOTPRepository.');
      }
    }
    return await inMemoryOtpRepository.getOTP(email);
  },
  async deleteOTP(email: string): Promise<void> {
    if (useRedis && redisClient.status === 'ready') {
      try {
        await redisOtpRepository.deleteOTP(email);
        return;
      } catch (err) {
        console.warn('Redis deleteOTP failed, falling back to InMemoryOTPRepository.');
      }
    }
    await inMemoryOtpRepository.deleteOTP(email);
  }
};

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

