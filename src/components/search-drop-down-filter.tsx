'use client';
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { SelectDropDownConfig } from './media-filters';
import SearchDropdown from './search-dropdown';
import { Button } from './ui/button';

type SearchDropDownFilterProps = {
  filters: SelectDropDownConfig;
  value: string | string[] | undefined;
  setValue: (value: string[] | string) => void;
};

//this is a wrapper over search drop down in a way its supposed to be used in media filters only
const SearchDropDownFilter = ({
  filters,
  value,
  setValue,
}: SearchDropDownFilterProps) => {
  return (
    // @ts-expect-error
    <SearchDropdown
      label={filters.label}
      multiselect={filters.multiselect}
      selected={value ?? (filters.multiselect ? [] : '')}
      setSelected={setValue}
      options={filters.options}
      theme="purple"
    >
      <Button type="button" variant={'outline'} className="border-ui-600">
        {filters.label}
        {filters.icon && <filters.icon className="ml-2 h-4 w-4" />}
      </Button>
    </SearchDropdown>
  );
};

export default SearchDropDownFilter;
