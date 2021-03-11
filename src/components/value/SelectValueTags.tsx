import React from "react";

import { SelectOption } from "../..";
import { SelectedValueClear } from "./SelectValueClear";
import { classNames } from "../../helpers/classNames";
import { SelectCommonProps } from "../../Select.types";
import { fireEvent } from "../../helpers/fireEvent";

interface Props {
  selectedOptions: SelectOption[];
  placeholder: SelectCommonProps["placeholder"];
  allowTagsCount: SelectCommonProps["allowTagsCount"];
  allowClearAll: SelectCommonProps["allowClearAll"];
  allowRemoveTag: SelectCommonProps["allowRemoveTag"];
  select: React.RefObject<HTMLSelectElement>;
}

export const SelectedValueTags: React.FC<Props> = ({
  selectedOptions,
  placeholder,
  allowTagsCount,
  allowClearAll,
  allowRemoveTag,
  select,
}): JSX.Element => {
  const handleRemove = (value?: React.ReactText): void => {
    if (select.current && value) {
      const options = select.current.options;

      for (let i = 0; i < options.length; i++) {
        const option = options[i];

        // detect target option to toggle selection
        if (option.value === `${value}`) {
          option.selected = !option.selected;
        }
      }

      // force to fire event
      fireEvent(select.current, "change");
    }
  };

  if (!selectedOptions.length) {
    return <>{placeholder}</>;
  }

  return (
    <>
      {allowTagsCount && selectedOptions.length && (
        <div className="select__tags_count">{selectedOptions.length}</div>
      )}

      {selectedOptions.map(
        (option): JSX.Element => (
          <div
            className={classNames([
              "select__tag",
              allowRemoveTag && "select__tag--removable",
            ])}
            key={`select__tag__${option.value}`}
            onClick={
              allowRemoveTag ? () => handleRemove(option.value) : undefined
            }
          >
            {option.component ?? option.label}

            {allowRemoveTag && <div className="select__tag-remove" />}
          </div>
        )
      )}

      {allowClearAll && <SelectedValueClear select={select} />}
    </>
  );
};
