/**
 * @file contains all the movies related services
 */

import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Endpoints } from '~/constants/endpoints.constants';
import { QueryKeys } from '~/constants/query-key.constants';
import apiClient from '~/lib/api-client';
import { ApiError, Pagination } from '~/types/global.types';

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

//get all the movies
export const useFetchMovies = () => {
  return useMutation<MoviesResponse, AxiosError<ApiError>>({
    mutationKey: [QueryKeys.fetchMovies],
    mutationFn: () =>
      apiClient
        .get<MoviesResponse>(Endpoints.fetchMovies)
        .then((res) => res.data),
  });
};
