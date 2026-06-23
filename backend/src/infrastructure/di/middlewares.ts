import { AuthMiddleware } from "@/interface-adapters/middleware/AuthMiddleware";
import { tokenService } from "@/infrastructure/di/container";

export const authMiddleware = new AuthMiddleware(
        tokenService
    );