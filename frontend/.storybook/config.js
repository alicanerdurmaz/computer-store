import {configure} from '@storybook/react'

import '../styles/app.css'
import './storybook.css'
// automatically import all files ending in *.stories.(ts|tsx)
const req = require.context('../src/components/', true, /.stories.tsx?$/)

configure(req, module)
