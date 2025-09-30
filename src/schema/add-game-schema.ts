/**
 * This file contains the zod schema for adding a game
 * same can be used for update game as well
 */

import { z } from 'zod';

export const addGameSchema = z.object({
  title: z
    .string({
      error: 'Title must be string',
    })
    .min(3, 'Title should be at least 3 characters long'),
  description: z
    .string({
      error: 'Description must be string',
    })
    .min(3, 'Description should be at least 3 characters long'),
});

//export type
export type AddGameSchemaType = z.infer<typeof addGameSchema>;
// export default values
export const addGameDefaultValues: Partial<AddGameSchemaType> = {
  title: '',
  description: '',
};
