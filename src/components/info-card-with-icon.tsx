import { LucideIcon } from 'lucide-react';
import React from 'react';
import { cn } from '~/lib/utils';

const ThemeColorMapping: Record<string, { iconBg: string; iconColor: string }> =
  {
    blue: {
      iconBg: 'bg-brand-600/20',
      iconColor: 'text-brand-600',
    },
    red: {
      iconBg: 'bg-feedback-error',
      iconColor: 'text-feedback-error',
    },
    gray: {
      iconBg: '',
      iconColor: 'text-ui-400',
    },
  };

const InfoCardWithIcon = ({
  label,
  value,
  theme = 'blue',
  Icon,
  className,
}: {
  label: string;
  value: string;
  theme?: 'blue' | 'red' | "gray";
  Icon: LucideIcon;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'bg-ui-800/80 flex flex-row items-center justify-start gap-2 rounded-lg p-4',
        className,
      )}
    >
      <div className={cn('rounded-lg p-2', ThemeColorMapping[theme].iconBg)}>
        <Icon className={cn('h-7 w-7', ThemeColorMapping[theme].iconColor)} />
      </div>
      <div className="flex flex-col">
        <p className="text-ui-400 text-md font-normal">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default InfoCardWithIcon;
