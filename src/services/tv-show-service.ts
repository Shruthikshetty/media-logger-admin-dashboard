/**
 * @file contains the tv show related services
 */

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { SeasonFull } from './tv-season-service';
import { AxiosError } from 'axios';
import { ApiError, Pagination } from '~/types/global.types';
import { QueryKeys } from '~/constants/query-key.constants';
import { FetchAllTvShowsSlateTime } from '~/constants/config.constants';
import apiClient from '~/lib/api-client';
import { Endpoints } from '~/constants/endpoints.constants';

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

export type TvShowGetAllResponse<T> = {
  success: boolean;
  data: {
    tvShows: T extends true ? TvShowFull[] : TvShowBase[];
    pagination: Pagination;
  };
  message?: string;
};

// Custom hook to fetch all the tv shows
export const useFetchAllTvShows = <T extends boolean = false>({
  limit = 20,
  page = 1,
  fullDetails = false,
}: {
  limit?: number;
  page?: number;
  fullDetails?: boolean;
} = {}) => {
  return useQuery<TvShowGetAllResponse<T>, AxiosError<ApiError>>({
    queryKey: [QueryKeys.fetchAllTvShows, limit, page, fullDetails],
    placeholderData: keepPreviousData,
    staleTime: FetchAllTvShowsSlateTime,
    queryFn: ({ signal }) =>
      apiClient
        .get<TvShowGetAllResponse<T>>(Endpoints.baseTvShow, {
          params: {
            limit,
            page,
            fullDetails,
          },
          signal,
        })
        .then((res) => res.data),
  });
};
