import React from "react";

import {
  SelectMultiple,
  SelectCommonProps,
  SelectOption,
} from "../Select.types";
import { classNames } from "./classNames";

interface Props {
  options: SelectCommonProps["options"];
  visibleOptions: SelectOption[];
  value: SelectMultiple["value"];
  onChange: SelectMultiple["onChange"];
}

const SelectAllButton: React.FC<Props> = ({
  options,
  visibleOptions,
  value,
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
          "option",
          options.length === value?.length && "selected",
        ])}
        onClick={onClickAll}
        onKeyUp={onKeyupAll}
        tabIndex={0}
      >
        Выбрать всё
      </div>

      <div className="splitter" />
    </>
  );
};

export { SelectAllButton };
