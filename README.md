# artof-select
[![NPM](https://img.shields.io/npm/v/artof-select.svg)](https://www.npmjs.com/package/artof-select)
[![BUNDLEPHOBIA](https://img.shields.io/bundlephobia/minzip/artof-select)](https://bundlephobia.com/result?p=artof-select)

A simple, but powerful [React](https://reactjs.com) `Select` component.
Can be used for both Select Single React form element and Select Multiple React form element.

Key features:
- Based on native `HTMLSelectElement` props and methods
- Supports multiple selection
- Supports searching through options list
- Fully customisable design
- Select provides display of hints and error notifications
- Multiple selected options can be shown as `[tag] [tag] [tag]`
- Supports native keyboard events, like `Tab`, `Arrow Up | Down` to navigate over the dropdown options and `Enter` (or even `Spacebar`) to apply selected option(s).
- Supports custom `React.ReactNode` component as option element

In addition, this component works with `react-popper` to make better dropdown positioning.

[Demo Storybook here](https://o-mega.github.io/artof-select)

## Installation and usage

`npm i artof-select`

or

`yarn add artof-select`

As soon as it installed, you can easily use `Select` in your app:

```js
import React from 'react';
import { Select } from 'artof-select';

// custom
import 'artof-select/dist/index.scss';

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

| Props                | Default value | Description                                                 |
| -------------------- | ------------- | ----------------------------------------------------------- |
| `allowClear`         | `false`       | Add button to clear the selection                           |
| `allowMarkWords`     | `true`        | Wrap keywords with `<mark />` for `allowSearch={true}`      |
| `allowSearch`        | `false`       | Allow the user to search for inside options                 |
| `allowSelectAll`     | `false`       | Include _Select All_ button with `multiple` options         |
| `allowTagsCount`     | `false`       | Add counter before selected tags, when `asTags={true}`      |
| `aria-expanded`      | `false`       | If `true` - can open the Dropdown on init                   |
| `asTags`             | `false`       | Use with `multiple={true}` to display selections as tags    |
| `autoFocus`          | `undefined`   | Default `<select />`'s attribute. Set focus when did mount  |
| `className`          | `undefined`   | Additional className can be attached to the wrapper         |
| `datatype`           | `undefined`   | Possibility to pass data-types attributes to `<select/>`    |
| `disabled`           | `undefined`   | Default `<select />`'s attribute                            |
| `dropdownOffset`     | `[0, 4]`      | Offset dropdown positioning by x and y coordinates          |
| `errorText`          | `undefined`   | A text below the Select connected with classNames           |
| `form`               | `undefined`   | Default `<select />`'s attribute                            |
| `hintText`           | `undefined`   | A text below the Select (and under the `errorText`)         |
| `id`                 | `undefined`   | Default `<select />`'s attribute                            |
| `label`              | `undefined`   | Generates an label with this name above the Select          |
| `multiple`           | `false`       | Allow the user to select multiple values                    |
| `name`               | `undefined`   | Default `<select />`'s attribute                            |
| `options`            | `[]`          | Specify the options the user can select from                |
| `placeholder`        | `undefined`   | The text displayed when no option is selected               |
| `renderValue`        | `undefined`   | A function, that can render custom selected value           |
| `required`           | `undefined`   | Default `<select />`'s attribute                            |
| `splitterBefore`     | `0`           | To set additional HTMLDivElement before an option item      |
| `style`              | `undefined`   | Default `<select />`'s attribute                            |
| `textSelectAll`      | `Select all`  | A translation text _Select All_ if `allowSelectAll={true}`  |
| `textSelected`       | `Selected`    | A translation text _Selected_ %n if `multiple={true}`       |
| `value`              | `undefined`   | Current value. A string or an string[] if `multiple={true}` |

Also, the `onChange` prop can return `event: React.ChangeEvent<HTMLSelectElement>` or `values: string[]` depend on multiple option.

In addition to above props, you can get access to the `Select` component with `ref`.
This will allow you to force some events, like: `selectRef.current?.focus()`

## Run the Demo from local

You can check out the demo:
```sh
git clone https://github.com/o-mega/artof-select.git
cd artof-select
yarn
yarn dev
```

This commands should run the Storybook with designed examples at `http://localhost:6006`

## License

MIT Licensed. Copyright (c) Oleg Frolov 2021.
