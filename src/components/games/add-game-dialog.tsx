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
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import AddEditGameFormFields from './game-add-edit-form-fields';
import { useForm } from 'react-hook-form';
import {
  addGameDefaultValues,
  addGameSchema,
  AddGameSchemaType,
} from '~/schema/add-game-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddGame } from '~/services/game-service';
import { toast } from 'sonner';
import { useSpinnerStore } from '~/state-management/spinner-store';
import CustomAlert from '../custom-alert';

/**
 * A dialog component to add a new game to the system.
 * It accepts children as a trigger to open the dialog.
 * The dialog contains a form with fields to enter the game's details.
 * The dialog also contains a submit button to create a new game.
 * The dialog is closed when the game is created successfully.
 * @param {React.ReactNode} children The element that will trigger the dialog when clicked.
 * @returns {JSX.Element} The dialog component.
 */
const AddGameDialog = ({ children }: { children: React.ReactNode }) => {
  //open and close state for dialog
  const [open, setOpen] = useState(false);
  //initialize custom hook to add a game
  const { mutate } = useAddGame();
  //get spinner state from the store
  const setSpinner = useSpinnerStore((state) => state.setShowSpinner);
  //create add game form
  const addGameForm = useForm<AddGameSchemaType>({
    mode: 'onChange',
    defaultValues: addGameDefaultValues,
    resolver: zodResolver(addGameSchema),
  });

  //handle form submit
  const onSubmit = (data: AddGameSchemaType) => {
    //set loading true
    setSpinner(true);
    // make api call
    mutate(
      {
        ...data,
        releaseDate: data.releaseDate?.toISOString(), //convert date to string
      },
      {
        onSuccess: () => {
          //rest data
          addGameForm.reset(addGameDefaultValues);
          setOpen(false);
          // send toast
          toast.success('Game added successfully', {
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
        <ScrollArea className="[&_[data-slot=scroll-area-thumb]]:hover:bg-ui-400 max-h-[90vh] p-4">
          <DialogHeader className="bg-brand-900 sticky top-[-1]">
            <DialogTitle className="text-xl">Add Game Details</DialogTitle>
            <DialogDescription className="text-ui-400">
              Fill in the game information below , once marked with * are
              required
            </DialogDescription>
          </DialogHeader>
          {/* Form fields */}
          <AddEditGameFormFields form={addGameForm} onSubmit={onSubmit}>
            {/* Buttons */}
            <div className="flex flex-row justify-end gap-2 md:items-center md:justify-center">
              <CustomAlert
                onConfirm={() => addGameForm.reset()}
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
                Add Game <Plus strokeWidth={3} />
              </Button>
            </div>
          </AddEditGameFormFields>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AddGameDialog;
