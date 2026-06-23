import { Router , type Router as RouterType } from "express";

import { signupController,loginController,logoutController } from "@/infrastructure/di/contollers";

const authRouter:RouterType = Router();

authRouter.post(
    "/signup",
    signupController.handle
);

authRouter.post(
    "/login",
    loginController.handle
);

authRouter.post(
    "/logout",
    logoutController.handle
)


export default authRouter;