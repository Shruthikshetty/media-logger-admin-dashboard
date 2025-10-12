'use client';
import React from 'react';
import TitleSubtitle from './title-subtitle';
import { Switch } from './ui/switch';
import { cn } from '~/lib/utils';

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
  return (
    <div
      className={cn(
        'flex flex-row items-center justify-between gap-5',
        className,
      )}
    >
      <TitleSubtitle
        title={title}
        subtitle={subtitle}
        customStyles={{
          title: 'text-base font-semibold',
          subtitle: 'text-base',
        }}
      />
      <Switch
        className="data-[state=checked]:bg-brand-600 data-[state=unchecked]:bg-ui-600"
        {...restProps}
      />
    </div>
  );
};

export default SwitchItem;
