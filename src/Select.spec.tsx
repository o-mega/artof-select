import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { industryOptions } from "../.storybook/static/options.mock";

import { Select } from "./Select";

describe("ref", () => {
  it("Pass correct ref", () => {
    const ref = React.createRef<HTMLSelectElement>();

    render(
      <Select
        data-testid="select"
        name="test_name"
        options={industryOptions}
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
        options={industryOptions}
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
      <Select data-testid="select" options={industryOptions} />
    );

    expect(getByTestId("select--wrapper")).toHaveClass("select");
  });

  it("has special className when is open", async () => {
    const { getByRole, findByTestId } = render(
      <Select data-testid="select" options={industryOptions} />
    );

    fireEvent.click(getByRole("button"));

    expect(await findByTestId("select--wrapper")).toHaveClass("select--opened");
  });

  it("has special className when disabled", () => {
    const { getByTestId } = render(
      <Select data-testid="select" disabled={true} options={industryOptions} />
    );

    expect(getByTestId("select--wrapper")).toHaveClass("select--disabled");
  });

  it("has special className when multiple", () => {
    const { getByTestId } = render(
      <Select data-testid="select" multiple={true} options={industryOptions} />
    );

    expect(getByTestId("select--wrapper")).toHaveClass("select--multiple");
  });

  it("has special className when invalidated", () => {
    const { getByTestId } = render(
      <Select
        data-testid="select"
        errorText="Error test"
        options={industryOptions}
      />
    );

    expect(getByTestId("select--wrapper")).toHaveClass("select--error");
  });

  it("can set custom className", () => {
    const { getByTestId } = render(
      <Select
        data-testid="select"
        className="test_classname"
        options={industryOptions}
      />
    );

    expect(getByTestId("select--wrapper")).toHaveClass("test_classname");
  });
});

describe("open dropdown", () => {
  it("open dropdown with click on element", async () => {
    const { getByRole, findByTestId } = render(
      <Select data-testid="select" name="test_name" options={industryOptions} />
    );

    fireEvent.click(getByRole("button"));

    expect(await findByTestId("select--wrapper")).toHaveClass("select--opened");
  });

  it("should trigger correct focus on tab order", async () => {
    const { getByTestId, findByTestId } = render(
      <React.Fragment>
        <input data-testid="test_input" />

        <Select data-testid="select" options={industryOptions} />
      </React.Fragment>
    );

    getByTestId("test_input").focus();

    userEvent.tab();

    expect(await findByTestId("select--field")).toHaveFocus();
  });

  it("should open dropdown when its label is clicked", async () => {
    const { getByRole, findByTestId } = render(
      <Select
        data-testid="select"
        label="Test label"
        options={industryOptions}
      />
    );

    fireEvent.click(getByRole("label"));

    expect(await findByTestId("select--wrapper")).toHaveClass("select--opened");
  });

  it("open only with the left mouse button click", async () => {
    const { getByRole, findByTestId } = render(
      <Select data-testid="select" options={industryOptions} />
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
        options={industryOptions}
      />
    );

    expect(await findByTestId("select--wrapper")).toHaveClass("select--opened");
  });
});

it("render of initially expanded select on state changes", async () => {
  const TestComponent = () => {
    const [render, setRender] = React.useState<boolean>(false);

    return (
      <>
        {render && (
          <Select
            data-testid="select"
            aria-expanded={true}
            options={industryOptions}
          />
        )}

        <button
          type="button"
          data-testid="toggler"
          onClick={() => setRender(!render)}
        >
          toggle
        </button>
      </>
    );
  };

  const { findByTestId } = render(<TestComponent />);

  fireEvent.click(await findByTestId("toggler"));

  expect(await findByTestId("select--wrapper")).toHaveClass("select--opened");
});

describe("close dropdown", () => {
  it("opened select can be closed with outside click", async () => {
    const { getByTestId, getByRole, findByTestId } = render(
      <div>
        <div data-testid="test-outside" style={{ height: 100 }} />

        <Select data-testid="select" options={industryOptions} />
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
      <Select data-testid="select" name="test_name" options={industryOptions} />
    );

    fireEvent.click(getByRole("button"));

    const options = (
      await findByTestId("select--dropdown")
    ).getElementsByClassName("select__option");

    fireEvent.click(options[0]);

    expect(getByTestId("select")).toHaveValue(`${industryOptions[0].value}`);

    expect(await findByTestId("select--wrapper")).not.toHaveClass(
      "select--opened"
    );
  });

  it("multi Select - dropdown not closes after select an option", async () => {
    const { getByRole, findByTestId, findAllByRole } = render(
      <Select data-testid="select" multiple={true} options={industryOptions} />
    );

    fireEvent.click(getByRole("button"));

    const options = await findAllByRole("option");

    fireEvent.click(options[0]);

    expect(await findByTestId("select--wrapper")).toHaveClass("select--opened");
  });

  it("opened dropdown closes with Esc", async () => {
    const { getByRole, container, findByTestId } = render(
      <Select data-testid="select" multiple={true} options={industryOptions} />
    );

    fireEvent.click(getByRole("button"));

    expect(await findByTestId("select--wrapper")).toHaveClass("select--opened");

    fireEvent.keyDown(container, { key: "Escape" });

    expect(await findByTestId("select--wrapper")).not.toHaveClass(
      "select--opened"
    );
  });
});

describe("search", () => {
  it("clicking on allowSearch={true} cause focus on input", async () => {
    const { getByTestId, findByTestId } = render(
      <Select
        data-testid="select"
        allowSearch={true}
        options={industryOptions}
      />
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
            value: industryOptions[0].value,
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
    ).toHaveTextContent(`${industryOptions[0].value}`);
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
            value: industryOptions[0].value,
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
      <Select
        data-testid="select"
        options={industryOptions}
        aria-hidden="true"
      />
    );

    expect(getByTestId("select")).toHaveAttribute("aria-hidden", "true");
  });

  it("should have data-* attributes", () => {
    const { getByTestId } = render(
      <Select
        data-testid="select"
        options={industryOptions}
        data-custom="test"
      />
    );

    expect(getByTestId("select")).toHaveAttribute("data-custom", "test");
  });

  it("single - should apply value to select tag", () => {
    const val = `${industryOptions[1].value}`;

    const { getByTestId } = render(
      <Select data-testid="select" value={val} options={industryOptions} />
    );

    expect(getByTestId("select")).toHaveValue(val);
  });

  it("multiple - should apply value to select tag", () => {
    const val = [`${industryOptions[1].value}`, `${industryOptions[3].value}`];

    const { getByTestId } = render(
      <Select
        data-testid="select"
        value={val}
        multiple={true}
        options={industryOptions}
      />
    );

    expect(getByTestId("select")).toHaveValue(val);
  });

  it("can be labelled with a <label />", () => {
    const label = "Test Label";

    const { getByTestId } = render(
      <Select data-testid="select" label={label} options={industryOptions} />
    );

    expect(getByTestId("select").nextSibling).toHaveTextContent(label);
  });

  it("should not trigger any event with disabled", () => {
    const { getByTestId, getByRole } = render(
      <Select data-testid="select" disabled={true} options={industryOptions} />
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
        options={industryOptions}
      />
    );

    expect(getByRole("button")).toHaveTextContent(placeholder);
  });

  it("should use the prop to render the value", () => {
    const { getByTestId } = render(
      <Select
        data-testid="select"
        value={`${industryOptions[0].value}`}
        options={industryOptions}
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
        options={industryOptions}
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
      <Select data-testid="select" autoFocus={true} options={industryOptions} />
    );

    expect(getByTestId("select--field")).toHaveFocus();
  });

  it("should have select `name` when provided", () => {
    const name = "test_name";
    const { getByTestId } = render(
      <Select data-testid="select" name={name} options={industryOptions} />
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
        options={industryOptions}
      />
    );

    expect(getByTestId("select")).toHaveAttribute("id", id);
    expect(getByTestId("select").nextSibling).toHaveAttribute("for", id);
  });

  it("handle onKeyUp event", () => {
    const onKeyUp = jest.fn(() => {});

    const { getByTestId } = render(
      <Select
        data-testid="select"
        options={industryOptions}
        onKeyUp={onKeyUp}
      />
    );

    fireEvent.focus(getByTestId("select--field"));
    fireEvent.keyUp(getByTestId("select--field"), { key: "f" });

    expect(onKeyUp).toHaveBeenCalledTimes(1);
  });

  it("handle onKeyDown event", () => {
    const onKeyDown = jest.fn(() => {});

    const { getByTestId } = render(
      <Select
        data-testid="select"
        options={industryOptions}
        onKeyDown={onKeyDown}
      />
    );

    fireEvent.focus(getByTestId("select--field"));
    fireEvent.keyDown(getByTestId("select--field"), { key: "f" });

    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });

  it("handle onFocus event", () => {
    const onFocus = jest.fn(() => {});

    const { getByTestId } = render(
      <Select
        data-testid="select"
        options={industryOptions}
        onFocus={onFocus}
      />
    );

    fireEvent.focus(getByTestId("select--field"));

    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it("handle onBlur event", () => {
    const onBlur = jest.fn(() => {});

    const { getByTestId } = render(
      <Select data-testid="select" options={industryOptions} onBlur={onBlur} />
    );

    fireEvent.blur(getByTestId("select--field"));

    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it("Renders label correctly", () => {
    const testLabel = "Test Label";

    const { getByRole } = render(
      <Select
        data-testid="select"
        options={industryOptions}
        label={testLabel}
      />
    );

    expect(getByRole("label")).toHaveTextContent(testLabel);
  });

  it("Adds `for` attribute to the Label, if `id` provided", () => {
    const testLabel = "Test Label";
    const testSelectId = "select_test_id";

    const { getByRole } = render(
      <Select
        data-testid="select"
        options={industryOptions}
        label={testLabel}
        id={testSelectId}
      />
    );

    expect(getByRole("label")).toHaveAttribute("for", testSelectId);
  });

  it("labelPosition: default position for label is before the select", () => {
    const testLabel = "Test Label";

    const { getByRole } = render(
      <Select
        data-testid="select"
        options={industryOptions}
        label={testLabel}
      />
    );

    expect(getByRole("label").nextSibling).toHaveClass("select__field");
  });

  it("labelPosition: Label can be placed after the Select", () => {
    const testLabel = "Test Label";

    const { getByRole } = render(
      <Select
        data-testid="select"
        options={industryOptions}
        label={testLabel}
        labelPosition="after"
      />
    );

    expect(getByRole("label").previousSibling).toHaveClass("select__field");
  });

  it("labelPosition: Label can be placed inside to the Value container", () => {
    const testLabel = "Test Label";

    const { getByRole } = render(
      <Select
        data-testid="select"
        options={industryOptions}
        label={testLabel}
        labelPosition="inside"
      />
    );

    expect(getByRole("label").parentNode).toHaveClass("select__value");
  });

  it("handle onToggle event", async () => {
    const onToggle = jest.fn((state: boolean) => {
      expect(state).toBe(true);
    });

    const { getByRole, findByTestId } = render(
      <Select
        data-testid="select"
        options={industryOptions}
        onToggle={onToggle}
      />
    );

    fireEvent.click(getByRole("button"));

    await findByTestId("select--wrapper");

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it("Sets dropdown placement", async () => {
    const testPlacement = "right-start";

    const { getByRole, findByRole } = render(
      <Select
        data-testid="select"
        options={industryOptions}
        dropdownPosition={testPlacement}
      />
    );

    fireEvent.click(getByRole("button"));

    expect(await findByRole("listbox")).toHaveAttribute(
      "data-popper-placement",
      testPlacement
    );
  });
});

describe("onChange", () => {
  it("single select - should get selected value", async () => {
    let val = "";

    const onChange = jest.fn((event) => {
      val = event.currentTarget.value;
    });

    const { getByRole, container, findByTestId } = render(
      <Select
        data-testid="select"
        options={industryOptions}
        onChange={onChange}
      />
    );

    fireEvent.click(getByRole("button"));

    expect(await findByTestId("select--wrapper")).toHaveClass("select--opened");

    const option = container.querySelector("[role=option]:first-of-type");

    fireEvent.click(option as Element);

    expect(onChange).toHaveBeenCalledTimes(1);

    expect(val).toEqual(industryOptions[0].value);
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
        options={industryOptions}
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

    expect(val).toEqual([industryOptions[0].value, industryOptions[1].value]);
  });
});

describe("visible options", () => {
  it("options should have a data-value attribute", async () => {
    const { getByRole, findByTestId } = render(
      <Select
        data-testid="select"
        className="test_classname"
        options={industryOptions}
      />
    );

    fireEvent.click(getByRole("button"));

    const options = (
      await findByTestId("select--dropdown")
    ).getElementsByClassName("select__option");

    for (let i = 0; i < options.length; i++) {
      expect(options[i]).toHaveAttribute(
        "data-value",
        industryOptions[i].value
      );
    }
  });

  it("single select - option should be selected correctly", async () => {
    const val = `${industryOptions[1].value}`;

    const { getByRole, findByTestId } = render(
      <Select data-testid="select" value={val} options={industryOptions} />
    );

    fireEvent.click(getByRole("button"));

    const option = (
      await findByTestId("select--dropdown")
    ).getElementsByClassName("select__option--selected")[0];

    expect(option).toHaveAttribute("data-value", val);
  });

  it("multiple select - options should be selected correctly", async () => {
    const val = [`${industryOptions[1].value}`, `${industryOptions[3].value}`];

    const { getByRole, findByTestId } = render(
      <Select
        data-testid="select"
        value={val}
        multiple={true}
        options={industryOptions}
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
    const { value, label } = industryOptions[1];

    const { getByRole } = render(
      <Select
        data-testid="select"
        value={`${value}`}
        options={industryOptions}
      />
    );

    expect(getByRole("button")).toHaveTextContent(`${label}`);
  });

  it("single multiple - should display selected options count", () => {
    const val = [`${industryOptions[1].value}`, `${industryOptions[3].value}`];

    const { getByRole } = render(
      <Select
        data-testid="select"
        value={val}
        multiple={true}
        options={industryOptions}
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
        options={[...industryOptions, { label: "No value", value: "" }]}
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

    render(
      <Select data-testid="select" value={val} options={industryOptions} />
    );

    expect(consoleOutput).toEqual([
      `artof-select: You have provided a non-exist value \`${val}\` for the select component.\n` +
        "Consider providing a value that matches one of the available options or ''.\n" +
        `The available values are ${industryOptions
          .map(({ value }) => `\`${value}\``)
          .join(", ")}.`,
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
        value={`${industryOptions[0].value}`}
        multiple={true}
        options={industryOptions}
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
      <Select data-testid="select" options={industryOptions} />
    );

    expect(await findByTestId("select--wrapper")).not.toHaveAttribute(
      "aria-expanded"
    );
  });

  it("sets aria-expanded=true when the options are displayed", async () => {
    const { getByRole, findByTestId } = render(
      <Select data-testid="select" options={industryOptions} />
    );

    fireEvent.click(getByRole("button"));

    expect(await findByTestId("select--wrapper")).toHaveAttribute(
      "aria-expanded",
      "true"
    );
  });

  it("update state of aria-expanded from outside", async () => {
    const TestComponent = () => {
      const [open, setOpen] = React.useState<boolean>(false);

      return (
        <>
          <Select
            data-testid="select"
            aria-expanded={open}
            options={industryOptions}
          />

          <button
            type="button"
            data-testid="toggler"
            onClick={() => setOpen(!open)}
          >
            toggle
          </button>
        </>
      );
    };

    const { findByTestId } = render(<TestComponent />);

    expect(await findByTestId("select--wrapper")).not.toHaveAttribute(
      "aria-expanded"
    );

    fireEvent.click(await findByTestId("toggler"));

    expect(await findByTestId("select--wrapper")).toHaveAttribute(
      "aria-expanded",
      "true"
    );

    fireEvent.click(await findByTestId("toggler"));

    expect(await findByTestId("select--wrapper")).not.toHaveAttribute(
      "aria-expanded"
    );
  });

  it("aria-disabled is not present if the Select isn't disabled", async () => {
    const { findByTestId } = render(
      <Select data-testid="select" options={industryOptions} />
    );

    expect(await findByTestId("select--wrapper")).not.toHaveAttribute(
      "aria-disabled"
    );
  });

  it("sets aria-disabled=true when the Select is disabled", async () => {
    const { findByTestId } = render(
      <Select data-testid="select" disabled={true} options={industryOptions} />
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
        value={`${industryOptions[0].value}`}
        options={industryOptions}
      />
    );

    fireEvent.click(getByRole("button"));

    const options = (
      await findByTestId("select--dropdown")
    ).getElementsByClassName("select__option");

    expect(options[0]).toHaveAttribute("aria-selected");
  });
});

describe("interactions", () => {
  it("should correctly select the option with empty value", async () => {
    const label = "test label for empty value";

    const { findByRole } = render(
      <Select
        data-testid="select"
        options={[{ label, value: "" }, ...industryOptions]}
        value=""
      />
    );

    expect(await findByRole("button")).toHaveTextContent(label);
  });

  it("should correctly select option with zero value", async () => {
    const label = "test label for empty value";

    const { findByRole } = render(
      <Select
        data-testid="select"
        options={[{ label, value: "0" }, ...industryOptions]}
        value="0"
      />
    );

    expect(await findByRole("button")).toHaveTextContent(label);
  });

  it("should display empty label", async () => {
    const label = "";

    const { findByRole } = render(
      <Select
        data-testid="select"
        options={[{ label, value: "test_value" }, ...industryOptions]}
        value="test_value"
      />
    );

    expect(await findByRole("button")).toHaveTextContent(label);
  });

  it("should select with enter if the only child in search results", async () => {
    const searchBy = industryOptions[0];

    const { getByRole, getByTestId, findByTestId } = render(
      <Select
        data-testid="select"
        allowSearch={true}
        options={industryOptions}
      />
    );

    fireEvent.focus(getByRole("search"));

    fireEvent.change(getByRole("search"), {
      target: { value: searchBy.label },
    });

    const options = (
      await findByTestId("select--dropdown")
    ).getElementsByClassName("select__option");

    expect(options.length).toEqual(1);

    fireEvent.keyUp(getByRole("search"), { key: "Enter" });

    expect(getByTestId("select")).toHaveValue(searchBy.value);
  });

  it("should not submit form on pressing enter when selecting only option", async () => {
    const onSubmit = jest.fn(() => {});

    const { getByRole, findByTestId } = render(
      <form onSubmit={onSubmit}>
        <Select
          data-testid="select"
          allowSearch={true}
          options={industryOptions}
        />
      </form>
    );

    fireEvent.focus(getByRole("search"));

    fireEvent.change(getByRole("search"), {
      target: { value: industryOptions[1].label },
    });

    expect(await findByTestId("select--wrapper")).toHaveClass("select--opened");

    fireEvent.keyUp(getByRole("search"), { key: "Enter" });

    expect(onSubmit).toHaveBeenCalledTimes(0);

    expect(await findByTestId("select--wrapper")).not.toHaveClass(
      "select--opened"
    );
  });

  it("should not submit form on pressing enter when selecting multiple values", async () => {
    const onSubmit = jest.fn(() => {});

    const { getByRole, findByTestId, getByTestId } = render(
      <form onSubmit={onSubmit}>
        <Select
          multiple={true}
          data-testid="select"
          options={industryOptions}
        />
      </form>
    );

    fireEvent.click(getByRole("button"));

    const options = (
      await findByTestId("select--dropdown")
    ).getElementsByClassName("select__option");

    fireEvent.keyUp(options[1], { key: "Enter" });
    fireEvent.keyUp(options[2], { key: "Enter" });

    expect(onSubmit).toHaveBeenCalledTimes(0);

    expect(getByTestId("select")).toHaveValue([
      `${industryOptions[1].value}`,
      `${industryOptions[2].value}`,
    ]);
  });

  it("should changes when typing one symbol match over focused component", async () => {
    const { getByTestId } = render(
      <Select data-testid="select" options={industryOptions} />
    );

    const targetOption = industryOptions.filter(({ label }) => {
      return `${label}`.toLowerCase().startsWith("f");
    });

    fireEvent.focus(getByTestId("select--field"));
    fireEvent.keyUp(getByTestId("select--field"), { key: "f" });

    expect(getByTestId("select")).toHaveValue(`${targetOption[0].value}`);
  });

  it("should changes when typing few symbols match over focused component", async () => {
    const { getByTestId } = render(
      <Select data-testid="select" options={industryOptions} />
    );

    const targetOption = industryOptions.filter(({ label }) => {
      return `${label}`.toLowerCase().startsWith("fa");
    });

    fireEvent.focus(getByTestId("select--field"));
    fireEvent.keyUp(getByTestId("select--field"), { key: "f" });
    fireEvent.keyUp(getByTestId("select--field"), { key: "a" });

    expect(getByTestId("select")).toHaveValue(`${targetOption[0].value}`);
  });

  it("should not apply matching options when typing over focused opened component", async () => {
    const { getByTestId } = render(
      <Select
        data-testid="select"
        aria-expanded={true}
        options={industryOptions}
      />
    );

    const targetOption = industryOptions.filter(({ label }) => {
      return `${label}`.toLowerCase().startsWith("f");
    });

    fireEvent.focus(getByTestId("select--field"));
    fireEvent.keyDown(getByTestId("select--field"), { key: "f" });

    expect(getByTestId("select")).not.toHaveValue(`${targetOption[0].value}`);
  });

  it("should not match options when typing over focused multiple component", async () => {
    const { getByTestId } = render(
      <Select data-testid="select" multiple={true} options={industryOptions} />
    );

    const targetOption = industryOptions.filter(({ label }) => {
      return `${label}`.toLowerCase().startsWith("f");
    });

    fireEvent.focus(getByTestId("select--field"));
    fireEvent.keyUp(getByTestId("select--field"), { key: "f" });

    expect(getByTestId("select")).not.toHaveValue(`${targetOption[0].value}`);
  });
});
