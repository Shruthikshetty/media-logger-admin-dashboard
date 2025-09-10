import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectSeparator,
  SelectItem,
  SelectGroup,
} from './ui/select';
import { Label } from './ui/label';
import { cn } from '~/lib/utils';

type CustomSelectProps = {
  value: string | undefined;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  dropDownLabel?: string;
  options?: string[];
  customOptionLabels?: (value: string) => string;
  id?: string;
  className?: string;
};

const CustomSelect = ({
  value,
  onChange,
  label,
  placeholder,
  dropDownLabel,
  id,
  options = [],
  customOptionLabels,
  className,
}: CustomSelectProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <div>
        {label && (
          <Label htmlFor={id} className="text-md mb-2">
            {label}
          </Label>
        )}
        <SelectTrigger
          className={cn(
            'border-ui-400 hover:border-ui-200 hover:bg-ui-400/20 w-full py-5 text-base',
            className,
          )}
          id={id}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-base-black border-ui-600 text-base-white max-h-100 rounded-lg border">
          <SelectGroup>
            {dropDownLabel && (
              <>
                <SelectLabel className="text-sm font-semibold">
                  {dropDownLabel}
                </SelectLabel>
                <SelectSeparator className="my-1" />
              </>
            )}
            {options.map((option) => (
              <SelectItem
                key={option}
                value={option}
                className="focus:bg-ui-800 focus:text-base-white"
              >
                {customOptionLabels ? customOptionLabels(option) : option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </div>
    </Select>
  );
};

export default CustomSelect;
