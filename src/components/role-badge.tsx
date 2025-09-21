import React from 'react';
import { Badge } from './ui/badge';
import { Skeleton } from './ui/skeleton';
import {
  ROLE_COLOR_MAPPING,
  ROLE_ICON_MAPPING,
} from '~/constants/screen.constants';
import { capitalizeFirstLetter } from '~/lib/formatting';
import { cn } from '~/lib/utils';

/**
 * @description return the custom badge based on the user role
 */
const RoleBadge = ({
  role,
  className,
}: {
  role?: string;
  className?: string;
}) => {
  // in case of loading return skeleton
  if (!role)
    return <Skeleton className="bg-ui-600 h-6 w-20 rounded-full md:w-25" />;
  // normalize role as a key
  const key = role.toLowerCase();
  // get role icon
  const RoleIcon = ROLE_ICON_MAPPING[key];
  // return badge
  return (
    <Badge
      variant={ROLE_COLOR_MAPPING[key] ?? 'secondary'}
      className={cn(
        'flex flex-row items-center justify-center rounded-full px-2.5 text-sm hover:opacity-80',
        className,
      )}
    >
      {RoleIcon && (
        <p>
          <RoleIcon strokeWidth={3} className="h-4 w-4" data-slot="icon" />
        </p>
      )}
      <p>{capitalizeFirstLetter(role)}</p>
    </Badge>
  );
};

export default RoleBadge;
