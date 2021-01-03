import "./select.scss";

import React, { useState, useRef, useEffect, ReactText } from "react";
import mergeRefs from "react-merge-refs";
import { usePopper } from "react-popper";

import { scrollIntoView } from "./helpers/scrollIntoView";
import { focusNext, focusPrev } from "./events";
import { fireEvent } from "./fireEvent";
import { SelectSingle, SelectMultiple } from "./Select.types";
import { SelectedValues } from "./helpers/SelectedValues";
import { classNames } from "./helpers/classNames";
import { SelectAllButton } from "./helpers/SelectAllButton";

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
    allowSearch = false,
    allowSelectAll = false,
    textSelected = "Selected",
    textSelectAll = "Select all",
    // we cannot render children prop anyway
    children, // eslint-disable-line
    ...restProps
  },
  ref
): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const select = useRef<HTMLSelectElement>(null);
  const visibleField = useRef<HTMLDivElement>(null);
  const [dropdown, setDropdown] = useState<HTMLDivElement | null>(null);

  const { styles, attributes } = usePopper(visibleField.current, dropdown, {
    placement: "bottom",
  });

  useEffect(() => {
    document.addEventListener("click", onClickOutside, false);

    return () => {
      document.removeEventListener("click", onClickOutside, false);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("keyup", handleKeyup, true);

    // scroll to the first selected item if exist
    if (isOpen && dropdown) {
      scrollIntoView(dropdown);
    }

    return () => {
      document.removeEventListener("keyup", handleKeyup, true);
    };
  }, [isOpen]);

  const visibleOptions = options.filter((opt) =>
    `${opt.label} ${opt.value}`.toLowerCase().includes(search.toLowerCase())
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
    const isFocused = event.currentTarget === document.activeElement;

    if (!restProps.disabled && !isFocused) {
      setIsOpen(!isOpen);
    }
  };

  const onFocusValue = (): void => {
    if (!restProps.disabled) {
      setIsOpen(true);
      setTimeout(focusNext, 200);
    }
  };

  const onClickOption = (value: ReactText): void => {
    if (select.current) {
      const options = select.current.options;

      for (let i = 0; i < options.length; i++) {
        const option = options[i];
        const isVisible = visibleOptions.find(
          (opt) => opt.value === option.value
        );

        // if option not visible in dropdown, then unselect
        if (!isVisible) {
          option.selected = false;
        }

        // detect target option to toggle selection
        else if (option.value === value) {
          option.selected = !option.selected;
        }
      }

      // force to fire event
      fireEvent(select.current, "change");
    }
  };

  const onKeyupOption = (
    e: React.KeyboardEvent<HTMLDivElement>,
    val: ReactText
  ): void => {
    if (e.key?.toLowerCase() === "enter" || e.key?.toLowerCase() === " ") {
      onClickOption(val);
    }
  };

  const handleKeyup = (e: KeyboardEvent): void => {
    if (isOpen) {
      // navigate down
      if (e.key?.toLowerCase() === "arrowdown") {
        focusNext();
      }

      // navigate up
      if (e.key?.toLowerCase() === "arrowup") {
        focusPrev();
      }

      // if tab from search field focus
      const selected = dropdown?.querySelectorAll<HTMLElement>(
        ".artof_select-option--selected"
      );

      if (e.key?.toLowerCase() === "tab" && selected?.length) {
        selected[0].focus();
      }

      // if tab outside of current options
      if (
        e.key?.toLowerCase() === "tab" &&
        !visibleField.current?.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
  };

  const onClickOutside = (event: MouseEvent): void => {
    if (!visibleField.current?.contains(event.target as Node)) {
      setIsOpen(false);
      setSearch("");
    }
  };

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.currentTarget.value);
  };

  const onSearchFocus = (): void => {
    setIsOpen(true);
  };

  return (
    <div
      className={classNames([
        "artof_select",
        isOpen && "artof_select--opened",
        restProps.disabled && "artof_select--disabled",
        !!errorText && "artof_select--error",
        multiple && "artof_select--multiple",
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
        className="artof_select-select"
      >
        {!multiple && <option value="" />}

        {options.map((option) => (
          <option key={`option_${option.value}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {label && <label className="artof_select-label">{label}</label>}

      <div className="artof_select-field" ref={visibleField}>
        {allowSearch && (
          <input
            type="text"
            value={search}
            onChange={onSearch}
            onFocus={onSearchFocus}
            className={classNames([
              "artof_select-search",
              !!search && "artof_select-search--filled",
            ])}
          />
        )}

        <div
          className={classNames([
            "artof_select-value",
            !restProps.value?.length && "artof_select-value--placeholder",
            asTags && "artof_select-value--tags",
          ])}
          tabIndex={0}
          onFocus={onFocusValue}
          onClick={onClickValue}
          data-testid={
            restProps["data-testid"]
              ? `${restProps["data-testid"]}--value`
              : undefined
          }
        >
          <SelectedValues
            multiple={multiple}
            options={options}
            asTags={asTags}
            value={restProps.value}
            placeholder={placeholder}
            textSelected={textSelected}
          />
        </div>

        {isOpen && (
          <div
            className="artof_select-dropdown"
            ref={setDropdown}
            style={styles.popper}
            {...attributes.popper}
          >
            {multiple && allowSelectAll && (
              <SelectAllButton
                options={options}
                visibleOptions={visibleOptions}
                value={(restProps as SelectMultiple).value}
                onChange={(restProps as SelectMultiple).onChange}
                textSelectAll={textSelectAll}
              />
            )}

            {visibleOptions.map((option) => {
              const isSelected = multiple
                ? (restProps as SelectMultiple).value?.includes(
                    `${option.value}`
                  )
                : option.value === (restProps as SelectSingle).value;

              return (
                <div
                  className={classNames([
                    "artof_select-option",
                    isSelected && "artof_select-option--selected",
                  ])}
                  key={`dropdown_item__${option.value}`}
                  onClick={() => onClickOption(option.value)}
                  onKeyUp={(e) => onKeyupOption(e, option.value)}
                  tabIndex={0}
                  data-value={option.value}
                >
                  {option.component || option.label}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {errorText && <div className="artof_select-error">{errorText}</div>}

      {hintText && <div className="artof_select-hint">{hintText}</div>}
    </div>
  );
};

const Select = React.memo(React.forwardRef(SelectComponent));
Select.displayName = "Select";

export { Select };
