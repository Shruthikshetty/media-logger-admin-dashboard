/**
 * user related services
 */

import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  AllUsersDataStaleTime,
  UserDataStaleTime,
} from '~/constants/config.constants';
import { Endpoints } from '~/constants/endpoints.constants';
import { QueryKeys } from '~/constants/query-key.constants';
import { useAuthStore, User } from '~/state-management/auth-store';
import { ApiError, Pagination } from '~/types/global.types';
import apiClient from '~/lib/api-client';

type ResponseUserDetails = {
  success: boolean;
  data: User;
};

type ResponseUpdateUserDetails = {
  success: boolean;
  data: User;
  message: string;
};

type RequestUpdateUserDetails = Partial<{
  name: string;
  email: string;
  password: string;
  bio: string;
  location: string;
  profileImg: string;
  xp: number;
}>;

type ResponseAllUsers = {
  success: boolean;
  data: {
    users: User[];
    pagination: Pagination;
  };
};

type UserFiltersRequest = {
  page?: number;
  limit?: number;
  searchText?: string;
  role?: string;
};

//custom hook to fetch the user details
export const useGetUserDetails = () => {
  //check if token is set
  const tokenSet = useAuthStore((s) => s.tokenSet);
  return useQuery<ResponseUserDetails, AxiosError<ApiError>>({
    queryKey: [QueryKeys.userDetails],
    enabled: tokenSet, // no token do not fetch
    staleTime: UserDataStaleTime,
    queryFn: async () =>
      apiClient
        .get<ResponseUserDetails>(Endpoints.baseUser)
        .then((res) => res.data),
  });
};

//custom hook to update user details
export const useUpdateUserDetails = () => {
  return useMutation<
    ResponseUpdateUserDetails,
    AxiosError<ApiError>,
    RequestUpdateUserDetails
  >({
    mutationKey: [QueryKeys.updateUserDetails],
    mutationFn: (details: RequestUpdateUserDetails) =>
      apiClient
        .patch<ResponseUpdateUserDetails>(Endpoints.baseUser, details)
        .then((res) => res.data),
  });
};

//get all users
export const useFetchAllUsers = ({
  limit = 20,
  page = 1,
}: {
  limit?: number;
  page?: number;
} = {}) => {
  return useQuery<ResponseAllUsers, AxiosError<ApiError>>({
    queryKey: [QueryKeys.allUsers, limit, page],
    staleTime: AllUsersDataStaleTime,
    queryFn: ({ signal }) =>
      apiClient
        .get<ResponseAllUsers>(Endpoints.allUsers, {
          params: {
            limit,
            page,
          },
          signal,
        })
        .then((res) => res.data),
  });
};

//get users by filter
export const useFilterUsers = (filters?: UserFiltersRequest) => {
  return useQuery<ResponseAllUsers, AxiosError<ApiError>>({
    queryKey: [QueryKeys.filterUsers, filters],
    staleTime: AllUsersDataStaleTime,
    queryFn: ({ signal }) =>
      apiClient
        .post<ResponseAllUsers>(Endpoints.filterUsers, filters, {
          signal,
        })
        .then((res) => res.data),
  });
};
