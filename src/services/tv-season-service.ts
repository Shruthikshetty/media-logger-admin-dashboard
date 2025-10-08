/**
 * @file contains the tv season related services
 */

import { useQuery } from '@tanstack/react-query';
import { EpisodeBase } from './tv-episode-service';
import { AxiosError } from 'axios';
import { ApiError } from '~/types/global.types';
import { QueryKeys } from '~/constants/query-key.constants';
import { FetchSeasonDetailsStaleTime } from '~/constants/config.constants';
import apiClient from '~/lib/api-client';
import { Endpoints } from '~/constants/endpoints.constants';

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

type FetchSeasonByIdResponse<T> = {
  success: boolean;
  data: T extends true ? SeasonFull : SeasonBase;
};

//custom hook to fetch a single tv show by season id
export const useFetchSeasonById = <T extends boolean = false>(
  seasonId: string,
  fullDetails = false,
) => {
  return useQuery<FetchSeasonByIdResponse<T>, AxiosError<ApiError>>({
    queryKey: [QueryKeys.fetchSeasonById, seasonId, fullDetails],
    enabled: Boolean(seasonId),
    staleTime: FetchSeasonDetailsStaleTime,
    queryFn: ({ signal }) =>
      apiClient
        .get<FetchSeasonByIdResponse<T>>(
          Endpoints.baseSeason + `/${seasonId}`,
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
