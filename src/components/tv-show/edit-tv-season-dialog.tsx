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
import CustomAlert from '../custom-alert';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { useSpinnerStore } from '~/state-management/spinner-store';
import {
  editSeasonSchema,
  EditSeasonSchemaType,
  updateSeasonDefaultValues,
} from '~/schema/edit-tv-season-schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddEditSeasonCommonFields } from './add-edit-season-fields';
import { SeasonBase, useUpdateSeason } from '~/services/tv-season-service';
import { title } from 'process';
import { set } from 'lodash';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '~/constants/query-key.constants';

const EditSeasonDialog = ({
  children,
  existingData,
}: {
  children: React.ReactNode;
  existingData?: SeasonBase;
}) => {
  //open and close state for dialog
  const [open, setOpen] = useState(false);
  //import spinner state from store
  const setSpinner = useSpinnerStore((state) => state.setShowSpinner);
  // initialize custom edit season hook
  const { mutate } = useUpdateSeason();
  //initialize query client
  const queryClient = useQueryClient();

  // modify the existing data to required format
  const modifiedExistingData = useMemo(
    () =>
      existingData
        ? {
            seasonNumber: existingData.seasonNumber,
            title: existingData.title,
            description: existingData.description,
            releaseDate: existingData?.releaseDate
              ? new Date(existingData.releaseDate)
              : undefined,
            status: existingData.status,
            noOfEpisodes: existingData.noOfEpisodes,
            posterUrl: existingData.posterUrl,
            youtubeVideoId: existingData.youtubeVideoId,
            averageRating: existingData.averageRating,
          }
        : undefined,
    [existingData],
  );
  //create edit season form
  const updateSeasonForm = useForm<EditSeasonSchemaType>({
    mode: 'onChange',
    defaultValues: updateSeasonDefaultValues,
    resolver: zodResolver(editSeasonSchema),
  });

  // populate form with existing data
  useEffect(() => {
    if (!modifiedExistingData) return;
    updateSeasonForm.reset(modifiedExistingData);
  }, [modifiedExistingData, updateSeasonForm]);

  // handle form submit
  const onSubmit = (data: EditSeasonSchemaType) => {
    if (!existingData?._id) return;
    //start spinner
    setSpinner(true);
    //make api call
    mutate(
      {
        seasonId: existingData?._id,
        season: {
          ...data,
          releaseDate: data?.releaseDate
            ? data.releaseDate.toISOString()
            : undefined,
        },
      },
      {
        onSuccess: (data) => {
          //send toast message
          toast.success(data?.message ?? 'Season Updated successfully', {
            className: '!bg-feedback-success',
          });
          //invalidate query
          queryClient.invalidateQueries({
            queryKey: [QueryKeys.fetchTvShowById],
          });
          queryClient.invalidateQueries({
            queryKey: [QueryKeys.fetchSeasonById, existingData?._id],
          });
          //close dialog
          setOpen(false);
        },
        onError: (error) => {
          toast.error(error?.response?.data.message ?? 'Something went wrong', {
            className: '!bg-feedback-error',
          });
        },
        onSettled: () => {
          //stop spinner
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
            <DialogTitle className="text-xl">Edit Season Details</DialogTitle>
            <DialogDescription>
              Fill in the Season information below
            </DialogDescription>
          </DialogHeader>
          {/* Add episode form fields */}
          <AddEditSeasonCommonFields
            form={updateSeasonForm}
            onSubmit={onSubmit}
          >
            {/* Buttons */}
            <div className="flex flex-row justify-end gap-2 md:items-center md:justify-center">
              <CustomAlert
                onConfirm={() => updateSeasonForm.reset()}
                title={'Are you sure?'}
                description="This will reset the form. All entered data will be lost."
              >
                <Button variant={'red'} type="button" className="md:min-w-50">
                  Reset
                </Button>
              </CustomAlert>
              <Button type="submit" variant={'blue'} className="md:min-w-50">
                Update Season <Plus strokeWidth={3} />
              </Button>
            </div>
          </AddEditSeasonCommonFields>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default EditSeasonDialog;
