'use client';
import DropdownFilter from './dropdown-filter';
import BadgeWithCross from './badge-with-cross';
import { ChevronDown } from 'lucide-react';
import scrollBarStyles from '../css-modules/scrollbar.module.css';

type MultiSelectProps = {
  id?: string;
  placeHolder?: string;
  dropDownLabel?: string;
  value: string[];
  onChange: (value: string[]) => void;
  showBadges?: boolean;
  options: string[];
};

const MultiSelectWithBadge = ({
  value = [],
  onChange,
  placeHolder = "Select values",
  showBadges = true,
  options = [],
  dropDownLabel,
}: MultiSelectProps) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <DropdownFilter
        options={options}
        selected={value}
        dropDownLabel={dropDownLabel}
        multiselect={true}
        setSelected={(selected) => {
          onChange(selected as string[]);
        }}
        RightButtonComponent={<ChevronDown className="size-5" />}
        label={placeHolder ?? ''}
        customStyle={{
          triggerButton:
            'border-ui-400 hover:border-base-white justify-between h-11 text-md font-normal text-ui-400',
          dropdownContent: 'w-[var(--radix-dropdown-menu-trigger-width)]',
          scrollBar: scrollBarStyles.scrollContainerNormalDropdown,
        }}
      />
      <div className="flex flex-row flex-wrap gap-2">
        {showBadges &&
          value.map((item, index) => (
            <BadgeWithCross
              key={index}
              handleClick={() => {
                onChange(value.filter((i) => i !== item));
              }}
              label={item}
            />
          ))}
      </div>
    </div>
  );
};

export default MultiSelectWithBadge;
