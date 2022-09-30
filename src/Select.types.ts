import { ReactNode } from "react";
import { Placement } from "@popperjs/core/lib/enums";

export type SelectOption = {
  label?: string | number;
  value?: string | number;
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

export type SelectCommonProps = BaseProps & {
  options?: SelectOption[];
  label?: ReactNode;
  labelPosition?: "before" | "inside" | "after";
  placeholder?: string | number;
  errorText?: string | number;
  hintText?: string | number;
  allowClearAll?: boolean;
  allowSearch?: boolean;
  allowMarkWords?: boolean;
  renderValue?: (options: SelectOption[]) => JSX.Element;
  dropdownOffset?: [number, number];
  dropdownPosition?: Placement;
  splitterBefore?: number;
  searchPosition?: "value" | "dropdown";
  searchPlaceholder?: string;
  onSearchChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  "data-testid"?: string;
  "data-cy"?: string;
  "aria-expanded"?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
  onKeyDown?: () => void;
  onKeyUp?: () => void;
  onToggle?: (state: boolean, value: string | string[]) => void;
};

export type SelectSingle = SelectCommonProps & {
  multiple?: false;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  allowSelectAll?: undefined;
  asTags?: undefined;
  allowRemoveTag?: undefined;
  allowTagsCount?: undefined;
  textSelected?: undefined;
  textSelectAll?: undefined;
};

export type SelectMultiple = SelectCommonProps & {
  multiple?: true;
  value?: string[];
  onChange?: (values: string[]) => void;
  allowSelectAll?: boolean;
  asTags?: boolean;
  allowRemoveTag?: boolean;
  allowTagsCount?: boolean;
  textSelected?: string;
  textSelectAll?: string;
};
