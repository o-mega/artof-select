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
  textSelected: SelectCommonProps["textSelected"];
}

const SelectedValues = React.memo<Props>(
  ({ multiple, options, placeholder, ...props }): JSX.Element => {
    if (multiple) {
      const { asTags, textSelected } = props;
      const value = props.value as SelectMultiple["value"];

      if (asTags) {
        const tags = options.filter((option) =>
          value?.includes(`${option.value}`)
        );

        if (!tags.length) {
          return <>{placeholder}</>;
        }

        return (
          <>
            {tags.length > 1 && (
              <div className="artof_select-tags_count">{tags.length}</div>
            )}

            {tags.map(
              (option): JSX.Element => (
                <div
                  className="artof_select-tag"
                  key={`artof_select-tag__${option.value}`}
                >
                  {option.component || option.label}
                </div>
              )
            )}
          </>
        );
      } else if (value?.length) {
        return (
          <>
            {textSelected} {value.length}
          </>
        );
      } else {
        return <>{placeholder}</>;
      }
    }

    const value = props.value as SelectSingle["value"];
    const label = options.find((option) => value === option.value)?.label;

    return <>{label || value || placeholder}</>;
  }
);

SelectedValues.displayName = "Selected";

export { SelectedValues };
