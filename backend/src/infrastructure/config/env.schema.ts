import { z } from "zod";

export const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  MONGO_URI: z.string().min(1),
  JWT_SECRET: z.string().min(1).optional(), // Legacy, keeping it if used elsewhere
  JWT_ACCESS_SECRET: z.string().min(1),
  JWT_REFRESH_SECRET: z.string().min(1),
  REDIS_URL: z.string().min(1).default("redis://localhost:6379"),
  GOOGLE_CLIENT_ID: z.string().min(1),
  NODE_ENV: z.enum(["development", "production", "test"]),
});