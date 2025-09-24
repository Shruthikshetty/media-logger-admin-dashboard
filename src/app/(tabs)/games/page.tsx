'use client';
import { Plus, Search, Upload } from 'lucide-react';
import React from 'react';
import GamesTable from '~/components/games/games-table';
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
import { GamesFilterConfig } from '~/constants/config.constants';

/**
 * This is the mai landing page for the games tab
 * contains all the list of games with filters , add games functionality
 * @returns a JSX.Element
 */
const GamesTab = () => {
  return (
    <div className="flex flex-col gap-5 p-5">
      {/* Header */}
      <div className="flex flex-row items-center justify-between">
        <TitleSubtitle
          title="Users Management"
          subtitle="Manage your platform users and permissions"
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
                placeholder="Search movies by title"
              />
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
          <CardTitle className="text-xl font-semibold">
            Game Directory (100 games)
          </CardTitle>
          <CardDescription className="text-ui-400 text-sm">
            Complete list of games in your collection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GamesTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default GamesTab;
