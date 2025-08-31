import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';
import { Skeleton } from './ui/skeleton';
import {
  ColumnDef,
  flexRender,
  Table as ReactTable,
} from '@tanstack/react-table';
import { Movie } from '~/services/movies-service';
import { ScrollArea, ScrollBar } from './ui/scroll-area';

type MoviesTableType = {
  loading: boolean;
  table: ReactTable<Movie>;
};

//creating columns for the movies table
export const movieColumns: ColumnDef<
  Movie,
  string | undefined | string[] | number | boolean
>[] = [
  {
    accessorKey: 'posterUrl',
    header: 'Movie',
    cell: (props) => <TableCell>{props.getValue()}</TableCell>,
  },
  {
    accessorKey: 'genre',
    header: 'Genre',
    cell: (props) => <TableCell>{props.getValue()}</TableCell>,
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: (props) => <TableCell>{props.getValue()}</TableCell>,
  },
  {
    accessorKey: 'averageRating',
    header: 'Rating',
    cell: (props) => <TableCell>{props.getValue()}</TableCell>,
  },
  {
    accessorKey: 'languages',
    header: 'Languages',
    cell: (props) => <TableCell>{props.getValue()}</TableCell>,
  },
  {
    accessorKey: 'releaseDate',
    header: 'Release Date',
    cell: (props) => <TableCell>{props.getValue()}</TableCell>,
  },
];

/**
 * This returns all the movie details in table format
 */
const MoviesTable = ({ loading, table }: MoviesTableType) => {
  //if loading return a skeleton table
  if (loading)
    return (
      <Table>
        <TableBody>
          {[...Array(4)].map((_, i) => (
            <TableRow key={i}>
              {[...Array(4)].map((_, i) => (
                <TableCell key={i}>
                  <Skeleton className="h-8 w-full rounded-md" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  //if not loading return the table
  return (
    <>
      <ScrollArea className="rounded-md pb-3 whitespace-nowrap">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-ui-800">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-base-white">
                    {header.column.columnDef?.header as string}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="hover:bg-ui-800">
                {row.getVisibleCells().map((cell) => (
                  <React.Fragment key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </React.Fragment>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" className="bg-ui-600 rounded-xl" />
      </ScrollArea>
      {/* @TODO dummy pagination in progress */}
      <Pagination className="text-base-white">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious>Previous</PaginationPrevious>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>3</PaginationLink>
          </PaginationItem>
          <PaginationNext>
            <PaginationNext>Next</PaginationNext>
          </PaginationNext>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default MoviesTable;
