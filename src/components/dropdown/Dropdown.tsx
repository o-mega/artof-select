import React, { useState, useEffect, useCallback } from "react";

import { scrollIntoView, scrollToChild } from "../../helpers/scrollIntoView";
import { focusNext, focusPrev } from "../../helpers/events";
import { fireEvent } from "../../helpers/fireEvent";
import { SelectAllButton } from "./SelectAllButton";
import { DropdownItem } from "./DropdownItem";
import {
  SelectCommonProps,
  SelectMultiple,
  SelectOption,
  SelectSingle,
} from "../../Select.types";
import { Search } from "../search/Search";

let typingTimeOut: ReturnType<typeof setTimeout>;

type Props = Pick<React.SelectHTMLAttributes<HTMLSelectElement>, "style"> & {
  options: SelectOption[];
  visibleOptions: SelectOption[];
  isOpen: boolean;
  toggleDropdown: (state: boolean) => void;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  searchPosition: SelectCommonProps["searchPosition"];
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchKeyUp: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSearchFocus: () => void;
  searchPlaceholder?: SelectCommonProps["searchPlaceholder"];
  "data-testid"?: string;
  multiple: boolean;
  allowSelectAll: boolean;
  allowSearch: boolean;
  allowMarkWords: boolean;
  textSelectAll?: string;
  value: SelectSingle["value"] | SelectMultiple["value"];
  splitterBefore: SelectCommonProps["splitterBefore"];
  onChange: SelectSingle["onChange"] | SelectMultiple["onChange"];
  onBlur: SelectCommonProps["onBlur"];
  setFloating: (node: HTMLElement | null) => void;
  refs: {
    select: React.RefObject<HTMLSelectElement>;
    reference: React.MutableRefObject<HTMLDivElement | null>;
    floating: React.MutableRefObject<HTMLElement | null>;
  };
};

export const Dropdown = ({
  options,
  visibleOptions,
  isOpen,
  toggleDropdown,
  search,
  setSearch,
  multiple,
  allowSelectAll,
  allowSearch,
  allowMarkWords,
  setFloating,
  refs,
  textSelectAll,
  "data-testid": dataTestid,
  splitterBefore,
  onBlur,
  searchPosition,
  onSearch,
  onSearchKeyUp,
  onSearchFocus,
  searchPlaceholder,
  style,
  ...restProps
}: Props) => {
  const [typing, setTyping] = useState<string>("");

  // bind click outside
  useEffect(() => {
    document.addEventListener("click", onClickOutside, true);

    return () => {
      document.removeEventListener("click", onClickOutside, true);
      clearTimeout(typingTimeOut);
    };
  }, []);

  // bind keydown
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [isOpen, typing]);

  // scroll to the first selected item if exist
  useEffect(() => {
    if (refs.floating.current) {
      scrollIntoView(refs.floating.current);
    }
  }, [refs.floating.current]);

  const onClickOption = useCallback(
    (value: string | number): void => {
      if (refs.select.current) {
        const options = refs.select.current.options;

        for (let i = 0; i < options.length; i++) {
          const option = options[i];

          // detect target option to toggle selection
          if (option.value === `${value}`) {
            if (option.selected && multiple) {
              option.selected = !option.selected;
            } else {
              option.selected = true;
            }
          }
        }

        // force to fire event
        fireEvent(refs.select.current, "change");
      }
    },
    [refs.select.current]
  );

  const handleKeyDown = (e: KeyboardEvent): void => {
    if (isOpen) {
      const key = e.key?.toLowerCase();
      const target = e.target as Node;
      const isCurrent = refs.reference.current?.contains(target);

      const isFirst =
        (target as HTMLElement).className.includes("select__option") &&
        !target.previousSibling;

      const isLast =
        (target as HTMLElement).className.includes("select__option") &&
        !target.nextSibling;

      // navigate down
      if (isCurrent && !isLast && key === "arrowdown") {
        e.preventDefault();
        focusNext();
      }

      // navigate up
      else if (isCurrent && !isFirst && key === "arrowup") {
        e.preventDefault();
        focusPrev();
      }

      // if tab outside of current options
      else if (
        ["tab", "arrowdown", "arrowup"].includes(key) &&
        !isCurrent &&
        !isFirst &&
        isLast
      ) {
        e.preventDefault();
        toggleDropdown(false);
        refs.reference.current?.focus();
        setSearch("");
      }

      // close dropdown on escape
      else if (key === "escape") {
        e.preventDefault();
        toggleDropdown(false);
        refs.reference.current?.focus();
        setSearch("");
      }

      // to navigate through the options
      else if (key?.length === 1 && !allowSearch) {
        const newValue = `${typing}${key.toLowerCase()}`;
        setTyping(newValue);
        clearTimeout(typingTimeOut);

        const matched = visibleOptions.filter(({ label }) => {
          return label && `${label}`.toLowerCase().startsWith(newValue);
        });

        if (matched.length && refs.floating.current) {
          const index = visibleOptions.indexOf(matched[0]);
          const target =
            document.querySelectorAll<HTMLDivElement>(`.select__option`)?.[
              index
            ];

          if (target) {
            scrollToChild(refs.floating.current, target);
            target.focus();
          }
        }

        typingTimeOut = setTimeout(() => {
          setTyping("");
        }, 1500);
      }
    }
  };

  const onClickOutside = (event: MouseEvent): void => {
    if (!refs.reference?.current?.parentNode?.contains(event.target as Node)) {
      onBlur && onBlur();
      toggleDropdown(false);
      setSearch("");
    }
  };

  return (
    <div
      className="select__dropdown"
      ref={setFloating}
      role="listbox"
      data-testid={dataTestid ? `${dataTestid}--dropdown` : undefined}
      style={style}
    >
      {allowSearch && searchPosition === "dropdown" && (
        <div className="select__option select__option--search">
          <Search
            value={search}
            onChange={onSearch}
            onKeyUp={onSearchKeyUp}
            onFocus={onSearchFocus}
            autoFocus={true}
            tabIndex={0}
            placeholder={searchPlaceholder}
            className="select__search--dropdown"
          />
        </div>
      )}

      {multiple &&
        allowSelectAll &&
        textSelectAll &&
        visibleOptions.length > 1 && (
          <SelectAllButton
            options={options}
            visibleOptions={visibleOptions}
            value={(restProps as SelectMultiple).value}
            onChange={(restProps as SelectMultiple).onChange}
            textSelectAll={textSelectAll}
          />
        )}

      {visibleOptions.map((option, index) => {
        return (
          <React.Fragment key={`dropdown_item__${index}`}>
            {!!(splitterBefore && splitterBefore - 1 === index) && (
              <div className="select__option_splitter" />
            )}

            <DropdownItem
              {...option}
              search={search}
              onClickOption={onClickOption}
              isSelected={
                multiple
                  ? !!(restProps as SelectMultiple).value?.includes(
                      `${option.value}`
                    )
                  : option.value === (restProps as SelectSingle).value
              }
              allowMarkWords={allowMarkWords}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};
