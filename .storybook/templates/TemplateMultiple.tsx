import React from "react";

import { industryOptions } from '../static/options.mock';
import { SelectMiltipleExample } from "./SelectMiltipleExample";

export const TemplateMultiple = () => {
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

        <br />
        <br />

        <SelectMiltipleExample
          label="Search field inside dropdown"
          value={['banking', 'government']}
          multiple={true}
          placeholder="Add some options"
          options={industryOptions}
          allowSearch={true}
          searchPosition="dropdown"
          searchPlaceholder="Search in options"
          allowSelectAll={true}
          textSelectAll="Select all"
        />
      </div>
    </div>
  );
}
