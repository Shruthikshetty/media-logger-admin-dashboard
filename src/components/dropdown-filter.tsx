import React, { useState } from 'react';
import {
  DropdownMenuGroup,
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { X } from 'lucide-react';

/**
 * This component is used in Media filter
 * provides a dropdown with provided options
 */
const DropdownFilter = ({
  options,
  selected,
  multiselect,
  setSelected,
  label,
}: {
  options: string[];
  selected: string[];
  multiselect: boolean;
  setSelected: (selected: string[]) => void;
  label: string;
}) => {
  //state to store open state of the dropdown
  const [open, setOpen] = useState(false);
  //function to handle selection
  const handleSelection = (option: string) => {
    if (selected.includes(option)) {
      //in case the option is already selected
      setSelected(selected.filter((item) => item !== option));
    } else {
      //in case the option is not selected
      setSelected([...selected, option]);
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'} type="button">
          {label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-base-black border-ui-600 text-base-white z-60 my-2 rounded-lg border p-1 pb-1"
        align="center"
      >
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {options.map((option) => (
            <DropdownMenuItem
              className="hover:bg-ui-800 focus:bg-ui-800 focus:text-base-white text-md flex flex-row justify-between gap-2 rounded-md p-2"
              key={option}
              onClick={(e) => {
                e.preventDefault();
                handleSelection(option);
              }}
            >
              <p>{option}</p>
              {selected.includes(option) && (
                <p className="bg-brand-600 rounded-full p-1"></p>
              )}
            </DropdownMenuItem>
          ))}

          <DropdownMenuSeparator />
          <DropdownMenuItem className="hover:bg-ui-800 focus:bg-ui-800 focus:text-base-white text-md justify-between pr-3">
            Done
            <X />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownFilter;
