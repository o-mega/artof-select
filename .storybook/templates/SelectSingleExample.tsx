import '../../src/select.scss';

import React, { useState } from "react";

import { Select } from "../../src/Select";
import { SelectSingle } from "../../src/Select.types";

export const SelectSingleExample = (props: SelectSingle) => {
  const [selected, setSelected] = useState<string | undefined>(props.value);

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelected(event.currentTarget.value);
  };

  return (
    <Select
      {...props}
      value={selected}
      onChange={onChange}
    />
  );
}
