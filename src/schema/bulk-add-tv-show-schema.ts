/**
 * This @file contains the zod schema for bulk adding tv shows
 */

import { addSeasonSchema } from './add-season-schema';
import { addTvEpisodeSchema } from './add-tv-episode-schema';
import { addTvShowSchema } from './add-tv-show-schema';
import { z } from 'zod';

// define schema
export const bulkAddTvShowSchema = z.array(
  z.object({
    ...addTvShowSchema.omit({ releaseDate: true, seasons: true }).shape,
    releaseDate: z.iso.datetime({
      error: (issue) =>
        issue.input === undefined
          ? 'Release date is required'
          : 'Release date must iso date',
    }),
    seasons: z
      .array(
        z.object({
          ...addSeasonSchema.omit({ releaseDate: true }).shape,
          releaseDate: z.iso
            .datetime({
              error: 'Release date must be iso date',
            })
            .optional(),
          episodes: z
            .array(
              z.object({
                ...addTvEpisodeSchema.omit({ releaseDate: true }).shape,
                releaseDate: z.iso
                  .datetime({
                    error: 'Release date must be iso date',
                  })
                  .optional(),
              }),
            )
            .optional(),
        }),
      )
      .optional(),
  }),
);

//define type
export type BulkAddTvShowSchema = z.infer<typeof bulkAddTvShowSchema>;
