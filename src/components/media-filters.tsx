'use client';
import React, { useEffect, useState } from 'react';
import DropdownFilter from './dropdown-filter';
import BadgeWithCross from './badge-with-cross';
import { LucideIcon } from 'lucide-react';
import NumberInputFilter from './number-input-filter';
import RangeFilter from './range-filter';
import { FilterLimits } from '~/types/global.types';
import DateFilter from './date-filter';
import moment from 'moment';

export type RangeState = FilterLimits<number | undefined>;

export type DateState = FilterLimits<Date | undefined>;

//all possible filter value types
type FilterValue =
  | string // For single-select dropdowns, text inputs
  | string[] // For multi-select dropdowns
  | number // For number inputs
  | RangeState
  | DateState;

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
  icon?: LucideIcon;
}

//config for number input
export interface NumberInputConfig extends BaseFilterConfig {
  type: 'number-input';
  min?: number;
  max?: number;
  icon?: LucideIcon;
  iconClassName?: string;
  helperText?: string;
}

//config type for range select filter
export interface RangeConfig extends BaseFilterConfig {
  type: 'range';
  min: number;
  max: number;
  icon?: LucideIcon;
  step: number;
  unitLabel?: string;
}

export interface DateConfig extends BaseFilterConfig {
  type: 'date';
  icon?: LucideIcon;
}

// Union of all configurations
export type FilterConfig =
  | DropdownConfig
  | NumberInputConfig
  | RangeConfig
  | DateConfig;

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
        break;
      case 'number-input':
        initialFilters[filter.key] = undefined;
        break;
      case 'range':
        initialFilters[filter.key] = undefined;
        break;
      case 'date':
        initialFilters[filter.key] = undefined;
        break;
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
    generateInitialFilters(config),
  );

  //function to remove a filter
  const handleFilterRemove = (filterName: string) => {
    setFilters((prev) => {
      const cfg = config.find((f) => f.key === filterName);

      if (!cfg) return prev; // Safety fallback

      let resetValue: FilterValue | undefined;

      // Reset the value based on the filter type
      switch (cfg.type) {
        case 'dropdown':
          resetValue = cfg.multiselect ? [] : undefined;
          break;
        case 'number-input':
          resetValue = undefined;
          break;
        case 'range':
          resetValue = undefined;
          break;
        default:
          resetValue = undefined;
      }

      return { ...prev, [filterName]: resetValue };
    });
  };

  //send the filters to the parent
  useEffect(() => {
    if (filters) {
      onFilterChange(filters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row flex-wrap gap-2">
        {/* show filters based on type */}
        {config.map((filter) => {
          switch (filter.type) {
            case 'dropdown':
              return (
                <DropdownFilter
                  Icon={filter?.icon}
                  key={filter.key}
                  options={filter.options}
                  selected={filters[filter.key] as string[] | string}
                  multiselect={filter.multiselect}
                  setSelected={(selected) =>
                    setFilters((prev) => ({ ...prev, [filter.key]: selected }))
                  }
                  label={filter.label}
                />
              );
            case 'number-input':
              return (
                <NumberInputFilter
                  key={filter.key}
                  filters={filter}
                  value={filters[filter.key] as number | undefined}
                  setValue={(value) =>
                    setFilters((prev) => ({ ...prev, [filter.key]: value }))
                  }
                />
              );
            case 'range':
              return (
                <RangeFilter
                  key={filter.key}
                  filters={filter}
                  value={filters[filter.key] as RangeState | undefined}
                  onValueChange={(value) =>
                    setFilters((prev) => ({ ...prev, [filter.key]: value }))
                  }
                />
              );
            case 'date':
              return (
                <DateFilter
                  key={filter.key}
                  filters={filter}
                  value={filters[filter.key] as DateState | undefined}
                  setValue={(value) =>
                    setFilters((prev) => {
                      const someKeyValueDefined = value
                        ? Object.values(value).some(Boolean)
                        : false;
                      return {
                        ...prev,
                        [filter.key]: someKeyValueDefined ? value : undefined,
                      };
                    })
                  }
                />
              );
          }
        })}
      </div>
      {/* Active Filter Badges Display */}
      <div className="flex flex-wrap items-center gap-2">
        {Object.entries(filters).map(([filterName, selectedItems]) => {
          // extract the filter config
          const filterConfig = config.find((f) => f.key === filterName);
          // render badges based on filter type
          switch (filterConfig?.type) {
            case 'dropdown':
              if (typeof selectedItems === 'string') {
                return (
                  <BadgeWithCross
                    key={filterName}
                    label={`${filterConfig.label}: ${selectedItems}`}
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
                    label={`${filterConfig.label}: ${selectedItems?.join(', ')}`}
                    handleClick={() => handleFilterRemove(filterName)}
                  />
                );
              }
              break;
            case 'number-input':
              if (selectedItems !== undefined) {
                return (
                  <BadgeWithCross
                    key={filterName}
                    label={`${filterConfig.label}: ${selectedItems}`}
                    handleClick={() => handleFilterRemove(filterName)}
                  />
                );
              }
              break;
            case 'range':
              if (selectedItems !== undefined) {
                return (
                  <BadgeWithCross
                    key={filterName}
                    label={`${filterConfig.label}: ${(selectedItems as RangeState)?.gte} - ${(selectedItems as RangeState)?.lte}`}
                    handleClick={() => handleFilterRemove(filterName)}
                  />
                );
              }
              break;
            case 'date':
              if (selectedItems !== undefined) {
                return (
                  <BadgeWithCross
                    key={filterName}
                    label={`${filterConfig.label}: ${(selectedItems as DateState)?.gte ? moment((selectedItems as DateState)?.gte).format('DD/MM/YYYY') : '∞'} - ${(selectedItems as DateState)?.lte ? moment((selectedItems as DateState)?.lte).format('DD/MM/YYYY') : '∞'}`}
                    handleClick={() => handleFilterRemove(filterName)}
                  />
                );
              }
              break;
          }
        })}
      </div>
    </div>
  );
};

export default MediaFilters;
