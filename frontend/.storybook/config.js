import { configure, addParameters } from '@storybook/react'

addParameters({
  options: {
    storySort: (a, b) => (a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true })),
  },
})

import '../styles/app.css'
import './storybook.css'
// automatically import all files ending in *.stories.(ts|tsx)
const req = require.context('../src/components/', true, /.stories.tsx?$/)

configure(req, module)
