import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { AddGameSchemaType } from '~/schema/add-game-schema';
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
import { Textarea } from '../ui/textarea';
import NumberInput from '../number-input';
import {
  GAME_GENRES,
  GAME_PLATFORMS,
  MEDIA_STATUS,
} from '~/constants/config.constants';
import CustomSelect from '../custom-select';
import CalenderInput from '../calender-input';
import MultiSelect from '../multi-select';

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
        <div className="flex flex-col gap-4 md:flex-row md:items-baseline">
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
                  Rating must be between 1 and 10
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            name="avgPlaytime"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <Label htmlFor="avgPlaytime" className="text-base">
                  Average Playtime
                </Label>
                <FormControl>
                  <NumberInput
                    {...field}
                    id="avgPlaytime"
                    placeholder="Minutes"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-baseline">
          <FormField
            name="status"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <CustomSelect
                    {...field}
                    options={MEDIA_STATUS}
                    dropDownLabel="Status"
                    label="Game status *"
                    placeholder="Status"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="ageRating"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <Label htmlFor="ageRating" className="text-base">
                  Age Rating *
                </Label>
                <FormControl>
                  <NumberInput {...field} id="ageRating" placeholder="Years" />
                </FormControl>
                <FormMessage />
                <FormDescription className="text-ui-400 text-sm">
                  Age rating in years
                </FormDescription>
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
                <Label className="text-base">Release Date *</Label>
                <FormControl>
                  <CalenderInput {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription className="text-ui-400 text-sm">
                  select the release date of the game
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            name="youtubeVideoId"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <Label htmlFor="youtubeVideoId" className="text-base">
                  Youtube Video trailer
                </Label>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    type="text"
                    id="youtubeVideoId"
                    placeholder="Video ID"
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
        </div>
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
                Enter the complete URL of the game poster
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          name="backdropUrl"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="backdropUrl" className="text-base">
                Backdrop Image
              </Label>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ''}
                  type="text"
                  id="backdropUrl"
                  placeholder="https://..."
                />
              </FormControl>
              <FormMessage />
              <FormDescription className="text-ui-400 text-sm">
                Enter the complete URL of the game backdrop
              </FormDescription>
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-4 md:flex-row md:items-baseline">
          <FormField
            name="platforms"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <Label className="text-base">Platforms</Label>
                <FormControl>
                  <MultiSelect
                    {...field}
                    options={GAME_PLATFORMS}
                    placeHolder="Select required platforms"
                    dropDownLabel="Select platforms"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="genre"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <Label className="text-base">Genres</Label>
                <FormControl>
                  <MultiSelect
                    {...field}
                    options={GAME_GENRES}
                    placeHolder="Select required genres"
                    dropDownLabel="Select genres"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {children}
      </form>
    </Form>
  );
};

export default AddEditGameFormFields;
