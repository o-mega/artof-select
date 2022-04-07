import React from "react";
import { classNames } from "../../helpers/classNames";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export const Search = (props: Props): JSX.Element => {
  return (
    <input
      {...props}
      type="text"
      autoComplete="off"
      role="search"
      tabIndex={-1}
      className={classNames([
        "select__search",
        props.className,
        !!props.value && "select__search--filled",
      ])}
    />
  );
};
