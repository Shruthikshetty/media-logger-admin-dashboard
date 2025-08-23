/**
 * user related services
 */

import { useQuery } from '@tanstack/react-query';
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
