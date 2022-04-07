import './static/storybook.preview.scss';

export const parameters = {
  options: {
    storySort: (a, b) => a[1].parameters.options.order > b[1].parameters.options.order
  }
};
