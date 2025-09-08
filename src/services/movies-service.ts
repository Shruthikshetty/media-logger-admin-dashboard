/**
 * @file contains all the movies related services
 */

import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  FetchAllMoviesStaleTime,
  FetchMovieDetailsStaleTime,
} from '~/constants/config.constants';
import { Endpoints } from '~/constants/endpoints.constants';
import { QueryKeys } from '~/constants/query-key.constants';
import apiClient from '~/lib/api-client';
import { ApiError, FilterLimits, Pagination } from '~/types/global.types';
import { keepPreviousData } from '@tanstack/react-query';

export type MovieStatus = 'released' | 'upcoming';

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
  youtubeVideoId?: string;
}

type GetAllMoviesResponse = {
  success: boolean;
  data: {
    movies: Movie[];
    pagination: Pagination;
  };
  message?: string;
};

type GetMovieDetailsResponse = {
  success: boolean;
  data: Movie;
  message?: string;
};

type MoviesFilterRequest = {
  searchText?: string;
  genre?: string[];
  languages?: string[];
  status?: MovieStatus;
  tags?: string[];
  ageRating?: FilterLimits<number>;
  releaseDate?: FilterLimits<string | undefined>; // ISO format
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
  return useQuery<GetAllMoviesResponse, AxiosError<ApiError>>({
    queryKey: [QueryKeys.fetchMovies, limit, page],
    staleTime: FetchAllMoviesStaleTime,
    placeholderData: keepPreviousData,
    queryFn: () =>
      apiClient
        .get<GetAllMoviesResponse>(Endpoints.fetchMovies, {
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
  return useQuery<GetAllMoviesResponse, AxiosError<ApiError>>({
    queryKey: [QueryKeys.filterMovies, limit, page, restFilters],
    staleTime: FetchAllMoviesStaleTime,
    placeholderData: keepPreviousData,
    queryFn: ({ signal }) =>
      apiClient
        .post<GetAllMoviesResponse>(
          Endpoints.filterMovies,
          {
            limit,
            page,
            ...restFilters,
          },
          {
            signal, // used to cancel the request
          },
        )
        .then((res) => res.data),
  });
};

//fetch a single movie details
export const useGetMovieDetails = (movieId: string) => {
  return useQuery<GetMovieDetailsResponse, AxiosError<ApiError>>({
    queryKey: [QueryKeys.movieDetails, movieId],
    staleTime: FetchMovieDetailsStaleTime,
    enabled: Boolean(movieId),
    queryFn: ({ signal }) =>
      apiClient
        .get<GetMovieDetailsResponse>(Endpoints.fetchMovies + `/${movieId}`, {
          signal,
        })
        .then((res) => res.data),
  });
};
