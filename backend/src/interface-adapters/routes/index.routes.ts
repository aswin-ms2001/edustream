import { Router,type Router as RouterType } from "express";


const indexRouter:RouterType = Router();

indexRouter.use("/auth");

export default indexRouter