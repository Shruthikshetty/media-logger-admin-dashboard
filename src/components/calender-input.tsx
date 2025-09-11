'use client';
import React, { useState } from 'react';
import { Calendar } from './ui/calendar';
import { Popover } from '@radix-ui/react-popover';
import { PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import moment from 'moment';
import { ChevronDown } from 'lucide-react';

type CalenderInputProps = {
  value: Date | undefined;
  onChange: React.Dispatch<React.SetStateAction<Date | undefined>>;
  showChevron?: boolean;
};

/**
 * CalenderInput is a component that provides a input with a calendar dropdown.
 * It's mainly used in forms to select a date.
 * @param {Date | undefined} value The current value of the input.
 * @param {React.Dispatch<React.SetStateAction<Date | undefined>>} onChange setter to change the date.
 * @returns {JSX.Element}
 */
const CalenderInput = ({
  value,
  onChange,
  showChevron = true,
}: CalenderInputProps) => {
  // handle pop up open state
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant={'outline'}
          className="text-ui-400 h-11 justify-between text-base font-normal"
        >
          {value ? moment(value).format('DD MMM yyyy') : 'dd-mm-yyyy'}
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
