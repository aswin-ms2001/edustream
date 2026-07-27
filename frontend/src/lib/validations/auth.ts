import * as z from 'zod';

export const passwordSchema = z.string().min(6, 'Password must be at least 6 characters');

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: passwordSchema,
});

export const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: passwordSchema,
});

export const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be exactly 6 characters'),
});
