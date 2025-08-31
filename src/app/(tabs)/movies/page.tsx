'use client';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { PlusIcon, Search, UploadIcon } from 'lucide-react';
import React, { useEffect } from 'react';
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
import { useFetchMovies } from '~/services/movies-service';

/**
 * this renders the movies screen containing all movies list
 * @returns the movies tab
 */
const MoviesTab = () => {
  //custom hook for getting all the movies (its a mutation hook)
  const { data, isPending, mutate } = useFetchMovies();
  //fetch all the movies at initial render
  useEffect(() => {
    mutate();
  }, [mutate]);

  // create a table with all the movies data
  const movieTable = useReactTable({
    data: data?.data.movies || [],
    columns: movieColumns,
    getCoreRowModel: getCoreRowModel(),
  });

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
          <CardDescription hidden>
            Search and filter the Movies date
          </CardDescription>
          <div className="relative max-w-[500px]">
            <Search className="absolute top-1/2 ml-2 h-5 w-5 -translate-y-1/2 transform" />
            <Input
              type="text"
              className="border-ui-400 pl-10"
              id="search"
              placeholder="Search movies by title or description..."
            />
          </div>
          {/* @TODO Filters  */}
        </CardHeader>
      </Card>
      {/* all the movie data goes here */}
      <Card className="border-ui-600 text-base-white from-base-black to-ui-900 bg-gradient-to-r">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            TV Shows Directory (2 shows)
          </CardTitle>
          <CardDescription className="text-ui-400 text-sm">
            Complete list of TV shows available on the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MoviesTable loading={isPending} table={movieTable} />
        </CardContent>
      </Card>
    </div>
  );
};

export default MoviesTab;
