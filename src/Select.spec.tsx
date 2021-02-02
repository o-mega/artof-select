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

  it("Open on ref focus", async () => {
    const ref = React.createRef<HTMLSelectElement>();

    const { findByTestId } = render(
      <Select
        data-testid="select"
        name="test_name"
        options={TEST_OPTIONS}
        ref={ref}
      />
    );

    if (ref.current) {
      fireEvent.focus(ref.current);
    }

    expect(await findByTestId("select--wrapper")).toHaveClass("select--opened");
  });
});

describe("classNames", () => {
  it("has basic className", () => {
    const { getByTestId } = render(
      <Select data-testid="select" options={TEST_OPTIONS} />
    );

    expect(getByTestId("select--wrapper")).toHaveClass("select");
  });

  it("has special className when is open", async () => {
    const { getByRole, findByTestId } = render(
      <Select data-testid="select" options={TEST_OPTIONS} />
    );

    fireEvent.click(getByRole("button"));

    expect(await findByTestId("select--wrapper")).toHaveClass("select--opened");
  });

  it("has special className when disabled", () => {
    const { getByTestId } = render(
      <Select data-testid="select" disabled={true} options={TEST_OPTIONS} />
    );

    expect(getByTestId("select--wrapper")).toHaveClass("select--disabled");
  });

  it("has special className when multiple", () => {
    const { getByTestId } = render(
      <Select data-testid="select" multiple={true} options={TEST_OPTIONS} />
    );

    expect(getByTestId("select--wrapper")).toHaveClass("select--multiple");
  });

  it("has special className when invalidated", () => {
    const { getByTestId } = render(
      <Select
        data-testid="select"
        errorText="Error test"
        options={TEST_OPTIONS}
      />
    );

    expect(getByTestId("select--wrapper")).toHaveClass("select--error");
  });

  it("can set custom className", () => {
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
  it("open dropdown with click on element", async () => {
    const { getByRole, findByTestId } = render(
      <Select data-testid="select" name="test_name" options={TEST_OPTIONS} />
    );

    fireEvent.click(getByRole("button"));

    expect(await findByTestId("select--wrapper")).toHaveClass("select--opened");
  });

  it("should trigger correct focus on tab order", async () => {
    const { getByTestId, findByTestId } = render(
      <React.Fragment>
        <input data-testid="test_input" />

        <Select data-testid="select" options={TEST_OPTIONS} />
      </React.Fragment>
    );

    getByTestId("test_input").focus();

    userEvent.tab();

    expect(await findByTestId("select--field")).toHaveFocus();
  });

  it("should open dropdown when its label is clicked", async () => {
    const { getByRole, findByTestId } = render(
      <Select data-testid="select" label="Test label" options={TEST_OPTIONS} />
    );

    fireEvent.click(getByRole("label"));

    expect(await findByTestId("select--wrapper")).toHaveClass("select--opened");
  });

  it("open only with the left mouse button click", async () => {
    const { getByRole, findByTestId } = render(
      <Select data-testid="select" options={TEST_OPTIONS} />
    );

    const trigger = getByRole("button");

    // If clicked by the right/middle mouse button, no options list should be opened
    fireEvent.click(getByRole("button"), { button: 1 });

    expect(await findByTestId("select--wrapper")).toHaveClass("select--opened");

    fireEvent.click(trigger, { button: 2 });

    expect(await findByTestId("select--wrapper")).toHaveClass("select--opened");
  });

  it("can be opened with aria-expanded props", async () => {
    const { findByTestId } = render(
      <Select
        data-testid="select"
        aria-expanded={true}
        options={TEST_OPTIONS}
      />
    );

    expect(await findByTestId("select--wrapper")).toHaveClass("select--opened");
  });
});

describe("close dropdown", () => {
  it("opened select can be closed with outside click", async () => {
    const { getByTestId, getByRole, findByTestId } = render(
      <div>
        <div data-testid="test-outside" style={{ height: 100 }} />

        <Select data-testid="select" options={TEST_OPTIONS} />
      </div>
    );

    fireEvent.click(getByRole("button"));
    expect(await findByTestId("select--wrapper")).toHaveClass("select--opened");

    fireEvent.click(getByTestId("test-outside"));
    expect(await findByTestId("select--wrapper")).not.toHaveClass(
      "select--opened"
    );
  });

  it("single Select - dropdown closed after select an option", async () => {
    const { getByRole, getByTestId, findByTestId } = render(
      <Select data-testid="select" name="test_name" options={TEST_OPTIONS} />
    );

    fireEvent.click(getByRole("button"));

    const options = (
      await findByTestId("select--dropdown")
    ).getElementsByClassName("select__option");

    fireEvent.click(options[0]);

    expect(getByTestId("select")).toHaveValue("string1");

    expect(await findByTestId("select--wrapper")).not.toHaveClass(
      "select--opened"
    );
  });

  it("multi Select - dropdown not closes after select an option", async () => {
    const { getByRole, findByTestId, findAllByRole } = render(
      <Select data-testid="select" multiple={true} options={TEST_OPTIONS} />
    );

    fireEvent.click(getByRole("button"));

    const options = await findAllByRole("option");

    fireEvent.click(options[0]);

    expect(await findByTestId("select--wrapper")).toHaveClass("select--opened");
  });

  it("opened dropdown closes with Esc", async () => {
    const { getByRole, container, findByTestId } = render(
      <Select data-testid="select" multiple={true} options={TEST_OPTIONS} />
    );

    fireEvent.click(getByRole("button"));

    expect(await findByTestId("select--wrapper")).toHaveClass("select--opened");

    fireEvent.keyDown(container, {
      key: "Escape",
      code: "Escape",
      keyCode: 27,
      charCode: 27,
    });

    expect(await findByTestId("select--wrapper")).not.toHaveClass(
      "select--opened"
    );
  });
});

describe("search", () => {
  it("clicking on allowSearch={true} cause focus on input", async () => {
    const { getByTestId, findByTestId } = render(
      <Select data-testid="select" allowSearch={true} options={TEST_OPTIONS} />
    );

    fireEvent.focus(
      getByTestId("select--wrapper").getElementsByClassName("select__search")[0]
    );

    expect(await findByTestId("select--wrapper")).toHaveClass("select--opened");
  });
});

describe("nulls check", () => {
  it("correct renders without options props", () => {
    const { getByTestId } = render(
      <Select data-testid="select" allowSearch={true} />
    );

    expect(getByTestId("select--wrapper")).toHaveClass("select");
  });

  it("correct renders with no options", () => {
    const { getByTestId } = render(
      <Select data-testid="select" allowSearch={true} options={[]} />
    );

    expect(getByTestId("select--wrapper")).toHaveClass("select");
  });

  it("correct renders with undefined option label", async () => {
    const { getByTestId, findByTestId } = render(
      <Select
        data-testid="select"
        allowSearch={true}
        options={[
          {
            label: undefined,
            value: "string1",
          },
        ]}
      />
    );

    fireEvent.focus(
      getByTestId("select--wrapper").getElementsByClassName("select__search")[0]
    );

    expect(
      (await findByTestId("select--dropdown")).getElementsByClassName(
        "select__option"
      )[0]
    ).toHaveTextContent("string1");
  });

  it("correct renders with undefined option value", async () => {
    const { getByTestId, findByTestId } = render(
      <Select
        data-testid="select"
        allowSearch={true}
        options={[
          {
            component: null,
            label: "test_label",
            value: undefined,
          },
        ]}
      />
    );

    fireEvent.focus(
      getByTestId("select--wrapper").getElementsByClassName("select__search")[0]
    );

    expect(
      (await findByTestId("select--dropdown")).getElementsByClassName(
        "select__option"
      )[0]
    ).toHaveTextContent("test_label");
  });

  it("correct renders with null option component", async () => {
    const { getByTestId, findByTestId } = render(
      <Select
        data-testid="select"
        allowSearch={true}
        options={[
          {
            component: null,
            label: "test_label",
            value: "string1",
          },
        ]}
      />
    );

    fireEvent.focus(
      getByTestId("select--wrapper").getElementsByClassName("select__search")[0]
    );

    expect(
      (await findByTestId("select--dropdown")).getElementsByClassName(
        "select__option"
      )[0]
    ).toHaveTextContent("test_label");
  });
});

describe("props", () => {
  it("should have aria-* attributes", () => {
    const { getByTestId } = render(
      <Select data-testid="select" options={TEST_OPTIONS} aria-hidden="true" />
    );

    expect(getByTestId("select")).toHaveAttribute("aria-hidden", "true");
  });

  it("should have data-* attributes", () => {
    const { getByTestId } = render(
      <Select data-testid="select" options={TEST_OPTIONS} data-custom="test" />
    );

    expect(getByTestId("select")).toHaveAttribute("data-custom", "test");
  });

  it("single - should apply value to select tag", () => {
    const val = TEST_OPTIONS[1].value;

    const { getByTestId } = render(
      <Select data-testid="select" value={val} options={TEST_OPTIONS} />
    );

    expect(getByTestId("select")).toHaveValue(val);
  });

  it("multiple - should apply value to select tag", () => {
    const val = [TEST_OPTIONS[1].value, TEST_OPTIONS[3].value];

    const { getByTestId } = render(
      <Select
        data-testid="select"
        value={val}
        multiple={true}
        options={TEST_OPTIONS}
      />
    );

    expect(getByTestId("select")).toHaveValue(val);
  });

  it("can be labelled with a <label />", () => {
    const label = "Test Label";

    const { getByTestId } = render(
      <Select data-testid="select" label={label} options={TEST_OPTIONS} />
    );

    expect(getByTestId("select").nextSibling).toHaveTextContent(label);
  });

  it("should not trigger any event with disabled", () => {
    const { getByTestId, getByRole } = render(
      <Select data-testid="select" disabled={true} options={TEST_OPTIONS} />
    );

    fireEvent.click(getByRole("button"));

    expect(getByTestId("select--wrapper")).not.toHaveClass("select--opened");
  });

  it("should display the placeholder if its value is empty", () => {
    const placeholder = "Test placeholder";

    const { getByRole } = render(
      <Select
        data-testid="select"
        placeholder={placeholder}
        options={TEST_OPTIONS}
      />
    );

    expect(getByRole("button")).toHaveTextContent(placeholder);
  });

  it("should use the prop to render the value", () => {
    const { getByTestId } = render(
      <Select
        data-testid="select"
        value="string1"
        options={TEST_OPTIONS}
        renderValue={(options) => (
          <>
            {options.map(({ label, value }) => (
              <button
                type="button"
                key={value}
                className="custom_render__button"
                data-testid="custom_render_item"
              >
                {label}
              </button>
            ))}
          </>
        )}
      />
    );

    expect(getByTestId("custom_render_item")).toBeInTheDocument();
  });

  it("should display placeholder with renderValue prop and no selection", () => {
    const placeholder = "Test placeholder";

    const { getByRole } = render(
      <Select
        data-testid="select"
        placeholder={placeholder}
        options={TEST_OPTIONS}
        renderValue={(options) => (
          <>
            {options.map(({ label, value }) => (
              <button
                type="button"
                key={value}
                className="custom_render__button"
                data-testid="custom_render_item"
              >
                {label}
              </button>
            ))}
          </>
        )}
      />
    );

    expect(getByRole("button")).toHaveTextContent(placeholder);
  });

  it("autoFocus: should focus select after Select did mount", () => {
    const { getByTestId } = render(
      <Select data-testid="select" autoFocus={true} options={TEST_OPTIONS} />
    );

    expect(getByTestId("select--field")).toHaveFocus();
  });

  it("should have select `name` when provided", () => {
    const name = "test_name";
    const { getByTestId } = render(
      <Select data-testid="select" name={name} options={TEST_OPTIONS} />
    );

    expect(getByTestId("select")).toHaveAttribute("name", name);
  });

  it("should have `id` attribute for select and `htmlFor` for label when provided", () => {
    const id = "test_name";

    const { getByTestId } = render(
      <Select
        data-testid="select"
        id={id}
        label="Test Label"
        options={TEST_OPTIONS}
      />
    );

    expect(getByTestId("select")).toHaveAttribute("id", id);
    expect(getByTestId("select").nextSibling).toHaveAttribute("for", id);
  });
});

describe("onChange", () => {
  it("single select - should get selected value", async () => {
    let val = "";

    const onChange = jest.fn((event) => {
      val = event.currentTarget.value;
    });

    const { getByRole, container, findByTestId } = render(
      <Select data-testid="select" options={TEST_OPTIONS} onChange={onChange} />
    );

    fireEvent.click(getByRole("button"));

    expect(await findByTestId("select--wrapper")).toHaveClass("select--opened");

    const option = container.querySelector("[role=option]:first-of-type");

    fireEvent.click(option as Element);

    expect(onChange).toHaveBeenCalledTimes(1);

    expect(val).toEqual(TEST_OPTIONS[0].value);
  });

  it("multiple select - should get selected values", async () => {
    let val: string[] = [];

    const onChange = jest.fn((values: string[]) => {
      val = values;
    });

    const { getByRole, container, findByTestId } = render(
      <Select
        multiple
        data-testid="select"
        options={TEST_OPTIONS}
        onChange={onChange}
      />
    );

    fireEvent.click(getByRole("button"));

    expect(await findByTestId("select--wrapper")).toHaveClass("select--opened");

    const option1 = container.querySelector("[role=option]:nth-child(1)");
    const option2 = container.querySelector("[role=option]:nth-child(2)");

    fireEvent.click(option1 as Element);
    fireEvent.click(option2 as Element);

    expect(onChange).toHaveBeenCalledTimes(2);

    expect(val).toEqual([TEST_OPTIONS[0].value, TEST_OPTIONS[1].value]);
  });
});

describe("visible options", () => {
  it("options should have a data-value attribute", async () => {
    const { getByRole, findByTestId } = render(
      <Select
        data-testid="select"
        className="test_classname"
        options={TEST_OPTIONS}
      />
    );

    fireEvent.click(getByRole("button"));

    const options = (
      await findByTestId("select--dropdown")
    ).getElementsByClassName("select__option");

    for (let i = 0; i < options.length; i++) {
      expect(options[i]).toHaveAttribute("data-value", TEST_OPTIONS[i].value);
    }
  });

  it("single select - option should be selected correctly", async () => {
    const val = TEST_OPTIONS[1].value;

    const { getByRole, findByTestId } = render(
      <Select data-testid="select" value={val} options={TEST_OPTIONS} />
    );

    fireEvent.click(getByRole("button"));

    const option = (
      await findByTestId("select--dropdown")
    ).getElementsByClassName("select__option--selected")[0];

    expect(option).toHaveAttribute("data-value", val);
  });

  it("multiple select - options should be selected correctly", async () => {
    const val = [TEST_OPTIONS[1].value, TEST_OPTIONS[3].value];

    const { getByRole, findByTestId } = render(
      <Select
        data-testid="select"
        value={val}
        multiple={true}
        options={TEST_OPTIONS}
      />
    );

    fireEvent.click(getByRole("button"));

    const options = (
      await findByTestId("select--dropdown")
    ).getElementsByClassName("select__option--selected");

    for (let i = 0; i < val.length; i++) {
      expect(options[i]).toHaveAttribute("data-value", val[i]);
    }
  });

  it("single select - should display selected option", () => {
    const { value, label } = TEST_OPTIONS[1];

    const { getByRole } = render(
      <Select data-testid="select" value={value} options={TEST_OPTIONS} />
    );

    expect(getByRole("button")).toHaveTextContent(label);
  });

  it("single multiple - should display selected options count", () => {
    const val = [TEST_OPTIONS[1].value, TEST_OPTIONS[3].value];

    const { getByRole } = render(
      <Select
        data-testid="select"
        value={val}
        multiple={true}
        options={TEST_OPTIONS}
      />
    );

    expect(getByRole("button")).toHaveTextContent(`Selected ${val.length}`);
  });

  it("should display the selected item even if its value is empty", () => {
    const { getByRole } = render(
      <Select
        data-testid="select"
        value=""
        placeholder="Should not be visible"
        options={[...TEST_OPTIONS, { label: "No value", value: "" }]}
      />
    );

    expect(getByRole("button")).toHaveTextContent("No value");
  });
});

describe("warnings", () => {
  it("warns when the value is not present in any option", () => {
    const consoleOutput: string[] = [];
    const mockedWarn = (output: string) => consoleOutput.push(output);
    const val = "ANOTHER";

    console.warn = mockedWarn;

    render(<Select data-testid="select" value={val} options={TEST_OPTIONS} />);

    expect(consoleOutput).toEqual([
      `artof-select: You have provided a non-exist value \`${val}\` for the select component.\n` +
        "Consider providing a value that matches one of the available options or ''.\n" +
        `The available values are ${TEST_OPTIONS.map(
          ({ value }) => `\`${value}\``
        ).join(", ")}.`,
    ]);
  });

  it("should throw if non array for multiple", () => {
    const consoleOutput: string[] = [];
    const mockedError = (output: string) => consoleOutput.push(output);

    console.error = mockedError;

    render(
      // @ts-ignore need here to run the test
      <Select
        data-testid="select"
        value="string1"
        multiple={true}
        options={TEST_OPTIONS}
      />
    );

    expect(consoleOutput).toEqual([
      "Warning: The `%s` prop supplied to <select> must be an array if `multiple` is true.%s%s",
    ]);
  });
});

describe("accessibility", () => {
  it("aria-expanded is not present if the options isnt displayed", async () => {
    const { findByTestId } = render(
      <Select data-testid="select" options={TEST_OPTIONS} />
    );

    expect(await findByTestId("select--wrapper")).not.toHaveAttribute(
      "aria-expanded"
    );
  });

  it("sets aria-expanded=true when the options are displayed", async () => {
    const { getByRole, findByTestId } = render(
      <Select data-testid="select" options={TEST_OPTIONS} />
    );

    fireEvent.click(getByRole("button"));

    expect(await findByTestId("select--wrapper")).toHaveAttribute(
      "aria-expanded",
      "true"
    );
  });

  it("aria-disabled is not present if the Select isn't disabled", async () => {
    const { findByTestId } = render(
      <Select data-testid="select" options={TEST_OPTIONS} />
    );

    expect(await findByTestId("select--wrapper")).not.toHaveAttribute(
      "aria-disabled"
    );
  });

  it("sets aria-disabled=true when the Select is disabled", async () => {
    const { findByTestId } = render(
      <Select data-testid="select" disabled={true} options={TEST_OPTIONS} />
    );

    expect(await findByTestId("select--wrapper")).toHaveAttribute(
      "aria-disabled",
      "true"
    );
  });

  it("indicates the selected option", async () => {
    const { getByRole, findByTestId } = render(
      <Select
        data-testid="select"
        value={TEST_OPTIONS[0].value}
        options={TEST_OPTIONS}
      />
    );

    fireEvent.click(getByRole("button"));

    const options = (
      await findByTestId("select--dropdown")
    ).getElementsByClassName("select__option");

    expect(options[0]).toHaveAttribute("aria-selected");
  });
});
