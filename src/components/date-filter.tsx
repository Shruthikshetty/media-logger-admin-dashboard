'use client';
import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { DateConfig, DateState } from './media-filters';
import { Minus, X } from 'lucide-react';
import { PopoverClose } from '@radix-ui/react-popover';
import moment from 'moment';

/**
 * This component is used in media filters
 * provides a date picker with range
 * @returns JSX.Element
 */
const DateFilter = ({
  filters,
  value,
  setValue,
}: {
  filters: DateConfig;
  value: DateState | undefined;
  setValue: (value: DateState | undefined) => void;
}) => {
  const [dateType, setDateType] = React.useState<'from' | 'to'>('from');

  //handle Value Select
  const handleValueChange = (date: Date | undefined) => {
    if (dateType === 'from') {
      setValue({
        gte: date,
        lte: value?.lte,
      });
    } else {
      setValue({
        gte: value?.gte,
        lte: date,
      });
    }
  };

  // handle clear of the selected date
  const handleClear = () => {
    if (dateType === 'from') {
      setValue({
        gte: undefined,
        lte: value?.lte,
      });
    } else {
      setValue({
        gte: value?.gte,
        lte: undefined,
      });
    }
  };

  // extract button label
  const getButtonTitle = () => {
    if (value) {
      if (value?.gte && value?.lte) {
        return `${moment(value?.gte).format('DD/MM/YYYY')} - ${moment(value?.lte).format('DD/MM/YYYY')}`;
      } else if (value?.gte) {
        return `From ${moment(value?.gte).format('DD/MM/YYYY')}`;
      } else if (value?.lte) {
        return `To ${moment(value?.lte).format('DD/MM/YYYY')}`;
      }
    }
    return filters.label;
  };

  // Determine which date to show as selected in the calendar
  const selectedDate = dateType === 'from' ? value?.gte : value?.lte;

  // Determine disabled dates
  const disableDates = (day: Date) => {
    if (dateType === 'from') {
      if (!value?.lte) return false;
      return day > value?.lte;
    } else {
      if (!value?.gte) return false;
      return day < value?.gte;
    }
  };
  // Determine which date to visually "pin"
  const pinnedDate = dateType === 'from' ? value?.lte : value?.gte;

  return (
    <Popover>
      {/* Main Trigger Button */}
      <PopoverTrigger asChild>
        <Button variant={'outline'} type="button" aria-label="date filter open">
          {filters.icon && <filters.icon className="h-4 w-4" />}
          {getButtonTitle()}
        </Button>
      </PopoverTrigger>
      {/* Main Popover Content */}
      <PopoverContent className="bg-base-black text-base-white flex w-auto flex-col gap-4">
        <PopoverClose className="absolute top-3 right-3">
          <X className="hover:text-base-white text-ui-400 h-5 w-5" />
        </PopoverClose>
        {/* Inner content */}
        <Popover>
          <p>{filters.label}</p>
          {/* "From" and "To" Buttons */}
          <div className="flex flex-row items-center justify-center gap-5">
            <div>
              <p className="text-ui-400 mb-1 text-xs">From</p>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="border-ui-600"
                  onClick={() => {
                    setDateType('from');
                  }}
                >
                  {value?.gte ? value.gte.toDateString() : 'Pick Date'}
                </Button>
              </PopoverTrigger>
            </div>
            <Minus className="text-ui-400 h-6 w-6" />
            <div>
              <p className="text-ui-400 mb-1 text-xs">To</p>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="border-ui-600"
                  onClick={() => {
                    setDateType('to');
                  }}
                >
                  {value?.lte ? value.lte.toDateString() : 'Pick Date'}
                </Button>
              </PopoverTrigger>
            </div>
          </div>
          {/* Calender */}
          <PopoverContent className="bg-base-black w-auto">
            <Calendar
              mode="single"
              selected={selectedDate}
              captionLayout="dropdown"
              onSelect={handleValueChange}
              className="text-base-white"
              buttonVariant={'outline'}
              disabled={disableDates}
              modifiers={{
                pinned: pinnedDate ? [pinnedDate] : [],
              }}
              classNames={{
                years_dropdown: 'text-base-black',
                months_dropdown: 'text-base-black',
              }}
            />
            {/* buttons for calender */}
            <div className="flex flex-col gap-2">
              <PopoverClose asChild className="w-full">
                <Button variant={'blue'}>Done</Button>
              </PopoverClose>
              <Button
                onClick={handleClear}
                variant={'outline'}
                className="text-base-white w-full"
                aria-label="clear selected date"
              >
                Clear
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </PopoverContent>
    </Popover>
  );
};

export default DateFilter;
