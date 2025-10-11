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
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import AddEditEpisodeFormFields from './add-edit-episode-form-fields';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  addEpisodeDefaultValues,
  addTvEpisodeSchema,
  AddTvEpisodeSchemaType,
} from '~/schema/add-tv-episode-schema';
import { useAddEpisode } from '~/services/tv-episode-service';
import { useSpinnerStore } from '~/state-management/spinner-store';
import { toast } from 'sonner';
import CustomAlert from '../custom-alert';

const AddEpisodeDialog = ({
  children,
  seasonId,
  onSuccess,
}: {
  children: React.ReactNode;
  seasonId: string;
  onSuccess?: () => void;
}) => {
  //open and close state for dialog
  const [open, setOpen] = useState(false);
  //import spinner state from store
  const setSpinner = useSpinnerStore((state) => state.setShowSpinner);
  // initialize custom add episode hook
  const { mutate } = useAddEpisode();

  // create add episode form
  const addEpisodeForm = useForm<AddTvEpisodeSchemaType>({
    mode: 'onChange',
    defaultValues: addEpisodeDefaultValues,
    resolver: zodResolver(addTvEpisodeSchema),
  });

  // handle form submit
  const onSubmit = (data: AddTvEpisodeSchemaType) => {
    // start loading
    setSpinner(true);
    // make api call
    mutate(
      {
        ...data,
        season: seasonId,
        releaseDate: data?.releaseDate
          ? data.releaseDate.toISOString()
          : undefined,
      },
      {
        onSuccess: (data) => {
          // send toast
          toast.success(data?.message ?? 'Episode added successfully', {
            className: '!bg-feedback-success',
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
            <DialogTitle className="text-xl">Add Episode Details</DialogTitle>
            <DialogDescription>
              Fill in the Episode information below
            </DialogDescription>
          </DialogHeader>
          {/* Add movie form fields */}
          <AddEditEpisodeFormFields form={addEpisodeForm} onSubmit={onSubmit}>
            {/* Buttons */}
            <div className="flex flex-row justify-end gap-2 md:items-center md:justify-center">
              <CustomAlert
                onConfirm={() => addEpisodeForm.reset()}
                title={'Are you sure?'}
                description="This will reset the form. All entered data will be lost."
              >
                <Button variant={'red'} type="button" className="md:min-w-50">
                  Reset
                </Button>
              </CustomAlert>
              <Button type="submit" variant={'blue'} className="md:min-w-50">
                Add Movie <Plus strokeWidth={3} />
              </Button>
            </div>
          </AddEditEpisodeFormFields>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AddEpisodeDialog;
