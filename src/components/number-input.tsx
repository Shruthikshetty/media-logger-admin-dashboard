'use client';
import React, { ComponentProps } from 'react';
import { Input } from './ui/input';

/**
 * A wrapper around the `Input` component that allows only numbers.
 * onChanges the value to a number and passes it to the `onChange` prop. 
 * @param {number | undefined} value The current value of the input.
 * @param {(val: number | undefined) => void} onChange Called whenever the value changes.
 * @param {Omit<ComponentProps<typeof Input>, 'type' | 'onChange'>} [rest] Any other props to be passed to `Input`.
 * @returns {JSX.Element} The wrapped `Input` component.
 */
const NumberInput = ({
  value,
  onChange,
  ...rest
}: Omit<ComponentProps<typeof Input>, 'type' | 'onChange'> & {
  onChange: (val: number | undefined) => void;
}) => {
  return (
    <Input
      value={value === undefined || value === 0 ? '' : value}
      onChange={(e) => onChange(Number(e.target.value))}
      type="number"
      {...rest}
    />
  );
};

export default NumberInput;
