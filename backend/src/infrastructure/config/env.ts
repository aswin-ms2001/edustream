import { envSchema } from "@/infrastructure/config/env.schema";

export const env = envSchema.parse(process.env);