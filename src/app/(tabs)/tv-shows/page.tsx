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
import MediaFilters, {
  DateState,
  FiltersState,
} from '~/components/media-filters';
import TitleSubtitle from '~/components/title-subtitle';
import AddTvShowDialog from '~/components/tv-show/add-tv-show-dialog';
import ImportTvShowJsonDialog from '~/components/tv-show/import-tv-show-json-dialog';
import TvShowTable, { tvShowColumns } from '~/components/tv-show/tv-show-table';
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
import { TvShowsFilterConfig } from '~/constants/config.constants';
import useDelayedLoading from '~/hooks/use-delayed-loading';
import {
  useBulkDeleteTvShow,
  useFetchTvShowByFilter,
} from '~/services/tv-show-service';
import { useSpinnerStore } from '~/state-management/spinner-store';
import { FilterLimits } from '~/types/global.types';

//filter data type
interface FiltersType extends FiltersState {
  searchText?: string;
  genre: string[];
  status: string;
  languages: string[];
  averageRating: number;
  releaseDate: DateState;
  tags: string[];
  ageRating: FilterLimits<number>;
  avgRunTime: FilterLimits<number>;
  totalSeasons: FilterLimits<number>;
}

/**
 * This is the main landing page for the Tv shows tab
 * contains all the list of tv shows with filters , add Tv show functionality
 * @returns a JSX.Element
 */
const TvShowTab = () => {
  // stores the current pagination page
  const [page, setPage] = useState(1);
  // store filters data for tv shows
  const [filters, setFilters] = useState<FiltersType>(null!);
  // holds th search text for tv show
  const [searchText, setSearchText] = useState<string>('');
  // derive a differed value
  const deferredSearchText = useDeferredValue(searchText);
  //initialize hook for bulk deleting of tv shows
  const { mutate: bulkDeleteMutation, isPending: isBulkDeleting } =
    useBulkDeleteTvShow();
  //get spinner state
  const setShowSpinner = useSpinnerStore((s) => s.setShowSpinner);
  // stores row selection state
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  // memorize the games filter query
  const memorizedFilterQuery = useMemo(
    () => ({
      page,
      limit: 20,
      ageRating: filters?.ageRating,
      averageRating: filters?.averageRating,
      status: filters?.status,
      avgRunTime: filters?.avgRunTime,
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
      totalSeasons: filters?.totalSeasons,
      tags: filters?.tags?.length > 0 ? filters?.tags : undefined,
      genre: filters?.genre?.length > 0 ? filters?.genre : undefined,
      languages:
        filters?.languages?.length > 0 ? filters?.languages : undefined,
      searchText: deferredSearchText,
    }),
    [page, filters, deferredSearchText],
  );
  // fetch all tv shows using custom hook
  const { data, isFetching, isLoading } =
    useFetchTvShowByFilter(memorizedFilterQuery);
  //extracting delayed loading
  const loading = useDelayedLoading(isFetching);
  // Create a stable empty array reference for the data prop
  const defaultData = useMemo(
    () => data?.data?.tvShows ?? [],
    [data?.data?.tvShows],
  );
  // Memoize the table state object
  const tableState = useMemo(
    () => ({
      rowSelection,
    }),
    [rowSelection],
  );
  //create a table with all the tv shows data
  const tvShowTable = useReactTable({
    data: defaultData,
    columns: tvShowColumns,
    state: tableState,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    getRowId: (row) => row._id,
    getCoreRowModel: getCoreRowModel(),
  });

  //derived selected row length
  const selectedRowLength = tvShowTable.getSelectedRowModel().rows?.length ?? 0;
  const rows = tvShowTable.getRowModel().rows;
  // ion case the page is empty and it's not the first page, go back one page
  useEffect(() => {
    // This effect runs only when the number of rows or the page changes
    if (!isLoading && rows.length === 0 && page > 1) {
      // If the current page is empty and it's not the first page, go back one page.
      setPage(page - 1);
    }
  }, [rows.length, page, isLoading, setPage]);

  // handle deletion of selected tv shows
  const handleBulkDelete = () => {
    //in case no row is selected
    if (selectedRowLength === 0) return;
    // get all the selected tv show ids
    const getSelectedTvShowIds = tvShowTable
      .getSelectedRowModel()
      .rows.map((row) => row.original._id);
    //start loading
    setShowSpinner(true);
    // make api call to delete the tv shows
    bulkDeleteMutation(getSelectedTvShowIds, {
      onSuccess: (data) => {
        toast.success(data?.message ?? 'Tv shows deleted successfully', {
          classNames: {
            toast: '!bg-feedback-success',
          },
        });
      },
      onError: (error) => {
        toast.error(error.response?.data?.message ?? 'Something went wrong', {
          classNames: {
            toast: '!bg-feedback-error',
          },
        });
      },
      onSettled: () => {
        // stop loading
        setShowSpinner(false);
      },
    });
  };

  return (
    <div className="flex flex-col gap-5 p-5">
      {/* Header */}
      <div className="flex flex-row items-center justify-between gap-3">
        <TitleSubtitle
          title="TV Shows Management"
          subtitle="Manage your TV shows directory"
        />
        <div className="flex flex-col gap-3 md:flex-row">
          <ImportTvShowJsonDialog>
            <Button
              variant={'outline'}
              type="button"
              aria-label="import TV shows JSON"
            >
              <Upload className="mr-1 size-4" />
              Import json
            </Button>
          </ImportTvShowJsonDialog>
          <AddTvShowDialog>
            <Button
              type="button"
              variant={'outline'}
              aria-label="add TV show"
              className="to-accent-purple border-0 bg-gradient-to-r from-purple-700 hover:opacity-80"
            >
              <Plus className="mr-1 size-4" />
              Add TV Show
            </Button>
          </AddTvShowDialog>
        </div>
      </div>
      {/* Search bar  and filter*/}
      <Card className="border-ui-600 text-base-white from-base-black to-ui-900 bg-gradient-to-r">
        <CardHeader>
          <CardDescription className="text-base-white flex flex-row items-center text-lg font-semibold">
            Search and filter the Tv shows data
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
                  aria-label="Search Tv show by title"
                  type="text"
                  className="border-ui-600 pl-10"
                  id="search"
                  placeholder="Search Tv show by title"
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                />
              </div>
              {selectedRowLength > 0 && (
                <Button
                  variant={'red'}
                  aria-label={`delete selected tv shows (${selectedRowLength})`}
                  className="ml-auto"
                  onClick={handleBulkDelete}
                  disabled={isBulkDeleting}
                >
                  <Trash2 className="size-4" />
                  selected ({selectedRowLength})
                </Button>
              )}
            </div>
            {/* filters */}
            <MediaFilters
              config={TvShowsFilterConfig}
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
      {/* Tv show data and table */}
      <Card className="border-ui-600 text-base-white from-base-black to-ui-900 bg-gradient-to-r">
        <CardHeader>
          <LoadingWrapper
            isLoading={loading}
            fallback={<Skeleton className="h-5 w-[60%] lg:w-[40%]" />}
          >
            <CardTitle className="text-xl font-semibold">
              TV Shows Directory ({data?.data.pagination.total} shows)
            </CardTitle>
          </LoadingWrapper>
          <CardDescription className="text-ui-400 text-sm">
            Complete list of TV shows in your collection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TvShowTable
            loading={loading}
            table={tvShowTable}
            page={page}
            setPage={setPage}
            pagination={data?.data.pagination}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TvShowTab;
