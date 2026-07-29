import { Router, type Router as RouterType } from "express";
import authRouter from "@/interface-adapters/routes/authRoutes";
import { invitationRouter } from "@/main/factories/invitationFactory";
import { systemAdminRouter } from "@/main/factories/systemAdminFactory";
import { teacherRouter } from "@/main/factories/teacherFactory";
import { studentRouter } from "@/main/factories/studentFactory";

const indexRouter: RouterType = Router();

indexRouter.use("/auth", authRouter);
indexRouter.use("/invitations", invitationRouter);
indexRouter.use("/system-admin", systemAdminRouter);
indexRouter.use("/teachers", teacherRouter);
indexRouter.use("/students", studentRouter);

export default indexRouter;