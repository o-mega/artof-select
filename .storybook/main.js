module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: [
    './Select.story.tsx'
  ],
  addons: [
    {
      name: 'storybook-addon-sass-postcss',
      options: {
        sassLoaderOptions: {
          implementation: require('sass')
        }
      }
    },
    {
      name: '@storybook/addon-essentials',
      options: {
        actions: false,
      },
    },
    '@storybook/addon-controls'
  ]
}
