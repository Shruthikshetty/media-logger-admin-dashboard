'use client';
import DropdownFilter from './dropdown-filter';
import BadgeWithCross from './badge-with-cross';
import { ChevronDown } from 'lucide-react';
import scrollBarStyles from '../css-modules/scrollbar.module.css';

type MultiSelectProps = {
  id?: string;
  placeHolder?: string;
  dropDownLabel?: string;
  value?: string[];
  onChange: (value: string[]) => void;
  showBadges?: boolean;
  options: string[];
};

/**
 * A dropdown component that allows for multiple selections, with an optional
 * preview of the selected items as badges.
 * @param {string[]} value The current values of the multiselect.
 * @param {(value: string[]) => void} onChange Called whenever the value changes.
 * @param {string} [placeHolder] The placeholder text to show when no values are selected.
 * @param {boolean} [showBadges] Whether to show the selected values as badges.
 * @param {string[]} [options] The options to be shown in the dropdown.
 * @param {string} [dropDownLabel] The label to show above the dropdown.
 * @returns {JSX.Element} The component.
 */
const MultiSelectWithBadge = ({
  value = [],
  onChange,
  placeHolder = 'Select values',
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
