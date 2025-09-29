/**
 * @file contains the game related services
 */

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { FetchAllGamesSlateTime } from '~/constants/config.constants';
import { Endpoints } from '~/constants/endpoints.constants';
import { QueryKeys } from '~/constants/query-key.constants';
import apiClient from '~/lib/api-client';
import { ApiError, FilterLimits, Pagination } from '~/types/global.types';

// game Status
export type gameStatus = 'released' | 'upcoming';

// service to get all the games data
export type Game = {
  _id: string;
  title: string;
  description: string;
  averageRating?: number;
  genre: string[];
  releaseDate: string;
  posterUrl?: string;
  backdropUrl?: string;
  isActive: boolean;
  status: gameStatus;
  platforms: string[];
  avgPlaytime?: number;
  developer?: string;
  ageRating?: number;
  trailerYoutubeUrl?: number;
  createdAt: string;
  updatedAt: string;
};

type GamesFilterRequest = {
  searchText?: string;
  averageRating?: number;
  genre?: string[];
  ageRating?: FilterLimits<number>;
  releaseDate?: FilterLimits<string | undefined>;
  platforms?: string[];
  avgPlaytime?: FilterLimits<number | undefined>;
  status?: gameStatus;
  page?: number;
  limit?: number;
};

type GetAllGamesResponse = {
  data: {
    games: Game[];
    pagination: Pagination;
  };
  message?: string;
};

//custom query hook to get all the games
export const useGetAllGames = ({
  limit = 20,
  page = 1,
}: {
  limit?: number;
  page?: number;
} = {}) => {
  return useQuery<GetAllGamesResponse, AxiosError<ApiError>>({
    queryKey: [QueryKeys.fetchAllGames, limit, page],
    staleTime: FetchAllGamesSlateTime,
    placeholderData: keepPreviousData,
    queryFn: ({ signal }) =>
      apiClient
        .get<GetAllGamesResponse>(Endpoints.baseGame, {
          params: {
            limit,
            page,
          },
          signal,
        })
        .then((res) => res.data),
  });
};

// custom hook to get all the games with filter , search text
export const useFilterGames = ({
  limit = 20,
  page = 1,
  ...restFilters
}: GamesFilterRequest = {}) => {
  return useQuery<GetAllGamesResponse, AxiosError<ApiError>>({
    queryKey: [QueryKeys.filterGames, limit, page, restFilters],
    staleTime: FetchAllGamesSlateTime,
    placeholderData: keepPreviousData,
    queryFn: ({ signal }) =>
      apiClient
        .post<GetAllGamesResponse>(
          Endpoints.filterGames,
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
