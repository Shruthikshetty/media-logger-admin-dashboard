'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { ScrollArea } from '../ui/scroll-area';
import CustomAlert from '../custom-alert';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import {
  addSeasonDefaultValues,
  addSeasonSchema,
  AddSeasonSchemaType,
} from '~/schema/add-season-schema';
import { useForm } from 'react-hook-form';
import {
  AddSeasonEpisodeArrayFields,
  AddEditSeasonCommonFields,
} from './add-edit-season-fields';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddSeason } from '~/services/tv-season-service';
import { useSpinnerStore } from '~/state-management/spinner-store';
import { toast } from 'sonner';

/**
 * A dialog component to add a new season to a TV show.
 * It accepts children as a trigger to open the dialog.
 * @param {React.ReactNode} children The element that will trigger the dialog when clicked.
 * @returns {JSX.Element} The dialog component.
 */
const AddSeasonDialog = ({
  children,
  tvShowId,
  onSuccess,
}: {
  children: React.ReactNode;
  tvShowId?: string;
  onSuccess?: () => void;
}) => {
  //open and close state for dialog
  const [open, setOpen] = useState(false);
  // import custom hook to add a season
  const { mutate } = useAddSeason();
  // get the spinner state from the store
  const setSpinner = useSpinnerStore((state) => state.setShowSpinner);
  //create add season form
  const addSeasonForm = useForm<AddSeasonSchemaType>({
    mode: 'onChange',
    defaultValues: addSeasonDefaultValues,
    resolver: zodResolver(addSeasonSchema),
  });

  //handle on form submit
  const onSubmit = (data: AddSeasonSchemaType) => {
    if (!tvShowId) return;
    // start loading spinner
    setSpinner(true);
    // make api call
    mutate(
      {
        ...data,
        releaseDate: data?.releaseDate
          ? data.releaseDate.toISOString()
          : undefined,
        episodes:
          data?.episodes?.map((episode) => ({
            ...episode,
            releaseDate: episode?.releaseDate
              ? episode.releaseDate.toISOString()
              : undefined,
          })) ?? [],
        tvShow: tvShowId,
      },
      {
        onSuccess: (data) => {
          toast.success(data?.message ?? 'Season added successfully', {
            className: '!bg-feedback-success',
          });
          //clear form
          addSeasonForm.reset(addSeasonDefaultValues);
          onSuccess?.();
          // close dialog
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
          // stop loading spinner
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
            <DialogTitle className="text-xl">Add Season Details</DialogTitle>
            <DialogDescription>
              Fill in the Season information below
            </DialogDescription>
          </DialogHeader>
          {/* Add season form fields */}
          <AddEditSeasonCommonFields form={addSeasonForm} onSubmit={onSubmit}>
            <AddSeasonEpisodeArrayFields form={addSeasonForm} />
            {/* Buttons */}
            <div className="flex flex-row justify-end gap-2 md:items-center md:justify-center">
              <CustomAlert
                onConfirm={() => addSeasonForm.reset(addSeasonDefaultValues)}
                title={'Are you sure?'}
                description="This will reset the form. All entered data will be lost."
              >
                <Button variant={'red'} type="button" className="md:min-w-50">
                  Reset
                </Button>
              </CustomAlert>
              <Button type="submit" variant={'blue'} className="md:min-w-50">
                Add Season <Plus strokeWidth={3} />
              </Button>
            </div>
          </AddEditSeasonCommonFields>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AddSeasonDialog;
