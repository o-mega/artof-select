import "./select.scss";

import React, { useState, useRef, useEffect } from "react";
import mergeRefs from "react-merge-refs";

import { SelectValue } from "./components/value/SelectValue";
import { classNames } from "./helpers/classNames";
import { SelectLabel } from "./components/label/SelectLabel";
import { Dropdown } from "./components/dropdown/Dropdown";
import {
  SelectOption,
  SelectCommonProps,
  SelectSingle,
  SelectMultiple,
} from "./Select.types";

const SelectComponent: React.ForwardRefRenderFunction<
  HTMLSelectElement,
  SelectSingle | SelectMultiple
> = (
  {
    multiple = false,
    options = [],
    label,
    errorText,
    hintText,
    placeholder,
    className,
    asTags = false,
    allowClear = false,
    allowSearch = false,
    allowMarkWords = true,
    allowSelectAll = false,
    allowTagsCount = false,
    textSelected = "Selected",
    textSelectAll = "Select all",
    dropdownOffset = [0, 4],
    autoFocus,
    renderValue,
    ...restProps
  },
  ref
): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const select = useRef<HTMLSelectElement>(null);
  const visibleField = useRef<HTMLDivElement>(null);

  // bind global keydown spy
  useEffect(() => {
    window.addEventListener("keydown", handleKeydown, false);

    return () => {
      window.removeEventListener("keydown", handleKeydown, false);
    };
  }, []);

  // autoFocus
  useEffect(() => {
    autoFocus && visibleField.current?.focus();
  }, [visibleField.current]);

  if (process.env.NODE_ENV !== "production") {
    React.useEffect(() => {
      const visibleOptions = options.filter(({ label, value }) =>
        `${label} ${value}`.toLowerCase().includes(search.toLowerCase())
      );

      const matchedOptions = visibleOptions.filter(
        ({ value }) => value === restProps.value
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
            `The available values are ${
              visibleOptions.map(({ value }) => `\`${value}\``).join(", ") ||
              '""'
            }.`,
          ].join("\n")
        );
      }
    }, [multiple, JSON.stringify(restProps.value), JSON.stringify(options)]);
  }

  const visibleOptions = options.filter(({ label, value }) =>
    `${label} ${value}`.toLowerCase().includes(search.toLowerCase())
  );

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

      // close dropdown on change value if only one option were available
      if (visibleOptions.length === 1) {
        visibleField.current?.focus();

        setIsOpen(false);
        setSearch("");
      }
    } else {
      const { onChange } = restProps as SelectSingle;

      // close dropdown on change value
      visibleField.current?.focus();

      setIsOpen(false);
      setSearch("");

      // forward original select event
      onChange && onChange(event);
    }
  };

  const onFocusElement = (): void => {
    setIsOpen(true);
    visibleField.current?.focus();
  };

  const onClickField = (event: React.MouseEvent<HTMLDivElement>): void => {
    const target = event.target as HTMLElement;
    const isButton = target.getAttribute("role") === "button";

    // to manipulate with custom elements inside the value
    const isCustomValue =
      renderValue && target.closest(".select__value_custom");

    if (isButton && !restProps.disabled && !isCustomValue) {
      setIsOpen(!isOpen);
    }
  };

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.currentTarget.value);
  };

  const onSearchFocus = (): void => {
    setIsOpen(true);
  };

  const onSearchDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const key = e.key?.toLowerCase();

    if (key === "enter") {
      if (visibleOptions.length === 1) {
        (document.getElementsByClassName(
          "select__option"
        )[0] as HTMLElement).click();
        e.currentTarget.blur();
      } else if (visibleOptions.length === 0) {
        setSearch("");
        e.currentTarget.blur();
      }
    } else if (key === "arrowdown") {
      (document.getElementsByClassName(
        "select__option"
      )[0] as HTMLElement).focus();
    }
  };

  const handleKeydown = (e: KeyboardEvent): void => {
    const key = e.key?.toLowerCase();
    const inFocus = e.target === visibleField.current;
    const isCurrent = visibleField.current?.parentNode?.contains(
      e.target as Node
    );

    if (isCurrent) {
      if (inFocus && [" ", "arrowdown", "enter"].includes(key)) {
        e.preventDefault();
        setIsOpen(true);

        if (allowSearch) {
          (visibleField.current?.childNodes[0] as HTMLElement)?.focus();
        }
      }
    } else {
      setIsOpen(false);
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
        ref={mergeRefs([select, ref])}
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

      {label && (
        <SelectLabel id={restProps.id} setIsOpen={setIsOpen} label={label} />
      )}

      <div
        className="select__field"
        ref={visibleField}
        onClick={onClickField}
        tabIndex={0}
        data-testid={
          restProps["data-testid"]
            ? `${restProps["data-testid"]}--field`
            : undefined
        }
      >
        {allowSearch && (
          <input
            type="text"
            value={search}
            onChange={onSearch}
            onKeyDown={onSearchDown}
            onFocus={onSearchFocus}
            autoComplete="off"
            role="search"
            tabIndex={-1}
            className={classNames([
              "select__search",
              !!search && "select__search--filled",
            ])}
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
          <SelectValue
            multiple={multiple}
            options={options}
            asTags={asTags}
            value={restProps.value}
            placeholder={placeholder}
            textSelected={textSelected}
            allowTagsCount={allowTagsCount}
            allowClear={allowClear}
            select={select}
            renderValue={renderValue}
          />
        </div>

        {isOpen && (
          <Dropdown
            options={options}
            visibleOptions={visibleOptions}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            search={search}
            setSearch={setSearch}
            data-testid={restProps["data-testid"]}
            multiple={multiple}
            allowSelectAll={allowSelectAll}
            allowSearch={allowSearch}
            allowMarkWords={allowMarkWords}
            textSelectAll={textSelectAll}
            value={restProps.value}
            onChange={restProps.onChange}
            selectRef={select.current}
            visibleFieldRef={visibleField.current}
            dropdownOffset={dropdownOffset}
          />
        )}
      </div>

      {errorText && <div className="select__error">{errorText}</div>}

      {hintText && <div className="select__hint">{hintText}</div>}
    </div>
  );
};

const Select = React.memo(React.forwardRef(SelectComponent));
Select.displayName = "Select";

export {
  SelectOption,
  SelectCommonProps,
  SelectSingle,
  SelectMultiple,
  Select,
};
