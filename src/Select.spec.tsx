import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { Select } from ".";

const TEST_OPTIONS = [
  {
    label: "String 1 label",
    value: "string1",
  },
  {
    label: "String 2 label",
    value: "string2",
  },
];

describe("Button", () => {
  describe("ref", () => {
    it("Pass correct ref", () => {
      const ref = React.createRef<HTMLSelectElement>();

      render(
        <Select
          data-testid="select"
          name="test_name"
          options={TEST_OPTIONS}
          ref={ref}
        />
      );

      expect(ref.current?.name).toEqual("test_name");
    });
  });

  describe("handle click outside", () => {
    it("opened select can be closed with outside click", () => {
      const { getByTestId } = render(
        <div>
          <div data-testid="test-outside" style={{ height: 100 }} />

          <Select
            data-testid="select"
            name="test_name"
            options={TEST_OPTIONS}
          />
        </div>
      );

      fireEvent.click(getByTestId("select--overlay"));
      expect(getByTestId("select--wrapper")).toHaveClass(
        "artof_select--opened"
      );

      fireEvent.click(getByTestId("test-outside"));
      expect(getByTestId("select--wrapper")).not.toHaveClass(
        "artof_select--opened"
      );
    });
  });

  describe("scroll into view", () => {
    it("dropdown scroll set on top when no selected items", () => {});
    it("dropdown opens with selected item in viewport", () => {});
    it("multiple dropdown scroll to first selected item", () => {});
  });

  describe("classNames", () => {
    it("has basic className", () => {
      const { getByTestId } = render(
        <Select data-testid="select" options={TEST_OPTIONS} />
      );

      expect(getByTestId("select--wrapper")).toHaveClass("artof_select");
    });
  });
});
