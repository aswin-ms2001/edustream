import { WinstonLogger } from "@/infrastructure/logging/WinstonLogger";
import { createWinstonLogger } from "@/infrastructure/logging/winston.config";

// Create the Winston instance
const winstonLogger = createWinstonLogger();


export const logger = new WinstonLogger(winstonLogger);