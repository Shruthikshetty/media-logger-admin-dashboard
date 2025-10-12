'use client';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { ScrollArea } from '../ui/scroll-area';
import AddEditEpisodeFormFields from './add-edit-episode-form-fields';
import CustomAlert from '../custom-alert';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import {
  addEpisodeDefaultValues,
  addTvEpisodeSchema,
  AddTvEpisodeSchemaType,
} from '~/schema/add-tv-episode-schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  EpisodeBase,
  useUpdateEpisodeById,
} from '~/services/tv-episode-service';
import { useSpinnerStore } from '~/state-management/spinner-store';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { QueryKeys } from '~/constants/query-key.constants';

/**
 * A dialog component to edit an episode.
 * @param {React.ReactNode} children - The children elements to be rendered.
 * @param {() => void} onSuccess - An optional callback to be executed when the episode is updated successfully.
 * @param {EpisodeBase} existingData - The existing episode data to be populated in the form.
 */
const EditEpisodeDialog = ({
  children,
  onSuccess,
  existingData,
}: {
  children: React.ReactNode;
  onSuccess?: () => void;
  existingData?: EpisodeBase;
}) => {
  //open and close state for dialog
  const [open, setOpen] = useState(false);
  //initialize custom hook to update episode
  const { mutate } = useUpdateEpisodeById();
  // get the spinner state from the store
  const setSpinner = useSpinnerStore((state) => state.setShowSpinner);
  //initialize the query client
  const queryClient = useQueryClient();
  // modify the existing data to required format
  const modifiedExistingData = useMemo(
    () =>
      existingData
        ? {
            title: existingData.title,
            description: existingData?.description,
            episodeNumber: existingData.episodeNumber,
            runTime: existingData?.runTime,
            stillUrl: existingData?.stillUrl,
            averageRating: existingData?.averageRating,
            releaseDate: existingData?.releaseDate
              ? new Date(existingData.releaseDate)
              : undefined,
          }
        : undefined,
    [existingData],
  );

  // create update episode form
  const updateEpisodeForm = useForm<AddTvEpisodeSchemaType>({
    mode: 'onChange',
    defaultValues: addEpisodeDefaultValues,
    resolver: zodResolver(addTvEpisodeSchema),
  });

  // populate form with existing data
  useEffect(() => {
    if (!modifiedExistingData) return;
    updateEpisodeForm.reset(modifiedExistingData);
  }, [modifiedExistingData, updateEpisodeForm]);

  // handle form submit
  const onSubmit = (data: AddTvEpisodeSchemaType) => {
    if (!existingData?._id) return;
    //start loading
    setSpinner(true);
    // make api call to update the episode
    mutate(
      {
        episodeId: existingData?._id,
        updatedEpisode: {
          ...data,
          releaseDate: data?.releaseDate
            ? data.releaseDate?.toISOString()
            : undefined,
        },
      },
      {
        onSuccess: (data) => {
          // send toast
          toast.success(data?.message ?? 'Episode Updated successfully', {
            className: '!bg-feedback-success',
          });
          // invalidate query
          queryClient.invalidateQueries({
            queryKey: [QueryKeys.fetchSeasonById, data.data.season],
          });
          // run onSuccess callback
          onSuccess?.();
          // close dialog
          setOpen(false);
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
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-brand-900 border-ui-600 max-w-[95%] min-w-[70%] p-0 pb-1 lg:min-w-[60%]">
        <ScrollArea className="[&_[data-slot=scroll-area-thumb]]:hover:bg-ui-400 max-h-[90vh] p-4">
          <DialogHeader className="bg-brand-900 sticky top-0">
            <DialogTitle className="text-xl">
              Update Episode Details
            </DialogTitle>
            <DialogDescription>
              Fill in the Episode information below
            </DialogDescription>
          </DialogHeader>
          {/* Add movie form fields */}
          <AddEditEpisodeFormFields
            form={updateEpisodeForm}
            onSubmit={onSubmit}
          >
            {/* Buttons */}
            <div className="flex flex-row justify-end gap-2 md:items-center md:justify-center">
              <CustomAlert
                onConfirm={() => updateEpisodeForm.reset()}
                title={'Are you sure?'}
                description="This will reset the form. All entered data will be lost."
              >
                <Button variant={'red'} type="button" className="md:min-w-50">
                  Reset
                </Button>
              </CustomAlert>
              <Button type="submit" variant={'blue'} className="md:min-w-50">
                Update Episode <Plus strokeWidth={3} />
              </Button>
            </div>
          </AddEditEpisodeFormFields>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default EditEpisodeDialog;
