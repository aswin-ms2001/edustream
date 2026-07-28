import { z } from 'zod';

export const inviteTeacherSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
});

export type InviteTeacherFormValues = z.infer<typeof inviteTeacherSchema>;

export const updateTeacherNameSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

export type UpdateTeacherNameFormValues = z.infer<typeof updateTeacherNameSchema>;
