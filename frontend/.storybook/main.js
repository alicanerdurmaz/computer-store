const path = require('path')

module.exports = {
  addons: ['@storybook/preset-typescript'],
  presets: [path.resolve(__dirname, './post-css.js')],
}
