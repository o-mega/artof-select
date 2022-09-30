import React, { useState } from "react";

import { countryOptions } from '../static/options.mock';
import { Select } from "../../src/Select";

export const TemplateCustomValue = () => {
  const [selected, setSelected] = useState<string[] | undefined>(['ca', 'us', 'sw']);

  const onChange = (values: string[]): void => {
    setSelected(values);
  };

  const handleRemove = (value?: string | number): void => {
    if (!!selected?.length) {
      onChange(selected.filter(item => value !== item));
    }
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
}
