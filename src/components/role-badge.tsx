import { Shield } from 'lucide-react';
import React from 'react';
import { Badge } from './ui/badge';
import { Skeleton } from './ui/skeleton';
import { ROLE_COLOR_MAPPING } from '~/constants/screen.constants';
import { capitalizeFirstLetter } from '~/lib/formatting';

/**
 * @description return the custom badge based on the user role
 */
const RoleBadge = ({ role }: { role?: string }) => {
  // in case of loading return skeleton
  if (!role)
    return <Skeleton className="bg-ui-600 h-6 w-20 rounded-full md:w-25" />;
  // return badge
  return (
    <Badge
      variant={ROLE_COLOR_MAPPING[role.toLowerCase()]}
      className="flex flex-row items-center justify-center rounded-full px-2.5 text-sm hover:opacity-80"
    >
      <p>
        <Shield strokeWidth={3} className="h-4 w-4" />
      </p>
      <p>{capitalizeFirstLetter(role)}</p>
    </Badge>
  );
};

export default RoleBadge;
