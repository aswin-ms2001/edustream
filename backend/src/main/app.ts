import express, { type Express } from "express";
import { env } from "@/infrastructure/config/env";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import indexRouter from "@/interface-adapters/routes/index.routes";
import { connectDatabase } from "@/infrastructure/database/mongodb/connection/connectDatabase";
import { logger } from "@/main/factories/loggerFactory";
import { redisClient } from "@/infrastructure/database/redis/redisClient";
import { errorMiddleware } from "@/interface-adapters/middlewares/errorMiddleware";
import { createMorganStream } from "@/infrastructure/logging/morganStream";


const app: Express = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(cookieParser());
app.use(helmet());


app.use(morgan("dev", { stream: createMorganStream(logger)}));
app.use(express.json());

app.use("/", indexRouter);

// Register global error middleware
app.use(errorMiddleware(logger));

export default app