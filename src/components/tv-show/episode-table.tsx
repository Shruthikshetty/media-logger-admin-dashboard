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
import { Calendar, Star } from 'lucide-react';
import EpisodeActionsDropdown from './episode-actions-dropdown';
import moment from 'moment';
import { useRouter } from 'next/navigation';

//create columns for episode table
const episodeColumns: ColumnDef<EpisodeBase, string | number | undefined>[] = [
  {
    accessorKey: 'episodeNumber',
    header: '#',
    size: 50,
  },
  {
    accessorKey: 'stillUrl',
    header: 'Episode',
    cell: (props) => (
      <CustomImage
        alt="tv show poster"
        src={props.getValue() as string}
        width={170}
        height={110}
        className="aspect-[3/2] rounded-lg"
        minHeight={60}
        minWidth={150}
        maxHeight={110}
        maxWidth={170}
        placeHolderClassname="aspect-[3/2] px-4 [&_[data-slot='icon']]:text-ui-400"
      />
    ),
    size: 200,
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
    accessorKey: 'runTime',
    header: 'Runtime',
    cell: (props) => (
      <p className="text-base-white text-base">
        {Boolean(props.getValue()) ? `${props.getValue()} min` : '???'}
      </p>
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
    id: 'action',
    header: 'Actions',
    cell: (props) => (
      <div onClick={(e) => e.stopPropagation()}>
        <EpisodeActionsDropdown data={props.row.original} />
      </div>
    ),
    size: 50,
  },
];

/**
 * This is a table to display all episode data of a tv season
 * @param param0 episodes :- an array of EpisodeBase objects
 * @returns
 */
const EpisodeTable = ({ episodes = [] }: { episodes?: EpisodeBase[] }) => {
  //initialize router
  const router = useRouter();
  //order the episodes by episode number
  const episodesOrdered = [...episodes].sort(
    (a, b) => a.episodeNumber - b.episodeNumber,
  );

  // create a table to display all episode data of a tv season
  const table = useReactTable({
    data: episodesOrdered,
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
            <TableRow
              className="hover:bg-ui-800"
              key={row.id}
              onClick={() => {
                // navigate to episode details
                router.push(`/tv-shows/episode/${row.original._id}`);
              }}
            >
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
