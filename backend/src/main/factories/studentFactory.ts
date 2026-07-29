import { MongoUserRepository } from '@/infrastructure/database/mongodb/repositories/MongoUserRepository';
import { MongoSessionRepository } from '@/infrastructure/database/mongodb/repositories/MongoSessionRepository';
import { MongooseTransactionManager } from '@/infrastructure/database/mongodb/MongooseTransactionManager';
import { JwtServiceImpl } from '@/infrastructure/auth/JwtServiceImpl';
import { env } from '@/infrastructure/config/env';
import { logger } from './loggerFactory';

import { ListStudents } from '@/application/student/use-cases/ListStudents';
import { GetStudentDetails } from '@/application/student/use-cases/GetStudentDetails';
import { SuspendStudent } from '@/application/student/use-cases/SuspendStudent';
import { UnsuspendStudent } from '@/application/student/use-cases/UnsuspendStudent';

import { StudentController } from '@/interface-adapters/controllers/StudentController';
import { createStudentRouter } from '@/interface-adapters/routes/studentRoutes';

// Repositories & Services
const userRepository = new MongoUserRepository();
const sessionRepository = new MongoSessionRepository();
const transactionManager = new MongooseTransactionManager();
const tokenService = new JwtServiceImpl(env.JWT_ACCESS_SECRET, env.JWT_REFRESH_SECRET);

// Use Cases
const listStudents = new ListStudents(userRepository);
const getStudentDetails = new GetStudentDetails(userRepository);
const suspendStudent = new SuspendStudent(userRepository, sessionRepository, transactionManager, logger);
const unsuspendStudent = new UnsuspendStudent(userRepository, logger);

// Controller & Router
export const studentController = new StudentController(
  listStudents,
  getStudentDetails,
  suspendStudent,
  unsuspendStudent
);

export const studentRouter = createStudentRouter(studentController, tokenService);
