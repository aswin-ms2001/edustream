import { z } from "zod";

export const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  MONGO_URI: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  NODE_ENV: z.enum(["development", "production", "test"]),
});