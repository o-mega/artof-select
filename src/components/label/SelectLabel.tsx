import React from "react";

interface Props {
  label: React.ReactNode;
  id?: string;
  toggleDropdown?: (state: boolean) => void;
}

export const SelectLabel: React.FC<Props> = ({
  toggleDropdown,
  label,
  id,
}): JSX.Element => {
  const onClickLabel = (): void => {
    toggleDropdown && toggleDropdown(true);
  };

  return (
    <label
      htmlFor={id}
      className="select__label"
      onClick={onClickLabel}
      role="label"
    >
      {label}
    </label>
  );
};
