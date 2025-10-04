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
    accessorKey: 'posterUrl',
    header: 'Tv Show',
    cell: (props) => (
      <CustomImage
        alt="tv show poster"
        //@TODO: replace with actual poster
        src={
          'https://i.imgur.com/z0aTtxK_d.webp?maxwidth=520&shape=thumb&fidelity=high'
        }
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
];

const TvShowTable = ({ loading, table }: TvShowTableProps) => {
  //if loading return a skeleton table
  if (loading) return <TableSkeleton />;

  // in case not loading return the table
  return (
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
  );
};

export default TvShowTable;
