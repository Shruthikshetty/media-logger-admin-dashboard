import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { ApiError } from '~/types/global.types';

/*catch any unexpected error while fetching any api
 *@params isError: boolean
 *@params error: AxiosError
 *only accepts custom defined ApiError
 */
export const useUnexpectedErrorToast = ({
  error,
  isError,
}: {
  isError: boolean;
  error: AxiosError<ApiError> | null;
}) => {
  useEffect(() => {
    if (isError) {
      toast.error(
        error?.response?.data.message ??
          error?.message ??
          'Something went wrong',
        {
          classNames: {
            toast: '!bg-feedback-error',
          },
        },
      );
    }
  }, [isError, error]);
};
