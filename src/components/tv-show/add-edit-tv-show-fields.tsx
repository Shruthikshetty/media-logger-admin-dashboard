import React from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { AddTvShowSchema } from '~/schema/add-tv-show-schema';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import NumberInput from '../number-input';
import CalenderInput from '../calender-input';
import CustomSelect from '../custom-select';
import {
  GENRE_MOVIE_TV,
  LANGUAGES,
  MEDIA_STATUS,
  SEASON_STATUS,
  TAGS,
} from '~/constants/config.constants';
import { capitalizeFirstLetter } from '~/lib/formatting';
import { Button } from '../ui/button';
import { Plus, Trash2 } from 'lucide-react';
import ListInput from '../list-input';
import MultiSelect from '../multi-select';
import { Checkbox } from '../ui/checkbox';

export type AddEditTvShowCommonFieldsProps = {
  form: UseFormReturn<AddTvShowSchema>;
};

/**
 * this is the common form fields used in add and edit tv show
 * @param param0 form  can take add or edit tv show form
 * @returns
 */
export const AddEditTvShowCommonFields = ({
  form,
}: AddEditTvShowCommonFieldsProps) => {
  return (
    <>
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
                placeholder="Enter Show title"
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
                placeholder="Enter show description"
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
                Rating must be between 1 and 10 (0 is same as no rating)
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          name="avgRunTime"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex-1">
              <Label htmlFor="avgRunTime" className="text-base">
                Run Time
              </Label>
              <FormControl>
                <NumberInput {...field} id="avgRunTime" placeholder="Minutes" />
              </FormControl>
              <FormMessage />
              <FormDescription className="text-ui-400 text-sm">
                Runtime in minutes must be greater than 0 (this is a average)
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
                  label="Tv show status *"
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
                Age Rating
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
                select the release date of the Tv show
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
              Enter the complete URL of the Tv show poster
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
              Enter the complete URL of the Tv show backdrop
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
                      This Tv show is Active and will be displayed on the
                      website
                    </span>
                  </p>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>
    </>
  );
};

export const AddTvSeasonArrayFields = ({
  form,
}: {
  form: UseFormReturn<AddTvShowSchema>;
}) => {
  // create season array fields
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'seasons',
  });

  //create an array of episodes

  // handle add season
  const handleAddSeason = () => {
    append({
      noOfEpisodes: 0,
      seasonNumber: fields.length
        ? fields[fields.length - 1].seasonNumber + 1
        : 1,
      title: '',
      status: SEASON_STATUS[2],
      description: '',
    });
  };

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id} className="flex flex-col gap-4">
          <div className="flex flex-row items-center justify-between">
            <p className="text-xl font-semibold">Season {field.seasonNumber}</p>
            <Button variant={'red'} onClick={() => remove(index)} type="button">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <FormField
            name={`seasons.${index}.title`}
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label htmlFor={`seasons.${index}.title`} className="text-base">
                  Title *
                </Label>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    id={`seasons.${index}.title`}
                    placeholder="Enter season title"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name={`seasons.${index}.description`}
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label
                  htmlFor={`seasons.${index}.description`}
                  className="text-base"
                >
                  Description
                </Label>
                <FormControl>
                  <Textarea
                    {...field}
                    id={`seasons.${index}.description`}
                    placeholder="Enter season description"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name={`seasons.${index}.averageRating`}
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <Label
                  htmlFor={`seasons.${index}.averageRating`}
                  className="text-base"
                >
                  Average Rating
                </Label>
                <FormControl>
                  <NumberInput
                    {...field}
                    id={`seasons.${index}.averageRating`}
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
              name={`seasons.${index}.seasonNumber`}
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <Label
                    htmlFor={`seasons.${index}.seasonNumber`}
                    className="text-base"
                  >
                    Season Number *
                  </Label>
                  <FormControl>
                    <NumberInput
                      {...field}
                      id={`seasons.${index}.seasonNumber`}
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
              name={`seasons.${index}.noOfEpisodes`}
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <Label
                    htmlFor={`seasons.${index}.noOfEpisodes`}
                    className="text-base"
                  >
                    Number of Episodes *
                  </Label>
                  <FormControl>
                    <NumberInput
                      {...field}
                      id={`seasons.${index}.noOfEpisodes`}
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
              name={`seasons.${index}.releaseDate`}
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
              name={`seasons.${index}.status`}
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
            name={`seasons.${index}.youtubeVideoId`}
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label
                  htmlFor={`seasons.${index}.youtubeVideoId`}
                  className="text-base"
                >
                  Youtube Video trailer
                </Label>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    type="text"
                    id={`seasons.${index}.youtubeVideoId`}
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
            name={`seasons.${index}.posterUrl`}
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label
                  htmlFor={`seasons.${index}.posterUrl`}
                  className="text-base"
                >
                  Poster Image
                </Label>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    type="text"
                    id={`seasons.${index}.posterUrl`}
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
        </div>
      ))}
      <Button
        variant={'blue'}
        type="button"
        className="mt-3 w-full"
        onClick={handleAddSeason}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Season
      </Button>
    </div>
  );
};
