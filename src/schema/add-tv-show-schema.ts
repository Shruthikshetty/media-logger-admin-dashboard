/**
 * @file contains schema to add tv show
 */

import { z } from 'zod';
import { MEDIA_STATUS } from '~/constants/config.constants';
import { GENRE_MOVIE_TV, TAGS } from '~/constants/data.constants';
import { addSeasonSchema } from './add-season-schema';

//define schema
export const addTvShowSchema = z.object({
  title: z.string({
    error: (issue) =>
      issue.input === undefined ? 'Title is required' : 'Title must be string',
  }),

  description: z.string({
    error: (issue) =>
      issue.input === undefined
        ? 'Description is required'
        : 'Description must be string',
  }),

  averageRating: z
    .number({
      error: 'Average rating must be number',
    })
    .min(0, 'Average rating can not be negative')
    .max(10, 'Average rating can be at most 10')
    .optional(),

  genre: z.array(
    z
      .string({ error: 'Genre must be string' })
      .refine((val) => GENRE_MOVIE_TV.includes(val), {
        error: (val) => `${val.input} must be one of the Predefined genres`,
      }),
    {
      error: 'Genre must be an array of strings',
    },
  ),

  releaseDate: z.date({
    error: (issue) =>
      issue.input === undefined
        ? 'Release date is required'
        : 'Release date must be date',
  }),

  cast: z
    .array(z.string({ error: 'Cast must be string' }), {
      error: 'Cast must be an array of strings',
    })
    .optional(),

  directors: z
    .array(z.string({ error: 'Directors must be string' }), {
      error: 'Directors must be an array of strings',
    })
    .optional(),

  avgRunTime: z
    .number({
      error: 'Run time must be number',
    })
    .min(0, 'Run time can not be negative')
    .optional(),

  languages: z
    .array(z.string({ error: 'Languages must be string' }), {
      error: 'Languages must be an array of strings',
    })
    .optional(),

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

  isActive: z
    .boolean({
      error: 'Is active must be boolean',
    })
    .optional(),

  status: z
    .string({
      error: 'Status must be string',
    })
    .refine((val) => MEDIA_STATUS.includes(val), {
      error: `Status must be one of the following: ${MEDIA_STATUS.join(', ')}`,
    }),

  tags: z
    .array(
      z
        .string({ error: 'Tags must be string' })
        .refine((val) => TAGS.includes(val), {
          error: (val) => `${val.input} dose not belong to predefined tags`,
        }),
      {
        error: 'Tags must be an array of strings',
      },
    )
    .optional(),

  totalSeasons: z
    .number({
      error: (issue) =>
        issue.input === undefined
          ? 'Total seasons is required'
          : 'Total seasons must be number',
    })
    .min(0, 'Total seasons can not be negative'),

  totalEpisodes: z
    .number({
      error: (issue) =>
        issue.input === undefined
          ? 'Total episodes is required'
          : 'Total episodes must be number',
    })
    .min(0, 'Total episodes can not be negative'),

  ageRating: z
    .number({
      error: 'Age rating must be number',
    })
    .min(0, 'Age can not be negative'),

  youtubeVideoId: z
    .string({
      error: 'Youtube video id must be string',
    })
    .optional(),

  tmdbId: z
    .string({
      error: 'Tmdb id must be string',
    })
    .optional(),

  imdbId: z
    .string({
      error: 'Imdb id must be string',
    })
    .optional(),

  seasons: addSeasonSchema.array().optional(),
});
