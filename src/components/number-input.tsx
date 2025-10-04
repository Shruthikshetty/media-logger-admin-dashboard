'use client';
import React, { ComponentProps } from 'react';
import { Input } from './ui/input';

/**
 * A wrapper around the `Input` component that allows only numbers.
 * When the value is changed, the onChange prop is called with the value converted to a number.
 * If the value is empty, onChange is called with null.
 * If the value is invalid (e.g. text), onChange is called with undefined.
 * @param {number | null | undefined} value The current value of the input.
 * @param {(val: number | null | undefined) => void} onChange Called whenever the value changes.
 * @param {Omit<ComponentProps<typeof Input>, 'type' | 'onChange'>} [rest] Any other props to be passed to `Input`.
 * @returns {JSX.Element} The wrapped `Input` component.
 */
const NumberInput = ({
  value,
  onChange,
  ...rest
}: Omit<ComponentProps<typeof Input>, 'type' | 'onChange'> & {
  onChange: (val: number | undefined | null) => void;
}) => {
  return (
    <Input
      value={value === null || value === undefined ? '' : value}
      onChange={(e) =>
        onChange(e.target.value === '' ? null : Number(e.target.value))
      }
      type="number"
      {...rest}
    />
  );
};

export default NumberInput;
