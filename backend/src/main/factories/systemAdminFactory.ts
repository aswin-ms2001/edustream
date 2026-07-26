import { MongoUserRepository } from '@/infrastructure/database/mongodb/repositories/MongoUserRepository';
import { MongoInvitationRepository } from '@/infrastructure/database/mongodb/repositories/MongoInvitationRepository';
import { MongoSessionRepository } from '@/infrastructure/database/mongodb/repositories/MongoSessionRepository';
import { CryptoTokenHashService } from '@/infrastructure/services/CryptoTokenHashService';
import { UuidGenerator } from '@/infrastructure/services/UuidGenerator';
import { MongooseTransactionManager } from '@/infrastructure/database/mongodb/MongooseTransactionManager';
import { JwtServiceImpl } from '@/infrastructure/auth/JwtServiceImpl';
import { env } from '@/infrastructure/config/env';
import { logger } from './loggerFactory';
import { emailService } from './emailFactory';

import { InviteInstitutionAdmin } from '@/application/invitation/use-cases/InviteInstitutionAdmin';
import { ResendInstitutionAdminInvitation } from '@/application/invitation/use-cases/ResendInstitutionAdminInvitation';
import { ListInstitutionAdmins } from '@/application/system-admin/use-cases/ListInstitutionAdmins';
import { GetInstitutionAdminDetails } from '@/application/system-admin/use-cases/GetInstitutionAdminDetails';
import { UpdateInstitutionAdminName } from '@/application/system-admin/use-cases/UpdateInstitutionAdminName';
import { SuspendInstitutionAdmin } from '@/application/system-admin/use-cases/SuspendInstitutionAdmin';
import { ActivateInstitutionAdmin } from '@/application/system-admin/use-cases/ActivateInstitutionAdmin';

import { SystemAdminController } from '@/interface-adapters/controllers/SystemAdminController';
import { createSystemAdminRouter } from '@/interface-adapters/routes/systemAdminRoutes';

// Repositories & Services
const userRepository = new MongoUserRepository();
const invitationRepository = new MongoInvitationRepository();
const sessionRepository = new MongoSessionRepository();
const tokenHashService = new CryptoTokenHashService();
const uuidGenerator = new UuidGenerator();
const transactionManager = new MongooseTransactionManager();
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

const listInstitutionAdmins = new ListInstitutionAdmins(
  userRepository,
  invitationRepository
);

const getInstitutionAdminDetails = new GetInstitutionAdminDetails(
  userRepository,
  invitationRepository
);

const updateInstitutionAdminName = new UpdateInstitutionAdminName(
  userRepository,
  logger
);

const suspendInstitutionAdmin = new SuspendInstitutionAdmin(
  userRepository,
  sessionRepository,
  transactionManager,
  logger
);

const activateInstitutionAdmin = new ActivateInstitutionAdmin(
  userRepository,
  logger
);

// Controller & Router
export const systemAdminController = new SystemAdminController(
  inviteInstitutionAdmin,
  resendInstitutionAdminInvitation,
  listInstitutionAdmins,
  getInstitutionAdminDetails,
  updateInstitutionAdminName,
  suspendInstitutionAdmin,
  activateInstitutionAdmin
);

export const systemAdminRouter = createSystemAdminRouter(systemAdminController, tokenService);
