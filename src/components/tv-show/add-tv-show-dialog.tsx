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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import CustomAlert from '../custom-alert';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  addTvShowDefaultValues,
  addTvShowSchema,
  AddTvShowSchema,
} from '~/schema/add-tv-show-schema';
import { Form } from '../ui/form';
import {
  AddEditTvShowCommonFields,
  AddTvSeasonArrayFields,
} from './add-edit-tv-show-fields';

/**
 * This return a dialog to add tv show
 * it accepts children as a trigger to open the dialog
 * @returns {JSX.Element}
 */
const AddTvShowDialog = ({ children }: { children: React.ReactNode }) => {
  //open and close state for dialog
  const [open, setOpen] = useState(false);
  // create add tv show form
  const addTvShowForm = useForm<AddTvShowSchema>({
    mode: 'onChange',
    defaultValues: addTvShowDefaultValues,
    resolver: zodResolver(addTvShowSchema),
  });

  // handle submit form
  const onSubmit = (data: AddTvShowSchema) => {
    console.log(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-brand-900 border-ui-600 max-w-[95%] min-w-[70%] p-0 pb-1 lg:min-w-[60%]">
        <ScrollArea className="[&_[data-slot=scroll-area-thumb]]:hover:bg-ui-400 max-h-[90vh] min-h-[70vh] p-4">
          <DialogHeader className="bg-brand-900 sticky top-0">
            <DialogTitle className="text-xl">Add Tv show Details</DialogTitle>
            <DialogDescription>
              Fill in the Tv Show information below
            </DialogDescription>
          </DialogHeader>
          <Form {...addTvShowForm}>
            <form
              onSubmit={addTvShowForm.handleSubmit(onSubmit)}
              className="m-1 flex flex-col gap-4"
            >
              <div className="mt-3 flex flex-col gap-3">
                {/* form tabs  */}
                <Tabs defaultValue="account" className="flex w-full">
                  <TabsList
                    className="bg-ui-600 flex w-full justify-center"
                    defaultChecked
                  >
                    <TabsTrigger
                      value="basic"
                      className="data-[state=active]:bg-ui-900 text-base-white font-semibold"
                    >
                      Show Info
                    </TabsTrigger>
                    <TabsTrigger
                      value="season"
                      className="data-[state=active]:bg-ui-900 text-base-white font-semibold"
                    >
                      Seasons
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent
                    value="basic"
                    className="mt-1 flex flex-col gap-4"
                  >
                    <AddEditTvShowCommonFields form={addTvShowForm} />
                  </TabsContent>
                  <TabsContent value="season">
                    <AddTvSeasonArrayFields form={addTvShowForm} />
                  </TabsContent>
                </Tabs>
                {/* Buttons */}
                <div className="flex flex-row justify-end gap-2 md:items-center md:justify-center">
                  <CustomAlert
                    onConfirm={() => {
                      addTvShowForm.reset();
                    }}
                    title={'Are you sure?'}
                    description="This will reset the form. All entered data will be lost."
                  >
                    <Button
                      variant={'red'}
                      type="button"
                      className="md:min-w-50"
                    >
                      Reset
                    </Button>
                  </CustomAlert>
                  <Button
                    type="submit"
                    variant={'blue'}
                    className="md:min-w-50"
                  >
                    Add Tv show <Plus strokeWidth={3} />
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AddTvShowDialog;
