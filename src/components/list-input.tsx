'use client';
import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Plus, X } from 'lucide-react';
import { cn } from '~/lib/utils';

type ListInputProps = {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  id?: string;
  className?: string;
  children?: React.ReactNode;
};

/**
 * A component that allows users to input a list of items.
 * @param {ListInputProps} props
 * @prop {string[]} value The current list of values.
 * @prop {(value: string[]) => void} onChange Called whenever the list of values changes.
 * @prop {string} [placeholder] An optional placeholder string to display in the input field.
 * @prop {string} [id] An optional id to assign to the input field.
 * @prop {string} [className] An optional class name to assign to the outermost element.
 * @prop {React.ReactNode} [children] An optional child element to display below the input field.
 * @returns {JSX.Element} The ListInput component.
 */
const ListInput = ({
  value = [],
  onChange,
  placeholder,
  id,
  className,
  children,
}: ListInputProps) => {
  //store the user entered value locally
  const [inputValue, setInputValue] = useState('');

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div className="flex flex-row items-center gap-3" data-slot="input">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          id={id}
          type="text"
        />
        <Button
          variant={'blue'}
          className="h-10"
          type="button"
          onClick={() => {
            if (inputValue === '') return;
            // add value to list
            onChange([...value, inputValue]);
            setInputValue('');
          }}
        >
          <Plus />
        </Button>
      </div>
      {children && <div>{children}</div>}
      <div data-slot="list" className="grid-clos1 grid gap-1">
        {value.map((item, index) => (
          <div
            key={index}
            className="text-md bg-ui-800 flex flex-row items-center justify-between overflow-hidden pr-2"
          >
            <p className="truncate">
              {index + 1}. {item}
            </p>
            <X
              aria-label="remove item"
              className="text-ui-400 hover:text-base-white h-5 w-5"
              onClick={() => {
                onChange(value.filter((_, i) => i !== index));
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListInput;
