import React from "react";

import { fireEvent } from "../../helpers/fireEvent";

interface Props {
  select: React.RefObject<HTMLSelectElement>;
}

export const SelectedValueClear: React.FC<Props> = ({
  select,
}): JSX.Element => {
  const onClear = (): void => {
    if (select.current) {
      select.current.value = "";
      fireEvent(select.current, "change");
    }
  };

  return <button type="button" onClick={onClear} className="select__clear" />;
};
