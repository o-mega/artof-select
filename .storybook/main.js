module.exports = {
  stories: [
    './Select.story.tsx'
  ],
  addons: [
    '@storybook/addon-controls',
    {
      name: 'storybook-addon-sass-postcss',
      options: {
        sassLoaderOptions: {
          implementation: require('sass')
        }
      }
    }
  ]
}
