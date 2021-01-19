import React from "react";

import {
  SelectMultiple,
  SelectCommonProps,
  SelectOption,
} from "../../Select.types";
import { classNames } from "../../helpers/classNames";

interface Props {
  options: SelectOption[];
  visibleOptions: SelectOption[];
  value: SelectMultiple["value"];
  onChange: SelectMultiple["onChange"];
  textSelectAll: SelectCommonProps["textSelectAll"];
}

const SelectAllButton: React.FC<Props> = ({
  options,
  visibleOptions,
  value,
  textSelectAll,
  onChange,
}): JSX.Element => {
  const onClickAll = (): void => {
    if (onChange) {
      // if all options were already selected
      if (options.length === value?.length) {
        onChange([]);
      } else {
        onChange(visibleOptions.map((option) => `${option.value}`));
      }
    }
  };

  const onKeyupAll = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key?.toLowerCase() === "enter" || e.key?.toLowerCase() === " ") {
      onClickAll();
    }
  };

  return (
    <>
      <div
        className={classNames([
          "select__option",
          "select__option--select_all",
          options.length === value?.length && "select__option--selected",
        ])}
        onClick={onClickAll}
        onKeyUp={onKeyupAll}
        tabIndex={0}
      >
        {textSelectAll}
      </div>

      <div className="splitter" />
    </>
  );
};

export { SelectAllButton };
