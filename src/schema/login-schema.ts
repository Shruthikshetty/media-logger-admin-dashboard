import z from 'zod';
import { Regex } from '~/constants/patterns.constants';

//this contains the zod schema for the login form
export const loginSchema = z.object({
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
});

//default values for the login form
export const loginDefaultValues = {
  email: '',
  password: '',
};

//this is the type for the login form
export type LoginSchema = z.infer<typeof loginSchema>;
