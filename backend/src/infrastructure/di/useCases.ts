import { SignupUseCase } from "@/application/use-cases/SignupUseCase";
import { LoginUseCase } from "@/application/use-cases/LoginUseCase";
import { userRepository,passwordHasher,tokenService,idGenerator  } from "@/infrastructure/di/container";

export const signupUseCase =new SignupUseCase(
        userRepository,
        passwordHasher,
        idGenerator
    );

export const loginUseCase = new LoginUseCase(
        userRepository,
        passwordHasher,
        tokenService
    );