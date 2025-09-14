/**
 * This is the schema for the bulk add movies
 */

import { addMovieSchema } from './add-movie-schema';
import { z } from 'zod';

// export schema
export const bulkAddMovieSchema = z.array(
  z.object({
    ...addMovieSchema.omit({ releaseDate: true }).shape,
    releaseDate: z.iso.datetime({
      error: (issue) =>
        issue.input === undefined
          ? 'Release date is required'
          : 'Release date must iso date',
    }),
  }),
  {
    error: 'Movies must be an array of movie objects',
  },
);

//export type
export type BulkAddMovieSchemaType = z.infer<typeof bulkAddMovieSchema>;
