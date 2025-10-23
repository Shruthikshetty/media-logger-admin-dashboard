'use client';
import React, { useId } from 'react';
import { Switch } from './ui/switch';
import { cn } from '~/lib/utils';
import { Label } from './ui/label';

type SwitchItemProps = {
  title?: string;
  subtitle?: string;
  className?: string;
} & Omit<React.ComponentProps<typeof Switch>, 'className'>;

/**
 * A component that renders a switch item with a title and subtitle.
 * @param {boolean} [isChecked] Whether the switch is checked or not.
 * @param {(value: boolean) => void} [onCheckChange] Callback to handle the check change event.
 * @param {string} [title] The title of the switch item.
 * @param {string} [subtitle] The subtitle of the switch item.
 */
const SwitchItem = ({
  subtitle,
  title,
  className,
  ...restProps
}: SwitchItemProps) => {
  // generate unique switch id
  const switchId = useId();

  return (
    <div
      className={cn(
        'flex flex-row items-center justify-between gap-5',
        className,
      )}
    >
      <div className="flex w-full flex-col justify-center">
        <p className="text-base-white text-base font-semibold">{title}</p>
        <Label htmlFor={switchId} className="text-ui-400 text-base font-normal">
          {subtitle}
        </Label>
      </div>
      <Switch
        className="data-[state=checked]:bg-brand-600 data-[state=unchecked]:bg-ui-600"
        id={switchId}
        {...restProps}
      />
    </div>
  );
};

export default SwitchItem;
