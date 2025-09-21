/**
 * @file contains schema to update user role
 */

import { z } from 'zod';
import { UserRolesArray } from '~/constants/config.constants';

export const updateUserRoleSchema = z.object({
  role: z
    .string({
      error: 'Role must be string',
    })
    .refine((val) => UserRolesArray.includes(val), {
      error: `Invalid Role entered.`,
    }),
});

// export type
export type UpdateUserRoleSchemaType = z.infer<typeof updateUserRoleSchema>;

// export default values
export const updateUserRoleDefaultValues: UpdateUserRoleSchemaType = {
  role: '',
};
