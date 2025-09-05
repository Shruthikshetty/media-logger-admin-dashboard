'use client';
import React, { useEffect, useState } from 'react';
import DropdownFilter from './dropdown-filter';
import BadgeWithCross from './badge-with-cross';
import { LucideIcon } from 'lucide-react';

//all possible filter value types
type FilterValue =
  | string // For single-select dropdowns, text inputs
  | string[]; // For multi-select dropdowns

// filter state type
export type FiltersState = Record<string, FilterValue | undefined>;

//base filter config
interface BaseFilterConfig {
  key: string;
  label: string;
}

//config type for dropdown
interface DropdownConfig extends BaseFilterConfig {
  type: 'dropdown';
  multiselect: boolean;
  options: string[];
  icon?: LucideIcon 
}

// Union of all configurations
export type FilterConfig = DropdownConfig;

type MediaFiltersProps = {
  config: FilterConfig[];
  onFilterChange: (filters: FiltersState) => void;
};

//generate initial filters based on config
const generateInitialFilters = (config: FilterConfig[]) => () => {
  const initialFilters: FiltersState = {};
  config.forEach((filter) => {
    switch (filter.type) {
      case 'dropdown':
        initialFilters[filter.key] = filter.multiselect ? [] : undefined;
    }
  });
  return initialFilters;
};
 
/**
 * This component is used to configure and provide filters
 * for diff media type based on the config provided
 */
const MediaFilters = ({ config, onFilterChange }: MediaFiltersProps) => {
  // store the selected filters
  const [filters, setFilters] = useState<FiltersState>(
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
                Icon={filter?.icon}
                key={filter.key}
                options={filter.options}
                selected={filters[filter.key] as string[] | string}
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
          console.log(filterName);
          switch (config.find((filter) => filter.key === filterName)?.type) {
            case 'dropdown':
              if (typeof selectedItems === 'string') {
                return (
                  <BadgeWithCross
                    key={filterName}
                    label={selectedItems}
                    handleClick={() => handleFilterRemove(filterName)}
                  />
                );
              } else if (
                Array.isArray(selectedItems) &&
                selectedItems.length > 0
              ) {
                return (
                  <BadgeWithCross
                    key={filterName}
                    label={selectedItems?.join(', ')}
                    handleClick={() => handleFilterRemove(filterName)}
                  />
                );
              }
          }
        })}
      </div>
    </div>
  );
};

export default MediaFilters;
