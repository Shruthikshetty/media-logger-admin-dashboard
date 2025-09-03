'use client';
import {
  getCoreRowModel,
  RowSelectionState,
  useReactTable,
} from '@tanstack/react-table';
import { PlusIcon, Search, Trash2, UploadIcon } from 'lucide-react';
import React, { useState } from 'react';
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
import { useFetchMovies } from '~/services/movies-service';

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
  const { data, isLoading } = useFetchMovies({ page, limit: 20 });

  // create a table with all the movies data
  const movieTable = useReactTable({
    data: data?.data.movies || [],
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    columns: movieColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  //@TODO in progress
  //function to handle deleting selected rows
  const handleBulkDelete = () => {
    //in case no row is selected
    if (Object.keys(rowSelection).length === 0) return;
    const getSelectedMovieIds = Object.keys(rowSelection).map((key) => {
      return data?.data.movies[key as unknown as number]._id;
    });
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
            <UploadIcon className="mr-1 size-4" />
            Import json
          </Button>
          <Button
            variant={'outline'}
            className="from-brand-200 to-brand-600 border-0 bg-gradient-to-r hover:opacity-80"
          >
            <PlusIcon className="mr-1 size-4" />
            Add Movie
          </Button>
        </div>
      </div>

      {/* Search bar  and filter*/}
      <Card className="border-ui-600 text-base-white from-base-black to-ui-900 bg-gradient-to-r">
        <CardHeader>
          <CardDescription className="sr-only">
            Search and filter the Movies data
          </CardDescription>
          <div className="flex flex-row items-center justify-between gap-2">
            <div className="relative max-w-[500px] grow">
              <Search className="absolute top-1/2 ml-2 h-5 w-5 -translate-y-1/2 transform" />
              <Input
                type="text"
                className="border-ui-400 pl-10"
                id="search"
                placeholder="Search movies by title"
              />
            </div>
            {Object.keys(rowSelection).length > 0 && (
              <Button
                variant={'red'}
                aria-label="delete selected button"
                onClick={handleBulkDelete}
                className="ml-auto"
              >
                <Trash2 className="size-4" />
                selected
              </Button>
            )}
          </div>
          {/* @TODO Filters  */}
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
