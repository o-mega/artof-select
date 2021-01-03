# artof-select

A simple `<Select />` component for [React](https://reactjs.com).

Key features:
- Based native `HTMLSelectElement` props and methods
- Supports multiple selection
- Has option to search inside values out of the box
- Fully customisable design
- Extendable with error and hint messages
- Multiple selected options can be displayed as `[tag] [tag] [tag]`
- Supports native keyboard events, as `Tab`, `Arrow Up|Down` to navigate over the dropdown options and `Enter` to apply selected option(s).

## Installation and usage

`npm i artof-select`

or

`yarn add artof-select`

As soon as it installed, you can easily use it in your app:

```js
import React from 'react';
import { Select } from 'artof-select';

const App = () => {
  const [value, setValue] = useState();

  const handleChange = (event) => {
    setValue(event.currentTarget.value);
  }

  return (
    <Select
      label="Some label"
      value={value}
      options={[]}
      onChange={handleChange}
      allowSearch={true}
    />
  )
}
```

## Props

Common props you may want to specify include:

| Props                | Default value | Description                                            |
| -------------------- | ------------- | ------------------------------------------------------ |
| `options` (required) | `[]`          | Specify the options the user can select from           |
| `multiple`           | `false`       | Allow the user to select multiple values               |
| `label`              | `undefined`   | Generates an label with this name above the Select     |
| `placeholder`        | `undefined`   | The text displayed when no option is selected          |
| `errorText`          | `undefined`   | A text below the Select connected with classNames      |
| `hintText`           | `undefined`   | A text below the Select (and under the `errorText`)    |
| `asTags`             | `false`       | Use with `multiple` to display selected values as tags |
| `allowSearch`        | `false`       | Allow the user to search for inside options            |
| `allowSelectAll`     | `false`       | Include _Select All_ button with `multiple` options    |
| `className`          | `undefined`   | Additional className can be attached to the wrapper    |
| `value`              | `undefined`   | Current value. A string or an string[] (if multiple)   |

Also, the `onChange` prop can return `event: React.ChangeEvent<HTMLSelectElement>` or `values: string[]` depend on multiple option.

In addition to above props, you can flavour `Select` component with all possible `HTMLSelectElement` props.

## Demo

You can check out the demo:
```sh
git clone https://github.com/o-mega/artof-select.git
cd artof-select
yarn
yarn dev
```

This should run the Storybook with designed examples at `http://localhost:6006`

## License

MIT Licensed. Copyright (c) Oleg Frolov 2021.
