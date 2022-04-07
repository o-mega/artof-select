import React from "react";

import { SelectSingleExample } from "./SelectSingleExample";
import { industryOptions, yearsOptions } from '../static/options.mock';

export const TemplateSingle = () => {
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
        <br />

        <SelectSingleExample
          label="Choose your birthday"
          value=""
          options={yearsOptions}
          allowSearch={true}
        />

        <br />
        <br />

        <SelectSingleExample
          placeholder="Select your industry"
          label="Search field inside dropdown"
          value=""
          searchPosition="dropdown"
          options={industryOptions}
          allowSearch={true}
          searchPlaceholder="Search in options"
        />
      </div>
    </div>
  );
}
