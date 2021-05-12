import React from "react";

interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  label: React.ReactNode;
  id?: string;
}

export const SelectLabel: React.FC<Props> = ({
  setIsOpen,
  label,
  id,
}): JSX.Element => {
  const onClickLabel = (): void => {
    setIsOpen && setIsOpen(true);
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
