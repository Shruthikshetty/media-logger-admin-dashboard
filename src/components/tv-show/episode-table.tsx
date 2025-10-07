import React from 'react';
import { EpisodeBase } from '~/services/tv-episode-service';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import CustomImage from '../custom-image';

//create columns for episode table
const episodeColumns: ColumnDef<EpisodeBase, string | number | undefined>[] = [
  {
    accessorKey: 'stillUrl',
    header: 'Episode',
    cell: (props) => (
      <CustomImage
        alt="tv show poster"
        src={props.getValue() as string}
        width={170}
        height={70}
        className="aspect-[3/2] rounded-lg"
        minHeight={60}
        minWidth={150}
        placeHolderClassname="aspect-[3/2] px-4 [&_[data-slot='icon']]:text-ui-400"
      />
    ),
    size: 200
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: (props) => (
      <div>
        <p className="text-lg font-semibold">{props.getValue()}</p>
        <p className="text-small text-ui-400 line-clamp-3 font-normal text-wrap">
          {props.row.original.description}
        </p>
      </div>
    ),
    size: 500,
  },
];

/**
 * This is a table to display all episode data of a tv season
 * @param param0 episodes :- an array of EpisodeBase objects
 * @returns
 */
const EpisodeTable = ({ episodes = [] }: { episodes?: EpisodeBase[] }) => {
  // create a table to display all episode data of a tv season
  const table = useReactTable({
    data: episodes,
    columns: episodeColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <ScrollArea className="rounded-md pb-3 whitespace-nowrap">
      <Table className="min-w-full">
        {/* table header */}
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow className="hover:bg-ui-800" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  style={{
                    width: header.column.columnDef.size,
                  }}
                  key={header.id}
                  className="text-ui-200 text-base font-bold"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        {/* table body */}
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow className="hover:bg-ui-800" key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  className="text-ui-200 text-base font-bold"
                  key={cell.id}
                >
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

export default EpisodeTable;
