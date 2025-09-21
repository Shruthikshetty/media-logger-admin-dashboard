/**
 * this contains the zod schema for adding a user
 */

import { z } from 'zod';
import { Regex } from '~/constants/patterns.constants';

export const addUserSchema = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined ? 'Name is required' : 'Name must be string',
    })
    .min(3, 'Name should be at least 3 characters long')
    .max(50, 'Name should be at most 50 characters long'),

  email: z
    .string({
      error: 'Email must be string',
    })
    .min(1, 'Email is required')
    .regex(Regex.email, 'Email is not valid'),

  password: z
    .string({
      error: 'Password must be string',
    })
    .min(1, 'Password is required'),

  location: z
    .string({
      error: 'Location must be string',
    })
    .max(100, 'Location should be at most 100 characters long')
    .optional(),

  profileImg: z
    .string({
      error: 'Profile image must be string',
    })
    .refine((val) => val.startsWith('https://'), {
      error: 'Profile image must be a valid url',
    })
    .optional(),

  xp: z
    .number({
      error: 'Xp must be a number',
    })
    .optional(),

  bio: z
    .string({
      error: 'Bio must be string',
    })
    .max(200, 'Bio should be at most 200 characters long')
    .optional(),
});

//export type
export type AddUserSchemaType = z.infer<typeof addUserSchema>;

//export default values
export const addUserDefaultValues: Partial<AddUserSchemaType> = {
  name: '',
  email: '',
  password: '',
  location: '',
  xp: 0,
  bio: '',
};
