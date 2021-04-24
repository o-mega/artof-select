import { ReactNode, ReactText } from "react";

export type SelectOption = {
  label?: ReactText;
  value?: ReactText;
  component?: ReactNode;
};

type BaseProps = Pick<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  | "disabled"
  | "form"
  | "name"
  | "required"
  | "className"
  | "id"
  | "style"
  | "datatype"
  | "autoFocus"
>;

export interface SelectCommonProps extends BaseProps {
  options?: SelectOption[];
  label?: ReactText;
  placeholder?: ReactText;
  errorText?: ReactText;
  hintText?: ReactText;
  allowClearAll?: boolean;
  allowSearch?: boolean;
  allowMarkWords?: boolean;
  renderValue?: (options: SelectOption[]) => JSX.Element;
  dropdownOffset?: [number, number];
  splitterBefore?: number;
  "data-testid"?: string;
  "data-cy"?: string;
  "aria-expanded"?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
  onKeyDown?: () => void;
  onKeyUp?: () => void;
}

export interface SelectSingle extends SelectCommonProps {
  multiple?: false;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  allowSelectAll?: undefined;
  asTags?: undefined;
  allowRemoveTag?: undefined;
  allowTagsCount?: undefined;
  textSelected?: undefined;
  textSelectAll?: undefined;
}

export interface SelectMultiple extends SelectCommonProps {
  multiple?: true;
  value?: string[];
  onChange?: (values: string[]) => void;
  allowSelectAll?: boolean;
  asTags?: boolean;
  allowRemoveTag?: boolean;
  allowTagsCount?: boolean;
  textSelected?: string;
  textSelectAll?: string;
}
