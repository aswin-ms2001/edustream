import mongoose from "mongoose";
import type { ILogger } from "@/application/port/services/ILogger";

export async function connectDatabase(logger: ILogger): Promise<void> {
  await mongoose.connect(
    process.env.MONGO_URI!
  );

  logger.info("MongoDB Connected");
}