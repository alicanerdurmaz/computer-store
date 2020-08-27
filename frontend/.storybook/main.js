const path = require('path')
module.exports = {
  presets: [path.resolve(__dirname, './post-css.js')],
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-knobs', '@storybook/addon-essentials'],
}
