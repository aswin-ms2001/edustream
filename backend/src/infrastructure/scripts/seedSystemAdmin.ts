import { connectDatabase } from '@/infrastructure/database/mongodb/connection/connectDatabase';
import { MongoUserRepository } from '@/infrastructure/database/mongodb/repositories/MongoUserRepository';
import { BcryptPasswordHasher } from '@/infrastructure/security/BcryptPasswordHasher';
import { UuidGenerator } from '@/infrastructure/services/UuidGenerator';
import { WinstonLogger } from '@/infrastructure/logging/WinstonLogger';
import { createWinstonLogger } from '@/infrastructure/logging/winston.config';
import { Role } from '@/domain/user/entities/Role';
import { User } from '@/domain/user/entities/User';
import { env } from '@/infrastructure/config/env';
import mongoose from 'mongoose';

async function seedSystemAdmin() {
  const logger = new WinstonLogger(createWinstonLogger());

  try {
    await connectDatabase(logger);

    const userRepository = new MongoUserRepository();
    const passwordHasher = new BcryptPasswordHasher();
    const uuidGenerator = new UuidGenerator();

    const systemAdminEmail = env.SYSTEM_ADMIN_EMAIL;
    const systemAdminPassword = env.SYSTEM_ADMIN_PASSWORD;
    const systemAdminName = env.SYSTEM_ADMIN_NAME;

    // Idempotency check 1: System Admin role exists
    const adminExists = await userRepository.existsByRole(Role.SYSTEM_ADMIN);
    if (adminExists) {
      logger.info('[SEED] System Admin role already exists. Skipping seeding.');
      await mongoose.disconnect();
      process.exit(0);
    }

    // Idempotency check 2: Email already exists
    const emailUser = await userRepository.findByEmail(systemAdminEmail);
    if (emailUser) {
      logger.info(`[SEED] User with email ${systemAdminEmail} already exists. Skipping seeding.`);
      await mongoose.disconnect();
      process.exit(0);
    }

    // Hash password and create System Admin using domain factory method
    const hashedPassword = await passwordHasher.hash(systemAdminPassword);
    const uuid = uuidGenerator.generate();

    const systemAdmin = User.createSystemAdmin(
      uuid,
      systemAdminName,
      systemAdminEmail,
      hashedPassword
    );

    await userRepository.save(systemAdmin);
    logger.info(`[SEED] System Admin account created successfully. Email: ${systemAdminEmail}`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    logger.error('[SEED] Failed to seed System Admin:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedSystemAdmin();
