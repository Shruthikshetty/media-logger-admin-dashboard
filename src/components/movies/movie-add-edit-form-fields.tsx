import React from 'react';
import {
  FormField,
  FormItem,
  Form,
  FormControl,
  FormMessage,
  FormDescription,
} from '../ui/form';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import NumberInput from '../number-input';
import CustomSelect from '../custom-select';
import {
  GENRE_MOVIE_TV,
  LANGUAGES,
  MEDIA_STATUS,
  TAGS,
} from '~/constants/config.constants';
import CalenderInput from '../calender-input';
import ListInput from '../list-input';
import MultiSelect from '../multi-select';
import { Checkbox } from '../ui/checkbox';
import { UseFormReturn } from 'react-hook-form';
import { AddMovieSchemaType } from '~/schema/add-movie-schema';

interface AddEditMovieFormFieldsProps {
  form: UseFormReturn<AddMovieSchemaType>;
  onSubmit: (data: AddMovieSchemaType) => void;
  children: React.ReactNode;
}

/**
 * This components all the fields used in add / edit movie form
 * this is only meant to be used for add / edit movie
 */
const AddEditMovieFormFields = ({
  form,
  onSubmit,
  children,
}: AddEditMovieFormFieldsProps) => {
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
              <FormDescription className="text-ui-400 text-sm">
                {field?.value?.length === 0
                  ? 'Title must be (3-50 characters)'
                  : `${field?.value?.length}/50 characters`}
              </FormDescription>
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
                  placeholder="Enter movie description..."
                />
              </FormControl>
              <FormMessage />
              <FormDescription className="text-ui-400 text-sm">
                {field?.value?.length === 0
                  ? 'Description must be (1-1000 characters)'
                  : `${field?.value?.length}/1000 characters`}
              </FormDescription>
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
            name="runTime"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <Label htmlFor="runTime" className="text-base">
                  Run Time *
                </Label>
                <FormControl>
                  <NumberInput {...field} id="runTime" placeholder="Minutes" />
                </FormControl>
                <FormMessage />
                <FormDescription className="text-ui-400 text-sm">
                  Runtime in minutes must be greater than 0
                </FormDescription>
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
                    label="Movie status *"
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
                  select the release date of the movie
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
                Enter the complete URL of the movie poster
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
                Enter the complete URL of the movie backdrop
              </FormDescription>
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-4 md:flex-row md:items-baseline">
          <FormField
            name="cast"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <Label htmlFor="cast" className="text-base">
                  Cast Members
                </Label>
                <FormControl>
                  <ListInput {...field} id="cast" placeholder="Cast name">
                    <FormDescription className="text-ui-400 text-sm">
                      Add all cast names one by one
                    </FormDescription>
                  </ListInput>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="directors"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <Label htmlFor="directors" className="text-base">
                  Directors
                </Label>
                <FormControl>
                  <ListInput
                    {...field}
                    id="directors"
                    placeholder="Director name"
                  >
                    <FormDescription className="text-ui-400 text-sm">
                      Add all Director&apos;s names one by one
                    </FormDescription>
                  </ListInput>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-baseline">
          <FormField
            name="languages"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <Label className="text-base">Languages</Label>
                <FormControl>
                  <MultiSelect
                    {...field}
                    options={LANGUAGES}
                    placeHolder="Select required languages"
                    dropDownLabel="Select languages"
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
                    options={GENRE_MOVIE_TV}
                    placeHolder="Select required genres"
                    dropDownLabel="Select genres"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          name="tags"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex-1">
              <Label className="text-base">Tags</Label>
              <FormControl>
                <MultiSelect
                  {...field}
                  options={TAGS}
                  placeHolder="Select required tags"
                  dropDownLabel="Select tags"
                  search
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Checkbox for is active */}
        <FormField
          name="isActive"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex-1">
              <Label className="text-base">Is Active</Label>
              <FormControl>
                <p className="text-ui-400 flex flex-row items-center gap-2 text-sm">
                  <Checkbox
                    className="data-[state=checked]:bg-brand-500 data-[state=checked]:border-brand-500 data-[state=checked]:text-base-black"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <span>
                    This Movie is Active and will be displayed on the website
                  </span>
                </p>
              </FormControl>
            </FormItem>
          )}
        />
        {children}
      </form>
    </Form>
  );
};

export default AddEditMovieFormFields;
