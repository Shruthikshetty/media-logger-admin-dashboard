'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from './ui/dialog';
import {
  addMovieDefaultValues,
  addMovieSchema,
  AddMovieSchemaType,
} from '~/schema/add-movie-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from './ui/form';
import { useForm } from 'react-hook-form';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';

const AddMovieDialog = ({ children }: { children: React.ReactNode }) => {
  //open and close state for dialog
  const [open, setOpen] = useState(false);
  //create add movie form
  const addMovieForm = useForm<AddMovieSchemaType>({
    mode: 'onChange',
    defaultValues: addMovieDefaultValues,
    resolver: zodResolver(addMovieSchema),
  });

  // handle Form submit
  const onSubmit = (data: AddMovieSchemaType) => {
    //@TODO
    console.log(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-brand-900 border-ui-600 max-w-[95%] min-w-[70%] lg:min-w-[60%]">
        <DialogHeader>
          <DialogTitle className="text-xl">Add Movie Details</DialogTitle>
          <DialogDescription>
            Fill in the movie information below
          </DialogDescription>
        </DialogHeader>
        {/* Form */}
        <Form {...addMovieForm}>
          <form
            onSubmit={addMovieForm.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField<AddMovieSchemaType>
              name="title"
              control={addMovieForm.control}
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="title" className="text-base">
                    Title *
                  </Label>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      id="title"
                      placeholder="Enter movie title"
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription className="text-ui-400 text-sm">
                    {field?.value?.length === 0
                      ? 'Title must be (3-50 characters)'
                      : `${field?.value?.length}/50 characters`}
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField<AddMovieSchemaType>
              name="description"
              control={addMovieForm.control}
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="description" className="text-base">
                    Description *
                  </Label>
                  <FormControl>
                    <Textarea
                      {...field}
                      id="description"
                      placeholder="Enter movie description..."
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription className="text-ui-400 text-sm">
                    {field?.value?.length === 0
                      ? 'Description must be (1-300 characters)'
                      : `${field?.value?.length}/300 characters`}
                  </FormDescription>
                </FormItem>
              )}
            />
            {/* Buttons */}
            <div className="flex flex-row justify-end gap-2 md:items-center md:justify-center">
              <Button
                variant={'red'}
                type="button"
                onClick={() => addMovieForm.reset()}
                className="md:min-w-50"
              >
                Reset
              </Button>
              <Button type="submit" variant={'blue'} className="md:min-w-50">
                Add Movie <Plus strokeWidth={3} />
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMovieDialog;
