'use client';
import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';
import { cn } from '~/lib/utils';
import { X } from 'lucide-react';
import scrollBarStyles from '../css-modules/scrollbar.module.css';

type SearchDropdownBase = {
  children: React.ReactNode;
  label?: string;
  options: string[];
  theme?: 'normal' | 'purple';
  customStyle?: {
    dropdownContent?: string;
    commandItem?: string;
  };
};

type SearchDropdownSingle = {
  multiselect?: false;
  selected: string;
  setSelected: (selected: string) => void;
} & SearchDropdownBase;

type SearchDropdownMulti = {
  multiselect: true;
  selected: string[];
  setSelected: (selected: string[]) => void;
} & SearchDropdownBase;

export type SearchDropdownProps = SearchDropdownSingle | SearchDropdownMulti;

/**
 * A dropdown menu component for searching and selecting values.
 * can be used as multiple select or single select
 *
 * @param {React.ReactNode} children The content of the dropdown menu trigger.
 * @param {object} customStyle Optional custom CSS styles for the dropdown content and command item.
 * @param {string[]} options The list of options to display in the dropdown.
 * @param {'normal'|'purple'} theme The theme of the dropdown, either normal or purple.
 * @param {string} label The label to display above the dropdown.
 * @param {boolean} multiselect Whether the dropdown allows multiple selections.
 * @param {string|string[]} selected The currently selected value(s) of the dropdown.
 * @param {(selected: string|string[]) => void} setSelected The function to call when the selected value(s) change.
 */
const SearchDropdown = ({
  children,
  customStyle,
  options = [],
  theme = 'normal',
  label,
  ...restProps //done to maintain type safety
}: SearchDropdownProps) => {
  //store the dropdown open state
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(
          'bg-base-black border-ui-600 text-base-white z-60 rounded-lg border p-1 pb-1',
          customStyle?.dropdownContent,
        )}
      >
        {label && (
          <DropdownMenuLabel className="text-md font-semibold">
            {label}
          </DropdownMenuLabel>
        )}
        <Command
          className={cn(
            'text-base-white bg-transparent',
            theme === 'normal'
              ? scrollBarStyles.scrollContainerNormalDropdown
              : scrollBarStyles.scrollContainerFilterDropdown,
          )}
        >
          <CommandInput
            placeholder="Search"
            className="placeholder:text-ui-400"
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup className="my-1 p-0">
              {options.map((option, index) => (
                <CommandItem
                  className={cn(
                    'text-base-white data-[selected=true]:bg-ui-800 data-[selected=true]:text-base-white justify-between',
                    customStyle?.commandItem,
                  )}
                  key={index}
                  value={option}
                  onSelect={() => {
                    if (restProps.multiselect) {
                      //in case the option is already selected
                      if (restProps.selected.includes(option)) {
                        restProps.setSelected(
                          restProps.selected.filter((item) => item !== option),
                        );
                      } else {
                        //in case the option is not selected
                        restProps.setSelected([...restProps.selected, option]);
                      }
                    } else if (!restProps.multiselect) {
                      //in single select directly set the option
                      restProps.setSelected(option);
                      setOpen(false);
                    }
                  }}
                >
                  {option}
                  {!restProps.multiselect && restProps.selected === option && (
                    <p className="bg-brand-600 rounded-full p-1" />
                  )}
                  {
                    //in case the option is already selected
                    restProps.multiselect &&
                      restProps.selected.includes(option) && (
                        <p className="bg-brand-600 rounded-full p-1" />
                      )
                  }
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
        {restProps.multiselect && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="hover:bg-ui-800 focus:bg-ui-800 focus:text-base-white text-md justify-between pr-3"
              aria-label="close dropdown or done"
            >
              Done
              <X />
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SearchDropdown;
