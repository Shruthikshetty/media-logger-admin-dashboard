import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { AddTvEpisodeSchemaType } from '~/schema/add-tv-episode-schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

type AddEditEpisodeFormFieldsProps = {
  form: UseFormReturn<AddTvEpisodeSchemaType>;
  onSubmit: (data: AddTvEpisodeSchemaType) => void;
  children: React.ReactNode;
};

/**
 * This components all the fields used in add / edit tv episode form
 * this is only meant to be used for add / edit tv episode
 */
const AddEditEpisodeFormFields = ({
  form,
  children,
  onSubmit,
}: AddEditEpisodeFormFieldsProps) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="m-1 flex flex-col gap-4"
      >
        <FormField
          name="title"
          control={form.control}
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
            </FormItem>
          )}
        />
        {children}
      </form>
    </Form>
  );
};

export default AddEditEpisodeFormFields;
