import React, { useEffect, useMemo, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { TvShowBase, useUpdateTvShow } from '~/services/tv-show-service';
import { ScrollArea } from '../ui/scroll-area';
import { useForm } from 'react-hook-form';
import {
  updateTvShowDefaultValues,
  updateTvShowSchema,
  UpdateTvShowSchemaType,
} from '~/schema/update-tv-show-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '../ui/form';
import { AddEditTvShowCommonFields } from './add-edit-tv-show-fields';
import CustomAlert from '../custom-alert';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { useSpinnerStore } from '~/state-management/spinner-store';
import { toast } from 'sonner';

/**
 * This contains the edit tv show details dialog
 * containing the edit tv show form this takes in the
 * existing tv show details
 * @returns {JSX.Element}
 */
const EditTvShowDialog = ({
  children,
  existingData,
  onSuccess,
}: {
  children: React.ReactNode;
  existingData?: TvShowBase;
  onSuccess?: () => void;
}) => {
  //open and close state for dialog
  const [open, setOpen] = useState(false);
  // initialize custom hook to update a tv show
  const { mutate } = useUpdateTvShow();
  //get spinner state from the store
  const setSpinner = useSpinnerStore((state) => state.setShowSpinner);
  // modify the existing data to required format
  const modifiedExistingData = useMemo(
    () =>
      existingData
        ? {
            title: existingData.title,
            description: existingData?.description ?? '',
            averageRating: existingData?.averageRating,
            genre: existingData?.genre ?? [],
            releaseDate: new Date(existingData.releaseDate),
            cast: existingData?.cast ?? [],
            directors: existingData?.directors ?? [],
            avgRunTime: existingData?.avgRunTime,
            languages: existingData?.languages ?? [],
            posterUrl: existingData?.posterUrl,
            backdropUrl: existingData?.backdropUrl,
            isActive: existingData.isActive,
            status: existingData.status,
            tags: existingData?.tags ?? [],
            totalSeasons: existingData.totalSeasons,
            totalEpisodes: existingData.totalEpisodes,
            tmdbId: existingData.tmdbId,
            imdbId: existingData.imdbId,
          }
        : undefined,
    [existingData],
  );
  //create edit tv show form
  const editTvShowForm = useForm<UpdateTvShowSchemaType>({
    mode: 'onChange',
    defaultValues: updateTvShowDefaultValues,
    resolver: zodResolver(updateTvShowSchema),
  });

  // populate form with existing data
  useEffect(() => {
    if (!modifiedExistingData) return;
    editTvShowForm.reset(modifiedExistingData);
  }, [modifiedExistingData, editTvShowForm]);

  // handle form submit
  const onSubmit = (data: UpdateTvShowSchemaType) => {
    if (!existingData) return;
    //show spinner
    setSpinner(true);
    //call custom hook to update a tv show
    mutate(
      {
        newTvShow: {
          ...data,
          releaseDate: data.releaseDate.toISOString(),
        },
        tvShowId: existingData?._id,
      },
      {
        onSuccess: (data) => {
          // send a toast message
          toast.success(data?.message ?? 'Tv Show updated successfully', {
            className: '!bg-feedback-success',
          });
          //reset form
          editTvShowForm.reset(updateTvShowDefaultValues);
          // run onSuccess callback
          onSuccess?.();
          // close the dialog
          setOpen(false);
        },
        onError: (data) => {
          toast.error(data?.response?.data.message ?? 'Something went wrong', {
            classNames: {
              toast: '!bg-feedback-error',
            },
          });
        },
        onSettled: () => {
          // stop loading
          setSpinner(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-brand-900 border-ui-600 max-w-[95%] min-w-[70%] p-0 pb-1 lg:min-w-[60%]">
        <ScrollArea className="[&_[data-slot=scroll-area-thumb]]:hover:bg-ui-400 max-h-[90vh] p-4">
          <DialogHeader className="bg-brand-900 sticky top-0">
            <DialogTitle className="text-xl">Edit Tv show Details</DialogTitle>
            <DialogDescription>
              Fill in the Tv show information below
            </DialogDescription>
          </DialogHeader>
          <Form {...editTvShowForm}>
            <form
              onSubmit={editTvShowForm.handleSubmit(onSubmit)}
              className="mt-2 flex flex-col gap-4"
            >
              {/* Form fields */}
              <AddEditTvShowCommonFields />
              {/* Buttons */}
              <div className="flex flex-row justify-end gap-2 md:items-center md:justify-center">
                <CustomAlert
                  onConfirm={() => {
                    editTvShowForm.reset();
                  }}
                  title={'Are you sure?'}
                  description="This will reset the form. All entered data will be lost."
                >
                  <Button variant={'red'} type="button" className="md:min-w-50">
                    Reset
                  </Button>
                </CustomAlert>
                <Button type="submit" variant={'blue'} className="md:min-w-50">
                  Update Tv show <Plus strokeWidth={3} />
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default EditTvShowDialog;
