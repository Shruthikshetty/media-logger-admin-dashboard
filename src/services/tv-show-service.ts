/**
 * @file contains the tv show related services
 */

import { SeasonFull } from './tv-season-service';

export type TvShowBase = {
  title: string;
  description: string;
  releaseDate: string;
  averageRating?: number;
  genre: string[];
  cast?: string[];
  directors?: string[];
  runTime: number;
  languages?: string[];
  posterUrl?: string;
  backdropUrl?: string;
  isActive: boolean;
  status: string;
  tags?: string[];
  ageRating?: number;
  totalSeasons: number;
  totalEpisodes: number;
  createdAt: string;
  updatedAt: string;
};

export type TvShowFull = TvShowBase & {
  seasons: SeasonFull[];
};
