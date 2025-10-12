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
import AddEditSeasonCommonFields from './add-edit-season-feilds';
import { zodResolver } from '@hookform/resolvers/zod';

const AddSeasonDialog = ({ children }: { children: React.ReactNode }) => {
  //open and close state for dialog
  const [open, setOpen] = useState(false);
  //create add season form
  const addSeasonForm = useForm<AddSeasonSchemaType>({
    mode: 'onChange',
    defaultValues: addSeasonDefaultValues,
    resolver: zodResolver(addSeasonSchema),
  });

  //handle on form submit
  const onSubmit = (data: AddSeasonSchemaType) => {
    console.log(data);
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
            {/* Buttons */}
            <div className="flex flex-row justify-end gap-2 md:items-center md:justify-center">
              <CustomAlert
                onConfirm={() => addSeasonForm.reset()}
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
