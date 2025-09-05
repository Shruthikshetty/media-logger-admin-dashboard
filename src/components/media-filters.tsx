'use client';
import React, { useEffect, useState } from 'react';
import DropdownFilter from './dropdown-filter';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { X } from 'lucide-react';

export interface FilterConfig {
  key: string;
  label: string;
  type: 'dropdown';
  multiselect: boolean;
  options: string[];
}

type MediaFiltersProps = {
  config: FilterConfig[];
  onFilterChange: (filters: Record<string, string[]>) => void;
};

//generate initial filters based on config
const generateInitialFilters = (config: FilterConfig[]) => () => {
  const initialFilters: Record<string, string[]> = {};
  config.forEach((filter) => {
    initialFilters[filter.key] = [];
  });
  return initialFilters;
};

/**
 * This component is used to configure and provide filters
 * for diff media type based on the config provided
 */
const MediaFilters = ({ config, onFilterChange }: MediaFiltersProps) => {
  // store the selected filters
  const [filters, setFilters] = useState<Record<string, string[]>>(
    generateInitialFilters(config)(),
  );

  //function to remove a filter
  const handleFilterRemove = (filterName: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: [],
    }));
  };

  //send the filters to the parent
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row flex-wrap gap-2">
        {/* show filters based on type */}
        {config.map((filter) => {
          if (filter.type === 'dropdown') {
            return (
              <DropdownFilter
                key={filter.key}
                options={filter.options}
                selected={filters[filter.key]}
                multiselect={filter.multiselect}
                setSelected={(selected) =>
                  setFilters({ ...filters, [filter.key]: selected })
                }
                label={filter.label}
              />
            );
          }
        })}
      </div>
      {/* Active Filter Badges Display */}
      <div className="flex flex-wrap items-center gap-2">
        {Object.entries(filters).map(([filterName, selectedItems]) => {
          if (selectedItems.length === 0) return null;
          return (
            <Badge
              key={`${filterName}`} // Create a unique key
              className="bg-ui-700 flex items-center gap-1 rounded-full pr-1 pl-2.5"
            >
              <span className="text:xs">
                {filterName}: {selectedItems.map((item) => item).join(', ')}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-muted h-5 w-5 rounded-full p-0"
                onClick={handleFilterRemove.bind(null, filterName)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          );
        })}
      </div>
    </div>
  );
};

export default MediaFilters;
