import { ReactNode, ReactText } from "react";

export type SelectOption = {
  label: ReactText;
  value: ReactText;
  component?: ReactNode;
};

export interface SelectCommonProps
  extends Omit<
    React.DetailedHTMLProps<
      React.SelectHTMLAttributes<HTMLSelectElement>,
      HTMLSelectElement
    >,
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
  allowSearch?: boolean;
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

export interface SelectSingle extends SelectSingleProps {
  multiple?: false;
}

export interface SelectMultiple extends SelectMultipleProps {
  multiple?: true;
}
