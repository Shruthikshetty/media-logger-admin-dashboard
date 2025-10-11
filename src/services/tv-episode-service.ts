/**
 * @file contains the tv episode related services
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SeasonBase } from './tv-season-service';
import { TvShowBase } from './tv-show-service';
import { QueryKeys } from '~/constants/query-key.constants';
import apiClient from '~/lib/api-client';
import { Endpoints } from '~/constants/endpoints.constants';
import { FetchEpisodeDetailsStaleTime } from '~/constants/config.constants';
import { AxiosError } from 'axios';
import { ApiError } from '~/types/global.types';

export type EpisodeBase = {
  _id: string;
  title: string;
  description?: string;
  episodeNumber: number;
  releaseDate?: string;
  runTime: number;
  stillUrl?: string;
  averageRating?: number;
  createdAt: string;
  updatedAt: string;
  season: string;
};

export type EpisodeFull = {
  _id: string;
  title: string;
  description?: string;
  episodeNumber: number;
  releaseDate?: string;
  runTime: number;
  createdAt: string;
  updatedAt: string;
  season: Omit<SeasonBase, 'tvShow'> & { tvShow: TvShowBase };
};

export type AddEpisode = {
  title: string;
  description?: string;
  episodeNumber: number;
  releaseDate?: string;
  averageRating?: number;
  runTime?: number;
  stillUrl?: string;
  season: string;
};

export type UpdateEpisode = Partial<{
  title: string;
  description: string;
  episodeNumber: number;
  releaseDate: string;
  runTime: number;
  stillUrl: string;
  averageRating: number;
}>;

export type FetchEpisodeDetailsResponse<T> = {
  success: boolean;
  data: T extends true ? EpisodeFull : EpisodeBase;
};

type AddEpisodeResponse = {
  success: boolean;
  data: EpisodeBase;
  message?: string;
};

type UpdateEpisodeResponse = {
  success: boolean;
  data: EpisodeBase;
  message?: string;
};

type UpdateEpisodeRequest = {
  updatedEpisode: UpdateEpisode;
  episodeId: string;
};

//custom hook to fetch the episode details by id
export const useFetchEpisodeDetailsById = <T extends boolean = false>(
  episodeId: string,
  fullDetails = false,
) => {
  return useQuery<FetchEpisodeDetailsResponse<T>, AxiosError<ApiError>>({
    queryKey: [QueryKeys.fetchEpisodeById, episodeId],
    staleTime: FetchEpisodeDetailsStaleTime,
    enabled: !!episodeId,
    queryFn: ({ signal }) =>
      apiClient
        .get<FetchEpisodeDetailsResponse<T>>(
          Endpoints.baseEpisode + `/${episodeId}`,
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

//custom hook to add a new episode by providing season id
export const useAddEpisode = () => {
  // initialize query client
  const queryClient = useQueryClient();
  return useMutation<AddEpisodeResponse, AxiosError<ApiError>, AddEpisode>({
    mutationKey: [QueryKeys.addEpisode],
    mutationFn: (episode: AddEpisode) => {
      return apiClient
        .post(Endpoints.baseEpisode, episode)
        .then((res) => res.data);
    },
    onSuccess: () => {
      // invalidate the query after adding an episode
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.fetchTvShowByFilter],
      });
    },
  });
};

//custom hook to delete a episode by id
export const useDeleteEpisodeById = () => {
  // initialize query client
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QueryKeys.deleteEpisode],
    mutationFn: (episodeId: string) =>
      apiClient
        .delete(Endpoints.baseEpisode + `/${episodeId}`)
        .then((res) => res.data),
    onSuccess: () => {
      // invalidate the query after deleting an episode
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.fetchTvShowByFilter],
      });
    },
  });
};

//custom hook to edit a episode by id
export const useUpdateEpisodeById = () => {
  return useMutation<
    UpdateEpisodeResponse,
    AxiosError<ApiError>,
    UpdateEpisodeRequest
  >({
    mutationKey: [QueryKeys.editEpisode],
    mutationFn: ({
      episodeId,
      updatedEpisode,
    }: {
      episodeId: string;
      updatedEpisode: UpdateEpisode;
    }) =>
      apiClient
        .patch(Endpoints.baseEpisode + `/${episodeId}`, updatedEpisode)
        .then((res) => res.data),
  });
};
