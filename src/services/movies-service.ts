/**
 * @file contains all the movies related services
 */

import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { FetchAllMoviesStaleTime } from '~/constants/config.constants';
import { Endpoints } from '~/constants/endpoints.constants';
import { QueryKeys } from '~/constants/query-key.constants';
import apiClient from '~/lib/api-client';
import { ApiError, Pagination } from '~/types/global.types';
import { keepPreviousData } from '@tanstack/react-query';

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

//get all the movies from the api with pagination
export const useFetchMovies = (
  params: { limit?: number; page?: number } = {
    limit: 20,
    page: 1,
  },
) => {
  return useQuery<MoviesResponse, AxiosError<ApiError>>({
    queryKey: [QueryKeys.fetchMovies, params.limit, params.page],
    staleTime: FetchAllMoviesStaleTime,
    placeholderData: keepPreviousData,
    queryFn: () =>
      apiClient
        .get<MoviesResponse>(
          `${Endpoints.fetchMovies}?limit=${params.limit}&page=${params.page}`,
        )
        .then((res) => res.data),
  });
};
