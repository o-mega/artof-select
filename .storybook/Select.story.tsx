import './static/select.story.css';

import React, { useState } from "react";
import { storiesOf } from "@storybook/react";

import { Select } from "../src";
import { SelectOption } from "../src/Select.types";
import * as flags from './static';

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

storiesOf("artof-select", module)
  .add("Single [default]", () => {
    const [selected, setSelected] = useState<string>('');
    const [selected2, setSelected2] = useState<string>('');
    const [selected3, setSelected3] = useState<string>("banking");

    const onChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
      setSelected(event.currentTarget.value);
    };

    const onChange2 = (event: React.ChangeEvent<HTMLSelectElement>): void => {
      setSelected2(event.currentTarget.value);
    };

    const onChange3 = (event: React.ChangeEvent<HTMLSelectElement>): void => {
      setSelected3(event.currentTarget.value);
    };

    return (
      <div style={{
        display: 'grid',
        columnGap: 30,
        gridTemplateColumns: 'repeat(2, 1fr)'
      }}>
        <div>
          <h3 style={{ fontSize: '1.3rem', fontFamily: 'sans-serif', margin: '0 0 20px' }}>Single Select</h3>

          <Select
            label="Industry"
            value={selected}
            placeholder="Select your option"
            options={industryOptions}
            onChange={onChange}
          />

          <h3 style={{ fontSize: '1.3rem', fontFamily: 'sans-serif', margin: '40px 0 20px' }}>Different states</h3>

          <Select
            placeholder="Without label"
            options={industryOptions}
          />

          <br />
          <br />

          <Select
            label="Disabled"
            disabled={true}
            placeholder="Select your option"
            options={industryOptions}
          />

          <br />
          <br />

          <Select
            label="Disabled with value"
            disabled={true}
            value="banking"
            placeholder="Select your option"
            options={industryOptions}
          />

          <br />
          <br />

          <Select
            label="Error message"
            placeholder="Select your option"
            options={industryOptions}
            errorText="You need to specify your profile"
          />

          <br />
          <br />

          <Select
            label="Helper message"
            placeholder="Select your option"
            options={industryOptions}
            hintText="You can choose only one specification"
          />
        </div>

        <div>
          <h3 style={{ fontSize: '1.3rem', fontFamily: 'sans-serif', margin: '0 0 20px' }}>Searchable</h3>

          <Select
            label="Industry"
            value={selected2}
            placeholder="Search"
            options={industryOptions}
            onChange={onChange2}
            allowSearch={true}
          />

          <br />
          <br />

          <Select
            label="Search with value"
            value={selected3}
            options={industryOptions}
            onChange={onChange3}
            allowSearch={true}
          />
        </div>
      </div>
    );
  })
  .add("Multiple", () => {
    const [selected, setSelected] = useState<string[]>([]);
    const [selected2, setSelected2] = useState<string[]>(['banking', 'government']);

    const onChange = (values: string[]): void => {
      setSelected(values);
    };

    const onChange2 = (values: string[]): void => {
      setSelected2(values);
    };

    return (
      <div style={{
        display: 'grid',
        columnGap: 30,
        gridTemplateColumns: 'repeat(2, 1fr)'
      }}>
        <div>
          <h3 style={{ fontSize: '1.3rem', fontFamily: 'sans-serif', margin: '0 0 20px' }}>Multiple Select</h3>

          <Select
            label="Industry"
            value={selected}
            multiple={true}
            placeholder="Select some options"
            options={industryOptions}
            onChange={onChange}
          />

          <br />
          <br />

          <Select
            label="With pre-checked options"
            value={selected2}
            multiple={true}
            placeholder="Add some options"
            options={industryOptions}
            onChange={onChange2}
          />

          <h3 style={{ fontSize: '1.3rem', fontFamily: 'sans-serif', margin: '40px 0 20px' }}>As Tags</h3>

          <Select
            value={selected2}
            multiple={true}
            asTags={true}
            placeholder="Add some options"
            options={industryOptions}
            onChange={onChange2}
          />

          <h3 style={{ fontSize: '1.3rem', fontFamily: 'sans-serif', margin: '40px 0 20px' }}>Select All</h3>

          <Select
            value={selected}
            multiple={true}
            asTags={true}
            placeholder="Add some options"
            options={industryOptions}
            onChange={onChange}
            allowSelectAll={true}
          />
        </div>

        <div>
          <h3 style={{ fontSize: '1.3rem', fontFamily: 'sans-serif', margin: '0 0 20px' }}>Searchable</h3>

          <Select
            label="Industry"
            value={selected}
            multiple={true}
            placeholder="Search"
            options={industryOptions}
            onChange={onChange}
            allowSearch={true}
          />

          <br />
          <br />

          <Select
            label="Search with value"
            value={selected2}
            multiple={true}
            placeholder="Add some options"
            options={industryOptions}
            onChange={onChange2}
            allowSearch={true}
          />
        </div>
      </div>
    );
  })
  .add("Custom options", () => {
    const [selected, setSelected] = useState<string>('ch');
    const [selected2, setSelected2] = useState<string[]>(['ca', 'us']);

    const onChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
      setSelected(event.currentTarget.value);
    };

    const onChange2 = (values: string[]): void => {
      setSelected2(values);
    };

    return (
      <div style={{
        display: 'grid',
        columnGap: 30,
        gridTemplateColumns: 'repeat(2, 1fr)'
      }}>
        <div>
          <h3 style={{ fontSize: '1.3rem', fontFamily: 'sans-serif', margin: '0 0 20px' }}>Single Select</h3>

          <Select
            label="Choose your country"
            value={selected}
            asTags={true}
            placeholder="Search"
            options={countryOptions}
            onChange={onChange}
            allowSearch={true}
          />
        </div>

        <div>
          <h3 style={{ fontSize: '1.3rem', fontFamily: 'sans-serif', margin: '0 0 20px' }}>Multiple Select</h3>

          <Select
            label="Top countries rank"
            value={selected2}
            multiple={true}
            asTags={true}
            placeholder="Select some options"
            options={countryOptions}
            onChange={onChange2}
            allowSelectAll={true}
          />
        </div>
      </div>
    );
  });
