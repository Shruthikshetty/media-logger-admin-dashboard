'use client';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { useForm } from 'react-hook-form';
import {
  updateProfileDefaultValues,
  updateProfileSchema,
  UpdateProfileSchemaType,
} from '~/schema/edit-profile-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

type EditProfileDialogProps = {
  children: React.ReactNode;
  defaultValues?: UpdateProfileSchemaType;
};

const EditProfileDialog = ({
  children,
  defaultValues,
}: EditProfileDialogProps) => {
  //crete user profile update form
  const profileUpdateForm = useForm<UpdateProfileSchemaType>({
    mode: 'onChange',
    defaultValues: defaultValues ?? updateProfileDefaultValues,
    resolver: zodResolver(updateProfileSchema),
  });

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-brand-900 border-ui-600 max-w-[95%] min-w-[50%] lg:min-w-[40%]">
        <DialogHeader className="gap-1">
          <DialogTitle className="text-base-white text-xl">
            Edit Profile
          </DialogTitle>
          <p className="text-ui-400 text-base">
            Update your profile information below. Fields marked with * are
            required.
          </p>
        </DialogHeader>
        <Form {...profileUpdateForm}>
          <form
            onSubmit={profileUpdateForm.handleSubmit(() => {})}
            className="flex flex-col gap-3"
          >
            <FormField<UpdateProfileSchemaType>
              name="name"
              control={profileUpdateForm.control}
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="name" className="text-base">
                    Name *
                  </Label>
                  <FormControl>
                    <Input
                      type="text"
                      id="name"
                      placeholder="Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription className="text-ui-400 text-sm">
                    {field?.value?.length === 0
                      ? 'Enter your name (3-50 characters)'
                      : `${field?.value?.length}/50 characters`}
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField<UpdateProfileSchemaType>
              name="email"
              control={profileUpdateForm.control}
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="email" className="text-base">
                    Email *
                  </Label>
                  <FormControl>
                    <Input
                      type="text"
                      id="email"
                      placeholder="example@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField<UpdateProfileSchemaType>
              name="location"
              control={profileUpdateForm.control}
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="location" className="text-base">
                    Location
                  </Label>
                  <FormControl>
                    <Input
                      type="text"
                      id="location"
                      placeholder="City , Country"
                      {...field}
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
            <FormField<UpdateProfileSchemaType>
              name="bio"
              control={profileUpdateForm.control}
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="bio" className="text-base">
                    Location
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

            {/* Buttons */}
            <div className="flex flex-row justify-end gap-2">
              <Button type="button" onClick={() => profileUpdateForm.reset()}>
                Reset
              </Button>
              <Button type="submit" variant={'blue'}>
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
