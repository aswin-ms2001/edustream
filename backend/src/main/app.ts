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

// Process error handling
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception', { error: error.message, stack: error.stack });
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled Rejection', { reason });
});

// Redis connection logging
redisClient.on('connect', () => {
  logger.info('Redis connected');
});

redisClient.on('error', (err) => {
  logger.error('Redis connection error', { error: err.message, stack: err.stack });
});

const app: Express = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(cookieParser());
app.use(helmet());

// Configure Morgan to stream HTTP logs to Winston
const morganStream = {
  write: (message: string) => {
    logger.http(message.trim());
  },
};
app.use(morgan("dev", { stream: morganStream }));
app.use(express.json());

app.use("/", indexRouter);

// Register global error middleware
app.use(errorMiddleware(logger));

let server: any;

connectDatabase(logger).then(() => {
  server = app.listen(env.PORT, () => {
    logger.info("Server started", {
      port: env.PORT,
      environment: process.env.NODE_ENV || "development",
    });
    logger.info(`Listening port: ${env.PORT}`);
    logger.info(`Current environment: ${process.env.NODE_ENV || "development"}`);
  });
}).catch((error) => {
  logger.error("Failed to connect to the database:", error);
  console.error("Failed to connect to the database during bootstrap:", error);
  process.exit(1);
});

// Graceful shutdown
const gracefulShutdown = (signal: string) => {
  logger.info(`Received ${signal}. Shutting down gracefully...`);
  if (server) {
    server.close(async () => {
      logger.info('HTTP server closed.');
      try {
        await mongoose.connection.close();
        logger.info('MongoDB connection closed.');
      } catch (err) {
        logger.error('Error closing MongoDB connection', { error: err });
      }
      try {
        await redisClient.quit();
        logger.info('Redis connection closed.');
      } catch (err) {
        logger.error('Error closing Redis connection', { error: err });
      }
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));