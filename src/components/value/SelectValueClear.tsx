import React from "react";

import { fireEvent } from "../../helpers/fireEvent";

type Props = {
  select: React.RefObject<HTMLSelectElement>;
};

export const SelectedValueClear = ({ select }: Props): JSX.Element => {
  const onClear = (): void => {
    if (select.current) {
      select.current.value = "";
      fireEvent(select.current, "change");
    }
  };

  return (
    <button
      type="button"
      onClick={onClear}
      tabIndex={-1}
      className="select__clear"
    />
  );
};
