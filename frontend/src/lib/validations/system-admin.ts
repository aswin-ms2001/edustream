import { z } from 'zod';

export const inviteInstitutionAdminSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
});

export type InviteInstitutionAdminFormValues = z.infer<typeof inviteInstitutionAdminSchema>;

export const updateInstitutionAdminNameSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

export type UpdateInstitutionAdminNameFormValues = z.infer<typeof updateInstitutionAdminNameSchema>;
