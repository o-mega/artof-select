import React from "react";

import { SelectSingleExample } from "./SelectSingleExample";
import { SelectMiltipleExample } from "./SelectMiltipleExample";
import { countryOptions } from '../static/options.mock';

export const TemplateCustomOptions = () => {
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
}
