'use client';
import React, { useState } from 'react';
import { Calendar } from './ui/calendar';
import { PopoverContent, PopoverTrigger, Popover } from './ui/popover';
import { Button } from './ui/button';
import moment from 'moment';
import { ChevronDown } from 'lucide-react';
import { cn } from '~/lib/utils';

type CalenderInputProps = {
  value: Date | undefined;
  onChange: (value: Date | undefined) => void;
  showChevron?: boolean;
  isError?: boolean;
};

/**
 * CalenderInput is a component that provides a input with a calendar dropdown.
 * It's mainly used in forms to select a date.
 * @param {Date | undefined} value The current value of the input.
 * @param {(value: Date | undefined) => void} onChange Change handler to update the date.
 * @returns {JSX.Element}
 */
const CalenderInput = ({
  value,
  onChange,
  showChevron = true,
  isError = false,
}: CalenderInputProps) => {
  // handle pop up open state
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant={'outline'}
          className={cn(
            'text-ui-400 h-11 justify-between text-base font-normal',
            isError && 'border-feedback-error',
          )}
        >
          {value ? moment(value).format('DD MMM YYYY') : 'dd-mm-yyyy'}
          {showChevron && <ChevronDown className="size-5" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-base-black w-auto">
        <Calendar
          mode="single"
          captionLayout="dropdown"
          onSelect={(date) => {
            onChange(date);
            //close pop up
            setOpen(false);
          }}
          selected={value}
          className="text-base-white"
          buttonVariant={'outline'}
          classNames={{
            years_dropdown: 'text-base-black',
            months_dropdown: 'text-base-black',
            day_button:
              'data-[selected-single=true]:bg-brand-500 data-[selected-single=true]:border-0',
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default CalenderInput;
