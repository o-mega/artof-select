import '../../src/select.scss';

import React, { useState } from "react";

import { Select } from "../../src/Select";
import { SelectMultiple } from "../../src/Select.types";

export const SelectMiltipleExample = (props: SelectMultiple) => {
  const [selected, setSelected] = useState<string[] | undefined>(props.value);

  const onChange = (values: string[]): void => {
    setSelected(values);
  };

  return (
    <Select
      {...props}
      value={selected}
      onChange={onChange}
    />
  );
}
