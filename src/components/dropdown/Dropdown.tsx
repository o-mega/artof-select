import React, { useState, useEffect, useCallback, useMemo } from "react";
import { createPopperLite, flip, offset } from "@popperjs/core";

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

type Props = {
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
  onChange: SelectSingle["onChange"] | SelectMultiple["onChange"];
  onBlur: SelectCommonProps["onBlur"];
  select: React.RefObject<HTMLSelectElement>;
  visibleFieldRef: React.RefObject<HTMLDivElement> | null;
  dropdownOffset: [x: number, y: number];
  dropdownPosition: SelectCommonProps["dropdownPosition"];
  splitterBefore: SelectCommonProps["splitterBefore"];
};

export const Dropdown = React.memo(function dropdown({
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
  select,
  visibleFieldRef,
  textSelectAll,
  "data-testid": dataTestid,
  dropdownOffset,
  dropdownPosition,
  splitterBefore,
  onBlur,
  searchPosition,
  onSearch,
  onSearchKeyUp,
  onSearchFocus,
  searchPlaceholder,
  ...restProps
}: Props) {
  const [typing, setTyping] = useState<string>("");

  const [dropdown, setDropdown] = useState<HTMLDivElement | null>(null);

  const popperProps = useMemo(() => {
    if (!visibleFieldRef?.current || !dropdown) {
      return null;
    }
    const params = createPopperLite(visibleFieldRef.current, dropdown, {
      placement: dropdownPosition,
      modifiers: [
        flip,
        {
          ...offset,
          options: {
            offset: [dropdownOffset[0], dropdownOffset[1]],
          },
        },
      ],
    });

    return {
      attributes: params.state.attributes.popper,
      styles: params.state.styles.popper as React.CSSProperties,
    };
  }, [visibleFieldRef?.current, dropdown]);

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
  }, [isOpen, dropdown, typing]);

  // scroll to the first selected item if exist
  useEffect(() => {
    if (dropdown) {
      scrollIntoView(dropdown);
    }
  }, [dropdown]);

  const onClickOption = useCallback(
    (value: string | number): void => {
      if (select.current) {
        const options = select.current.options;

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
        fireEvent(select.current, "change");
      }
    },
    [select.current]
  );

  const handleKeyDown = (e: KeyboardEvent): void => {
    if (isOpen) {
      const key = e.key?.toLowerCase();
      const target = e.target as Node;
      const isCurrent = visibleFieldRef?.current?.contains(target);

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
        visibleFieldRef?.current?.focus();
        setSearch("");
      }

      // close dropdown on escape
      else if (key === "escape") {
        e.preventDefault();
        toggleDropdown(false);
        visibleFieldRef?.current?.focus();
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

        if (matched.length && dropdown) {
          const index = visibleOptions.indexOf(matched[0]);
          const target =
            document.querySelectorAll<HTMLDivElement>(`.select__option`)?.[
              index
            ];

          if (target) {
            scrollToChild(dropdown, target);
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
    if (!visibleFieldRef?.current?.parentNode?.contains(event.target as Node)) {
      onBlur && onBlur();
      toggleDropdown(false);
      setSearch("");
    }
  };

  return (
    <div
      className="select__dropdown"
      ref={setDropdown}
      role="listbox"
      data-testid={dataTestid ? `${dataTestid}--dropdown` : undefined}
      style={popperProps?.styles}
      {...popperProps?.attributes}
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
});
