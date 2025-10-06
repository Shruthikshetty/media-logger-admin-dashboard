import {
  ColumnDef,
  flexRender,
  Table as ReactTable,
} from '@tanstack/react-table';
import React from 'react';
import { TvShowBase } from '~/services/tv-show-service';
import CustomImage from '../custom-image';
import { TableSkeleton } from '../custom-loaders';
import type { Pagination as PaginationType } from '~/types/global.types';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import TablePagination from '../table-pagination';
import CollapsableBadgeList from '../collapsable-badge-list';
import { Calendar, Plus, Star } from 'lucide-react';

import moment from 'moment';
import { capitalizeFirstLetter } from '~/lib/formatting';
import { cn } from '~/lib/utils';
import { Badge } from '../ui/badge';
import TvShowActionDropdown from './tv-show-actions-dropdown';
import { Checkbox } from '../ui/checkbox';

//define a type for the tv shows table
type TvShowTableProps = {
  loading: boolean;
  table: ReactTable<TvShowBase>;
  pagination?: PaginationType;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

//creating columns for the tv shows table
export const tvShowColumns: ColumnDef<
  TvShowBase,
  string | number | undefined | string[]
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
    header: 'Tv Show',
    cell: (props) => (
      <CustomImage
        alt="tv show poster"
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
    accessorKey: 'avgRunTime',
    header: 'Runtime',
    cell: (props) => (
      <p className="text-base-white text-base">
        {Boolean(props.getValue()) ? `${props.getValue()} min` : '???'}
      </p>
    ),
  },
  {
    accessorKey: 'languages',
    header: 'Languages',
    cell: (props) => {
      return <CollapsableBadgeList list={props.getValue() as string[]} />;
    },
  },
  {
    accessorKey: 'ageRating',
    header: 'Age Rating',
    cell: (props) => (
      <Badge className="text-base-white border-ui-600 text-md flex flex-row items-center justify-center rounded-full border">
        <p>{props.getValue()}</p>
        <p>
          <Plus className="size-3" strokeWidth={3} />
        </p>
      </Badge>
    ),
  },
  {
    accessorKey: 'totalSeasons',
    header: 'Seasons',
    cell: (props) => (
      <p className="text-base-white text-lg font-semibold">{props.getValue()}</p>
    ),
  },
  {
    accessorKey: 'releaseDate',
    header: 'Release Date',
    cell: (props) => (
      <div className="flex flex-row items-center gap-2 text-base">
        <Calendar className="h-5 w-5" />
        {!!props.getValue()
          ? moment(props.getValue() as string).format('DD/MM/YYYY')
          : '???'}
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (props) => (
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
    ),
    size: 100,
  },
  {
    id: 'action',
    header: 'Actions',
    cell: (props) => <TvShowActionDropdown data={props.row.original} />,
    size: 50,
  },
];

const TvShowTable = ({
  loading,
  table,
  page,
  setPage,
  pagination,
}: TvShowTableProps) => {
  //if loading return a skeleton table
  if (loading) return <TableSkeleton />;

  // in case not loading return the table
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

export default TvShowTable;
