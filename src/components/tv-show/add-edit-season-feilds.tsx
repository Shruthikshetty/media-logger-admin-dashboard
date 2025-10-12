import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { AddSeasonSchemaType } from '~/schema/add-season-schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

type AddEditSeasonCommonFieldsProps = {
  form: UseFormReturn<AddSeasonSchemaType>;
  onSubmit: (data: AddSeasonSchemaType) => void;
  children: React.ReactNode;
};

const AddEditSeasonCommonFields = ({
  form,
  children,
  onSubmit,
}: AddEditSeasonCommonFieldsProps) => {
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
                  placeholder="Enter season title"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="description" className="text-base">
                Description
              </Label>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  id="description"
                  placeholder="Enter season description"
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

export default AddEditSeasonCommonFields;
