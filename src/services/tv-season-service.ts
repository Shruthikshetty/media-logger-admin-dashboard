/**
 * @file contains the tv season related services
 */

import { EpisodeBase } from './tv-episode-service';

export type SeasonBase = {
  _id: string;
  title: string;
  description?: string;
  seasonNumber: number;
  releaseDate: string;
  seasonRating?: number;
  status: string;
  trailerYoutubeUrl?: string;
  createdAt: string;
  updatedAt: string;
  tvShow: string;
};

export type SeasonFull = SeasonBase & {
  episodes?: EpisodeBase[];
};
