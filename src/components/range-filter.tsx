import React, { useDeferredValue } from 'react';
import type { RangeConfig, RangeState } from './media-filters';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { PopoverClose } from '@radix-ui/react-popover';
import { X } from 'lucide-react';

/**
 * This component is used in media filters
 * provides a range slider
 * @returns JSX.Element
 */
const RangeFilter = ({
  filters,
  value,
  onValueChange,
}: {
  filters: RangeConfig;
  value: RangeState | undefined;
  onValueChange?: (value: RangeState | undefined) => void;
}) => {
  // Use state to manage the selected range [min, max] (two way range)
  const [tempValue, setTempValue] = React.useState<[number, number]>(
    value
      ? [
          value?.gte !== undefined ? value.gte : filters.min,
          value?.lte ?? filters.max,
        ]
      : [filters.min, filters.max],
  );

  // store the filters value in required format
  const twoWayRangeValue = useDeferredValue({
    gte: tempValue[0],
    lte: tempValue[1],
  });

  //get button title
  const getButtonTitle = () => {
    if (value) {
      const unit = filters.unitLabel ? ` ${filters.unitLabel}` : '';
      return `${value.gte} - ${value.lte}${unit}`;
    }
    return filters.label;
  };

  // send the value to parent
  const handleValueCommit = (values: [number, number]) => {
    const transformedData = {
      gte: values[0],
      lte: values[1],
    };
    if (onValueChange) {
      if (
        transformedData.gte !== filters.min ||
        transformedData.lte !== filters.max
      ) {
        onValueChange(transformedData);
      } else {
        onValueChange(undefined);
      }
    }
  };

  return (
    <Popover>
      {/* Trigger button */}
      <PopoverTrigger asChild>
        <Button
          type="button"
          aria-label="open range filter"
          variant={'outline'}
          className="border-ui-600"
        >
          {filters.icon && <filters.icon className="h-4 w-4" />}
          {getButtonTitle()}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="bg-base-black text-base-white border-ui-600 flex flex-col gap-4 pb-6"
        align="start"
      >
        {/* Close button */}
        <PopoverClose className="absolute top-3 right-3">
          <X className="hover:text-base-white text-ui-400 h-5 w-5" />
        </PopoverClose>
        {/* Main content */}
        <p className="flex flex-row gap-5 font-semibold">
          <span>{filters.label}</span>
          <span>{` ${twoWayRangeValue.gte}${filters.unitLabel ? ` ${filters.unitLabel}` : ''} - ${twoWayRangeValue.lte}${filters.unitLabel ? ` ${filters.unitLabel}` : ''}`}</span>
        </p>
        {/* Slider */}
        <Slider
          value={tempValue}
          onValueChange={(value: [number, number]) => setTempValue(value)}
          max={filters.max}
          min={filters.min}
          step={filters?.step ?? 1}
          onValueCommit={handleValueCommit}
          className="[&_[data-slot=slider-range]]:bg-brand-600 [&_[data-slot=slider-thumb]]:bg-base-black [&_[data-slot=slider-thumb]]:border-brand-600 [&_[data-slot=slider-track]]:bg-ui-400 [&_[data-slot=slider-thumb]]:border-3 [&_[data-slot=slider-thumb]]:p-1.5"
        />
        {/* Min Max info */}
        <p className="flex w-full flex-row justify-between text-xs">
          <span>min: {filters.min}</span>
          <span>max: {filters.max}</span>
        </p>
      </PopoverContent>
    </Popover>
  );
};

export default RangeFilter;
