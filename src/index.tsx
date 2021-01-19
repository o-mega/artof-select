import "./select.scss";

import React, { useState, useRef } from "react";
import mergeRefs from "react-merge-refs";

import { SelectValue } from "./components/value/SelectValue";
import { classNames } from "./helpers/classNames";
import { SelectLabel } from "./components/label/SelectLabel";
import { SelectDropdown } from "./components/dropdown/SelectDropdown";
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
    renderValue,
    ...restProps
  },
  ref
): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const select = useRef<HTMLSelectElement>(null);
  const visibleField = useRef<HTMLDivElement>(null);

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

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
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
        setIsOpen(false);
        setSearch("");
      }
    } else {
      const { onChange } = restProps as SelectSingle;

      // close dropdown on change value
      setIsOpen(false);
      setSearch("");

      // forward original select event
      onChange && onChange(event);
    }
  };

  const onClickValue = (event: React.MouseEvent<HTMLDivElement>): void => {
    // to manipulate with custom elements inside the value
    const isCustomValue =
      renderValue &&
      (event.target as HTMLElement).closest(".select__value_custom");

    const isFocused = event.currentTarget === document.activeElement;

    if (
      !restProps.disabled &&
      !isFocused &&
      (event.target as HTMLElement).className !== "select__clear" &&
      !isCustomValue
    ) {
      setIsOpen(!isOpen);
    }
  };

  const onFocusValue = (event: React.FocusEvent<HTMLDivElement>): void => {
    // to manipulate with custom elements inside the value
    const isCustomValue =
      renderValue &&
      (event.target as HTMLElement).closest(".select__value_custom");

    if (
      !restProps.disabled &&
      (event.target as HTMLElement).className !== "select__clear" &&
      !isCustomValue
    ) {
      setIsOpen(true);
    }
  };

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.currentTarget.value);
  };

  const onSearchFocus = (): void => {
    setIsOpen(true);
  };

  const onSearchKeyUp = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (isOpen) {
      const key = e.key?.toLowerCase();

      // if tab from search field focus
      const selected = visibleField.current?.querySelectorAll<HTMLDivElement>(
        ".select__option--selected"
      );

      if (key === "tab" && selected?.length) {
        selected[0].focus();
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
        onChange={handleChange}
        value={restProps.value}
        tabIndex={-1}
        className="select__select"
      >
        {!multiple && <option value="" />}

        {options.map((option) => (
          <option key={`option_${option.value}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {label && (
        <SelectLabel id={restProps.id} setIsOpen={setIsOpen} label={label} />
      )}

      <div className="select__field" ref={visibleField}>
        {allowSearch && (
          <input
            type="text"
            value={search}
            onChange={onSearch}
            onFocus={onSearchFocus}
            onKeyUp={onSearchKeyUp}
            autoComplete="off"
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
          tabIndex={allowSearch ? undefined : 0}
          onFocus={onFocusValue}
          onClick={onClickValue}
          data-testid={
            restProps["data-testid"]
              ? `${restProps["data-testid"]}--value`
              : undefined
          }
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
          <SelectDropdown
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
