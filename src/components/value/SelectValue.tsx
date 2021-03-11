import React from "react";

import {
  SelectOption,
  SelectCommonProps,
  SelectMultiple,
  SelectSingle,
} from "../../Select.types";
import { SelectedValueClear } from "./SelectValueClear";
import { SelectedValueTags } from "./SelectValueTags";

interface Props {
  multiple: boolean;
  options: SelectOption[];
  asTags: SelectCommonProps["asTags"];
  value: SelectMultiple["value"] | SelectSingle["value"];
  placeholder: SelectCommonProps["placeholder"];
  textSelected: SelectCommonProps["textSelected"];
  allowTagsCount: SelectCommonProps["allowTagsCount"];
  allowClearAll: SelectCommonProps["allowClearAll"];
  allowRemoveTag: SelectCommonProps["allowRemoveTag"];
  select: React.RefObject<HTMLSelectElement>;
  renderValue: SelectCommonProps["renderValue"];
}

export const SelectValue: React.FC<Props> = React.memo(function selectValue({
  renderValue,
  multiple,
  options,
  placeholder,
  allowTagsCount,
  allowClearAll,
  allowRemoveTag,
  select,
  ...props
}): JSX.Element {
  const selectedOptions = options.filter((option) => {
    if (typeof props.value === "string") {
      return props.value === `${option.value}`;
    } else if (typeof props.value === "object") {
      return props.value?.includes(`${option.value}`);
    }

    return false;
  });

  if (renderValue) {
    if (!selectedOptions.length) {
      return <>{placeholder}</>;
    }

    return (
      <div className="select__value_custom">{renderValue(selectedOptions)}</div>
    );
  }

  if (multiple) {
    const { asTags, textSelected } = props;
    const value = props.value as SelectMultiple["value"];

    if (asTags) {
      return (
        <SelectedValueTags
          selectedOptions={selectedOptions}
          placeholder={placeholder}
          allowTagsCount={allowTagsCount}
          allowClearAll={allowClearAll}
          allowRemoveTag={allowRemoveTag}
          select={select}
        />
      );
    } else if (value?.length) {
      return (
        <>
          <div className="select__value_text">
            {textSelected} {value.length}
          </div>

          {allowClearAll && <SelectedValueClear select={select} />}
        </>
      );
    } else {
      return <>{placeholder}</>;
    }
  }

  const value = props.value as SelectSingle["value"];
  const label = options.find((option) => value === option.value)?.label;

  if (label ?? value) {
    return (
      <>
        <div className="select__value_text">{label ?? value}</div>

        {allowClearAll && <SelectedValueClear select={select} />}
      </>
    );
  }

  return <>{placeholder}</>;
});
