module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      stage: 3,
      autoprefixer: {
        flexbox: 'no-2009',
        grid: 'autoplace',
        features: {
          'custom-properties': true,
        },
      },
    },
    'postcss-nested': {},
    'postcss-custom-properties': {},
    'postcss-flexbugs-fixes': {},
  },
}
