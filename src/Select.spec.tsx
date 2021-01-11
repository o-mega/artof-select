import "./select.scss";

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

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
  {
    label: "String 3 label",
    value: "string3",
  },
  {
    label: "String 4 label",
    value: "string4",
  },
  {
    label: "String 5 label",
    value: "string5",
  },
  {
    label: "String 6 label",
    value: "string6",
  },
  {
    label: "String 7 label",
    value: "string7",
  },
  {
    label: "String 8 label",
    value: "string8",
  },
  {
    label: "String 9 label",
    value: "string9",
  },
  {
    label: "String 10 label",
    value: "string10",
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

  describe("classNames", () => {
    it("has basic className", () => {
      const { getByTestId } = render(
        <Select data-testid="select" options={TEST_OPTIONS} />
      );

      expect(getByTestId("select--wrapper")).toHaveClass("artof_select");
    });

    it("opened", () => {
      const { getByTestId } = render(
        <Select data-testid="select" options={TEST_OPTIONS} />
      );

      fireEvent.click(getByTestId("select--value"));

      expect(getByTestId("select--wrapper")).toHaveClass(
        "artof_select--opened"
      );
    });

    it("disabled", () => {
      const { getByTestId } = render(
        <Select data-testid="select" disabled={true} options={TEST_OPTIONS} />
      );

      expect(getByTestId("select--wrapper")).toHaveClass(
        "artof_select--disabled"
      );
    });

    it("multiple", () => {
      const { getByTestId } = render(
        <Select data-testid="select" multiple={true} options={TEST_OPTIONS} />
      );

      expect(getByTestId("select--wrapper")).toHaveClass(
        "artof_select--multiple"
      );
    });

    it("invalidated", () => {
      const { getByTestId } = render(
        <Select
          data-testid="select"
          errorText="Error test"
          options={TEST_OPTIONS}
        />
      );

      expect(getByTestId("select--wrapper")).toHaveClass("artof_select--error");
    });

    it("custom className", () => {
      const { getByTestId } = render(
        <Select
          data-testid="select"
          className="test_classname"
          options={TEST_OPTIONS}
        />
      );

      expect(getByTestId("select--wrapper")).toHaveClass("test_classname");
    });
  });

  describe("open dropdown", () => {
    it("open dropdown with click on element", () => {
      const { getByTestId } = render(
        <Select data-testid="select" name="test_name" options={TEST_OPTIONS} />
      );

      fireEvent.click(getByTestId("select--value"));
      expect(getByTestId("select--wrapper")).toHaveClass(
        "artof_select--opened"
      );
    });

    it("open dropdown using focus from previous with tab", () => {
      const { getByTestId } = render(
        <React.Fragment>
          <input data-testid="test_input" />

          <Select data-testid="select" options={TEST_OPTIONS} />
        </React.Fragment>
      );

      getByTestId("test_input").focus();

      userEvent.tab();

      expect(getByTestId("select--wrapper")).toHaveClass(
        "artof_select--opened"
      );
    });

    it("disabled dropdown cannot be opened", () => {
      const { getByTestId } = render(
        <Select data-testid="select" disabled={true} options={TEST_OPTIONS} />
      );

      fireEvent.click(getByTestId("select--value"));

      expect(getByTestId("select--wrapper")).not.toHaveClass(
        "artof_select--opened"
      );
    });
  });

  describe("close dropdown", () => {
    it("opened select can be closed with outside click", () => {
      const { getByTestId } = render(
        <div>
          <div data-testid="test-outside" style={{ height: 100 }} />

          <Select data-testid="select" options={TEST_OPTIONS} />
        </div>
      );

      fireEvent.click(getByTestId("select--value"));
      expect(getByTestId("select--wrapper")).toHaveClass(
        "artof_select--opened"
      );

      fireEvent.click(getByTestId("test-outside"));
      expect(getByTestId("select--wrapper")).not.toHaveClass(
        "artof_select--opened"
      );
    });

    it("single Select - dropdown closed after select an option", () => {
      const { getByTestId } = render(
        <Select data-testid="select" name="test_name" options={TEST_OPTIONS} />
      );

      fireEvent.click(getByTestId("select--value"));
      fireEvent.click(
        getByTestId("select--dropdown").getElementsByClassName(
          "artof_select-option"
        )[0]
      );

      expect(
        getByTestId("select--wrapper").getElementsByClassName(
          "artof_select-select"
        )[0]
      ).toHaveValue("string1");

      expect(getByTestId("select--wrapper")).not.toHaveClass(
        "artof_select--opened"
      );
    });

    it("multi Select - dropdown not closes after select an option", () => {
      const { getByTestId } = render(
        <Select data-testid="select" multiple={true} options={TEST_OPTIONS} />
      );

      fireEvent.click(getByTestId("select--value"));
      fireEvent.click(
        getByTestId("select--dropdown").getElementsByClassName(
          "artof_select-option"
        )[0]
      );

      expect(
        getByTestId("select--wrapper").getElementsByClassName(
          "artof_select-select"
        )[0]
      ).toHaveValue(["string1"]);

      expect(getByTestId("select--wrapper")).toHaveClass(
        "artof_select--opened"
      );
    });

    it("opened dropdown closes with Esc", () => {
      const { getByTestId, container } = render(
        <Select data-testid="select" multiple={true} options={TEST_OPTIONS} />
      );

      fireEvent.click(getByTestId("select--value"));

      fireEvent.keyUp(container, {
        key: "Escape",
        code: "Escape",
        keyCode: 27,
        charCode: 27,
      });

      expect(getByTestId("select--wrapper")).not.toHaveClass(
        "artof_select--opened"
      );
    });
  });

  describe("search", () => {
    it("clicking on allowSearch={true} cause focus on input", () => {
      const { getByTestId } = render(
        <Select
          data-testid="select"
          allowSearch={true}
          options={TEST_OPTIONS}
        />
      );

      fireEvent.focus(
        getByTestId("select--wrapper").getElementsByClassName(
          "artof_select-search"
        )[0]
      );

      expect(getByTestId("select--wrapper")).toHaveClass(
        "artof_select--opened"
      );
    });
  });
});
