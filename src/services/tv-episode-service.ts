/**
 * @file contains the tv episode related services
 */

import { SeasonBase } from './tv-season-service';
import { TvShowBase } from './tv-show-service';

export type EpisodeBase = {
  _id: string;
  title: string;
  description?: string;
  episodeNumber: number;
  releaseDate?: string;
  runTime: number;
  createdAt: string;
  updatedAt: string;
  season: string;
};

export type EpisodeFull = {
  _id: string;
  title: string;
  description?: string;
  episodeNumber: number;
  releaseDate?: string;
  runTime: number;
  createdAt: string;
  updatedAt: string;
  season: (Omit<SeasonBase, 'tvShow'> & { tvShow: TvShowBase })[];
};
