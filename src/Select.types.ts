import { ReactNode, ReactText } from "react";

declare type SelectOption = {
  label: ReactText;
  value: ReactText;
  component?: ReactNode;
};

declare interface SelectCommonProps
  extends Omit<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    | "children"
    | "multiple"
    | "value"
    | "defaultValue"
    | "options"
    | "placeholder"
    | "onChange"
  > {
  options: SelectOption[];
  label?: ReactText;
  placeholder?: ReactText;
  errorText?: ReactText;
  hintText?: ReactText;
  asTags?: boolean;
  allowClear?: boolean;
  allowTagsCount?: boolean;
  allowSearch?: boolean;
  allowMarkWords?: boolean;
  textSelected?: string;
  textSelectAll?: string;
  "data-testid"?: string;
  "data-cy"?: string;
}

interface SelectSingleProps extends SelectCommonProps {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  allowSelectAll?: undefined;
}

interface SelectMultipleProps extends SelectCommonProps {
  value?: string[];
  onChange?: (values: string[]) => void;
  allowSelectAll?: boolean;
}

declare interface SelectSingle extends SelectSingleProps {
  multiple?: false;
}

declare interface SelectMultiple extends SelectMultipleProps {
  multiple?: true;
}

export type { SelectOption, SelectCommonProps, SelectSingle, SelectMultiple };
