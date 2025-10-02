/**
 * This file contains the zod schema for adding a game
 * same can be used for update game as well
 */

import { z } from 'zod';
import { MEDIA_STATUS } from '~/constants/config.constants';
import { GAME_GENRES, GAME_PLATFORMS } from '~/constants/data.constants';

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

  averageRating: z
    .number({
      error: 'Average rating must be number',
    })
    .positive('Average rating must be positive')
    .max(10, 'Average rating can be at most 10')
    .optional(),

  genre: z
    .array(
      z
        .string({ error: 'Genre must be string' })
        .refine((val) => GAME_GENRES.includes(val), {
          error: (val) => `${val.input} must be one of the Predefined genres`,
        }),
      {
        error: 'Genre must be an array of strings',
      },
    )
    .optional(),

  releaseDate: z.date({
    error: (issue) =>
      issue.input === undefined
        ? 'Release date is required'
        : 'Release date must be date',
  }),

  posterUrl: z
    .string({
      error: 'Poster url must be string',
    })
    .optional(),

  backdropUrl: z
    .string({
      error: 'Backdrop url must be string',
    })
    .optional(),

  status: z
    .string({
      error: 'Status must be string',
    })
    .refine((val) => MEDIA_STATUS.includes(val), {
      error: `Status must be one of the following: ${MEDIA_STATUS.join(', ')}`,
    }),

  platforms: z
    .array(
      z
        .string({ error: 'Platform must be string' })
        .refine((val) => GAME_PLATFORMS.includes(val), {
          error: (val) =>
            `${val.input} must be one of the Predefined platforms`,
        }),
      {
        error: 'Platforms must be an array of strings',
      },
    )
    .optional(),

  youtubeVideoId: z
    .string({
      error: 'Youtube video id must be string',
    })
    .optional(),

  ageRating: z.number({
    error: (issue) =>
      issue.input === undefined
        ? 'Age rating is required'
        : 'Age rating must be number',
  }),

  developer: z
    .string({
      error: 'Developer must be string',
    })
    .optional(),

  avgPlaytime: z
    .number({
      error: 'Avg playtime must be number',
    })
    .positive('Avg playtime must be positive')
    .optional(),
});

//export type
export type AddGameSchemaType = z.infer<typeof addGameSchema>;
// export default values
export const addGameDefaultValues: Partial<AddGameSchemaType> = {
  title: '',
  description: '',
  status: MEDIA_STATUS[0],
};
