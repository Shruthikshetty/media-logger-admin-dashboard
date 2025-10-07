/**
 * @file contains the tv show related services
 */

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { SeasonFull } from './tv-season-service';
import { AxiosError } from 'axios';
import { ApiError, FilterLimits, Pagination } from '~/types/global.types';
import { QueryKeys } from '~/constants/query-key.constants';
import {
  FetchAllTvShowsSlateTime,
  FetchSingleTvDetailsStaleTime,
} from '~/constants/config.constants';
import apiClient from '~/lib/api-client';
import { Endpoints } from '~/constants/endpoints.constants';

export type TvShowBase = {
  _id: string;
  title: string;
  description: string;
  releaseDate: string;
  averageRating?: number;
  genre: string[];
  cast?: string[];
  directors?: string[];
  avgRunTime?: number;
  languages?: string[];
  posterUrl?: string;
  backdropUrl?: string;
  isActive: boolean;
  status: string;
  tags?: string[];
  ageRating?: number;
  totalSeasons: number;
  totalEpisodes: number;
  youtubeVideoId?: string;
  tmdbId?: string;
  imdbId?: string;
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

export type TvShowByFilterResponse = {
  success: boolean;
  data: {
    tvShows: TvShowBase[];
    pagination: Pagination;
  };
};

export type TvShowByIdResponse<T> = {
  success: boolean;
  data: T extends true ? TvShowFull : TvShowBase;
  message?: string;
};

export type TvShowFilterRequest = Partial<{
  searchText: string;
  averageRating: number;
  releaseDate: FilterLimits<string | undefined>;
  totalEpisodes: FilterLimits<number | undefined>;
  avgRunTime: FilterLimits<number | undefined>;
  status: string;
  languages: string[];
  tags: string[];
  ageRating: FilterLimits<number | undefined>;
  totalSeasons: FilterLimits<number | undefined>;
  limit: number;
  page: number;
}>;

/**
 * Fetches all the tv shows from the api with pagination
 * @template T boolean value to determine whether to fetch full details of the tv show or not
 * @param {Object} options - options to pass to the api
 * @param {number} options.limit - number of items to fetch per page
 * @param {number} options.page - page number to fetch
 * @param {boolean} options.fullDetails - whether to fetch full details of the tv show or not
 * @returns {UseQueryResult<TvShowGetAllResponse<T>, AxiosError<ApiError>>}
 */
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

// custom hook to fetch Tv show by filter , search text
export const useFetchTvShowByFilter = ({
  limit = 20,
  page = 1,
  ...restFilters
}: TvShowFilterRequest = {}) => {
  return useQuery<TvShowByFilterResponse, AxiosError<ApiError>>({
    queryKey: [QueryKeys.fetchTvShowByFilter, limit, page, JSON.stringify(restFilters)],
    placeholderData: keepPreviousData,
    staleTime: FetchAllTvShowsSlateTime,
    queryFn: ({ signal }) =>
      apiClient
        .post<TvShowByFilterResponse>(
          Endpoints.filterTvShows,
          {
            limit,
            page,
            ...restFilters,
          },
          {
            signal,
          },
        )
        .then((res) => res.data),
  });
};

/**
 * Custom hook to fetch a tv show by its id
 * @param {string} tvShowId - the id of the tv show
 * @param {boolean} fullDetails - whether to fetch full details of the tv show or not
 * T - boolean value to determine whether to fetch full details of the tv show or not
 * @returns {UseQueryResult<TvShowByIdResponse<T>, AxiosError<ApiError>>}
 */
export const useFetchTvShowById = <T extends boolean = false>(
  tvShowId: string,
  fullDetails = false,
) => {
  return useQuery<TvShowByIdResponse<T>, AxiosError<ApiError>>({
    queryKey: [QueryKeys.fetchTvShowById, tvShowId, fullDetails],
    enabled: Boolean(tvShowId),
    staleTime: FetchSingleTvDetailsStaleTime,
    queryFn: ({ signal }) =>
      apiClient
        .get<TvShowByIdResponse<T>>(Endpoints.baseTvShow + `/${tvShowId}`, {
          params: {
            fullDetails,
          },
          signal,
        })
        .then((res) => res.data),
  });
};
