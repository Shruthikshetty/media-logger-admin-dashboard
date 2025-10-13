/**
 * This file contains the zod schema for the update tv season data
 */
import { z } from 'zod';

import { addSeasonSchema } from './add-season-schema';
import { SEASON_STATUS } from '~/constants/config.constants';

//create schema
export const editSeasonSchema = addSeasonSchema.omit({ episodes: true });

//export type
export type EditSeasonSchemaType = z.infer<typeof editSeasonSchema>;

export const updateSeasonDefaultValues = {
  title: '',
  description: '',
  status: SEASON_STATUS[2],
};
