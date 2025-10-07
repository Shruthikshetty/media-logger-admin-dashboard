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
  youtubeVideoId?: string;
  noOfEpisodes: number;
  tvShow: string;
  averageRating?: number;
  posterUrl?: string;
  createdAt: string;
  updatedAt: string;
};

export type SeasonFull = SeasonBase & {
  episodes?: EpisodeBase[];
};
