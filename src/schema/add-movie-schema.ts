/**
 * This file contains the zod schema for the add movies
 */

import z from 'zod';
import {
  GENRE_MOVIE_TV,
  MEDIA_STATUS,
  TAGS,
} from '~/constants/config.constants';

export const addMovieSchema = z.object({
  title: z
    .string({
      error: 'Title must be string',
    })
    .min(3, 'Title should be at least 3 characters long')
    .max(50, 'Title should be at most 50 characters long'),
  description: z
    .string({
      error: 'Description must be string',
    })
    .min(1, 'Description is required')
    .max(300, 'Description should be at most 300 characters long'),

  averageRating: z
    .number({
      error: 'Average rating must be number',
    })
    .positive('Average rating must be positive')
    .max(10, 'Average rating can be at most 10')
    .optional(),

  cast: z.array(z.string({ error: 'Cast must be string' }), {
    error: 'Cast must be an array of strings',
  }),

  directors: z.array(z.string({ error: 'Directors must be string' }), {
    error: 'Directors must be an array of strings',
  }),

  runTime: z
    .number({
      error: (issue) =>
        issue.input === undefined
          ? 'Run time is required'
          : 'Run time must be number',
    })
    .positive('Run time must be positive'),
  languages: z.array(z.string({ error: 'Languages must be string' }), {
    error: 'Languages must be an array of strings',
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
    })
    .optional(),
  ageRating: z.number({
    error: (issue) =>
      issue.input === undefined
        ? 'Age rating is required'
        : 'Age rating must be number',
  }),
  tags: z.array(
    z
      .string({ error: 'Tags must be string' })
      .refine((val) => TAGS.includes(val), {
        error: `Tags must be one of the following: ${TAGS.join(', ')}`,
      }),
    {
      error: 'Tags must be an array of strings',
    },
  ),
  youtubeVideoId: z
    .string({
      error: 'Youtube video id must be string',
    })
    .optional(),
  //   releaseDate: z.date({
  //     error: (issue) =>
  //       issue.input === undefined
  //         ? 'Release date is required'
  //         : 'Release date must be date',
  //   }),
  genre: z.array(
    z
      .string({ error: 'Genre must be string' })
      .refine((val) => GENRE_MOVIE_TV.includes(val), {
        error: `Genre must be one of the following: ${GENRE_MOVIE_TV.join(
          ', ',
        )}`,
      }),
    {
      error: 'Genre must be an array of strings',
    },
  ),
});

//export type
export type AddMovieSchemaType = z.infer<typeof addMovieSchema>;
//export default values
export const addMovieDefaultValues: Partial<AddMovieSchemaType> = {
  title: '',
  description: '',
  isActive: true,
  status: MEDIA_STATUS[0],
};
