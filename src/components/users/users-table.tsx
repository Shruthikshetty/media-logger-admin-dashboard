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

/**
 * This is the columns of the users table
 */
export const UsersColumn: ColumnDef<User, string | number>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: (props) => <p>{props.getValue()}</p>,
  },
];
type UserTableProps = {
  table: ReactTable<User>;
};

/**
 * This is the table containing all the users data
 * @returns {JSX.Element}
 */
const UserTable = ({ table }: UserTableProps) => {
  return (
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
  );
};

export default UserTable;
