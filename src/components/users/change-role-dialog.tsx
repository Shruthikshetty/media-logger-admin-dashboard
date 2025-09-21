import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  updateUserRoleSchema,
  UpdateUserRoleSchemaType,
} from '~/schema/update-user-role-schema';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Dialog,
  DialogDescription,
} from '../ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import CustomSelect from '../custom-select';
import { UserRolesArray } from '~/constants/config.constants';
import { Button } from '../ui/button';
import { capitalize } from 'lodash';
import { useChangeUserRole } from '~/services/user-service';
import { toast } from 'sonner';
import { useSpinnerStore } from '~/state-management/spinner-store';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '~/constants/query-key.constants';

type ChangeUserRoleDialogProps = {
  children: React.ReactNode;
  existingRole: string;
  userId: string;
};

/**
 * A dialog component to change a user's role.
 * @param {React.ReactNode} children - The content of the dialog trigger.
 * @param {string} existingRole - The current role of the user.
 * @param {string} userId - The user ID to update.
 * @returns {React.ReactNode} - A dialog component.
 */
const ChangeUserRoleDialog = ({
  children,
  existingRole,
  userId,
}: ChangeUserRoleDialogProps) => {
  //store dialog open state
  const [open, setOpen] = useState(false);
  //initialize query client
  const queryClient = useQueryClient();
  //initialize custom hook to update user role
  const { mutate } = useChangeUserRole();
  // get spinner state from the store
  const setSpinner = useSpinnerStore((state) => state.setShowSpinner);
  // set default values
  const defaultValues = {
    role: existingRole,
  };
  // create a update role form
  const updateUserRoleForm = useForm({
    mode: 'onChange',
    defaultValues: defaultValues,
    resolver: zodResolver(updateUserRoleSchema),
  });

  // reset form when dialog opens or when the target user/role changes
  useEffect(() => {
    if (open) {
      updateUserRoleForm.reset({ role: existingRole });
    }
  }, [open, existingRole, updateUserRoleForm]);

  // handle form submit
  const handleSubmit = (data: UpdateUserRoleSchemaType) => {
    // set loading
    setSpinner(true);
    // make api call
    mutate(
      {
        role: data.role,
        userId: userId,
      },
      {
        onSuccess: () => {
          toast.success('User role updated successfully', {
            classNames: {
              toast: '!bg-feedback-success',
            },
          });
          //  invalidate filter data
          queryClient.invalidateQueries({
            queryKey: [QueryKeys.filterUsers],
          });
          //close dialog
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
          // stop loading
          setSpinner(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-brand-900 border-ui-600 max-w-[95%] min-w-[70%] p-5 lg:min-w-[60%]">
        <DialogHeader className="bg-brand-900 sticky top-0">
          <DialogTitle className="text-xl">Change User Role</DialogTitle>
          <DialogDescription>
            Update the role. This will change their permissions and access
            level.
          </DialogDescription>
        </DialogHeader>
        <Form {...updateUserRoleForm}>
          <form
            onSubmit={updateUserRoleForm.handleSubmit(handleSubmit)}
            className="flex flex-col gap-5"
          >
            <FormField
              control={updateUserRoleForm.control}
              name={'role'}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomSelect
                      {...field}
                      label="Role *"
                      options={UserRolesArray}
                      dropDownLabel="Select user role"
                      placeholder="Select user role"
                      customOptionLabels={(value) => capitalize(value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row justify-end gap-2 md:items-center md:justify-center">
              <Button
                variant={'outline'}
                type="button"
                className="md:min-w-50"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant={'blue'} className="md:min-w-50">
                Update Role
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeUserRoleDialog;
