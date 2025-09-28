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
import CustomImage from '../custom-image';
import CollapsableBadgeList from '../collapsable-badge-list';
import { Calendar, Plus, Star } from 'lucide-react';
import { Badge } from '../ui/badge';
import moment from 'moment';
import { capitalizeFirstLetter } from '~/lib/formatting';
import { cn } from '~/lib/utils';
import { Checkbox } from '../ui/checkbox';
import GamesActionsDropdown from './games-actions-dropdown';

type GamesTableProps = {
  table: ReactTable<Game>;
  loading: boolean;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pagination?: PaginationType;
};

//creating columns for the games table
export const gameColumns: ColumnDef<Game, string | string[] | number>[] = [
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
      <div onClick={(e) => e.stopPropagation()}>
        <Checkbox
          className="data-[state=checked]:bg-base-white data-[state=checked]:text-base-black"
          checked={props.row.getIsSelected()}
          aria-label="select row"
          onCheckedChange={() => {
            props.row.toggleSelected();
          }}
        />
      </div>
    ),
    size: 50,
  },
  {
    accessorKey: 'posterUrl',
    header: 'Game',
    cell: (props) => (
      <CustomImage
        alt="game poster"
        src={props.getValue() as string}
        width={80}
        height={150}
        className="aspect-[2/3] rounded-lg"
        maxHeight={150}
        maxWidth={100}
        minHeight={100}
        minWidth={60}
        placeHolderClassname="aspect-[2/3] px-4 [&_[data-slot='icon']]:text-ui-400"
      />
    ),
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: (props) => (
      <div>
        <p className="text-lg font-semibold">{props.getValue()}</p>
        <p className="text-small text-ui-400 line-clamp-3 text-wrap">
          {props.row.original.description}
        </p>
      </div>
    ),
    size: 500,
  },
  {
    accessorKey: 'developer',
    header: 'Developer',
    cell: (props) => (
      <p className="text-base-white line-clamp-2 text-base">
        {(props?.getValue() as string) ?? '???'}
      </p>
    ),
  },
  {
    accessorKey: 'genre',
    header: 'Genre',
    cell: (props) => (
      <CollapsableBadgeList
        list={props.getValue() as string[]}
        style={{
          itemBadge: 'bg-ui-700 border-0',
          buttonBadge: 'bg-ui-700 border-0',
        }}
      />
    ),
  },
  {
    accessorKey: 'averageRating',
    header: 'Rating',
    cell: (props) => (
      <div className="flex flex-row items-center gap-2">
        <p className="text-base-white text-lg">
          {Boolean(props.getValue()) ? props.getValue() : '???'}
        </p>
        {!!props.getValue() && <Star className="h-4 w-4 text-yellow-300" />}
      </div>
    ),
  },
  {
    accessorKey: 'platforms',
    header: 'Platforms',
    cell: (props) => {
      return <CollapsableBadgeList list={props.getValue() as string[]} />;
    },
  },
  {
    accessorKey: 'ageRating',
    header: 'Age Rating',
    cell: (props) => (
      <Badge className="text-base-white border-ui-600 text-md flex flex-row items-center justify-center rounded-full border">
        <p>{props.getValue() ?? 'Un'}</p>
        {props.getValue() && (
          <p>
            <Plus className="size-3" strokeWidth={3} />
          </p>
        )}
      </Badge>
    ),
  },
  {
    accessorKey: 'releaseDate',
    header: 'Release Date',
    cell: (props) => (
      <div className="text-base-white">
        <div className="flex flex-row items-center gap-2 text-base">
          <Calendar className="h-5 w-5" />
          {!!props.getValue()
            ? moment(props.getValue() as string).format('DD/MM/YYYY')
            : '???'}
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (props) => (
      <div className="text-base-white text-base">
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
      </div>
    ),
    size: 100,
  },
  {
    id: 'action',
    header: 'Actions',
    cell: (props) => (
      <div onClick={(e) => e.stopPropagation()}>
        <GamesActionsDropdown game={props.row.original} />
      </div>
    ),
    size: 50,
  },
];

/**
 * This contains the table part of the games tab
 * all the games data will be displayed here in table format
 * to be used in games tab
 */
const GamesTable = ({
  table,
  loading,
  page,
  setPage,
  pagination,
}: GamesTableProps) => {
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
