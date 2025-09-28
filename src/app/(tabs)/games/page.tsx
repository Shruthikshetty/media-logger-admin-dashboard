'use client';
import {
  getCoreRowModel,
  RowSelectionState,
  useReactTable,
} from '@tanstack/react-table';
import { Plus, Search, Trash2, Upload } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { LoadingWrapper } from '~/components/custom-loaders';
import GamesTable, { gameColumns } from '~/components/games/games-table';
import MediaFilters from '~/components/media-filters';
import TitleSubtitle from '~/components/title-subtitle';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Skeleton } from '~/components/ui/skeleton';
import { GamesFilterConfig } from '~/constants/config.constants';
import useDelayedLoading from '~/hooks/use-delayed-loading';
import { useFilterGames, useGetAllGames } from '~/services/game-service';

/**
 * This is the main landing page for the games tab
 * contains all the list of games with filters , add games functionality
 * @returns a JSX.Element
 */
const GamesTab = () => {
  // store page state
  const [page, setPage] = useState(1);
  // fetch all the games data
  const { data, isFetching, isError, error } = useFilterGames();
  //extracting delayed loading
  const loading = useDelayedLoading(isFetching);
  // stores row selection state
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  //catch any unexpected errors
  useEffect(() => {
    if (isError)
      toast.error(error?.response?.data?.message ?? error.message, {
        classNames: {
          toast: '!bg-feedback-error',
        },
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  // Create a stable empty array reference for the data prop
  const defaultData = useMemo(
    () => data?.data?.games ?? [],
    [data?.data?.games],
  );
  // Memoize the table state object
  const tableState = useMemo(
    () => ({
      rowSelection,
    }),
    [rowSelection],
  );

  //create a table for games data
  const gamesTable = useReactTable({
    data: defaultData,
    state: tableState,
    columns: gameColumns,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    getRowId: (row) => row._id,
    getCoreRowModel: getCoreRowModel(),
  });

  //derived selected row length
  const selectedRowLength = gamesTable.getSelectedRowModel().rows?.length ?? 0;

  return (
    <div className="flex flex-col gap-5 p-5">
      {/* Header */}
      <div className="flex flex-row items-center justify-between">
        <TitleSubtitle
          title="Games Management"
          subtitle="Manage your game collection"
        />
        <div className="flex flex-col gap-3 md:flex-row">
          <Button
            variant={'outline'}
            type="button"
            aria-label="import games json button"
          >
            <Upload className="mr-1 size-4" />
            Import json
          </Button>
          <Button
            type="button"
            variant={'outline'}
            aria-label="add game"
            className="to-feedback-success-light border-0 bg-gradient-to-r from-green-600 hover:opacity-80"
          >
            <Plus className="mr-1 size-4" />
            Add Game
          </Button>
        </div>
      </div>
      {/* Search bar  and filter*/}
      <Card className="border-ui-600 text-base-white from-base-black to-ui-900 bg-gradient-to-r">
        <CardHeader>
          <CardDescription className="text-base-white flex flex-row items-center text-lg font-semibold">
            Search and filter the Games data
          </CardDescription>
          <div className="flex flex-col gap-4">
            {/* search bar*/}
            <div className="flex flex-row items-center justify-between gap-2">
              <div className="relative max-w-[500px] grow">
                <Search
                  className="absolute top-1/2 ml-2 h-5 w-5 -translate-y-1/2 transform"
                  aria-hidden="true"
                />
                <Input
                  aria-label="Search Games by title"
                  type="text"
                  className="border-ui-600 pl-10"
                  id="search"
                  placeholder="Search games by title"
                />
              </div>
              {selectedRowLength > 0 && (
                <Button
                  variant={'red'}
                  aria-label={`delete selected games (${selectedRowLength})`}
                  onClick={() => {
                    /* @TODO */
                  }}
                  className="ml-auto"
                >
                  <Trash2 className="size-4" />
                  selected ({selectedRowLength})
                </Button>
              )}
            </div>
            {/* filters */}
            <MediaFilters
              config={GamesFilterConfig}
              onFilterChange={() => {
                /* @TODO */
              }}
            />
          </div>
        </CardHeader>
      </Card>
      {/* Games data and table */}
      <Card className="border-ui-600 text-base-white from-base-black to-ui-900 bg-gradient-to-r">
        <CardHeader>
          <LoadingWrapper
            fallback={<Skeleton className="h-4 max-w-50" />}
            isLoading={loading}
          >
            <CardTitle className="text-xl font-semibold">
              Game Directory ({data?.data.pagination.total} games)
            </CardTitle>
          </LoadingWrapper>
          <CardDescription className="text-ui-400 text-sm">
            Complete list of games in your collection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GamesTable
            table={gamesTable}
            loading={loading}
            pagination={data?.data.pagination}
            page={page}
            setPage={setPage}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default GamesTab;
