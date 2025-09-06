'use client';
import {
  getCoreRowModel,
  RowSelectionState,
  useReactTable,
} from '@tanstack/react-table';
import { Plus, Search, Trash2, Upload } from 'lucide-react';
import React, { useState } from 'react';
import MediaFilters from '~/components/media-filters';
import MoviesTable, { movieColumns } from '~/components/movies-table';
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
import { MovieFilterConfig } from '~/constants/config.constants';
import { useFilterMovies } from '~/services/movies-service';

/**
 * this renders the movies screen containing all movies list
 * @returns the movies tab
 */
const MoviesTab = () => {
  // stores the current pagination page
  const [page, setPage] = useState(1);
  // stores row selection state
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  // custom hook for getting all the movies
  const { data, isLoading } = useFilterMovies({ page, limit: 20 });

  // create a table with all the movies data
  const movieTable = useReactTable({
    data: data?.data.movies || [],
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    getRowId: (row) => row._id,
    columns: movieColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  //derived selected row length
  const selectedRowLength = movieTable.getSelectedRowModel().rows?.length ?? 0;

  //@TODO in progress
  //function to handle deleting selected rows
  const handleBulkDelete = () => {
    //in case no row is selected
    if (selectedRowLength === 0) return;
    const getSelectedMovieIds = movieTable
      .getSelectedRowModel()
      .rows.map((row) => row.original._id);
    console.log(getSelectedMovieIds);
  };

  return (
    <div className="flex flex-col gap-5 p-5">
      {/* Header */}
      <div className="flex flex-row items-center justify-between">
        <TitleSubtitle
          title="Movies Management"
          subtitle="Manage your movie collection"
        />
        <div className="flex flex-col gap-3 md:flex-row">
          <Button variant={'outline'}>
            <Upload className="mr-1 size-4" />
            Import json
          </Button>
          <Button
            variant={'outline'}
            className="from-brand-200 to-brand-600 border-0 bg-gradient-to-r hover:opacity-80"
          >
            <Plus className="mr-1 size-4" />
            Add Movie
          </Button>
        </div>
      </div>

      {/* Search bar  and filter*/}
      <Card className="border-ui-600 text-base-white from-base-black to-ui-900 bg-gradient-to-r">
        <CardHeader>
          <CardDescription className="text-base-white flex flex-row items-center text-lg font-semibold">
            Search and filter the Movies data
          </CardDescription>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center justify-between gap-2">
              <div className="relative max-w-[500px] grow">
                <Search
                  className="absolute top-1/2 ml-2 h-5 w-5 -translate-y-1/2 transform"
                  aria-hidden="true"
                />
                <Input
                  aria-label="Search movies by title"
                  type="text"
                  className="border-ui-600 pl-10"
                  id="search"
                  placeholder="Search movies by title"
                />
              </div>
              {selectedRowLength > 0 && (
                <Button
                  variant={'red'}
                  aria-label={`delete selected movies (${selectedRowLength})`}
                  onClick={handleBulkDelete}
                  className="ml-auto"
                >
                  <Trash2 className="size-4" />
                  selected ({selectedRowLength})
                </Button>
              )}
            </div>
            <MediaFilters
              config={MovieFilterConfig}
              onFilterChange={(filters) => {
                console.log(filters);
              }}
            />
          </div>
        </CardHeader>
      </Card>
      {/* all the movie data goes here */}
      <Card className="border-ui-600 text-base-white from-base-black to-ui-900 bg-gradient-to-r">
        <CardHeader>
          {isLoading ? (
            <Skeleton className="h-4 max-w-50" />
          ) : (
            <CardTitle className="text-xl font-semibold">
              Movie Directory ({data?.data.pagination.total} movies)
            </CardTitle>
          )}
          <CardDescription className="text-ui-400 text-sm">
            Complete list of movies in your collection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MoviesTable
            loading={isLoading}
            table={movieTable}
            page={page}
            setPage={setPage}
            pagination={data?.data.pagination}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default MoviesTab;
