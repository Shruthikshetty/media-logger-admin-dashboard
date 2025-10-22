/**
 * @file contains the tv show related services
 */

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AddSeason, SeasonFull } from './tv-season-service';
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

export type AddTvShow = {
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
  seasons?: Omit<AddSeason, 'tvShow'>[];
};

type TvShowDeleteCount = {
  tvShow: number;
  seasons: number;
  episodes: number;
};

export type DeleteTvShowResponse = {
  success: boolean;
  data: {
    deletedCount: TvShowDeleteCount;
  };
  message?: string;
};

type AddTvShowResponse = {
  success: boolean;
  data: TvShowBase;
  message?: string;
};

export type UpdateTvShow = Partial<Omit<AddTvShow, 'seasons'>>;

type UpdateTvShowRequest = {
  tvShowId: string;
  newTvShow: UpdateTvShow;
};

type UpdateTvShowResponse = {
  success: boolean;
  data: {
    tvShow: TvShowBase;
  };
  message?: string;
};

type BulkAddTvShowResponse = {
  success: boolean;
  message?: string;
  data: TvShowFull[];
};

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
    queryKey: [
      QueryKeys.fetchTvShowByFilter,
      limit,
      page,
      JSON.stringify(restFilters),
    ],
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

// custom hook to add a tv show
export const useAddTvShow = () => {
  // initialize the query client
  const queryClient = useQueryClient();
  return useMutation<AddTvShowResponse, AxiosError<ApiError>, AddTvShow>({
    mutationKey: [QueryKeys.addTvShow],
    mutationFn: (tvShow: AddTvShow) =>
      apiClient.post(Endpoints.baseTvShow, tvShow).then((res) => res.data),
    onSuccess: () => {
      // invalidate the query after adding a tv show
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.fetchTvShowByFilter],
      });
    },
  });
};

//custom hook to delete a tv show by id
export const useDeleteTvShowById = () => {
  // initialize the query client
  const queryClient = useQueryClient();
  return useMutation<DeleteTvShowResponse, AxiosError<ApiError>, string>({
    mutationKey: [QueryKeys.deleteTvShow],
    mutationFn: (tvShowId: string) =>
      apiClient
        .delete(Endpoints.baseTvShow + `/${tvShowId}`)
        .then((res) => res.data),
    onSuccess: () => {
      // invalidate the query after deleting a tv show
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.fetchTvShowByFilter],
      });
    },
  });
};

//custom hook to edit a tv show
export const useUpdateTvShow = () => {
  // initialize the query client
  const queryClient = useQueryClient();
  return useMutation<
    UpdateTvShowResponse,
    AxiosError<ApiError>,
    UpdateTvShowRequest
  >({
    mutationKey: [QueryKeys.editTvShow],
    mutationFn: ({ newTvShow, tvShowId }: UpdateTvShowRequest) =>
      apiClient
        .patch(Endpoints.baseTvShow + `/${tvShowId}`, newTvShow)
        .then((res) => res.data),
    onSuccess: () => {
      // invalidate the query after deleting a tv show
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.fetchTvShowByFilter],
      });
    },
  });
};

//custom hook to bulk add tv shows
export const useBulkAddTvShowJson = () => {
  // initialize the query client
  const queryClient = useQueryClient();
  return useMutation<BulkAddTvShowResponse, AxiosError<ApiError>, File>({
    mutationKey: [QueryKeys.bulkAddTvShow],
    mutationFn: (file: File) => {
      // create form data
      const formData = new FormData();
      formData.append('tvShowDataFile', file);
      return apiClient
        .post<BulkAddTvShowResponse>(Endpoints.bulkTvShow, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => res.data);
    },
    onSuccess: () => {
      // invalidate the query after deleting a tv show
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.fetchTvShowByFilter],
      });
    },
  });
};

// custom hook to bulk delete tv show
export const useBulkDeleteTvShow = () => {
  // initialize the query client
  const queryClient = useQueryClient();
  return useMutation<DeleteTvShowResponse, AxiosError<ApiError>, string[]>({
    mutationKey: [QueryKeys.bulkDeleteTvShow],
    mutationFn: (tvShowIds: string[]) =>
      apiClient
        .delete<DeleteTvShowResponse>(Endpoints.bulkTvShow, {
          data: {
            tvShowIds,
          },
        })
        .then((res) => res.data),
    onSuccess: () => {
      // invalidate the query after deleting a tv show
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.fetchTvShowByFilter],
      });
    },
  });
};
