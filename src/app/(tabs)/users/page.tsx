'use client';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Plus, Search } from 'lucide-react';
import React, { useDeferredValue, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { LoadingWrapper } from '~/components/custom-loaders';
import MediaFilters from '~/components/media-filters';
import TitleSubtitle from '~/components/title-subtitle';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Skeleton } from '~/components/ui/skeleton';
import AddUserDialog from '~/components/users/add-user-dialog';
import UserTable, { UsersColumn } from '~/components/users/users-table';
import {
  UsersFilterConfig,
  UserTablePageItemLimit,
} from '~/constants/config.constants';
import useDelayedLoading from '~/hooks/use-delayed-loading';
import { useFilterUsers } from '~/services/user-service';

type UserFilterDataType = {
  role?: string;
};

/**
 * This is the main tab containing all the registered users table with filters
 * @returns {JSX.Element}
 */
const UsersTab = () => {
  // stores the current pagination page
  const [page, setPage] = useState(1);
  // holds th search text for users
  const [searchText, setSearchText] = useState<string>('');
  // derive a differed value for search text
  const deferredSearchText = useDeferredValue(searchText);
  // store filters data for users
  const [filters, setFilters] = useState<UserFilterDataType>(null!);
  // memorize can create user filter query
  const usersFilterQuery = useMemo(
    () => ({
      page,
      limit: UserTablePageItemLimit,
      searchText: deferredSearchText,
      ...filters,
    }),
    [deferredSearchText, filters, page],
  );
  //custom hook to fetch all users
  const { data, isFetching, isError, error } = useFilterUsers(usersFilterQuery);
  //extracting delayed loading
  const loading = useDelayedLoading(isFetching);
  // Create a stable empty array reference for the data prop
  const defaultData = useMemo(
    () => data?.data?.users ?? [],
    [data?.data?.users],
  );
  // create a table with all the user data
  const usersTable = useReactTable({
    data: defaultData,
    columns: UsersColumn,
    getCoreRowModel: getCoreRowModel(),
  });

  //catch any unexpected errors
  useEffect(() => {
    if (isError)
      toast.error(error?.response?.data?.message ?? error.message, {
        classNames: {
          toast: '!bg-feedback-error',
        },
      });
  }, [isError, error]);

  return (
    <div className="flex flex-col gap-5 p-5">
      {/* Header */}
      <div className="flex flex-row items-center justify-between gap-3">
        <TitleSubtitle
          title="Users Management"
          subtitle="Manage your platform users and permissions"
        />
        <AddUserDialog>
          <Button
            className="border-0 bg-gradient-to-r from-orange-400 to-orange-600 hover:opacity-80"
            aria-label="add user"
            variant={'outline'}
            type="button"
          >
            <Plus className="mr-1 size-4" />
            Add User
          </Button>
        </AddUserDialog>
      </div>
      {/* Search bar  and filter*/}
      <Card className="border-ui-600 text-base-white from-base-black to-ui-900 bg-gradient-to-r">
        <CardHeader>
          <CardDescription className="text-base-white flex flex-row items-center text-lg font-semibold">
            Search and filter the users data
          </CardDescription>

          <div className="flex flex-col gap-4">
            {/* search field */}
            <div className="relative max-w-[500px] grow">
              <Search
                className="absolute top-1/2 ml-2 h-5 w-5 -translate-y-1/2 transform"
                aria-hidden="true"
              />
              <Input
                aria-label="Search users by name"
                type="text"
                className="border-ui-600 pl-10"
                id="search"
                placeholder="Search users by name"
                autoComplete='email'
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <MediaFilters
              config={UsersFilterConfig}
              onFilterChange={(filter) => {
                // reset the page on filter change
                setPage(1);
                // set the filters
                setFilters(filter as UserFilterDataType);
              }}
            />
          </div>
        </CardHeader>
      </Card>
      {/* users data Table */}
      <Card className="border-ui-600 text-base-white from-base-black to-ui-900 bg-gradient-to-r">
        <CardHeader>
          <LoadingWrapper
            isLoading={loading}
            fallback={<Skeleton className="h-5 w-30 rounded-full" />}
          >
            <CardTitle className="text-xl font-semibold">
              User Directory ({data?.data?.pagination.total} users)
            </CardTitle>
          </LoadingWrapper>
          <CardDescription className="text-ui-400 text-sm">
            Complete list of platform users with admin controls
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserTable
            table={usersTable}
            pagination={data?.data?.pagination}
            page={page}
            setPage={setPage}
            loading={loading}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersTab;
