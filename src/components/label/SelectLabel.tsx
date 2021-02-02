import React from "react";

interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  label: React.ReactText;
  id?: string;
  disabled?: boolean;
}

export const SelectLabel: React.FC<Props> = ({
  setIsOpen,
  label,
  id,
  disabled,
}): JSX.Element => {
  const onClickLabel = (): void => {
    if (!disabled) {
      setIsOpen(true);
    }
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
