/**
 * all upload related services
 */

import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Endpoints } from '~/constants/endpoints.constants';
import { QueryKeys } from '~/constants/query-key.constants';
import apiClient from '~/lib/api-client';
import { ApiError } from '~/types/global.types';

type ResponseUploadImage = {
  success: boolean;
  data: {
    url: string;
  };
  message: string;
};

//custom hook to upload image
export const useUploadImage = () => {
  return useMutation<ResponseUploadImage, AxiosError<ApiError>, File>({
    mutationKey: [QueryKeys.uploadImage],
    mutationFn: async (file: File) => {
      // convert image file to form data
      const formData = new FormData();
      formData.append('image', file);
      return apiClient
        .post<ResponseUploadImage>(Endpoints.uploadImage, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => res.data);
    },
  });
};
