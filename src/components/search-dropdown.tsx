import React from 'react';
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

type SearchDropdownProps = {
  children: React.ReactNode;
  label?: string;
  options: string[];
  theme?: 'normal' | 'purple';
  selected: string;
  setSelected: (selected: string) => void;
  customStyle?: {
    dropdownContent?: string;
    commandItem?: string;
  };
};

const SearchDropdown = ({
  children,
  customStyle,
  options = [],
  selected,
  setSelected,
  theme = 'normal',
  label,
}: SearchDropdownProps) => {
  console.log(selected);
  return (
    <DropdownMenu>
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
                  onSelect={() => setSelected(option)}
                >
                  {option}
                  {selected === option && (
                    <p className="bg-brand-600 rounded-full p-1" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="hover:bg-ui-800 focus:bg-ui-800 focus:text-base-white text-md justify-between pr-3"
          aria-label="close dropdown or done"
        >
          Done
          <X />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SearchDropdown;
