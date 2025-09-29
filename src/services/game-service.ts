/**
 * @file contains the game related services
 */

import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
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

type GetGameDetailsResponse = {
  success: boolean;
  data: Game;
};

type AddGameResponse = {
  success: boolean;
  data: Game;
  message: string;
};

type GetAllGamesResponse = {
  data: {
    games: Game[];
    pagination: Pagination;
  };
  message?: string;
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

type AddGameRequest = {
  title: string;
  description: string;
  averageRating?: number;
  genre?: string[];
  releaseDate: string;
  posterUrl?: string;
  backdropUrl?: string;
  isActive?: boolean;
  status?: gameStatus;
  platforms?: string[];
  avgPlaytime?: number;
  developer?: string;
  ageRating?: number;
  trailerYoutubeUrl?: number;
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

//custom hook to get game details by id
export const useGetGameDetailsById = (gameId: string) => {
  return useQuery<GetGameDetailsResponse, AxiosError<ApiError>>({
    queryKey: [QueryKeys.gameDetailsById, gameId],
    staleTime: FetchAllGamesSlateTime,
    enabled: !!gameId,
    queryFn: ({ signal }) =>
      apiClient
        .get<GetGameDetailsResponse>(Endpoints.baseGame + `/${gameId}`, {
          signal,
        })
        .then((res) => res.data),
  });
};

// custom hook to add a game
export const useAddGame = () => {
  return useMutation<AddGameResponse, AxiosError<ApiError>, AddGameRequest>({
    mutationKey: [QueryKeys.addGame],
    mutationFn: (game: AddGameRequest) =>
      apiClient.post(Endpoints.baseGame, game).then((res) => res.data),
  });
};
