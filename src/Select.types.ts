import { ReactNode, ReactText } from "react";

export type SelectOption = {
  label?: ReactText;
  value?: ReactText;
  component?: ReactNode;
};

export interface SelectCommonProps
  extends Omit<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    | "children"
    | "multiple"
    | "value"
    | "defaultValue"
    | "options"
    | "placeholder"
    | "onChange"
    | "onFocus"
    | "onBlur"
    | "autoFocus"
  > {
  options?: SelectOption[];
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

export interface SelectSingle extends SelectCommonProps {
  multiple?: false;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  allowSelectAll?: undefined;
}

export interface SelectMultiple extends SelectCommonProps {
  multiple?: true;
  value?: string[];
  onChange?: (values: string[]) => void;
  allowSelectAll?: boolean;
}
