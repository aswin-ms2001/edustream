import { MongoUserRepository } from "@/interface-adapters/gateways/MongoUserRepository";
import { BcryptPasswordHasher } from "@/infrastructure/services/BcryptPasswordHasher";
import { JwtTokenService } from "@/infrastructure/services/JwtTokenService";
import { UUIDGenerator } from "@/infrastructure/services/UUIDGenerator";


export const userRepository = new MongoUserRepository();

export const passwordHasher = new BcryptPasswordHasher();

export const tokenService = new JwtTokenService();

export const idGenerator = new UUIDGenerator();

