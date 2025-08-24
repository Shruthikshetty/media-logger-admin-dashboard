import z from 'zod';
import { Regex } from '~/constants/patterns.constants';

export const updateProfileSchema = z.object({
  name: z
    .string({
      error: 'Name Must be string',
    })
    .min(1, 'Name is required'),

  email: z
    .string({
      error: 'Email must be string',
    })
    .min(1, 'Email is required')
    .regex(Regex.email, 'Email is not valid'),

  bio: z
    .string({
      error: 'Bio must be string',
    })
    .optional(),

  location: z
    .string({
      error: 'Location must be string',
    })
    .optional(),
});

//export type for the update profile form
export type UpdateProfileType = z.infer<typeof updateProfileSchema>;
