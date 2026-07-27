import { z } from "zod";

export const envSchema = z.object({
  PORT: z.coerce.number().default(5000),
  MONGO_URI: z.string().min(1),
  JWT_SECRET: z.string().min(1).optional(),
  JWT_ACCESS_SECRET: z.string().min(1),
  JWT_REFRESH_SECRET: z.string().min(1),
  REDIS_URL: z.string().min(1).default("redis://localhost:6379"),
  GOOGLE_CLIENT_ID: z.string().min(1),
  NODE_ENV: z.enum(["development", "production", "test"]),
  SYSTEM_ADMIN_EMAIL: z.string().email().default("admin@edustream.com"),
  SYSTEM_ADMIN_PASSWORD: z.string().min(6).default("Admin@12345"),
  SYSTEM_ADMIN_NAME: z.string().min(1).default("System Administrator"),
  SMTP_HOST: z.string().min(1).default("smtp.gmail.com"),
  SMTP_PORT: z.coerce.number().default(587),
  SMTP_SECURE: z.preprocess((value) => value === "true",z.boolean().default(false)),
  SMTP_USER: z.string().email().optional().default("noreply@edustream.com"),
  SMTP_PASS: z.string().optional().default(""),
  EMAIL_FROM_NAME: z.string().default("EduStream"),
  EMAIL_FROM_ADDRESS: z.string().email().default("noreply@edustream.com"),
});