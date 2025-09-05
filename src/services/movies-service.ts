/**
 * @file contains all the movies related services
 */

import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { FetchAllMoviesStaleTime } from '~/constants/config.constants';
import { Endpoints } from '~/constants/endpoints.constants';
import { QueryKeys } from '~/constants/query-key.constants';
import apiClient from '~/lib/api-client';
import { ApiError, FilterLimits, Pagination } from '~/types/global.types';
import { keepPreviousData } from '@tanstack/react-query';

type MovieStatus = 'released' | 'upcoming';

export interface Movie {
  _id: string;
  title: string;
  description: string;
  averageRating?: number;
  genre: string[];
  releaseDate: string;
  cast?: string[];
  directors?: string[];
  runTime: number;
  languages: string[];
  posterUrl?: string;
  backdropUrl?: string;
  isActive: boolean;
  status: string;
  tags?: string[];
  ageRating?: number;
  trailerYoutubeUrl?: string;
}

type MoviesResponse = {
  success: boolean;
  data: {
    movies: Movie[];
    pagination: Pagination;
  };
  message?: string;
};

type MoviesFilterRequest = {
  searchText?: string;
  genre?: string[];
  languages?: string[];
  status?: MovieStatus;
  tags?: string[];
  ageRating?: number;
  releaseDate?: FilterLimits<string>; // ISO format
  runTime?: FilterLimits<number>;
  averageRating?: number;
  page?: number;
  limit?: number;
};

//get all the movies from the api with pagination
export const useFetchMovies = ({
  limit = 20,
  page = 1,
}: {
  limit?: number;
  page?: number;
} = {}) => {
  return useQuery<MoviesResponse, AxiosError<ApiError>>({
    queryKey: [QueryKeys.fetchMovies, limit, page],
    staleTime: FetchAllMoviesStaleTime,
    placeholderData: keepPreviousData,
    queryFn: () =>
      apiClient
        .get<MoviesResponse>(Endpoints.fetchMovies, {
          params: {
            limit,
            page,
          },
        })
        .then((res) => res.data),
  });
};

//custom hook to get all movies with filter , search text
export const useFilterMovies = ({
  limit = 20,
  page = 1,
  ...restFilters
}: MoviesFilterRequest = {}) => {
  return useQuery<MoviesResponse, AxiosError<ApiError>>({
    queryKey: [QueryKeys.filterMovies, limit, page, restFilters],
    staleTime: FetchAllMoviesStaleTime,
    placeholderData: keepPreviousData,
    queryFn: () =>
      apiClient
        .post<MoviesResponse>(Endpoints.filterMovies, {
          limit,
          page,
          ...restFilters,
        })
        .then((res) => res.data),
  });
};
