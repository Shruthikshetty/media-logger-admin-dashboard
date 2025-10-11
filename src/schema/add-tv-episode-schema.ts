/**
 * @file contains schema to add tv episode
 */

import { z } from 'zod';

//define schema
export const addTvEpisodeSchema = z.object({
  title: z.string({
    error: (issue) =>
      issue.input === undefined ? 'Title is required' : 'Title must be string',
  }),
  description: z
    .string({
      error: 'Description must be string',
    })
    .optional(),
  episodeNumber: z
    .number({
      error: (issue) =>
        issue.input === undefined
          ? 'Episode number is required'
          : 'Episode number must be number',
    })
    .min(0, 'Episode number can not be negative'),
  releaseDate: z
    .date({
      error: 'Release date must be date',
    })
    .optional(),
  runTime: z
    .number({
      error: 'Run time must be number',
    })
    .min(0, 'Run time can not be negative')
    .optional(),
  stillUrl: z
    .url({
      error: 'Still url must be url',
    })
    .optional(),
  averageRating: z
    .number({
      error: 'Average rating must be number',
    })
    .min(0, 'Average rating can not be negative')
    .max(10, 'Average rating can be at most 10')
    .optional(),
});

//export type
export type AddTvEpisodeSchemaType = z.infer<typeof addTvEpisodeSchema>;

//export default values
export const addEpisodeDefaultValues: Partial<AddTvEpisodeSchemaType> = {
  title: '',
  description: '',
};
