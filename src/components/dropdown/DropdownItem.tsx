import React, { ReactNode, ReactText, KeyboardEvent, useMemo } from "react";

import { classNames } from "../../helpers/classNames";
import { SelectOption } from "../../Select.types";

interface Props extends SelectOption {
  search: string;
  onClickOption: (value: ReactText) => void;
  isSelected: boolean;
  allowMarkWords: boolean;
}

export const DropdownItem: React.FC<Props> = React.memo(function dropdownItem({
  value,
  label,
  component,
  search,
  onClickOption,
  isSelected,
  allowMarkWords,
}): JSX.Element {
  const text: ReactNode | ReactText = useMemo(() => {
    if (component) {
      return component;
    }

    const string = `${label || value}`;

    if (search && allowMarkWords) {
      const re = new RegExp(search, "gi");
      const splits = string.split(re);
      const marks = string.match(re);
      const result: React.ReactNode[] = [];

      splits.forEach((str, i) => {
        result.push(str);

        if (marks?.[i]) {
          result.push(<mark key={marks[i]}>{marks[i]}</mark>);
        }
      });

      return result;
    }

    return string;
  }, [component, label, value, search, allowMarkWords]);

  const onKeyupOption = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key?.toLowerCase() === "enter" || e.key?.toLowerCase() === " ") {
      onClickOption(value || "");
    }
  };

  return (
    <div
      className={classNames([
        "select__option",
        isSelected && "select__option--selected",
      ])}
      onClick={() => onClickOption(value || "")}
      onKeyUp={onKeyupOption}
      tabIndex={0}
      data-value={value}
      aria-selected={isSelected ? "true" : undefined}
      role="option"
    >
      {text}
    </div>
  );
});
