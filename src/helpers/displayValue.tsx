import React from "react";
import {
  SelectCommonProps,
  SelectMultiple,
  SelectSingle,
} from "../Select.types";

interface Props {
  multiple: boolean;
  options: SelectCommonProps["options"];
  asTags: SelectCommonProps["asTags"];
  value: SelectMultiple["value"] | SelectSingle["value"];
  placeholder: SelectCommonProps["placeholder"];
}

const Selected = React.memo<Props>(
  ({ multiple, options, placeholder, ...props }): JSX.Element | null => {
    if (multiple) {
      const { asTags } = props;
      const value = props.value as SelectMultiple["value"];

      if (asTags) {
        return (
          <>
            {options
              .filter((option) => value?.includes(`${option.value}`))
              .map(
                (option): JSX.Element => (
                  <div className="tag" key={`tag__${option.value}`}>
                    {option.component || option.label}
                  </div>
                )
              )}
          </>
        );
      } else if (value?.length) {
        return <>Выбрано {value.length}</>;
      } else {
        return <>{placeholder}</> || null;
      }
    }

    const value = props.value as SelectSingle["value"];
    const label = options.find((option) => value === option.value)?.label;

    return <>{label || value || placeholder || null}</>;
  }
);

Selected.displayName = "Selected";

export { Selected };
