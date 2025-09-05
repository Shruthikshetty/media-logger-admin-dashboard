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
import { LucideIcon, X } from 'lucide-react';

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
  Icon,
}: {
  options: string[];
  selected: string[] | string;
  multiselect: boolean;
  setSelected: (selected: string[] | string) => void;
  label: string;
  Icon?: LucideIcon;
}) => {
  //state to store open state of the dropdown
  const [open, setOpen] = useState(false);

  //function to handle selection
  const handleSelection = (option: string) => {
    switch (multiselect) {
      case true:
        if (selected.includes(option)) {
          //in case the option is already selected
          setSelected((selected as string[]).filter((item) => item !== option));
        } else {
          //in case the option is not selected
          setSelected([...selected, option]);
        }
        break;
      case false:
        setSelected(option);
        break;
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'} type="button" className="border-ui-600">
          {Icon && <Icon className="mr-2 h-4 w-4" />}
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
                if (multiselect) {
                  //prevent default behavior in case of multi selection
                  e.preventDefault();
                }
                handleSelection(option);
              }}
            >
              <p>{option}</p>
              {/* in case of multi selection */}
              {multiselect && selected.includes(option) && (
                <p className="bg-brand-600 rounded-full p-1"></p>
              )}
              {/* in case of single selection */}
              {!multiselect && selected === option && (
                <p className="bg-brand-600 rounded-full p-1"></p>
              )}
            </DropdownMenuItem>
          ))}
          {multiselect && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hover:bg-ui-800 focus:bg-ui-800 focus:text-base-white text-md justify-between pr-3">
                Done
                <X />
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownFilter;
