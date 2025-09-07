'use client';
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
import CustomImage from './custom-image';
import { Badge } from './ui/badge';
import { Calendar, Plus, Star } from 'lucide-react';
import moment from 'moment';
import CollapsableBadgeList from './collapsable-badge-list';
import { cn } from '~/lib/utils';
import { capitalizeFirstLetter } from '~/lib/formatting';
import type { Pagination as PaginationType } from '~/types/global.types';
import MovieActionDropdown from './movie-actions-dropdown';
import { Checkbox } from './ui/checkbox';
import { useRouter } from 'next/navigation';

type MoviesTableType = {
  loading: boolean;
  table: ReactTable<Movie>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pagination?: PaginationType;
};

//creating columns for the movies table
export const movieColumns: ColumnDef<
  Movie,
  string | undefined | string[] | number | boolean
>[] = [
  {
    id: 'select',
    header: (props) => (
      <Checkbox
        className="data-[state=checked]:bg-base-white data-[state=checked]:text-base-black"
        checked={props.table.getIsAllRowsSelected()}
        aria-label="select all"
        onCheckedChange={() => props.table.toggleAllRowsSelected()}
      />
    ),
    cell: (props) => (
      <TableCell>
        <Checkbox
          className="data-[state=checked]:bg-base-white data-[state=checked]:text-base-black"
          checked={props.row.getIsSelected()}
          aria-label="select row"
          onCheckedChange={() => props.row.toggleSelected()}
        />
      </TableCell>
    ),
    size: 50,
  },

  {
    accessorKey: 'posterUrl',
    header: 'Movie',
    cell: (props) => (
      <TableCell>
        <CustomImage
          alt="movie poster"
          src={props.getValue() as string}
          width={80}
          height={150}
          className="rounded-lg"
          maxHeight={150}
          maxWidth={100} 
          minHeight={100}
          minWidth={60}
        />
      </TableCell>
    ),
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: (props) => (
      <TableCell className="text-base-white text-base">
        <p className="text-lg font-semibold">{props.getValue()}</p>
        <p className="text-small text-ui-400 line-clamp-3 text-wrap">
          {props.row.original.description}
        </p>
      </TableCell>
    ),
    size: 500,
  },
  {
    accessorKey: 'genre',
    header: 'Genre',
    cell: (props) => (
      <TableCell>
        <CollapsableBadgeList
          list={props.getValue() as string[]}
          style={{
            itemBadge: 'bg-ui-700 border-0',
            buttonBadge: 'bg-ui-700 border-0',
          }}
        />
      </TableCell>
    ),
  },
  {
    accessorKey: 'averageRating',
    header: 'Rating',
    cell: (props) => (
      <TableCell>
        <div className="flex flex-row items-center gap-2">
          <p className="text-base-white text-lg">
            {Boolean(props.getValue()) ? props.getValue() : '???'}
          </p>
          {!!props.getValue() && <Star className="h-4 w-4 text-yellow-300" />}
        </div>
      </TableCell>
    ),
  },
  {
    accessorKey: 'runTime',
    header: 'Runtime',
    cell: (props) => (
      <TableCell>
        <p className="text-base-white text-base">
          {Boolean(props.getValue()) ? `${props.getValue()} min` : '???'}
        </p>
      </TableCell>
    ),
  },
  {
    accessorKey: 'languages',
    header: 'Languages',
    cell: (props) => {
      return (
        <TableCell>
          <CollapsableBadgeList list={props.getValue() as string[]} />
        </TableCell>
      );
    },
  },
  {
    accessorKey: 'ageRating',
    header: 'Age Rating',
    cell: (props) => (
      <TableCell>
        <Badge className="text-base-white border-ui-600 text-md flex flex-row items-center justify-center rounded-full border">
          <p>{props.getValue()}</p>
          <p>
            <Plus className="size-3" strokeWidth={3} />
          </p>
        </Badge>
      </TableCell>
    ),
  },
  {
    accessorKey: 'releaseDate',
    header: 'Release Date',
    cell: (props) => (
      <TableCell className="text-base-white">
        <div className="flex flex-row items-center gap-2 text-base">
          <Calendar className="h-5 w-5" />
          {!!props.getValue()
            ? moment(props.getValue() as string).format('DD/MM/YYYY')
            : '???'}
        </div>
      </TableCell>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (props) => (
      <TableCell className="text-base-white text-base">
        <Badge
          className={cn(
            'text-base-white rounded-full px-2',
            (props.getValue() as string) === 'released'
              ? 'bg-brand-600'
              : 'bg-ui-600',
          )}
        >
          {capitalizeFirstLetter(props.getValue() as string)}
        </Badge>
      </TableCell>
    ),
    size: 100,
  },
  {
    id: 'action',
    header: 'Actions',
    cell: (props) => (
      <TableCell>
        <MovieActionDropdown movieId={props.row.original._id} />
      </TableCell>
    ),
    size: 50,
  },
];

/**
 * This returns all the movie details in table format
 */
const MoviesTable = ({
  loading,
  table,
  pagination,
  page,
  setPage,
}: MoviesTableType) => {
  const router = useRouter();
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
              <TableRow
                key={row.id}
                className="hover:bg-ui-800"
                onClick={() => {
                  // navigate to details screen
                  router.push(`/movies/${row.original._id}`);
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <React.Fragment key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </React.Fragment>
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
      <Pagination className="text-base-white mt-2">
        <PaginationContent>
          <PaginationPrevious
            className={
              pagination?.hasPrevious
                ? 'cursor-pointer'
                : 'hover:bg-ui-600 hover:text-base-white cursor-not-allowed'
            }
            onClick={() => {
              if (pagination?.hasPrevious) {
                setPage((s) => s - 1);
              }
            }}
          >
            Previous
          </PaginationPrevious>
          {[...Array(pagination?.totalPages ?? 0)].map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                isActive={page === i + 1}
                onClick={() => {
                  setPage(i + 1);
                }}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationNext
            className={
              pagination?.hasMore
                ? 'cursor-pointer'
                : 'hover:bg-ui-600 hover:text-base-white cursor-not-allowed'
            }
            onClick={() => {
              if (pagination?.hasMore) {
                setPage((s) => s + 1);
              }
            }}
          >
            Next
          </PaginationNext>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default MoviesTable;
