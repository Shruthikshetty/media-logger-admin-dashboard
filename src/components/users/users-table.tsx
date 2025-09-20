import {
  ColumnDef,
  flexRender,
  Table as ReactTable,
} from '@tanstack/react-table';
import React from 'react';
import { User } from '~/state-management/auth-store';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import TablePagination from '../table-pagination';
import { Pagination } from '~/types/global.types';
import { TableSkeleton } from '../custom-loaders';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Ellipsis, MapPin, User as UserIcon } from 'lucide-react';
import RoleBadge from '../role-badge';

/**
 * This is the columns of the users table
 */
export const UsersColumn: ColumnDef<User, string | number>[] = [
  {
    accessorKey: 'profileImg',
    header: 'User',
    cell: (props) => (
      <Avatar>
        <AvatarImage
          src={props.getValue() as string}
          className="h-14 w-14 rounded-full"
        />
        <AvatarFallback className="justify-start bg-transparent">
          <UserIcon className="bg-brand-200 text-base-white h-14 w-14 rounded-full p-3" />
        </AvatarFallback>
      </Avatar>
    ),
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: (props) => (
      <div>
        <p className="text-lg font-semibold">{props.getValue()}</p>
        <p className="text-small text-ui-400 line-clamp-2 text-wrap">
          {props.row.original.email}
        </p>
      </div>
    ),
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: (props) => (
      <RoleBadge
        role={props.getValue() as string}
        className='py-0 text-sm [&_[data-slot="icon"]]:h-3 [&_[data-slot="icon"]]:w-3'
      />
    ),
  },
  {
    accessorKey: 'xp',
    header: 'XP',
    cell: (props) => (
      <p className="text-base font-semibold">{props.getValue()}</p>
    ),
  },
  {
    accessorKey: 'location',
    header: 'Location',
    cell: (props) => (
      <p className="text-base-white flex flex-row items-center justify-start gap-1 text-base font-normal">
        <span>
          <MapPin className="text-ui-400 h-4 w-4" />
        </span>
        {props?.getValue() ? props?.getValue() : '???'}
      </p>
    ),
  },
  //@TODO add last logged in once api is added
  {
    id: 'action',
    header: 'Actions',
    cell: (props) => (
      <div onClick={(e) => e.stopPropagation()}>
        <Ellipsis />
      </div>
    ),
    size: 50,
  },
];
type UserTableProps = {
  table: ReactTable<User>;
  pagination?: Pagination;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
};

/**
 * This is the table containing all the users data
 * @returns {JSX.Element}
 */
const UserTable = ({
  table,
  pagination,
  page,
  setPage,
  loading,
}: UserTableProps) => {
  //if loading return a skeleton table
  if (loading) return <TableSkeleton />;
  //if not loading return the table
  return (
    <>
      <ScrollArea className="rounded-md pb-3 whitespace-nowrap">
        <Table className="min-w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-ui-800">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-ui-200 text-base font-bold"
                  >
                    {flexRender(
                      header.column.columnDef?.header,
                      header.getContext(),
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="hover:bg-ui-800">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* custom scroll bar styles */}
        <ScrollBar
          orientation="horizontal"
          className="bg-ui-800 rounded-xl"
          barClassName="hover:bg-ui-400 bg-ui-600"
        />
      </ScrollArea>
      <TablePagination pagination={pagination} page={page} setPage={setPage} />
    </>
  );
};

export default UserTable;
