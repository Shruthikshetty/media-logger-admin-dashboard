import React from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import { cn } from '~/lib/utils';

type MediaFilterItemsBadgeProps = {
  label: string;
  handleClick: () => void;
  className?: string;
};

/**
 * A component to render a badge with cross button
 * @param {string} label - The label to display in the badge.
 * @param {function} handleClick - The function to handle the click event of the cross button.
 * @param {string} className - The class name to apply to the badge.
 * @returns {JSX.Element} A JSX element representing the badge with cross button.
 */
const BadgeWithCross = ({
  label,
  handleClick,
  className,
}: MediaFilterItemsBadgeProps) => {
  return (
    <Badge
      className={cn(
        'bg-ui-700 hover:bg-ui-600 flex items-center gap-1 rounded-full pr-1 pl-2.5',
        className,
      )}
    >
      <span className="text:xs text-wrap">{label}</span>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="hover:bg-muted h-5 w-5 rounded-full p-0"
        onClick={handleClick}
      >
        <X className="h-3 w-3" />
      </Button>
    </Badge>
  );
};

export default BadgeWithCross;
