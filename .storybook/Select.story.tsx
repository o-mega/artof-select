import '../src/select.scss';

import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { text, number, boolean, select, optionsKnob } from "@storybook/addon-knobs";

import { Select } from "../src/Select";
import { SelectMultiple, SelectSingle } from "../src/Select.types";
import { industryOptions, yearsOptions, countryOptions } from './static/options.mock';

const SelectSingleExample: React.FC<SelectSingle> = (props) => {
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

const SelectMiltipleExample: React.FC<SelectMultiple> = (props) => {
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

storiesOf("artof-select", module)
  .add("Single [default]", () => {
    return (
      <div className="story__select-wrapper">
        <div className="story__select-col">
          <h3 style={{ fontSize: '1.3rem', fontFamily: 'sans-serif', margin: '0 0 20px' }}>Single Select</h3>

          <SelectSingleExample
            label="Industry"
            placeholder="Select your option"
            options={industryOptions}
            id="select_example"
          />

          <br />
          <br />

          <SelectSingleExample
            label="With Clear button on hover"
            value="construction"
            placeholder="Select your option"
            allowClearAll={true}
            options={industryOptions}
          />

          <h3 style={{ fontSize: '1.3rem', fontFamily: 'sans-serif', margin: '40px 0 20px' }}>Different states</h3>

          <SelectSingleExample
            placeholder="Without label"
            options={industryOptions}
          />

          <br />
          <br />

          <SelectSingleExample
            label="Disabled"
            disabled={true}
            placeholder="Select your option"
            options={industryOptions}
          />

          <br />
          <br />

          <SelectSingleExample
            label="Disabled with value"
            disabled={true}
            value="banking"
            placeholder="Select your option"
            options={industryOptions}
          />

          <br />
          <br />

          <SelectSingleExample
            label="Error message"
            placeholder="Select your option"
            options={industryOptions}
            errorText="You need to specify your profile"
          />

          <br />
          <br />

          <SelectSingleExample
            label="Helper message"
            placeholder="Select your option"
            options={industryOptions}
            hintText="You can choose only one specification"
          />
        </div>

        <div className="story__select-col">
          <h3 style={{ fontSize: '1.3rem', fontFamily: 'sans-serif', margin: '0 0 20px' }}>Searchable</h3>

          <SelectSingleExample
            label="Industry"
            placeholder="Search"
            options={industryOptions}
            allowSearch={true}
            id="select_example2"
          />

          <br />
          <br />

          <SelectSingleExample
            label="Search with value"
            value="banking"
            options={industryOptions}
            allowSearch={true}
          />

          <br />
          <br/>

          <SelectSingleExample
            label="Choose your birthday"
            value=""
            options={yearsOptions}
            allowSearch={true}
          />
        </div>
      </div>
    );
  }, {
    options: {
      showPanel: false
    }
  })

  .add("Multiple", () => {
    return (
      <div className="story__select-wrapper">
        <div className="story__select-col">
          <h3 style={{ fontSize: '1.3rem', fontFamily: 'sans-serif', margin: '0 0 20px' }}>Multiple Select</h3>

          <SelectMiltipleExample
            label="Industry"
            multiple={true}
            placeholder="Select some options"
            options={industryOptions}
          />

          <br />
          <br />

          <SelectMiltipleExample
            label="With pre-checked options"
            value={['banking', 'government']}
            multiple={true}
            placeholder="Add some options"
            options={industryOptions}
          />

          <br />
          <br />

          <SelectMiltipleExample
            label="With Clear button on hover"
            value={['banking', 'government']}
            multiple={true}
            allowClearAll={true}
            placeholder="Add some options"
            options={industryOptions}
          />

          <h3 style={{ fontSize: '1.3rem', fontFamily: 'sans-serif', margin: '40px 0 20px' }}>As Tags</h3>

          <SelectMiltipleExample
            value={['banking', 'government']}
            multiple={true}
            asTags={true}
            placeholder="Add some options"
            options={industryOptions}
          />

          <br />
          <br />

          <SelectMiltipleExample
            label="With allowTagsCount"
            value={['banking', 'government']}
            multiple={true}
            asTags={true}
            allowTagsCount={true}
            allowClearAll={true}
            placeholder="Add some options"
            options={industryOptions}
          />

          <br />
          <br />

          <SelectMiltipleExample
            label="Every tag can also be removed"
            value={['banking', 'government']}
            multiple={true}
            asTags={true}
            allowRemoveTag={true}
            placeholder="Add some options"
            options={industryOptions}
          />

          <h3 style={{ fontSize: '1.3rem', fontFamily: 'sans-serif', margin: '40px 0 20px' }}>Select All</h3>

          <SelectMiltipleExample
            multiple={true}
            asTags={true}
            placeholder="Add some options"
            options={industryOptions}
            allowSelectAll={true}
          />
        </div>

        <div className="story__select-col">
          <h3 style={{ fontSize: '1.3rem', fontFamily: 'sans-serif', margin: '0 0 20px' }}>Searchable</h3>

          <SelectMiltipleExample
            label="Industry"
            multiple={true}
            placeholder="Search"
            options={industryOptions}
            allowSearch={true}
          />

          <br />
          <br />

          <SelectMiltipleExample
            label="Search with value"
            value={['banking', 'government']}
            multiple={true}
            placeholder="Add some options"
            options={industryOptions}
            allowSearch={true}
          />

          <br />
          <br />

          <SelectMiltipleExample
            label="Search with value as tags"
            value={['government']}
            multiple={true}
            placeholder="Add some options"
            options={industryOptions}
            allowSearch={true}
            asTags={true}
          />
        </div>
      </div>
    );
  }, {
    options: {
      showPanel: false
    }
  })

  .add("Custom options", () => {
    return (
      <div className="story__select-wrapper">
        <div className="story__select-col">
          <h3 style={{ fontSize: '1.3rem', fontFamily: 'sans-serif', margin: '0 0 20px' }}>Single Select</h3>

          <SelectSingleExample
            label="Choose your country"
            value="ch"
            placeholder="Search"
            options={countryOptions}
            allowSearch={true}
          />
        </div>

        <div className="story__select-col">
          <h3 style={{ fontSize: '1.3rem', fontFamily: 'sans-serif', margin: '0 0 20px' }}>Multiple Select</h3>

          <SelectMiltipleExample
            label="Top countries rank"
            value={['ca', 'us']}
            multiple={true}
            asTags={true}
            placeholder="Select some options"
            options={countryOptions}
            allowSelectAll={true}
          />
        </div>
      </div>
    );
  }, {
    options: {
      showPanel: false
    }
  })

  .add("Custom value", () => {
    const [selected, setSelected] = useState<string[] | undefined>(['ca', 'us', 'sw']);

    const onChange = (values: string[]): void => {
      setSelected(values);
    };

    const handleRemove = (value: React.ReactText): void => {
      onChange(selected.filter(item => value !== item));
    };

    return (
      <div className="story__select-wrapper">
        <div className="story__select-col">
          <h3 style={{ fontSize: '1.3rem', fontFamily: 'sans-serif', margin: '0 0 20px' }}>Custom Value Render</h3>

          <Select
            value={selected}
            multiple={true}
            label="Click to dismiss selected"
            options={countryOptions}
            onChange={onChange}
            renderValue={(options) => (
              <>
                {options.map(({ label, value }) => (
                  <button
                    type="button"
                    key={value}
                    className="custom_render__button"
                    onClick={() => handleRemove(value)}
                  >
                    {label}
                  </button>
                ))}
              </>
            )}
          />
        </div>

        <div className="story__select-col" style={{ fontSize: '1rem', fontFamily: 'sans-serif' }}>
          You can find a full example at <a href="https://gist.github.com/o-mega/bd89f4b45ee22f70f70e6207adb956a5" target="_blank">Github Gist</a>
        </div>
      </div>
    );
  }, {
    options: {
      showPanel: false
    }
  })

  .add("Playground - Single", () => {
    const valueKnobs = React.useMemo(() => {
      const obj = {
        '': ''
      };

      countryOptions.forEach(({ label, value }) => {
        obj[label] = `${value}`;
      })

      return obj;
    }, []);

    return (
      <div className="story__select-wrapper">
        <div className="story__select-col">
          <h3 style={{ fontSize: '1.3rem', fontFamily: 'sans-serif', margin: '0 0 20px' }}>Single Select</h3>

          <Select
            options={countryOptions}
            label={text('[label]\nThe label above the Select', 'Select Country')}
            placeholder={text('[placeholder]\nPlaceholder will be displayed when no value is selected', 'Choose your country')}
            value={select('[value]\nSelected value', valueKnobs, '')}
            allowClearAll={boolean('[allowClearAll]\nAdd Clear All button', false)}
            allowSearch={boolean('[allowSearch]\nAllow to search', true)}
            allowMarkWords={boolean('[allowMarkWords]\nAllow to mark searching letters', true)}
            hintText={text('[hintText]\nHint text displays under the select', 'You should select the country from the list')}
            errorText={text('[errorText]\nError Text displays under the select', '')}
            autoFocus={boolean('[autoFocus]\nNote: it works only with first render', false)}
            disabled={boolean('[disabled]\nDisabled', false)}
            dropdownOffset={[number('[dropdownOffset]\nDropdown offset by X', 0), number('[dropdownOffset]\nDropdown offset by Y', 4)]}
            splitterBefore={number('[splitterBefore]\nShow the horizontal line before the option with index', 0)}
            aria-expanded={boolean('[aria-expanded]\nExpand the dropdown', false)}
          />
        </div>
      </div>
    );
  }, {
    options: {
      showPanel: true
    }
  })

  .add("Playground - Multiple", () => {
    const valueKnobs = React.useMemo(() => {
      const obj = {};

      countryOptions.forEach(({ label, value }) => {
        obj[label] = `${value}`;
      })

      return obj;
    }, []);

    return (
      <div className="story__select-wrapper">
        <div className="story__select-col">
          <h3 style={{ fontSize: '1.3rem', fontFamily: 'sans-serif', margin: '0 0 20px' }}>Multiple Select</h3>

          <Select
            options={countryOptions}
            multiple={true}
            label={text('[label]\nThe label above the Select', 'Select some countries')}
            placeholder={text('[placeholder]\nPlaceholder will be displayed when no values were selected', 'Choose the countries')}
            value={optionsKnob('[value]\nSelected values', valueKnobs, [], { display: 'inline-check' }) as any}
            asTags={boolean('[asTags]\nTo display selected values ss tags', false)}
            allowClearAll={boolean('[allowClearAll]\nAdd Clear All button', false)}
            allowSelectAll={boolean('[allowSelectAll]\nAdd Select All option to dropdown options list', true)}
            allowRemoveTag={boolean('[allowRemoveTag]\nAdd the Remove button to each tag when asTags=true', false)}
            allowTagsCount={boolean('[allowTagsCount]\nAdd additional tags counter before the tags', false)}
            allowSearch={boolean('[allowSearch]\nAllow to search', true)}
            allowMarkWords={boolean('[allowMarkWords]\nAllow to mark searching letters', true)}
            textSelected={text('[textSelected]\nTranslation for `Selected`', '')}
            textSelectAll={text('[textSelectAll]\nTranslation for `Select All`', '')}
            hintText={text('[hintText]\nHint text displays under the select', 'You should select the country from the list')}
            errorText={text('[errorText]\nError Text displays under the select', '')}
            autoFocus={boolean('[autoFocus]\nNote: it works only with first render', false)}
            disabled={boolean('[disabled]\nDisabled', false)}
            dropdownOffset={[number('[dropdownOffset]\nDropdown offset by X', 0), number('[dropdownOffset]\nDropdown offset by Y', 4)]}
            splitterBefore={number('[splitterBefore]\nShow the horizontal line before the option with index', 0)}
            aria-expanded={boolean('[aria-expanded]\nExpand the dropdown', false)}
          />
        </div>
      </div>
    );
  }, {
    options: {
      showPanel: true
    }
  });
