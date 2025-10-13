'use client';
import React from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { AddSeasonSchemaType } from '~/schema/add-season-schema';
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
import NumberInput from '../number-input';
import CalenderInput from '../calender-input';
import CustomSelect from '../custom-select';
import { SEASON_STATUS } from '~/constants/config.constants';
import { capitalizeFirstLetter } from '~/lib/formatting';
import { Button } from '../ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { EditSeasonSchemaType } from '~/schema/edit-tv-season-schema';

type AddEditSeasonCommonFieldsProps = {
  form: UseFormReturn<AddSeasonSchemaType | EditSeasonSchemaType>;
  onSubmit: (data: AddSeasonSchemaType) => void;
  children: React.ReactNode;
};

type AddSeasonEpisodeArrayFieldsProps = {
  form: UseFormReturn<AddSeasonSchemaType | EditSeasonSchemaType>;
};

/**
 * This component renders all the common fields used in add/edit season form.
 * This is only meant to be used for add / edit season dialog's.
 * @param {form: UseFormReturn<AddSeasonSchemaType>}
 * @param {onSubmit: (data: AddSeasonSchemaType) => void}
 * @param {children: React.ReactNode}
 *
 * @returns {JSX.Element}
 */
export const AddEditSeasonCommonFields = ({
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
                <Textarea
                  {...field}
                  id="description"
                  placeholder="Enter season description"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <div className="flex flex-col gap-4 md:flex-row md:items-baseline">
          <FormField
            name="seasonNumber"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <Label htmlFor="seasonNumber" className="text-base">
                  Season Number *
                </Label>
                <FormControl>
                  <NumberInput
                    {...field}
                    id="seasonNumber"
                    placeholder="season #"
                  />
                </FormControl>
                <FormMessage />
                <FormDescription className="text-ui-400 text-sm">
                  enter the season number it should be unique
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            name="noOfEpisodes"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <Label htmlFor="noOfEpisodes" className="text-base">
                  Number of Episodes *
                </Label>
                <FormControl>
                  <NumberInput
                    {...field}
                    id="noOfEpisodes"
                    placeholder="no of episodes"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-baseline">
          <FormField
            name="releaseDate"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <p className="text-base font-semibold">Release date</p>
                <FormControl>
                  <CalenderInput {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription className="text-ui-400 text-sm">
                  select the release date of the season
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            name="status"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <CustomSelect
                    {...field}
                    options={SEASON_STATUS}
                    dropDownLabel="Status"
                    label="Season status *"
                    placeholder="Status"
                    customOptionLabels={(val) => capitalizeFirstLetter(val)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          name="youtubeVideoId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="youtubeVideoId" className="text-base">
                Youtube Video trailer
              </Label>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ''}
                  type="text"
                  id="youtubeVideoId"
                  placeholder="HVWftwd23"
                />
              </FormControl>
              <FormMessage />
              <FormDescription className="text-ui-400 text-sm">
                Enter the Youtube embed code only{' '}
                <b>(Do not provide full url)</b>
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          name="posterUrl"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="poster" className="text-base">
                Poster Image
              </Label>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ''}
                  type="text"
                  id="poster"
                  placeholder="https://..."
                />
              </FormControl>
              <FormMessage />
              <FormDescription className="text-ui-400 text-sm">
                Enter the complete URL of the Season poster
              </FormDescription>
            </FormItem>
          )}
        />
        {children}
      </form>
    </Form>
  );
};

/**
 * A component that renders the fields to add episodes to a TV season
 * It accepts the form object as a prop
 * It renders a form with fields to enter the episode's details
 * It also renders a button to add a new episode
 * @param {Object} form The form object
 * @returns {React.ReactElement} The fields to add episodes to a TV season
 */
export const AddSeasonEpisodeArrayFields = ({
  form,
}: AddSeasonEpisodeArrayFieldsProps) => {
  // create episode array fields
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'episodes',
  });

  // function to append a new episode field
  const handleAddEpisode = () => {
    append({
      title: '',
      description: '',
      episodeNumber: fields.length
        ? fields[fields.length - 1].episodeNumber + 1
        : 1,
    });
  };
  return (
    <div className="flex flex-col gap-4">
      <p className="text-base-white text-base font-semibold">Episodes :</p>
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="border-accent-purple flex flex-col gap-4 rounded-md border-1 border-l-3 p-2"
        >
          <div className="flex flex-row items-center justify-between gap-2">
            <p className="text-base-white text-xl font-semibold">
              Episode #{index + 1}
            </p>
            <Button variant={'red'} onClick={() => remove(index)} type="button">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <FormField
            name={`episodes.${index}.title`}
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label
                  htmlFor={`episodes.${index}.title`}
                  className="text-base"
                >
                  Title *
                </Label>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    id={`episodes.${index}.title`}
                    placeholder="Enter Episode title"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name={`episodes.${index}.description`}
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label
                  htmlFor={`episodes.${index}.description`}
                  className="text-base"
                >
                  Description
                </Label>
                <FormControl>
                  <Textarea
                    {...field}
                    id={`episodes.${index}.description`}
                    placeholder="Enter Episode description"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name={`episodes.${index}.releaseDate`}
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <p className="text-base font-semibold">Release date</p>
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
              name={`episodes.${index}.episodeNumber`}
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <Label
                    htmlFor={`episodes.${index}.episodeNumber`}
                    className="text-base"
                  >
                    Episode Number *
                  </Label>
                  <FormControl>
                    <NumberInput
                      {...field}
                      id={`episodes.${index}.episodeNumber`}
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
              name={`episodes.${index}.runTime`}
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <Label
                    htmlFor={`episodes.${index}.runTime`}
                    className="text-base"
                  >
                    Runtime
                  </Label>
                  <FormControl>
                    <NumberInput
                      {...field}
                      id={`episodes.${index}.runTime`}
                      placeholder="min"
                    />
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
            name={`episodes.${index}.averageRating`}
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <Label
                  htmlFor={`episodes.${index}.averageRating`}
                  className="text-base"
                >
                  Average Rating
                </Label>
                <FormControl>
                  <NumberInput
                    {...field}
                    id={`episodes.${index}.averageRating`}
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
            name={`episodes.${index}.stillUrl`}
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label
                  htmlFor={`episodes.${index}.stillUrl`}
                  className="text-base"
                >
                  Episode Image
                </Label>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    type="text"
                    id={`episodes.${index}.stillUrl`}
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
        </div>
      ))}
      <Button
        variant={'blue'}
        type="button"
        className="w-full"
        onClick={handleAddEpisode}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Episode
      </Button>
    </div>
  );
};
