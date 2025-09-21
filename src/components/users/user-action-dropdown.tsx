import { Crown, Ellipsis, Eye, Trash2 } from 'lucide-react';
import React, { useRef, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { cn } from '~/lib/utils';
import { useRouter } from 'next/navigation';
import { useDeleteUserById } from '~/services/user-service';
import { toast } from 'sonner';
import { useSpinnerStore } from '~/state-management/spinner-store';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '~/constants/query-key.constants';
import ChangeUserRoleDialog from './change-role-dialog';
import { User } from '~/state-management/auth-store';

/**
 * This component is used to display the actions for a user
 * Mainly used in user table performs actions like view details , delete , edit role
 * @param movieId
 */
const UserActionsDropdown = ({ user }: { user: User }) => {
  //initialize router
  const router = useRouter();
  // initialize custom hook to delete a user by id
  const { mutate: deleteUserMutate } = useDeleteUserById();
  //get the spinner state
  const setSpinner = useSpinnerStore((state) => state.setShowSpinner);
  // store the dialog open state
  const [open, setOpen] = useState(false);
  // initialize the query client
  const queryClient = useQueryClient();
  // store the ref for the change role dialog open button
  const changeRoleButtonRef = useRef<HTMLButtonElement>(null);
  //user action items
  const userActionItems = [
    {
      title: 'View profile',
      icon: Eye,
      color: 'text-base-white',
      onClick: () => {
        router.push(`/users/${user?._id}`);
      },
    },
    //@TODO to be added in the future when api is available
    // {
    //   title: 'Edit User',
    //   icon: SquarePen,
    //   color: 'text-base-white',
    //   onClick: () => {},
    // },
    {
      title: 'Change Role',
      icon: Crown,
      color: 'text-base-white',
      onClick: () => {
        // open change role update dialog
        changeRoleButtonRef.current?.click();
      },
    },
    {
      title: 'Delete User',
      icon: Trash2,
      color: 'text-feedback-error',
      onClick: () => {
        // start loading
        setSpinner(true);
        // make api call
        deleteUserMutate(user?._id, {
          onSuccess: () => {
            toast.success('User deleted successfully', {
              className: '!bg-feedback-success',
            });
            // close dialog
            setOpen(false);
            //  invalidate filter data
            queryClient.invalidateQueries({
              queryKey: [QueryKeys.filterUsers],
            });
          },
          onError: (error) => {
            // set error message in case of any error
            toast.error(
              error?.response?.data.message ?? 'Something went wrong',
              {
                className: '!bg-feedback-error',
              },
            );
          },
          onSettled: () => {
            // stop loading
            setSpinner(false);
          },
        });
      },
    },
  ];
  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger
          disabled={!user?._id}
          aria-label="Open user actions"
          type="button"
          className="hover:bg-ui-600 rounded-md p-1"
          onClick={(e) => e.stopPropagation()}
        >
          <Ellipsis />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="bg-base-black border-ui-600 shadow-ui-600 text-base-white z-60 mx-5 my-2 rounded-lg border p-1 pb-1 shadow-[0px_0px_15px]"
          align="center"
        >
          <DropdownMenuGroup>
            {userActionItems.map((item) => (
              <DropdownMenuItem
                disabled={!user?._id}
                key={item.title}
                className={cn(
                  `hover:bg-ui-800 focus:bg-ui-800 focus:${item.color} text-md flex flex-row gap-2 rounded-md p-2`,
                  item.color,
                )}
                onClick={item.onClick}
              >
                <item.icon className={cn('h-5 w-5', item.color)} />
                <p>{item.title}</p>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* change role dialog */}
      <ChangeUserRoleDialog existingRole={user?.role ?? ''} userId={user?._id}>
        <button hidden ref={changeRoleButtonRef} disabled={!user?._id} />
      </ChangeUserRoleDialog>
    </>
  );
};

export default UserActionsDropdown;
