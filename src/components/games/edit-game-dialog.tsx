'use client';
import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Game,
  UpdateGameRequest,
  useUpdateGame,
} from '~/services/game-service';
import { useSpinnerStore } from '~/state-management/spinner-store';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { ScrollArea } from '../ui/scroll-area';
import AddEditGameFormFields from './game-add-edit-form-fields';
import CustomAlert from '../custom-alert';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import {
  addGameDefaultValues,
  addGameSchema,
  AddGameSchemaType,
} from '~/schema/add-game-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { QueryKeys } from '~/constants/query-key.constants';
import { toast } from 'sonner';

/**
 * A dialog component to edit a game's details.
 * It accepts children as a trigger to open the dialog.
 * The dialog contains a form with fields to enter the game's details.
 * The dialog also contains a submit button to update the game.
 * The dialog is closed when the game is updated successfully.
 * @param {React.ReactNode} children The element that will trigger the dialog when clicked.
 * @param {Game} existingData The existing game data to be edited.
 * @param {() => void} onSuccess A callback function to be called when the game is updated successfully.
 */
const EditGameDialog = ({
  children,
  existingData,
  onSuccess,
}: {
  children: React.ReactNode;
  existingData?: Game;
  onSuccess?: () => void;
}) => {
  //open and close state for dialog
  const [open, setOpen] = useState(false);
  //get spinner state from the store
  const setSpinner = useSpinnerStore((state) => state.setShowSpinner);
  // get the query client
  const queryClient = useQueryClient();
  // import custom hook to update a game
  const { mutate } = useUpdateGame();
  // modify the existing game data  to required format
  const modifiedExistingData = useMemo(
    () =>
      existingData
        ? {
            ...existingData,
            releaseDate: existingData.releaseDate
              ? new Date(existingData.releaseDate)
              : undefined,
          }
        : undefined,
    [existingData],
  );
  //create add game form
  const updateGameForm = useForm<AddGameSchemaType>({
    mode: 'onChange',
    defaultValues: modifiedExistingData ?? addGameDefaultValues,
    resolver: zodResolver(addGameSchema),
  });

  // populate form with existing data
  useEffect(() => {
    if (!modifiedExistingData) return;
    updateGameForm.reset(modifiedExistingData);
  }, [modifiedExistingData, updateGameForm]);

  // handle Form submit and update movie
  const onSubmit = (data: AddGameSchemaType) => {
    if (!existingData) return;
    // start loading
    setSpinner(true);
    // generate a request body
    const requestBody: UpdateGameRequest = {
      game: {
        ...data,
        releaseDate: data.releaseDate?.toISOString(), //convert date to string
      },
      gameId: existingData?._id,
    };
    // make update movie request
    mutate(requestBody, {
      onSuccess: () => {
        setOpen(false);
        //  invalidate filter data
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.filterGames],
        });
        onSuccess?.();
        toast.success('Game updated successfully', {
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
        <ScrollArea className="[&_[data-slot=scroll-area-thumb]]:hover:bg-ui-400 max-h-[90vh] p-4">
          <DialogHeader className="bg-brand-900 sticky top-[-1]">
            <DialogTitle className="text-xl">Edit Game Details</DialogTitle>
            <DialogDescription className="text-ui-400">
              Fill in the game information below. Fields marked with * are
              required.
            </DialogDescription>
          </DialogHeader>
          {/* Form fields */}
          <AddEditGameFormFields form={updateGameForm} onSubmit={onSubmit}>
            {/* Buttons */}
            <div className="flex flex-row justify-end gap-2 md:items-center md:justify-center">
              <CustomAlert
                onConfirm={() => updateGameForm.reset()}
                title={'Are you sure?'}
                description="This will reset the form. All entered data will be lost."
              >
                <Button
                  variant={'red'}
                  type="button"
                  className="md:min-w-50"
                  aria-label="reset form"
                >
                  Reset
                </Button>
              </CustomAlert>
              <Button
                type="submit"
                variant={'blue'}
                className="md:min-w-50"
                aria-label="add game"
              >
                Update Game <Plus strokeWidth={3} />
              </Button>
            </div>
          </AddEditGameFormFields>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default EditGameDialog;
