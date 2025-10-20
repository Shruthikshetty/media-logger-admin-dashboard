/**
 * @file contains schema to update tv show
 * only the basic tv show meta data is updatable the
 * seasons and episodes have to be updated individually
 */

import { z } from 'zod';
import { addTvShowSchema } from './add-tv-show-schema';
import { MEDIA_STATUS } from '~/constants/config.constants';

//define schema
export const updateTvShowSchema = addTvShowSchema.omit({ seasons: true });

//export type
export type UpdateTvShowSchemaType = z.infer<typeof updateTvShowSchema>;

// export default values
export const updateTvShowDefaultValues: Partial<UpdateTvShowSchemaType> = {
  title: '',
  description: '',
  totalSeasons: 0,
  totalEpisodes: 0,
  isActive: true,
  cast: [],
  directors: [],
  languages: [],
  genre: [],
  status: MEDIA_STATUS[0],
};
