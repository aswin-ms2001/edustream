import { Router, type Router as RouterType } from "express";
import authRouter from "@/interface-adapters/routes/authRoutes";

const indexRouter: RouterType = Router();

indexRouter.use("/auth", authRouter);

export default indexRouter;