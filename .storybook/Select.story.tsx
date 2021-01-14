import './static/select.story.css';

import React, { useState } from "react";
import { storiesOf, addParameters } from "@storybook/react";

import { Select } from "../src";
import { SelectMultiple, SelectOption, SelectSingle } from "../src/Select.types";
import * as flags from './static';

addParameters({
  options: {
    enableShortcuts: false
  }
});

const industryOptions: SelectOption[] = [
  {
    label: 'Accounting',
    value: 'accounting'
  },
  {
    label: 'Administration & Office Support',
    value: 'administration'
  },
  {
    label: 'Advertising, Arts & Media',
    value: 'advertising'
  },
  {
    label: 'Banking & Financial Services',
    value: 'banking'
  },
  {
    label: 'Call Centre & Customer Service',
    value: 'call'
  },
  {
    label: 'Community Services & Development',
    value: 'community'
  },
  {
    label: 'Construction',
    value: 'construction'
  },
  {
    label: 'Consulting & Strategy',
    value: 'consulting'
  },
  {
    label: 'Design & Architechture',
    value: 'design'
  },
  {
    label: 'Education & Training',
    value: 'education'
  },
  {
    label: 'Engineering',
    value: 'engineering'
  },
  {
    label: 'Farming, Animals & Conservation',
    value: 'farming'
  },
  {
    label: 'Government & Defence',
    value: 'government'
  },
  {
    label: 'Healthcare & Medical',
    value: 'healthcare'
  },
  {
    label: 'Hospitality & Tourism',
    value: 'hospitality'
  },
  {
    label: 'Human Resources & Recruitment',
    value: 'human'
  },
  {
    label: 'Information & Communication Technology',
    value: 'information'
  },
  {
    label: 'Insurance & Superannuation',
    value: 'insurance'
  },
  {
    label: 'Legal',
    value: 'legal'
  },
  {
    label: 'Manufacturing, Transport & Logistics',
    value: 'manufacturing'
  },
  {
    label: 'Marketing & Communications',
    value: 'marketing'
  },
  {
    label: 'Mining, Resources & Energy',
    value: 'mining'
  },
  {
    label: 'Real Estate & Property',
    value: 'real'
  },
  {
    label: 'Retail & Consumer Products',
    value: 'retail'
  },
  {
    label: 'Sales',
    value: 'sales'
  },
  {
    label: 'Science & Technology',
    value: 'science'
  },
  {
    label: 'Sport & Recreation',
    value: 'sport'
  },
  {
    label: 'Trades & Services',
    value: 'trades'
  },
];

const countryOptions: SelectOption[] = [
  {
    label: 'Switzerland',
    value: 'ch',
    component: (
      <div className="flag_option">
        <img src={flags.switzerland} width={16} />
        <span>Switzerland</span>
      </div>
    )
  },
  {
    label: 'Canada',
    value: 'ca',
    component: (
      <div className="flag_option">
        <img src={flags.canada} width={16} />
        <span>Canada</span>
      </div>
    )
  },
  {
    label: 'Japan',
    value: 'jp',
    component: (
      <div className="flag_option">
        <img src={flags.japan} width={16} />
        <span>Japan</span>
      </div>
    )
  },
  {
    label: 'Germany',
    value: 'de',
    component: (
      <div className="flag_option">
        <img src={flags.germany} width={16} />
        <span>Germany</span>
      </div>
    )
  },
  {
    label: 'Australia',
    value: 'au',
    component: (
      <div className="flag_option">
        <img src={flags.australia} width={16} />
        <span>Australia</span>
      </div>
    )
  },
  {
    label: 'United Kingdom',
    value: 'uk',
    component: (
      <div className="flag_option">
        <img src={flags.united_kingdom} width={16} />
        <span>United Kingdom</span>
      </div>
    )
  },
  {
    label: 'United States',
    value: 'us',
    component: (
      <div className="flag_option">
        <img src={flags.united_states} width={16} />
        <span>United States</span>
      </div>
    )
  },
  {
    label: 'Sweden',
    value: 'sw',
    component: (
      <div className="flag_option">
        <img src={flags.sweden} width={16} />
        <span>Sweden</span>
      </div>
    )
  },
];

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
      <div style={{
        display: 'grid',
        columnGap: 30,
        gridTemplateColumns: 'repeat(2, 1fr)'
      }}>
        <div>
          <h3 style={{ fontSize: '1.3rem', fontFamily: 'sans-serif', margin: '0 0 20px' }}>Single Select</h3>

          <SelectSingleExample
            label="Industry"
            placeholder="Select your option"
            options={industryOptions}
          />

          <br />
          <br />

          <SelectSingleExample
            label="With Clear button on hover"
            value="construction"
            placeholder="Select your option"
            allowClear={true}
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

        <div>
          <h3 style={{ fontSize: '1.3rem', fontFamily: 'sans-serif', margin: '0 0 20px' }}>Searchable</h3>

          <SelectSingleExample
            label="Industry"
            placeholder="Search"
            options={industryOptions}
            allowSearch={true}
          />

          <br />
          <br />

          <SelectSingleExample
            label="Search with value"
            value="banking"
            options={industryOptions}
            allowSearch={true}
          />
        </div>
      </div>
    );
  })

  .add("Multiple", () => {
    return (
      <div style={{
        display: 'grid',
        columnGap: 30,
        gridTemplateColumns: 'repeat(2, 1fr)'
      }}>
        <div>
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
            allowClear={true}
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

        <div>
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
  })

  .add("Custom options", () => {
    return (
      <div style={{
        display: 'grid',
        columnGap: 30,
        gridTemplateColumns: 'repeat(2, 1fr)'
      }}>
        <div>
          <h3 style={{ fontSize: '1.3rem', fontFamily: 'sans-serif', margin: '0 0 20px' }}>Single Select</h3>

          <SelectSingleExample
            label="Choose your country"
            value="ch"
            asTags={true}
            placeholder="Search"
            options={countryOptions}
            allowSearch={true}
          />
        </div>

        <div>
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
  });
