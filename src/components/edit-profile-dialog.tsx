import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Form } from 'react-hook-form';

const EditProfileDialog = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-brand-900 border-ui-600 max-w-[95%] min-w-[50%]">
        <DialogHeader className="gap-1">
          <DialogTitle className="text-base-white text-xl">
            Edit Profile
          </DialogTitle>
          <p className="text-ui-400 text-base">
            Update your profile information
          </p>
        </DialogHeader>
        {/* <Form>
          <form></form>
        </Form> */}
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
