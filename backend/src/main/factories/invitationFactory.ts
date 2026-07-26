import { MongoInvitationRepository } from '@/infrastructure/database/mongodb/repositories/MongoInvitationRepository';
import { MongoUserRepository } from '@/infrastructure/database/mongodb/repositories/MongoUserRepository';
import { CryptoTokenHashService } from '@/infrastructure/services/CryptoTokenHashService';
import { UuidGenerator } from '@/infrastructure/services/UuidGenerator';
import { MongooseTransactionManager } from '@/infrastructure/database/mongodb/MongooseTransactionManager';
import { BcryptPasswordHasher } from '@/infrastructure/security/BcryptPasswordHasher';
import { JwtServiceImpl } from '@/infrastructure/auth/JwtServiceImpl';
import { env } from '@/infrastructure/config/env';
import { logger } from './loggerFactory';
import { emailService } from './emailFactory';

import { InviteInstitutionAdmin } from '@/application/invitation/use-cases/InviteInstitutionAdmin';
import { ResendInstitutionAdminInvitation } from '@/application/invitation/use-cases/ResendInstitutionAdminInvitation';
import { VerifyInvitationToken } from '@/application/invitation/use-cases/VerifyInvitationToken';
import { AcceptInvitation } from '@/application/invitation/use-cases/AcceptInvitation';
import { InvitationController } from '@/interface-adapters/controllers/InvitationController';
import { createInvitationRouter } from '@/interface-adapters/routes/invitationRoutes';

// Repositories & Utilities
const invitationRepository = new MongoInvitationRepository();
const userRepository = new MongoUserRepository();
const tokenHashService = new CryptoTokenHashService();
const uuidGenerator = new UuidGenerator();
const transactionManager = new MongooseTransactionManager();
const passwordHasher = new BcryptPasswordHasher();
const tokenService = new JwtServiceImpl(env.JWT_ACCESS_SECRET, env.JWT_REFRESH_SECRET);

// Use Cases
const inviteInstitutionAdmin = new InviteInstitutionAdmin(
  userRepository,
  invitationRepository,
  tokenHashService,
  uuidGenerator,
  transactionManager,
  emailService,
  logger
);

const resendInstitutionAdminInvitation = new ResendInstitutionAdminInvitation(
  userRepository,
  invitationRepository,
  tokenHashService,
  uuidGenerator,
  transactionManager,
  emailService,
  logger
);

const verifyInvitationToken = new VerifyInvitationToken(
  invitationRepository,
  tokenHashService
);

const acceptInvitation = new AcceptInvitation(
  userRepository,
  invitationRepository,
  tokenHashService,
  passwordHasher,
  transactionManager
);

// Controller & Router
export const invitationController = new InvitationController(
  inviteInstitutionAdmin,
  resendInstitutionAdminInvitation,
  verifyInvitationToken,
  acceptInvitation
);

export const invitationRouter = createInvitationRouter(invitationController, tokenService);
