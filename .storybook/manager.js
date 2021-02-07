import './static/storybook.manager.css';

import addons from '@storybook/addons';
import { themes } from '@storybook/theming';
import logo from './static/logo.svg';

addons.setConfig({
  showRoots: false,
  enableShortcuts: false,
  theme: {
    ...themes.dark,
    brandTitle: 'artof-select',
    brandUrl: 'https://github.com/o-mega/artof-select',
    brandImage: logo
  }
});
