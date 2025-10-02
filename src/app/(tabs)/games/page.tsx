'use client';
import {
  getCoreRowModel,
  RowSelectionState,
  useReactTable,
} from '@tanstack/react-table';
import { Plus, Search, Trash2, Upload } from 'lucide-react';
import moment from 'moment';
import React, { useDeferredValue, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { LoadingWrapper } from '~/components/custom-loaders';
import AddGameDialog from '~/components/games/add-game-dialog';
import GamesTable, { gameColumns } from '~/components/games/games-table';
import ImportGamesJson from '~/components/games/import-games-json-dialog';
import MediaFilters, {
  DateState,
  FiltersState,
} from '~/components/media-filters';
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
import { gameStatus, useFilterGames } from '~/services/game-service';
import { FilterLimits } from '~/types/global.types';

//filter data type
interface FiltersType extends FiltersState {
  genre: string[];
  averageRating: number;
  ageRating: FilterLimits<number>;
  releaseDate: DateState;
  status: gameStatus;
  platforms: string[];
}

/**
 * This is the main landing page for the games tab
 * contains all the list of games with filters , add games functionality
 * @returns a JSX.Element
 */
const GamesTab = () => {
  // store page state
  const [page, setPage] = useState(1);
  // holds th search text for games
  const [searchText, setSearchText] = useState<string>('');
  // derive a differed value
  const deferredSearchText = useDeferredValue(searchText);
  // store filters data for games
  const [filters, setFilters] = useState<FiltersType>(null!);
  //memorize filter query
  const gamesFilterQuery = useMemo(
    () => ({
      page,
      limit: 20, // set to 20 by default
      genre: filters?.genre?.length > 0 ? filters?.genre : undefined,
      releaseDate: filters?.releaseDate
        ? {
            gte: filters.releaseDate?.gte
              ? moment(filters.releaseDate?.gte).toISOString()
              : undefined,
            lte: filters.releaseDate?.lte
              ? moment(filters.releaseDate?.lte).toISOString()
              : undefined,
          }
        : undefined,
      ageRating: filters?.ageRating,
      averageRating: filters?.averageRating,
      status: filters?.status,
      platforms:
        filters?.platforms?.length > 0 ? filters?.platforms : undefined,
      searchText: deferredSearchText,
    }),
    [page, filters, deferredSearchText],
  );

  // fetch all the games data
  const { data, isFetching, isError, error, isLoading } =
    useFilterGames(gamesFilterQuery);
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
  const rows = gamesTable.getRowModel().rows;
  // ion case the page is empty and it's not the first page, go back one page
  useEffect(() => {
    // This effect runs only when the number of rows or the page changes
    if (!isLoading && rows.length === 0 && page > 1) {
      // If the current page is empty and it's not the first page, go back one page.
      setPage(page - 1);
    }
  }, [rows.length, page, isLoading, setPage]);

  return (
    <div className="flex flex-col gap-5 p-5">
      {/* Header */}
      <div className="flex flex-row items-center justify-between">
        <TitleSubtitle
          title="Games Management"
          subtitle="Manage your game collection"
        />
        <div className="flex flex-col gap-3 md:flex-row">
          <ImportGamesJson>
            <Button
              variant={'outline'}
              type="button"
              aria-label="import games json button"
            >
              <Upload className="mr-1 size-4" />
              Import json
            </Button>
          </ImportGamesJson>
          <AddGameDialog>
            <Button
              type="button"
              variant={'outline'}
              aria-label="add game"
              className="to-feedback-success-light border-0 bg-gradient-to-r from-green-600 hover:opacity-80"
            >
              <Plus className="mr-1 size-4" />
              Add Game
            </Button>
          </AddGameDialog>
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
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
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
              onFilterChange={(newFilters) => {
                // reset page
                setPage(1);
                // set new filters
                setFilters(newFilters as FiltersType);
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
