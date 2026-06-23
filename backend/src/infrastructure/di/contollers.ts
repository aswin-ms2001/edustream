import { SignupContoller } from "@/interface-adapters/controllers/SignupController";
import { LoginContoller } from "@/interface-adapters/controllers/LoginController";
import { ProfileController } from "@/interface-adapters/controllers/ProfileController";
import { signupUseCase,loginUseCase } from "@/infrastructure/di/useCases";
import { LogoutController } from "@/interface-adapters/controllers/LogoutController";



export const signupController = new SignupContoller(
        signupUseCase
    );

export const loginController = new LoginContoller(
        loginUseCase
    );

export const profileController = new ProfileController();

export const logoutController = new LogoutController();