import { Router, type Router as RouterType } from "express";
import authRouter from "@/interface-adapters/routes/authRoutes";
import { invitationRouter } from "@/main/factories/invitationFactory";

const indexRouter: RouterType = Router();

indexRouter.use("/auth", authRouter);
indexRouter.use("/invitations", invitationRouter);

export default indexRouter;