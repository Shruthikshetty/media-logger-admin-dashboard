import React, { useState } from 'react';
import { Badge } from './ui/badge';
import { Minus, Plus } from 'lucide-react';
import { cn } from '~/lib/utils';

type CollapsableBadgeListProps = {
  list: string[];
  maxDisplayed?: number;
  style?: {
    root?: string;
    itemBadge?: string;
    buttonBadge?: string;
  };
};

const CollapsableBadgeList = ({
  list = [],
  maxDisplayed = 3,
  style,
}: CollapsableBadgeListProps) => {
  // hold the expanded state
  const [isExpanded, setIsExpanded] = useState(false);
  // get the maximum number of items to display
  const displayedItems = isExpanded ? list : list.slice(0, maxDisplayed);
  // calculate the remaining items length
  const remainingItems = list.length - displayedItems.length;
  return (
    <div
      className={cn(
        'flex flex-row flex-wrap items-center justify-start gap-2',
        style?.root,
      )}
    >
      {displayedItems.map((lang, index) => (
        <Badge
          className={cn(
            'border-ui-600 rounded-full border-2 px-3',
            style?.itemBadge,
          )}
          key={index}
        >
          {lang}
        </Badge>
      ))}
      {/* show the remaining items + button */}
      {!isExpanded && remainingItems > 0 && (
        <Badge
          className={cn(
            'border-ui-600 flex flex-row items-center rounded-full border-2 px-2 hover:opacity-80 active:scale-95',
            style?.buttonBadge,
          )}
          onClick={() => setIsExpanded(true)}
        >
          <p>
            <Plus className="size-3" strokeWidth={2} />
          </p>
          <p>{remainingItems}</p>
        </Badge>
      )}

      {
        // show the button to collapse the list
        isExpanded && (
          <Badge
            className={cn(
              'border-ui-600 flex flex-row items-center rounded-full border-2 px-2 hover:opacity-80 active:scale-95',
              style?.buttonBadge,
            )}
            onClick={() => setIsExpanded(false)}
          >
            <p>
              <Minus className="size-3" strokeWidth={2} />
            </p>
          </Badge>
        )
      }
    </div>
  );
};

export default CollapsableBadgeList;
