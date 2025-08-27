// this file contains the auth related services

import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { Endpoints } from '~/constants/endpoints.constants';
import { QueryKeys } from '~/constants/query-key.constants';
import { ApiError } from '~/types/global.types';
import apiClient from '~/lib/api-client';

type RequestAuthType = {
  email: string;
  password: string;
};

type ResponseAuthType = {
  success: boolean;
  data: {
    token: string;
  };
  message?: string;
};

/**
 * Custom hook to handle login user mutation.
 */
export const useLoginUser = () => {
  return useMutation<ResponseAuthType, AxiosError<ApiError>, RequestAuthType>({
    mutationKey: [QueryKeys.login],
    mutationFn: (req: RequestAuthType) =>
      apiClient
        .post<ResponseAuthType>(Endpoints.login, req)
        .then((res) => res.data),
  });
};
