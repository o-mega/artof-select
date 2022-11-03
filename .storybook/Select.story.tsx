import React from 'react';

import { countryOptions } from './static/options.mock';
import { TemplateSingle, TemplateMultiple, TemplateCustomOptions, TemplateCustomValue } from './templates/';
import { Select } from '../src/Select';
import { SelectMultiple, SelectSingle } from '../src/Select.types';


export const Single = TemplateSingle.bind({});

Single.storyName = 'Single [default]';

Single.parameters = {
  actions: false,
  controls: false,
  options: {
    order: 1,
    showPanel: false
  }
};

export const Multiple = TemplateMultiple.bind({});

Multiple.parameters = {
  actions: false,
  controls: false,
  options: {
    order: 2,
    showPanel: false
  }
};

export const CustomOptions = TemplateCustomOptions.bind({});

CustomOptions.storyName = 'Custom Options';

CustomOptions.parameters = {
  actions: false,
  controls: false,
  options: {
    order: 3,
    showPanel: false
  }
};

export const CustomValue = TemplateCustomValue.bind({});

CustomValue.storyName = 'Custom Value';

CustomValue.parameters = {
  actions: false,
  controls: false,
  options: {
    order: 4,
    showPanel: false
  }
};

const PlaygroundTemplate = ({ multiple, value, ...props }) => {
  return (
    <div className="story__select-wrapper">
      <div className="story__select-col">
        <h3 style={{ fontSize: '1.3rem', fontFamily: 'sans-serif', margin: '0 0 20px' }}>Playground</h3>

        {multiple ? (
          <Select multiple={true} {...props as SelectMultiple} value={Array.isArray(value) ? value : [value]} />
        ) : (
          <Select multiple={false} {...props as SelectSingle} value={Array.isArray(value) ? value[0] : value} />
        )}
      </div>
    </div>
  );
}

export default {
  title: 'artof-select',
  component: PlaygroundTemplate
};


export const Playground = {
  storyName: 'Playground',
  parameters: {
    actions: false,
    controls: {
      expanded: true
    },
    options: {
      order: 5,
      showPanel: true
    }
  },
  argTypes: {
    multiple: {
      description: '<span className="badge-multiple"></span> Make the Select as Multiple',
      control: 'boolean',
      table: { defaultValue: { summary: false } }
    },
    label: {
      description: 'The label above the Select',
      control: 'text',
      table: { defaultValue: { summary: 'undefined' } }
    },
    labelPosition: {
      description: 'Placement for the label Tag',
      options: ['before', 'inside', 'after'],
      control: {
        type: 'select'
      },
      table: { defaultValue: { summary: 'before' } }
    },
    placeholder: {
      description: 'Placeholder will be displayed when no value is selected',
      control: 'text',
      table: { defaultValue: { summary: 'undefined' } }
    },
    value: {
      description: 'Selected value(s):<br/>- String for the Single Select<br/>- Strings Array for the Multiple Select',
      options: countryOptions.map(item => item.value),
      control: {
        type: 'select'
      }
    },
    options: {
      description: '<div>Array of Options <div className="custom-code">`{\n label?: string | number;\n value?: string;\n component?: ReactNode;\n}[]`</div></div>',
      table: { defaultValue: { summary: '[]' } }
    },
    errorText: {
      description: 'Error Text displays under the Select',
      control: 'text',
      table: { defaultValue: { summary: 'undefined' } }
    },
    hintText: {
      description: 'Hint text displays under the Select',
      control: 'text',
      table: { defaultValue: { summary: 'undefined' } }
    },
    allowSelectAll: {
      description: 'Adds Select All option to the top of options list (prop `textSelectAll` is required)',
      control: 'boolean',
      table: { defaultValue: { summary: false } }
    },
    allowClearAll: {
      description: '<span className="badge-multiple"></span>Adds a Clear All button',
      control: 'boolean',
      table: { defaultValue: { summary: false } }
    },
    allowSearch: {
      description: 'Allow to search',
      control: 'boolean',
      table: { defaultValue: { summary: false } }
    },
    allowMarkWords: {
      description: 'Allow to mark search letters',
      control: 'boolean',
      table: { defaultValue: { summary: true } }
    },
    asTags: {
      description: '<span className="badge-multiple"></span> Display selected value as a Tags',
      control: 'boolean',
      table: { defaultValue: { summary: false } }
    },
    allowRemoveTag: {
      description: '<span className="badge-multiple"></span> Adds remove control at every item when `asTags=true`',
      control: 'boolean',
      table: { defaultValue: { summary: false } }
    },
    allowTagsCount: {
      description: '<span className="badge-multiple"></span> Display the selected count, in addition to `asTags=true`',
      control: 'boolean',
      table: { defaultValue: { summary: false } }
    },
    autoFocus: {
      description: 'Autofocus at first component render',
      control: 'boolean',
      table: { defaultValue: { summary: false } }
    },
    disabled: {
      description: 'Default HTMLSelect attribute',
      control: 'boolean',
      table: { defaultValue: { summary: false } }
    },
    dropdownOffset: {
      description: 'Dropdown offset by `number`',
      control: 'number',
      table: { defaultValue: { summary: 4 } }
    },
    dropdownPosition: {
      description: 'Placement for the label Tag',
      options: [
        'auto',
        'auto-start',
        'auto-end',
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'right',
        'right-start',
        'right-end',
        'left',
        'left-start',
        'left-end'
      ],
      control: {
        type: 'select'
      },
      table: { defaultValue: { summary: 'bottom-start' } }
    },
    splitterBefore: {
      description: 'Show the horizontal line before the option with index',
      control: 'number',
      table: { defaultValue: { summary: '0' } }
    },
    searchPosition: {
      description: 'Placement of the Search input field (when `allowSearch=true`)',
      options: ['value', 'dropdown'],
      control: {
        type: 'select'
      },
      table: { defaultValue: { summary: 'value' } }
    },
    searchPlaceholder: {
      description: 'The placeholder text for search input (only when `searchPosition=dropdown`)',
      control: 'text',
      table: { defaultValue: { summary: 'undefined' } }
    },
    textSelected: {
      description: '<span className="badge-multiple"></span> Translated text for `Selected %n` text (when `asTags=false`)',
      control: 'text',
      table: { defaultValue: { summary: 'Selected' } }
    },
    textSelectAll: {
      description: '<span className="badge-multiple"></span> Translated text for `Select All` option item text (when `allowSelectAll=true`)',
      control: 'text',
      table: { defaultValue: { summary: 'Select all' } }
    },
    "aria-expanded": {
      description: 'Expand the dropdown (default HTMLSelect attribute)',
      control: 'boolean',
      table: { defaultValue: { summary: false } }
    }
  },
  args: {
    multiple: false,
    label: 'Select Country',
    options: countryOptions,
    placeholder: 'Choose your country',
    value: countryOptions[0].value,
    labelPosition: 'before',
    allowClearAll: false,
    allowSearch: true,
    allowMarkWords: true,
    asTags: false,
    allowRemoveTag: false,
    allowTagsCount: false,
    hintText: 'You should select the country from the list',
    allowSelectAll: false,
    textSelected: 'Selected',
    textSelectAll: 'Select All',
    errorText: '',
    autoFocus: false,
    disabled: false,
    dropdownOffset: [0, 4],
    dropdownPosition: 'bottom-start',
    splitterBefore: 0,
    searchPlaceholder: '',
    'aria-expanded': false
  }
};
