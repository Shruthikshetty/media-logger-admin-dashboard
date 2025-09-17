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

type SearchDropdownProps = {
  children: React.ReactNode;
  customStyle?: {
    dropdownContent?: string;
  };
};

const SearchDropdown = ({ children, customStyle }: SearchDropdownProps) => {
    
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(
          'bg-base-black border-ui-600 text-base-white z-60 my-2 rounded-lg border p-1 pb-1',
          customStyle?.dropdownContent,
        )}
      >
        <DropdownMenuLabel className="text-md font-semibold">
          Label
        </DropdownMenuLabel>
        <Command className="text-base-white bg-transparent">
          <CommandInput
            placeholder="Search"
            className="placeholder:text-ui-400"
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup className="my-1 p-0">
              <CommandItem className="text-base-white data-[selected=true]:bg-ui-800 data-[selected=true]:text-base-white">
                Calendar
              </CommandItem>
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
