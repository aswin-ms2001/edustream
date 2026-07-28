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

import { InviteTeacher } from '@/application/teacher/use-cases/InviteTeacher';
import { ListTeachers } from '@/application/teacher/use-cases/ListTeachers';
import { GetTeacherDetails } from '@/application/teacher/use-cases/GetTeacherDetails';
import { UpdateTeacherName } from '@/application/teacher/use-cases/UpdateTeacherName';
import { SuspendTeacher } from '@/application/teacher/use-cases/SuspendTeacher';
import { ActivateTeacher } from '@/application/teacher/use-cases/ActivateTeacher';
import { ResendTeacherInvitation } from '@/application/teacher/use-cases/ResendTeacherInvitation';

import { TeacherController } from '@/interface-adapters/controllers/TeacherController';
import { createTeacherRouter } from '@/interface-adapters/routes/teacherRoutes';

// Repositories & Services
const userRepository = new MongoUserRepository();
const invitationRepository = new MongoInvitationRepository();
const sessionRepository = new MongoSessionRepository();
const tokenHashService = new CryptoTokenHashService();
const uuidGenerator = new UuidGenerator();
const transactionManager = new MongooseTransactionManager();
const tokenService = new JwtServiceImpl(env.JWT_ACCESS_SECRET, env.JWT_REFRESH_SECRET);

// Use Cases
const inviteTeacher = new InviteTeacher(
  userRepository,
  invitationRepository,
  tokenHashService,
  uuidGenerator,
  transactionManager,
  emailService,
  logger
);

const listTeachers = new ListTeachers(
  userRepository,
  invitationRepository
);

const getTeacherDetails = new GetTeacherDetails(
  userRepository,
  invitationRepository
);

const updateTeacherName = new UpdateTeacherName(
  userRepository,
  logger
);

const suspendTeacher = new SuspendTeacher(
  userRepository,
  sessionRepository,
  transactionManager,
  logger
);

const activateTeacher = new ActivateTeacher(
  userRepository,
  logger
);

const resendTeacherInvitation = new ResendTeacherInvitation(
  userRepository,
  invitationRepository,
  tokenHashService,
  uuidGenerator,
  transactionManager,
  emailService,
  logger
);

// Controller & Router
export const teacherController = new TeacherController(
  inviteTeacher,
  listTeachers,
  getTeacherDetails,
  updateTeacherName,
  suspendTeacher,
  activateTeacher,
  resendTeacherInvitation
);

export const teacherRouter = createTeacherRouter(teacherController, tokenService);
