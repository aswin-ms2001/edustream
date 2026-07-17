import { MongoUserRepository } from '@/infrastructure/database/mongodb/repositories/MongoUserRepository';
import { OTPRepository } from '@/application/user/use-cases/OTPRepository';
import { RedisCacheService } from '@/infrastructure/services/RedisCacheService';
import { WinstonLogger } from '@/infrastructure/logging/WinstonLogger';

import { JwtServiceImpl } from '@/infrastructure/auth/JwtServiceImpl';
import { GoogleAuthServiceImpl } from '@/infrastructure/services/GoogleAuthServiceImpl';
import { RegisterUser } from '@/application/user/use-cases/RegisterUser';
import { VerifyOTP } from '@/application/user/use-cases/VerifyOTP';
import { LoginUser } from '@/application/user/use-cases/LoginUser';
import { GoogleLogin } from '@/application/user/use-cases/GoogleLogin';
import { RefreshTokens } from '@/application/user/use-cases/RefreshTokens';
import { AuthController } from '@/interface-adapters/controllers/AuthController';
import { env } from '@/infrastructure/config/env';
import { redisClient } from '@/infrastructure/database/redis/redisClient';
import { BcryptPasswordHasher } from '@/infrastructure/security/BcryptPasswordHasher';
import { UuidGenerator } from '@/infrastructure/services/UuidGenerator';
import { CryptoTokenHashService } from '@/infrastructure/services/CryptoTokenHashService';
import { MongooseTransactionManager } from '@/infrastructure/database/mongodb/MongooseTransactionManager';
import { MongoSessionRepository } from '@/infrastructure/database/mongodb/repositories/MongoSessionRepository';
import { logger } from './loggerFactory';


// Services / Caching
const cacheService = new RedisCacheService(redisClient);

// Repositories
const userRepository = new MongoUserRepository();
const otpRepository = new OTPRepository(cacheService);
const sessionRepository = new MongoSessionRepository();

// Services
const tokenService = new JwtServiceImpl(env.JWT_ACCESS_SECRET, env.JWT_REFRESH_SECRET);
const googleAuthService = new GoogleAuthServiceImpl(env.GOOGLE_CLIENT_ID);
const passwordHasher = new BcryptPasswordHasher();
const uuidGenerator = new UuidGenerator();
const tokenHashService = new CryptoTokenHashService();
const transactionManager = new MongooseTransactionManager();

// Use Cases
const registerUser = new RegisterUser(userRepository, otpRepository, passwordHasher, uuidGenerator, logger);
const verifyOTP = new VerifyOTP(userRepository, otpRepository);
const loginUser = new LoginUser(
  userRepository,
  tokenService,
  passwordHasher,
  sessionRepository,
  uuidGenerator,
  tokenHashService,
  transactionManager
);
const googleLogin = new GoogleLogin(
  userRepository,
  googleAuthService,
  tokenService,
  uuidGenerator,
  sessionRepository,
  tokenHashService,
  transactionManager
);
const refreshTokens = new RefreshTokens(userRepository, tokenService);

// Controller
export const authController = new AuthController(
  registerUser,
  verifyOTP,
  loginUser,
  googleLogin,
  refreshTokens,
  logger
);

