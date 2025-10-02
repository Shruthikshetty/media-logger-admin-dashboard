/**
 * @file contains schema to bulk add games
 */

import { z } from 'zod';
import { addGameSchema } from './add-game-schema';

//build and export schema
export const bulkAddGameSchema = z.array(
  z.object({
    ...addGameSchema.omit({ releaseDate: true }).shape,
    releaseDate: z.iso.datetime({
      error: (issue) =>
        issue.input === undefined
          ? 'Release date is required'
          : 'Release date must iso date',
    }),
  }),
  {
    error: 'Games must be an array of game objects',
  },
);

//export type
export type BulkAddGameSchema = z.infer<typeof bulkAddGameSchema>;
