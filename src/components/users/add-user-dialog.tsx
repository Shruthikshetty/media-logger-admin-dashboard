import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { ScrollArea } from '../ui/scroll-area';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  addUserDefaultValues,
  addUserSchema,
  AddUserSchemaType,
} from '~/schema/add-user-schema';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import CustomAlert from '../custom-alert';
import { Button } from '../ui/button';
import { MapPin, PenBox, Plus, Star } from 'lucide-react';
import NumberInput from '../number-input';
import { Textarea } from '../ui/textarea';
import { useAddUser } from '~/services/user-service';
import { toast } from 'sonner';
import { useSpinnerStore } from '~/state-management/spinner-store';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '~/constants/query-key.constants';

/**
 * A dialog to add a new user to the system.
 * It accepts children as a trigger to open the dialog.
 * The dialog contains a form with fields to enter the user's details.
 * The form is validated according to the `addUserSchema`.
 * The dialog also contains a submit button to create a new user.
 * The dialog is closed when the user is created successfully.
 */
const AddUserDialog = ({ children }: { children: React.ReactNode }) => {
  //store dialog open state
  const [open, setOpen] = React.useState(false);
  //create a add user form
  const addUserForm = useForm<AddUserSchemaType>({
    mode: 'onChange',
    defaultValues: addUserDefaultValues,
    resolver: zodResolver(addUserSchema),
  });
  // get the query client
  const queryClient = useQueryClient();
  //import add user custom hook
  const { mutate } = useAddUser();
  //extract screen loader state
  const setSpinner = useSpinnerStore((state) => state.setShowSpinner);

  // handle form submit
  const handleSubmit = (data: AddUserSchemaType) => {
    // set loading
    setSpinner(true);
    // make api call
    mutate(data, {
      onSuccess: () => {
        toast.success('User added successfully', {
          classNames: {
            toast: '!bg-feedback-success',
          },
        });
        //  invalidate filter data
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.filterUsers],
        });
        // close dialog
        setOpen(false);
      },
      onError: (error) => {
        toast.error(error?.response?.data.message ?? 'Something went wrong', {
          classNames: {
            toast: '!bg-feedback-error',
          },
        });
      },
      onSettled: () => {
        addUserForm.reset(addUserDefaultValues);
        // stop loading
        setSpinner(false);
      },
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-brand-900 border-ui-600 max-w-[95%] min-w-[70%] p-0 pb-1 lg:min-w-[60%]">
        <ScrollArea className="[&_[data-slot=scroll-area-thumb]]:hover:bg-ui-400 max-h-[90vh] p-4">
          <DialogHeader className="bg-brand-900 sticky top-0">
            <DialogTitle className="text-xl">Add New User </DialogTitle>
            <DialogDescription>
              Create a new user account. All fields marked with * are required.
            </DialogDescription>
          </DialogHeader>
          <Form {...addUserForm}>
            <form
              onSubmit={addUserForm.handleSubmit(handleSubmit)}
              className="m-1 flex flex-col gap-4"
            >
              <FormField
                control={addUserForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-base" htmlFor="name">
                      Full Name *
                    </Label>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        id={'name'}
                        placeholder="Enter full name"
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription className="text-ui-400 text-sm">
                      {field?.value?.length === 0
                        ? 'Name must be (3-50 characters)'
                        : `${field?.value?.length}/50 characters`}
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={addUserForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-base" htmlFor="email">
                      Email Address *
                    </Label>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        id="email"
                        autoComplete="email"
                        placeholder="Enter email address"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={addUserForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-base" htmlFor="password">
                      Password *
                    </Label>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        id="password"
                        placeholder="Enter password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={addUserForm.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-base" htmlFor="location">
                      <MapPin className="h-4 w-4" />
                      Location
                    </Label>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        id="location"
                        placeholder="City, Country"
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription className="text-ui-400 text-sm">
                      {field?.value?.length === 0
                        ? 'Optional (up to 100 characters)'
                        : `${field?.value?.length}/100 characters`}
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={addUserForm.control}
                name="xp"
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-base" htmlFor="xp">
                      <Star className="text-feedback-warning h-4 w-4" />
                      Experience Points
                    </Label>
                    <FormControl>
                      <NumberInput {...field} id="xp" placeholder="Enter xp" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={addUserForm.control}
                name="profileImg"
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-base" htmlFor="profileImg">
                      Profile Image URL
                    </Label>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        id="profileImg"
                        placeholder="https://example.com/image.jpg"
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription className="text-ui-400 text-sm">
                      profile url must be a valid url, from allowed sources.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={addUserForm.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-base" htmlFor="bio">
                      <PenBox className="h-4 w-4" />
                      Bio
                    </Label>
                    <FormControl>
                      <Textarea
                        id="bio"
                        placeholder="Tell us about yourself ...."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription className="text-ui-400 text-sm">
                      {field?.value?.length === 0
                        ? 'Optional (up to 200 characters)'
                        : `${field?.value?.length}/200 characters`}
                    </FormDescription>
                  </FormItem>
                )}
              />

              <div className="flex flex-row justify-end gap-2 md:items-center md:justify-center">
                <CustomAlert
                  onConfirm={() => addUserForm.reset()}
                  title={'Are you sure?'}
                  description="This will reset the form. All entered data will be lost."
                >
                  <Button variant={'red'} type="button" className="md:min-w-50">
                    Reset
                  </Button>
                </CustomAlert>
                <Button type="submit" variant={'blue'} className="md:min-w-50">
                  Add User <Plus strokeWidth={3} />
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
