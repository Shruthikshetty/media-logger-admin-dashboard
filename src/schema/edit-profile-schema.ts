/**
 * This file contains the zod schema for the update profile data
 */
import z from 'zod';
import { Regex } from '~/constants/patterns.constants';

export const updateProfileSchema = z.object({
  name: z
    .string({
      error: 'Name Must be string',
    })
    .min(3, 'Name should be at least 3 characters long')
    .max(50, 'Name should be at most 50 characters long'),

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
    .max(200, 'Bio should be at most 200 characters long')
    .optional(),

  location: z
    .string({
      error: 'Location must be string',
    })
    .max(100, 'Location should be at most 100 characters long')
    .optional(),
});

export const updateProfileDefaultValues = {
  name: '',
  email: '',
  bio: '',
  location: '',
};

//export type for the update profile form
export type UpdateProfileSchemaType = z.infer<typeof updateProfileSchema>;
