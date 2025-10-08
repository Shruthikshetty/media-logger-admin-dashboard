/**
 * @file contains the tv episode related services
 */

import { useQuery } from '@tanstack/react-query';
import { SeasonBase } from './tv-season-service';
import { TvShowBase } from './tv-show-service';
import { QueryKeys } from '~/constants/query-key.constants';
import apiClient from '~/lib/api-client';
import { Endpoints } from '~/constants/endpoints.constants';
import { FetchEpisodeDetailsStaleTime } from '~/constants/config.constants';
import { AxiosError } from 'axios';
import { ApiError } from '~/types/global.types';

export type EpisodeBase = {
  _id: string;
  title: string;
  description?: string;
  episodeNumber: number;
  releaseDate?: string;
  runTime: number;
  stillUrl?: string;
  averageRating?: number;
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
  season: Omit<SeasonBase, 'tvShow'> & { tvShow: TvShowBase };
};

export type FetchEpisodeDetailsResponse<T> = {
  success: boolean;
  data: T extends true ? EpisodeFull : EpisodeBase;
};

//custom hook to fetch the episode details by id
export const useFetchEpisodeDetailsById = <T extends boolean = false>(
  episodeId: string,
  fullDetails = false,
) => {
  return useQuery<FetchEpisodeDetailsResponse<T>, AxiosError<ApiError>>({
    queryKey: [QueryKeys.fetchEpisodeById, episodeId],
    staleTime: FetchEpisodeDetailsStaleTime,
    enabled: !!episodeId,
    queryFn: ({ signal }) =>
      apiClient
        .get<FetchEpisodeDetailsResponse<T>>(
          Endpoints.baseEpisode + `/${episodeId}`,
          {
            params: {
              fullDetails,
            },
            signal,
          },
        )
        .then((res) => res.data),
  });
};
