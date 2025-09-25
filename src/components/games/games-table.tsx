'use client';
import {
  ColumnDef,
  flexRender,
  Table as ReactTable,
} from '@tanstack/react-table';
import React from 'react';
import { TableSkeleton } from '../custom-loaders';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { Game } from '~/services/game-service';
import type { Pagination as PaginationType } from '~/types/global.types';
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  Table,
  TableRow,
} from '../ui/table';
import TablePagination from '../table-pagination';

type GamesTableProps = {
  table: ReactTable<Game>;
  loading: boolean;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pagination?: PaginationType;
};

//creating columns for the games table
export const gameColumns: ColumnDef<Game, string>[] = [
  {
    id: 'posterUrl',
    header: 'Game',
    //@TODO change to next images
    cell: (props) => (
      <img src={props.getValue() as string} alt="poster image" />
    ),
  },
];

/**
 * This contains the table part of the games tab
 * all the games data will be displayed here in table format
 * to be used in games tab
 */
const GamesTable = ({ table, loading ,page , setPage, pagination }: GamesTableProps) => {
  //if loading return a skeleton table
  if (loading) return <TableSkeleton />;
  //in case not loading return the table
  return (
    <>
      <ScrollArea className="rounded-md pb-3 whitespace-nowrap">
        <Table className="min-w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-ui-800">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    style={{
                      width: header.column.columnDef.size,
                    }}
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

export default GamesTable;
