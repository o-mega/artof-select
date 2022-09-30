import React, { ReactNode, KeyboardEvent, useMemo } from "react";

import { classNames } from "../../helpers/classNames";
import { SelectOption } from "../../Select.types";

interface Props extends SelectOption {
  search: string;
  onClickOption: (value: string | number) => void;
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
  const text: ReactNode | string | number = useMemo(() => {
    if (component) {
      return component;
    }

    const string = `${label ?? value}`;

    if (search && allowMarkWords) {
      const re = new RegExp(search, "gi");
      const splits = string.split(re);
      const marks = string.match(re);
      const result: React.ReactNode[] = [];

      splits.forEach((str, i) => {
        result.push(str);

        if (marks?.[i]) {
          result.push(<mark key={`marked_${value}_${i}`}>{marks[i]}</mark>);
        }
      });

      return result;
    }

    return string;
  }, [component, label, value, search, allowMarkWords]);

  const onKeyUp = (e: KeyboardEvent<HTMLDivElement>): void => {
    const key = e.key?.toLowerCase();

    if (["enter", " "].includes(key)) {
      e.preventDefault();
      onClickOption(value ?? "");
    }
  };

  const onClick = (): void => {
    onClickOption(value ?? "");
  };

  return (
    <div
      className={classNames([
        "select__option",
        "select__option--value",
        isSelected && "select__option--selected",
      ])}
      onClick={onClick}
      onKeyUp={onKeyUp}
      tabIndex={0}
      data-value={value}
      aria-selected={isSelected ? "true" : undefined}
      role="option"
    >
      {text}
    </div>
  );
});
