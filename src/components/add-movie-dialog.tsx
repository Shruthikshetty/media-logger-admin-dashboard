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
import NumberInput from './number-input';
import CustomSelect from './custom-select';
import {
  GENRE_MOVIE_TV,
  LANGUAGES,
  MEDIA_STATUS,
  TAGS,
} from '~/constants/config.constants';
import { Checkbox } from './ui/checkbox';
import { ScrollArea } from './ui/scroll-area';
import ListInput from './list-input';
import MultiSelect from './multi-select';

/**
 * This is a form to Add a new movie
 * takes a trigger as children
 */
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
      <DialogContent className="bg-brand-900 border-ui-600 max-w-[95%] min-w-[70%] p-0 pb-1 lg:min-w-[60%]">
        <ScrollArea className="[&_[data-slot=scroll-area-thumb]]:hover:bg-ui-400 h-[90vh] p-4">
          <DialogHeader className="bg-brand-900 sticky top-0">
            <DialogTitle className="text-xl">Add Movie Details</DialogTitle>
            <DialogDescription>
              Fill in the movie information below
            </DialogDescription>
          </DialogHeader>

          {/* Form */}
          <Form {...addMovieForm}>
            <form
              onSubmit={addMovieForm.handleSubmit(onSubmit)}
              className="m-1 flex flex-col gap-4"
            >
              <FormField
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
              <FormField
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
              <div className="flex flex-col gap-4 md:flex-row md:items-baseline">
                <FormField
                  name="averageRating"
                  control={addMovieForm.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <Label htmlFor="averageRating" className="text-base">
                        Average Rating
                      </Label>
                      <FormControl>
                        <NumberInput
                          {...field}
                          id="averageRating"
                          placeholder="Rating (0-10)"
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription className="text-ui-400 text-sm">
                        Rating must be between 0 and 10
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  name="runTime"
                  control={addMovieForm.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <Label htmlFor="runTime" className="text-base">
                        Run Time
                      </Label>
                      <FormControl>
                        <NumberInput
                          {...field}
                          id="runTime"
                          placeholder="Minutes"
                        />
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
                  control={addMovieForm.control}
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
                  control={addMovieForm.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <Label htmlFor="ageRating" className="text-base">
                        Age Rating *
                      </Label>
                      <FormControl>
                        <NumberInput
                          {...field}
                          id="ageRating"
                          placeholder="Years"
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription className="text-ui-400 text-sm">
                        Age rating in years
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                name="posterUrl"
                control={addMovieForm.control}
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
                control={addMovieForm.control}
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
              <FormField
                name="youtubeVideoId"
                control={addMovieForm.control}
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

              <div className="flex flex-col gap-4 md:flex-row md:items-baseline">
                <FormField
                  name="cast"
                  control={addMovieForm.control}
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
                  control={addMovieForm.control}
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
                  control={addMovieForm.control}
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
                  control={addMovieForm.control}
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
                control={addMovieForm.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <Label className="text-base">Tags</Label>
                    <FormControl>
                      <MultiSelect
                        {...field}
                        options={TAGS}
                        placeHolder="Select required tags"
                        dropDownLabel="Select tags"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Checkbox for is active */}
              <FormField
                name="isActive"
                control={addMovieForm.control}
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
                          This Movie is Active and will be displayed on the
                          website
                        </span>
                      </p>
                    </FormControl>
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
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AddMovieDialog;
