'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from '../ui/dialog';
import {
  addMovieDefaultValues,
  addMovieSchema,
  AddMovieSchemaType,
} from '~/schema/add-movie-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import CustomAlert from '../custom-alert';
import { useAddMovie } from '~/services/movies-service';
import { toast } from 'sonner';
import { useSpinnerStore } from '~/state-management/spinner-store';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '~/constants/query-key.constants';
import AddEditMovieFormFields from './movie-add-edit-form-fields';

/**
 * This is a form to Add a new movie
 * takes a trigger as children
 */
const AddMovieDialog = ({ children }: { children: React.ReactNode }) => {
  //open and close state for dialog
  const [open, setOpen] = useState(false);
  //get spinner state from the store
  const setSpinner = useSpinnerStore((state) => state.setShowSpinner);
  // get the query client
  const queryClient = useQueryClient();
  // initialize custom add movie hook
  const { mutate, isPending } = useAddMovie();
  //create add movie form
  const addMovieForm = useForm<AddMovieSchemaType>({
    mode: 'onChange',
    defaultValues: addMovieDefaultValues,
    resolver: zodResolver(addMovieSchema),
  });

  // handle Form submit
  const onSubmit = (data: AddMovieSchemaType) => {
    setSpinner(true);
    mutate(
      {
        ...data,
        releaseDate: data.releaseDate?.toISOString(), //convert date to string
      },
      {
        onSuccess: () => {
          addMovieForm.reset(addMovieDefaultValues);
          setOpen(false);
          //  invalidate filter data
          queryClient.invalidateQueries({
            queryKey: [QueryKeys.filterMovies],
          });
          toast.success('Movie added successfully', {
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
          setSpinner(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-brand-900 border-ui-600 max-w-[95%] min-w-[70%] p-0 pb-1 lg:min-w-[60%]">
        <ScrollArea className="[&_[data-slot=scroll-area-thumb]]:hover:bg-ui-400 h-[90vh] p-4">
          <DialogHeader className="bg-brand-900 sticky top-0">
            <DialogTitle className="text-xl">Add Movie Details</DialogTitle>
            <DialogDescription>
              Fill in the movie information below
            </DialogDescription>
          </DialogHeader>
          <AddEditMovieFormFields form={addMovieForm} onSubmit={onSubmit}>
            {/* Buttons */}
            <div className="flex flex-row justify-end gap-2 md:items-center md:justify-center">
              <CustomAlert
                onConfirm={() => addMovieForm.reset()}
                title={'Are you sure?'}
                description="This will reset the form. All entered data will be lost."
              >
                <Button
                  variant={'red'}
                  type="button"
                  className="md:min-w-50"
                  disabled={isPending}
                  aria-disabled={isPending}
                >
                  Reset
                </Button>
              </CustomAlert>
              <Button
                type="submit"
                variant={'blue'}
                className="md:min-w-50"
                disabled={isPending}
                aria-disabled={isPending}
              >
                Add Movie <Plus strokeWidth={3} />
              </Button>
            </div>
          </AddEditMovieFormFields>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AddMovieDialog;
