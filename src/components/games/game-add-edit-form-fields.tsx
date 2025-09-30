import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { AddGameSchemaType } from '~/schema/add-game-schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

type AddEditGameFormFieldsProps = {
  form: UseFormReturn<AddGameSchemaType>;
  onSubmit: (data: AddGameSchemaType) => void;
  children: React.ReactNode;
};

/**
 * This components all the fields used in add / edit game form
 * this is only meant to be used for add / edit game dialog's
 */
const AddEditGameFormFields = ({
  form,
  onSubmit,
  children,
}: AddEditGameFormFieldsProps) => {
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
                  placeholder="Enter Game title"
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
                Description *
              </Label>
              <FormControl>
                <Textarea
                  {...field}
                  id="description"
                  placeholder="Enter game description..."
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

export default AddEditGameFormFields;
