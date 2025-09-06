'use client';
import React, { useState } from 'react';
import { Input } from './ui/input';
import { NumberInputConfig } from './media-filters';
import { cn } from '~/lib/utils';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { X } from 'lucide-react';

type NumberInputFilterProps = {
  filters: NumberInputConfig;
  value: number | undefined;
  setValue: (value: number | undefined) => void;
};

/**
 * This component is used in Media filter
 * provides a input with number type
 * with min max values
 */
const NumberInputFilter = ({
  filters,
  setValue,
  value,
}: NumberInputFilterProps) => {
  //store popover open state
  const [open, setOpen] = useState(false);

  //handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const newValue = Number(inputValue);

    // If input is empty, reset value to undefined (or "")
    if (inputValue === '') {
      setValue(undefined);
      return;
    }

    // Only proceed if newValue is a valid number
    if (!isNaN(newValue)) {
      if (filters.max !== undefined && newValue > filters.max) {
        setValue(filters.max);
      } else if (filters.min !== undefined && newValue < filters.min) {
        setValue(filters.min);
      } else {
        setValue(newValue);
      }
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-ui-600"
          aria-label={filters.label + ' filter'}
        >
          {filters?.icon && (
            <filters.icon className={cn('h-4 w-4', filters?.iconClassName)} />
          )}
          <p className="text-base-white text-md font-semibold">
            {value !== undefined ? value : filters.label}
          </p>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="bg-base-black text-base-white border-ui-600"
        align="start"
      >
        <X
          className="hover:bg-ui-600 absolute top-2 right-2 h-4 w-4 cursor-pointer rounded-full"
          onClick={() => setOpen(false)}
        />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setOpen(false);
          }}
        >
          <Label className="text-md mb-2 font-semibold" htmlFor="filter-input">
            {filters.label}
          </Label>
          <div className="relative">
            {filters?.icon && (
              <filters.icon
                className={cn(
                  'absolute top-1/2 left-4 h-4 w-4 -translate-x-1/2 -translate-y-1/2',
                  filters?.iconClassName,
                )}
              />
            )}
            <Input
              id="filter-input"
              value={value === undefined || value === null ? '' : value}
              className="border-ui-600 placeholder:text-ui-400 text-md h-9 pl-9 font-semibold"
              type="number"
              placeholder={filters.label}
              max={filters.max}
              min={filters.min}
              onChange={handleChange}
            />
          </div>
          {filters?.helperText && (
            <p className="text-ui-400 mt-2 text-xs">{filters.helperText}</p>
          )}
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default NumberInputFilter;
