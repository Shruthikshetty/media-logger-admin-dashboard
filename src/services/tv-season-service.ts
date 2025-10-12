/**
 * @file contains the tv season related services
 */

import { useMutation, useQuery } from '@tanstack/react-query';
import { AddEpisode, EpisodeBase } from './tv-episode-service';
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

export type AddSeason = {
  title: string;
  description?: string;
  seasonNumber: number;
  releaseDate?: string;
  noOfEpisodes: number;
  posterUrl?: string;
  seasonRating?: number;
  status?: string;
  youtubeVideoId?: string;
  tvShow: string;
  episodes?: Omit<AddEpisode, 'season'>[];
};

export type AddSeasonResponse = {
  success: boolean;
  data: SeasonFull;
  message?: string;
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

//custom hook to add a season
export const useAddSeason = () => {
  return useMutation<AddSeasonResponse, AxiosError<ApiError>, AddSeason>({
    mutationKey: [QueryKeys.addSeason],
    mutationFn: (season: AddSeason) =>
      apiClient.post(Endpoints.baseSeason, season).then((res) => res.data),
  });
};

//custom hook to delete a season (this will delete all the episodes as well)
export const useDeleteSeasonById = () => {
  return useMutation({
    mutationKey: [QueryKeys.deleteSeason],
    mutationFn: (seasonId: string) =>
      apiClient
        .delete(Endpoints.baseSeason + `/${seasonId}`)
        .then((res) => res.data),
  });
};
