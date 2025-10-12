/**
 * Schema to add a season to a tv show
 */

import { z } from 'zod';
import { SEASON_STATUS } from '~/constants/config.constants';
import { addTvEpisodeSchema } from './add-tv-episode-schema';

export const addSeasonSchema = z.object({
  seasonNumber: z
    .number({
      error: (issue) =>
        issue.input === undefined
          ? 'Season number is required'
          : 'Season number must be number',
    })
    .min(1, 'Season number must be at least 1'),

  title: z.string({
    error: (issue) =>
      issue.input === undefined ? 'Title is required' : 'Title must be string',
  }),

  description: z
    .string({
      error: 'Description must be string',
    })
    .optional(),

  releaseDate: z
    .date({
      error: 'Release date must be date',
    })
    .optional(),

  noOfEpisodes: z
    .number({
      error: (issue) =>
        issue.input === undefined
          ? 'No of episodes is required'
          : 'No of episodes must be number',
    })
    .min(0, 'No of episodes can not be negative'),

  posterUrl: z
    .string({
      error: 'Poster url must be string',
    })
    .optional(),

  status: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? 'Status is required'
          : 'Status must be string',
    })
    .refine((val) => SEASON_STATUS.includes(val), {
      error: `Status must be one of the following: ${SEASON_STATUS.join(', ')}`,
    }),

  youtubeVideoId: z
    .string({
      error: 'Youtube video id must be string',
    })
    .optional(),

  averageRating: z
    .number({
      error: 'Average rating must be number',
    })
    .min(0, 'Average rating can not be negative')
    .max(10, 'Average rating can be at most 10')
    .optional(),

  episodes: z.array(addTvEpisodeSchema).optional(),
});

//export type
export type AddSeasonSchemaType = z.infer<typeof addSeasonSchema>;

export const addSeasonDefaultValues = {
  title: '',
  description: '',
  status: SEASON_STATUS[2],
  episodes: [],
};
