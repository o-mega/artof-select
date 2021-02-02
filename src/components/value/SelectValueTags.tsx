import React from "react";

import { SelectOption } from "../..";
import { SelectedValueClear } from "./SelectValueClear";
import { SelectCommonProps } from "../../Select.types";

interface Props {
  selectedOptions: SelectOption[];
  placeholder: SelectCommonProps["placeholder"];
  allowTagsCount: SelectCommonProps["allowTagsCount"];
  allowClear: SelectCommonProps["allowClear"];
  select: React.RefObject<HTMLSelectElement>;
}

export const SelectedValueTags: React.FC<Props> = ({
  selectedOptions,
  placeholder,
  allowTagsCount,
  allowClear,
  select,
}): JSX.Element => {
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
          <div className="select__tag" key={`select__tag__${option.value}`}>
            {option.component ?? option.label}
          </div>
        )
      )}

      {allowClear && <SelectedValueClear select={select} />}
    </>
  );
};
