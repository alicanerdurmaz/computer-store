const path = require('path')

module.exports = {
  presets: [path.resolve(__dirname, './post-css.js')],
  addons: ['@storybook/addon-actions', '@storybook/addon-links', '@storybook/addon-knobs'],
}
