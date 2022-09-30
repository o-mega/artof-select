import React, { useState, useRef, useEffect, useCallback } from "react";

import { SelectValue } from "./components/value/SelectValue";
import { fireEvent } from "./helpers/fireEvent";
import { classNames } from "./helpers/classNames";
import { mergeRefs } from "./helpers/mergeRefs";
import { SelectLabel } from "./components/label/SelectLabel";
import { Dropdown } from "./components/dropdown/Dropdown";
import { SelectSingle, SelectMultiple } from "./Select.types";
import { Search } from "./components/search/Search";

let typingTimeOut: ReturnType<typeof setTimeout>;

const SelectComponent: React.ForwardRefRenderFunction<
  HTMLSelectElement,
  SelectSingle | SelectMultiple
> = (
  {
    multiple = false,
    options = [],
    label,
    labelPosition = "before",
    errorText,
    hintText,
    placeholder,
    className,
    asTags = false,
    allowClearAll = false,
    allowRemoveTag = false,
    allowSearch = false,
    allowMarkWords = true,
    allowSelectAll = false,
    allowTagsCount = false,
    textSelected = "Selected",
    textSelectAll = "Select all",
    dropdownOffset = [0, 4],
    dropdownPosition = "bottom-start",
    searchPosition = "value",
    searchPlaceholder,
    autoFocus,
    splitterBefore = 0,
    onSearchChange,
    renderValue,
    "aria-expanded": ariaExpanded = false,
    onBlur,
    onFocus,
    onKeyDown,
    onKeyUp,
    onToggle,
    ...restProps
  },
  ref
): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(ariaExpanded);
  const [search, setSearch] = useState<string>("");
  const [typing, setTyping] = useState<string>("");

  const select = useRef<HTMLSelectElement>(null);
  const visibleField = useRef<HTMLDivElement>(null);

  // bind global keydown spy
  useEffect(() => {
    window.addEventListener("keydown", handleKeydown, false);

    return () => {
      window.removeEventListener("keydown", handleKeydown, false);
    };
  }, []);

  // bind global keyup spy
  useEffect(() => {
    window.addEventListener("keyup", handleKeyup, true);

    return () => {
      window.removeEventListener("keyup", handleKeyup, true);
    };
  }, [typing, isOpen]);

  // autoFocus
  useEffect(() => {
    autoFocus && visibleField?.current?.focus();
  }, [visibleField?.current]);

  // aria-expanded changes
  useEffect(() => {
    ariaExpanded !== isOpen && toggleDropdown(ariaExpanded);
  }, [ariaExpanded]);

  useEffect(() => {
    if (isOpen && restProps.disabled) {
      toggleDropdown(false);
    }
  }, [isOpen, restProps.disabled]);

  if (process.env.NODE_ENV !== "production") {
    React.useEffect(() => {
      const visibleOptions = options.filter(({ label, value }) =>
        `${label} ${value}`.toLowerCase().includes(search.toLowerCase())
      );

      const matchedOptions = visibleOptions.filter(
        ({ value }) => `${value}` === restProps.value
      );

      if (restProps.value && !multiple && matchedOptions.length < 1) {
        console.warn(
          [
            `artof-select: You have provided a non-exist value \`${
              restProps.value
            }\` for the select ${
              restProps.name ? `(name="${restProps.name}") ` : ""
            }component.`,
            "Consider providing a value that matches one of the available options or ''.",
            `The available values are ${visibleOptions
              .map(({ value }) => `\`${value}\``)
              .join(", ")}.`,
          ].join("\n")
        );
      }
    }, [multiple, JSON.stringify(restProps.value)]);
  }

  const visibleOptions = options.filter(({ label, value }) =>
    `${label} ${value}`.toLowerCase().includes(search.toLowerCase())
  );

  const handleBlur = useCallback(() => {
    if (onBlur && !isOpen) {
      onBlur();
    }
  }, [onBlur, isOpen]);

  const onChangeElement = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    if (multiple) {
      const { onChange } = restProps as SelectMultiple;
      const values: string[] = [];
      const selectedOptions = event.currentTarget.selectedOptions;

      for (let i = 0; i < selectedOptions.length; i++) {
        values.push(selectedOptions[i].value);
      }

      onChange && onChange(values);

      // close the dropdown after onChange, if only option was available
      if (visibleOptions.length === 1) {
        visibleField?.current?.focus();

        toggleDropdown(false);
        setSearch("");
      }
    } else {
      const { onChange } = restProps as SelectSingle;

      // close dropdown on change value
      visibleField?.current?.focus();

      toggleDropdown(false);
      setSearch("");

      // forward original select event
      onChange && onChange(event);
    }
  };

  const onFocusElement = (): void => {
    if (!restProps.disabled) {
      toggleDropdown(true);
      visibleField?.current?.focus();
    }
  };

  const onClickField = (event: React.MouseEvent<HTMLDivElement>): void => {
    const target = event.target as HTMLElement;
    const isButton = target.getAttribute("role") === "button";

    // to manipulate with custom elements inside the value
    const isCustomValue =
      renderValue && target.closest(".select__value_custom");

    if (isButton && !restProps.disabled && !isCustomValue) {
      toggleDropdown(!isOpen);
    }
  };

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.currentTarget.value);
    onSearchChange && onSearchChange(event);
  };

  const onSearchFocus = (): void => {
    if (!restProps.disabled) {
      toggleDropdown(true);
    }
  };

  const onSearchKeyUp = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const key = e.key?.toLowerCase();

    if (key === "enter") {
      e.preventDefault();

      // precheck option if only one found
      if (visibleOptions.length === 1) {
        (
          document.getElementsByClassName(
            "select__option--value"
          )[0] as HTMLElement
        ).click();

        setSearch("");
        e.currentTarget.blur();
      }

      // reset search and remove focus
      else if (visibleOptions.length === 0) {
        setSearch("");
        e.currentTarget.blur();
      }
    }

    // move focus from the search to first option item
    else if (key === "arrowdown") {
      (
        document.getElementsByClassName("select__option")[0] as HTMLElement
      ).focus();
    }
  };

  const handleKeydown = (e: KeyboardEvent): void => {
    if (!restProps.disabled) {
      const key = e.key?.toLowerCase();
      const inFocus = e.target === visibleField?.current;
      const isCurrent = visibleField.current?.parentNode?.contains(
        e.target as Node
      );

      if (key === "enter" && isCurrent) {
        e.preventDefault();
      }

      if (isCurrent) {
        if (inFocus && [" ", "arrowdown", "enter"].includes(key)) {
          e.preventDefault();
          toggleDropdown(true);

          if (allowSearch) {
            (visibleField?.current?.childNodes[0] as HTMLElement)?.focus();
          }
        }
      } else if (isOpen) {
        toggleDropdown(false);
      }

      onKeyDown && onKeyDown();
    }
  };

  const handleKeyup = (e: KeyboardEvent): void => {
    if (!restProps.disabled) {
      const key = e.key?.toLowerCase();
      const inFocus = e.target === visibleField?.current;
      const isCurrent = visibleField?.current?.parentNode?.contains(
        e.target as Node
      );

      if (
        key?.length === 1 &&
        inFocus &&
        isCurrent &&
        !isOpen &&
        !multiple &&
        !!select?.current
      ) {
        const newValue = `${typing}${key.toLowerCase()}`;
        setTyping(newValue);
        clearTimeout(typingTimeOut);

        const matched = visibleOptions.filter(({ label }) => {
          return label && `${label}`.toLowerCase().startsWith(newValue);
        });

        const matchedValue = matched.length && matched[0]?.value;

        if (matchedValue) {
          const options = select.current.options;

          for (let i = 0; i < options.length; i++) {
            const option = options[i];

            // detect target option
            if (option.value === `${matchedValue}`) {
              option.selected = true;
            }
          }

          // force to fire event
          fireEvent(select.current, "change");
        }

        typingTimeOut = setTimeout(() => {
          setTyping("");
        }, 1300);
      }

      onKeyUp && onKeyUp();
    }
  };

  const toggleDropdown = (state: boolean): void => {
    setIsOpen(state);

    if (onToggle && select?.current) {
      if (multiple) {
        const options = select.current.options;
        const selectedValues: string[] = [];

        for (let i = 0; i < options.length; i++) {
          if (options[i].selected) {
            selectedValues.push(options[i].value);
          }
        }

        onToggle(state, selectedValues);
      } else {
        onToggle(state, select.current.value);
      }
    }
  };

  return (
    <div
      className={classNames([
        "select",
        isOpen && "select--opened",
        restProps.disabled && "select--disabled",
        !!errorText && "select--error",
        multiple && "select--multiple",
        className,
      ])}
      aria-expanded={isOpen || undefined}
      aria-disabled={restProps.disabled || undefined}
      data-testid={
        restProps["data-testid"]
          ? `${restProps["data-testid"]}--wrapper`
          : undefined
      }
      data-cy={
        restProps["data-cy"] ? `${restProps["data-cy"]}--wrapper` : undefined
      }
    >
      <select
        {...restProps}
        ref={ref ? mergeRefs([select, ref]) : select}
        multiple={multiple}
        onChange={onChangeElement}
        onFocus={onFocusElement}
        value={restProps.value}
        tabIndex={-1}
        className="select__element"
      >
        {!multiple && <option value="" />}

        {options.map((option, index) => (
          <option key={`option_${index}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {label && labelPosition === "before" && (
        <SelectLabel
          id={restProps.id}
          label={label}
          toggleDropdown={!restProps.disabled ? toggleDropdown : undefined}
        />
      )}

      <div
        className="select__field"
        ref={visibleField}
        onClick={onClickField}
        onFocus={onFocus}
        onBlur={handleBlur}
        tabIndex={0}
        data-testid={
          restProps["data-testid"]
            ? `${restProps["data-testid"]}--field`
            : undefined
        }
      >
        {allowSearch && searchPosition === "value" && (
          <Search
            value={search}
            onChange={onSearch}
            onKeyUp={onSearchKeyUp}
            onFocus={onSearchFocus}
            className="select__search--value"
            disabled={restProps.disabled}
          />
        )}

        <div
          className={classNames([
            "select__value",
            !restProps.value?.length && "select__value--placeholder",
            asTags && "select__value--tags",
          ])}
          role="button"
        >
          {label && labelPosition === "inside" && (
            <SelectLabel
              id={restProps.id}
              label={label}
              toggleDropdown={!restProps.disabled ? toggleDropdown : undefined}
            />
          )}

          <SelectValue
            multiple={multiple}
            options={options}
            asTags={asTags}
            value={restProps.value}
            placeholder={placeholder}
            textSelected={textSelected}
            allowTagsCount={allowTagsCount}
            allowClearAll={allowClearAll}
            allowRemoveTag={allowRemoveTag}
            select={select}
            renderValue={renderValue}
          />
        </div>

        {isOpen && (
          <Dropdown
            options={options}
            visibleOptions={visibleOptions}
            isOpen={isOpen}
            toggleDropdown={toggleDropdown}
            search={search}
            searchPosition={searchPosition}
            setSearch={setSearch}
            onSearch={onSearch}
            onSearchKeyUp={onSearchKeyUp}
            onSearchFocus={onSearchFocus}
            searchPlaceholder={searchPlaceholder}
            data-testid={restProps["data-testid"]}
            multiple={multiple}
            allowSelectAll={allowSelectAll}
            allowSearch={allowSearch}
            allowMarkWords={allowMarkWords}
            textSelectAll={textSelectAll}
            value={restProps.value}
            onChange={restProps.onChange}
            onBlur={onBlur}
            select={select}
            visibleFieldRef={visibleField}
            dropdownOffset={dropdownOffset}
            dropdownPosition={dropdownPosition}
            splitterBefore={splitterBefore}
          />
        )}
      </div>

      {label && labelPosition === "after" && (
        <SelectLabel
          id={restProps.id}
          label={label}
          toggleDropdown={!restProps.disabled ? toggleDropdown : undefined}
        />
      )}

      {errorText && <div className="select__error">{errorText}</div>}

      {hintText && <div className="select__hint">{hintText}</div>}
    </div>
  );
};

const Select = React.memo(React.forwardRef(SelectComponent));
Select.displayName = "Select";

export { Select };
