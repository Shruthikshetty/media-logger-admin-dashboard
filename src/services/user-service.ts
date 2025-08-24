/**
 * user related services
 */

import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { UserDataStaleTime } from '~/constants/config.constants';
import { Endpoints } from '~/constants/endpoints.constants';
import { QueryKeys } from '~/constants/query-key.constants';
import { useAuthStore, User } from '~/state-management/auth-store';
import { ApiError } from '~/types/global.types';

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

//custom hook to fetch the user details
export const useGetUserDetails = () => {
  //check if token is set
  const tokenSet = useAuthStore((s) => s.tokenSet);
  //get token
  const token = useAuthStore((s) => s.token);
  return useQuery<ResponseUserDetails, AxiosError<ApiError>>({
    queryKey: [QueryKeys.userDetails],
    enabled: tokenSet, // no token do not fetch
    staleTime: UserDataStaleTime,
    queryFn: async () =>
      axios
        .get<ResponseUserDetails>(Endpoints.userDetails, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data),
  });
};

//custom hook to update user details
export const useUpdateUserDetails = () => {
  //get token
  const token = useAuthStore((s) => s.token);
  return useMutation<
    ResponseUpdateUserDetails,
    AxiosError<ApiError>,
    RequestUpdateUserDetails
  >({
    mutationKey: [QueryKeys.updateUserDetails],
    mutationFn: (details: RequestUpdateUserDetails) =>
      axios
        .patch<ResponseUpdateUserDetails>(Endpoints.userDetails, details, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data),
  });
};
