'use client';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from './ui/dialog';
import {
  addMovieDefaultValues,
  addMovieSchema,
  AddMovieSchemaType,
} from '~/schema/add-movie-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import CustomAlert from './custom-alert';
import {
  Movie,
  UpdateMovieRequest,
  useUpdateMovie,
} from '~/services/movies-service';
import { toast } from 'sonner';
import { useSpinnerStore } from '~/state-management/spinner-store';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '~/constants/query-key.constants';
import AddEditMovieFormFields from './movie-add-edit-form-fields';

/**
 * This is a form to edit a existing movie
 * takes a trigger as children
 */
const EditMovieDialog = ({
  children,
  existingData,
  onSuccess,
}: {
  children: React.ReactNode;
  existingData?: Movie;
  onSuccess?: () => void;
}) => {
  //open and close state for dialog
  const [open, setOpen] = useState(false);
  //get spinner state from the store
  const setSpinner = useSpinnerStore((state) => state.setShowSpinner);
  // get the query client
  const queryClient = useQueryClient();
  // initialize custom update movie hook
  const { mutate } = useUpdateMovie();
  // modify the existing movie to required format
  const modifiedExistingData = useMemo(
    () => ({
      ...existingData,
      releaseDate: existingData?.releaseDate
        ? new Date(existingData?.releaseDate)
        : undefined,
    }),
    [existingData],
  );

  //create add movie form
  const updateMovieForm = useForm<AddMovieSchemaType>({
    mode: 'onChange',
    defaultValues: modifiedExistingData ?? addMovieDefaultValues,
    resolver: zodResolver(addMovieSchema),
  });

  // populate form with existing data
  useEffect(() => {
    if (!modifiedExistingData) return;
    updateMovieForm.reset(modifiedExistingData);
  }, [modifiedExistingData, updateMovieForm]);

  // handle Form submit and update movie
  const onSubmit = (data: AddMovieSchemaType) => {
    if (!existingData) return;
    // start loading
    setSpinner(true);
    // generate a request body
    const requestBody: UpdateMovieRequest = {
      movie: {
        ...data,
        releaseDate: data.releaseDate?.toISOString(), //convert date to string
      },
      movieId: existingData?._id,
    };
    // make update movie request
    mutate(requestBody, {
      onSuccess: () => {
        setOpen(false);
        //  invalidate filter data
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.filterMovies],
        });
        onSuccess?.();
        toast.success('Movie updated successfully', {
          classNames: {
            toast: '!bg-feedback-success',
          },
        });
      },
      onError: (error) => {
        toast.error(error?.response?.data.message ?? 'Something went wrong', {
          classNames: {
            toast: '!bg-feedback-error',
          },
        });
      },
      onSettled: () => {
        // stop loading
        setSpinner(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-brand-900 border-ui-600 max-w-[95%] min-w-[70%] p-0 pb-1 lg:min-w-[60%]">
        <ScrollArea className="[&_[data-slot=scroll-area-thumb]]:hover:bg-ui-400 h-[90vh] p-4">
          <DialogHeader className="bg-brand-900 sticky top-0">
            <DialogTitle className="text-xl">Update Movie details</DialogTitle>
            <DialogDescription>
              Modify the existing movie details
            </DialogDescription>
          </DialogHeader>
          <AddEditMovieFormFields form={updateMovieForm} onSubmit={onSubmit}>
            {/* Buttons */}
            <div className="flex flex-row justify-end gap-2 md:items-center md:justify-center">
              <CustomAlert
                onConfirm={() => updateMovieForm.reset()}
                title={'Are you sure?'}
                description="This will reset the form , All data entered will be lost."
              >
                <Button variant={'red'} type="button" className="md:min-w-50">
                  Reset
                </Button>
              </CustomAlert>
              <Button type="submit" variant={'blue'} className="md:min-w-50">
                Update Movie <Plus strokeWidth={3} />
              </Button>
            </div>
          </AddEditMovieFormFields>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default EditMovieDialog;
