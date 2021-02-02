import { ReactNode, ReactText } from "react";

export type SelectOption = {
  label?: ReactText;
  value?: string;
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
  asTags?: boolean;
  allowClear?: boolean;
  allowTagsCount?: boolean;
  allowSearch?: boolean;
  allowMarkWords?: boolean;
  textSelected?: string;
  textSelectAll?: string;
  renderValue?: (options: SelectOption[]) => JSX.Element;
  dropdownOffset?: [number, number];
  splitterBefore?: number;
  "data-testid"?: string;
  "data-cy"?: string;
  "aria-expanded"?: boolean;
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
