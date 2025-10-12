'use client';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { AddTvEpisodeSchemaType } from '~/schema/add-tv-episode-schema';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import CalenderInput from '../calender-input';
import NumberInput from '../number-input';
import { Textarea } from '../ui/textarea';

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
                  placeholder="Enter Episode title"
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
                <Textarea
                  {...field}
                  id="description"
                  placeholder="Enter Episode description"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="releaseDate"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="releaseDate" className="text-base">
                Release date
              </Label>
              <FormControl>
                <CalenderInput {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription className="text-ui-400 text-sm">
                select the release date of the episode
              </FormDescription>
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-4 md:flex-row md:items-baseline">
          <FormField
            name="episodeNumber"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <Label htmlFor="episodeNumber" className="text-base">
                  Episode Number *
                </Label>
                <FormControl>
                  <NumberInput
                    {...field}
                    id="episodeNumber"
                    placeholder="Ep #"
                  />
                </FormControl>
                <FormMessage />
                <FormDescription className="text-ui-400 text-sm">
                  enter the episode number it should be unique
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            name="runTime"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <Label htmlFor="runTime" className="text-base">
                  Runtime
                </Label>
                <FormControl>
                  <NumberInput {...field} id="runTime" placeholder="min" />
                </FormControl>
                <FormMessage />
                <FormDescription className="text-ui-400 text-sm">
                  enter the episode runtime in minutes
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
        <FormField
          name="averageRating"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex-1">
              <Label htmlFor="averageRating" className="text-base">
                Average Rating
              </Label>
              <FormControl>
                <NumberInput
                  {...field}
                  id="averageRating"
                  placeholder="Rating (1-10)"
                />
              </FormControl>
              <FormMessage />
              <FormDescription className="text-ui-400 text-sm">
                Rating must be between 1 and 10 (0 is same as no rating)
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          name="stillUrl"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="stillUrl" className="text-base">
                Episode Image
              </Label>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ''}
                  type="text"
                  id="stillUrl"
                  placeholder="https://..."
                />
              </FormControl>
              <FormMessage />
              <FormDescription className="text-ui-400 text-sm">
                Enter the complete URL of the Episode image
              </FormDescription>
            </FormItem>
          )}
        />
        {children}
      </form>
    </Form>
  );
};

export default AddEditEpisodeFormFields;
